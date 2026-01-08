# Question Types Reference Guide

**Last Updated:** 2026-01-08
**Curriculum Version:** Grade 4 English PAL v1.0
**Status:** 5 implemented, 5 planned

---

## Overview

The PAL Vocabulary Support Tool uses **10 distinct question types** aligned with the Grade 4 English PAL-Integrated Lesson Plans. Each type targets specific literacy skills and supports progressive difficulty levels (EASY → MEDIUM → HARD).

---

## ✅ Implemented Question Types (5)

### 1. Multiple Choice (`multiple-choice`)

**Description:** Student selects one correct answer from 3-4 options.

**Literacy Skills:**
- Vocabulary recognition
- Comprehension
- Recall

**UI Pattern:**
- Question prompt with TTS audio
- 3-4 vertical button options
- Audio auto-plays, buttons disabled until complete
- Tap to select answer

**Data Structure:**
```typescript
{
  id: "q1",
  type: "multiple-choice",
  prompt: "Which word means 'not clean'?",
  options: ["dirty", "clean", "wet", "dry"],
  correctAnswer: "dirty",
  explanation: "Dirty means not clean."
}
```

**Rotation Strategy:**
- Change vocabulary word
- Keep sentence structure similar
- Maintain difficulty tier

**Used In:** Lessons 1, 2, 3, 5

---

### 2. Listen and Select (`listen-and-select`)

**Description:** Same as multiple choice, but emphasizes listening to audio before answering.

**Literacy Skills:**
- Auditory processing
- Phonological awareness
- Word recognition

**UI Pattern:**
- Identical to multiple-choice
- Audio focus cue (visual or text)
- Same vertical button layout

**Data Structure:**
```typescript
{
  id: "q2",
  type: "listen-and-select",
  prompt: "Listen carefully. Which word has 3 syllables?",
  audioUrl: "https://...",  // Optional pre-recorded audio
  options: ["basket", "holiday", "remember", "pen"],
  correctAnswer: "holiday",
  explanation: "Holiday has 3 syllables: hol-i-day"
}
```

**Rotation Strategy:**
- Use different words from same syllable count tier
- Vary distractor syllable counts

**Used In:** Lesson 1 (syllable counting)

---

### 3. Word Match (`word-match`)

**Description:** Match words to their definitions or synonyms.

**Literacy Skills:**
- Vocabulary depth
- Semantic relationships
- Pairing logic

**UI Pattern:**
- Two columns: words and definitions
- Tap word, then tap matching definition
- Visual line connects matched pairs

**Data Structure:**
```typescript
{
  id: "q3",
  type: "word-match",
  prompt: "Match each word with its meaning",
  options: [
    "hungry|wanting to eat",
    "tired|needing to rest",
    "clean|not dirty",
    "near|close by"
  ],
  correctAnswer: "all",  // All pairs must match
  explanation: "Each word describes a feeling or state."
}
```

**Rotation Strategy:**
- Use different vocabulary sets from same difficulty tier
- Keep conceptual categories similar (emotions, actions, descriptions)

**Used In:** Lesson 2 (vocabulary building)

---

### 4. Sentence Completion (`sentence-completion`)

**Description:** Fill in the blank with the correct word from options.

**Literacy Skills:**
- Context clues
- Grammar sense
- Vocabulary application

**UI Pattern:**
- Sentence with visible blank: "I feel ___ after playing."
- 3-4 button options below
- Selected word fills blank with preview

**Data Structure:**
```typescript
{
  id: "q4",
  type: "sentence-completion",
  prompt: "Choose the word that best completes the sentence.",
  options: ["hungry", "tired", "happy", "sad"],
  correctAnswer: "tired",
  explanation: "After playing, people usually feel tired."
}
```

**Rotation Strategy:**
- Change base sentence and vocabulary word
- Keep sentence complexity level consistent
- Use similar context types (cause-effect, description)

**Used In:** Lessons 2, 3, 4

---

### 5. Picture-Word Match (`picture-word-match`)

**Description:** Match images with corresponding words.

**Literacy Skills:**
- Visual-verbal association
- Concrete vocabulary
- Object recognition

**UI Pattern:**
- Grid layout: images on left, words on right
- Drag word to image OR tap to connect
- Visual lines show connections

**Data Structure:**
```typescript
{
  id: "q5",
  type: "picture-word-match",
  prompt: "Match each picture with the correct word",
  imageUrl: "https://.../composite-image.png",  // Multiple images in grid
  options: ["basket", "window", "teacher", "paper"],
  correctAnswer: "all",  // All must match
  explanation: "Each picture shows the object named by the word."
}
```

**Rotation Strategy:**
- Use different concrete nouns from same familiarity tier
- Vary visual contexts (classroom, home, nature)

