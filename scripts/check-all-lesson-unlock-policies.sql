-- Check ALL RLS policies on lesson_unlocks table (including restrictive ones)
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
WHERE tablename = 'lesson_unlocks'
ORDER BY policyname;

-- Check if there are any restrictive policies
SELECT
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE tablename = 'lesson_unlocks'
  AND permissive = 'RESTRICTIVE';
