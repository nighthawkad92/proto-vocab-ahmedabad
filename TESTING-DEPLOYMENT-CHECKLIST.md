# Testing & Deployment Checklist

**Created:** 2026-01-08
**Status:** Use this checklist to track testing and deployment progress

---

## Phase 1: Initial Setup ✅ COMPLETE

- [x] Install @dnd-kit dependencies
- [x] Create shared components (DraggableCard, DropZone, WordBank, PassageDisplay)
- [x] Build 5 new question type components
- [x] Update QuestionCard router
- [x] Extend lib/types.ts
- [x] Create test questions SQL file
- [x] Write comprehensive documentation
- [x] Verify TypeScript compilation passes

**Status:** All development work complete, ready for testing

---

## Phase 2: Local Testing (CURRENT PHASE)

### Setup Testing Environment

- [ ] **Load test data into Supabase**
  - [ ] Open Supabase SQL Editor
  - [ ] Copy/paste contents of `seed-test-questions.sql`
  - [ ] Execute query
  - [ ] Verify: Should see "INSERT 0 1" success message
  - [ ] Run verification queries at end of SQL file
  - [ ] Confirm: 20 questions inserted across 3 blocks

- [ ] **Start development server**
  - [ ] Run `npm run dev`
  - [ ] Verify: Server starts on http://localhost:3000
  - [ ] Check console: No errors on startup

- [ ] **Access test lesson**
  - [ ] Navigate to teacher dashboard
  - [ ] Select any class
  - [ ] Find "Test Lesson - New Question Types"
  - [ ] Unlock lesson for class
  - [ ] Switch to student view
  - [ ] Select student name
  - [ ] Start test lesson

### Desktop Testing (Chrome/Safari/Firefox)

#### Block 0 - EASY Questions (10 questions)

**Sentence Rearrange (test-sr-1, test-sr-2)**
- [ ] Question loads without errors
- [ ] Words display as draggable cards
- [ ] Mouse drag works smoothly
- [ ] Cards reorder when dropped
- [ ] Preview sentence updates in real-time
- [ ] Submit button enabled after reorder
- [ ] Correct validation works
- [ ] Incorrect validation works
- [ ] Keyboard Tab navigation works
- [ ] Arrow keys move cards
- [ ] Audio plays for prompt

**Story Sequence (test-ss-1, test-ss-2)**
- [ ] Passage displays at top
- [ ] "Read again" button visible
- [ ] "Read again" plays audio
- [ ] Events display with position labels
- [ ] Position labels correct (First, Then, Finally)
- [ ] Mouse drag works
- [ ] Events reorder correctly
- [ ] Submit validates correct sequence
- [ ] Audio doesn't overlap on rapid clicks
- [ ] Passage scrolls if long

**Sentence Gap Fill (test-sgf-1, test-sgf-2)**
- [ ] Gap displays as blank box with dashes
- [ ] Word buttons large and visible
- [ ] Click word to select
- [ ] Selected word highlights
- [ ] Gap fills with selected word
- [ ] Preview updates immediately
- [ ] Click same word to deselect
- [ ] Submit validates correct word
- [ ] Audio plays for prompt

**Reading Comprehension (test-rc-1, test-rc-2)**
- [ ] Passage displays in container
- [ ] Passage scrollable if long
- [ ] "Read again" button works
- [ ] Question type badge shows (Who?, What?)
- [ ] Badge color correct
- [ ] Question displays clearly below passage
- [ ] Answer buttons large and tappable
- [ ] Click answer to select
- [ ] Selected answer highlights
- [ ] Submit validates correct answer
- [ ] Audio plays for passage

**Add Word Activity (test-aw-1, test-aw-2)**
- [ ] Base sentence displays
- [ ] Insertion point marked with ↓ arrow
- [ ] Arrow animates (pulsing)
- [ ] Word bank displays below
- [ ] Click word to select
- [ ] Selected word highlights
- [ ] Preview shows expanded sentence
- [ ] Preview updates immediately
- [ ] Word inserted at correct position
- [ ] Submit accepts multiple correct answers (test-aw-1, test-aw-2)
- [ ] Hint shows for multiple correct answers
- [ ] Audio plays for prompt

#### Block 1 - MEDIUM Questions (5 questions)

