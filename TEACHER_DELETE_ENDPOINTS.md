# Teacher Delete Endpoints Documentation

This document describes all the delete endpoints available for teachers to manage their classes, students, lessons, and student attempts.

## Overview

All delete endpoints are located under `/app/api/teacher/` and follow a consistent pattern:
- Use HTTP DELETE method
- Accept resource ID via URL parameters
- Cascade deletion to all related data
- Return JSON response with success status

## Authentication

Currently, the endpoints use client-side session management via `localStorage` with the key `'pal_teacher_session'`. No server-side authentication is enforced.

**Note**: Consider adding proper authentication and authorization checks before deploying to production.

## Endpoints

### 1. Delete Class

**Endpoint**: `DELETE /api/teacher/class/[classId]`

**File**: [app/api/teacher/class/[classId]/route.ts](app/api/teacher/class/[classId]/route.ts)

**Description**: Deletes a class and all associated data including students, attempts, responses, and lesson unlocks.

**Cascade Order**:
1. Responses (for all student attempts)
2. Attempts (for all students)
3. Lesson unlocks (for the class)
4. Students (in the class)
5. Class

**Request Example**:
```typescript
const response = await fetch(`/api/teacher/class/${classId}`, {
  method: 'DELETE',
})

const result = await response.json()
```

**Success Response**:
```json
{
  "success": true,
  "message": "Class and all related data deleted successfully"
}
```

**Error Response**:
```json
{
  "error": "Failed to delete class"
}
```

**Status Codes**:
- `200`: Success
- `400`: Missing class ID
- `500`: Server error

---

### 2. Delete Student

**Endpoint**: `DELETE /api/teacher/student/[studentId]`

**File**: [app/api/teacher/student/[studentId]/route.ts](app/api/teacher/student/[studentId]/route.ts)

**Description**: Deletes a student and all their attempts and responses.

**Cascade Order**:
1. Responses (for all student attempts)
2. Attempts (for the student)
3. Student

**Request Example**:
```typescript
const response = await fetch(`/api/teacher/student/${studentId}`, {
  method: 'DELETE',
})

const result = await response.json()
```

**Success Response**:
```json
{
  "success": true,
  "message": "Student and all related data deleted successfully"
}
```

**Error Response**:
```json
{
  "error": "Failed to delete student"
}
```

**Status Codes**:
- `200`: Success
- `400`: Missing student ID
- `500`: Server error

---

### 3. Delete Student Attempt

**Endpoint**: `DELETE /api/teacher/attempt/[attemptId]`

**File**: [app/api/teacher/attempt/[attemptId]/route.ts](app/api/teacher/attempt/[attemptId]/route.ts)

**Description**: Deletes a specific student attempt and all its responses.

**Cascade Order**:
1. Responses (for the attempt)
2. Attempt

**Request Example**:
```typescript
const response = await fetch(`/api/teacher/attempt/${attemptId}`, {
  method: 'DELETE',
})

const result = await response.json()
```

**Success Response**:
```json
{
  "success": true,
  "message": "Attempt deleted successfully"
}
```

**Error Response**:
```json
{
  "error": "Failed to delete attempt"
}
```

**Status Codes**:
- `200`: Success
- `400`: Missing attempt ID
- `500`: Server error

---

### 4. Delete Lesson

**Endpoint**: `DELETE /api/teacher/lesson/[lessonId]`

**File**: [app/api/teacher/lesson/[lessonId]/route.ts](app/api/teacher/lesson/[lessonId]/route.ts)

**Description**: Deletes a lesson and all associated data including attempts, responses, and lesson unlocks across all classes.

**Warning**: This will affect all classes that use this lesson. Use with caution.

**Cascade Order**:
1. Responses (for all attempts of this lesson)
2. Attempts (for this lesson)
3. Lesson unlocks (for this lesson in all classes)
4. Lesson

**Request Example**:
```typescript
const response = await fetch(`/api/teacher/lesson/${lessonId}`, {
  method: 'DELETE',
})

const result = await response.json()
```

**Success Response**:
```json
{
  "success": true,
  "message": "Lesson and all related data deleted successfully"
}
```

**Error Response**:
```json
{
  "error": "Failed to delete lesson"
}
```

**Status Codes**:
- `200`: Success
- `400`: Missing lesson ID
- `500`: Server error

---

## Database Schema

### Relationships

```
teachers
  ↓ (teacher_id)
classes
  ↓ (class_id)
students
  ↓ (student_id)
attempts ← (lesson_id) lessons
  ↓ (attempt_id)
responses

lesson_unlocks
  ↓ (class_id, lesson_id)
classes, lessons
```

### Cascade Constraints

