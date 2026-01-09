-- Verification script for block→level database migration
-- Run this after each migration phase

\echo '🔍 Verifying Block→Level Database Migration'
\echo ''

-- Check 1: Column existence
\echo '📊 Phase 1: Checking column existence...'
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name IN ('responses', 'attempts')
  AND (column_name LIKE '%block%' OR column_name LIKE '%level%')
ORDER BY table_name, column_name;

\echo ''
\echo '📊 Phase 2: Checking data consistency...'

-- Check 2: Responses table data consistency
SELECT
  'responses' as table_name,
  COUNT(*) as total_rows,
  SUM(CASE WHEN block_number = level_number THEN 1 ELSE 0 END) as matching_rows,
  SUM(CASE WHEN block_number != level_number THEN 1 ELSE 0 END) as mismatched_rows,
  SUM(CASE WHEN block_number IS NULL THEN 1 ELSE 0 END) as null_block_number,
  SUM(CASE WHEN level_number IS NULL THEN 1 ELSE 0 END) as null_level_number
FROM responses;

-- Check 3: Attempts table data consistency
SELECT
  'attempts' as table_name,
  COUNT(*) as total_rows,
  SUM(CASE WHEN blocks_completed = levels_completed THEN 1 ELSE 0 END) as matching_completed,
  SUM(CASE WHEN blocks_completed != levels_completed THEN 1 ELSE 0 END) as mismatched_completed,
  SUM(CASE WHEN blocks_stopped_at IS DISTINCT FROM levels_stopped_at THEN 1 ELSE 0 END) as mismatched_stopped,
  SUM(CASE WHEN blocks_completed IS NULL THEN 1 ELSE 0 END) as null_blocks_completed,
  SUM(CASE WHEN levels_completed IS NULL THEN 1 ELSE 0 END) as null_levels_completed
FROM attempts;

\echo ''
\echo '📊 Phase 3: Checking triggers...'

-- Check 4: Verify triggers exist
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name LIKE '%sync%level%' OR trigger_name LIKE '%sync%block%';

\echo ''
\echo '📊 Phase 4: Sample data inspection...'

-- Check 5: Sample recent responses
SELECT
  id,
  question_id,
  block_number,
  level_number,
  is_correct,
  answered_at
FROM responses
ORDER BY answered_at DESC
LIMIT 5;

-- Check 6: Sample recent attempts
SELECT
  id,
  blocks_completed,
  levels_completed,
  blocks_stopped_at,
  levels_stopped_at,
  completed_at
FROM attempts
ORDER BY started_at DESC
LIMIT 5;

\echo ''
\echo '✅ Verification complete. Review results above.'