- [ ] test-sr-3: 5-word sentence with adjective
- [ ] test-ss-3: 4-event story (farming)
- [ ] test-sgf-3: Context reasoning (careful)
- [ ] test-rc-3: 4-sentence passage (farmer)
- [ ] test-aw-3: Adverb selection (2 correct: quickly/slowly)

#### Block 2 - HARD Questions (5 questions)

- [ ] test-sr-4: 6-word sentence with prepositional phrase
- [ ] test-ss-4: 5-event story with inference
- [ ] test-sgf-4: Complex emotion (confused)
- [ ] test-rc-4: Why question with inference
- [ ] test-aw-4: Best-fit word (1 correct: beautifully)

### Tablet Testing (iPad/Android)

#### iPad Testing (Safari)

**Setup:**
- [ ] Get local IP: `ifconfig | grep "inet "`
- [ ] Open Safari on iPad
- [ ] Navigate to http://[your-ip]:3000
- [ ] Log in and access test lesson

**Touch Interactions:**
- [ ] Sentence Rearrange: Touch-hold and drag works
- [ ] Story Sequence: Touch-hold and drag works
- [ ] Gap Fill: Tap words to select works
- [ ] Reading Comp: Tap answers works
- [ ] Add Word: Tap words works
- [ ] No accidental drags (150ms delay works)
- [ ] Smooth drag movement (no jitter)
- [ ] Drop zones highlight during drag
- [ ] No double-tap zoom interference

**Audio:**
- [ ] All prompts play automatically
- [ ] "Read again" buttons work
- [ ] Audio doesn't overlap
- [ ] Volume controls work

**Layout:**
- [ ] All text readable
- [ ] Buttons large enough to tap (≥48px)
- [ ] No horizontal scrolling
- [ ] Preview text wraps correctly
- [ ] Position labels visible

#### Android Tablet Testing (Chrome)

**Setup:**
- [ ] Get local IP
- [ ] Open Chrome on Android
- [ ] Navigate to http://[your-ip]:3000
- [ ] Access test lesson

**Touch Interactions:**
- [ ] All drag-drop interactions work
- [ ] Tap selection works
- [ ] No accidental actions
- [ ] Smooth performance

**Audio & Layout:**
- [ ] Audio plays correctly
- [ ] Layout responsive
- [ ] All features work as on iPad

### Browser Console Check

- [ ] **Chrome DevTools (F12)**
  - [ ] No red errors in Console tab
  - [ ] No failed network requests
  - [ ] No TypeScript errors
  - [ ] Only expected warnings (TTS placeholders OK)

- [ ] **Performance Check**
  - [ ] Animations smooth (60fps)
  - [ ] No lag during interactions
  - [ ] Fast question transitions
  - [ ] Audio loads quickly

### Edge Cases

- [ ] **Rapid Interactions**
  - [ ] Click "Read again" rapidly → audio stops/restarts cleanly
  - [ ] Drag multiple cards quickly → no overlapping drags
  - [ ] Tap multiple words quickly → only one selected
  - [ ] Submit multiple times → disabled after first click

- [ ] **Network Issues**
  - [ ] Disable WiFi mid-lesson → offline sync works
  - [ ] Re-enable WiFi → progress uploads
  - [ ] Audio cached → plays offline

- [ ] **Invalid States**
  - [ ] Submit without selection → button disabled
  - [ ] Navigate away mid-question → no errors
  - [ ] Reload page → lesson state preserved

---

## Phase 3: Bug Fixes

### Issues Found During Testing

**Template for each bug:**
```
Bug #: [Number]
Component: [Which question type]
Question ID: [e.g., test-sr-1]
Severity: [Critical/High/Medium/Low]
Description: [What's wrong]
Steps to reproduce:
  1. [Step 1]
  2. [Step 2]
Expected: [What should happen]
Actual: [What happens]
Device: [Desktop/iPad/Android]
Browser: [Chrome/Safari/etc]
Screenshot: [Link/path if available]
Status: [Open/In Progress/Fixed/Won't Fix]
```

### Bug List

- [ ] **No bugs found yet** (Update after testing)

### Fix Verification

After fixing each bug:
- [ ] Re-test on original device/browser
- [ ] Test on other devices
- [ ] Verify no regressions
- [ ] Update bug status
- [ ] Document fix in IMPLEMENTATION-PROGRESS.md

