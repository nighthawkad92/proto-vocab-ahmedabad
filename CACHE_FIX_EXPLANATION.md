# Cache Fix for Missing Questions Issue

## Problem Identified

Users were seeing only 2 questions per level instead of 4 questions because:

1. **Browser Cache Issue**: The app uses IndexedDB to cache lesson content for offline use
2. **Outdated Cached Data**: Users who accessed the site before January 10, 2026 cached old lesson data with only 2 questions per level
3. **Cache Not Invalidated**: When the database was updated on Jan 10 with correct data (4 questions per level), the cache version number wasn't bumped
4. **Result**: Users kept seeing old cached data with only 2 questions

## Root Cause

From DATABASE_UPDATE_LOG.md:
- Lessons 2-5 originally had **2, 1, 1 questions** per level
- Database was updated to have **4, 4, 4 questions** per level
- But browser caches still contained the old data

## Solution Applied

**File Changed**: `lib/lessonCache.ts`

Changed cache version from 2 to 3:
```typescript
const DB_VERSION = 3  // Bumped to invalidate old cache with incorrect question counts
```

## How It Works

- IndexedDB has built-in version management
- When the version number increases, it triggers an `onupgradeneeded` event
- This automatically clears old data and creates a fresh cache
- Next time users visit, they'll fetch fresh data from the database with all 4 questions

## User Impact

### Before Fix:
- Progress bar showed "Question 1 of 2"
- Only 2 questions appeared per level
- Early level completion after just 2 questions

### After Fix (once deployed):
- Progress bar will show "Question 1 of 4"
- All 4 questions will appear per level
- Proper lesson experience with full content

## Immediate Workaround

For users experiencing the issue RIGHT NOW (before deployment):

1. Visit: https://proto-vocab-ahmedabad.vercel.app/clear-cache.html
2. Click "Clear Cache"
3. Refresh and log back in

## Verification

After deployment, users should:
1. Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Start any lesson
3. Verify progress bar shows "Question 1 of 4"
4. Complete all 4 questions in each level

## Database Status

✅ Production database is CORRECT with:
- 5 lessons
- 3 levels per lesson
- 4 questions per level
- 2 rotation sets per level (for variety on retakes)

The issue was purely in the browser cache layer, not the database.
