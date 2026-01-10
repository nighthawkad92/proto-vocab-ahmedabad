# Blocks to Levels Migration Plan

**Status:** In Progress
**Created:** January 10, 2026
**Last Updated:** January 10, 2026
**Agent ID:** a57b5da (Plan mode agent - can be resumed)

## Executive Summary

Complete migration from "blocks" to "levels" terminology throughout the entire codebase and database. This is a multi-phase migration with backward compatibility during transition.

**Current State:** Database uses `block_*` columns, frontend uses `level_*` terminology, sync route maps between them
**Goal:** Use only "levels" terminology everywhere
**Timeline:** 3-4 weeks total
**Risk Level:** Medium (mitigated by phased approach with triggers)

---

## Current Status Tracking

### ✅ Already Completed
- [x] Database type definitions updated
- [x] Frontend components updated to use "levels"
- [x] Teacher dashboard frontend updated
- [x] Migration scripts created (001, 002, 003)
- [x] Documentation created

### 🔄 In Progress
- [ ] Phase 1-2: Database migration (NOT YET RUN)
- [ ] Phase 3-8: Code updates
- [ ] Phase 9: 2-3 week monitoring period
- [ ] Phase 10-12: Cleanup and finalization

### ⚠️ Critical Issues Found
1. Database still has `blocks_*` columns - migration scripts exist but haven't been executed
2. API sync route writes to `blocks_*` (lines 41, 46 of app/api/student/sync/route.ts)
3. Teacher dashboard queries `blocks_*` (lines 109-110 of app/teacher/student/[studentId]/page.tsx)
4. 9 SQL seed files use `"blockNumber"` in JSONB content
5. Audio file still named `block-complete.wav`

---

## Phase-by-Phase Implementation Guide

### Phase 1: Database Migration - Add Level Columns

**Status:** ⏳ NOT STARTED
**Estimated Time:** 30 minutes
**Risk:** Low (non-destructive, adds columns)

#### Steps:
1. **Create database backup in Supabase dashboard**
   - Go to Database > Backups
   - Create manual backup
   - Note timestamp for rollback

2. **Execute migration script**
   ```bash
   # In Supabase SQL Editor
   # Copy/paste content from:
   migrations/001-add-level-columns.sql
   ```

3. **What this does:**
   - Adds `level_number` to `responses` table
   - Adds `levels_completed`, `levels_stopped_at` to `attempts` table
   - Backfills data from existing `block_*` columns
   - Sets NOT NULL constraints
   - Creates indexes

4. **Verification:**
   - Check migration output shows "✅ All checks passed"
   - Run verification query:
   ```sql
   SELECT COUNT(*) FROM responses WHERE level_number IS NULL;
   SELECT COUNT(*) FROM attempts WHERE levels_completed IS NULL;
   -- Both should return 0
   ```

5. **Rollback if needed:**
   ```sql
   ALTER TABLE responses DROP COLUMN IF EXISTS level_number;
   ALTER TABLE attempts DROP COLUMN IF EXISTS levels_completed;
   ALTER TABLE attempts DROP COLUMN IF EXISTS levels_stopped_at;
   ```

**Files Involved:**
- `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/migrations/001-add-level-columns.sql`

---

### Phase 2: Add Sync Triggers

**Status:** ⏳ NOT STARTED
**Estimated Time:** 15 minutes
**Risk:** Low (enables dual-write)

#### Steps:
1. **Execute trigger migration**
   ```bash
   # In Supabase SQL Editor
   # Copy/paste content from:
   migrations/002-add-sync-triggers.sql
   ```

2. **What this does:**
   - Creates `sync_response_level_number()` function
   - Creates `sync_attempt_levels()` function
   - Adds triggers on INSERT/UPDATE for both tables
   - Ensures writes to either column set sync to the other