**Used In:** Lesson 1, Lesson 2

---

## 🚧 Planned Question Types (5)

### 6. Sentence Rearrange (`sentence-rearrange`)

**Description:** Drag or tap to arrange scrambled words into a grammatically correct sentence.

**Literacy Skills:**
- Sentence structure
- Grammar rules
- Word order (subject-verb-object)

**UI Pattern:**
- Scrambled word cards/blocks
- Drag to reorder OR tap to select sequence
- Drop zones with numbered positions
- Auto-check when all positioned

**Data Structure:**
```typescript
{
  id: "q6",
  type: "sentence-rearrange",
  prompt: "Arrange the words to make a correct sentence",
  scrambledItems: ["runs", "dog", "The", "fast"],
  correctOrder: [2, 1, 0, 3],  // "The dog runs fast"
  correctAnswer: "The dog runs fast",
  explanation: "Sentences start with capital letters. Subject comes before verb."
}
```

**Difficulty Progression:**
- **EASY:** 3-4 words, simple SVO structure ("The dog runs")
- **MEDIUM:** 4-5 words, add adjectives ("The big dog runs fast")
- **HARD:** 5-6 words, complex phrases ("The big dog runs fast in the park")

**Rotation Strategy:**
- Use different base sentences
- Keep grammatical complexity similar
- Vary subject/verb/object vocabulary

**Component:** `SentenceRearrange.tsx` (to be created)
**Library:** `@dnd-kit/sortable` for drag-and-drop

**Used In:** Lesson 4

---

### 7. Story Sequence (`story-sequence`)

**Description:** Order story events in chronological sequence.

**Literacy Skills:**
- Narrative comprehension
- Temporal reasoning
- Story structure (beginning/middle/end)

**UI Pattern:**
- 3-5 event cards with short sentences
- Drag to reorder OR tap-select sequence
- Labels: "First", "Then", "Next", "Finally"
- Check button validates order

**Data Structure:**
```typescript
{
  id: "q7",
  type: "story-sequence",
  prompt: "Put the story events in the correct order",
  passage: "Ravi went to the market. He bought vegetables. He came home and cooked food. His family ate dinner together.",
  scrambledItems: [
    "Ravi bought vegetables",
    "Ravi went to the market",
    "His family ate dinner",
    "Ravi cooked food"
  ],
  correctOrder: [1, 0, 3, 2],  // Market → Buy → Cook → Eat
  correctAnswer: "1,0,3,2",
  explanation: "First Ravi went to the market, then bought vegetables, cooked, and finally his family ate."
}
```

**Difficulty Progression:**
- **EASY:** 3 events, obvious sequence (morning → afternoon → night)
- **MEDIUM:** 4 events, logical chain (plant seed → water → grows → harvest)
- **HARD:** 5 events, infer missing connections (girl worried → finds solution → tries → succeeds → happy)

**Rotation Strategy:**
- Different story contexts (school, home, nature)
- Keep narrative structure similar (problem-solution, process, journey)

**Component:** `StorySequence.tsx` (to be created)
**Library:** `@dnd-kit/sortable`

**Used In:** Lesson 5

---

### 8. Add Word (`add-word`)

**Description:** Expand a basic sentence by adding adjectives, adverbs, or phrases.

**Literacy Skills:**
- Sentence expansion
- Descriptive language
- Grammar application (adjectives modify nouns, adverbs modify verbs)

**UI Pattern:**
- Base sentence displayed: "The dog runs"
- Highlighted insertion point (blinking cursor or underline)
- Word bank below (drag or tap words)
- Preview shows expanded sentence
- Multiple correct answers possible

**Data Structure:**
```typescript
{
  id: "q8",
  type: "add-word",
  prompt: "Add a describing word to make the sentence better",
  baseSentence: "The dog runs",
  wordType: "adjective",
  insertPosition: 1,  // After "The", before "dog"
  options: ["big", "small", "fast", "brown"],
  correctAnswers: ["big", "small", "fast", "brown"],  // All valid
  correctAnswer: "big",  // Example for display
  explanation: "Describing words tell us more about the dog."
}
```

**Difficulty Progression:**
- **EASY:** Add simple adjective (color, size) to 3-word sentence
- **MEDIUM:** Add adverb (how, when) to 4-word sentence
- **HARD:** Add multiple words (adjective + adverb + phrase) to complex sentence

**Rotation Strategy:**
- Different base sentences (vary subjects and verbs)
- Keep grammatical expansion type similar
- Vary semantic categories of descriptive words

**Component:** `AddWordActivity.tsx` (to be created)
**Library:** `@dnd-kit/core` for word dragging

**Used In:** Lesson 4

---

### 9. Sentence Gap Fill (`sentence-gap-fill`)

