# Missing Question Types - Implementation Plan

**Date**: January 8, 2026
**Based on**: Grade 4 English PAL-Integrated Lesson Plans PDF

## Current Implementation Status

### ✅ Implemented Question Types
1. **multiple-choice** - Select one answer from options
2. **listen-and-select** - Same as MCQ but with audio focus
3. **word-match** - Match words with definitions (basic)
4. **sentence-completion** - Fill in the blank
5. **picture-word-match** - Match images to words

### ❌ Missing Question Types (From Lesson Plans)

Based on the PDF analysis, the following interactive question types are mentioned in "PAL Practice" sections but not yet implemented:

## 1. **Sentence Rearranging / Story Sequencing** (Lesson 4 & 5)

**Mentioned in PDF**:
- Lesson 4: "Sentence rearranging"
- Lesson 5: "Story sequencing"

**Description**:
Students drag and drop sentence fragments or story events to arrange them in the correct order.

**Use Cases**:
- **Sentence Building**: Rearrange words to form grammatically correct sentences
  - Example: `["runs", "dog", "The", "fast"]` → `"The dog runs fast"`
- **Story Sequencing**: Order events chronologically
  - Example: Order 3-4 story events from beginning to end
  - "First" → "Then" → "Finally"

**Implementation Requirements**:
```typescript
type QuestionType = 'sentence-rearrange' | 'story-sequence'

interface SentenceRearrangeQuestion {
  type: 'sentence-rearrange'
  prompt: string
  scrambledItems: string[]  // Words or phrases to arrange
  correctOrder: number[]     // Indices in correct order [0, 3, 1, 2]
  explanation?: string
}

interface StorySequenceQuestion {
  type: 'story-sequence'
  prompt: string
  story: string              // Full story for context
  events: string[]           // Story events to sequence
  correctOrder: number[]
  explanation?: string
}
```

**UI Component**: `DragDropSequencer`
- Draggable cards/blocks
- Drop zones with visual feedback
- Auto-check order on completion
- Mobile-friendly touch gestures

**Difficulty Progression**:
- **Easy**: 3 items (sentence fragments)
- **Medium**: 4-5 items (full sentences)
- **Hard**: 5-6 items (story events with conjunctions)

---

## 2. **Add Word Activities** (Lesson 4)

**Mentioned in PDF**:
- Lesson 4: "Add word activities"

**Description**:
Students build better sentences by adding describing words, adverbs, or prepositional phrases to basic sentences.

**Use Cases**:
- Add adjective: "The dog runs" → "The **big** dog runs"
- Add adverb: "The boy eats" → "The boy eats **slowly**"
- Add prepositional phrase: "The girl plays" → "The girl plays **in the park**"

**Implementation Requirements**:
```typescript
interface AddWordQuestion {
  type: 'add-word'
  prompt: string
  baseSentence: string       // "The dog runs"
  wordType: 'adjective' | 'adverb' | 'prepositional-phrase'
  options: string[]          // ["big", "small", "fast", "brown"]
  correctAnswers: string[]   // Multiple valid answers
  insertPosition: number     // Where to insert the word
  explanation?: string
}
```

**UI Component**: `SentenceExpander`
- Show base sentence with highlighted insertion point
- Word bank below (drag or tap)
- Preview sentence as user selects words
- Multiple correct answers supported

**Difficulty Progression**:
- **Easy**: Add simple adjectives (color, size)
- **Medium**: Add adverbs (how, when, where)
- **Hard**: Add multiple words (adjective + adverb + phrase)

---

## 3. **Picture-Word Matching** (Lesson 2)

**Mentioned in PDF**:
- Lesson 2: "Picture-word matching"

**Status**: Partially implemented as `picture-word-match`

**Enhancement Needed**:
- Current implementation is basic
- Need drag-and-drop interface
- Multiple pictures with multiple words
- Match 4-6 pairs

**Implementation Requirements**:
```typescript
interface PictureWordMatchQuestion {
  type: 'picture-word-match'
  prompt: string
  pairs: Array<{
    imageUrl: string
    word: string
    id: string
  }>
  explanation?: string
}
```

**UI Component**: `PictureWordMatcher`
- Grid layout: images on left, words on right
- Drag word to image or tap to connect
- Visual connections (lines)
- Check all pairs before submitting

---

## 4. **Choose Correct Word for Sentence** (Lesson 2)

**Mentioned in PDF**:
- Lesson 2: "Choose correct word for sentence"

**Description**:
Fill-in-the-blank with context clues. Students select the vocabulary word that best completes the sentence.

**Status**: Similar to `sentence-completion` but needs better implementation

**Implementation Requirements**:
```typescript
interface SentenceGapFillQuestion {
  type: 'sentence-gap-fill'
  prompt: string
  sentence: string           // "I feel ___ after playing outside."
  gapPosition: number        // Word index where gap appears
  options: string[]          // ["hungry", "tired", "happy", "sad"]
  correctAnswer: string
  explanation?: string
}
```

**UI Component**: `GapFillSelector`
- Sentence with visible blank/gap
- Options below as buttons
- Selected word fills gap with preview
- Context-based feedback

---

## 5. **Simple Comprehension Questions** (Lesson 3 & 5)

**Mentioned in PDF**:
- Lesson 3: "Answer 1 simple question"
- Lesson 5: "Answering simple questions"