3. **Verification:**
   - Insert test row, verify both columns update:
   ```sql
   -- Test responses sync
   INSERT INTO responses (attempt_id, question_id, question_type, level_number, student_answer, is_correct)
   VALUES ('test-id', 'test-q', 'mcq', 1, 'A', true);

   SELECT level_number, block_number FROM responses WHERE attempt_id = 'test-id';
   -- Should show: level_number=1, block_number=1

   DELETE FROM responses WHERE attempt_id = 'test-id';
   ```

4. **Critical:** Do NOT proceed to Phase 3 until triggers are verified working

**Files Involved:**
- `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/migrations/002-add-sync-triggers.sql`

---

### Phase 3: Update API Sync Route

**Status:** ⏳ NOT STARTED
**Estimated Time:** 15 minutes
**Risk:** Medium (affects data saving)

#### Changes Required:

**File:** `app/api/student/sync/route.ts`

**Line 41 - Change from:**
```typescript
blocks_completed: levelsCompleted, // Note: DB still uses "blocks" terminology
```
**To:**
```typescript
levels_completed: levelsCompleted,
```

**Line 46 - Change from:**
```typescript
updateData.blocks_stopped_at = currentLevel
```
**To:**
```typescript
updateData.levels_stopped_at = currentLevel
```

**Why this works:** The triggers from Phase 2 will automatically sync values to `blocks_*` columns.

#### Testing:
1. Have a student complete a level
2. Check both columns updated:
   ```sql
   SELECT levels_completed, blocks_completed FROM attempts ORDER BY started_at DESC LIMIT 1;
   -- Should show identical values
   ```

**Files Involved:**
- `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/app/api/student/sync/route.ts`

---

### Phase 4: Update TTS Generation Route

**Status:** ⏳ NOT STARTED
**Estimated Time:** 10 minutes
**Risk:** Low (only affects TTS generation)

#### Changes Required:

**File:** `app/api/tts/generate-lesson/route.ts`

**Line 38 - Change from:**
```typescript
content.blocks?.forEach((block: any) => {
```
**To:**
```typescript
content.levels?.forEach((level: any) => {
```

**Lines 89-95 - Change from:**
```typescript
updatedContent.blocks = updatedContent.blocks.map((block: any) => ({
  ...block,
  questions: block.questions.map((question: any) => ({
```
**To:**
```typescript
updatedContent.levels = updatedContent.levels.map((level: any) => ({
  ...level,
  questions: level.questions.map((question: any) => ({
```

**Note:** Also rename variable `block` to `level` throughout the function.

**Files Involved:**
- `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/app/api/tts/generate-lesson/route.ts`

---

### Phase 5: Update Teacher Dashboard Queries

**Status:** ⏳ NOT STARTED
**Estimated Time:** 10 minutes
**Risk:** Low (only affects display)

#### Changes Required:

**File:** `app/teacher/student/[studentId]/page.tsx`

**Lines 109-110 - Change SELECT statement from:**
```typescript
.select(`
  id,
  started_at,
  completed_at,
  questions_attempted,
  questions_correct,
  blocks_completed,
  blocks_stopped_at,
  is_abandoned,
  abandoned_at,
  lessons:lesson_id (
    title
  )
`)
```
**To:**
```typescript
.select(`
  id,
  started_at,
  completed_at,
  questions_attempted,
  questions_correct,
  levels_completed,
  levels_stopped_at,
  is_abandoned,
  abandoned_at,
  lessons:lesson_id (
    title
  )
`)
```

**Lines 129-130 - Change mapping from:**
```typescript
levels_completed: attempt.blocks_completed || 0, // DB uses "blocks" terminology
levels_stopped_at: attempt.blocks_stopped_at,    // DB uses "blocks" terminology
```
**To:**
```typescript
levels_completed: attempt.levels_completed || 0,
levels_stopped_at: attempt.levels_stopped_at,
```

**Also:** Remove comments about "DB uses blocks terminology" as they're now outdated.

**Files Involved:**
- `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/app/teacher/student/[studentId]/page.tsx`

---

### Phase 6: Update SQL Seed Files

**Status:** ⏳ NOT STARTED
**Estimated Time:** 30 minutes
**Risk:** Low (only affects new data seeding)

