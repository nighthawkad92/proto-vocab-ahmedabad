# 🚨 QUICK FIX - Run This Now

## Problem
Students see "Failed to load lesson. Please try again." when clicking on lessons.

## Solution
Run the RLS fix SQL in Supabase.

## Steps (2 minutes)

### 1. Open Supabase SQL Editor
Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

### 2. Copy This Entire SQL
Open the file: `COMPLETE_RLS_FIX.sql` in this directory

### 3. Paste and Run
- Paste all content into Supabase SQL Editor
- Click "Run" button
- Wait for "Success" message

### 4. Test
1. Go to: https://proto-vocab-ahmedabad.vercel.app/student
2. Login with code: `LGI550` + any name
3. Click on "Breaking Big Words" lesson
4. **It should now work!** ✅

---

## What This Does

Fixes Row Level Security (RLS) policies so that:
- Students can READ lessons
- Students can CREATE attempts
- Students can SAVE responses
- Teachers can manage classes
- Everything works without authentication errors

---

**File to run:** `COMPLETE_RLS_FIX.sql` (138 lines)
**Expected result:** "Success" + verification query showing all policies
