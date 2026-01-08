# Testing Guide - New Question Type Components

**Created:** 2026-01-08
**Status:** Ready for testing
**Purpose:** Instructions for testing all 5 new question type components

---

## Quick Start

### 1. Load Test Questions into Database

Run the test question SQL file in your Supabase SQL editor:

```bash
# The SQL file is located at:
./seed-test-questions.sql
```

**What this does:**
- Creates a test lesson with 20 questions (4 per new type)
- Organizes questions into 3 blocks (EASY, MEDIUM, HARD)
- Uses proper JSONB structure matching existing lessons

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access Test Lesson

1. Navigate to teacher dashboard
2. Select any class
3. Find the lesson titled: **"Test Lesson - New Question Types"**
4. Unlock it for your class
5. Switch to student view
6. Start the test lesson

---

## What to Test

### Block 0: EASY Level (10 questions)

**Expected questions:**
- 2 × Sentence Rearrange (3-4 words)
- 2 × Story Sequence (3 events)
- 2 × Sentence Gap Fill (simple vocabulary)
- 2 × Reading Comprehension (2-3 sentences, Who/What questions)
- 2 × Add Word Activity (adjectives)

### Block 1: MEDIUM Level (5 questions)

**Expected questions:**
- 1 × Sentence Rearrange (5 words with adjective)
- 1 × Story Sequence (4 events)
- 1 × Sentence Gap Fill (context reasoning)
- 1 × Reading Comprehension (4 sentences, What question)
- 1 × Add Word Activity (adverbs)

### Block 2: HARD Level (5 questions)

**Expected questions:**
- 1 × Sentence Rearrange (6 words with prepositional phrase)
- 1 × Story Sequence (5 events with emotional inference)
- 1 × Sentence Gap Fill (complex emotion)
- 1 × Reading Comprehension (5 sentences, Why question with inference)
- 1 × Add Word Activity (best-fit adverb)

---

## Testing Checklist

### Sentence Rearrange (test-sr-1, test-sr-2, test-sr-3, test-sr-4)

- [ ] Words display as draggable cards
- [ ] Cards can be dragged vertically
- [ ] Cards reorder when dropped
- [ ] Preview sentence updates in real-time below cards
- [ ] Submit button enabled only when order changes
- [ ] Correct order validation works
- [ ] Visual feedback on drag (card becomes semi-transparent)
- [ ] Touch works on tablet (iPad/Android)
- [ ] Keyboard navigation works (arrow keys + tab)
- [ ] Audio plays for prompt

**Expected Issues to Watch For:**
- Cards snap back if dropped outside drop zone
- Multiple cards dragging at once
- Incorrect order validation

### Story Sequence (test-ss-1, test-ss-2, test-ss-3, test-ss-4)

- [ ] Passage displays at top in scrollable container
- [ ] "Read again" button works and plays audio
- [ ] Events display with position labels (First, Then, Next, Finally)
- [ ] Events can be dragged and reordered
- [ ] Position labels update as events move
- [ ] Submit validates correct sequence
- [ ] Passage audio doesn't cut off if "Read again" pressed again
- [ ] Touch drag works on tablet
- [ ] Keyboard navigation works

**Expected Issues to Watch For:**
- Audio overlapping if "Read again" clicked rapidly
- Position labels not updating
- Long passages overflow container

### Sentence Gap Fill (test-sgf-1, test-sgf-2, test-sgf-3, test-sgf-4)

- [ ] Gap displays visually as blank box with dashes
- [ ] Word buttons are large and touch-friendly
- [ ] Selected word fills gap in sentence preview
- [ ] Only one word can be selected at a time
- [ ] Submit validates correct word
- [ ] Visual feedback on selection (button changes color)
- [ ] Tap same word again to deselect
- [ ] Audio plays for prompt

