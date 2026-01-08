# Rotation Sets - Quick Implementation Guide

## For Developers: How to Enable Rotation Logic

### Step 1: Update Lesson Engine

File: `lib/lessonEngine.ts`

Add this method to the `LessonEngine` class:

```typescript
/**
 * Selects the appropriate question set based on attempt number
 * @param block - The lesson block containing questions and rotation sets
 * @param attemptNumber - The student's attempt number for this lesson (1, 2, 3...)
 * @returns The selected question array
 */
private selectQuestions(block: LessonBlock, attemptNumber: number): Question[] {
  // Calculate rotation index: 0 = default, 1 = rotation set 1, 2 = rotation set 2
  const rotationIndex = (attemptNumber - 1) % 3

  // Check if lesson has rotation enabled and sets available
  if (!this.lessonContent.rotationEnabled || !block.rotationSets) {
    return block.questions
  }

  // Select based on rotation index
  if (rotationIndex === 0) {
    return block.questions  // Default set
  } else if (rotationIndex === 1 && block.rotationSets[0]) {
    return block.rotationSets[0]  // Rotation Set 1
  } else if (rotationIndex === 2 && block.rotationSets[1]) {
    return block.rotationSets[1]  // Rotation Set 2
  }

  // Fallback to default if rotation set missing
  console.warn(`Rotation set ${rotationIndex} not found for block ${block.blockNumber}, using default`)
  return block.questions
}
```

### Step 2: Modify Block Initialization

Update the `initializeBlock` method:

```typescript
private initializeBlock(blockNumber: number) {
  const block = this.lessonContent.blocks[blockNumber]
  if (!block) return

  // Get attempt number for this lesson
  const attemptNumber = this.getAttemptNumber()

  // Select appropriate question set based on attempt
  const questionSet = this.selectQuestions(block, attemptNumber)

  // Randomize questions in the selected set
  this.currentQuestions = this.shuffleArray([...questionSet])
  this.currentQuestionIndex = 0
  this.attemptState.currentBlock = blockNumber
  this.attemptState.mistakesInBlock = 0
}
```

### Step 3: Add Attempt Tracking

Add method to get attempt number:

```typescript
/**
 * Gets the attempt number for the current lesson
 * This should query the database to count previous attempts
 * @returns The current attempt number (1 for first attempt, 2 for second, etc.)
 */
private getAttemptNumber(): number {
  // TODO: Implement database query
  // For now, default to 1 (first attempt)
  // In production, query attempts table:
  //
  // const count = await supabase
  //   .from('attempts')
  //   .select('id', { count: 'exact', head: true })
  //   .eq('student_id', this.attemptState.studentId)
  //   .eq('lesson_id', this.attemptState.lessonId)
  //
  // return (count || 0) + 1

  return 1
}
```

### Step 4: Update Lesson Loading API

File: `app/api/student/lesson/[lessonId]/route.ts`

When fetching lesson for student, include attempt count:

```typescript
export async function GET(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('studentId')

  if (!studentId) {
    return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
  }

  // Get lesson content
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', params.lessonId)
    .single()

  if (lessonError || !lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  // Count previous attempts for this student and lesson
  const { count: attemptCount } = await supabase
    .from('attempts')
    .select('id', { count: 'exact', head: true })
    .eq('student_id', studentId)
    .eq('lesson_id', params.lessonId)

  // Current attempt number is count + 1
  const attemptNumber = (attemptCount || 0) + 1

  return NextResponse.json({
    lesson,
    attemptNumber,  // Include attempt number in response
  })
}
```

### Step 5: Update Frontend Lesson Page

File: `app/student/lesson/[lessonId]/page.tsx`

Pass attempt number to LessonEngine:

```typescript
useEffect(() => {
  async function loadLesson() {
    const session = getStudentSession()
    if (!session) return

    // Fetch lesson with attempt number
    const response = await fetch(
      `/api/student/lesson/${lessonId}?studentId=${session.studentId}`
    )
    const data = await response.json()

    if (data.lesson) {
      // Initialize lesson engine with attempt number
      const engine = new LessonEngine(
        data.lesson.content,
        session.studentId,
        lessonId,
        data.attemptNumber  // Pass attempt number
      )

      setLessonEngine(engine)
      setIsLoading(false)
    }
  }

  loadLesson()
}, [lessonId])
```

