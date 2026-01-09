# Data Wipe Instructions

## Overview

This guide explains how to **delete all existing user data** while keeping the app functionality intact. After the wipe, new users can create fresh accounts and the app will continue to save data normally.

---

## What Will Be Deleted

### Database (Supabase)
- ✅ All teacher accounts
- ✅ All student accounts
- ✅ All classes
- ✅ All lesson attempts
- ✅ All student responses
- ✅ All lesson unlocks

### Local Storage (Browser)
- ✅ Student login sessions
- ✅ Teacher login sessions
- ✅ Offline sync queue
- ✅ Cached attempt states
- ✅ IndexedDB lesson cache

---

## What Will Be Preserved

- ✅ Database table structures (no schema changes)
- ✅ Lesson content (all lessons remain)
- ✅ All code and functionality
- ✅ API endpoints
- ✅ Authentication system
- ✅ Data storage capabilities

**After the wipe, the app works exactly as before - just with a clean slate.**

---

## Step 1: Backup (Optional but Recommended)

Before wiping data, you may want to backup existing data:

```bash
# In Supabase SQL Editor, export tables:
SELECT * FROM teachers;
SELECT * FROM students;
SELECT * FROM classes;
SELECT * FROM attempts;
SELECT * FROM responses;
```

Save the results if you need them later.

---

## Step 2: Wipe Database

### Option A: Using Supabase SQL Editor (Recommended)

1. **Go to Supabase Dashboard** → Your Project → SQL Editor
2. **Open the script**: [`scripts/wipe-all-user-data.sql`](scripts/wipe-all-user-data.sql)
3. **Copy the entire script** and paste into SQL Editor
4. **Click "Run"**
5. **Review the output** - should show:
   ```
   ✓ Deleted all responses
   ✓ Deleted all attempts
   ✓ Deleted all lesson unlocks
   ✓ Deleted all students
   ✓ Deleted all classes
   ✓ Deleted all teachers

   ========================================
   DATA WIPE COMPLETE
   ========================================
   Teachers remaining: 0
   Classes remaining: 0
   Students remaining: 0
   Attempts remaining: 0
   Responses remaining: 0
   Lesson unlocks remaining: 0

   Lessons preserved: X
   ========================================
   ✅ All user data successfully deleted
   ```

### Option B: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db reset --db-url "your-database-url"
```

---

## Step 3: Clear Local Storage (All Users)

Each user who has used the app needs to clear their browser's local storage.

### Method 1: Use the Built-in Clear Page

1. **Navigate to**: `https://proto-vocab-ahmedabad.vercel.app/clear-local-storage.html`
2. **Click "Clear All Data"**
3. **Refresh the page**

### Method 2: Browser DevTools

**Chrome/Edge/Brave:**
1. Press `F12` to open DevTools
2. Go to **Application** tab
3. Under **Storage** → **Local Storage** → Click your domain
4. Find all keys starting with `pal_`
5. Right-click each → **Delete**
6. Under **Storage** → **IndexedDB** → Delete `pal_lesson_cache`

**Firefox:**
1. Press `F12` to open DevTools
2. Go to **Storage** tab
3. Under **Local Storage** → Click your domain
4. Find all keys starting with `pal_`
5. Right-click each → **Delete Item**
6. Under **Indexed DB** → Delete `pal_lesson_cache`

**Safari:**
1. Develop menu → Show Web Inspector
2. Go to **Storage** tab
3. Select **Local Storage**
4. Delete all `pal_*` keys

### Method 3: Console Command

Open browser console (F12 → Console) and run:

```javascript
// Clear all PAL app data
Object.keys(localStorage)
  .filter(key => key.startsWith('pal_'))
  .forEach(key => localStorage.removeItem(key));

// Clear IndexedDB
indexedDB.deleteDatabase('pal_lesson_cache');

console.log('✓ PAL app data cleared');
```

---

## Step 4: Verify the Wipe

### Check Database

Run this in Supabase SQL Editor:

```sql
SELECT
  (SELECT COUNT(*) FROM teachers) as teachers,
  (SELECT COUNT(*) FROM classes) as classes,
  (SELECT COUNT(*) FROM students) as students,
  (SELECT COUNT(*) FROM attempts) as attempts,
  (SELECT COUNT(*) FROM responses) as responses,
  (SELECT COUNT(*) FROM lesson_unlocks) as lesson_unlocks,
  (SELECT COUNT(*) FROM lessons) as lessons_preserved;
```

**Expected Result:**
```
teachers: 0
classes: 0
students: 0
attempts: 0
responses: 0
lesson_unlocks: 0
lessons_preserved: 5 (or however many lessons you have)
```

### Check Local Storage

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Run:
   ```javascript
   Object.keys(localStorage).filter(k => k.startsWith('pal_'))
   ```
4. **Expected Result**: `[]` (empty array)

---

## Step 5: Test Fresh Start

1. **Refresh the app** (or navigate to homepage)
2. **Try Student Login**:
   - Should create a new student when entering class code and name
   - Should save session to localStorage
3. **Try Teacher Login**:
   - Should create a new teacher account
   - Should save session to localStorage
4. **Complete a Lesson**:
   - Responses should save to database
   - Progress should persist across page refreshes

**If all tests pass → Wipe successful! ✅**

---

## Troubleshooting

### "Still seeing old data"

**Problem**: Old teacher/student names appear
**Solution**: Clear browser cache completely:
- Chrome: Settings → Privacy → Clear browsing data → All time
- Firefox: Options → Privacy → Clear Data → Everything
- Safari: Safari menu → Clear History → All History

### "Can't create new account"

**Problem**: Database insert fails
**Solution**: Check Row Level Security (RLS) policies in Supabase:
```sql
-- Verify policies allow inserts
SELECT * FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('teachers', 'students', 'classes');
```

### "Local storage not clearing"

**Problem**: Data persists after clearing
**Solution**: Try incognito/private browsing mode, or different browser

---

## Rollback (If Needed)

If you backed up data in Step 1, you can restore it:

```sql
-- Restore from backup (example)
INSERT INTO teachers (id, email, name, school, created_at)
VALUES (...);  -- Your backup data

INSERT INTO students (id, class_id, name, created_at)
VALUES (...);  -- Your backup data

-- Repeat for other tables
```

---

## Summary

✅ **What happens**: All user data deleted
✅ **What stays**: App functionality, lesson content, table structures
✅ **What next**: Fresh accounts can be created immediately
✅ **Is it reversible**: Only if you backed up data first

---

## Files Created

1. **[`scripts/wipe-all-user-data.sql`](scripts/wipe-all-user-data.sql)** - Database wipe script
2. **[`public/clear-local-storage.html`](public/clear-local-storage.html)** - User-friendly localStorage clearing page
3. **[`DATA-WIPE-INSTRUCTIONS.md`](DATA-WIPE-INSTRUCTIONS.md)** - This guide

---

**Questions?** Review the migration plan or check database schema in [`supabase-schema.sql`](supabase-schema.sql).

---

*Last Updated: 2026-01-09*
