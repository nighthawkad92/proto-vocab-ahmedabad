-- Verification queries to run AFTER applying COMPLETE_RLS_FIX.sql
-- This confirms everything is working correctly

-- ============================================
-- 1. Check RLS Policies Are In Place
-- ============================================
SELECT
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename IN ('teachers', 'classes', 'lesson_unlocks', 'lessons', 'students', 'attempts', 'responses')
GROUP BY tablename
ORDER BY tablename;

-- Expected results:
-- teachers: 3 policies (create, read, update)
-- classes: 4 policies (create, read, update, delete)
-- lesson_unlocks: 3 policies (create, read, delete)
-- lessons: 1 policy (read)
-- students: 3 policies (create, read, update)
-- attempts: 3 policies (create, read, update)
-- responses: 2 policies (create, read)

-- ============================================
-- 2. Verify Grade 4 Lessons Exist
-- ============================================
SELECT
  "order",
  title,
  grade,
  description,
  jsonb_array_length(content->'blocks') as blocks_count
FROM lessons
WHERE grade = 4
ORDER BY "order";

-- Expected: 5 lessons, all grade 4, 2 blocks each

-- ============================================
-- 3. Check Introduction Exists in Lessons
-- ============================================
SELECT
  title,
  "order",
  content->'blocks'->0->'introduction'->>'concept' as block0_intro,
  content->'blocks'->0->'introduction'->>'activity' as block0_activity
FROM lessons
WHERE grade = 4
ORDER BY "order";

-- Expected: All 5 lessons should have introduction concepts and activities

-- ============================================
-- 4. Count Questions Per Lesson
-- ============================================
SELECT
  title,
  (
    SELECT SUM(jsonb_array_length(block->'questions'))
    FROM jsonb_array_elements(content->'blocks') as block
  ) as total_questions
FROM lessons
WHERE grade = 4
ORDER BY "order";

-- Expected: Each lesson should have 8 questions (4 per block)

-- ============================================
-- 5. Verify Class and Unlocks
-- ============================================
SELECT
  c.name as class_name,
  c.class_code,
  COUNT(lu.id) as unlocked_lessons
FROM classes c
LEFT JOIN lesson_unlocks lu ON c.id = lu.class_id
WHERE c.class_code = 'LGI550'
GROUP BY c.id, c.name, c.class_code;

-- Expected: Class 3a with code LGI550 and count of unlocked lessons

-- ============================================
-- 6. Check Students in Class
-- ============================================
SELECT
  s.name,
  s.created_at,
  s.last_active,
  COUNT(a.id) as attempts_count
FROM students s
LEFT JOIN attempts a ON s.id = a.student_id
WHERE s.class_id IN (SELECT id FROM classes WHERE class_code = 'LGI550')
GROUP BY s.id, s.name, s.created_at, s.last_active
ORDER BY s.created_at DESC;

-- Expected: List of students who have logged in

-- ============================================
-- SUMMARY
-- ============================================
-- If all queries return data successfully, RLS is working correctly!