#### Files to Update (9 files):

Replace `"blockNumber"` with `"levelNumber"` in all these files:

1. `seed-lesson-2-vocabulary-integrated.sql`
2. `seed-lesson-3-reading-integrated.sql`
3. `seed-lesson-4-sentence-expansion-integrated.sql`
4. `seed-lesson-5-reading-writing-integrated.sql`
5. `seed-lessons.sql`
6. `seed-lessons-grade4-new-content.sql`
7. `seeds/archive/seed-lessons-grade4-backup.sql`
8. `seeds/archive/seed-lessons-grade4-lessons-4-5.sql`
9. `seeds/archive/seed-test-questions.sql`

#### Automated Approach:
```bash
cd /Users/akashdatta/Desktop/proto-vocab-ahmedabad

# For each file
sed -i '' 's/"blockNumber"/"levelNumber"/g' seed-lesson-2-vocabulary-integrated.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seed-lesson-3-reading-integrated.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seed-lesson-4-sentence-expansion-integrated.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seed-lesson-5-reading-writing-integrated.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seed-lessons.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seed-lessons-grade4-new-content.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seeds/archive/seed-lessons-grade4-backup.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seeds/archive/seed-lessons-grade4-lessons-4-5.sql
sed -i '' 's/"blockNumber"/"levelNumber"/g' seeds/archive/seed-test-questions.sql

# Verify changes
grep -n "blockNumber" seed-lesson-*.sql
# Should return no results
```

**Files Involved:**
- All 9 SQL seed files listed above

---

### Phase 7: Rename Audio File

**Status:** ⏳ NOT STARTED
**Estimated Time:** 1 minute
**Risk:** Very Low

#### Steps:
```bash
cd /Users/akashdatta/Desktop/proto-vocab-ahmedabad
mv public/sounds/block-complete.wav public/sounds/level-complete.wav
```

**Note:** The code in `lib/soundEffects.ts` already references `level-complete.wav`, so only file rename needed.

**Files Involved:**
- `public/sounds/block-complete.wav` → `public/sounds/level-complete.wav`

---

### Phase 8: Update Production Lesson Content

**Status:** ⏳ NOT STARTED
**Estimated Time:** 15 minutes
**Risk:** Medium (modifies production data)

#### Steps:

1. **Create backup:**
   ```sql
   CREATE TABLE lessons_backup_2026_01_10 AS
   SELECT * FROM lessons;
   ```

2. **Execute content migration:**
   ```sql
   BEGIN;

   UPDATE lessons
   SET content = (
     SELECT jsonb_build_object(
       'title', content->>'title',
       'description', content->>'description',
       'levels', (
         SELECT jsonb_agg(
           jsonb_set(
             level - 'blockNumber',
             '{levelNumber}',
             level->'blockNumber'
           )
         )
         FROM jsonb_array_elements(content->'levels') AS level
       )
     )
   )
   WHERE content::text LIKE '%blockNumber%';

   -- Verify before committing
   SELECT
     id,
     title,
     CASE
       WHEN content::text LIKE '%blockNumber%' THEN 'FAILED'
       WHEN content::text LIKE '%levelNumber%' THEN 'SUCCESS'
       ELSE 'NO_LEVELS'
     END as migration_status
   FROM lessons;

   -- Only commit if all rows show SUCCESS or NO_LEVELS
   COMMIT;
   ```

3. **Rollback if needed:**
   ```sql
   ROLLBACK;
   -- Or restore from backup
   DELETE FROM lessons;
   INSERT INTO lessons SELECT * FROM lessons_backup_2026_01_10;
   ```

---

### Phase 9: Deploy Code Changes

**Status:** ⏳ NOT STARTED
**Estimated Time:** 1 hour (including testing)
**Risk:** Medium (affects production)

#### Pre-Deployment Checklist:
- [ ] Phases 1-8 completed successfully
- [ ] All code changes committed to git
- [ ] Local testing completed
- [ ] Database backup confirmed

#### Deployment Steps:

