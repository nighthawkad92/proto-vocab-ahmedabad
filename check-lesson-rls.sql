-- Check if lessons table has RLS enabled and what policies exist
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'lessons';

-- Show all policies on lessons table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'lessons';

-- Test: Try to select a lesson
SELECT id, title, grade, "order" FROM lessons LIMIT 1;
