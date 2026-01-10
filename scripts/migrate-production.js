#!/usr/bin/env node

/**
 * Production Migration Script: Convert "blocks" to "levels" in production database
 *
 * This script connects to your production Supabase database and migrates
 * all lessons from "blocks" to "levels" terminology.
 *
 * Usage:
 *   node scripts/migrate-production.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials')
  console.error('Please ensure these are set in .env.local:')
  console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  console.error('  - SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

console.log(`🔗 Connecting to: ${supabaseUrl}`)

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrateProductionLessons() {
  console.log('🚀 Starting PRODUCTION blocks → levels migration...\n')
  console.log('⚠️  WARNING: This will modify your PRODUCTION database!')
  console.log('='.repeat(60) + '\n')

  try {
    // Step 1: Check current status
    console.log('📊 Checking current lesson structure...\n')

    // @ts-ignore
    const { data: lessons, error: fetchError } = await supabase
      .from('lessons')
      .select('id, title, content')
      .order('order')

    if (fetchError) {
      throw new Error(`Failed to fetch lessons: ${fetchError.message}`)
    }

    if (!lessons || lessons.length === 0) {
      console.log('⚠️  No lessons found in database')
      return
    }

    console.log(`Found ${lessons.length} lessons:\n`)

    // Analyze each lesson
    const lessonsWithBlocks = []
    const lessonsWithLevels = []
    const lessonsWithBoth = []
    const lessonsWithNeither = []

    lessons.forEach(lesson => {
      const hasBlocks = lesson.content && lesson.content.blocks
      const hasLevels = lesson.content && lesson.content.levels

      if (hasBlocks && hasLevels) {
        lessonsWithBoth.push(lesson)
      } else if (hasBlocks && !hasLevels) {
        lessonsWithBlocks.push(lesson)
      } else if (!hasBlocks && hasLevels) {
        lessonsWithLevels.push(lesson)
      } else {
        lessonsWithNeither.push(lesson)
      }

      const status = hasBlocks && hasLevels ? '⚠️  HAS BOTH' :
                     hasBlocks ? '✗ Has blocks' :
                     hasLevels ? '✓ Has levels' :
                     '✗ No content'

      console.log(`   ${status.padEnd(20)} - ${lesson.title}`)
    })

    console.log('\n' + '='.repeat(60))
    console.log('Summary:')
    console.log(`  ✓ Lessons with levels only: ${lessonsWithLevels.length}`)
    console.log(`  ✗ Lessons with blocks only: ${lessonsWithBlocks.length}`)
    console.log(`  ⚠️  Lessons with both: ${lessonsWithBoth.length}`)
    console.log(`  ✗ Lessons with neither: ${lessonsWithNeither.length}`)
    console.log('='.repeat(60) + '\n')

    if (lessonsWithBlocks.length === 0 && lessonsWithBoth.length === 0) {
      console.log('✅ All lessons already use "levels" terminology!')
      console.log('No migration needed.\n')
      return
    }

    // Step 2: Migrate lessons
    console.log(`🔄 Migrating ${lessonsWithBlocks.length} lessons from blocks → levels...\n`)

    let successCount = 0
    let errorCount = 0

    for (const lesson of lessonsWithBlocks) {
      try {
        // Create new content with "levels" instead of "blocks"
        const newContent = {
          ...lesson.content,
          levels: lesson.content.blocks
        }
        delete newContent.blocks

        // @ts-ignore
        const { error: updateError } = await supabase
          .from('lessons')
          .update({ content: newContent })
          .eq('id', lesson.id)

        if (updateError) {
          throw new Error(updateError.message)
        }

        console.log(`   ✓ Migrated: ${lesson.title}`)
        successCount++
      } catch (error) {
        console.error(`   ✗ Failed: ${lesson.title} - ${error.message}`)
        errorCount++
      }
    }

    // Step 3: Handle lessons with both
    if (lessonsWithBoth.length > 0) {
      console.log(`\n⚠️  Fixing ${lessonsWithBoth.length} lessons that have BOTH blocks and levels...\n`)

      for (const lesson of lessonsWithBoth) {
        try {
          // Remove blocks, keep levels
          const newContent = { ...lesson.content }
          delete newContent.blocks

          // @ts-ignore
          const { error: updateError } = await supabase
            .from('lessons')
            .update({ content: newContent })
            .eq('id', lesson.id)

          if (updateError) {
            throw new Error(updateError.message)
          }

          console.log(`   ✓ Fixed (removed blocks): ${lesson.title}`)
          successCount++
        } catch (error) {
          console.error(`   ✗ Failed to fix: ${lesson.title} - ${error.message}`)
          errorCount++
        }
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 Migration Results:')
    console.log('='.repeat(60))
    console.log(`✓ Successfully migrated: ${successCount} lessons`)
    if (errorCount > 0) {
      console.log(`✗ Failed to migrate: ${errorCount} lessons`)
    }
    console.log('='.repeat(60) + '\n')

    // Step 4: Verify migration
    console.log('🔍 Verifying migration...\n')

    // @ts-ignore
    const { data: verifyLessons, error: verifyError } = await supabase
      .from('lessons')
      .select('id, title, content')
      .order('order')

    if (verifyError) {
      console.error('⚠️  Warning: Could not verify migration')
      return
    }

    console.log('Final Status:')
    verifyLessons.forEach(lesson => {
      const hasBlocks = lesson.content && lesson.content.blocks
      const hasLevels = lesson.content && lesson.content.levels

      const status = hasBlocks && hasLevels ? '⚠️  Still has both!' :
                     hasBlocks ? '✗ Still has blocks' :
                     hasLevels ? '✓ Has levels' :
                     '✗ No content'

      console.log(`   ${status.padEnd(25)} - ${lesson.title}`)
    })

    const allMigrated = verifyLessons.every(l =>
      l.content && l.content.levels && !l.content.blocks
    )

    console.log('\n' + '='.repeat(60))
    if (allMigrated) {
      console.log('🎉 SUCCESS! All lessons now use "levels" terminology')
      console.log('\nYou can now access lessons on Vercel without errors.')
    } else {
      console.log('⚠️  WARNING: Some lessons may still need manual review')
      console.log('\nCheck the status above and re-run if needed.')
    }
    console.log('='.repeat(60) + '\n')

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.error('\nPlease check your database connection and try again.')
    process.exit(1)
  }
}

// Run the migration
migrateProductionLessons()
  .then(() => {
    console.log('✅ Migration script completed\n')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  })
