# Quick Start - Testing New Question Types

**Status:** Ready to test
**Time needed:** 30-60 minutes
**What you'll test:** 20 questions across 5 new component types

---

## Step 1: Load Test Data (2 minutes)

### Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click "SQL Editor" in left sidebar
3. Click "New Query"

### Run the Test SQL
Copy and paste the contents of:
```
seed-test-questions.sql
```

Click "Run" (or press Cmd/Ctrl + Enter)

**Expected output:** `INSERT 0 1` (1 lesson inserted)

---

## Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

Wait for: `Ready on http://localhost:3000`

---

## Step 3: Access Test Lesson (2 minutes)

1. Open browser: `http://localhost:3000`
2. Log in as teacher
3. Select any class
4. Find lesson: **"Test Lesson - New Question Types"**
5. Click "Unlock" button
6. Switch to student view (top-right toggle)
7. Select a student name
8. Click "Test Lesson - New Question Types"
9. Click "Start Lesson"

---

## Step 4: Test Each Question Type (20-30 minutes)

### Block 0: EASY Level (10 questions)

#### Sentence Rearrange (test-sr-1, test-sr-2)
**What to test:**
- [ ] Drag words vertically to reorder
- [ ] Preview sentence updates below
- [ ] Submit validates correct order

**Example:** Rearrange "runs, dog, The" → "The dog runs"

#### Story Sequence (test-ss-1, test-ss-2)
**What to test:**
- [ ] Read passage at top
- [ ] "Read again" button plays audio
- [ ] Drag events to correct order
- [ ] Position labels show (First, Then, Finally)

**Example:** Ravi's morning routine

#### Sentence Gap Fill (test-sgf-1, test-sgf-2)
**What to test:**
- [ ] Gap shows as blank box
- [ ] Tap word to fill gap
- [ ] Preview updates
- [ ] Submit validates

**Example:** "I am ___ after playing" → hungry

#### Reading Comprehension (test-rc-1, test-rc-2)
**What to test:**
- [ ] Passage displays at top
- [ ] Question type badge shows (Who?, What?)
- [ ] "Read again" works
- [ ] Answer buttons large and tappable

**Example:** "Who is in the story?" → Ravi

#### Add Word Activity (test-aw-1, test-aw-2)
**What to test:**
- [ ] Insertion point marked with ↓ arrow
- [ ] Tap word to select
- [ ] Preview shows expanded sentence
- [ ] All words accepted (multiple correct)

**Example:** "The ___ dog runs" → big/small/brown/happy

---

### Block 1: MEDIUM Level (5 questions)

Test one of each type at medium difficulty:
- [ ] Longer sentences (5 words)
- [ ] More complex stories (4 events)
- [ ] Context reasoning required

---

### Block 2: HARD Level (5 questions)

Test one of each type at hard difficulty:
- [ ] Complex sentences (6+ words)
- [ ] Inference required
- [ ] Best-fit word selection

---

## Step 5: Check for Issues (5 minutes)

### Common Issues to Watch For

**Drag-and-Drop:**
- Cards stick or don't move
- Preview doesn't update
- Touch doesn't work on tablet

**Audio:**
- Doesn't play
- Overlaps when clicking "Read again" rapidly
- Continues playing after question change

**Validation:**
- Wrong answer marked correct
- Correct answer marked wrong
- Multiple correct answers not accepted (test-aw-1, test-aw-2)

**UI/UX:**
- Buttons too small to tap
- Text hard to read
- Animations laggy
- Layout broken on mobile

### Check Browser Console
Press F12 → Console tab
**Expected:** No red errors
**OK to ignore:** Yellow warnings about TTS placeholders

---

## Step 6: Report Results (5 minutes)

### If Everything Works ✅
You're ready to move on to production content creation!

### If Issues Found 🐛
Document each issue:

**Template:**
```
Issue: [Brief description]
Question ID: [e.g., test-sr-1]
Steps to reproduce:
1. [Step 1]
2. [Step 2]
Expected: [What should happen]
Actual: [What actually happened]
Device: [Desktop/iPad/Android]
Browser: [Chrome/Safari/Firefox + version]
Screenshot: [Attach if possible]
```

---

## Quick Test Checklist

Minimum tests before moving forward:

- [ ] Sentence Rearrange: Drag words on desktop (mouse)
- [ ] Sentence Rearrange: Drag words on tablet (touch)
- [ ] Story Sequence: "Read again" button works
- [ ] Gap Fill: Tap word to select
- [ ] Reading Comp: Question type badge shows
- [ ] Add Word: Multiple correct answers accepted
- [ ] Audio: Plays without overlap
- [ ] No console errors
- [ ] Layout looks good on tablet
- [ ] All 20 questions load correctly

---

## Tablet Testing (If Available)

### iPad
1. Open Safari
2. Go to `http://[your-ip]:3000`
3. Add to home screen (optional)
4. Test all drag-drop interactions
5. Test audio playback

### Android Tablet
1. Open Chrome
2. Go to `http://[your-ip]:3000`
3. Test all drag-drop interactions
4. Test audio playback

**Note:** Find your local IP with `ifconfig` (Mac/Linux) or `ipconfig` (Windows)

---

## What Success Looks Like

✅ All 20 questions load
✅ All interactions work smoothly
✅ Audio plays correctly
✅ Validation logic correct
✅ No console errors
✅ Smooth animations
✅ Works on tablet (if tested)

---

## Next Steps After Testing

### If Tests Pass
1. Review `docs/ACTION-ITEMS.md` for next tasks
2. Start creating production content (216 questions)
3. Generate TTS audio files
4. Update main seed file

### If Issues Found
1. Document all issues
2. Prioritize by severity
3. Fix critical bugs first
4. Re-test after fixes

---

## Need Help?

**Full testing guide:** `docs/TESTING-GUIDE.md`
**Component details:** `docs/QUESTION-TYPES-REFERENCE.md`
**Implementation log:** `docs/IMPLEMENTATION-PROGRESS.md`
**Next tasks:** `docs/ACTION-ITEMS.md`

---

## Test Question IDs Reference

### Sentence Rearrange
- test-sr-1: The dog runs (3 words)
- test-sr-2: The bird flies fast (4 words)
- test-sr-3: The big boy runs quickly (5 words)
- test-sr-4: The boy runs in the park (6 words)

### Story Sequence
- test-ss-1: Ravi morning routine (3 events)
- test-ss-2: Girl at park (3 events)
- test-ss-3: Farmer vegetables (4 events)
- test-ss-4: Meena's test (5 events)

### Gap Fill
- test-sgf-1: Hungry after playing
- test-sgf-2: Wet road from rain
- test-sgf-3: Careful crossing road
- test-sgf-4: Confused by question

### Reading Comprehension
- test-rc-1: Who - Ravi at park
- test-rc-2: What - Dog catching ball
- test-rc-3: What - Farmer's first action
- test-rc-4: Why - Meena's happiness

### Add Word
- test-aw-1: Describe dog (4 correct)
- test-aw-2: Describe cat (4 correct)
- test-aw-3: How boy runs (2 correct)
- test-aw-4: How girl sings (1 correct)

---

**Estimated time:** 30-60 minutes
**Status:** Ready to test immediately
**Questions?** See `docs/TESTING-GUIDE.md`
