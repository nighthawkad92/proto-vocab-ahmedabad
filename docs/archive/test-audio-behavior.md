# Audio Behavior Test Results

**Date**: January 8, 2026
**Test**: Audio Cues and Button State Management

---

## Issues Found

### ❌ Issue 1: Buttons Not Disabled During Audio Playback
**Location**: `components/game/QuestionCard.tsx`

**Current Behavior**:
- Students can click answer buttons while audio is playing
- No visual indication that they should wait for audio
- Can interrupt audio by clicking buttons

**Expected Behavior**:
- Answer buttons should be disabled while ANY audio is playing
- Students must wait for audio to complete before answering
- Clear visual feedback (disabled state) during audio playback

**Impact**: High - Students may not listen to full audio before answering

---

### ❌ Issue 2: Audio Completion Not Tracked
**Location**: `lib/audioCache.ts`

**Current Behavior**:
```typescript
public async play(url: string): Promise<void> {
  // ...
  await audio.play()  // ❌ Resolves immediately when playing starts, not when finished
}
```

**Expected Behavior**:
```typescript
public async play(url: string): Promise<void> {
  // ...
  await audio.play()
  // ✅ Should wait for 'ended' event before resolving
  return new Promise((resolve) => {
    audio.addEventListener('ended', () => resolve(), { once: true })
  })
}
```

**Impact**: High - Cannot properly disable buttons until audio completes

---

### ❌ Issue 3: No Global Audio State Management
**Location**: `app/student/lesson/[lessonId]/page.tsx`

**Current Behavior**:
- No state tracking if audio is currently playing
- Components don't know when to disable buttons
- Multiple audio clips could play simultaneously

**Expected Behavior**:
- Global `isPlayingAudio` state
- All buttons disabled when `isPlayingAudio === true`
- Only one audio plays at a time

**Impact**: High - Poor UX, confusing for students

---

## Recommended Fixes

### Fix 1: Update AudioCache to Wait for Completion

```typescript
// lib/audioCache.ts
public async play(url: string): Promise<void> {
  let audio = this.cache.get(url)

  if (!audio) {
    audio = new Audio(url)
    this.cache.set(url, audio)
  }

  try {
    audio.currentTime = 0
    await audio.play()

    // ✅ Wait for audio to finish
    return new Promise((resolve, reject) => {
      const handleEnded = () => {
        cleanup()
        resolve()
      }

      const handleError = (error: ErrorEvent) => {
        cleanup()
        reject(error)
      }

      const cleanup = () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)
      }

      audio.addEventListener('ended', handleEnded, { once: true })
      audio.addEventListener('error', handleError, { once: true })
    })
  } catch (error) {
    console.error('Failed to play audio:', url, error)
    throw error
  }
}
```

### Fix 2: Add Global Audio State to Lesson Page

```typescript
// app/student/lesson/[lessonId]/page.tsx
const [isPlayingAudio, setIsPlayingAudio] = useState(false)

const handlePlayOptionAudio = useCallback(async (text: string) => {
  setIsPlayingAudio(true)  // ✅ Disable buttons
  try {
    const audioUrl = await generateSpeech({ text })
    await playAudio(audioUrl)  // ✅ Waits for completion
  } catch (error) {
    console.error('Failed to play option audio:', error)
  } finally {
    setIsPlayingAudio(false)  // ✅ Re-enable buttons
  }
}, [])
```

### Fix 3: Pass Disabled State to QuestionCard

```typescript
// app/student/lesson/[lessonId]/page.tsx
<QuestionCard
  question={currentQuestion}
  onAnswer={handleAnswer}
  disabled={waitingForNext || isPlayingAudio}  // ✅ Disable during audio
  onPlayOptionAudio={handlePlayOptionAudio}
/>
```

---

## Test Cases to Verify

### Test Case 1: Audio Completion
1. Click speaker icon on an option
2. Verify answer buttons are disabled
3. Wait for audio to complete
4. Verify buttons re-enable after audio ends

**Expected**: Buttons disabled → Audio plays → Buttons re-enable

### Test Case 2: Audio Interruption Prevention
1. Click speaker icon on option A
2. Try to click answer button while audio playing
3. Verify click is ignored

**Expected**: Button click has no effect during audio

### Test Case 3: Sequential Audio
1. Click speaker icon on option A
2. Before audio finishes, click speaker icon on option B
3. Verify behavior (either queue or cancel previous)

**Expected**: Only one audio plays at a time

### Test Case 4: Introduction Auto-Play
1. Start lesson
2. Introduction auto-plays explanation
3. Verify "Next" button is disabled during audio
4. Verify button re-enables after audio completes

**Expected**: Cannot proceed until introduction audio finishes

---

## Priority

**Priority**: 🔴 HIGH

**Reasoning**:
- Core UX specification requirement: "tap-triggered audio"
- Students may rush through without listening
- Pedagogically important - audio is key to learning
- Affects all lessons and all blocks

**Recommendation**: Fix before deployment

---

## Implementation Plan

1. **Update `lib/audioCache.ts`** (5 min)
   - Modify `play()` to return Promise that resolves on 'ended'
   - Add proper event cleanup

2. **Update `app/student/lesson/[lessonId]/page.tsx`** (10 min)
   - Add `isPlayingAudio` state
   - Wrap all `playAudio()` calls with state management
   - Pass disabled state to components

3. **Update `components/game/QuestionCard.tsx`** (2 min)
   - Already has `disabled` prop - no changes needed
   - Verify visual disabled state is clear

4. **Update `components/game/IntroductionCard.tsx`** (5 min)
   - Add `disabled` prop
   - Disable "Next" button during audio playback

5. **Test thoroughly** (15 min)
   - Manual testing of all audio interactions
   - Verify buttons disable/enable correctly
   - Test edge cases (rapid clicking, etc.)

**Total Time**: ~37 minutes

---

## Related Specifications

**UX Specification Reference**: `assets/ux-learning-layers-executable/02-audio-speech-layer.md`

**Key Requirements**:
> - Audio playback is ALWAYS tap-triggered, never automatic (except introduction)
> - Students should complete listening before responding
> - Clear visual feedback during audio playback

**Current Compliance**: ⚠️ Partial
- ✅ Tap-triggered audio implemented
- ✅ No auto-play after answers
- ❌ No enforcement of "listen before respond"
- ❌ No visual feedback during playback

---

## Conclusion

The audio system works but lacks completion tracking and button state management. This allows students to answer before listening to the full audio, which defeats the pedagogical purpose.

**Action Required**: Implement the 3 fixes above before deployment.
