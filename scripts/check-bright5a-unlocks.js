const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sguffpxuaahivvponwfb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndWZmcHh1YWFoaXZ2cG9ud2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzc3NzM3MywiZXhwIjoyMDgzMzUzMzczfQ.UHYyz6Iy40ffYYrkFa6v4SXxbkxook5l5n-xuIfW8G8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkBright5AUnlocks() {
  console.log('\n=== Finding BRIGHT5A Class ===')
  const { data: classes, error: classError } = await supabase
    .from('classes')
    .select('id, name, grade, created_at')
    .eq('name', 'BRIGHT5A')

  if (classError) {
    console.error('Error fetching class:', classError)
    return
  }

  console.log('Classes found:', classes)

  if (!classes || classes.length === 0) {
    console.log('No BRIGHT5A class found')
    return
  }

  const classId = classes[0].id
  console.log('\nClass ID:', classId)

  console.log('\n=== Checking Lesson Unlocks ===')
  const { data: unlocks, error: unlocksError } = await supabase
    .from('lesson_unlocks')
    .select(`
      id,
      class_id,
      lesson_id,
      unlocked_at,
      lessons (
        title,
        order,
        grade
      )
    `)
    .eq('class_id', classId)
    .order('lessons(order)', { ascending: true })

  if (unlocksError) {
    console.error('Error fetching unlocks:', unlocksError)
  } else {
    console.log('Total unlocks found:', unlocks?.length || 0)
    console.log('\nUnlocked lessons:')
    unlocks?.forEach(unlock => {
      console.log(`  - Lesson ${unlock.lessons.order}: ${unlock.lessons.title}`)
      console.log(`    Lesson ID: ${unlock.lesson_id}`)
      console.log(`    Unlocked at: ${unlock.unlocked_at}`)
    })
  }

  console.log('\n=== All Grade 4 Lessons ===')
  const { data: allLessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, title, order, grade')
    .eq('grade', 4)
    .order('order', { ascending: true })

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError)
  } else {
    console.log('Total grade 4 lessons:', allLessons?.length || 0)
    allLessons?.forEach(lesson => {
      const isUnlocked = unlocks?.some(u => u.lesson_id === lesson.id)
      console.log(`  ${isUnlocked ? '✓' : '✗'} Lesson ${lesson.order}: ${lesson.title} (${lesson.id})`)
    })
  }
}

checkBright5AUnlocks()
