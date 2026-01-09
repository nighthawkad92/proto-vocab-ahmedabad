# PAL Vocabulary App - Deployment Checklist

## ✅ Completed Tasks

### 1. Database Setup
- [x] Grade 4 lessons loaded (5 lessons total)
- [ ] **PENDING: RLS policies need to be applied**

### 2. Code Updates
- [x] Updated teacher dashboard to use Grade 4
- [x] Updated student API to fetch Grade 4 lessons
- [x] Updated teacher class page to show Grade 4 lessons
- [x] Added IntroductionCard component
- [x] Updated lesson flow to show introductions
- [x] Built and deployed to Vercel

## 🔧 Required Steps to Fix Current Issue

### **IMMEDIATE: Run RLS Fix SQL**

The app is currently broken because students cannot read lessons due to Row Level Security policies.

**Action Required:**
1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
2. Copy **ALL** contents from `COMPLETE_RLS_FIX.sql`
3. Paste into SQL Editor
4. Click "Run"
5. Verify you see success messages for all policies

**What this fixes:**
- ✅ Lessons table - Students can read lesson content
- ✅ Attempts table - Students can create and track attempts
- ✅ Responses table - Students can save answers
- ✅ Students table - Student login and updates work
- ✅ Teachers table - Teacher operations work
- ✅ Classes table - Class management works
- ✅ Lesson_unlocks table - Lesson unlocking works

## 📋 Testing After RLS Fix

### Teacher Flow
1. Go to https://proto-vocab-ahmedabad.vercel.app/teacher
2. Login as "Varnika"
3. Create or select class "3a" (code: LGI550)
4. You should see 5 lessons:
   - Breaking Big Words
   - Understanding New Words
   - Reading Stories
   - Making Better Sentences
   - Understanding Stories
5. Click toggle to unlock Lesson 1

### Student Flow
1. Go to https://proto-vocab-ahmedabad.vercel.app/student
2. Login with code "LGI550" and any name
3. You should see 1 unlocked lesson
4. Click "Start Lesson"
5. **This should now work** - you'll see the Introduction Card
6. Click "I'm Ready! Let's Start! 🚀"
7. Answer questions
8. Complete the block

### Expected Behavior
- ✅ Introduction card shows before questions
- ✅ Questions load properly
- ✅ Answers are saved
- ✅ Progress bar works
- ✅ 2-mistake rule applies
- ✅ Block completion screen shows

## 🐛 Known Issues

None after RLS fix is applied.

## 📝 Grade 4 Lesson Structure

Each of the 5 lessons has:
- **Block 0** with introduction + 4 EASY questions
- **Block 1** with 4 MEDIUM/HARD questions
- **Total:** 8 questions per lesson
- **2-Mistake Rule:** Students can make 2 mistakes per block before stopping

## 🎯 Next Steps After Testing

Once the RLS fix is applied and testing is successful:
1. Unlock all 5 lessons for testing
2. Test each lesson end-to-end
3. Verify introductions show for each block
4. Verify progress tracking works
5. Verify sync to database works

---

**Last Updated:** January 2026
**Status:** Awaiting RLS fix to be applied in Supabase
