# Complete Lesson Lock/Unlock Cleanup - Final Steps

## Status: Code Changes Complete ✅

All code has been cleaned up. Only database migration remains.

---

## Step 1: Drop the `lesson_unlocks` Table in Supabase

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/sguffpxuaahivvponwfb
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Paste this SQL:

```sql
-- Drop the lesson_unlocks table and all related objects
DROP TABLE IF EXISTS lesson_unlocks CASCADE;
```

5. Click "Run" or press Cmd/Ctrl + Enter
6. You should see: "Success. No rows returned"

### Option B: Using Supabase CLI (if installed)

If you have the Supabase CLI installed, run:

```bash
npx supabase db execute --project-ref sguffpxuaahivvponwfb --sql "DROP TABLE IF EXISTS lesson_unlocks CASCADE;"
```

---

## Step 2: Regenerate TypeScript Database Types

After dropping the table, regenerate your types:

```bash
npx supabase gen types typescript --project-id sguffpxuaahivvponwfb > lib/database.types.ts
```

This will:
- Remove the `lesson_unlocks` table types
- Update your `Database` interface
- Ensure type safety

---

## Step 3: Commit Changes

After completing the database migration:

```bash
git add .
git commit -m "feat: Complete removal of lesson lock/unlock system

- Removed all lock/unlock code from application
- Dropped lesson_unlocks table from database
- Regenerated database types
- All lessons now permanently available to all students

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push
```

---

## Verification Checklist

### ✅ Code Changes (Already Complete)
- [x] Deleted `/app/api/teacher/lesson-unlock/route.ts`
- [x] Removed `handleToggleLesson()` from teacher dashboard
- [x] Removed `is_unlocked` field from APIs
- [x] Removed `unlocks` state from student dashboard
- [x] Updated LessonGrid to always show "Start" button
- [x] Removed `LessonUnlock` interface from types
- [x] Cleaned up deletion APIs

### 🔲 Database Migration (To Do)
- [ ] Drop `lesson_unlocks` table in Supabase
- [ ] Regenerate TypeScript types
- [ ] Verify no TypeScript errors (`npm run build`)

### 🔲 Manual Testing (After Migration)
- [ ] Teacher logs in → Class detail → Lessons tab shows "✅ Available"
- [ ] Student logs in → Dashboard shows all lessons with "Start" buttons
- [ ] Student can click any lesson and it starts
- [ ] No console errors in browser
- [ ] Accessing `/api/teacher/lesson-unlock` returns 404

---

## What Changed

### Removed Files:
- `/app/api/teacher/lesson-unlock/route.ts` (119 lines)

### Modified Files:
1. `/app/teacher/class/[classId]/page.tsx`
   - Removed `handleToggleLesson()` function (51 lines)
   - Removed `is_unlocked: boolean` from Lesson interface
   - Simplified logging

2. `/app/api/teacher/class/[classId]/data/route.ts`
   - Removed synthetic `is_unlocked` field
   - Returns pure lesson data

3. `/app/student/dashboard/page.tsx`
   - Removed `unlocks` state and mapping logic
   - Simplified API response handling

4. `/app/api/student/lessons/route.ts`
   - Removed synthetic unlock data generation
   - Response now only returns `lessons` array

5. `/components/ui/LessonGrid.tsx`
   - Removed `unlocks` prop
   - All lessons always clickable
   - Always shows "Start" button

6. `/lib/types.ts`
   - Removed `LessonUnlock` interface

7. `/app/api/teacher/class/[classId]/route.ts`
   - Removed `lesson_unlocks` deletion code

8. `/app/api/teacher/lesson/[lessonId]/route.ts`
   - Removed `lesson_unlocks` deletion code

### Database Changes (Pending):
- Drop `lesson_unlocks` table
- Regenerate `/lib/database.types.ts`

---

## Troubleshooting

### If SQL fails with "relation does not exist"
The table is already dropped. Skip to Step 2 (regenerate types).

### If type generation fails
Check that you have access to the Supabase project:
```bash
npx supabase projects list
```

### If you see TypeScript errors after regenerating types
Run:
```bash
npm run build
```

This will show any remaining type mismatches.

---

## Quick Command Reference

```bash
# Drop table (run SQL in Supabase Dashboard)
DROP TABLE IF EXISTS lesson_unlocks CASCADE;

# Regenerate types
npx supabase gen types typescript --project-id sguffpxuaahivvponwfb > lib/database.types.ts

# Build and check for errors
npm run build

# Commit changes
git add .
git commit -m "feat: Complete removal of lesson lock/unlock system"
git push
```

---

**Next Steps:**
1. Open Supabase Dashboard
2. Run the DROP TABLE command
3. Regenerate types with the command above
4. Run `npm run build` to verify
5. Test in browser (teacher + student flows)
6. Commit and push

All code changes are complete! Just need to execute these database operations.