---

## Phase 4: Production Content Creation

### Content Requirements

**Lesson 2: Vocabulary in Context (72 questions)**
- [ ] 36 sentence-gap-fill questions
  - [ ] 12 EASY (Block 0, rotation set 1)
  - [ ] 12 EASY (Block 0, rotation set 2)
  - [ ] 6 MEDIUM (Block 1)
  - [ ] 6 HARD (Block 2)
- [ ] 36 picture-word-match questions (existing type)

**Lesson 3: Reading Short Paragraphs (36 passages)**
- [ ] 36 reading-comprehension questions
  - [ ] 12 EASY (2-3 sentences, Who/What)
  - [ ] 12 EASY (rotation set)
  - [ ] 6 MEDIUM (4 sentences, What/Where)
  - [ ] 6 HARD (5 sentences, Why/How with inference)

**Lesson 4: Sentence Expansion (72 questions)**
- [ ] 36 sentence-rearrange questions
  - [ ] 12 EASY (3-4 words)
  - [ ] 12 EASY (rotation set)
  - [ ] 6 MEDIUM (5-6 words)
  - [ ] 6 HARD (7-8 words)
- [ ] 36 add-word questions
  - [ ] 12 EASY (adjectives)
  - [ ] 12 EASY (rotation set)
  - [ ] 6 MEDIUM (adverbs)
  - [ ] 6 HARD (best-fit selection)

**Lesson 5: Reading-Writing Connection (72 questions)**
- [ ] 36 story-sequence questions
  - [ ] 12 EASY (3 events)
  - [ ] 12 EASY (rotation set)
  - [ ] 6 MEDIUM (4 events)
  - [ ] 6 HARD (5 events with inference)
- [ ] 36 reading-comprehension questions (same as Lesson 3)

### Content Quality Check

For each question:
- [ ] Follows progression rules in QUESTION-TYPE-PROGRESSION-RULES.md
- [ ] Age-appropriate vocabulary (Grade 4, below grade level)
- [ ] Culturally relevant examples (Indian context)
- [ ] Clear, unambiguous language
- [ ] Single correct answer (or documented multiple correct)
- [ ] Helpful explanation provided
- [ ] No grammatical errors
- [ ] No spelling mistakes

---

## Phase 5: Audio Generation

### TTS Audio Files

**Total needed:** ~288 audio files
- [ ] Extract all text from questions (prompts, passages)
- [ ] Create batch TTS generation script
- [ ] Use Google TTS API (en-IN voice, Wavenet-D)
- [ ] Generate all audio files
- [ ] Test sample audio files for quality
- [ ] Upload to Supabase Storage
- [ ] Update database with audio URLs
- [ ] Verify all audio loads correctly

### Audio Quality Check

- [ ] Clear pronunciation
- [ ] Appropriate speed
- [ ] Natural intonation
- [ ] Consistent volume
- [ ] No distortion or artifacts
- [ ] Proper pauses at punctuation

---

## Phase 6: Database Update

### Update seed-lessons-grade4.sql

- [ ] Add Lesson 2 questions (72 new)
- [ ] Add Lesson 3 questions (36 new)
- [ ] Add Lesson 4 questions (72 new)
- [ ] Add Lesson 5 questions (72 new)
- [ ] Include rotation sets for all
- [ ] Add audio URLs
- [ ] Test SQL syntax (dry run)
- [ ] Backup existing data
- [ ] Run updated SQL in Supabase
- [ ] Verify all lessons load correctly

### Database Verification

- [ ] Run query: Count questions per lesson
- [ ] Run query: Count rotation sets per block
- [ ] Run query: Check audio URL coverage
- [ ] Test loading each lesson in app
- [ ] Verify rotation sets work
- [ ] Check question randomization

---

## Phase 7: Integration Testing

### Full Lesson Flows

**Lesson 1:**
- [ ] Complete lesson from start to finish
- [ ] Test 2-mistake rule works
- [ ] Verify rotation set selection on retake

**Lesson 2:**
- [ ] Complete lesson (gap-fill + picture-match)
- [ ] Test question type transitions
- [ ] Verify rotation sets work

**Lesson 3:**
- [ ] Complete lesson (reading-comp only)
- [ ] Test passage audio
- [ ] Test different question types (Who/What/Why)

