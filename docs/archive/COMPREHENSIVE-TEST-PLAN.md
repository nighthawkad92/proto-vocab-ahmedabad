# Comprehensive UX Implementation Test Plan

**Date**: January 8, 2026
**Purpose**: Verify all 11 UX specification layers are correctly implemented with REAL compilation and runtime tests

---

## Test Categories

### Category 1: Build & Compilation Tests (CRITICAL)
**Purpose**: Verify the code actually compiles and builds successfully

1. **TypeScript Compilation**
   - Run `tsc --noEmit` to check for type errors
   - Verify all imports resolve correctly
   - Check LessonEngine constructor signature matches usage
   - Verify all component prop types are correct

2. **Production Build**
   - Run `npm run build` and verify it completes successfully
   - Check build output for errors or warnings
   - Verify all pages compile (static and dynamic routes)
   - Check bundle size is reasonable

3. **Dependency Resolution**
   - Verify all imports can be resolved
   - Check all required files are committed
   - Verify no missing dependencies in package.json

**Expected Outcome**: Zero TypeScript errors, successful build

---

## Category 2: Layer-by-Layer UX Compliance Tests

### Layer 1: Visual Learning Layer
**Spec File**: `assets/ux-learning-layers-executable/01-visual-learning-layer.md`

**Tests**:
1. ✅ No emojis in any component (FeedbackModal, QuestionCard, ProgressBar, BlockCompleteModal, IntroductionCard)
2. ✅ No gradient backgrounds or buttons (search for `bg-gradient`)
3. ✅ Solid colors only (bg-accent-500, bg-gray-X)
4. ✅ Font sizes: 32px for prompts, 30px for options, 16px for body text
5. ✅ Vertical layout for questions (flex-col)
6. ✅ SVG icons only (no emoji, no image files)
7. ✅ Simple shapes (circles, rounded corners with rounded-child)

**Method**: File content analysis + visual inspection

---

### Layer 2: Audio & Speech Layer
**Spec File**: `assets/ux-learning-layers-executable/02-audio-speech-layer.md`

**Tests**:
1. ✅ Speaker icons present on each option
2. ✅ Tap-to-hear functionality (onPlayOptionAudio prop exists)
3. ✅ No auto-play after answer submission (check handleAnswer function)
4. ✅ Replay audio button on incorrect answers (FeedbackModal)
5. ✅ TTS API integration exists (lib/googleTTS.ts)
6. ✅ Correct voice: en-IN-Wavenet-D Female
7. ✅ Correct speed: 0.9x
8. ✅ Correct pitch: 0.5
9. ✅ Audio caching implemented (AudioCache)
10. ✅ Auto-play ONLY for introduction explanation

**Method**: Code analysis + TTS API test + runtime verification

---

### Layer 3: Interaction & Motion Layer
**Spec File**: `assets/ux-learning-layers-executable/03-interaction-motion-layer.md`

**Tests**:
1. ✅ All animations use 200ms duration
2. ✅ All animations use ease-out timing
3. ✅ No spring/bounce animations (no type: "spring")
4. ✅ Tap feedback on all buttons (active:scale-95)
5. ✅ Touch targets ≥48px (min-h-[3rem] = 48px minimum)
6. ✅ Simple fade transitions only
7. ✅ Respects prefers-reduced-motion

**Method**: Code analysis + CSS inspection

---

### Layer 4: Language & Tone Layer
**Spec File**: `assets/ux-learning-layers-executable/04-language-tone-layer.md`

**Tests**:
1. ✅ Correct feedback: "You answered correctly."
2. ✅ Incorrect feedback: "Try listening again."
3. ✅ No exclamation marks in feedback
4. ✅ No praise phrases ("Great job!", "Awesome!")
5. ✅ Dashboard greeting: "Hello, {name}." (no exclamation)
6. ✅ Exit message: ≤12 words ("Exit now? Progress is saved.")
7. ✅ Block complete: "You finished this block."
8. ✅ All sentences ≤12 words
9. ✅ Neutral, process-oriented language throughout

**Method**: Text content analysis

---

### Layer 5: Cognitive Load Layer
**Spec File**: `assets/ux-learning-layers-executable/05-cognitive-load-layer.md`

**Tests**:
1. ✅ Introduction split into 3 sequential steps
2. ✅ Progress dots show current step (3 dots)
3. ✅ One step visible at a time (currentStep state)
4. ✅ Next button advances through steps
5. ✅ One question at a time (no question list)
6. ✅ Clear visual hierarchy (titles, content, buttons)

**Method**: Component structure analysis + state management review

---

### Layer 6: Accessibility & Inclusion Layer
**Spec File**: `assets/ux-learning-layers-executable/06-accessibility-inclusion-layer.md`

**Tests**:
1. ✅ All touch targets ≥48px height
2. ✅ Aria labels on interactive elements
3. ✅ Audio has visual speaker icons
4. ✅ Feedback uses icon + text (not color alone)
5. ✅ Contrast ratios meet WCAG standards (gray-800 on white)
6. ✅ Keyboard navigation possible (button elements)
7. ✅ Screen reader friendly labels

**Method**: Code analysis + accessibility audit

---

### Layer 7: Emotional Safety Layer
**Spec File**: `assets/ux-learning-layers-executable/07-emotional-safety-layer.md`

**Tests**:
1. ✅ Mistakes shown as gray circles (not red X marks)
2. ✅ Neutral mistake color (bg-gray-400)
3. ✅ No failure language anywhere
4. ✅ Replay audio available for learning support
5. ✅ No judgment words (wrong, bad, failed)
6. ✅ Process-oriented messaging only

**Method**: Text analysis + visual inspection

---