**Expected Issues to Watch For:**
- Multiple gaps in sentence (shouldn't happen in test questions)
- Gap not rendering correctly
- Preview not updating

### Reading Comprehension (test-rc-1, test-rc-2, test-rc-3, test-rc-4)

- [ ] Passage displays in scrollable container
- [ ] "Read again" button works and plays audio
- [ ] Question type badge displays (Who?, What?, Why?)
- [ ] Badge color matches question type (blue=who, green=what, red=why)
- [ ] Question text displays below passage
- [ ] Answer options are large buttons
- [ ] Selected answer highlights
- [ ] Submit validates correct answer
- [ ] Passage audio doesn't overlap
- [ ] Long passages scroll smoothly

**Expected Issues to Watch For:**
- Badge not showing
- Audio not playing
- Passage overflow

### Add Word Activity (test-aw-1, test-aw-2, test-aw-3, test-aw-4)

- [ ] Base sentence displays with insertion point
- [ ] Insertion point is marked with animated arrow (↓)
- [ ] Word bank displays below with 4 options
- [ ] Tap word to select it
- [ ] Preview shows expanded sentence with word inserted
- [ ] Preview updates in real-time
- [ ] Submit validates correct word
- [ ] Multiple correct answers accepted (test-aw-1, test-aw-2 accept all 4 options)
- [ ] Hint displays when multiple answers valid
- [ ] Tap same word to deselect

**Expected Issues to Watch For:**
- Insertion point not visible
- Preview not updating
- Word inserted in wrong position
- Multiple correct answers not accepted

---

## Component-Specific Test Cases

### Test SR-1: "The dog runs"
**Scrambled:** runs, dog, The
**Correct Order:** The, dog, runs
**Tests:** Basic 3-word sentence ordering

### Test SR-4: "The boy runs in the park"
**Scrambled:** in, runs, boy, the, The, park
**Correct Order:** The, boy, runs, in, the, park
**Tests:** Prepositional phrase placement

### Test SS-4: Meena's test story
**5 events:** Tests emotional narrative with inference
**Tests:** Complex story sequencing with cause-effect

### Test RC-4: Meena's lost bag
**Question:** Why did Meena feel happy?
**Tests:** Inference reasoning (not explicitly stated)

### Test AW-1: "The dog runs"
**All 4 options correct:** big, small, brown, happy
**Tests:** Multiple correct answer validation

### Test AW-4: "The girl sings at the function"
**Only 1 correct:** beautifully
**Tests:** Best-fit word selection

---

## Audio Testing

### Questions with Audio
- All prompts should play audio on question load
- "Read again" buttons for passages
- Audio shouldn't overlap
- Audio should pause if question changes

### Test Scenarios
1. **Rapid clicking:** Click "Read again" multiple times - audio should stop and restart
2. **Question transition:** Audio should stop when moving to next question
3. **Background audio:** Test with background music/sounds on tablet

---

## Touch Testing (Tablet Required)

### iPad Testing
1. Open app in Safari on iPad
2. Test all drag-and-drop interactions
3. Verify 48px+ touch targets
4. Test with Apple Pencil (should work same as finger)

### Android Tablet Testing
1. Open app in Chrome on Android tablet
2. Test all drag-and-drop interactions
3. Verify touch hold to drag works (150ms delay)
4. Test rapid taps don't cause issues

### Touch-Specific Checks
- [ ] No accidental drags (150ms activation delay)
- [ ] Smooth drag movement (no jitter)
- [ ] Clear visual feedback during drag
- [ ] Drop zones highlight when dragging over
- [ ] No double-tap zoom interference
- [ ] Buttons respond to first tap (no delay)

---

## Keyboard Testing

### Sentence Rearrange
- **Tab:** Move focus between cards
- **Arrow Up/Down:** Move focused card up/down
- **Enter/Space:** Activate drag
- **Escape:** Cancel drag

### Other Components
- **Tab:** Move between buttons
- **Enter/Space:** Select button
- **Escape:** Deselect

---

## Performance Testing

### Load Times
- [ ] First question loads in <2 seconds
- [ ] Audio preloads before question displays
- [ ] Images load progressively (if any)
- [ ] No blank screens during transitions

### Interaction Responsiveness
- [ ] Drag feels smooth (60fps)
- [ ] Button taps respond instantly
- [ ] No lag when typing or selecting
- [ ] Animations don't stutter

---

## Error Scenarios

### Network Issues
1. Disable WiFi mid-lesson
2. Verify offline sync works
3. Re-enable WiFi
4. Verify progress uploads

### Invalid Data
1. Questions with missing fields should show error message
2. Error message should be child-friendly
3. App shouldn't crash

### Browser Compatibility
Test in:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iPad)
- [ ] Chrome (Android tablet)