**Description:** Choose the context-appropriate word to fill a blank in a sentence.

**Literacy Skills:**
- Context clues
- Semantic reasoning
- Vocabulary precision

**UI Pattern:**
- Sentence with visible gap: "I feel ___ after playing outside."
- 4 button options below
- Selected word fills gap with preview
- Context-based feedback explains why

**Data Structure:**
```typescript
{
  id: "q9",
  type: "sentence-gap-fill",
  prompt: "Choose the word that makes the most sense",
  baseSentence: "I feel ___ after playing outside.",
  gapPosition: 2,  // Word index where gap appears
  options: ["hungry", "tired", "happy", "confused"],
  correctAnswer: "tired",
  explanation: "After playing, people usually feel tired because they used energy."
}
```

**Difficulty Progression:**
- **EASY:** Obvious context (rain → wet, sun → hot)
- **MEDIUM:** Logical inference (playing → tired, studying → focused)
- **HARD:** Subtle context (disappointed, patient, thoughtful require deeper inference)

**Rotation Strategy:**
- Different sentence contexts
- Keep inference difficulty level similar
- Vary vocabulary semantic fields

**Component:** `SentenceGapFill.tsx` (to be created)

**Used In:** Lesson 2

---

### 10. Reading Comprehension (`reading-comprehension`)

**Description:** Read a short passage, then answer Who/What/Where/When/Why questions.

**Literacy Skills:**
- Reading fluency
- Literal comprehension
- Inferential comprehension (higher levels)

**UI Pattern:**
- Passage displayed at top (scrollable, 3-6 sentences)
- Question below with clear formatting
- "Read again" button to re-display passage
- 3-4 MCQ options

**Data Structure:**
```typescript
{
  id: "q10",
  type: "reading-comprehension",
  prompt: "Read the story and answer the question",
  passage: "Ravi and his friend went to school. They played football during break time. Ravi scored a goal. His friend cheered loudly.",
  questionType: "who",
  options: ["Ravi and his friend", "The teacher", "Ravi's family", "The farmer"],
  correctAnswer: "Ravi and his friend",
  explanation: "The story says 'Ravi and his friend went to school'."
}
```

**Difficulty Progression:**
- **EASY:** 2-3 sentences, literal recall (Who? What?)
  - "Who went to school?" → "Ravi and his friend"
- **MEDIUM:** 4-5 sentences, connected recall (What happened? Where?)
  - "What did they play?" → "Football"
- **HARD:** 5-6 sentences, inference (Why? How?)
  - "Why did his friend cheer?" → "Because Ravi scored a goal"

**Rotation Strategy:**
- Different story contexts (home, school, park, market)
- Keep narrative complexity similar
- Vary question focus (who vs what vs why)

**Component:** `ReadingComprehension.tsx` (to be created)

**Used In:** Lessons 3, 5

---

## Question Type Summary Table

| Question Type | Implemented | Interactive | Audio | Drag/Drop | Used In Lessons |
|---------------|-------------|-------------|-------|-----------|-----------------|
| multiple-choice | ✅ | Tap | Yes | No | 1, 2, 3, 5 |
| listen-and-select | ✅ | Tap | Yes | No | 1 |
| word-match | ✅ | Tap pairs | Yes | No | 2 |
| sentence-completion | ✅ | Tap | Yes | No | 2, 3, 4 |
| picture-word-match | ✅ | Tap/Drag | Yes | Optional | 1, 2 |
| sentence-rearrange | 🚧 | Drag/Tap | Yes | Yes | 4 |
| story-sequence | 🚧 | Drag/Tap | Yes | Yes | 5 |
| add-word | 🚧 | Drag/Tap | Yes | Yes | 4 |
| sentence-gap-fill | 🚧 | Tap | Yes | No | 2 |
| reading-comprehension | 🚧 | Tap | Yes | No | 3, 5 |

---

## Rotation Set Guidelines

### Principles for All Question Types

1. **Maintain Difficulty Tier**
   - EASY rotation sets use EASY vocabulary/concepts
   - MEDIUM rotation sets use MEDIUM vocabulary/concepts
   - HARD rotation sets use HARD vocabulary/concepts

2. **Vary Content, Not Structure**
   - Keep question format identical
   - Change words, sentences, stories
   - Preserve grammatical complexity

3. **Prevent Memorization**
   - No overlapping vocabulary between sets
   - Different contexts (school → home → park)
   - Shuffle answer positions

4. **Curriculum Alignment**
   - All content from PAL word lists
   - Age-appropriate (Grade 4, below-level)
   - Culturally relevant to Gujarat context

### Rotation Set Structure

Each block should have:
```json
{
  "blockNumber": 0,
  "questions": [/* 4 default questions */],
  "rotationSets": [
    [/* 4 rotation set 1 questions */],
    [/* 4 rotation set 2 questions */]
  ]
}
```