### Step 6: Update LessonEngine Constructor

File: `lib/lessonEngine.ts`

```typescript
export class LessonEngine {
  private lessonContent: LessonContent
  private attemptState: AttemptState
  private currentBlock: LessonBlock | null = null
  private currentQuestions: Question[] = []
  private currentQuestionIndex: number = 0
  private attemptNumber: number  // NEW: Store attempt number

  constructor(
    lessonContent: LessonContent,
    studentId: string,
    lessonId: string,
    attemptNumber: number = 1  // NEW: Accept attempt number
  ) {
    this.lessonContent = lessonContent
    this.attemptNumber = attemptNumber  // NEW: Store it

    // Initialize attempt state
    this.attemptState = {
      attemptId: crypto.randomUUID(),
      lessonId,
      currentBlock: 0,
      mistakesInBlock: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      blocksCompleted: 0,
      responses: [],
    }

    // Initialize first block
    this.initializeBlock(0)
  }

  // Update getAttemptNumber to use stored value
  private getAttemptNumber(): number {
    return this.attemptNumber
  }
}
```

## Testing Rotation Logic

### Manual Testing

1. **First Attempt:**
   ```bash
   # Student takes lesson for first time
   # Should see default questions (basket, window, paper, teacher)
   ```

2. **Second Attempt:**
   ```bash
   # Student retakes same lesson
   # Should see rotation set 1 (water, mother, table, doctor)
   ```

3. **Third Attempt:**
   ```bash
   # Student retakes again
   # Should see rotation set 2 (happy, rabbit, pencil, yellow)
   ```

4. **Fourth Attempt:**
   ```bash
   # Student retakes once more
   # Should cycle back to default questions
   ```

### Automated Testing

```typescript
describe('LessonEngine Rotation Logic', () => {
  const mockLessonContent = {
    title: 'Test Lesson',
    description: 'Test',
    rotationEnabled: true,
    blocks: [
      {
        blockNumber: 0,
        questions: [
          { id: 'q1', prompt: 'Default Q1', /* ... */ },
          { id: 'q2', prompt: 'Default Q2', /* ... */ },
        ],
        rotationSets: [
          [
            { id: 'r1q1', prompt: 'Rotation1 Q1', /* ... */ },
            { id: 'r1q2', prompt: 'Rotation1 Q2', /* ... */ },
          ],
          [
            { id: 'r2q1', prompt: 'Rotation2 Q1', /* ... */ },
            { id: 'r2q2', prompt: 'Rotation2 Q2', /* ... */ },
          ],
        ],
      },
    ],
  }

  it('should use default questions on attempt 1', () => {
    const engine = new LessonEngine(mockLessonContent, 'student1', 'lesson1', 1)
    const question = engine.getCurrentQuestion()
    expect(question?.id).toBe('q1')
  })

  it('should use rotation set 1 on attempt 2', () => {
    const engine = new LessonEngine(mockLessonContent, 'student1', 'lesson1', 2)
    const question = engine.getCurrentQuestion()
    expect(question?.id).toBe('r1q1')
  })

  it('should use rotation set 2 on attempt 3', () => {
    const engine = new LessonEngine(mockLessonContent, 'student1', 'lesson1', 3)
    const question = engine.getCurrentQuestion()
    expect(question?.id).toBe('r2q1')
  })

  it('should cycle back to default on attempt 4', () => {
    const engine = new LessonEngine(mockLessonContent, 'student1', 'lesson1', 4)
    const question = engine.getCurrentQuestion()
    expect(question?.id).toBe('q1')
  })
})
```

## Database Updates

### Update Lessons Table

```bash
# Run the updated seed file
psql -U your_username -d your_database_name < seed-lessons-grade4.sql
```

