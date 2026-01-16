-- Show all current RLS policies on lesson_unlocks
SELECT
  policyname,
  permissive,
  roles,
  cmd,
  qual::text as using_clause,
  with_check::text as with_check_clause
FROM pg_policies
WHERE tablename = 'lesson_unlocks'
ORDER BY policyname;
