# Action Items - PAL Vocabulary Tool Implementation

**Last Updated:** 2026-01-08
**Status:** Ready to begin Phase 2 implementation

---

## 🎯 Immediate Next Steps (Priority Order)

### 1. Install Dependencies ⚡ HIGH PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 5 minutes
**Completed:** 2026-01-08

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Why:** Required for all drag-and-drop question types (sentence-rearrange, story-sequence, add-word)

**Verification:**
```bash
npm list @dnd-kit/core
# Should show version installed
```

---

### 2. Create Shared Drag-and-Drop Components ⚡ HIGH PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 6-8 hours
**Completed:** 2026-01-08

**Files to Create:**
1. `components/game/shared/DraggableCard.tsx`
2. `components/game/shared/DropZone.tsx`
3. `components/game/shared/WordBank.tsx`

**Requirements:**
- Touch-optimized (≥48px touch targets)
- Visual feedback (pressed state, drag ghost)
- Accessible (keyboard navigation fallback)
- Works with @dnd-kit/sortable

**Reference:**
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Component Architecture](./HOLISTIC-IMPLEMENTATION-PLAN.md#component-architecture)
- [@dnd-kit documentation](https://docs.dndkit.com/)

**Acceptance Criteria:**
- [ ] DraggableCard can be dragged on touch devices
- [ ] DropZone highlights when card hovers
- [ ] WordBank allows multi-select
- [ ] Keyboard navigation works
- [ ] Components are reusable across question types

---

### 3. Implement Sentence Rearrange Component ⚡ HIGH PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 10-12 hours
**Completed:** 2026-01-08

**File to Create:** `components/game/question-types/SentenceRearrange.tsx`

**Functionality:**
- Display scrambled word cards
- Allow drag-and-drop reordering
- Alternative: Tap-to-select sequence mode (accessibility)
- Check order on submit
- Show visual feedback (correct position indicators)

**Example Question Structure:**
```typescript
{
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a sentence",
  scrambledItems: ["runs", "dog", "The"],
  correctOrder: [2, 1, 0],  // The dog runs
  correctAnswer: "The dog runs",
  explanation: "Sentences start with 'The', then subject 'dog', then verb 'runs'."
}
```

**Reference:**
- [QUESTION-TYPE-PROGRESSION-RULES.md - Sentence Rearrange](./QUESTION-TYPE-PROGRESSION-RULES.md#question-type-sentence-rearrange)
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 4](./HOLISTIC-IMPLEMENTATION-PLAN.md#41-sentence-rearrange)

**Acceptance Criteria:**
- [ ] Words can be dragged to reorder
- [ ] Tap-to-select mode available
- [ ] Correct order validation works
- [ ] Visual feedback on submit
- [ ] Audio plays (question prompt)
- [ ] Buttons disabled during audio
- [ ] Works on tablets (tested on iPad + Android)

---

### 4. Create Sentence Rearrange Questions ⚡ HIGH PRIORITY
**Status:** ⏳ PARTIAL - 4 test questions created, 36 production questions needed
**Estimated Time:** 4-6 hours
**Test Questions:** 2026-01-08

**Quantity Needed:** 36 questions (12 per block × 3 rotation sets)

**Content Sources:**
- **Block 0 (EASY):** Simple SVO sentences (3-4 words)
  - Default: The dog runs, The bird flies, The sun shines, The cat sleeps
  - Rotation 1: The boy walks, The girl jumps, The ball rolls, The fish swims
  - Rotation 2: The tree grows, The rain falls, The wind blows, The bell rings

- **Block 1 (MEDIUM):** SVO + adjective/adverb (4-5 words)
  - Use sentences from PDF pages 11-12

- **Block 2 (HARD):** SVO + prepositional phrase (5-7 words)
  - Use sentences from PDF page 13

**Output Format:** SQL INSERT statements or JSON for database

**Reference:**
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 4 Content](./HOLISTIC-IMPLEMENTATION-PLAN.md#41-sentence-rearrange)

**Acceptance Criteria:**
- [ ] 36 questions created
- [ ] All follow difficulty tier guidelines
- [ ] No vocabulary overlap within block
- [ ] Correct order indices verified
- [ ] Explanations provided

---

### 5. Implement Story Sequence Component ⚡ HIGH PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 8-10 hours
**Completed:** 2026-01-08

**File to Create:** `components/game/question-types/StorySequence.tsx`

**Functionality:**
- Display scrambled story events
- Numbered drop zones (First, Then, Next, Finally)
- Drag events to correct sequence
- Show passage context (optional read again)
- Check sequence on submit

**Example Question Structure:**
```typescript
{
  type: "story-sequence",
  prompt: "Put the events in the correct order",
  passage: "Ravi went to the park. He played with his ball.",
  scrambledItems: [
    "Ravi went home",
    "Ravi played with his ball",
    "Ravi went to the park"
  ],
  correctOrder: [2, 1, 0],
  correctAnswer: "2,1,0",
  explanation: "First Ravi went to the park, then played, then went home."
}
```

**Reference:**
- [QUESTION-TYPE-PROGRESSION-RULES.md - Story Sequence](./QUESTION-TYPE-PROGRESSION-RULES.md#question-type-story-sequence)
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 5](./HOLISTIC-IMPLEMENTATION-PLAN.md#51-story-sequence)

**Acceptance Criteria:**
- [ ] Events can be dragged to numbered positions
- [ ] Labels show: First, Then, Next, Finally
- [ ] Sequence validation works
- [ ] Passage can be re-read
- [ ] Audio integration
- [ ] Tablet-tested

---

### 6. Create Story Sequence Questions ⚡ HIGH PRIORITY
**Status:** ⏳ PARTIAL - 4 test questions created, 36 production questions needed
**Estimated Time:** 8-10 hours
**Test Questions:** 2026-01-08

**Quantity Needed:** 36 questions (12 per block × 3 rotation sets)

**Content to Create:**
- **Block 0 (EASY):** 3 events, obvious sequence
  - Daily routines (wake up → breakfast → school)
  - Time progression (morning → afternoon → night)

- **Block 1 (MEDIUM):** 4 events, logical chain
  - Process stories (plant seed → water → grows → harvest)
  - Character actions (farmer stories from PDF page 16)

- **Block 2 (HARD):** 5 events, inference required
  - Emotional narratives (worried → study → test → score → happy)
  - Problem-solution stories

**Reference:**
- PDF pages 15-16 for question templates
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 5 Content](./HOLISTIC-IMPLEMENTATION-PLAN.md#51-story-sequence)

**Acceptance Criteria:**
- [ ] 36 story passages created
- [ ] Events clearly sequenceable
- [ ] Age-appropriate language (Grade 4)
- [ ] Culturally relevant to Gujarat context
- [ ] Explanations include causal reasoning

---

### 7. Implement Add Word Activity Component 🟡 MEDIUM PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 8-10 hours
**Completed:** 2026-01-08

**File to Create:** `components/game/question-types/AddWordActivity.tsx`

**Functionality:**
- Display base sentence with insertion point
- Word bank below (adjectives/adverbs)
- Drag or tap word to insert
- Live preview of expanded sentence
- Support multiple correct answers
- Visual highlighting of insertion point

**Example Question Structure:**
```typescript
{
  type: "add-word",
  prompt: "Add a describing word to make the sentence better",
  baseSentence: "The dog runs",
  wordType: "adjective",
  insertPosition: 1,  // Between "The" and "dog"
  options: ["big", "small", "fast", "brown"],
  correctAnswers: ["big", "small", "brown"],  // Multiple valid
  correctAnswer: "big",
  explanation: "Describing words tell us more about the dog."
}
```

**Reference:**
- [QUESTION-TYPE-PROGRESSION-RULES.md - Add Word](./QUESTION-TYPE-PROGRESSION-RULES.md#question-type-add-word)
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 4](./HOLISTIC-IMPLEMENTATION-PLAN.md#42-add-word-activity)

**Acceptance Criteria:**
- [ ] Base sentence displays clearly
- [ ] Insertion point highlighted
- [ ] Word bank draggable
- [ ] Live preview updates
- [ ] Multiple correct answers accepted
- [ ] Explanation shows expanded sentence

---

### 8. Create Add Word Questions 🟡 MEDIUM PRIORITY
**Status:** ⏳ PARTIAL - 4 test questions created, 36 production questions needed
**Estimated Time:** 4-6 hours
**Test Questions:** 2026-01-08

**Quantity Needed:** 36 questions (12 per block × 3 rotation sets)

**Content Sources:**
- **Block 0 (EASY):** Add adjectives to 3-word sentences
  - Use PDF page 11-12 word lists + example sentences

- **Block 1 (MEDIUM):** Add adverbs to 4-5 word sentences
  - Use PDF page 12 word lists + example sentences

- **Block 2 (HARD):** Add multiple words to complex sentences
  - Use PDF page 13 word lists + example sentences

**Reference:**
- PDF pages 11-13 for complete word lists
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 4 Content Pools](./HOLISTIC-IMPLEMENTATION-PLAN.md#42-add-word-activity)

**Acceptance Criteria:**
- [ ] 36 questions created
- [ ] Multiple correct answers identified
- [ ] Word types correctly labeled
- [ ] Insertion positions accurate
- [ ] Explanations grammatically sound

---

### 9. Implement Sentence Gap Fill Component 🟡 MEDIUM PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 4-6 hours
**Completed:** 2026-01-08

**File to Create:** `components/game/question-types/SentenceGapFill.tsx`

**Functionality:**
- Display sentence with visible gap (underscore or blank box)
- 3-4 button options below
- Selected word fills gap with preview
- Context-based feedback

**Example Question Structure:**
```typescript
{
  type: "sentence-gap-fill",
  prompt: "Choose the word that makes the most sense",
  baseSentence: "I feel ___ after playing outside.",
  gapPosition: 2,  // Word index where gap appears
  options: ["hungry", "tired", "happy", "confused"],
  correctAnswer: "tired",
  explanation: "After playing, people usually feel tired because they used energy."
}
```

**Reference:**
- [QUESTION-TYPE-PROGRESSION-RULES.md - Gap Fill](./QUESTION-TYPE-PROGRESSION-RULES.md#question-type-sentence-gap-fill)
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 2](./HOLISTIC-IMPLEMENTATION-PLAN.md#22-sentence-gap-fill)

**Acceptance Criteria:**
- [ ] Gap visually distinct (not just missing text)
- [ ] Preview shows selected word in context
- [ ] Options vertically stacked
- [ ] Audio for question + feedback
- [ ] Simple, clean UI

---

### 10. Create Sentence Gap Fill Questions 🟡 MEDIUM PRIORITY
**Status:** ⏳ PARTIAL - 4 test questions created, 36 production questions needed
**Estimated Time:** 4-6 hours
**Test Questions:** 2026-01-08

**Quantity Needed:** 36 questions (12 per block × 3 rotation sets)

**Content Sources:**
- **Block 0 (EASY):** Concrete, observable cause-effect
  - Use PDF page 5 sentences (20 available)

- **Block 1 (MEDIUM):** Feelings & social context
  - Use PDF page 6 sentences (20 available)

- **Block 2 (HARD):** Emotions & thinking
  - Use PDF page 7 sentences (20 available)

**Strategy:** Extract sentences from PDF, convert to gap-fill format

**Reference:**
- PDF pages 5-7 have complete sentence sets
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 2 Content](./HOLISTIC-IMPLEMENTATION-PLAN.md#22-sentence-gap-fill)

**Acceptance Criteria:**
- [ ] 36 questions created
- [ ] Gap positions correctly identified
- [ ] Distractors plausible but clearly wrong
- [ ] Explanations include reasoning (why this word fits)
- [ ] All sentences from PDF curriculum

---

### 11. Implement Reading Comprehension Component 🟡 MEDIUM PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 6-8 hours
**Completed:** 2026-01-08

**File to Create:** `components/game/question-types/ReadingComprehension.tsx`

**Functionality:**
- Passage display at top (scrollable if long)
- "Read again" button
- Question below with clear formatting
- 3-4 MCQ options
- Different styling for passage vs question

**Example Question Structure:**
```typescript
{
  type: "reading-comprehension",
  prompt: "Read the story and answer: Who is in the story?",
  passage: "Ravi went to the park. He played with his ball.",
  questionType: "who",
  options: ["Ravi", "The teacher", "The farmer", "A dog"],
  correctAnswer: "Ravi",
  explanation: "The story says 'Ravi went to the park'."
}
```

**Reference:**
- [QUESTION-TYPE-PROGRESSION-RULES.md - Reading Comprehension](./QUESTION-TYPE-PROGRESSION-RULES.md#question-type-reading-comprehension)
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 3](./HOLISTIC-IMPLEMENTATION-PLAN.md#31-reading-comprehension)

**Acceptance Criteria:**
- [ ] Passage displays in readable format
- [ ] "Read again" button works
- [ ] Question clearly separated from passage
- [ ] Audio plays passage, then question
- [ ] Scrollable for long passages

---

### 12. Create Reading Comprehension Passages & Questions 🟡 MEDIUM PRIORITY
**Status:** ⏳ PARTIAL - 4 test questions created, 72 production questions needed
**Estimated Time:** 12-15 hours
**Test Questions:** 2026-01-08

**Quantity Needed:** 72 questions total
- Lesson 3: 36 questions (12 per block × 3 rotation sets)
- Lesson 5: 36 questions (12 per block × 3 rotation sets)

**Content to Create:**
- **Block 0 (EASY):** 2-3 sentence stories, Who/What questions
  - 24 stories needed (12 for Lesson 3 + 12 for Lesson 5)

- **Block 1 (MEDIUM):** 4-5 sentence stories, What happened/Where questions
  - 24 stories needed

- **Block 2 (HARD):** 5-6 sentence stories, Why/How questions
  - 24 stories needed

**Strategy:**
- Use PDF question templates (pages 15-16)
- Create original stories using vocabulary from page 9 word lists
- Keep culturally relevant (Gujarat context: school, home, market, farm)

**Reference:**
- PDF pages 15-16 for question templates
- PDF page 9 for vocabulary pools
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Lesson 3 & 5 Content](./HOLISTIC-IMPLEMENTATION-PLAN.md#31-reading-comprehension)

**Acceptance Criteria:**
- [ ] 72 passages created
- [ ] Age-appropriate (Grade 4, below-level)
- [ ] Questions match comprehension level
- [ ] Explanations reference passage text
- [ ] Vocabulary from PAL curriculum

---

### 13. Enhance Picture-Word Match Component 🟢 LOW PRIORITY
**Status:** ✅ Partially implemented, needs enhancement
**Estimated Time:** 6-8 hours

**File to Update:** `components/game/question-types/PictureWordMatch.tsx`

**Enhancements Needed:**
- Drag-and-drop word-to-image matching (currently just MCQ)
- Visual connection lines
- Multiple pairs (4-6) per question
- Grid layout (images left, words right)

**Current vs. Target:**
- Current: Single image, select matching word
- Target: Multiple images, drag words to match

**Reference:**
- [QUESTION-TYPES-REFERENCE.md - Picture-Word Match](./QUESTION-TYPES-REFERENCE.md#5-picture-word-match-picture-word-match)

**Acceptance Criteria:**
- [ ] Drag words to images
- [ ] Visual lines connect pairs
- [ ] 4-6 pairs per question
- [ ] Grid layout responsive
- [ ] All pairs must match to submit

---

### 14. Update QuestionCard Router 🟡 MEDIUM PRIORITY
**Status:** ✅ COMPLETE
**Estimated Time:** 2-3 hours
**Completed:** 2026-01-08

**File to Update:** `components/game/QuestionCard.tsx`

**Changes Needed:**
Add routing logic for new question types:
```typescript
switch (question.type) {
  case 'sentence-rearrange':
    return <SentenceRearrange question={question} onAnswer={onAnswer} disabled={disabled} />
  case 'story-sequence':
    return <StorySequence question={question} onAnswer={onAnswer} disabled={disabled} />
  case 'add-word':
    return <AddWordActivity question={question} onAnswer={onAnswer} disabled={disabled} />
  case 'sentence-gap-fill':
    return <SentenceGapFill question={question} onAnswer={onAnswer} disabled={disabled} />
  case 'reading-comprehension':
    return <ReadingComprehension question={question} onAnswer={onAnswer} disabled={disabled} />
  // ... existing types
}
```

**Acceptance Criteria:**
- [ ] All 10 question types routed correctly
- [ ] Props passed correctly to each component
- [ ] TypeScript types satisfied
- [ ] No runtime errors

---

### 15. Update Lesson Database Content 🟢 LOW PRIORITY
**Status:** 🚧 Not started
**Estimated Time:** 4-6 hours

**Files to Update:**
- `seed-lessons-grade4.sql` (or create new migration)

**Changes Needed:**
1. Add new question types to existing lessons
2. Update rotation sets with new question formats
3. Maintain existing content structure

**Strategy:**
- Add questions gradually (lesson by lesson)
- Test each lesson before adding next
- Keep backup of current seed file

**Reference:**
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Database Schema](./HOLISTIC-IMPLEMENTATION-PLAN.md#database-schema-updates)

**Acceptance Criteria:**
- [ ] All new questions in database
- [ ] Rotation sets correctly structured
- [ ] JSONB fields validated
- [ ] Can query and load lessons

---

### 16. Generate TTS Audio Files 🟢 LOW PRIORITY
**Status:** 🚧 Not started
**Estimated Time:** 8-10 hours (mostly automated)

**Quantity Needed:** ~288 new audio files
- 108 new questions × 2 (question + answer)
- 72 story passages

**Process:**
1. Extract all text needing audio
2. Batch generate via Google TTS API
3. Upload to Supabase Storage
4. Update question records with audio URLs

**Voice Settings:**
- Language: en-IN (Indian English)
- Voice: Wavenet-D (female)
- Speed: 0.9x
- Pitch: 0.5

**Reference:**
- [HOLISTIC-IMPLEMENTATION-PLAN.md - Audio Requirements](./HOLISTIC-IMPLEMENTATION-PLAN.md#appendix-c-audio-requirements)

**Acceptance Criteria:**
- [ ] All questions have audio
- [ ] Audio URLs in database
- [ ] Audio cached properly
- [ ] Playback tested on tablets

---

### 17. Testing - Unit Tests 🟢 LOW PRIORITY
**Status:** 🚧 Not started
**Estimated Time:** 6-8 hours

**Tests to Create:**
- Sentence order validation (sentence-rearrange, story-sequence)
- Multiple correct answers handling (add-word)
- Gap position calculation (sentence-gap-fill)
- Passage parsing (reading-comprehension)

**Testing Framework:** Already in place (likely Jest + React Testing Library)

**Acceptance Criteria:**
- [ ] All validation logic unit tested
- [ ] Edge cases covered
- [ ] 80%+ code coverage

---

### 18. Testing - Integration Tests 🟢 LOW PRIORITY
**Status:** 🚧 Not started
**Estimated Time:** 8-10 hours

**Tests to Create:**
- Question component rendering
- Drag-and-drop state management
- Audio integration
- Answer submission flow
- Rotation set selection

**Acceptance Criteria:**
- [ ] All new components integration tested
- [ ] User flows tested end-to-end
- [ ] Audio timing tested

---

### 19. Testing - Manual Tablet Testing ⚡ HIGH PRIORITY
**Status:** 🚧 Not started
**Estimated Time:** 6-8 hours

**Devices to Test:**
- iPad (iOS)
- Samsung tablet (Android)
- Generic Android tablet

**Test Cases:**
- [ ] Drag-and-drop on touch
- [ ] Button tap targets (≥48px)
- [ ] Audio playback
- [ ] Offline mode
- [ ] Visual feedback clarity
- [ ] Performance (no lag)

**Acceptance Criteria:**
- [ ] All interactions work on all devices
- [ ] No visual glitches
- [ ] Audio synchronized properly

---

### 20. Documentation for Teachers 🟢 LOW PRIORITY
**Status:** 🚧 Not started
**Estimated Time:** 4-6 hours

**Documents to Create:**
1. Question type guide (what each type tests)
2. How to interpret rotation set data
3. Troubleshooting guide

**Format:** PDF or web page accessible from teacher dashboard

**Acceptance Criteria:**
- [ ] All question types explained
- [ ] Screenshots included
- [ ] Clear, non-technical language

---

## 📋 Phased Rollout Plan

### Phase 1: Weeks 1-2 (Lesson 4 Focus)
**Goal:** Get sentence-rearrange and add-word working

- [ ] Install @dnd-kit dependencies
- [ ] Create shared drag-and-drop components
- [ ] Implement SentenceRearrange component
- [ ] Create 36 sentence-rearrange questions
- [ ] Implement AddWordActivity component
- [ ] Create 36 add-word questions
- [ ] Update QuestionCard router
- [ ] Manual tablet testing
- [ ] Deploy to staging
- [ ] Pilot with 2-3 classes

### Phase 2: Weeks 3-4 (Lesson 5 Focus)
**Goal:** Get story-sequence working

- [ ] Implement StorySequence component
- [ ] Create 36 story-sequence questions
- [ ] Implement ReadingComprehension component (if not done)
- [ ] Create 36 comprehension passages for Lesson 5
- [ ] Manual tablet testing
- [ ] Deploy to staging
- [ ] Pilot with same classes

### Phase 3: Weeks 5-6 (Lesson 2 & 3 Focus)
**Goal:** Get gap-fill and comprehension working

- [ ] Implement SentenceGapFill component
- [ ] Create 36 gap-fill questions
- [ ] Create 36 comprehension passages for Lesson 3
- [ ] Enhance PictureWordMatch component
- [ ] Manual tablet testing
- [ ] Deploy to staging
- [ ] Pilot with same classes

### Phase 4: Week 7 (Full Deployment)
**Goal:** All lessons live for all classes

- [ ] Generate all TTS audio
- [ ] Update database with all new content
- [ ] Final round of testing
- [ ] Deploy to production
- [ ] Monitor usage and errors
- [ ] Gather teacher feedback

---

## 🎯 Success Metrics to Track

### Student Engagement
- **Target:** 80%+ completion rate per lesson attempt
- **Measure:** `attempts` table, `is_completed` field

### Accuracy Progression
- **Target:** 10%+ accuracy improvement from attempt 1 → 3
- **Measure:** Compare `accuracy_percentage` across rotation sets

### Teacher Adoption
- **Target:** 70%+ teachers unlock 3+ lessons per class
- **Measure:** `lesson_unlocks` table, count per teacher

### Technical Performance
- **Target:** <2s question load time
- **Target:** <1s audio playback start
- **Target:** 95%+ offline sync success rate

---

## 📂 Quick Reference Links

### Documentation
- [HOLISTIC-IMPLEMENTATION-PLAN.md](./HOLISTIC-IMPLEMENTATION-PLAN.md) - Complete roadmap
- [QUESTION-TYPES-REFERENCE.md](./QUESTION-TYPES-REFERENCE.md) - All question type specs
- [QUESTION-TYPE-PROGRESSION-RULES.md](./QUESTION-TYPE-PROGRESSION-RULES.md) - Difficulty & rotation guidelines
- [ROTATION-SETS-PEDAGOGY.md](./ROTATION-SETS-PEDAGOGY.md) - Pedagogical rationale

### Code Files
- [lib/types.ts](../lib/types.ts) - TypeScript type definitions
- [lib/lessonEngine.ts](../lib/lessonEngine.ts) - Lesson logic engine
- [components/game/QuestionCard.tsx](../components/game/QuestionCard.tsx) - Main question router

### Curriculum Source
- [Grade 4 English PAL-Integrated Lesson Plans.pdf](../assets/Grade%204%20English%20PAL-Integrated%20Lesson%20Plans.pdf)

---

## ⚠️ Known Risks & Mitigation

### Risk 1: Drag-and-Drop Mobile Issues
**Mitigation:** Provide tap-to-select alternative, test early on multiple devices

### Risk 2: Content Creation Bottleneck
**Mitigation:** Use PDF sentences directly, create templates for stories, automate where possible

### Risk 3: Audio Generation Cost/Time
**Mitigation:** Batch process, cache aggressively, generate on-demand as fallback

### Risk 4: Scope Creep
**Mitigation:** Stick to phased rollout, get feedback before next phase, prioritize core functionality

---

## 📞 Questions / Blockers Log

**Format:** Date - Question/Blocker - Resolution

_[To be filled as issues arise]_

---

## ✅ Completed Tasks (Archive)

_[Tasks will be moved here as completed]_

---

**Last Updated:** 2026-01-08
**Next Review:** After Phase 1 Week 1
**Owner:** Development Team
