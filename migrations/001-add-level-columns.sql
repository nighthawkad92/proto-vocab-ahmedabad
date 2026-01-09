-- Migration: Add level_number columns alongside block_number
-- Date: 2026-01-09
-- Author: Claude Code
-- Description: Phase 1 of block→level migration. Adds new columns with backward compatibility.

BEGIN;

-- Add new level_number column to responses
ALTER TABLE responses
  ADD COLUMN IF NOT EXISTS level_number INTEGER;

-- Add new levels columns to attempts
ALTER TABLE attempts
  ADD COLUMN IF NOT EXISTS levels_completed INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS levels_stopped_at INTEGER;

-- Backfill data from existing columns
UPDATE responses
  SET level_number = block_number
  WHERE level_number IS NULL;

UPDATE attempts
  SET levels_completed = blocks_completed,
      levels_stopped_at = blocks_stopped_at
  WHERE levels_completed IS NULL;

-- Make new columns NOT NULL after backfill
ALTER TABLE responses
  ALTER COLUMN level_number SET NOT NULL,
  ALTER COLUMN level_number SET DEFAULT 0;

ALTER TABLE attempts
  ALTER COLUMN levels_completed SET NOT NULL,
  ALTER COLUMN levels_completed SET DEFAULT 0;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_responses_level ON responses(level_number);

-- Add comments for clarity
COMMENT ON COLUMN responses.level_number IS 'Level number (replaces block_number) - use this field';
COMMENT ON COLUMN responses.block_number IS 'DEPRECATED: Use level_number instead';
COMMENT ON COLUMN attempts.levels_completed IS 'Levels completed (replaces blocks_completed) - use this field';
COMMENT ON COLUMN attempts.blocks_completed IS 'DEPRECATED: Use levels_completed instead';
COMMENT ON COLUMN attempts.levels_stopped_at IS 'Level stopped at (replaces blocks_stopped_at) - use this field';
COMMENT ON COLUMN attempts.blocks_stopped_at IS 'DEPRECATED: Use levels_stopped_at instead';

-- Verification
DO $$
DECLARE
  response_count INTEGER;
  matching_responses INTEGER;
  attempt_count INTEGER;
  matching_attempts INTEGER;
BEGIN
  SELECT COUNT(*) INTO response_count FROM responses;
  SELECT COUNT(*) INTO matching_responses
    FROM responses
    WHERE block_number = level_number;

  SELECT COUNT(*) INTO attempt_count FROM attempts;
  SELECT COUNT(*) INTO matching_attempts
    FROM attempts
    WHERE blocks_completed = levels_completed
      AND (blocks_stopped_at = levels_stopped_at OR (blocks_stopped_at IS NULL AND levels_stopped_at IS NULL));

  RAISE NOTICE 'Migration verification:';
  RAISE NOTICE '  Responses: % total, % matching (%.2f%%)',
    response_count,
    matching_responses,
    (matching_responses::float / NULLIF(response_count, 0) * 100);
  RAISE NOTICE '  Attempts: % total, % matching (%.2f%%)',
    attempt_count,
    matching_attempts,
    (matching_attempts::float / NULLIF(attempt_count, 0) * 100);

  IF matching_responses < response_count THEN
    RAISE EXCEPTION 'Data integrity check failed: not all responses backfilled correctly';
  END IF;

  IF matching_attempts < attempt_count THEN
    RAISE EXCEPTION 'Data integrity check failed: not all attempts backfilled correctly';
  END IF;

  RAISE NOTICE '✅ Migration successful - all data backfilled correctly';
END $$;

COMMIT;
