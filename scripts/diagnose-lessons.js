#!/usr/bin/env node

/**
 * Diagnostic Script: Check lesson content structure
 *
 * This script checks all lessons to diagnose content structure issues
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function diagnoseLessons() {
  console.log('🔍 Diagnosing lesson content structure...\n')

  try {
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, grade, content')
      .order('order')

    if (error) {
      throw new Error(`Failed to fetch lessons: ${error.message}`)
    }

    if (!lessons || lessons.length === 0) {
      console.log('⚠️  No lessons found in database\n')
      return
    }

    console.log(`Found ${lessons.length} lessons:\n`)
    console.log('='.repeat(80))

    lessons.forEach((lesson, index) => {
      console.log(`\n📚 Lesson ${index + 1}: ${lesson.title}`)
      console.log(`   ID: ${lesson.id}`)
      console.log(`   Grade: ${lesson.grade}`)
      console.log(`   Content Type: ${typeof lesson.content}`)
      console.log(`   Content is NULL: ${lesson.content === null}`)

      if (lesson.content === null) {
        console.log('   ❌ PROBLEM: Content is NULL')
      } else if (typeof lesson.content !== 'object') {
        console.log('   ❌ PROBLEM: Content is not an object')
      } else {
        const contentKeys = Object.keys(lesson.content)
        console.log(`   Content Keys: ${contentKeys.join(', ') || '(empty)'}`)

        // Check for blocks
        if (lesson.content.blocks) {
          console.log(`   ⚠️  WARNING: Still has "blocks" (${lesson.content.blocks.length})`)
        }

        // Check for levels
        if (lesson.content.levels) {
          const levels = lesson.content.levels
          console.log(`   ✓ Has "levels": ${Array.isArray(levels) ? levels.length : 'not an array'}`)

          if (Array.isArray(levels)) {
            if (levels.length === 0) {
              console.log('   ❌ PROBLEM: Levels array is empty')
            } else {
              console.log(`   ✓ Levels array has ${levels.length} levels`)

              // Check first level structure
              const firstLevel = levels[0]
              console.log(`   First level has:`)
              console.log(`      - introduction: ${!!firstLevel.introduction}`)
              console.log(`      - questions: ${!!firstLevel.questions} (${firstLevel.questions?.length || 0} questions)`)
              console.log(`      - rotationSets: ${!!firstLevel.rotationSets} (${firstLevel.rotationSets?.length || 0} sets)`)

              if (!firstLevel.questions || firstLevel.questions.length === 0) {
                console.log('   ❌ PROBLEM: First level has no questions')
              }
            }
          } else {
            console.log('   ❌ PROBLEM: "levels" exists but is not an array')
          }
        } else {
          console.log('   ❌ PROBLEM: No "levels" property found')
        }
      }

      console.log('-'.repeat(80))
    })

    console.log('\n' + '='.repeat(80))
    console.log('📊 Summary:')
    console.log('='.repeat(80))

    const nullContent = lessons.filter(l => l.content === null).length
    const hasLevels = lessons.filter(l => l.content?.levels).length
    const hasBlocks = lessons.filter(l => l.content?.blocks).length
    const emptyLevels = lessons.filter(l => Array.isArray(l.content?.levels) && l.content.levels.length === 0).length

    console.log(`Total Lessons: ${lessons.length}`)
    console.log(`Lessons with NULL content: ${nullContent}`)
    console.log(`Lessons with "levels": ${hasLevels}`)
    console.log(`Lessons with "blocks": ${hasBlocks}`)
    console.log(`Lessons with empty levels array: ${emptyLevels}`)

    if (nullContent > 0 || hasBlocks > 0 || emptyLevels > 0 || hasLevels < lessons.length) {
      console.log('\n⚠️  ISSUES FOUND - Some lessons need to be fixed')
    } else {
      console.log('\n✅ All lessons have proper "levels" structure')
    }

    console.log('='.repeat(80) + '\n')

  } catch (error) {
    console.error('\n❌ Diagnostic failed:', error.message)
    process.exit(1)
  }
}

diagnoseLessons()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  })
