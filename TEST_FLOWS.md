# End-to-End Flow Testing Guide

## Prerequisites
1. Run the RLS fix: Execute `fix-all-rls.sql` in Supabase SQL Editor
2. Ensure dev server is running: `npm run dev`
3. Open http://localhost:3000

## Test 1: Teacher Flow ✅

### Step 1: Teacher Login
- Navigate to http://localhost:3000/teacher
- Verify "Varnika" is pre-filled
- Click "Continue"
- **Expected**: Redirects to `/teacher/dashboard`
- **Verify**: "Welcome, Varnika! 👩‍🏫" appears

### Step 2: Create Class
- Click "+ New Class" button
- Enter class name: "Class 3-A"
- Click "Create"
- **Expected**: Class appears in the list with a class code (e.g., "ABC123")
- **Verify**: Class code is displayed prominently
- **Copy the class code for next test**

### Step 3: Manage Class
- Click on the class card
- **Expected**: Redirects to `/teacher/class/{classId}`
- **Verify**: Class name appears at top
- **Verify**: Lessons tab is active
- **Verify**: 3 lessons are listed (Animals, Colors, Body Parts)
- **Verify**: All lessons show "🔒 Locked" initially

### Step 4: Unlock Lessons
- Click toggle on "Animals Around Us" lesson
- **Expected**: Lock changes to "🔓 Unlocked"
- Click toggle on "Bright Colors" lesson
- **Expected**: Lock changes to "🔓 Unlocked"
- **Verify**: "My Body" remains locked

## Test 2: Student Flow ✅

### Step 1: Student Login
- Open new incognito/private window
- Navigate to http://localhost:3000/student
- Enter the class code from Teacher Test (e.g., "ABC123")
- Enter student name: "Raj"
- Click "Join Class"
- **Expected**: Redirects to `/student/dashboard`
- **Verify**: "Hi, Raj! 📚" appears

### Step 2: View Available Lessons
- **Verify**: Only unlocked lessons are clickable
- **Verify**: "Animals Around Us" shows "Start Lesson" button
- **Verify**: "Bright Colors" shows "Start Lesson" button
- **Verify**: "My Body" shows "🔒 Locked" and is grayed out

### Step 3: Start Lesson
- Click "Start Lesson" on "Animals Around Us"
- **Expected**: Redirects to `/student/lesson/{lessonId}`
- **Verify**: Question appears with 4 options
- **Verify**: Progress bar shows "Block 1 of 2"
- **Verify**: Mistake counter shows "0/2 mistakes"

### Step 4: Answer Questions (Correct)
- Click correct answer
- **Expected**: Green feedback modal appears with "🎉 Correct!"
- **Expected**: Modal auto-closes after 1.5s
- **Expected**: Next question appears
- **Verify**: Progress updates
- Continue answering correctly through Block 1 (4 questions)

### Step 5: Block Completion
- After 4th correct answer in Block 1
- **Expected**: Block complete modal appears
- **Verify**: Shows "Block 1 Complete! 🎉"
- **Verify**: Shows accuracy percentage
- Click "Continue to Block 2"
- **Expected**: Block 2 questions begin
- **Verify**: Progress bar shows "Block 2 of 2"

### Step 6: Test 2-Mistake Rule
- Answer 1st question INCORRECTLY
- **Expected**: Red feedback modal "Not quite! Try again! 🤔"
- **Verify**: Mistake counter shows "1/2 mistakes"
- Answer 2nd question INCORRECTLY
- **Expected**: Red feedback modal appears
- **Verify**: Mistake counter shows "2/2 mistakes"
- **Expected**: Block stops immediately
- **Expected**: Block complete modal shows "You've completed Block 2"
- **Verify**: Message mentions stopping after 2 mistakes

### Step 7: Lesson Completion
- Click "Back to Lessons"
- **Expected**: Returns to `/student/dashboard`
- **Verify**: "Animals Around Us" now shows completion status

## Test 3: Data Persistence ✅

### Step 1: Refresh Student Page
- On student dashboard, press F5 to refresh
- **Expected**: Still logged in as "Raj"
- **Expected**: Lesson progress is maintained
- **Verify**: Session persists in localStorage

### Step 2: Refresh Teacher Page
- On teacher dashboard, press F5 to refresh
- **Expected**: Still logged in as "Varnika"
- **Expected**: Classes are still visible
- **Verify**: Session persists in localStorage

## Test 4: Multiple Students ✅

### Step 1: Second Student Login
- Open another incognito window
- Navigate to http://localhost:3000/student
- Enter same class code
- Enter student name: "Priya"
- Click "Join Class"
- **Expected**: Successfully joins same class
- **Verify**: "Hi, Priya! 📚" appears

### Step 2: Teacher Views Students
- Go back to teacher's class detail page
- Click "Students" tab
- **Expected**: Both "Raj" and "Priya" appear in the list
- **Verify**: Student count shows "2 students"

## Test 5: Offline Mode (PWA) ✅

**Note**: PWA only works in production, not in development mode

### In Production (after deployment):
1. Open app in Chrome/Edge
2. Go offline (disconnect internet)
3. Start a lesson
4. Answer questions
5. **Verify**: Questions load from cache
6. **Verify**: Responses are queued
7. Go back online
8. **Verify**: Queued responses sync automatically

## Common Issues & Solutions

### Issue: "Failed to login"
- **Solution**: Run `fix-all-rls.sql` in Supabase SQL Editor
- **Cause**: RLS policies blocking inserts

### Issue: "Failed to create class"
- **Solution**: Run `fix-all-rls.sql` in Supabase SQL Editor
- **Cause**: RLS policies blocking class creation

### Issue: Teacher logout doesn't work
- **Solution**: Click browser back button or go to http://localhost:3000/teacher
- **Note**: Logout clears localStorage

### Issue: Student can't see unlocked lessons
- **Solution**: Refresh the student dashboard page
- **Cause**: State not automatically updated

### Issue: 2-mistake rule not working
- **Check**: Look at browser console for errors
- **Verify**: LessonEngine is tracking mistakes correctly

## Success Criteria

All tests pass if:
- ✅ Teacher can login with just name
- ✅ Teacher can create classes and get class codes
- ✅ Teacher can unlock/lock lessons
- ✅ Students can join with class code + name
- ✅ Students see only unlocked lessons
- ✅ Students can complete lessons
- ✅ 2-mistake rule stops blocks correctly
- ✅ Data persists on page refresh
- ✅ Multiple students can join same class
- ✅ Teacher can view all students

## Database Verification Queries

Run these in Supabase SQL Editor to verify data:

```sql
-- Check teachers
SELECT * FROM teachers;

-- Check classes
SELECT * FROM classes;

-- Check students
SELECT * FROM students;

-- Check lesson unlocks
SELECT
  c.name as class_name,
  l.title as lesson_title,
  lu.unlocked_at
FROM lesson_unlocks lu
JOIN classes c ON lu.class_id = c.id
JOIN lessons l ON lu.lesson_id = l.id;

-- Check attempts
SELECT
  s.name as student_name,
  l.title as lesson_title,
  a.started_at,
  a.completed_at,
  a.questions_attempted,
  a.questions_correct
FROM attempts a
JOIN students s ON a.student_id = s.id
JOIN lessons l ON a.lesson_id = l.id
ORDER BY a.started_at DESC;

-- Check responses
SELECT
  s.name as student_name,
  r.question_id,
  r.student_answer,
  r.is_correct
FROM responses r
JOIN attempts a ON r.attempt_id = a.id
JOIN students s ON a.student_id = s.id
ORDER BY r.answered_at DESC
LIMIT 20;
```
