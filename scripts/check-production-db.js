#!/usr/bin/env node

/**
 * Check what's actually in production database
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDatabase() {
  console.log('🔍 Checking production database...\n')

  // @ts-ignore
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, content')
    .order('order')

  if (error) {
    console.error('Error:', error)
    return
  }

  lessons.forEach((lesson, i) => {
    console.log(`\n${i + 1}. ${lesson.title}`)
    console.log(`   ID: ${lesson.id}`)

    if (lesson.content) {
      console.log(`   Content keys: ${Object.keys(lesson.content).join(', ')}`)

      if (lesson.content.blocks) {
        console.log(`   ⚠️  HAS BLOCKS: ${lesson.content.blocks.length} blocks`)
      }

      if (lesson.content.levels) {
        console.log(`   ✓ HAS LEVELS: ${lesson.content.levels.length} levels`)
      }

      if (!lesson.content.blocks && !lesson.content.levels) {
        console.log(`   ❌ NO BLOCKS OR LEVELS`)
      }
    } else {
      console.log(`   ❌ NO CONTENT`)
    }
  })

  console.log('\n\n📊 Summary:')
  const withBlocks = lessons.filter(l => l.content?.blocks).length
  const withLevels = lessons.filter(l => l.content?.levels).length
  console.log(`Lessons with blocks: ${withBlocks}`)
  console.log(`Lessons with levels: ${withLevels}`)
}

checkDatabase().then(() => process.exit(0))
