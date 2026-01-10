# Phase 2: Badge Infrastructure - COMPLETE

**Date Completed**: 2026-01-11
**Status**: ✅ INFRASTRUCTURE READY
**Build Status**: ✅ Passing (no errors)

---

## What Was Implemented

### 1. Badge Service ([lib/badgeService.ts](lib/badgeService.ts))

Comprehensive badge logic with all necessary functions:

**Functions**:
- `calculateStudentStats(studentId)` - Aggregate statistics from attempts table
- `updateStudentStats(studentId)` - Upsert stats to student_stats table
- `evaluateBadgeCriteria(studentId)` - Check which badges student has earned
- `awardBadges(studentId, badges)` - Award badges (idempotent)
- `getStudentBadges(studentId)` - Fetch all earned badges
- `getAdditionalBadgeData(studentId)` - Helper for perfect attempts, quick completions

**Badge Criteria Logic**:
```typescript
{
  'first-steps': (stats) => stats.total_lessons_completed >= 1,
  'week-warrior': (stats) => stats.current_streak_days >= 7,  // DEFERRED
  'perfect-practice': (stats, data) => data?.hasPerfectAttempt === true,
  'bookworm': (stats) => stats.total_lessons_completed >= 5,
  'century': (stats) => stats.total_questions_correct >= 100,
  'dedicated-learner': (stats) => stats.current_streak_days >= 30,  // DEFERRED
  'master-student': (stats, data) => stats.total_lessons_completed >= data?.totalLessons,
  'quick-learner': (stats, data) => data?.hasQuickCompletion === true,
}
```

### 2. Type Definitions ([lib/types.ts](lib/types.ts))

**Added interfaces**:

```typescript
interface Badge {
  id: string
  name: string
  description: string
  icon: string // emoji
  imageUrl: string // path to illustration
  criteria: {
    type: string
    value: number
  }
  earned_at?: string
}

interface StudentStats {
  id: string
  student_id: string
  total_questions_answered: number
  total_questions_correct: number
  total_lessons_completed: number
  total_levels_completed: number
  current_streak_days: number
  longest_streak_days: number
  last_practice_date: string | null
  created_at: string
  updated_at: string
}

interface BadgeUnlockEvent {
  badge: Badge
  isNew: boolean
}
```

### 3. Badge API Endpoints

#### GET /api/student/badges
**File**: [app/api/student/badges/route.ts](app/api/student/badges/route.ts)

**Query**: `?studentId=X`
**Returns**: `{ badges: Badge[] }`
**Use**: Load earned badges for dashboard display

```typescript
GET /api/student/badges?studentId=abc123
// Response: { badges: [{ id, name, description, icon, imageUrl, earned_at }] }
```

#### POST /api/student/badges/check
**File**: [app/api/student/badges/check/route.ts](app/api/student/badges/check/route.ts)

**Body**: `{ studentId: string }`
**Returns**: `{ newBadges: Badge[] }`
**Use**: Check and award new badges after lesson completion

**Flow**:
1. Update student stats from attempts table
2. Evaluate badge criteria against current stats
3. Award any newly earned badges
4. Return list of new badges

### 4. Badge Unlocked Modal ([components/game/BadgeUnlockedModal.tsx](components/game/BadgeUnlockedModal.tsx))

**Features**:
- Gradient background (secondary-50 to white)
- Badge illustration (256×256px) with emoji fallback
- Spring animation on mount (scale 0 → 1)
- Badge name and description
- "Awesome!" button to dismiss
- Plays LEVEL_COMPLETE sound effect

**Fallback Handling**:
```typescript
onError={(e) => {
  // Falls back to emoji if image fails to load
  target.parentElement.innerHTML = `<div class="text-8xl">${badge.icon}</div>`
}}
```

### 5. Database Schema Updates

**File**: [schemas/future/rewards-schema.sql](schemas/future/rewards-schema.sql)

**Fixed**: `total_blocks_completed` → `total_levels_completed`

**Tables to Create** (Run in Supabase SQL Editor):

```sql
-- Student Statistics
CREATE TABLE IF NOT EXISTS student_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) UNIQUE NOT NULL,
  total_questions_answered INTEGER DEFAULT 0,
  total_questions_correct INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  total_levels_completed INTEGER DEFAULT 0,
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  last_practice_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badge Definitions
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  criteria JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Badges
CREATE TABLE IF NOT EXISTS student_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) NOT NULL,
  badge_id UUID REFERENCES badges(id) NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

-- 8 Default Badges Inserted
```

---

## 8 Badges Defined

| Badge | Icon | Description | Criteria | Status |
|-------|------|-------------|----------|--------|
| First Steps | 🌟 | Complete your first lesson | 1 lesson | ✅ Ready |
| Week Warrior | 🔥 | Practice for 7 days in a row | 7-day streak | ⚠️ Deferred |
| Perfect Practice | 🎯 | Get 100% accuracy on any lesson | Perfect attempt | ✅ Ready |
| Bookworm | 📚 | Complete 5 lessons | 5 lessons | ✅ Ready |
| Century | 💯 | Answer 100 questions correctly | 100 correct | ✅ Ready |
| Dedicated Learner | ⭐ | Practice for 30 days in a row | 30-day streak | ⚠️ Deferred |
| Master Student | 👑 | Complete all lessons | All lessons | ✅ Ready |
| Quick Learner | ⚡ | Complete a lesson in under 10 minutes | < 600 seconds | ✅ Ready |

**Note**: 6 of 8 badges are immediately functional. Streak badges require additional implementation.

---

## Badge Illustrations

