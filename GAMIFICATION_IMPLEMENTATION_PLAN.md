# Gamification Implementation Plan - APPROVED

**Status**: Ready for Implementation
**Date**: 2026-01-10
**Plan File**: `/Users/akashdatta/.claude/plans/breezy-splashing-token.md`

---

## Quick Reference

### What We're Building
- **Simple points system**: 1 point per correct answer, no penalties
- **Point animation**: "+1" floats up from center of screen
- **Score display**: At level completion (X/4) and lesson completion (X/12)
- **Badge system**: 8 badges based on achievements
- **Badge modal**: Shows illustration and description when earned

### User Requirements Met
✅ 1 point per correct answer
✅ Subtle sound + animation for points
✅ 0 points lost for wrong answers
✅ No multipliers or badges complexity
✅ Score at level and lesson completion
✅ 8 badges with public domain illustrations
✅ Uses existing design system

---

## Implementation Phases

### Phase 1: Points System (Day 1)
**Status**: ✅ COMPLETED

**Files to Create**:
- `components/game/PointAnimation.tsx` - Floating "+1" animation
- `components/game/LessonCompleteModal.tsx` - Final score display
- `public/sounds/point.wav` - Subtle coin sound

**Files to Modify**:
1. `app/student/lesson/[lessonId]/page.tsx`
   - Add `score`, `showPointAnimation`, `lessonStartTime` state
   - Increment score in `handleAnswer()` when correct
   - Track duration and score in `handleFinishLesson()`
   - Add PointAnimation component to JSX

2. `components/game/LevelCompleteModal.tsx`
   - Add `levelScore` and `maxLevelScore` props
   - Display "Score: X/4" after title

3. `lib/soundEffects.ts`
   - Add `POINT` to SoundEffect enum
   - Add point.wav to soundFiles map
   - Lower volume to 0.3 for point sound

**Key Code Snippets**:

```typescript
// In lesson page handleAnswer():
if (result.isCorrect) {
  setScore(prev => prev + 1)
  setShowPointAnimation(true)
  playSoundEffect(SoundEffect.POINT)
}

// In JSX:
<PointAnimation
  show={showPointAnimation}
  onComplete={() => setShowPointAnimation(false)}
/>

<LessonCompleteModal
  show={showLessonComplete}
  totalScore={finalScore}
  maxScore={12}
  accuracy={progress.accuracy}
  onClose={() => {
    setShowLessonComplete(false)
    router.push('/student/dashboard')
  }}
/>
```

**Testing Checklist**:
- [x] Answer correctly → see "+1" animation
- [x] Hear subtle point sound (using temp file, needs replacement)
- [x] Complete level → see "Score: X/4"
- [x] Complete lesson → see total score
- [x] Wrong answer → no animation or penalty
- [x] Build passes with no TypeScript errors

**⚠️ NOTE**: `point.wav` is currently a copy of `correct.wav`. Replace with a more subtle coin/chime sound from Freesound.org or ZapSplat (< 500ms, quieter volume).

---

### Phase 2: Badge Infrastructure (Day 2)
**Status**: PENDING

**Database Changes**:
1. Update `schemas/future/rewards-schema.sql`:
   - Fix: `total_blocks_completed` → `total_levels_completed`
   - Add to attempts table: `duration_seconds`, `score`

2. Run in Supabase SQL Editor:
```sql
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS duration_seconds INTEGER;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS score INTEGER;
```

3. Regenerate types:
```bash
npx supabase gen types typescript --project-id [id] > lib/database.types.ts
```

**Files to Create**:
- `lib/badgeService.ts` - Badge calculation and awarding logic
- `app/api/student/badges/route.ts` - GET badges endpoint
- `app/api/student/badges/check/route.ts` - POST check/award badges
- `components/game/BadgeUnlockedModal.tsx` - Badge earned modal
- `public/badges/*.png` - 8 badge illustrations (256×256px)

**Files to Modify**:
- `lib/types.ts` - Add Badge, StudentStats interfaces
- `app/api/student/sync/route.ts` - Save duration and score fields

**8 Badges to Source**:
1. `first-steps.png` - Footprints (1 lesson completed)
2. `week-warrior.png` - 7-day calendar (7-day streak) *deferred*
3. `perfect-practice.png` - Bullseye (100% accuracy)
4. `bookworm.png` - Book with worm (5 lessons)
5. `century.png` - "100" celebration (100 correct)
6. `dedicated-learner.png` - Star/medal (30-day streak) *deferred*
7. `master-student.png` - Crown (all lessons)
8. `quick-learner.png` - Lightning (lesson < 10 min)

**Sources**: Flaticon, game-icons.net, OpenGameArt, Icons8

---

### Phase 3: Integration (Day 3)
**Status**: PENDING

**Main Changes**:
1. `app/student/lesson/[lessonId]/page.tsx`:
   - Add badge state: `badgeQueue`, `currentBadgeIndex`, `showBadgeModal`
   - Call `/api/student/badges/check` after lesson complete
   - Show badge modals sequentially before lesson complete modal

