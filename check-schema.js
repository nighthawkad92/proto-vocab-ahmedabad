#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkSchema() {
  console.log('🔍 Checking Database Schema\n')

  // Check attempts table
  console.log('📋 Attempts Table:')
  const { data: attempts, error: attError } = await supabase
    .from('attempts')
    .select('*')
    .limit(1)

  if (attError) {
    console.log('  Error:', attError.message)
  } else {
    if (attempts && attempts.length > 0) {
      console.log('  Columns:', Object.keys(attempts[0]).join(', '))
    } else {
      console.log('  No records found, checking insert...')
      // Try inserting to see schema
      const { error: insError } = await supabase
        .from('attempts')
        .insert({
          id: 'test-schema-check',
          student_id: 'test',
          lesson_id: 'test'
        })

      if (insError) {
        console.log('  Error:', insError.message)
        console.log('  Hint:', insError.hint)
      }

      // Clean up
      await supabase
        .from('attempts')
        .delete()
        .eq('id', 'test-schema-check')
    }
  }

  // Check responses table
  console.log('\n📋 Responses Table:')
  const { data: responses, error: respError } = await supabase
    .from('responses')
    .select('*')
    .limit(1)

  if (respError) {
    console.log('  Error:', respError.message)
  } else {
    if (responses && responses.length > 0) {
      console.log('  Columns:', Object.keys(responses[0]).join(', '))
    } else {
      console.log('  No records found')
    }
  }

  // Check lessons table
  console.log('\n📋 Lessons Table:')
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .limit(1)

  if (lessons && lessons.length > 0) {
    console.log('  Columns:', Object.keys(lessons[0]).join(', '))
  }
}

checkSchema()
