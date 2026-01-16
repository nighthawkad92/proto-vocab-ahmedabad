-- Check PostgREST version and settings that might affect caching

-- Check if there are any database-level settings that might cause issues
SHOW ALL;

-- Check the lesson_unlocks table schema
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'lesson_unlocks'
ORDER BY ordinal_position;

-- Check indexes on lesson_unlocks
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'lesson_unlocks';

-- Check if there are any triggers on lesson_unlocks
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'lesson_unlocks';