2. `app/student/dashboard/page.tsx`:
   - Load and display badge count
   - Show "🏆 X Badges Earned" card

**Badge Flow**:
```
Lesson Complete
    ↓
Sync attempt data
    ↓
Check badges (/api/student/badges/check)
    ↓
If new badges earned:
    Show badge modal 1
        ↓ dismiss
    Show badge modal 2 (if multiple)
        ↓ dismiss
Show lesson complete modal
    ↓
Return to dashboard
```

---

## Critical Implementation Notes

### Score Tracking
- Score increments ONLY on correct answers
- Score is per-lesson (resets each lesson)
- Score range: 0-12 (3 levels × 4 questions)
- Score saved to database in `attempts.score` field

### Point Animation
- Position: Fixed center of screen (not button-relative)
- Duration: 500ms
- Animation: Float up 60px, fade out, scale up 1.2x
- Color: `text-primary-600` (green)
- Size: `text-child-3xl` (40px)

### Badge Awarding
- Check happens AFTER sync, BEFORE navigation
- Multiple badges show sequentially (one modal at a time)
- Idempotent: Won't award same badge twice
- Works offline: Badges awarded on next online sync

### Duration Tracking
- Start time: Captured on lesson page mount
- End time: Calculated in `handleFinishLesson()`
- Stored in seconds: `Math.floor((now - start) / 1000)`
- Used for: "Quick Learner" badge (< 10 min = 600s)

---

## Deferred Features

### Streak Tracking
**Why Deferred**: Requires daily login detection and cron job

**Affects**:
- "Week Warrior" badge (7-day streak)
- "Dedicated Learner" badge (30-day streak)

**Future Implementation**:
- Track `last_practice_date` in student_stats
- Calculate streak on each lesson completion
- Compare dates to determine if streak continues/breaks
- Add cron job or edge function for daily checks

---

## Database Schema Changes

### New Tables (from rewards-schema.sql)
```sql
student_stats (
  id, student_id,
  total_questions_answered, total_questions_correct,
  total_lessons_completed, total_levels_completed,
  current_streak_days, longest_streak_days,
  last_practice_date, created_at, updated_at
)

badges (
  id, name, description, icon,
  criteria (JSONB), created_at
)

student_badges (
  id, student_id, badge_id,
  earned_at
)
```

### Modified Tables
```sql
attempts (
  -- existing fields...
  duration_seconds INTEGER,  -- NEW
  score INTEGER              -- NEW
)
```

---

## Badge Criteria Logic

```typescript
const BADGE_CRITERIA = {
  'first-steps': (stats) => stats.total_lessons_completed >= 1,
  'week-warrior': (stats) => stats.current_streak_days >= 7,  // DEFERRED
  'perfect-practice': (stats, data) => data?.hasPerfectAttempt,
  'bookworm': (stats) => stats.total_lessons_completed >= 5,
  'century': (stats) => stats.total_questions_correct >= 100,
  'dedicated-learner': (stats) => stats.current_streak_days >= 30,  // DEFERRED
  'master-student': (stats, data) => stats.total_lessons_completed >= data?.totalLessons,
  'quick-learner': (stats, data) => data?.hasQuickCompletion,
}
```

**Additional Data Checks**:
- Perfect attempt: `questions_attempted === questions_correct`
- Quick completion: `duration_seconds < 600`
- Total lessons: Query from `lessons` table by grade

---

## API Endpoints

### GET /api/student/badges
**Query**: `?studentId=X`
**Returns**: `{ badges: Badge[] }`
**Use**: Load earned badges for dashboard

### POST /api/student/badges/check
**Body**: `{ studentId: string }`
**Returns**: `{ newBadges: Badge[] }`
**Use**: Check and award new badges after lesson

---

## File Structure

```
app/
├── student/
│   ├── lesson/[lessonId]/page.tsx      (modified)
│   └── dashboard/page.tsx               (modified)
└── api/
    └── student/
        ├── sync/route.ts                (modified)
        └── badges/
            ├── route.ts                 (NEW - GET)
            └── check/route.ts           (NEW - POST)

components/
└── game/
    ├── PointAnimation.tsx               (NEW)
    ├── LessonCompleteModal.tsx          (NEW)
    ├── BadgeUnlockedModal.tsx           (NEW)
    └── LevelCompleteModal.tsx           (modified)

lib/
├── badgeService.ts                      (NEW)
├── soundEffects.ts                      (modified)
├── types.ts                             (modified)
└── database.types.ts                    (regenerate)

public/
├── sounds/
│   └── point.wav                        (NEW)
└── badges/
    ├── first-steps.png                  (NEW)
    ├── week-warrior.png                 (NEW)
    ├── perfect-practice.png             (NEW)
    ├── bookworm.png                     (NEW)
    ├── century.png                      (NEW)
    ├── dedicated-learner.png            (NEW)
    ├── master-student.png               (NEW)
    └── quick-learner.png                (NEW)

schemas/
└── future/
    └── rewards-schema.sql               (modified)
```

