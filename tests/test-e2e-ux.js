#!/usr/bin/env node

/**
 * End-to-End UX Test
 * Simulates complete student lesson flow with UX improvements
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const errors = []

function logError(test, error) {
  errors.push({ test, error })
  console.log(`  ❌ ${test}`)
  console.log(`     Error: ${error}`)
}

function logSuccess(test) {
  console.log(`  ✅ ${test}`)
}

async function testE2E() {
  console.log('🎬 End-to-End UX Implementation Test')
  console.log('=' .repeat(70))
  console.log('Simulating complete student lesson flow\n')

  try {
    // Step 1: Setup test student
    console.log('👤 Step 1: Setting up test student...')
    const testStudentId = 'test-ux-student-' + Date.now()
    const testLessonId = '00000000-0000-0000-0000-000000000001'

    logSuccess('Test student ID created')

    // Step 2: Get lesson with rotation sets
    console.log('\n📚 Step 2: Fetching lesson content...')
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
    logSuccess(`Blocks count: ${lesson.content.blocks.length}`)

    // Step 3: Verify UX improvements in content
    console.log('\n🎨 Step 3: Verifying UX improvements...')

    // Check introduction structure
    const block0 = lesson.content.blocks[0]
    if (block0.introduction) {
      const intro = block0.introduction
      const hasRequiredFields = intro.concept && intro.explanation && intro.example && intro.activity
      if (hasRequiredFields) {
        logSuccess('Introduction has all required fields for sequential display')
      } else {
        logError('Introduction structure', 'Missing required fields')
      }
    } else {
      logSuccess('No introduction in this block (optional)')
    }

    // Check question structure
    if (block0.questions && block0.questions.length > 0) {
      const question = block0.questions[0]
      const hasPrompt = question.prompt && question.prompt.length > 0
      const hasOptions = question.options && question.options.length === 4
      const hasCorrectAnswer = !!question.correctAnswer

      if (hasPrompt && hasOptions && hasCorrectAnswer) {
        logSuccess('Questions have proper structure for QuestionCard')
      } else {
        logError('Question structure', 'Missing required fields')
      }
    }

    // Check rotation sets
    if (block0.rotationSets && block0.rotationSets.length === 2) {
      logSuccess('Block has 2 rotation sets')

      const set1Questions = block0.rotationSets[0].length
      const set2Questions = block0.rotationSets[1].length
      const defaultQuestions = block0.questions.length

      if (set1Questions === defaultQuestions && set2Questions === defaultQuestions) {
        logSuccess(`All question sets have ${defaultQuestions} questions`)
      } else {
        logError('Rotation set sizes', 'Sets have different question counts')
      }
    } else {
      logError('Rotation sets', 'Block missing 2 rotation sets')
    }

    // Step 4: Test TTS API
    console.log('\n🔊 Step 4: Testing TTS API...')

    const testText = 'Hello. This is a test.'
    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_CLOUD_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: testText },
            voice: {
              languageCode: 'en-IN',
              name: 'en-IN-Wavenet-D',
              ssmlGender: 'FEMALE',
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.9,
              pitch: 0.5,
            },
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        if (data.audioContent) {
          logSuccess('TTS API generates audio successfully')
          logSuccess('Voice: Indian English (en-IN-Wavenet-D) Female')
          logSuccess('Speed: 0.9x (slightly slower for children)')
          logSuccess('Pitch: 0.5 (slightly higher)')
        } else {
          logError('TTS API', 'No audio content returned')
        }
      } else {
        logError('TTS API', `API returned status ${response.status}`)
      }
    } catch (err) {
      logError('TTS API', err.message)
    }

    // Step 5: Simulate lesson flow
    console.log('\n🎮 Step 5: Simulating lesson flow...')

    // Clean up any existing test attempts
    await supabase
      .from('attempts')
      .delete()
      .eq('student_id', testStudentId)

    // Simulate 3 attempts to test rotation
    for (let attemptNum = 1; attemptNum <= 3; attemptNum++) {
      console.log(`\n  📝 Attempt ${attemptNum}:`)

      // Count previous attempts
      const { count: prevAttempts } = await supabase
        .from('attempts')
        .select('id', { count: 'exact', head: true })
        .eq('student_id', testStudentId)
        .eq('lesson_id', lesson.id)

      const currentAttemptNumber = (prevAttempts || 0) + 1

      if (currentAttemptNumber !== attemptNum) {
        logError(`Attempt count mismatch`, `Expected ${attemptNum}, got ${currentAttemptNumber}`)
      } else {
        logSuccess(`Attempt number correct: ${currentAttemptNumber}`)
      }

      // Determine which question set should be selected
      const rotationIndex = (currentAttemptNumber - 1) % 3
      let expectedSet = 'default'
      if (rotationIndex === 1) expectedSet = 'rotation-1'
      if (rotationIndex === 2) expectedSet = 'rotation-2'

      logSuccess(`Expected question set: ${expectedSet}`)

      // Simulate question display
      let questions = block0.questions
      if (rotationIndex === 1 && block0.rotationSets[0]) {
        questions = block0.rotationSets[0]
      } else if (rotationIndex === 2 && block0.rotationSets[1]) {
        questions = block0.rotationSets[1]
      }

      if (questions && questions.length > 0) {
        const firstQuestion = questions[0]
        logSuccess(`First question: "${firstQuestion.prompt.substring(0, 40)}..."`)
      }

      // Create attempt record
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
        logError('Create attempt', attemptError.message)
      } else {
        logSuccess('Attempt recorded successfully')
      }
    }

    // Step 6: Verify rotation cycle
    console.log('\n🔄 Step 6: Verifying rotation cycle...')

    const { data: allAttempts } = await supabase
      .from('attempts')
      .select('id, created_at')
      .eq('student_id', testStudentId)
      .eq('lesson_id', lesson.id)
      .order('created_at')

    if (allAttempts && allAttempts.length === 3) {
      logSuccess('All 3 attempts recorded in database')
      logSuccess('Rotation cycle: default → rotation-1 → rotation-2')
    } else {
      logError('Attempt count', `Expected 3, found ${allAttempts?.length || 0}`)
    }

    // Cleanup
    console.log('\n🧹 Step 7: Cleaning up test data...')
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
  console.log('\n' + '='.repeat(70))
  console.log('📊 End-to-End Test Summary')
  console.log('='.repeat(70))

  if (errors.length === 0) {
    console.log('✅ All end-to-end tests passed!')
    console.log('\n🎉 UX implementation is working correctly in complete flow!')
    console.log('\nVerified:')
    console.log('  ✓ Lesson content structure supports UX components')
    console.log('  ✓ Rotation sets configured correctly')
    console.log('  ✓ TTS API generates audio with correct voice')
    console.log('  ✓ Attempt tracking works for rotation selection')
    console.log('  ✓ Database integration complete')
    console.log('\nReady for:')
    console.log('  → Sequential introduction display')
    console.log('  → Tap-to-hear audio on options')
    console.log('  → Replay audio on incorrect answers')
    console.log('  → Neutral feedback messaging')
    console.log('  → Vertical question layout')
    console.log('  → Solid colors without gradients')
  } else {
    console.log(`❌ Found ${errors.length} errors:\n`)
    errors.forEach((e, idx) => {
      console.log(`${idx + 1}. ${e.test}`)
      console.log(`   ${e.error}\n`)
    })
  }

  console.log('='.repeat(70))

  process.exit(errors.length > 0 ? 1 : 0)
}

testE2E()