### Layer 8: Cultural Localization Layer
**Spec File**: `assets/ux-learning-layers-executable/08-cultural-localization-layer.md`

**Tests**:
1. ✅ Indian English TTS voice (en-IN-Wavenet-D)
2. ✅ No culturally inappropriate content
3. ✅ Simple, clear language (no idioms)
4. ✅ Neutral visual design

**Method**: TTS configuration check + content review

---

### Layer 9: Child Safety & Privacy Layer
**Spec File**: `assets/ux-learning-layers-executable/09-child-safety-privacy-layer.md`

**Tests**:
1. ✅ Local-only data storage (IndexedDB)
2. ✅ No tracking cookies
3. ✅ No third-party analytics
4. ✅ No personal data collection beyond name
5. ✅ Secure session management

**Method**: Code review + privacy audit

---

### Layer 10: Performance & Reliability Layer
**Spec File**: `assets/ux-learning-layers-executable/10-performance-reliability-layer.md`

**Tests**:
1. ✅ Audio caching implemented (AudioCache singleton)
2. ✅ Offline support (service worker exists)
3. ✅ Optimized animations (GPU-accelerated)
4. ✅ No heavy gradients or shadows
5. ✅ Solid colors for better performance
6. ✅ Simple SVG icons (not PNGs)

**Method**: Code analysis + performance profiling

---

### Layer 11: Measurement & Iteration Layer
**Spec File**: `assets/ux-learning-layers-executable/11-measurement-iteration-layer.md`

**Tests**:
1. ✅ Local-only usage tracking
2. ✅ No external analytics
3. ✅ Attempt data stored in Supabase
4. ✅ Progress tracking per student
5. ✅ Rotation set tracking

**Method**: Database schema review + API endpoint check

---

## Category 3: Integration Tests

### Database Integration
1. ✅ Grade 4 lessons exist in database
2. ✅ Rotation sets properly configured (2 per block)
3. ✅ Question counts match across sets
4. ✅ Introduction fields populated correctly
5. ✅ Supabase connection works

**Method**: Database queries + data validation

---

### API Endpoint Tests
1. ✅ `/api/tts/generate` works with correct parameters
2. ✅ `/api/student/lesson/[lessonId]` returns lesson data
3. ✅ `/api/student/attempt` creates attempts correctly
4. ✅ All endpoints handle errors gracefully

**Method**: API testing + error simulation

---

### Component Integration
1. ✅ Lesson page correctly initializes LessonEngine
2. ✅ Audio handlers passed to all components
3. ✅ Introduction modal shows before first block
4. ✅ Feedback modal displays after each answer
5. ✅ Progress bar updates correctly
6. ✅ Block complete modal appears at right time

**Method**: Flow testing + state management review

---

## Category 4: Runtime Behavior Tests

### Lesson Flow Test
1. Student logs in
2. Selects Grade 4 lesson
3. Views sequential introduction (3 steps)
4. Sees question with 4 options
5. Taps speaker icon → hears audio
6. Selects answer
7. Sees feedback (correct or incorrect)
8. If incorrect → sees replay audio button
9. Progress bar updates (neutral gray for mistakes)
10. Continues to next question
11. Completes block → sees neutral completion message
12. Returns to dashboard

**Method**: Manual testing + automated E2E test

---

### Rotation Sets Test
1. Student completes lesson (attempt 1) → sees default questions
2. Student retakes lesson (attempt 2) → sees rotation set 1
3. Student retakes lesson (attempt 3) → sees rotation set 2
4. Student retakes lesson (attempt 4) → sees default questions (cycle repeats)

**Method**: Database verification + manual testing

---

## Category 5: Error Handling Tests

1. ✅ TTS API failure handled gracefully
2. ✅ Database connection failure handled
3. ✅ Missing lesson content handled
4. ✅ Invalid student session handled
5. ✅ Network errors show user-friendly messages

**Method**: Error injection + testing

---

## Test Execution Order

1. **FIRST**: Build & Compilation Tests (if these fail, stop immediately)
2. **SECOND**: Layer-by-layer UX compliance tests (static analysis)
3. **THIRD**: Integration tests (database, API, components)
4. **FOURTH**: Runtime behavior tests (manual + automated)
5. **FIFTH**: Error handling tests

---

## Success Criteria

### Must Pass (Critical)
- ✅ TypeScript compiles with zero errors
- ✅ `npm run build` succeeds
- ✅ All 11 UX layers 100% compliant
- ✅ Database queries work
- ✅ TTS API generates audio
- ✅ Rotation sets function correctly

### Should Pass (Important)
- ✅ No console warnings during build
- ✅ All accessibility checks pass
- ✅ Performance metrics acceptable
- ✅ Error handling works

### Nice to Have
- ✅ Zero ESLint warnings
- ✅ 100% test coverage
- ✅ Lighthouse score >90

---

## Tools Required

1. **Build Tools**: npm, tsc, next build
2. **Testing Tools**: Node.js test runner, Supabase client
3. **Manual Testing**: Browser, DevTools, Network tab
4. **Verification Tools**: Text search, regex, file comparison

---

## Output Format

For each test:
```
✅ [PASS] Test name - Details
❌ [FAIL] Test name - Error message
⚠️  [WARN] Test name - Warning message
```

Final summary:
```
CRITICAL: X/Y passed
IMPORTANT: X/Y passed
NICE-TO-HAVE: X/Y passed

OVERALL: PASS/FAIL
```

---

## Notes

- **This plan addresses the previous testing failure**: We now include actual build compilation tests
- **All tests must be reproducible**: Scripts should be automated where possible
- **No superficial checks**: Every test must validate actual functionality
- **Document all failures**: Include error messages and stack traces
- **Re-run after fixes**: Verify fixes don't break other tests