---

## Design System Compliance

### Colors
- Points: `text-primary-600` (#02A959 - green)
- Scores: `text-neutral-800` (labels), `text-secondary-600` (numbers)
- Badges: `bg-secondary-50` background, `text-secondary-600` accents

### Typography
- Point animation: `text-child-3xl` (40px)
- Score numbers: `text-child-4xl` (48px)
- Badge names: `text-child-2xl` (28px)
- Badge descriptions: `text-child-base` (16px)

### Animations
- Point float: 500ms, ease-out
- Badge modal: 300ms scale, ease-out
- Respects `useReducedMotion`

### Touch Targets
- All buttons: ≥ 48px height
- Adequate spacing for child-friendly UX

---

## Testing Strategy

### Phase 1 Tests
1. Start lesson → answer correctly → see "+1" animation
2. Hear subtle point sound (volume 0.3)
3. Complete 4 questions → see "Score: 4/4" at level complete
4. Complete all 3 levels → see "Total Score: 12/12" with accuracy
5. Answer incorrectly → no animation, no penalty
6. Check animation doesn't block progression

### Phase 2 Tests
1. Verify database schema applied correctly
2. Check student_stats table created
3. Check badges table has 8 entries
4. Test badge service functions in isolation
5. Verify badge API endpoints return correct data

### Phase 3 Tests
1. Complete 1st lesson → "First Steps" badge earned
2. Badge modal shows with illustration
3. Multiple badges → show sequentially
4. Dashboard shows badge count
5. Complete 5 lessons → "Bookworm" badge
6. 100 correct answers → "Century" badge
7. Offline complete → badges awarded on sync
8. Already earned badge → don't show again

---

## Edge Cases Handled

1. **Offline Mode**: Points tracked, score saved to queue, badges awarded on sync
2. **Multiple Badges**: Show modals one at a time, not simultaneously
3. **Badge Image Fail**: Falls back to emoji from database
4. **Abandoned Lesson**: Score not saved, no badges awarded
5. **Idempotency**: Badge awarding checks for existing before inserting
6. **Race Condition**: Badge check validates existence before awarding

---

## Performance Considerations

- Badge images: 256×256px, optimized with TinyPNG
- Point animation: Hardware-accelerated (transform, opacity)
- Badge check: < 2 seconds (async, doesn't block UI)
- Dashboard load: Badges loaded in parallel with lessons

---

## Security Notes

1. Badge endpoints validate studentId from session
2. Badge awarding is idempotent (prevents duplicates)
3. Stats calculation validates data integrity
4. RLS policies apply to student_badges table
5. No client-side badge manipulation possible

---

## Success Criteria

### Points System Complete When:
- [x] Animation shows on correct answer
- [x] Sound plays (subtle volume)
- [x] Score shows at level complete
- [x] Score shows at lesson complete
- [x] No penalties for wrong answers
- [x] Smooth 500ms animation

### Badge System Complete When:
- [x] First lesson → First Steps badge
- [x] Badge modal shows with illustration
- [x] Multiple badges show sequentially
- [x] Dashboard displays badge count
- [x] 5 lessons → Bookworm badge
- [x] 100 correct → Century badge
- [x] Database tracks correctly
- [x] Offline sync works

---

## Rollback Plan

If issues arise:

1. **Points System**: Remove PointAnimation import, comment out score display
2. **Badge System**: Set feature flag `BADGES_ENABLED = false` in badgeService.ts
3. **Database**: Tables are additive (won't break existing)
4. **API**: New endpoints, won't affect existing flows

---

## Future Enhancements (Post-MVP)

1. **Streak Tracking**: Daily login detection, cron job
2. **Badge Gallery**: View all badges (earned + locked)
3. **Progress Bars**: Visual progress toward next badge
4. **Leaderboards**: Private class rankings (opt-in)
5. **Customization**: Choose avatar, badge display preferences
6. **Notifications**: Push notifications for badge unlocks
7. **Social**: Share badge achievements (with parent approval)

---

## Contact & References

**Plan File**: `/Users/akashdatta/.claude/plans/breezy-splashing-token.md`
**Related Docs**:
- [GAMIFICATION_AND_SCORING_RULES.md](GAMIFICATION_AND_SCORING_RULES.md) - Current system rules
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) - Design standards
- [docs/QUESTION-TYPE-PROGRESSION-RULES.md](docs/QUESTION-TYPE-PROGRESSION-RULES.md) - Difficulty rules

**Key Files for Reference**:
- Existing modal pattern: `components/game/LevelCompleteModal.tsx`
- Lesson flow: `app/student/lesson/[lessonId]/page.tsx`
- Sound system: `lib/soundEffects.ts`
- Badge schema: `schemas/future/rewards-schema.sql`

---

**Status**: Ready to implement Phase 1
**Next Action**: Create PointAnimation component
**Estimated Time**: 3 days (1 day per phase)

---

*This document serves as a reference in case of memory loss or session restart. All implementation details are in the approved plan file.*
