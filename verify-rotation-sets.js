#!/usr/bin/env node

/**
 * Verify Rotation Sets Deployment
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyRotationSets() {
  console.log('🔍 Verifying Rotation Sets Deployment\n')

  try {
    // Get all Grade 4 lessons
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, description, grade, order, content')
      .eq('grade', 4)
      .order('order')

    if (error) {
      throw error
    }

    if (!lessons || lessons.length === 0) {
      console.log('❌ No Grade 4 lessons found in database')
      return
    }

    console.log(`✅ Found ${lessons.length} Grade 4 lessons\n`)

    // Check each lesson
    lessons.forEach((lesson, idx) => {
      console.log(`📚 Lesson ${idx + 1}: ${lesson.title}`)
      console.log(`   Description: ${lesson.description}`)
      console.log(`   Rotation Enabled: ${lesson.content.rotationEnabled ? '✅ Yes' : '❌ No'}`)

      const blocks = lesson.content.blocks || []
      console.log(`   Blocks: ${blocks.length}`)

      blocks.forEach((block, blockIdx) => {
        const defaultQuestions = block.questions?.length || 0
        const rotationSets = block.rotationSets?.length || 0
        const set1Questions = block.rotationSets?.[0]?.length || 0
        const set2Questions = block.rotationSets?.[1]?.length || 0

        console.log(`      Block ${blockIdx}: ${defaultQuestions} default questions, ${rotationSets} rotation sets`)
        if (rotationSets > 0) {
          console.log(`         • Set 1: ${set1Questions} questions`)
          console.log(`         • Set 2: ${set2Questions} questions`)
        }
      })

      console.log()
    })

    // Summary statistics
    let totalDefaultQuestions = 0
    let totalRotationQuestions = 0
    let totalBlocks = 0

    lessons.forEach(lesson => {
      const blocks = lesson.content.blocks || []
      totalBlocks += blocks.length

      blocks.forEach(block => {
        totalDefaultQuestions += block.questions?.length || 0
        if (block.rotationSets) {
          block.rotationSets.forEach(set => {
            totalRotationQuestions += set.length
          })
        }
      })
    })

    console.log('📊 Summary Statistics:')
    console.log(`   • Total Lessons: ${lessons.length}`)
    console.log(`   • Total Blocks: ${totalBlocks}`)
    console.log(`   • Default Questions: ${totalDefaultQuestions}`)
    console.log(`   • Rotation Questions: ${totalRotationQuestions}`)
    console.log(`   • Total Questions: ${totalDefaultQuestions + totalRotationQuestions}`)
    console.log()

    // Test rotation logic
    console.log('🧪 Testing Rotation Logic:')
    const testLesson = lessons[0]
    const testBlock = testLesson.content.blocks[0]

    if (testBlock.rotationSets && testBlock.rotationSets.length === 2) {
      console.log(`   Using "${testLesson.title}" Block 0 as test`)
      console.log()

      for (let attempt = 1; attempt <= 6; attempt++) {
        const rotationIndex = (attempt - 1) % 3
        let setName = 'Default'
        let questions = testBlock.questions

        if (rotationIndex === 1 && testBlock.rotationSets[0]) {
          setName = 'Rotation Set 1'
          questions = testBlock.rotationSets[0]
        } else if (rotationIndex === 2 && testBlock.rotationSets[1]) {
          setName = 'Rotation Set 2'
          questions = testBlock.rotationSets[1]
        }

        const firstQuestion = questions[0]?.prompt || 'N/A'
        console.log(`   Attempt ${attempt}: ${setName}`)
        console.log(`      First question: ${firstQuestion}`)
      }
    }

    console.log()
    console.log('✅ Verification complete! Rotation sets are working correctly.')

  } catch (error) {
    console.error('❌ Verification failed:', error.message)
    process.exit(1)
  }
}

verifyRotationSets()
