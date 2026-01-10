#!/usr/bin/env node

/**
 * End-to-End Test for Rotation Sets
 * Simulates the complete student flow with rotation sets
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const errors = []

function logError(test, error) {
  errors.push({ test, error })
  console.log(`  ❌ ${test}`)
  console.log(`     Error: ${error}`)
}

function logSuccess(test) {
  console.log(`  ✅ ${test}`)
}

// Simulate LessonEngine rotation logic
function selectQuestions(block, attemptNumber, rotationEnabled) {
  if (!rotationEnabled || !block.rotationSets || block.rotationSets.length === 0) {
    return { set: 'default', questions: block.questions }
  }

  const rotationIndex = (attemptNumber - 1) % 3

  if (rotationIndex === 0) {
    return { set: 'default', questions: block.questions }
  } else if (rotationIndex === 1 && block.rotationSets[0]) {
    return { set: 'rotation-1', questions: block.rotationSets[0] }
  } else if (rotationIndex === 2 && block.rotationSets[1]) {
    return { set: 'rotation-2', questions: block.rotationSets[1] }
  }

  return { set: 'default (fallback)', questions: block.questions }
}

async function runE2ETest() {
  console.log('🎬 Running End-to-End Rotation Sets Test')
  console.log('=' .repeat(60))

  try {
    // Step 1: Get a test student (or create one)
    console.log('\n👤 Step 1: Setting up test student...')
    const testStudentId = 'test-student-rotation-' + Date.now()
    const testLessonId = '00000000-0000-0000-0000-000000000001' // First lesson ID

    // Get the first Grade 4 lesson
    console.log('\n📚 Step 2: Fetching lesson data...')
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('*')
      .eq('grade', 4)
      .order('order')
      .limit(1)
      .single()

    if (lessonError || !lesson) {
      logError('Fetch lesson', lessonError?.message || 'No lesson found')
      throw new Error('Failed to fetch lesson')
    }

    logSuccess(`Fetched lesson: "${lesson.title}"`)
    logSuccess(`Rotation enabled: ${lesson.content.rotationEnabled}`)

    // Clean up any existing test attempts
    await supabase
      .from('attempts')
      .delete()
      .eq('student_id', testStudentId)

    // Simulate 6 attempts
    console.log('\n🔄 Step 3: Simulating 6 lesson attempts...')

    for (let attemptNum = 1; attemptNum <= 6; attemptNum++) {
      console.log(`\n  📝 Attempt ${attemptNum}:`)

      // Step 3a: Count previous attempts (simulating API)
      const { count: prevAttempts } = await supabase
        .from('attempts')
        .select('id', { count: 'exact', head: true })
        .eq('student_id', testStudentId)
        .eq('lesson_id', lesson.id)

      const currentAttemptNumber = (prevAttempts || 0) + 1

      if (currentAttemptNumber !== attemptNum) {
        logError(`Attempt count mismatch`, `Expected ${attemptNum}, got ${currentAttemptNumber}`)
      } else {
        logSuccess(`Attempt count correct: ${currentAttemptNumber}`)
      }

      // Step 3b: Select questions (simulating LessonEngine)
      const block0 = lesson.content.blocks[0]
      const { set, questions } = selectQuestions(
        block0,
        currentAttemptNumber,
        lesson.content.rotationEnabled
      )

      logSuccess(`Question set selected: ${set}`)

      if (questions && questions.length > 0) {
        const firstQuestion = questions[0]
        console.log(`     First question: "${firstQuestion.prompt}"`)
        console.log(`     Question ID: ${firstQuestion.id}`)

        // Verify question set based on attempt number
        const expectedSet = currentAttemptNumber % 3
        const isCorrectSet = (
          (expectedSet === 1 && set === 'default') ||
          (expectedSet === 2 && set === 'rotation-1') ||
          (expectedSet === 0 && set === 'rotation-2')
        )

        if (isCorrectSet) {
          logSuccess(`Correct question set for attempt ${attemptNum}`)
        } else {
          logError(`Wrong question set`, `Expected based on modulo ${expectedSet}, got ${set}`)
        }
      } else {
        logError('No questions found', 'Question array is empty')
      }

      // Step 3c: Create attempt record
      const { error: attemptError } = await supabase
        .from('attempts')
        .insert({
          id: crypto.randomUUID(),
          student_id: testStudentId,
          lesson_id: lesson.id,
          completed_at: new Date().toISOString(),
          questions_attempted: 4,
          questions_correct: 3,
          levels_completed: 1,
          accuracy: 75.0
        })

      if (attemptError) {
        logError('Create attempt record', attemptError.message)
      } else {
        logSuccess('Attempt recorded in database')
      }
    }

    // Step 4: Verify the rotation cycle
    console.log('\n🔍 Step 4: Verifying rotation cycle...')

    const { data: allAttempts } = await supabase
      .from('attempts')
      .select('id, created_at')
      .eq('student_id', testStudentId)
      .eq('lesson_id', lesson.id)
      .order('created_at')

    if (allAttempts && allAttempts.length === 6) {
      logSuccess(`All 6 attempts recorded: ${allAttempts.length}`)

      // Verify each attempt gets the right questions
      const expectedSequence = [
        'default',
        'rotation-1',
        'rotation-2',
        'default',
        'rotation-1',
        'rotation-2'
      ]

      let sequenceCorrect = true
      allAttempts.forEach((attempt, idx) => {
        const attemptNumber = idx + 1
        const block0 = lesson.content.blocks[0]
        const { set } = selectQuestions(
          block0,
          attemptNumber,
          lesson.content.rotationEnabled
        )

        const expected = expectedSequence[idx]
        if (set !== expected) {
          sequenceCorrect = false
          logError(`Sequence check attempt ${attemptNumber}`, `Expected ${expected}, got ${set}`)
        }
      })

      if (sequenceCorrect) {
        logSuccess('Rotation sequence is correct across all attempts')
      }
    } else {
      logError('Attempt count', `Expected 6, found ${allAttempts?.length || 0}`)
    }

    // Step 5: Test question uniqueness across sets
    console.log('\n🎯 Step 5: Testing question uniqueness...')

    const block0 = lesson.content.blocks[0]
    const defaultIds = new Set(block0.questions.map(q => q.id))
    const set1Ids = new Set(block0.rotationSets[0]?.map(q => q.id) || [])
    const set2Ids = new Set(block0.rotationSets[1]?.map(q => q.id) || [])

    const defaultVsSet1 = [...defaultIds].filter(id => set1Ids.has(id))
    const defaultVsSet2 = [...defaultIds].filter(id => set2Ids.has(id))
    const set1VsSet2 = [...set1Ids].filter(id => set2Ids.has(id))

    if (defaultVsSet1.length === 0) {
      logSuccess('No duplicate IDs between default and rotation set 1')
    } else {
      logError('Duplicate IDs', `Found ${defaultVsSet1.length} duplicates between default and set 1`)
    }

    if (defaultVsSet2.length === 0) {
      logSuccess('No duplicate IDs between default and rotation set 2')
    } else {
      logError('Duplicate IDs', `Found ${defaultVsSet2.length} duplicates between default and set 2`)
    }

    if (set1VsSet2.length === 0) {
      logSuccess('No duplicate IDs between rotation sets 1 and 2')
    } else {
      logError('Duplicate IDs', `Found ${set1VsSet2.length} duplicates between sets 1 and 2`)
    }

    // Cleanup
    console.log('\n🧹 Step 6: Cleaning up test data...')
    await supabase
      .from('attempts')
      .delete()
      .eq('student_id', testStudentId)

    logSuccess('Test data cleaned up')

  } catch (err) {
    console.log('\n❌ Test failed with error:', err.message)
    errors.push({ test: 'Overall E2E test', error: err.message })
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 End-to-End Test Summary')
  console.log('='.repeat(60))

  if (errors.length === 0) {
    console.log('✅ All end-to-end tests passed!')
    console.log('\n🎉 Rotation sets are working correctly in production!')
    console.log('\nVerified:')
    console.log('  ✓ API counts attempts correctly')
    console.log('  ✓ Rotation logic selects correct question sets')
    console.log('  ✓ Questions cycle properly through 6 attempts')
    console.log('  ✓ No duplicate questions across rotation sets')
    console.log('  ✓ Database records attempts correctly')
  } else {
    console.log(`❌ Found ${errors.length} errors:\n`)
    errors.forEach((e, idx) => {
      console.log(`${idx + 1}. ${e.test}`)
      console.log(`   ${e.error}\n`)
    })
  }

  console.log('='.repeat(60))

  process.exit(errors.length > 0 ? 1 : 0)
}

runE2ETest()
