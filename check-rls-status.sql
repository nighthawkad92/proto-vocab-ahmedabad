-- Check current RLS policies
-- Run this to see what policies are currently active

SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('teachers', 'classes', 'students', 'lessons', 'lesson_unlocks', 'attempts', 'responses')
ORDER BY tablename, policyname;