1. **Commit all changes:**
   ```bash
   cd /Users/akashdatta/Desktop/proto-vocab-ahmedabad

   git add app/api/student/sync/route.ts
   git add app/api/tts/generate-lesson/route.ts
   git add "app/teacher/student/[studentId]/page.tsx"
   git add seed-*.sql seeds/
   git add public/sounds/

   git commit -m "feat: Complete migration from blocks to levels terminology

   - Update sync route to write to levels_* columns
   - Update TTS route to use levels structure
   - Update teacher dashboard to query levels_* columns
   - Migrate all SQL seed files to use levelNumber
   - Rename audio file to level-complete.wav

   Database triggers (from Phase 2) maintain backward compatibility
   by syncing values between blocks_* and levels_* columns.

   Part of blocks-to-levels migration plan.

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

   git push origin main
   ```

2. **Monitor Vercel deployment:**
   - Check deployment logs
   - Ensure build succeeds
   - Wait for deployment to complete

3. **Post-Deployment Testing:**
   - [ ] Student can start a lesson
   - [ ] Student can complete questions
   - [ ] Progress saves correctly
   - [ ] Teacher dashboard loads
   - [ ] Teacher can view student details
   - [ ] Sound effects play correctly
   - [ ] No console errors

4. **Verify data sync:**
   ```sql
   -- Check recent attempts
   SELECT
     id,
     levels_completed,
     blocks_completed,
     levels_stopped_at,
     blocks_stopped_at
   FROM attempts
   WHERE started_at > NOW() - INTERVAL '1 hour'
   ORDER BY started_at DESC;

   -- Should show identical values in levels_* and blocks_* columns
   ```

**Rollback Plan:**
```bash
git log --oneline | head -5  # Find commit hash
git revert <commit-hash>
git push origin main
```

---

### Phase 10: Monitoring Period (2-3 Weeks)

**Status:** ⏳ NOT STARTED
**Duration:** 2-3 weeks
**Risk:** Low (monitoring only)

#### Purpose:
Ensure system stability before removing old columns. Both column sets exist and are synced via triggers.

#### Daily Monitoring Tasks:

1. **Check for API errors:**
   ```bash
   # In Vercel dashboard
   # Check error logs for:
   # - Sync route errors
   # - TTS generation errors
   # - Teacher dashboard errors
   ```

2. **Verify data sync (Weekly):**
   ```sql
   -- Check for sync discrepancies
   SELECT COUNT(*) as mismatched_responses
   FROM responses
   WHERE block_number != level_number;

   SELECT COUNT(*) as mismatched_attempts
   FROM attempts
   WHERE blocks_completed != levels_completed
      OR blocks_stopped_at IS DISTINCT FROM levels_stopped_at;

   -- Both should return 0
   ```

3. **Monitor user activity:**
   - Students can complete lessons
   - Progress saves correctly
   - No user-reported issues

#### Success Criteria:
- [ ] No API errors for 2+ weeks
- [ ] 0 sync discrepancies
- [ ] No user-reported data issues
- [ ] All new attempts use levels_* columns
- [ ] Triggers functioning correctly

**Do NOT proceed to Phase 11 until all success criteria met!**

---

### Phase 11: Cleanup - Drop Old Columns

**Status:** ⏳ NOT STARTED
**Estimated Time:** 30 minutes
**Risk:** HIGH ⚠️ (DESTRUCTIVE AND IRREVERSIBLE)

#### ⚠️ CRITICAL PRE-CLEANUP CHECKLIST:
- [ ] Phase 10 monitoring shows no errors for 2+ weeks
- [ ] Validation queries show 0 discrepancies
- [ ] All code deployed and using levels_* columns
- [ ] Database backup created (within last 24 hours)
- [ ] Team approval obtained
- [ ] Read the migration script completely before running

#### Steps:

1. **Final backup:**
   ```bash
   # In Supabase dashboard
   # Database > Backups > Create Backup
   # Download backup locally as additional safety
   ```

