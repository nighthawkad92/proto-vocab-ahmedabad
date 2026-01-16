-- Check all RLS policies on lesson_unlocks table
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

-- Check if RLS is enabled
SELECT relname, relrowsecurity, relforcerowsecurity
FROM pg_class
WHERE relname = 'lesson_unlocks';

-- Test the actual query that the API is running
SELECT lesson_id, class_id, id
FROM lesson_unlocks
WHERE class_id = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5';