**Lesson 4:**
- [ ] Complete lesson (sentence-rearrange + add-word)
- [ ] Test drag-drop stability
- [ ] Test multiple correct answers

**Lesson 5:**
- [ ] Complete lesson (story-sequence + reading-comp)
- [ ] Test story audio
- [ ] Test event ordering

### Cross-Device Testing

- [ ] All lessons work on desktop Chrome
- [ ] All lessons work on desktop Safari
- [ ] All lessons work on iPad Safari
- [ ] All lessons work on Android Chrome
- [ ] Teacher dashboard works on all devices
- [ ] Student dashboard works on all devices

### Performance Testing

- [ ] Lesson loads in <3 seconds
- [ ] Question transitions smooth
- [ ] Audio loads without delay
- [ ] No memory leaks (test extended session)
- [ ] Offline sync works correctly

---

## Phase 8: Staging Deployment

### Pre-Deployment

- [ ] All tests passing
- [ ] All bugs fixed
- [ ] All content created
- [ ] All audio generated
- [ ] Database updated
- [ ] Documentation complete

### Deployment Steps

- [ ] Build production bundle: `npm run build`
- [ ] Test production build locally
- [ ] Deploy to staging environment
- [ ] Update staging database
- [ ] Upload audio files to staging storage
- [ ] Verify environment variables
- [ ] Test SSL certificate

### Staging Smoke Tests

- [ ] Home page loads
- [ ] Teacher login works
- [ ] Student login works
- [ ] All 5 lessons accessible
- [ ] All question types work
- [ ] Audio plays correctly
- [ ] Progress saves correctly
- [ ] Dashboard displays correctly

---

## Phase 9: Teacher Pilot

### Pilot Setup

- [ ] Select 2-3 pilot teachers
- [ ] Create pilot classes
- [ ] Unlock all lessons for pilot
- [ ] Provide testing guidelines
- [ ] Schedule feedback sessions

### Teacher Training

- [ ] Walk through teacher dashboard
- [ ] Explain student progress tracking
- [ ] Show how to unlock lessons
- [ ] Demo student view
- [ ] Answer questions

### Feedback Collection

- [ ] Daily check-ins (first week)
- [ ] Mid-pilot survey (week 2)
- [ ] Final feedback session (week 3-4)
- [ ] Document all issues found
- [ ] Prioritize improvements

### Metrics to Track

- [ ] Lesson completion rates
- [ ] Question accuracy rates
- [ ] Time per question
- [ ] Audio usage patterns
- [ ] Error rates by question type
- [ ] Student engagement scores

---

## Phase 10: Production Deployment

### Pre-Launch

- [ ] All pilot feedback addressed
- [ ] Final QA testing complete
- [ ] Production database ready
- [ ] All audio uploaded
- [ ] Documentation updated
- [ ] Support plan ready

### Launch

- [ ] Deploy to production
- [ ] Monitor error logs (24 hours)
- [ ] Check performance metrics
- [ ] Verify all features work
- [ ] Test with real teachers/students

### Post-Launch

- [ ] Daily monitoring (week 1)
- [ ] Weekly check-ins (month 1)
- [ ] Gather feedback continuously
- [ ] Iterate based on usage data
- [ ] Plan next feature set

---

## Success Metrics

### Technical Metrics
- [ ] Zero critical bugs in production
- [ ] 99%+ uptime
- [ ] <3 second page load times
- [ ] <500ms question transitions
- [ ] Zero data loss incidents

### User Metrics
- [ ] 80%+ lesson completion rate
- [ ] 70%+ student accuracy rate
- [ ] 90%+ teacher satisfaction
- [ ] 85%+ student engagement
- [ ] <5% error/support rate

### Content Metrics
- [ ] All 288 questions working
- [ ] All audio files loading
- [ ] All rotation sets functional
- [ ] Question difficulty appropriate
- [ ] Explanations helpful

---

## Current Status

**Phase 1:** ✅ COMPLETE
**Phase 2:** ⏳ IN PROGRESS (Local Testing)
**Phase 3-10:** ⏸️ PENDING

**Next Action:** Load seed-test-questions.sql and begin local testing

---

**Created:** 2026-01-08
**Last Updated:** 2026-01-08
**Owner:** Development Team
**Reviewers:** Testing Team, Content Team, Product Owner
