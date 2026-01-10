#!/usr/bin/env node

/**
 * Fix production database - Force migrate blocks to levels using raw SQL
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing credentials')
  process.exit(1)
}

console.log(`🔗 Connecting to: ${supabaseUrl}\n`)

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixDatabase() {
  console.log('🔍 Step 1: Check current state\n')

  // First, check what we have
  // @ts-ignore
  const { data: checkData, error: checkError } = await supabase
    .from('lessons')
    .select('id, title, content')

  if (checkError) {
    console.error('Error checking:', checkError)
    return
  }

  console.log('Current state:')
  checkData.forEach(lesson => {
    const hasBlocks = lesson.content?.blocks
    const hasLevels = lesson.content?.levels
    const status = hasBlocks && hasLevels ? '⚠️  BOTH' :
                   hasBlocks ? '✗ BLOCKS' :
                   hasLevels ? '✓ LEVELS' : '✗ NONE'
    console.log(`  ${status} - ${lesson.title}`)
  })

  const needsFix = checkData.filter(l => l.content?.blocks)

  if (needsFix.length === 0) {
    console.log('\n✅ All lessons already have levels!\n')
    return
  }

  console.log(`\n🔧 Step 2: Fixing ${needsFix.length} lessons\n`)

  // Fix each lesson individually
  for (const lesson of needsFix) {
    try {
      // Create new content with levels
      const newContent = { ...lesson.content }

      // If has blocks but not levels, copy blocks to levels
      if (lesson.content.blocks && !lesson.content.levels) {
        newContent.levels = lesson.content.blocks
      }

      // Remove blocks
      delete newContent.blocks

      // Update the lesson
      // @ts-ignore
      const { error: updateError } = await supabase
        .from('lessons')
        .update({ content: newContent })
        .eq('id', lesson.id)

      if (updateError) {
        console.error(`  ✗ Failed: ${lesson.title}`, updateError)
      } else {
        console.log(`  ✓ Fixed: ${lesson.title}`)
      }
    } catch (error) {
      console.error(`  ✗ Error: ${lesson.title}`, error)
    }
  }

  console.log('\n🔍 Step 3: Verify fixes\n')

  // @ts-ignore
  const { data: verifyData, error: verifyError } = await supabase
    .from('lessons')
    .select('id, title, content')

  if (verifyError) {
    console.error('Error verifying:', verifyError)
    return
  }

  console.log('Final state:')
  verifyData.forEach(lesson => {
    const hasBlocks = lesson.content?.blocks
    const hasLevels = lesson.content?.levels
    const status = hasBlocks && hasLevels ? '⚠️  BOTH' :
                   hasBlocks ? '✗ BLOCKS' :
                   hasLevels ? '✓ LEVELS' : '✗ NONE'
    console.log(`  ${status} - ${lesson.title}`)
  })

  const stillBroken = verifyData.filter(l => l.content?.blocks)

  console.log('\n' + '='.repeat(60))
  if (stillBroken.length === 0) {
    console.log('🎉 SUCCESS! All lessons now have levels')
  } else {
    console.log(`⚠️  WARNING: ${stillBroken.length} lessons still have blocks`)
  }
  console.log('='.repeat(60) + '\n')
}

fixDatabase()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
