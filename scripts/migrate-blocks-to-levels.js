#!/usr/bin/env node

/**
 * Migration Script: Convert "blocks" to "levels" in lesson content
 *
 * This script updates all lessons in the database that still use the old
 * "blocks" terminology to use the new "levels" terminology.
 *
 * Usage:
 *   node scripts/migrate-blocks-to-levels.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateLessons() {
  console.log('🚀 Starting blocks → levels migration...\n')

  try {
    // Step 1: Fetch all lessons
    console.log('📖 Fetching all lessons...')
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

    console.log(`✓ Found ${lessons.length} lessons\n`)

    // Step 2: Check which lessons need migration
    const lessonsNeedingMigration = lessons.filter(lesson => {
      if (!lesson.content) return false
      return lesson.content.blocks && !lesson.content.levels
    })

    if (lessonsNeedingMigration.length === 0) {
      console.log('✅ All lessons already use "levels" terminology!')
      console.log('\nNo migration needed.\n')
      return
    }

    console.log(`📝 Found ${lessonsNeedingMigration.length} lessons that need migration:\n`)
    lessonsNeedingMigration.forEach(lesson => {
      const blockCount = lesson.content.blocks?.length || 0
      console.log(`   • ${lesson.title} (${blockCount} blocks)`)
    })

    console.log('\n🔄 Migrating lessons...\n')

    // Step 3: Migrate each lesson
    let successCount = 0
    let errorCount = 0

    for (const lesson of lessonsNeedingMigration) {
      try {
        // Create new content with "levels" instead of "blocks"
        const newContent = {
          ...lesson.content,
          levels: lesson.content.blocks
        }
        delete newContent.blocks

        // Update the lesson
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

    console.log('\n' + '='.repeat(60))
    console.log('📊 Migration Summary:')
    console.log('='.repeat(60))
    console.log(`✓ Successfully migrated: ${successCount} lessons`)
    if (errorCount > 0) {
      console.log(`✗ Failed to migrate: ${errorCount} lessons`)
    }
    console.log('='.repeat(60) + '\n')

    // Step 4: Verify migration
    console.log('🔍 Verifying migration...\n')

    const { data: verifyLessons, error: verifyError } = await supabase
      .from('lessons')
      .select('id, title, content')
      .order('order')

    if (verifyError) {
      console.error('⚠️  Warning: Could not verify migration')
      return
    }

    const results = verifyLessons.map(lesson => {
      if (!lesson.content) {
        return { title: lesson.title, status: '✗ No content' }
      }
      if (lesson.content.levels && !lesson.content.blocks) {
        return { title: lesson.title, status: '✓ Has levels' }
      }
      if (lesson.content.blocks && !lesson.content.levels) {
        return { title: lesson.title, status: '✗ Still has blocks' }
      }
      if (lesson.content.levels && lesson.content.blocks) {
        return { title: lesson.title, status: '⚠️  Has both!' }
      }
      return { title: lesson.title, status: '✗ No levels or blocks' }
    })

    console.log('Verification Results:')
    results.forEach(result => {
      console.log(`   ${result.status.padEnd(20)} - ${result.title}`)
    })

    const allMigrated = results.every(r => r.status === '✓ Has levels')

    console.log('\n' + '='.repeat(60))
    if (allMigrated) {
      console.log('🎉 SUCCESS! All lessons now use "levels" terminology')
    } else {
      console.log('⚠️  WARNING: Some lessons may need manual review')
    }
    console.log('='.repeat(60) + '\n')

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.error('\nPlease check your database connection and try again.')
    process.exit(1)
  }
}

// Run the migration
migrateLessons()
  .then(() => {
    console.log('✅ Migration script completed\n')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  })