2. **Execute cleanup migration:**
   ```bash
   # In Supabase SQL Editor
   # Copy/paste content from:
   migrations/003-drop-block-columns.sql

   # Read all output carefully
   # Look for "✅ Migration completed successfully"
   ```

3. **What this does:**
   - Drops sync triggers
   - Drops trigger functions
   - Drops `block_number` from `responses` table
   - Drops `blocks_completed` from `attempts` table
   - Drops `blocks_stopped_at` from `attempts` table
   - Drops old indexes
   - Verifies cleanup via schema checks

4. **Verify cleanup:**
   ```sql
   -- Should return 0 rows
   SELECT column_name
   FROM information_schema.columns
   WHERE table_name IN ('responses', 'attempts')
     AND column_name LIKE '%block%';
   ```

5. **⚠️ NO ROLLBACK POSSIBLE AFTER THIS POINT**
   - Old columns are permanently deleted
   - Backup is only recovery option
   - Ensure Phase 10 validated success before proceeding

**Files Involved:**
- `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/migrations/003-drop-block-columns.sql`

---

### Phase 12: Remove Legacy Code

**Status:** ⏳ NOT STARTED
**Estimated Time:** 30 minutes
**Risk:** Low (cleanup only)

#### Files to Update:

1. **`lib/lessonCache.ts` (Lines 73-80)**
   - Remove the blocks-to-levels migration logic
   - This was only needed during transition

2. **`app/student/lesson/[lessonId]/page.tsx` (Lines 132-139)**
   - Remove legacy blocks structure handling
   - Lesson content should only have levels now

3. **Remove comments referencing "blocks"**
   - Search codebase for comments mentioning blocks
   - Update or remove as appropriate

#### Verification:
```bash
cd /Users/akashdatta/Desktop/proto-vocab-ahmedabad

# Should return only historical/documentation references
grep -r "block_number\|blocks_completed\|blocks_stopped_at" \
  app/ lib/ components/ \
  --include="*.ts" --include="*.tsx"

# Should return no results
grep -r "blockNumber" . --include="*.sql" | grep -v "archive"
```

---

### Phase 13: Final Verification

**Status:** ⏳ NOT STARTED
**Estimated Time:** 1 hour
**Risk:** None (verification only)

#### Comprehensive Testing:

1. **End-to-End Student Flow:**
   - [ ] Student logs in
   - [ ] Student starts lesson
   - [ ] Student completes all 3 levels (12 questions)
   - [ ] Student sees completion message
   - [ ] Sound effects play correctly

2. **Teacher Dashboard:**
   - [ ] Teacher logs in
   - [ ] Teacher views student list
   - [ ] Teacher clicks on student
   - [ ] All statistics display correctly
   - [ ] Click on attempt to open side sheet
   - [ ] Side sheet shows all details
   - [ ] Detailed breakdown displays correctly

3. **Database Verification:**
   ```sql
   -- Should return 0 rows
   SELECT column_name
   FROM information_schema.columns
   WHERE table_name IN ('responses', 'attempts')
     AND column_name LIKE '%block%';

   -- Should return 0 rows
   SELECT id, title
   FROM lessons
   WHERE content::text LIKE '%blockNumber%';

   -- Check recent data uses new columns
   SELECT id, level_number, answered_at
   FROM responses
   WHERE answered_at > NOW() - INTERVAL '1 day'
   ORDER BY answered_at DESC
   LIMIT 5;
   ```

4. **Code Search:**
   ```bash
   # Should find no active code references
   grep -r "blocks_completed\|blocks_stopped_at\|block_number" \
     app/ lib/ components/ \
     --include="*.ts" --include="*.tsx"
   ```

#### Documentation Updates:

1. **Update this file:**
   - Mark all phases as complete
   - Add completion date
   - Archive as historical reference

2. **Update other docs:**
   - `MIGRATION-EXECUTION-SUMMARY.md` - mark all phases complete
   - Update database schema docs (if any)
   - Update developer onboarding docs

