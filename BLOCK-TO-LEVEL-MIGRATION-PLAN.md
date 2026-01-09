# Block to Level Migration Plan

## Executive Summary

This document outlines the comprehensive migration strategy to rename all "block" terminology to "level" throughout the codebase. This affects:
- **Database schema**: 3 columns across 2 tables
- **Backend API**: 1 API endpoint + type mappings
- **Frontend code**: TypeScript interfaces, component props, variable names
- **Seed data**: JSONB content in 15+ SQL seed files
- **Documentation**: Comments and markdown files

**Estimated Impact**: ~110 files, with 45 files containing code changes
**Risk Level**: Medium (requires database migration with backward compatibility)
**Migration Strategy**: Phased rollout with backward compatibility layer

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Database Schema Changes](#database-schema-changes)
3. [Backend/API Changes](#backendapi-changes)
4. [Frontend TypeScript Changes](#frontend-typescript-changes)
5. [Seed Data & SQL Files](#seed-data--sql-files)
6. [Migration Execution Plan](#migration-execution-plan)
7. [Rollback Plan](#rollback-plan)
8. [Testing Strategy](#testing-strategy)
9. [Risk Assessment](#risk-assessment)

---

## Current State Analysis

### Database Schema (PostgreSQL)

**Table: `responses`**
- `block_number INTEGER NOT NULL` - The level number for this response

**Table: `attempts`**
- `blocks_completed INTEGER DEFAULT 0` - Number of levels completed
- `blocks_stopped_at INTEGER` - Level where student stopped (2 mistakes)

### Backend Files

**File: `/app/api/student/sync/route.ts`**
- Line 17: `block_number: response.blockNumber` - Maps frontend blockNumber to database
- Line 32: `blocks_stopped_at` parameter
- Line 43-44: `blocks_completed` and `blocks_stopped_at` in UPDATE query

**File: `/lib/database.types.ts`**
- Lines 177, 187, 197: `block_number: number` in Response type definitions
- Lines 145-168: `blocks_completed` and `blocks_stopped_at` in Attempts type definitions

### Frontend Files

**File: `/lib/types.ts`**
- Line 49: `BlockIntroduction` type alias (already has `LevelIntroduction` as primary)
- Line 88: `levelNumber` in ResponseRecord (correct - no change needed)

**File: `/lib/lessonEngine.ts`**
- All references are already "level" terminology (correct)

**File: `/app/teacher/student/[studentId]/page.tsx`**
- Line 22: `block_number: number` in Response interface
- Line 39-40: `blocks_completed`, `blocks_stopped_at` in Attempt interface
- Lines 106-107, 124-125: Querying these fields
- Lines 175: `.select()` includes `block_number`
- Lines 522-618: Variable names `blockStats`, `blockNum`, `blockAccuracy`, `blockDifficulty`

**File: `/lib/soundEffects.ts`**
- Line 8: `BLOCK_COMPLETE = 'block_complete'` enum value

### Seed Data Files (15 files)

All seed files contain JSONB with `"blockNumber": 0/1/2` in lesson content:
- `seed-lesson-2-vocabulary-integrated.sql`
- `seed-lesson-3-reading-integrated.sql`
- `seed-lesson-4-sentence-expansion-integrated.sql`
- `seed-lesson-5-reading-writing-integrated.sql`
- `seed-lessons-grade4-lessons-4-5.sql`
- `seed-lessons-grade4-new-content.sql`
- `seed-lessons-grade4-backup.sql`
- `seed-lessons.sql`
- `seed-test-questions.sql`
- `load-test-questions.js`
- And documentation files with examples

---

## Database Schema Changes

### Phase 1: Add New Columns (Backward Compatible)

**Migration SQL: `001-add-level-columns.sql`**

```sql
-- Add new level columns alongside existing block columns
ALTER TABLE responses
  ADD COLUMN level_number INTEGER;

ALTER TABLE attempts
  ADD COLUMN levels_completed INTEGER DEFAULT 0,
  ADD COLUMN levels_stopped_at INTEGER;

-- Backfill data from existing columns
UPDATE responses
  SET level_number = block_number;

UPDATE attempts
  SET levels_completed = blocks_completed,
      levels_stopped_at = blocks_stopped_at;

-- Make new columns NOT NULL after backfill
ALTER TABLE responses
  ALTER COLUMN level_number SET NOT NULL;

-- Add indexes for new columns
CREATE INDEX idx_responses_level ON responses(level_number);

-- Add comments for clarity
COMMENT ON COLUMN responses.level_number IS 'Level number (replaces block_number)';
COMMENT ON COLUMN responses.block_number IS 'DEPRECATED: Use level_number instead';
COMMENT ON COLUMN attempts.levels_completed IS 'Levels completed (replaces blocks_completed)';
COMMENT ON COLUMN attempts.blocks_completed IS 'DEPRECATED: Use levels_completed instead';
COMMENT ON COLUMN attempts.levels_stopped_at IS 'Level stopped at (replaces blocks_stopped_at)';
COMMENT ON COLUMN attempts.blocks_stopped_at IS 'DEPRECATED: Use levels_stopped_at instead';
```

**Verification Query:**

```sql
-- Verify data integrity
SELECT
  COUNT(*) as total_responses,
  SUM(CASE WHEN block_number = level_number THEN 1 ELSE 0 END) as matching_responses,
  SUM(CASE WHEN block_number IS NULL OR level_number IS NULL THEN 1 ELSE 0 END) as null_responses
FROM responses;

SELECT
  COUNT(*) as total_attempts,
  SUM(CASE WHEN blocks_completed = levels_completed THEN 1 ELSE 0 END) as matching_completed,
  SUM(CASE WHEN blocks_stopped_at = levels_stopped_at OR (blocks_stopped_at IS NULL AND levels_stopped_at IS NULL) THEN 1 ELSE 0 END) as matching_stopped
FROM attempts;
```

### Phase 2: Create Database Triggers (Data Consistency)

**Migration SQL: `002-add-sync-triggers.sql`**

```sql
-- Trigger to keep block_number and level_number in sync during transition
CREATE OR REPLACE FUNCTION sync_response_level_number()
RETURNS TRIGGER AS $$
BEGIN
  -- If level_number is set, sync to block_number
  IF NEW.level_number IS NOT NULL THEN
    NEW.block_number := NEW.level_number;
  END IF;
  -- If block_number is set, sync to level_number (for backward compatibility)
  IF NEW.block_number IS NOT NULL THEN
    NEW.level_number := NEW.block_number;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER responses_sync_level_trigger
  BEFORE INSERT OR UPDATE ON responses
  FOR EACH ROW
  EXECUTE FUNCTION sync_response_level_number();

-- Similar trigger for attempts table
CREATE OR REPLACE FUNCTION sync_attempt_levels()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.levels_completed IS NOT NULL THEN
    NEW.blocks_completed := NEW.levels_completed;
  END IF;
  IF NEW.blocks_completed IS NOT NULL THEN
    NEW.levels_completed := NEW.blocks_completed;
  END IF;
  IF NEW.levels_stopped_at IS NOT NULL THEN
    NEW.blocks_stopped_at := NEW.levels_stopped_at;
  END IF;
  IF NEW.blocks_stopped_at IS NOT NULL THEN
    NEW.levels_stopped_at := NEW.blocks_stopped_at;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER attempts_sync_levels_trigger
  BEFORE INSERT OR UPDATE ON attempts
  FOR EACH ROW
  EXECUTE FUNCTION sync_attempt_levels();
```

### Phase 3: Drop Old Columns (After Full Migration)

**Migration SQL: `003-drop-block-columns.sql`** (Run after transition period)

```sql
-- Drop triggers first
DROP TRIGGER IF EXISTS responses_sync_level_trigger ON responses;
DROP TRIGGER IF EXISTS attempts_sync_levels_trigger ON attempts;
DROP FUNCTION IF EXISTS sync_response_level_number();
DROP FUNCTION IF EXISTS sync_attempt_levels();

-- Drop old columns
ALTER TABLE responses DROP COLUMN block_number;
ALTER TABLE attempts DROP COLUMN blocks_completed;
ALTER TABLE attempts DROP COLUMN blocks_stopped_at;

-- Drop old indexes
DROP INDEX IF EXISTS idx_responses_block;
```

---

## Backend/API Changes

### File: `/lib/database.types.ts`

**Changes Required:**

```typescript
// BEFORE
export type Response = {
  id: string
  attempt_id: string
  question_id: string
  question_type: string
  block_number: number  // OLD
  student_answer: string | null
  is_correct: boolean
  answered_at: string
}

export type Attempt = {
  id: string
  student_id: string
  lesson_id: string
  started_at: string
  completed_at: string | null
  questions_attempted: number
  questions_correct: number
  blocks_completed: number        // OLD
  blocks_stopped_at: number | null // OLD
}

// AFTER
export type Response = {
  id: string
  attempt_id: string
  question_id: string
  question_type: string
  level_number: number  // NEW
  student_answer: string | null
  is_correct: boolean
  answered_at: string
}

export type Attempt = {
  id: string
  student_id: string
  lesson_id: string
  started_at: string
  completed_at: string | null
  questions_attempted: number
  questions_correct: number
  levels_completed: number        // NEW
  levels_stopped_at: number | null // NEW
}
```

### File: `/app/api/student/sync/route.ts`

**Changes Required:**

```typescript
// BEFORE (Lines 13-21)
const { error } = await supabase.from('responses').insert({
  attempt_id: attemptId,
  question_id: response.questionId,
  question_type: response.questionType,
  block_number: response.blockNumber,  // OLD
  student_answer: response.studentAnswer,
  is_correct: response.isCorrect,
  answered_at: response.answeredAt,
})

// AFTER
const { error } = await supabase.from('responses').insert({
  attempt_id: attemptId,
  question_id: response.questionId,
  question_type: response.questionType,
  level_number: response.levelNumber,  // NEW
  student_answer: response.studentAnswer,
  is_correct: response.isCorrect,
  answered_at: response.answeredAt,
})

// BEFORE (Lines 36-46)
const { error } = await supabase
  .from('attempts')
  .update({
    completed_at: completedAt,
    questions_attempted: questionsAttempted,
    questions_correct: questionsCorrect,
    blocks_completed: blocksCompleted,      // OLD
    blocks_stopped_at: blocks_stopped_at,   // OLD
  })
  .eq('id', attemptId)

// AFTER
const { error } = await supabase
  .from('attempts')
  .update({
    completed_at: completedAt,
    questions_attempted: questionsAttempted,
    questions_correct: questionsCorrect,
    levels_completed: levelsCompleted,      // NEW
    levels_stopped_at: levels_stopped_at,   // NEW
  })
  .eq('id', attemptId)

// Also update function parameters (Lines 26-33)
// BEFORE
const {
  attemptId,
  completedAt,
  questionsAttempted,
  questionsCorrect,
  blocksCompleted,      // OLD
  blocks_stopped_at,    // OLD
} = queueItem.data

// AFTER
const {
  attemptId,
  completedAt,
  questionsAttempted,
  questionsCorrect,
  levelsCompleted,      // NEW
  levels_stopped_at,    // NEW
} = queueItem.data
```

---

## Frontend TypeScript Changes

### File: `/lib/types.ts`

**Changes Required:**

```typescript
// Line 49: Remove backward compatibility alias
// BEFORE
export type BlockIntroduction = LevelIntroduction

// AFTER
// Removed - no longer needed

// Note: All other types in this file already use "level" terminology correctly
```

### File: `/lib/soundEffects.ts`

**Changes Required:**

```typescript
// BEFORE (Line 8)
export enum SoundEffect {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  TAP = 'tap',
  BLOCK_COMPLETE = 'block_complete',  // OLD
  LEVEL_COMPLETE = 'level_complete',
  LESSON_COMPLETE = 'lesson_complete',
}

// AFTER
export enum SoundEffect {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  TAP = 'tap',
  LEVEL_COMPLETE = 'level_complete',  // This already exists, remove BLOCK_COMPLETE
  LESSON_COMPLETE = 'lesson_complete',
}

// Update any references from BLOCK_COMPLETE to LEVEL_COMPLETE
```

### File: `/components/game/LevelCompleteModal.tsx`

**Changes Required:**

```typescript
// Line 27: Update sound effect reference
// BEFORE
playSoundEffect(SoundEffect.BLOCK_COMPLETE)

// AFTER
playSoundEffect(SoundEffect.LEVEL_COMPLETE)
```

### File: `/app/teacher/student/[studentId]/page.tsx`

**Changes Required:**

```typescript
// Interface updates (Lines 22, 39-40)
// BEFORE
interface Response {
  question_id: string
  question_type: string
  block_number: number      // OLD
  student_answer: string | null
  is_correct: boolean
  answered_at: string
}

interface Attempt {
  id: string
  lesson_id: string
  lesson_title: string
  started_at: string
  completed_at: string | null
  questions_attempted: number
  questions_correct: number
  blocks_completed: number        // OLD
  blocks_stopped_at: number | null // OLD
  responses: Response[]
}

// AFTER
interface Response {
  question_id: string
  question_type: string
  level_number: number      // NEW
  student_answer: string | null
  is_correct: boolean
  answered_at: string
}

interface Attempt {
  id: string
  lesson_id: string
  lesson_title: string
  started_at: string
  completed_at: string | null
  questions_attempted: number
  questions_correct: number
  levels_completed: number        // NEW
  levels_stopped_at: number | null // NEW
  responses: Response[]
}

// Database query updates (Lines 106-107, 175)
// BEFORE
.select(`
  id,
  lesson_id,
  started_at,
  completed_at,
  questions_attempted,
  questions_correct,
  blocks_completed,    // OLD
  blocks_stopped_at,   // OLD
  lessons!inner(title)
`)

// AFTER
.select(`
  id,
  lesson_id,
  started_at,
  completed_at,
  questions_attempted,
  questions_correct,
  levels_completed,    // NEW
  levels_stopped_at,   // NEW
  lessons!inner(title)
`)

// BEFORE
.select('question_id, question_type, block_number, student_answer, is_correct, answered_at')

// AFTER
.select('question_id, question_type, level_number, student_answer, is_correct, answered_at')

// Variable name updates (Lines 124-125, 522-618)
// BEFORE
blocks_completed: attempt.blocks_completed || 0,
blocks_stopped_at: attempt.blocks_stopped_at,

// AFTER
levels_completed: attempt.levels_completed || 0,
levels_stopped_at: attempt.levels_stopped_at,

// Variable renames throughout stats calculation
// BEFORE
const blockStats = attempt.responses.reduce((acc, response) => {
  if (!acc[response.block_number]) {
    acc[response.block_number] = { total: 0, correct: 0 }
  }
  acc[response.block_number].total++
  if (response.is_correct) acc[response.block_number].correct++
  return acc
}, {} as Record<number, { total: number; correct: number }>)

{Object.entries(blockStats).map(([blockNum, stats]) => {
  const blockAccuracy = calculateAccuracy(stats.correct, stats.total)
  const blockDifficulty = /* ... */

// AFTER
const levelStats = attempt.responses.reduce((acc, response) => {
  if (!acc[response.level_number]) {
    acc[response.level_number] = { total: 0, correct: 0 }
  }
  acc[response.level_number].total++
  if (response.is_correct) acc[response.level_number].correct++
  return acc
}, {} as Record<number, { total: number; correct: number }>)

{Object.entries(levelStats).map(([levelNum, stats]) => {
  const levelAccuracy = calculateAccuracy(stats.correct, stats.total)
  const levelDifficulty = /* ... */
```

### File: `/app/student/lesson/[lessonId]/page.tsx`

**Check for any localStorage/sync queue references:**

```typescript
// If sync queue stores data with "blockNumber", update to "levelNumber"
// Search for any references in syncManager or localStorage code
```

---

## Seed Data & SQL Files

### Lesson Content JSONB Structure

All seed files store lesson content as JSONB with this structure:

```json
{
  "title": "Lesson Title",
  "description": "Description",
  "levels": [
    {
      "levelNumber": 0,  // Currently "blockNumber": 0
      "introduction": { ... },
      "questions": [ ... ]
    }
  ]
}
```

### Files Requiring Updates (15 files)

1. **Primary Seed Files** (Update "blockNumber" to "levelNumber"):
   - `seed-lesson-2-vocabulary-integrated.sql`
   - `seed-lesson-3-reading-integrated.sql`
   - `seed-lesson-4-sentence-expansion-integrated.sql`
   - `seed-lesson-5-reading-writing-integrated.sql`
   - `seed-lessons-grade4-lessons-4-5.sql`
   - `seed-lessons-grade4-new-content.sql`
   - `seed-lessons-grade4-backup.sql`
   - `seed-lessons.sql`

2. **Test Files**:
   - `seed-test-questions.sql` (also has analysis queries referencing `blockNumber`)
   - `load-test-questions.js`

3. **Documentation Files** (Update examples):
   - `docs/ROTATION-IMPLEMENTATION-GUIDE.md`
   - `docs/ROTATION-SETS-PEDAGOGY.md`
   - `docs/QUESTION-TYPES-REFERENCE.md`
   - `docs/ROTATION-SETS-README.md`
   - `docs/HOLISTIC-IMPLEMENTATION-PLAN.md`

### Update Strategy

**Option A: Find & Replace (Risky)**
```bash
# DON'T DO THIS - too risky for complex JSONB
find . -name "*.sql" -type f -exec sed -i '' 's/"blockNumber"/"levelNumber"/g' {} +
```

**Option B: Manual + Script Verification (Recommended)**

1. Create a verification script:

```javascript
// verify-level-migration.js
const fs = require('fs')
const path = require('path')

const sqlFiles = [
  'seed-lesson-2-vocabulary-integrated.sql',
  'seed-lesson-3-reading-integrated.sql',
  'seed-lesson-4-sentence-expansion-integrated.sql',
  'seed-lesson-5-reading-writing-integrated.sql',
  'seed-lessons-grade4-lessons-4-5.sql',
  'seed-lessons-grade4-new-content.sql',
  'seed-lessons-grade4-backup.sql',
  'seed-lessons.sql',
  'seed-test-questions.sql',
]

sqlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8')
  const blockNumberCount = (content.match(/"blockNumber"/g) || []).length
  const levelNumberCount = (content.match(/"levelNumber"/g) || []).length

  console.log(`${file}:`)
  console.log(`  - "blockNumber": ${blockNumberCount} occurrences`)
  console.log(`  - "levelNumber": ${levelNumberCount} occurrences`)

  if (blockNumberCount > 0) {
    console.log(`  ⚠️  Still has blockNumber references!`)
  } else {
    console.log(`  ✅ Migrated to levelNumber`)
  }
  console.log()
})
```

2. Run find & replace in each file carefully
3. Verify with script
4. Test by loading one seed file into staging database

---

## Migration Execution Plan

### Timeline & Phases

**Phase 0: Preparation (Day 0)**
- ✅ Create this migration plan
- ✅ Review with team
- Create staging environment backup
- Set up rollback procedures

**Phase 1: Database Migration (Day 1)**
- Run `001-add-level-columns.sql` in production
- Verify data backfill with verification queries
- Run `002-add-sync-triggers.sql` for dual-write
- Monitor for 24 hours

**Phase 2: Backend Migration (Day 2-3)**
- Update `/lib/database.types.ts`
- Update `/app/api/student/sync/route.ts`
- Deploy backend changes
- Verify triggers are syncing data correctly
- Monitor API logs for errors

**Phase 3: Frontend Migration (Day 4-5)**
- Update `/lib/types.ts` (remove BlockIntroduction alias)
- Update `/lib/soundEffects.ts` (remove BLOCK_COMPLETE)
- Update `/components/game/LevelCompleteModal.tsx`
- Update `/app/teacher/student/[studentId]/page.tsx`
- Deploy frontend changes
- Test student lesson flow end-to-end
- Test teacher analytics page

**Phase 4: Seed Data Migration (Day 6-7)**
- Update all SQL seed files (blockNumber → levelNumber)
- Run verification script
- Test loading seed data in staging
- Document new seed file format
- Update any internal admin tools

**Phase 5: Cleanup (Day 8+)**
- Monitor production for 1 week
- Verify no errors related to block/level terminology
- Run `003-drop-block-columns.sql` to remove old columns
- Update all documentation files
- Remove database triggers

**Phase 6: Verification (Day 9+)**
- Full regression testing
- Verify student can complete lessons
- Verify teacher can view analytics
- Verify offline sync works correctly
- Mark migration as complete

---

## Rollback Plan

### If Issues Occur During Phase 1 (Database)

**Rollback Steps:**
```sql
-- Drop new columns
ALTER TABLE responses DROP COLUMN IF EXISTS level_number;
ALTER TABLE attempts DROP COLUMN IF EXISTS levels_completed;
ALTER TABLE attempts DROP COLUMN IF EXISTS levels_stopped_at;

-- Drop indexes
DROP INDEX IF EXISTS idx_responses_level;

-- Verify old schema still works
SELECT block_number FROM responses LIMIT 1;
SELECT blocks_completed, blocks_stopped_at FROM attempts LIMIT 1;
```

**Impact**: None - old columns still exist

### If Issues Occur During Phase 2 (Backend)

**Rollback Steps:**
1. Revert backend deployment to previous version
2. Database triggers will keep old columns synced
3. No data loss

**Impact**: Minimal - dual-write ensures both columns are populated

### If Issues Occur During Phase 3 (Frontend)

**Rollback Steps:**
1. Revert frontend deployment to previous version
2. Backend will continue using new column names via triggers
3. No data loss

**Impact**: Minimal - triggers ensure compatibility

### If Issues Occur During Phase 5 (Cleanup)

**Emergency Recovery:**
```sql
-- Re-add old columns from new columns
ALTER TABLE responses ADD COLUMN block_number INTEGER;
UPDATE responses SET block_number = level_number;
ALTER TABLE responses ALTER COLUMN block_number SET NOT NULL;

ALTER TABLE attempts ADD COLUMN blocks_completed INTEGER DEFAULT 0;
ALTER TABLE attempts ADD COLUMN blocks_stopped_at INTEGER;
UPDATE attempts SET blocks_completed = levels_completed, blocks_stopped_at = levels_stopped_at;
```

**Impact**: Moderate - requires re-deploying old backend code

---

## Testing Strategy

### Unit Tests

**Test: Database Triggers**
```sql
-- Test INSERT with level_number
INSERT INTO responses (attempt_id, question_id, question_type, level_number, student_answer, is_correct)
VALUES ('test-attempt', 'q1', 'multiple-choice', 2, 'answer', true);

-- Verify block_number is synced
SELECT level_number, block_number FROM responses WHERE attempt_id = 'test-attempt';
-- Expected: level_number=2, block_number=2

-- Test INSERT with block_number (backward compatibility)
INSERT INTO responses (attempt_id, question_id, question_type, block_number, student_answer, is_correct)
VALUES ('test-attempt-2', 'q2', 'multiple-choice', 1, 'answer', false);

-- Verify level_number is synced
SELECT level_number, block_number FROM responses WHERE attempt_id = 'test-attempt-2';
-- Expected: level_number=1, block_number=1
```

**Test: TypeScript Type Checking**
```bash
# Run TypeScript compiler
npm run type-check

# Expected: No errors related to block_number or blocks_completed
```

### Integration Tests

**Test: Student Lesson Completion Flow**
1. Student logs in
2. Starts a lesson
3. Completes all questions in level 1
4. Moves to level 2
5. Completes lesson
6. Verify `levels_completed` is correctly saved in database
7. Verify teacher analytics shows correct level data

**Test: Offline Sync**
1. Student goes offline
2. Completes questions
3. Student comes back online
4. Verify sync queue sends correct `levelNumber` to API
5. Verify data is saved with correct `level_number` in database

**Test: Teacher Analytics**
1. Teacher logs in
2. Views student analytics page
3. Verify level statistics display correctly
4. Verify level numbers are correct (0, 1, 2)
5. Verify no references to "block" in UI

### End-to-End Tests

**Test Script: `test-level-migration.js`**
```javascript
// Test complete student flow after migration
const { chromium } = require('playwright')

async function testLevelMigration() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Student login
  await page.goto('http://localhost:3000/student')
  await page.fill('input[name="classCode"]', 'TEST123')
  await page.fill('input[name="name"]', 'Test Student')
  await page.click('button[type="submit"]')

  // Start lesson
  await page.click('text=Start Lesson')

  // Complete level 1
  for (let i = 0; i < 3; i++) {
    await page.click('button:has-text("Next")')
    await page.waitForTimeout(500)
  }

  // Verify level 2 starts
  const levelText = await page.textContent('text=/Level 2/i')
  console.assert(levelText, 'Level 2 should be displayed')

  // Check database
  const { supabase } = require('./lib/supabase')
  const { data } = await supabase
    .from('responses')
    .select('level_number')
    .order('answered_at', { ascending: false })
    .limit(1)

  console.assert(data[0].level_number === 1, 'Last response should be level_number=1')

  await browser.close()
  console.log('✅ Migration test passed')
}

testLevelMigration()
```

---

## Risk Assessment

### High Risk Items

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data loss during column migration | Critical | Low | Use triggers for dual-write; backup database before migration |
| Offline sync breaks | High | Medium | Test extensively; keep backward compatibility layer for 2 weeks |
| Teacher analytics shows wrong data | High | Low | Extensive testing; gradual rollout |
| Seed files malformed after find & replace | Medium | Medium | Manual review; verification script; staging environment testing |

### Medium Risk Items

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| TypeScript compilation errors | Medium | Low | Run type-check before deployment |
| In-flight attempts have mixed data | Medium | Medium | Triggers ensure consistency |
| Documentation out of sync | Low | High | Update all docs in Phase 5 |

### Low Risk Items

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Variable name confusion | Low | Low | Code review |
| Comments still say "block" | Low | High | Find & replace in comments |

---

## Success Criteria

### Phase 1 Success
- ✅ New columns exist in database
- ✅ Data is backfilled correctly
- ✅ Triggers are active and syncing data
- ✅ No increase in error logs

### Phase 2 Success
- ✅ Backend deployed successfully
- ✅ API endpoints use new column names
- ✅ No 500 errors in API logs
- ✅ Data continues to sync to both old and new columns

### Phase 3 Success
- ✅ Frontend deployed successfully
- ✅ Student can complete lessons
- ✅ No console errors in browser
- ✅ Offline sync works correctly

### Phase 4 Success
- ✅ All seed files updated
- ✅ Verification script shows 0 "blockNumber" references
- ✅ Staging database loads seed data correctly
- ✅ Production lessons display correctly

### Phase 5 Success
- ✅ Old columns dropped
- ✅ Triggers removed
- ✅ Database queries still work
- ✅ No errors for 48 hours post-cleanup

### Overall Success
- ✅ Zero "block" terminology in user-facing UI
- ✅ Zero "block" terminology in code (except comments/docs)
- ✅ Zero "block_number" or "blocks_completed" in database
- ✅ All tests passing
- ✅ No production incidents related to migration

---

## Appendix A: Complete File Checklist

### Database Files (2 files)
- [ ] `supabase-schema.sql` - Update column definitions
- [ ] Create `001-add-level-columns.sql`
- [ ] Create `002-add-sync-triggers.sql`
- [ ] Create `003-drop-block-columns.sql`

### Backend Files (3 files)
- [ ] `/lib/database.types.ts` - Update type definitions
- [ ] `/app/api/student/sync/route.ts` - Update API mapping
- [ ] `/lib/supabase.ts` - Verify no hardcoded column names

### Frontend Files (4 files)
- [ ] `/lib/types.ts` - Remove BlockIntroduction alias
- [ ] `/lib/soundEffects.ts` - Remove BLOCK_COMPLETE enum
- [ ] `/components/game/LevelCompleteModal.tsx` - Update sound effect reference
- [ ] `/app/teacher/student/[studentId]/page.tsx` - Update interfaces, queries, variables

### Seed Data Files (15 files)
- [ ] `seed-lesson-2-vocabulary-integrated.sql`
- [ ] `seed-lesson-3-reading-integrated.sql`
- [ ] `seed-lesson-4-sentence-expansion-integrated.sql`
- [ ] `seed-lesson-5-reading-writing-integrated.sql`
- [ ] `seed-lessons-grade4-lessons-4-5.sql`
- [ ] `seed-lessons-grade4-new-content.sql`
- [ ] `seed-lessons-grade4-backup.sql`
- [ ] `seed-lessons.sql`
- [ ] `seed-test-questions.sql`
- [ ] `load-test-questions.js`
- [ ] `docs/ROTATION-IMPLEMENTATION-GUIDE.md`
- [ ] `docs/ROTATION-SETS-PEDAGOGY.md`
- [ ] `docs/QUESTION-TYPES-REFERENCE.md`
- [ ] `docs/ROTATION-SETS-README.md`
- [ ] `docs/HOLISTIC-IMPLEMENTATION-PLAN.md`

### Test Files (2 files)
- [ ] Create `verify-level-migration.js`
- [ ] Create `test-level-migration.js`

### Documentation Files (Verify only)
- [ ] `README.md`
- [ ] `DESIGN-SYSTEM.md`
- [ ] `LESSON-INTEGRATION-README.md`
- [ ] All other markdown files in `/docs`

**Total Files to Modify: 29 files**
**Total Files to Create: 5 files**

---

## Appendix B: SQL Migration Scripts

### Script 1: Add Level Columns

**File: `migrations/001-add-level-columns.sql`**

```sql
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
```

### Script 2: Add Sync Triggers

**File: `migrations/002-add-sync-triggers.sql`**

```sql
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

-- Test the triggers
DO $$
DECLARE
  test_attempt_id UUID;
  test_response responses%ROWTYPE;
BEGIN
  -- Create test attempt
  INSERT INTO attempts (student_id, lesson_id, levels_completed, levels_stopped_at)
  VALUES (
    (SELECT id FROM students LIMIT 1),
    (SELECT id FROM lessons LIMIT 1),
    2,
    NULL
  )
  RETURNING id INTO test_attempt_id;

  -- Verify trigger synced blocks_completed
  SELECT * INTO test_response FROM attempts WHERE id = test_attempt_id;
  IF test_response.blocks_completed != 2 THEN
    RAISE EXCEPTION 'Trigger test failed: blocks_completed not synced';
  END IF;

  -- Cleanup test data
  DELETE FROM attempts WHERE id = test_attempt_id;

  RAISE NOTICE '✅ Triggers installed and tested successfully';
END $$;

COMMIT;
```

### Script 3: Drop Old Columns

**File: `migrations/003-drop-block-columns.sql`**

```sql
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

-- Confirm before proceeding
-- Run this manually:
-- SELECT 'Type CONFIRM to proceed with dropping block_* columns' AS warning;

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
```

---

## Appendix C: Verification Scripts

### Verification Script 1: Check Seed Files

**File: `scripts/verify-level-migration.js`**

```javascript
#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const sqlFiles = [
  'seed-lesson-2-vocabulary-integrated.sql',
  'seed-lesson-3-reading-integrated.sql',
  'seed-lesson-4-sentence-expansion-integrated.sql',
  'seed-lesson-5-reading-writing-integrated.sql',
  'seed-lessons-grade4-lessons-4-5.sql',
  'seed-lessons-grade4-new-content.sql',
  'seed-lessons-grade4-backup.sql',
  'seed-lessons.sql',
  'seed-test-questions.sql',
]

console.log('🔍 Verifying Block→Level Migration in Seed Files\n')
console.log('=' .repeat(60))

let totalBlockRefs = 0
let filesWithBlockRefs = 0

sqlFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file)

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: FILE NOT FOUND`)
    return
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const blockNumberCount = (content.match(/"blockNumber"/g) || []).length
  const levelNumberCount = (content.match(/"levelNumber"/g) || []).length

  console.log(`\n📄 ${file}`)
  console.log(`   "blockNumber": ${blockNumberCount} occurrences`)
  console.log(`   "levelNumber": ${levelNumberCount} occurrences`)

  if (blockNumberCount > 0) {
    console.log(`   ❌ Still has blockNumber references - NEEDS MIGRATION`)
    totalBlockRefs += blockNumberCount
    filesWithBlockRefs++
  } else if (levelNumberCount > 0) {
    console.log(`   ✅ Successfully migrated to levelNumber`)
  } else {
    console.log(`   ⚠️  No block or level references found`)
  }
})

console.log('\n' + '='.repeat(60))
console.log('📊 SUMMARY')
console.log('='.repeat(60))
console.log(`Total files checked: ${sqlFiles.length}`)
console.log(`Files with "blockNumber": ${filesWithBlockRefs}`)
console.log(`Total "blockNumber" occurrences: ${totalBlockRefs}`)

if (totalBlockRefs === 0) {
  console.log('\n✅ SUCCESS: All seed files have been migrated to "levelNumber"')
  process.exit(0)
} else {
  console.log('\n❌ INCOMPLETE: Migration not finished. Please update remaining files.')
  process.exit(1)
}
```

### Verification Script 2: Check Database Consistency

**File: `scripts/verify-database-migration.sql`**

```sql
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
  AND column_name LIKE '%block%' OR column_name LIKE '%level%'
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
```

---

## Next Steps

1. **Review this plan** with the team
2. **Get approval** for production migration timeline
3. **Create database backup** before Phase 1
4. **Execute Phase 1** (database migration)
5. **Monitor** for 24 hours
6. **Proceed to Phase 2-6** sequentially

**Questions or concerns?** Review the [Rollback Plan](#rollback-plan) and [Risk Assessment](#risk-assessment) sections.

---

*Document Version: 1.0*
*Created: 2026-01-09*
*Last Updated: 2026-01-09*
*Status: Ready for Review*
