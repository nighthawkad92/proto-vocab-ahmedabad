#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkProgress() {
  // Get all students
  const { data: students } = await supabase
    .from('students')
    .select('id, name')

  if (!students || students.length === 0) {
    console.log('No students found')
    return
  }

  console.log(`Found ${students.length} student(s)\n`)

  for (const student of students) {
    console.log(`📚 Student: ${student.name} (${student.id})`)

    // Get their attempts
    const { data: attempts } = await supabase
      .from('attempts')
      .select('*')
      .eq('student_id', student.id)
      .order('created_at', { ascending: false })

    if (!attempts || attempts.length === 0) {
      console.log('  No attempts yet\n')
      continue
    }

    const completed = attempts.filter(a => a.completed_at && !a.is_abandoned)
    const totalQuestionsAnswered = attempts.reduce((sum, a) => sum + (a.questions_attempted || 0), 0)
    const totalQuestionsCorrect = attempts.reduce((sum, a) => sum + (a.questions_correct || 0), 0)

    console.log(`  Total attempts: ${attempts.length}`)
    console.log(`  Completed lessons: ${completed.length}`)
    console.log(`  Questions answered: ${totalQuestionsAnswered}`)
    console.log(`  Questions correct: ${totalQuestionsCorrect}`)

    // Check student_stats
    const { data: stats } = await supabase
      .from('student_stats')
      .select('*')
      .eq('student_id', student.id)
      .single()

    if (stats) {
      console.log('  ✅ Has student_stats record')
    } else {
      console.log('  ❌ NO student_stats record (badges will not work!)')
    }

    // Check earned badges
    const { data: badges } = await supabase
      .from('student_badges')
      .select('badges(name), earned_at')
      .eq('student_id', student.id)

    if (badges && badges.length > 0) {
      console.log(`  🏆 Badges earned: ${badges.length}`)
      badges.forEach(b => console.log(`     - ${b.badges.name}`))
    } else {
      console.log('  🏆 No badges earned yet')
    }

    console.log()
  }
}

checkProgress()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