All foreign key relationships use `ON DELETE CASCADE`:
- `classes.teacher_id` → `teachers.id`
- `students.class_id` → `classes.id`
- `attempts.student_id` → `students.id`
- `attempts.lesson_id` → `lessons.id`
- `responses.attempt_id` → `attempts.id`
- `lesson_unlocks.class_id` → `classes.id`
- `lesson_unlocks.lesson_id` → `lessons.id`

---

## Frontend Integration Examples

### React/Next.js Component Example

```typescript
'use client'

import { useState } from 'react'

export function DeleteClassButton({ classId }: { classId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure? This will delete all students and their progress.')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/teacher/class/${classId}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        alert('Class deleted successfully')
        // Redirect or refresh
        window.location.href = '/teacher/dashboard'
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete class')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete Class'}
    </button>
  )
}
```

### Similar patterns for other resources

```typescript
// Delete student
await fetch(`/api/teacher/student/${studentId}`, { method: 'DELETE' })

// Delete attempt
await fetch(`/api/teacher/attempt/${attemptId}`, { method: 'DELETE' })

// Delete lesson
await fetch(`/api/teacher/lesson/${lessonId}`, { method: 'DELETE' })
```

---

## Security Considerations

### Current Implementation

The current implementation has minimal security:
- No server-side authentication verification
- No ownership validation (teachers could delete others' resources)
- Client-side session management only

### Recommended Improvements

1. **Add Server-Side Authentication**:
```typescript
// Add to each endpoint
import { createServerClient } from '@/lib/supabase'

export async function DELETE(request: NextRequest, { params }) {
  const supabase = createServerClient()

  // Get authenticated user
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify ownership
  const { data: resource } = await supabase
    .from('classes') // or students, lessons, etc.
    .select('teacher_id')
    .eq('id', resourceId)
    .single()

  if (resource?.teacher_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Proceed with deletion...
}
```

2. **Enable Row Level Security (RLS)**:
```sql
-- Add proper RLS policies in Supabase
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can delete own classes"
  ON classes FOR DELETE
  USING (auth.uid()::text = teacher_id::text);
```

3. **Add Soft Deletes** (optional):
```sql
-- Instead of hard deletes, mark as deleted
ALTER TABLE classes ADD COLUMN deleted_at TIMESTAMPTZ;

-- Update endpoints to use soft delete
UPDATE classes SET deleted_at = NOW() WHERE id = classId;
```

---

## Testing

### Manual Testing with cURL

```bash
# Delete a class
curl -X DELETE http://localhost:3000/api/teacher/class/[classId]

# Delete a student
curl -X DELETE http://localhost:3000/api/teacher/student/[studentId]

# Delete an attempt
curl -X DELETE http://localhost:3000/api/teacher/attempt/[attemptId]

# Delete a lesson
curl -X DELETE http://localhost:3000/api/teacher/lesson/[lessonId]
```

### Unit Test Example

```typescript
import { DELETE } from '@/app/api/teacher/class/[classId]/route'
import { NextRequest } from 'next/server'

describe('DELETE /api/teacher/class/[classId]', () => {
  it('should delete a class and return success', async () => {
    const classId = 'test-class-id'
    const request = new NextRequest(`http://localhost/api/teacher/class/${classId}`)
    const params = { classId }

    const response = await DELETE(request, { params })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('deleted successfully')
  })

  it('should return 400 if classId is missing', async () => {
    const request = new NextRequest('http://localhost/api/teacher/class/')
    const params = { classId: '' }

    const response = await DELETE(request, { params })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Class ID is required')
  })
})
```

---

## Troubleshooting

### Common Issues

1. **"Class ID is required" Error**
   - Ensure the URL includes the resource ID
   - Check that the dynamic route parameter matches the file structure

2. **500 Internal Server Error**
   - Check Supabase connection
   - Verify database permissions
   - Review server logs for detailed error messages

3. **Cascade Deletion Not Working**
   - Verify foreign key constraints are set with `ON DELETE CASCADE`
   - Check database schema with: `SELECT * FROM information_schema.table_constraints`

4. **TypeScript Errors**
   - Ensure type annotations for mapped arrays: `.map((item: { id: string }) => item.id)`
   - Check that `@/lib/supabase` exports are properly typed

---

## Migration Notes

All endpoints were created/updated on 2026-01-10:
- Fixed TypeScript type inference issues in mapping operations
- Added explicit type annotations for Supabase query results
- Verified build passes with `npm run build`

---

## References

- **Database Schema**: [supabase-schema.sql](supabase-schema.sql)
- **Database Types**: [lib/database.types.ts](lib/database.types.ts)
- **Supabase Client**: [lib/supabase.ts](lib/supabase.ts)
- **Teacher Session**: [lib/teacherSession.ts](lib/teacherSession.ts)