**Description**:
Short reading passage followed by comprehension questions (Who/What/Where/When).

**Implementation Requirements**:
```typescript
interface ComprehensionQuestion {
  type: 'reading-comprehension'
  prompt: string             // "Read the story. Who is in the story?"
  passage: string            // 3-5 sentence story
  question: string           // "Who is in the story?"
  questionType: 'who' | 'what' | 'where' | 'when' | 'why' | 'how'
  options: string[]          // ["Ravi", "Meena", "The teacher", "The farmer"]
  correctAnswer: string
  explanation?: string
}
```

**UI Component**: `ReadingComprehensionCard`
- Passage displayed at top (scrollable)
- Question below with clear formatting
- MCQ options
- "Read again" button

**Difficulty Progression**:
- **Easy**: Literal recall (Who/What) - 1-2 sentences
- **Medium**: Connected recall (What happened) - 3-4 sentences
- **Hard**: Inference (Why/How) - 5-6 sentences, 2 related questions

---

## Priority Implementation Order

### Phase 1: High Priority (Core Learning Activities)
1. **Sentence Rearranging** - Essential for Lesson 4
2. **Story Sequencing** - Essential for Lesson 5
3. **Enhanced Picture-Word Matching** - Improved UI for Lesson 2

### Phase 2: Medium Priority (Skill Building)
4. **Add Word Activities** - Sentence expansion for Lesson 4
5. **Reading Comprehension** - Better implementation for Lessons 3 & 5

### Phase 3: Polish & Enhancement
6. **Gap Fill Improvements** - Better context handling
7. **Multi-step Questions** - Combine question types

---

## Technical Architecture

### New Question Types to Add
```typescript
// lib/types.ts
export type QuestionType =
  | 'multiple-choice'
  | 'word-match'
  | 'sentence-completion'
  | 'picture-word-match'
  | 'listen-and-select'
  | 'sentence-rearrange'      // NEW
  | 'story-sequence'          // NEW
  | 'add-word'                // NEW
  | 'sentence-gap-fill'       // NEW
  | 'reading-comprehension'   // NEW
```

### Component Structure
```
components/game/question-types/
├── MultipleChoice.tsx (existing)
├── SentenceRearrange.tsx (NEW)
├── StorySequence.tsx (NEW)
├── AddWordActivity.tsx (NEW)
├── PictureWordMatcher.tsx (NEW - enhanced)
├── SentenceGapFill.tsx (NEW)
└── ReadingComprehension.tsx (NEW)
```

### Drag-and-Drop Library
**Recommendation**: Use `@dnd-kit/core` for drag-and-drop
- Touch-friendly
- Accessible
- Performance optimized
- Works with React 18+

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## UX Considerations

### All Interactive Questions Must:
1. ✅ Work with touch (tablet-optimized)
2. ✅ Have clear visual feedback
3. ✅ Support TTS for instructions
4. ✅ Disable interactions during audio
5. ✅ Show progress indicators
6. ✅ Allow "undo" before submit
7. ✅ Provide immediate feedback
8. ✅ Include sound effects for actions

### Drag-and-Drop Specific:
- Large touch targets (≥48px)
- Visual "ghost" preview while dragging
- Drop zone highlighting
- Snap-to-grid for alignment
- Alternative: Tap to select, tap to place (for accessibility)

---

## Database Schema Updates

### Extend Question Structure
```sql
-- Add new question types to existing lessons table
-- No schema change needed, just use JSONB flexibility

-- Example question data:
{
  "type": "sentence-rearrange",
  "prompt": "Arrange the words to make a sentence",
  "scrambledItems": ["runs", "dog", "The", "fast"],
  "correctOrder": [2, 1, 0, 3],
  "explanation": "The sentence should start with 'The'"
}
```

---

## Testing Requirements

### For Each New Question Type:
1. **Unit Tests**:
   - Correct answer validation
   - Order checking logic
   - Edge cases (empty, single item, etc.)

2. **Integration Tests**:
   - Question rendering
   - Drag-and-drop functionality
   - Audio integration
   - State management

3. **Manual Testing**:
   - Tablet touch interactions
   - Audio timing
   - Visual feedback
   - Error states

---

## Estimated Implementation Time

### Phase 1 (Core):
- Sentence Rearrange: 8-10 hours
- Story Sequence: 6-8 hours
- Enhanced Picture Matching: 4-6 hours
**Total**: ~20-24 hours

### Phase 2 (Skill Building):
- Add Word Activities: 6-8 hours
- Reading Comprehension: 8-10 hours
**Total**: ~14-18 hours

### Phase 3 (Polish):
- Testing & refinement: 10-12 hours
- Content creation: 15-20 hours
**Total**: ~25-32 hours

**Grand Total**: 59-74 hours (~1.5-2 weeks of focused work)

---

## Next Steps

1. **User Confirmation**: Confirm priority and scope
2. **Install Dependencies**: Add `@dnd-kit` libraries
3. **Create Base Components**: Drag-drop infrastructure
4. **Implement Phase 1**: Core question types
5. **Content Creation**: Create questions for database
6. **Testing**: Comprehensive testing on tablets
7. **Deployment**: Gradual rollout per lesson

---

## Questions for User

1. Should we implement all types or prioritize specific lessons?
2. Do you have content ready for these question types or need help creating it?
3. What's the target timeline for rollout?
4. Should we test on specific tablet hardware first?

