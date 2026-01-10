import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkUnlocks() {
  // First, find the class with code KMF829
  const { data: classes, error: classError } = await supabase
    .from('classes')
    .select('id, name, class_code, teacher_id')
    .eq('class_code', 'KMF829')
  
  if (classError) {
    console.error('Error fetching class:', classError)
    return
  }
  
  console.log('Classes found:', JSON.stringify(classes, null, 2))
  
  if (!classes || classes.length === 0) {
    console.log('No class found with code KMF829')
    return
  }
  
  const classId = classes[0].id
  console.log('\nClass ID:', classId)
  
  // Get students in this class
  const { data: students, error: studentsError } = await supabase
    .from('students')
    .select('id, name')
    .eq('class_id', classId)
  
  console.log('\nStudents:', JSON.stringify(students, null, 2))
  
  // Get lesson unlocks for this class
  const { data: unlocks, error: unlocksError } = await supabase
    .from('lesson_unlocks')
    .select('id, lesson_id, unlocked_at, unlocked_by')
    .eq('class_id', classId)
  
  if (unlocksError) {
    console.error('Error fetching unlocks:', unlocksError)
    return
  }
  
  console.log('\nLesson Unlocks:', JSON.stringify(unlocks, null, 2))
  
  // Get lesson details
  if (unlocks && unlocks.length > 0) {
    const lessonIds = unlocks.map(u => u.lesson_id)
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, title, order')
      .in('id', lessonIds)
    
    console.log('\nUnlocked Lessons:', JSON.stringify(lessons, null, 2))
  }
  
  // Get all grade 4 lessons
  const { data: allLessons, error: allLessonsError } = await supabase
    .from('lessons')
    .select('id, title, order, grade')
    .eq('grade', 4)
    .order('order', { ascending: true })
  
  console.log('\nAll Grade 4 Lessons:', JSON.stringify(allLessons, null, 2))
}

checkUnlocks().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
