# Lesson Abandon Status - Complete Documentation

## Overview
The app tracks when students exit a lesson without completing it, marking these attempts as "abandoned" in the database.

## Database Schema

### Table: `attempts`
```sql
-- Abandon tracking columns
is_abandoned BOOLEAN DEFAULT FALSE
abandoned_at TIMESTAMPTZ

-- Index for querying abandoned attempts
CREATE INDEX idx_attempts_abandoned ON attempts(is_abandoned) WHERE is_abandoned = TRUE;
```

## How It Works

### 1. Lesson Start
When a student starts a lesson:
- A new attempt is created in the database
- `is_abandoned` = FALSE (default)
- `abandoned_at` = NULL

### 2. During Lesson
Two scenarios can mark a lesson as abandoned:

#### A. Browser Close/Refresh (Automatic)
**File**: [app/student/lesson/[lessonId]/page.tsx:60-85](app/student/lesson/[lessonId]/page.tsx#L60-L85)

```typescript
// Listens for beforeunload event (tab close, browser close, refresh)
useEffect(() => {
  const handleBeforeUnload = () => {
    if (engine) {
      const attemptState = engine.getAttemptState()
      // Only mark as abandoned if lesson is not complete
      if (attemptState && !attemptState.levelsCompleted) {
        queue.add({
          type: 'attempt',
          data: {
            attemptId: attemptState.attemptId,
            isAbandoned: true,
            abandonedAt: new Date().toISOString(),
            ...attemptState,
          },
        })
      }
    }
  }
  
  window.addEventListener('beforeunload', handleBeforeUnload)
  return () => window.removeEventListener('beforeunload', handleBeforeUnload)
}, [engine])
```

**Triggers**:
- Closing browser tab
- Closing browser window
- Refreshing the page
- Navigating away from the page

#### B. Manual Exit (Button Click)
**File**: [app/student/lesson/[lessonId]/page.tsx:357-390](app/student/lesson/[lessonId]/page.tsx#L357-L390)

```typescript
const handleAbandonLesson = useCallback(async () => {
  if (!engine) return

  // Stop all audio playback
  audioQueue.stopAll()

  const attemptState = engine.getAttemptState()

  // Mark attempt as abandoned
  queue.add({
    type: 'attempt',
    data: {
      attemptId: attemptState.attemptId,
      isAbandoned: true,
      abandonedAt: new Date().toISOString(),
      ...attemptState,
    },
  })

  // Sync if online
  if (navigator.onLine) {
    await queue.sync(async (item) => {
      await fetch('/api/student/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
    })
  }

  // Clear attempt state
  AttemptStateManager.remove(attemptState.attemptId)
}, [engine])
```

**Triggers**:
- Exit/back button in the lesson interface
- Navigation to dashboard without completing

### 3. Data Sync
**File**: [app/api/student/sync/route.ts:24-55](app/api/student/sync/route.ts#L24-L55)

```typescript
// Update attempt with abandon status
if (isAbandoned) {
  updateData.is_abandoned = true
  updateData.abandoned_at = abandonedAt
}

await supabase
  .from('attempts')
  .update(updateData)
  .eq('id', attemptId)
```

### 4. Display in Teacher Dashboard
**File**: [app/teacher/student/[studentId]/page.tsx:402](app/teacher/student/[studentId]/page.tsx#L402)

```typescript
const isAbandoned = !!(attempt as any).is_abandoned

// Used to display status badge or filter abandoned attempts
```

## Data Flow

```
Student Action → Frontend Detection → Offline Queue → Sync API → Database
                                         ↓
                                   Local Storage
                                   (if offline)
```

### Detailed Flow:

1. **Detection**: 
   - `beforeunload` event OR `handleAbandonLesson()` called
   
2. **Queue**: 
   - Attempt data added to `OfflineQueue`
   - Includes: `isAbandoned: true`, `abandonedAt: timestamp`
   
3. **Sync**:
   - If online: immediately syncs to `/api/student/sync`
   - If offline: stored in localStorage, syncs when back online
   
4. **Database Update**:
   - `is_abandoned` set to TRUE
   - `abandoned_at` set to timestamp
   - Other attempt data (questions_attempted, etc.) also saved

## Important Notes

### Completion Takes Priority
```typescript
// Only mark as abandoned if lesson is NOT complete
if (attemptState && !attemptState.levelsCompleted) {
  // Mark as abandoned
}
```

If a student completes the lesson, it's NOT marked as abandoned, even if they close the browser immediately after.

### Offline Support
- Abandon status is queued locally if offline
- Will sync when connection is restored
- Uses `OfflineQueue` class in [lib/offlineQueue.ts](lib/offlineQueue.ts)

### Performance Data Preserved
When marking as abandoned, the system still saves:
- `questions_attempted`
- `questions_correct`  
- `blocks_completed`
- `blocks_stopped_at`

This allows teachers to see what the student accomplished before exiting.

## Teacher Dashboard Usage

Teachers can:
- See if an attempt was abandoned (`is_abandoned` flag)
- View when it was abandoned (`abandoned_at` timestamp)
- Still see partial progress (questions answered, levels completed)
- Filter or highlight abandoned attempts

## Related Files

1. **Frontend Detection**:
   - [app/student/lesson/[lessonId]/page.tsx](app/student/lesson/[lessonId]/page.tsx)

2. **Data Storage**:
   - [lib/offlineQueue.ts](lib/offlineQueue.ts)
   - [lib/types.ts](lib/types.ts) (AttemptState interface)

3. **Sync API**:
   - [app/api/student/sync/route.ts](app/api/student/sync/route.ts)

4. **Teacher View**:
   - [app/teacher/student/[studentId]/page.tsx](app/teacher/student/[studentId]/page.tsx)

5. **Database Migration**:
   - [add-abandoned-status.sql](add-abandoned-status.sql)

## Example Scenarios

### Scenario 1: Student Closes Browser
1. Student is on question 3 of level 1
2. Student closes browser tab
3. `beforeunload` event fires
4. Attempt marked as abandoned with current progress
5. Data queued and synced

### Scenario 2: Student Completes Lesson
1. Student answers all questions
2. Lesson marked as complete
3. Student closes browser
4. NOT marked as abandoned (lesson complete)

### Scenario 3: Offline Abandon
1. Student loses internet connection
2. Student clicks exit button
3. Abandon status stored in localStorage
4. When online again, data syncs to database

## Debugging

### Check if abandon tracking is working:

```sql
-- Query recent abandoned attempts
SELECT 
  id,
  student_id,
  lesson_id,
  is_abandoned,
  abandoned_at,
  questions_attempted,
  started_at
FROM attempts
WHERE is_abandoned = TRUE
ORDER BY abandoned_at DESC
LIMIT 10;
```

### Check offline queue:

```javascript
// In browser console
const queue = JSON.parse(localStorage.getItem('pal_offline_queue'))
console.log(queue) // Should show queued abandon events
```
