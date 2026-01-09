-- Migration: Remove deprecated block_* columns
-- Date: TBD (Run 2+ weeks after Phase 3 deployment)
-- Author: Claude Code
-- Description: Phase 5 of block→level migration. Removes old columns after transition period.
-- ⚠️  WARNING: This is a destructive migration. Ensure all code is using level_* columns first.

-- Pre-migration checks
DO $$
DECLARE
  check_passed BOOLEAN := true;
BEGIN
  RAISE NOTICE 'Running pre-migration checks...';

  -- Check 1: Verify no NULL level_number values
  IF EXISTS (SELECT 1 FROM responses WHERE level_number IS NULL LIMIT 1) THEN
    RAISE EXCEPTION 'Pre-check failed: Found NULL level_number values in responses table';
    check_passed := false;
  END IF;

  -- Check 2: Verify no NULL levels_completed values
  IF EXISTS (SELECT 1 FROM attempts WHERE levels_completed IS NULL LIMIT 1) THEN
    RAISE EXCEPTION 'Pre-check failed: Found NULL levels_completed values in attempts table';
    check_passed := false;
  END IF;

  -- Check 3: Verify columns are in sync
  IF EXISTS (
    SELECT 1 FROM responses
    WHERE block_number != level_number
    LIMIT 1
  ) THEN
    RAISE WARNING 'Found responses with mismatched block_number and level_number';
  END IF;

  IF EXISTS (
    SELECT 1 FROM attempts
    WHERE blocks_completed != levels_completed
      OR (blocks_stopped_at IS DISTINCT FROM levels_stopped_at)
    LIMIT 1
  ) THEN
    RAISE WARNING 'Found attempts with mismatched block and level columns';
  END IF;

  IF check_passed THEN
    RAISE NOTICE '✅ All pre-migration checks passed';
  END IF;
END $$;

BEGIN;

-- Drop triggers first
DROP TRIGGER IF EXISTS responses_sync_level_trigger ON responses;
DROP TRIGGER IF EXISTS attempts_sync_levels_trigger ON attempts;

-- Drop trigger functions
DROP FUNCTION IF EXISTS sync_response_level_number();
DROP FUNCTION IF EXISTS sync_attempt_levels();

-- Drop old indexes
DROP INDEX IF EXISTS idx_responses_block;

-- Drop old columns from responses
ALTER TABLE responses DROP COLUMN IF EXISTS block_number;

-- Drop old columns from attempts
ALTER TABLE attempts DROP COLUMN IF EXISTS blocks_completed;
ALTER TABLE attempts DROP COLUMN IF EXISTS blocks_stopped_at;

-- Final verification
DO $$
BEGIN
  -- Verify block_number is gone
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'responses' AND column_name = 'block_number'
  ) THEN
    RAISE EXCEPTION 'Migration failed: block_number column still exists';
  END IF;

  -- Verify blocks_completed is gone
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'attempts' AND column_name = 'blocks_completed'
  ) THEN
    RAISE EXCEPTION 'Migration failed: blocks_completed column still exists';
  END IF;

  -- Verify blocks_stopped_at is gone
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'attempts' AND column_name = 'blocks_stopped_at'
  ) THEN
    RAISE EXCEPTION 'Migration failed: blocks_stopped_at column still exists';
  END IF;

  RAISE NOTICE '✅ Migration completed successfully';
  RAISE NOTICE 'Old block_* columns have been removed';
  RAISE NOTICE 'All queries must now use level_* columns';
END $$;

COMMIT;