Or in Supabase Dashboard:
1. Go to SQL Editor
2. Paste contents of `seed-lessons-grade4.sql`
3. Run query

### Verify Rotation Data

```sql
-- Check that rotation sets exist
SELECT
  id,
  title,
  content->'rotationEnabled' as rotation_enabled,
  jsonb_array_length(content->'blocks') as block_count,
  content->'blocks'->0->'rotationSets' IS NOT NULL as has_rotation_sets
FROM lessons
WHERE grade = 4;

-- Should show:
-- rotationEnabled: true
-- block_count: 3
-- has_rotation_sets: true
```

## Debugging Tips

### Check Question IDs

Add logging to verify correct set is selected:

```typescript
private selectQuestions(block: LessonBlock, attemptNumber: number): Question[] {
  const rotationIndex = (attemptNumber - 1) % 3

  console.log(`[Rotation Debug] Attempt ${attemptNumber}, Index ${rotationIndex}`)

  if (rotationIndex === 0) {
    console.log(`[Rotation Debug] Using DEFAULT set`)
    console.log(`[Rotation Debug] Question IDs:`, block.questions.map(q => q.id))
    return block.questions
  } else if (rotationIndex === 1) {
    console.log(`[Rotation Debug] Using ROTATION SET 1`)
    console.log(`[Rotation Debug] Question IDs:`, block.rotationSets![0].map(q => q.id))
    return block.rotationSets![0]
  } else {
    console.log(`[Rotation Debug] Using ROTATION SET 2`)
    console.log(`[Rotation Debug] Question IDs:`, block.rotationSets![1].map(q => q.id))
    return block.rotationSets![1]
  }
}
```

### Verify Attempt Count

```typescript
// In API route
console.log(`Student ${studentId} attempt count for lesson ${lessonId}:`, attemptCount)
console.log(`This is attempt number:`, attemptNumber)
```

### Check Lesson Content

```typescript
// Verify rotation sets loaded
console.log('Lesson has rotationEnabled:', lessonContent.rotationEnabled)
console.log('Block 0 has rotation sets:', !!lessonContent.blocks[0].rotationSets)
console.log('Rotation set 1 length:', lessonContent.blocks[0].rotationSets?.[0]?.length)
console.log('Rotation set 2 length:', lessonContent.blocks[0].rotationSets?.[1]?.length)
```

## Rollback Plan

If issues arise, rollback to original seed file:

```bash
# Restore backup
cp seed-lessons-grade4-backup.sql seed-lessons-grade4.sql

# Revert database
psql -U your_username -d your_database_name < seed-lessons-grade4-backup.sql

# Revert types
git checkout lib/types.ts
```

## Performance Considerations

### Database Query Optimization

```sql
-- Add index for fast attempt counting
CREATE INDEX IF NOT EXISTS idx_attempts_student_lesson
ON attempts(student_id, lesson_id);

-- Add index for lesson lookup
CREATE INDEX IF NOT EXISTS idx_lessons_grade_order
ON lessons(grade, "order");
```

### Caching Strategy

```typescript
// Cache attempt count in session to avoid repeated queries
const attemptCache = new Map<string, number>()

function getAttemptNumber(studentId: string, lessonId: string): number {
  const cacheKey = `${studentId}:${lessonId}`

  if (attemptCache.has(cacheKey)) {
    return attemptCache.get(cacheKey)!
  }

  // Query database
  const count = queryAttemptCount(studentId, lessonId)
  const attemptNumber = count + 1

  // Cache for session
  attemptCache.set(cacheKey, attemptNumber)

  return attemptNumber
}
```

## Questions?

- **Pedagogy:** See [ROTATION-SETS-PEDAGOGY.md](./ROTATION-SETS-PEDAGOGY.md)
- **Overview:** See [ROTATION-SETS-README.md](./ROTATION-SETS-README.md)
- **Curriculum:** Reference PDF in `assets/` folder

---

**Last Updated:** 2026-01-08
**Implementation Status:** ⏳ Awaiting lesson engine integration
