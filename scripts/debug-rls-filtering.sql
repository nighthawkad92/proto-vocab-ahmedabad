-- Check what's filtering the results

-- Show all policies
SELECT
  policyname,
  cmd,
  qual::text as using_expression,
  with_check::text as with_check_expression
FROM pg_policies
WHERE tablename = 'lesson_unlocks'
ORDER BY policyname;

-- Show all lesson_unlocks with details
SELECT
  lu.id,
  lu.class_id,
  lu.lesson_id,
  lu.unlocked_by,
  lu.unlocked_at,
  l.title as lesson_title,
  c.name as class_name
FROM lesson_unlocks lu
LEFT JOIN lessons l ON l.id = lu.lesson_id
LEFT JOIN classes c ON c.id = lu.class_id
WHERE lu.class_id = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5'
ORDER BY l.order;

-- Check if there's something unique about the one unlock that works
SELECT
  'The unlock that WORKS:' as info,
  lu.*
FROM lesson_unlocks lu
WHERE lu.lesson_id = '0d4af616-47b1-40c2-b62d-fe5ed7f79622'
  AND lu.class_id = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5';

-- Compare with one that doesn't work
SELECT
  'An unlock that DOESNT WORK:' as info,
  lu.*
FROM lesson_unlocks lu
WHERE lu.lesson_id = '8daa5818-46f7-4bab-8279-026eb5282fc8'
  AND lu.class_id = 'ad78faa4-7442-4df7-8b6f-800d9c5565a5';