### Example Rotation Cycle

**Lesson 1, Block 0 (EASY - 2 syllables)**

**Default Set (Attempt 1, 4, 7...):**
- basket, window, paper, teacher

**Rotation Set 1 (Attempt 2, 5, 8...):**
- water, mother, table, doctor

**Rotation Set 2 (Attempt 3, 6, 9...):**
- happy, rabbit, pencil, yellow

All words maintain:
- ✅ 2 syllables
- ✅ Familiar vocabulary
- ✅ Grade 2-3 reading level
- ✅ From PAL curriculum word list

---

## UX Requirements for All Question Types

### Audio Behavior
1. ✅ Question prompt TTS auto-plays when question appears
2. ✅ All interaction buttons disabled until audio completes
3. ✅ "Replay audio" button available after first play
4. ✅ Sound effects for taps, correct/incorrect answers
5. ✅ TTS feedback on result screens

### Touch Interactions
1. ✅ Large touch targets (≥48px)
2. ✅ Clear visual feedback (pressed state, hover)
3. ✅ Drag gestures smooth and responsive (for drag types)
4. ✅ Alternative tap-select mode for accessibility
5. ✅ No accidental double-taps

### Visual Design
1. ✅ High contrast text (WCAG AA minimum)
2. ✅ Rounded child-friendly buttons
3. ✅ Gentle animations (no jarring transitions)
4. ✅ Progress indicators visible
5. ✅ Clear state changes (idle, active, correct, incorrect)

### Error Prevention
1. ✅ Confirm before submit (for drag/drop types)
2. ✅ "Undo" button before final submit
3. ✅ Clear instructions with examples
4. ✅ No harsh error messages

---

## Implementation Priority

### Phase 1: Core Interactive (High Priority)
1. **sentence-rearrange** - Essential for Lesson 4
2. **story-sequence** - Essential for Lesson 5
3. **picture-word-match (enhanced)** - Improved drag-and-drop for Lesson 2

### Phase 2: Skill Building (Medium Priority)
4. **add-word** - Sentence expansion for Lesson 4
5. **reading-comprehension** - Better passage handling for Lessons 3 & 5

### Phase 3: Polish (Low Priority)
6. **sentence-gap-fill** - Refinement of sentence-completion
7. Multi-step questions - Combine question types

---

## Technical Specifications

### Component Architecture
```
components/game/question-types/
├── MultipleChoice.tsx (existing)
├── ListenAndSelect.tsx (existing, shares MultipleChoice logic)
├── WordMatch.tsx (existing)
├── SentenceCompletion.tsx (existing)
├── PictureWordMatch.tsx (existing, needs enhancement)
├── SentenceRearrange.tsx (NEW)
├── StorySequence.tsx (NEW)
├── AddWordActivity.tsx (NEW)
├── SentenceGapFill.tsx (NEW)
└── ReadingComprehension.tsx (NEW)
```

### Shared Components
```
components/game/shared/
├── DraggableCard.tsx - Reusable drag item
├── DropZone.tsx - Reusable drop target
├── WordBank.tsx - Selectable word pool
└── PassageDisplay.tsx - Formatted story text
```

### Dependencies
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## Testing Checklist

For each new question type:

### Unit Tests
- [ ] Correct answer validation logic
- [ ] Order checking (for sequence types)
- [ ] Multiple correct answers handling (for add-word)
- [ ] Edge cases (empty, single item, all wrong)

### Integration Tests
- [ ] Question rendering with all props
- [ ] Audio integration (auto-play, replay)
- [ ] State management (answer selection, submit)
- [ ] Feedback display (correct/incorrect)

### Manual Tests
- [ ] Tablet touch interactions (iPad, Android)
- [ ] Audio timing (no overlap, proper queuing)
- [ ] Visual feedback (animations, state changes)
- [ ] Error states (network failure, audio load failure)
- [ ] Accessibility (screen reader, keyboard navigation)

---

## References

- **Official Curriculum:** [Grade 4 English PAL-Integrated Lesson Plans.pdf](../assets/Grade%204%20English%20PAL-Integrated%20Lesson%20Plans.pdf)
- **Rotation Sets Pedagogy:** [ROTATION-SETS-PEDAGOGY.md](./ROTATION-SETS-PEDAGOGY.md)
- **Implementation Guide:** [MISSING-QUESTION-TYPES-PLAN.md](./MISSING-QUESTION-TYPES-PLAN.md)
- **UX Guidelines:** [../05_ux_ui_guidelines.md](../05_ux_ui_guidelines.md)

---

**Document Version:** 1.0
**Last Review:** 2026-01-08
**Next Review:** After Phase 1 implementation
