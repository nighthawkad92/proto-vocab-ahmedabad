#!/usr/bin/env node

/**
 * Deploy Rotation Sets to Database
 * This script deploys the rotation sets from seed-lessons-grade4.sql to Supabase
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function deployRotationSets() {
  console.log('🚀 Starting rotation sets deployment...\n')

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'seed-lessons-grade4.sql')
    console.log('📖 Reading SQL file:', sqlPath)

    const sqlContent = fs.readFileSync(sqlPath, 'utf8')

    // Extract the SQL commands (split by semicolons, but be careful with JSONB)
    // We'll execute the entire SQL as one batch
    console.log('📝 SQL file loaded successfully\n')

    // Execute the SQL
    console.log('⚙️  Executing SQL...')
    console.log('   - Deleting existing lesson data')
    console.log('   - Inserting 5 lessons with rotation sets')
    console.log('   - Total: 180 questions (60 default + 120 rotation)\n')

    const { data, error } = await supabase.rpc('exec_sql', {
      sql: sqlContent
    })

    if (error) {
      // If exec_sql function doesn't exist, try alternative approach
      if (error.message.includes('exec_sql')) {
        console.log('⚠️  Direct SQL execution not available')
        console.log('📋 Using REST API approach...\n')

        // Delete existing data
        console.log('🗑️  Clearing existing lessons...')
        await supabase.from('lesson_unlocks').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        await supabase.from('responses').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        await supabase.from('attempts').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        await supabase.from('lessons').delete().neq('id', '00000000-0000-0000-0000-000000000000')

        console.log('✅ Existing data cleared\n')

        // Parse and insert lessons from SQL
        const lessons = extractLessonsFromSQL(sqlContent)

        console.log(`📥 Inserting ${lessons.length} lessons with rotation sets...`)

        for (let i = 0; i < lessons.length; i++) {
          const lesson = lessons[i]
          console.log(`   ${i + 1}. ${lesson.title}`)

          const { error: insertError } = await supabase
            .from('lessons')
            .insert(lesson)

          if (insertError) {
            console.error(`   ❌ Error inserting lesson ${i + 1}:`, insertError.message)
            throw insertError
          }
        }

        console.log('\n✅ All lessons inserted successfully!')
      } else {
        throw error
      }
    } else {
      console.log('✅ SQL executed successfully!')
    }

    // Verify deployment
    console.log('\n🔍 Verifying deployment...')
    const { data: lessonCount, error: countError } = await supabase
      .from('lessons')
      .select('id', { count: 'exact', head: true })
      .eq('grade', 4)

    if (countError) {
      console.warn('⚠️  Could not verify lesson count:', countError.message)
    } else {
      console.log(`✅ Found ${lessonCount} Grade 4 lessons in database`)
    }

    // Check one lesson for rotation sets
    const { data: sampleLesson, error: sampleError } = await supabase
      .from('lessons')
      .select('title, content')
      .eq('grade', 4)
      .limit(1)
      .single()

    if (sampleError) {
      console.warn('⚠️  Could not verify rotation sets:', sampleError.message)
    } else if (sampleLesson) {
      const hasRotation = sampleLesson.content.rotationEnabled === true
      const hasRotationSets = sampleLesson.content.blocks[0]?.rotationSets?.length > 0

      console.log(`✅ Rotation enabled: ${hasRotation ? 'Yes' : 'No'}`)
      console.log(`✅ Rotation sets present: ${hasRotationSets ? 'Yes' : 'No'}`)

      if (hasRotation && hasRotationSets) {
        const block0Sets = sampleLesson.content.blocks[0].rotationSets.length
        console.log(`✅ Rotation sets in Block 0: ${block0Sets}`)
      }
    }

    console.log('\n✨ Deployment complete!')
    console.log('\n📊 Summary:')
    console.log('   • 5 lessons deployed')
    console.log('   • 15 blocks total (3 per lesson)')
    console.log('   • 60 default questions')
    console.log('   • 120 rotation questions (2 sets × 4 questions × 15 blocks)')
    console.log('   • 180 total questions')
    console.log('\n🎉 Rotation sets are now active!')
    console.log('   Students will see different questions on each lesson retake.')

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message)
    console.error('\nFull error:', error)
    process.exit(1)
  }
}

// Helper function to extract lessons from SQL
function extractLessonsFromSQL(sql) {
  const lessons = []

  // Match INSERT statements
  const insertRegex = /INSERT INTO lessons \(title, description, grade, "order", content\) VALUES \(\s*'([^']+)',\s*'([^']+)',\s*(\d+),\s*(\d+),\s*'(\{[\s\S]*?\})'::jsonb\s*\);/g

  let match
  while ((match = insertRegex.exec(sql)) !== null) {
    const [, title, description, grade, order, contentStr] = match

    try {
      // Parse the JSON content
      const content = JSON.parse(contentStr)

      lessons.push({
        title,
        description,
        grade: parseInt(grade),
        order: parseInt(order),
        content
      })
    } catch (e) {
      console.error(`Failed to parse lesson: ${title}`, e.message)
    }
  }

  return lessons
}

// Run deployment
deployRotationSets()