---

## Expected Results

### Success Criteria
✅ All 20 questions load correctly
✅ All interactions work on mouse and touch
✅ Audio plays without issues
✅ Validation logic works correctly
✅ No console errors
✅ TypeScript compilation passes
✅ Smooth 60fps animations
✅ Clear visual feedback on all actions

### Known Limitations
⚠️ TTS audio is placeholder (will be generated in production)
⚠️ No images in test questions (imageUrl fields empty)
⚠️ Test lesson uses Block 0 order (not difficulty-adaptive)

---

## Reporting Issues

### When You Find a Bug

1. **Take a screenshot** showing the issue
2. **Note the question ID** (e.g., test-sr-1)
3. **Describe the issue:**
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
4. **Include device info:**
   - Device type (desktop/iPad/Android)
   - Browser and version
   - Screen size

### Common Issues and Fixes

**Issue:** Cards not dragging
**Fix:** Check @dnd-kit dependencies installed, try hard refresh

**Issue:** Audio not playing
**Fix:** Check browser permissions, check console for TTS errors

**Issue:** Preview not updating
**Fix:** Check React state updates, verify correctOrder array

**Issue:** Submit button disabled
**Fix:** Check validation logic, ensure state changes correctly

---

## Next Steps After Testing

Once all tests pass:

1. **Fix any bugs found** during testing
2. **Adjust UI/UX** based on feel (spacing, colors, animations)
3. **Create full question sets** (216 questions for Lessons 2-5)
4. **Generate TTS audio** for all questions
5. **Update database** with production content
6. **Deploy to staging** for teacher pilot

---

## Quick Reference: Test Question IDs

### Sentence Rearrange
- `test-sr-1`: EASY - The dog runs
- `test-sr-2`: EASY - The bird flies fast
- `test-sr-3`: MEDIUM - The big boy runs quickly
- `test-sr-4`: HARD - The boy runs in the park

### Story Sequence
- `test-ss-1`: EASY - Ravi morning routine
- `test-ss-2`: EASY - Girl at park
- `test-ss-3`: MEDIUM - Farmer growing vegetables
- `test-ss-4`: HARD - Meena's math test

### Sentence Gap Fill
- `test-sgf-1`: EASY - Hungry after playing
- `test-sgf-2`: EASY - Wet road from rain
- `test-sgf-3`: MEDIUM - Careful crossing road
- `test-sgf-4`: HARD - Confused by question

### Reading Comprehension
- `test-rc-1`: EASY - Who is Ravi?
- `test-rc-2`: EASY - What did dog do?
- `test-rc-3`: MEDIUM - What did farmer do first?
- `test-rc-4`: HARD - Why was Meena happy?

### Add Word Activity
- `test-aw-1`: EASY - Describe dog (4 correct)
- `test-aw-2`: EASY - Describe cat (4 correct)
- `test-aw-3`: MEDIUM - How boy runs (2 correct)
- `test-aw-4`: HARD - How girl sings (1 correct)

---

**Last Updated:** 2026-01-08
**Test Lesson:** seed-test-questions.sql
**Status:** Ready for manual testing
