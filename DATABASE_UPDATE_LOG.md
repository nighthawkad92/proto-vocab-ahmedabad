# Database Update Log

## Date: January 10, 2026

### Issue Identified
Production database had outdated lesson data with insufficient questions per level:
- **Lesson 2**: Only 2, 1, 1 questions per level (should be 4, 4, 4)
- **Lesson 3**: Only 2, 1, 1 questions per level (should be 4, 4, 4)
- **Lesson 4**: Only 2 questions per level + had 4 levels instead of 3 (should be 4, 4, 4 across 3 levels)
- **Lesson 5**: Only 2, 1, 1 questions per level (should be 4, 4, 4)
- **Missing rotation sets**: Lessons 3-5 had no rotation sets for question variety

### Root Cause
Database was seeded with an older version of the lesson content that didn't match the updated seed files (seed-lessons-grade4.sql).

### Solution Applied
Updated all lessons directly in production database using Supabase REST API to match the correct seed file content.

## Updates Performed

### ✅ Lesson 1: Breaking Big Words
- **Before**: 4, 4, 4 questions (already correct)
- **After**: 4, 4, 4 questions ✓
- **Changes**: Added rotation sets for all levels
- **Status**: PERFECT ✨

### ✅ Lesson 2: Vocabulary in Context
- **Before**: 2, 1, 1 questions
- **After**: 4, 4, 4 questions ✓
- **Changes**:
  - Added 2 missing questions to Level 0
  - Added 3 missing questions to Level 1
  - Added 3 missing questions to Level 2
  - Added rotation sets (2 sets × 4 questions each per level)
  - Added missing introductions for Level 1 & 2
- **Status**: PERFECT ✨

### ✅ Lesson 3: Reading Short Paragraphs
- **Before**: 2, 1, 1 questions
- **After**: 4, 4, 4 questions ✓
- **Changes**:
  - Added 2 missing questions to Level 0
  - Added 3 missing questions to Level 1
  - Added 3 missing questions to Level 2
  - Added rotation sets (2 sets × 4 questions each per level)
- **Status**: PERFECT ✨

### ✅ Lesson 4: Sentence Expansion
- **Before**: 2, 2, 2, 2 questions across 4 levels
- **After**: 4, 4, 4 questions across 3 levels ✓
- **Changes**:
  - Fixed level count from 4 to 3 levels
  - Added 2 missing questions per level
  - Added rotation sets (2 sets × 4 questions each per level)
- **Status**: PERFECT ✨

### ✅ Lesson 5: Reading and Writing Connection
- **Before**: 2, 1, 1 questions
- **After**: 4, 4, 4 questions ✓
- **Changes**:
  - Added 2 missing questions to Level 0
  - Added 3 missing questions to Level 1
  - Added 3 missing questions to Level 2
  - Added rotation sets (2 sets × 4 questions each per level)
- **Status**: PERFECT ✨

## Final State

All 5 lessons now have:
- ✅ **4 questions per level** (as per PAL curriculum)
- ✅ **2 rotation sets per level** (each with 4 questions for variety on retakes)
- ✅ **3 levels per lesson** (EASY, MEDIUM, HARD)
- ✅ **Introduction screens** for Level 0 (some lessons have intros for all levels)

## Rotation Logic

Each student attempt cycles through 3 question sets:
- **Attempt 1**: Default questions (4 questions)
- **Attempt 2**: Rotation Set 1 (4 questions)
- **Attempt 3**: Rotation Set 2 (4 questions)
- **Attempt 4**: Back to Default questions (cycle repeats)

Formula: `rotationIndex = (attemptNumber - 1) % 3`

## Verification

Database audit performed on: January 10, 2026
```
✨ ALL LESSONS PERFECT!

Lesson 1: 4/4/4 questions ✓
Lesson 2: 4/4/4 questions ✓
Lesson 3: 4/4/4 questions ✓
Lesson 4: 4/4/4 questions ✓
Lesson 5: 4/4/4 questions ✓
```

## Impact on Students

- **Previous behavior**: Students saw only 2 questions per level in most lessons
- **New behavior**: Students now see all 4 questions per level (assuming they answer correctly)
- **2-mistake rule**: Still enforced - if a student gets 2 questions wrong in a level, they stop early
- **Variety on retakes**: Students get different questions when retrying the same lesson

## Next Steps for Users

1. **Hard refresh** your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. **Clear any cached attempts** (if needed - existing incomplete attempts may have old question counts)
3. **Test all lessons** to verify 4 questions appear per level

## Technical Details

- **Update method**: Direct database updates via Supabase REST API
- **Scripts used**: `/tmp/fix-all-lessons.js`
- **Verification**: `/tmp/audit-fresh.js`
- **Documentation**: This file + `RESEED_INSTRUCTIONS.md`

## Files Modified

- `seed-lessons-grade4.sql`: Already had correct data
- Production database: Updated to match seed file
- No code changes required (code already supported 4 questions per level)
