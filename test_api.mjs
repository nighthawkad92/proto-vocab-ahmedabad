import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testAPI() {
  const classId = 'ddda4bbd-9d22-4b44-8f40-9ed9e88d2c53'

  console.log('Testing API endpoint logic...\n')

  // Get all lessons for grade 4
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, title, description, order')
    .eq('grade', 4)
    .order('order', { ascending: true })

  if (lessonsError) {
    console.error('Failed to fetch lessons:', lessonsError)
    return
  }

  console.log('Lessons fetched:', JSON.stringify(lessons, null, 2))

  // Get unlocked lessons for this class
  const { data: unlocks, error: unlocksError } = await supabase
    .from('lesson_unlocks')
    .select('lesson_id')
    .eq('class_id', classId)

  if (unlocksError) {
    console.error('Failed to fetch unlocks:', unlocksError)
    return
  }

  console.log('\nUnlocks fetched:', JSON.stringify(unlocks, null, 2))

  // Simulate what the frontend does
  const unlockMap = {}
  unlocks.forEach((unlock) => {
    unlockMap[unlock.lesson_id] = true
  })

  console.log('\nUnlock Map:', JSON.stringify(unlockMap, null, 2))

  // Check each lesson
  lessons.forEach(lesson => {
    const isUnlocked = unlockMap[lesson.id]
    console.log(`\nLesson: ${lesson.title} (${lesson.id})`)
    console.log(`  Unlocked: ${isUnlocked ? 'YES' : 'NO'}`)
  })
}

testAPI().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