**Location**: `public/badges/`
**Status**: ⚠️ NOT YET SOURCED

**Required Files** (256×256px PNG):
1. `first-steps.png`
2. `week-warrior.png`
3. `perfect-practice.png`
4. `bookworm.png`
5. `century.png`
6. `dedicated-learner.png`
7. `master-student.png`
8. `quick-learner.png`

**Fallback**: If images don't exist, system automatically uses emoji versions

**Sources** (listed in `public/badges/README.md`):
- Flaticon.com
- game-icons.net
- OpenGameArt.org
- Icons8.com
- Canva

---

## How It Works

### Badge Checking Flow:

```
Student completes lesson
        ↓
Sync attempt data (duration, score)
        ↓
Call POST /api/student/badges/check
        ↓
1. Update student_stats from attempts
2. Evaluate badge criteria
3. Award new badges (if any)
        ↓
Return newBadges array
        ↓
Show badge modals sequentially
        ↓
Continue to lesson complete modal
```

### Badge Criteria Evaluation:

**Perfect Practice Example**:
```typescript
// Check if student has any attempt with 100% accuracy
const { data } = await supabase
  .from('attempts')
  .select('questions_attempted, questions_correct')
  .eq('student_id', studentId)
  .eq('is_abandoned', false)

const hasPerfectAttempt = data?.some(a =>
  a.questions_attempted > 0 &&
  a.questions_attempted === a.questions_correct
)
```

**Quick Learner Example**:
```typescript
// Check if student has any lesson completed in < 10 minutes
const { data } = await supabase
  .from('attempts')
  .select('duration_seconds')
  .eq('student_id', studentId)
  .lt('duration_seconds', 600)  // 10 minutes = 600 seconds

const hasQuickCompletion = (data?.length || 0) > 0
```

---

## Database Migration Required

Before Phase 3 integration, run this in Supabase SQL Editor:

```bash
# Copy and run the entire file:
schemas/future/rewards-schema.sql
```

This will:
- ✅ Create `student_stats` table
- ✅ Create `badges` table
- ✅ Create `student_badges` table
- ✅ Insert 8 default badges
- ✅ Enable RLS policies
- ✅ Create indexes

---

## Testing Status

### ✅ Build Testing:
```bash
npm run build
# Result: ✓ Compiled successfully
# New API routes visible:
# - /api/student/badges
# - /api/student/badges/check
```

### ⏳ Pending Integration Testing:
- Cannot test until database tables are created
- Cannot test until Phase 3 integration (badge checking in lesson flow)
- Cannot test badge unlocking until illustrations are sourced

---

## Deferred Features

### Streak Tracking (Week Warrior & Dedicated Learner)

**Why Deferred**:
- Requires daily login tracking
- Needs `last_practice_date` comparison logic
- May need cron job or edge function for daily checks

**Future Implementation**:
```typescript
// On each lesson completion:
const today = new Date().toISOString().split('T')[0]
const lastDate = stats.last_practice_date

if (lastDate) {
  const daysSince = calculateDaysDifference(lastDate, today)

  if (daysSince === 1) {
    // Continue streak
    stats.current_streak_days += 1
    stats.longest_streak_days = Math.max(
      stats.longest_streak_days,
      stats.current_streak_days
    )
  } else if (daysSince > 1) {
    // Streak broken
    stats.current_streak_days = 1
  }
}

stats.last_practice_date = today
```

---

## Files Changed

### Created (5 files):
1. `lib/badgeService.ts` - Badge logic and database operations
2. `app/api/student/badges/route.ts` - GET badges endpoint
3. `app/api/student/badges/check/route.ts` - POST check endpoint
4. `components/game/BadgeUnlockedModal.tsx` - Badge unlock UI
5. `public/badges/README.md` - Badge illustration requirements

### Modified (2 files):
1. `lib/types.ts` - Added Badge, StudentStats, BadgeUnlockEvent interfaces
2. `schemas/future/rewards-schema.sql` - Fixed blocks→levels terminology

---

## Next Steps: Phase 3 (Integration)

### Prerequisites:
1. ✅ Phase 2 infrastructure complete
2. ❌ Run database migration (rewards-schema.sql)
3. ⚠️ Source badge illustrations (optional, has emoji fallback)

### Phase 3 Tasks:
1. Integrate badge checking in lesson completion flow
2. Add badge state management to lesson page
3. Show badge modals sequentially (before lesson complete modal)
4. Update student dashboard to display earned badges
5. Add "🏆 X Badges Earned" card to dashboard
6. Test badge awarding for all 6 active badges
7. Test offline badge awarding (sync on next online)
8. End-to-end testing

### Estimated Time:
- Badge integration in lesson: 1-2 hours
- Dashboard badge display: 30 minutes
- Testing: 1 hour
- **Total**: 2-3 hours

---

## References

- **Implementation Plan**: [GAMIFICATION_IMPLEMENTATION_PLAN.md](GAMIFICATION_IMPLEMENTATION_PLAN.md)
- **Phase 1 Summary**: [PHASE_1_COMPLETION_SUMMARY.md](PHASE_1_COMPLETION_SUMMARY.md)
- **Design System**: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- **Database Schema**: [schemas/future/rewards-schema.sql](schemas/future/rewards-schema.sql)

---

**Phase 2 Status**: ✅ INFRASTRUCTURE COMPLETE

**Phase 3 Status**: 🚀 READY TO BEGIN (after database migration)

**Note**: Badge illustrations are optional at this stage. The system will fall back to emojis if images don't exist, so Phase 3 can begin immediately after running the database migration.
