-- Migration: Add triggers to keep block and level columns in sync
-- Date: 2026-01-09
-- Author: Claude Code
-- Description: Phase 2 of block→level migration. Ensures data consistency during transition.

BEGIN;

-- Function to sync response level/block numbers
CREATE OR REPLACE FUNCTION sync_response_level_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Priority: level_number → block_number (new code writes to level_number)
  IF NEW.level_number IS NOT NULL THEN
    NEW.block_number := NEW.level_number;
  ELSIF NEW.block_number IS NOT NULL THEN
    -- Fallback: block_number → level_number (old code compatibility)
    NEW.level_number := NEW.block_number;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for responses
DROP TRIGGER IF EXISTS responses_sync_level_trigger ON responses;
CREATE TRIGGER responses_sync_level_trigger
  BEFORE INSERT OR UPDATE ON responses
  FOR EACH ROW
  EXECUTE FUNCTION sync_response_level_number();

-- Function to sync attempt levels/blocks
CREATE OR REPLACE FUNCTION sync_attempt_levels()
RETURNS TRIGGER AS $$
BEGIN
  -- Priority: levels_* → blocks_* (new code writes to levels_*)
  IF NEW.levels_completed IS NOT NULL THEN
    NEW.blocks_completed := NEW.levels_completed;
  ELSIF NEW.blocks_completed IS NOT NULL THEN
    -- Fallback: blocks_* → levels_* (old code compatibility)
    NEW.levels_completed := NEW.blocks_completed;
  END IF;

  IF NEW.levels_stopped_at IS NOT NULL THEN
    NEW.blocks_stopped_at := NEW.levels_stopped_at;
  ELSIF NEW.blocks_stopped_at IS NOT NULL THEN
    NEW.levels_stopped_at := NEW.blocks_stopped_at;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for attempts
DROP TRIGGER IF EXISTS attempts_sync_levels_trigger ON attempts;
CREATE TRIGGER attempts_sync_levels_trigger
  BEFORE INSERT OR UPDATE ON attempts
  FOR EACH ROW
  EXECUTE FUNCTION sync_attempt_levels();

RAISE NOTICE '✅ Triggers installed successfully';

COMMIT;