3. **Create completion report:**
   - Summary of changes made
   - Timeline of execution
   - Any issues encountered
   - Lessons learned

---

## Quick Reference

### Critical File Locations

#### Migration Scripts:
- Phase 1: `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/migrations/001-add-level-columns.sql`
- Phase 2: `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/migrations/002-add-sync-triggers.sql`
- Phase 11: `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/migrations/003-drop-block-columns.sql`

#### Code Files to Update:
- Phase 3: `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/app/api/student/sync/route.ts`
- Phase 4: `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/app/api/tts/generate-lesson/route.ts`
- Phase 5: `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/app/teacher/student/[studentId]/page.tsx`
- Phase 6: 9 SQL seed files (see Phase 6 for list)
- Phase 7: `/Users/akashdatta/Desktop/proto-vocab-ahmedabad/public/sounds/block-complete.wav`

#### Backup Locations:
- Supabase Dashboard > Database > Backups
- Local backup (if downloaded)

### Emergency Contacts & Resources

- **Supabase Dashboard:** [Your Supabase URL]
- **Vercel Dashboard:** [Your Vercel URL]
- **GitHub Repo:** https://github.com/nighthawkad92/proto-vocab-ahmedabad
- **Plan Mode Agent ID:** a57b5da (can be resumed in Claude if session times out)

### Rollback Commands Quick Reference

**Phase 1-2 Rollback:**
```sql
DROP TRIGGER IF EXISTS responses_sync_level_trigger ON responses;
DROP TRIGGER IF EXISTS attempts_sync_levels_trigger ON attempts;
DROP FUNCTION IF EXISTS sync_response_level_number();
DROP FUNCTION IF EXISTS sync_attempt_levels();
ALTER TABLE responses DROP COLUMN IF EXISTS level_number;
ALTER TABLE attempts DROP COLUMN IF EXISTS levels_completed;
ALTER TABLE attempts DROP COLUMN IF EXISTS levels_stopped_at;
```

**Phase 3-9 Rollback:**
```bash
git log --oneline | head -5
git revert <commit-hash>
git push origin main
```

**Phase 11 Rollback:**
```
⚠️ NO AUTOMATIC ROLLBACK - MUST RESTORE FROM BACKUP
```

---

## Session Continuity Notes

If this session times out in Claude or Cursor, use these notes to resume:

### Context for Next Session:

1. **What we're doing:** Migrating from "blocks" to "levels" terminology
2. **Why:** Database and code have inconsistent terminology causing confusion and bugs
3. **Current phase:** [UPDATE THIS AS YOU PROGRESS]
4. **Last action taken:** [UPDATE THIS AS YOU PROGRESS]
5. **Next action needed:** [UPDATE THIS AS YOU PROGRESS]

### Key Decisions Made:

- Chosen approach: Phased migration with triggers for backward compatibility
- Timeline: 3-4 weeks with 2-3 week validation period
- Risk tolerance: Medium - using triggers to maintain dual-write during transition
- No downtime required - triggers allow seamless transition

### Important Context:

- This app is in active use with real student data
- Database is Supabase (PostgreSQL)
- Frontend is Next.js deployed on Vercel
- Previous session found the issue when trying to display abandoned attempt details
- The 400 error on responses query led to discovering this migration is incomplete

### Resume Instructions:

1. Read this document completely
2. Check current status section at top
3. Identify which phase you're on
4. Follow steps for that phase
5. Update status as you complete each phase
6. Commit this document with status updates

---

## Change Log

| Date | Phase | Action | Status | Notes |
|------|-------|--------|--------|-------|
| 2026-01-10 | Planning | Created comprehensive migration plan | ✅ Complete | Initial documentation |
| | | | | |
| | | | | |

---

## Notes and Observations

### Lessons Learned:
- [Add notes as you progress]

### Issues Encountered:
- [Document any problems and solutions]

### Timeline Deviations:
- [Note if phases take longer/shorter than estimated]

---

**END OF MIGRATION PLAN**

*Last updated: January 10, 2026*
*Next review: [After Phase 1 completion]*
