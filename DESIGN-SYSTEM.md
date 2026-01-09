# Vocab Ahmedabad Design System

**A children's ESL vocabulary learning app design system**
Target audience: Ages 8-10, Ahmedabad, India
Platform: Low-spec tablets, low-bandwidth environment

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Visual Learning Layer](#visual-learning-layer)
3. [Audio & Speech Layer](#audio--speech-layer)
4. [Interaction & Motion Layer](#interaction--motion-layer)
5. [Language & Tone Layer](#language--tone-layer)
6. [Cognitive Load Layer](#cognitive-load-layer)
7. [Accessibility & Inclusion Layer](#accessibility--inclusion-layer)
8. [Emotional Safety Layer](#emotional-safety-layer)
9. [Cultural Localization Layer](#cultural-localization-layer)
10. [Child Safety & Privacy Layer](#child-safety--privacy-layer)
11. [Performance & Reliability Layer](#performance--reliability-layer)
12. [Measurement & Iteration Layer](#measurement--iteration-layer)
13. [Component Library](#component-library)

---

## Design Philosophy

This design system is built on 11 foundational layers that work together to create an effective, safe, and culturally appropriate learning experience for ESL students. Each layer addresses specific aspects of the user experience while maintaining consistency across the application.

### Core Principles
- **Clarity over decoration**: Remove visual noise, focus on learning
- **Low cognitive load**: One concept, one decision at a time
- **Emotional safety**: No fear of failure, unlimited retries
- **Cultural relevance**: Localized for Ahmedabad context
- **Performance first**: Optimized for low-spec devices
- **Privacy by design**: No tracking, local storage only

---

## Visual Learning Layer

### Role
Optimize for clarity, low cognitive load, and low-spec tablets.

### Layout Rules
- **One learning concept per screen**
- Maximum 2 primary visual elements per screen (word + object)
- Use vertical stacking, no side-by-side complexity
- Touch targets ≥ 48px minimum

### Color System

#### Primary Colors (Red spectrum)
```css
primary-50:  #fef2f2
primary-100: #fee2e2
primary-200: #fecaca
primary-300: #fca5a5
primary-400: #f87171
primary-500: #ef4444 /* Main brand color */
primary-600: #dc2626
primary-700: #b91c1c
primary-800: #991b1b
primary-900: #7f1d1d
```

#### Secondary Colors (Green spectrum)
```css
secondary-50:  #f0fdf4
secondary-100: #dcfce7
secondary-200: #bbf7d0
secondary-300: #86efac
secondary-400: #4ade80
secondary-500: #22c55e /* Success states */
secondary-600: #16a34a
secondary-700: #15803d
secondary-800: #166534
secondary-900: #14532d
```

#### Accent Colors (Orange/Yellow spectrum)
```css
accent-50:  #fef3c7
accent-100: #fde68a
accent-200: #fcd34d
accent-300: #fbbf24
accent-400: #f59e0b
accent-500: #f97316 /* Primary action color */
accent-600: #ea580c
accent-700: #c2410c
accent-800: #9a3412
accent-900: #7c2d12
```

#### Neutral Colors
```css
gray-50:  #f9fafb
gray-100: #f3f4f6 /* Background */
gray-200: #e5e7eb /* Borders */
gray-300: #d1d5db
gray-400: #9ca3af
gray-500: #6b7280
gray-600: #4b5563
gray-700: #374151
gray-800: #1f2937 /* Body text */
gray-900: #111827
```

### Color Usage Rules
- **High contrast**: WCAG AA minimum (4.5:1 for text)
- **Background**: Neutral light colors (gray-50, gray-100, white)
- **Primary action**: Accent-500 (#f97316)
- **Success feedback**: Gray tones (no bright colors for feedback)
- **Never rely on color alone**: Always pair with icons or text

### Typography

#### Font Families
```css
--font-inter: 'Inter', system-ui, sans-serif;     /* Body text */
--font-poppins: 'Poppins', system-ui, sans-serif; /* Display/headings */
```

#### Font Sizes (Child-Optimized)
```css
child-xs:   1rem     (16px) /* Small labels */
child-sm:   1.25rem  (20px) /* Instructions */
child-base: 1.5rem   (24px) /* Body text */
child-lg:   1.875rem (30px) /* Subheadings */
child-xl:   2.25rem  (36px) /* Main headings */
```

#### Specific Component Sizes
- **Word display**: 28-32px (often 32px)
- **Instruction text**: 16-18px (base font)
- **Button text**: 30px for question options
- **Feedback text**: 1.875rem (child-lg)

#### Typography Rules
- Use `font-display` (Poppins) for headings and emphasis
- Use `font-sans` (Inter) for body text
- Enable OpenType features: `"rlig" 1, "calt" 1`
- Never use decorative fonts
- Maintain consistent line-height for readability

### Visual Hierarchy Pattern
1. Show object/image (if applicable)
2. Show word label beneath
3. Highlight relationship (outline, arrow, or fade-in)

### Spacing System
```css
tap: 3rem (48px) /* Minimum touch target size */
```

Use Tailwind's default spacing scale (0.25rem increments) for all other spacing.

### Border Radius
```css
child: 1.5rem (24px) /* Standard rounded corners */
```

### Icons & Illustrations
- **Icon libraries**: Material Icons, Heroicons (SVG only)
- **Illustrations**: Simple SVG shapes only (no complex illustrations)
- Icon size minimum: 20px (w-5 h-5)
- Touch target for icons: 48px minimum

### Visual Restrictions (DO NOT)
- Use gradients, shadows, or glass effects (except functional shadows)
- Introduce new layouts mid-lesson
- Use parallax or complex animations

---

## Audio & Speech Layer

### Role
Implement audio behavior using Google TTS (English-Indian female voice) and provided sound effects.

### Audio Types

#### 1. Word Pronunciation (Tap-triggered)
- Uses Google TTS
- Plays ONLY on user tap
- Never autoplay
- Cache locally once fetched

#### 2. Instruction Narration (Auto-play once)
- Plays automatically when screen loads
- Plays only ONCE per screen
- Uses Google TTS
- Cache locally

#### 3. Feedback Sounds
- **Correct**: Positive chime (subtle)
- **Retry**: Neutral sound
- **Level complete**: Success sound
- **UI tap**: Light tap sound

### Sound Effect Categories
Available in `/assets/sound effects/`:
- **UI sounds**: `click_double_on.wav`, `toggle_on.wav`, `pop_*.wav`
- **Musical effects**: Various instrument chimes (positive, quick, negative)
- **Items**: `book_open.wav`, `page_turn.wav`, `coin_jingle.wav`
- **Materials**: Paper, wood, metal sounds

### Implementation Rules
- **Never overlap audio sources**: Stop previous audio before playing new
- **Cache audio locally**: Use `audioCache` for all TTS
- **Visual indicators required**: Speaker icon always visible
- **Non-blocking**: Never block UI during audio playback
- **Icon state change**: Show playing state on speaker icon

### Timing Rules
- Instruction audio: Auto-play ONCE on screen load
- Word audio: Play ONLY on user tap
- Feedback sound: Play immediately on action (no delay)
- Do not chain or overlap audio

### Audio Restrictions (DO NOT)
- Play background music
- Overlap multiple audio sources
- Block UI during playback
- Autoplay word pronunciation
- Mix accents or voice types

---

## Interaction & Motion Layer

### Role
Implement motion as feedback only, optimized for low-spec tablets.

### Animation Constraints
- **Duration**: 150-250ms only
- **Easing**: `ease-out` only
- **Max 1 animation at a time**
- Respect user's motion preferences (`useReducedMotion`)

### Required Component States
Every interactive component must have:
1. **Default** - Resting state
2. **Hover** - Desktop pointer hover
3. **Pressed/Active** - Touch feedback (`active:scale-95`)
4. **Disabled** - Non-interactive state (opacity-50)
5. **Loading** - Processing state (text + spinner)
6. **Success** - Successful action
7. **Retry** - Try again state

### Touch Feedback Rules
- Every tap gives immediate visual feedback
- Use `active:scale-95` for tap feedback
- Add `transition-transform duration-75` for smooth scaling
- Mis-taps do nothing (no error feedback)

### Standard Animations

#### Bounce Gentle (for emphasis)
```css
@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
animation: bounce-gentle 2s ease-in-out infinite;
```

#### Glow (for attention)
```css
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
  50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.6); }
}
animation: glow 2s ease-in-out infinite;
```

#### Fade In/Out (transitions)
```jsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.2, ease: 'easeOut' }}
```

### Loading States
- Must show text label + spinner
- Use neutral colors (gray)
- Never show loading spinner alone
- Example: "Loading..." with spinner icon

### Interaction Restrictions (DO NOT)
- Chain animations together
- Animate entire screens (only elements)
- Use parallax effects
- Use complex gestures (swipe, pinch, etc.)
- Create animations longer than 250ms

### Accessibility
- Disable text selection on game elements: `no-select` class
- Touch manipulation optimization: `touch-manipulation`
- Respect reduced motion preferences

---

## Language & Tone Layer

### Role
Write all UI text and spoken instructions with a calm, respectful, and supportive tone.

### Tone Characteristics
- **Calm**: No excitement or pressure
- **Curious**: Encourage exploration
- **Respectful**: Treat children with dignity
- **Non-judgmental**: No criticism or evaluation

### Sentence Rules
- **Maximum 12 words per sentence**
- **Simple present tense** preferred
- **Concrete vocabulary** (no abstract concepts)
- **Active voice** when possible
- **Direct and clear** instructions

### Feedback Templates

#### Success Feedback
```
"You answered correctly."
"You matched the word."
"You finished this block."
```

#### Retry Feedback
```
"Keep practicing."
"Try listening again."
"You can try again later."
```

#### Instructions
```
"Tap the word to hear it."
"Ready for the next block?"
"Put these words in order."
```

### Question Prompts
Examples from existing components:
- "Which word best fits the sentence?"
- "Put these words in the correct order."
- "Arrange the pictures in story order."
- "Read the passage and answer the question."

### Language Restrictions (DO NOT)
- Use idioms or colloquialisms
- Use exclamation marks
- Use praise labels ("smart", "genius", "excellent")
- Use competitive language ("fastest", "best")
- Use failure language ("wrong", "incorrect", "mistake")
- Use time pressure ("hurry", "quick")
- Use abstract metaphors

### Cultural Considerations
- Use neutral Indian contexts
- Avoid foreign cultural references
- Use familiar objects (school, home, local environment)
- Use common Indian names when needed

---

## Cognitive Load Layer

### Role
Audit every screen for mental effort and minimize cognitive burden.

### Hard Limits
- **Max 1 instruction per screen**
- **Max 1 decision per screen**
- **Max 2 UI actions visible at once**

### Sequencing Rules
**Always follow this pattern:**
1. **Explain** - Show instruction/concept
2. **Interact** - User performs action
3. **Feedback** - Show result

**Never explain during tests** - Instructions before, feedback after.

### Screen Complexity Guidelines
- One learning concept per screen
- No competing visual elements
- Clear visual hierarchy
- Consistent layouts within lessons
- Predictable interaction patterns

### Cognitive Load Restrictions (DO NOT)
- Introduce new controls mid-task
- Combine audio + text + animation simultaneously
- Show multiple concepts at once
- Change interaction patterns within a lesson
- Add distracting elements

---

## Accessibility & Inclusion Layer

### Role
Ensure usability on low-end tablets and for diverse learners.

### Touch Rules
- **Target size**: ≥ 48px (3rem) minimum
- **Spacing between targets**: ≥ 8px minimum
- Applied globally in `globals.css`:
```css
button, a, input, select, textarea {
  @apply min-h-[3rem] min-w-[3rem];
}
```

### Visual Rules
- **Contrast ratio**: ≥ WCAG AA (4.5:1 for text)
- **Never rely on color alone**: Always pair with icons, text, or shapes
- **Text size**: Minimum 16px (1rem), optimized sizes for children
- **Clear visual hierarchy**: Size, weight, and spacing

### Audio Rules
- **All audio has visual cue**: Speaker icons, visual feedback
- **All instructions available as text**: No audio-only instructions
- **User-controlled playback**: Tap to hear, not forced

### Motion Preferences
- Respect `prefers-reduced-motion` setting
- Provide static alternatives to animations
- Never require animation for understanding

### Accessibility Restrictions (DO NOT)
- Use small icons (minimum 20px)
- Hide critical actions
- Require audio for comprehension
- Rely on color alone for meaning
- Use low-contrast text or elements

---

## Emotional Safety Layer

### Role
Prevent fear of failure and create a supportive learning environment.

### Feedback Rules
- **Unlimited retries**: Never lock users out
- **No failure screens**: Only "keep practicing" messages
- **Neutral language only**: No negative words
- **No penalties**: No score reduction, no time loss

### Retry Pattern
When user needs to try again:
1. **Gentle message**: "Keep practicing."
2. **Replay audio option**: Always available
3. **Retry action**: Same question, no changes

### Mistake Handling
- **Visual representation**: Neutral circles (gray)
- **No red X marks**: Use filled circles instead
- **No dramatic animations**: Simple state change
- **No sound effects for errors**: Only neutral sounds

### Progress Representation
- Show progress positively (questions completed)
- Neutral mistake counter (circles fill, no dramatic effect)
- No timers or countdown clocks
- No comparison to others
- No "streak loss" notifications

### Emotional Safety Restrictions (DO NOT)
- Penalize mistakes
- Show timers or countdown
- Show "streak loss" or similar
- Use negative language ("wrong", "failed")
- Compare users to others
- Show leaderboards or rankings
- Lock content after mistakes

---

## Cultural Localization Layer

### Role
Localize content for Ahmedabad ESL learners, making it culturally relevant and appropriate.

### Content Rules
- **Use neutral Indian contexts**: School, home, local environment
- **Consistent pronunciation**: Google TTS English-Indian female voice
- **Avoid foreign cultural references**: No Western-specific examples
- **Familiar scenarios**: Daily life situations students recognize

### Names & Objects
- **Use common Indian names**: When needed in examples
- **Use familiar objects**: Items from school, home, neighborhood
- **Local context**: References to familiar places and situations
- **Cultural appropriateness**: Respect local customs and values

### Language Localization
- **Primary language**: English (ESL learning)
- **Voice**: Google TTS English-Indian accent
- **Vocabulary**: Grade-appropriate, culturally neutral
- **Examples**: Use local context when possible

### Cultural Restrictions (DO NOT)
- Mix accents or voice types
- Use unexplained metaphors from other cultures
- Reference unfamiliar holidays or customs
- Use examples requiring foreign cultural knowledge
- Include culturally inappropriate imagery

---

## Child Safety & Privacy Layer

### Role
Ensure privacy-by-design and child safety compliance.

### Data Rules
- **No login required**: Use local storage only
- **No ads or trackers**: Zero third-party analytics
- **Store progress locally**: IndexedDB or localStorage
- **No personal data collection**: No names, emails, photos
- **No behavioral tracking**: No cross-session analytics

### Permissions
**Required permissions**: NONE

**Explicitly NOT requested**:
- No microphone access
- No camera access
- No location access
- No contacts access
- No file system access (except app storage)

### Privacy Implementation
- Local-only progress storage
- No server-side user accounts
- No cloud sync
- No social features
- No external links (except authorized educational content)

### Privacy Restrictions (DO NOT)
- Use third-party analytics SDKs
- Store personal identifiers
- Track across sessions
- Request unnecessary permissions
- Include social sharing
- Show external advertisements
- Link to unvetted external content

---

## Performance & Reliability Layer

### Role
Optimize for low-bandwidth devices and unreliable connections.

### Performance Rules
- **Preload next screen assets**: Anticipate user flow
- **Cache audio and images**: Local storage after first fetch
- **Fail gracefully offline**: Show helpful messages, allow retry
- **Optimize asset sizes**: Compress images, use SVG when possible

### Loading States
- **Always show text + spinner**: Never spinner alone
- **Never block whole app**: Show loading per component
- **Provide context**: "Loading lesson..." not just "Loading"
- **Allow cancellation**: When appropriate

### Caching Strategy
- **Audio**: Cache TTS responses locally
- **Images**: Cache after first load
- **Lesson data**: Local storage with versioning
- **Sound effects**: Bundle in app (no external fetch)

### Performance Targets
- **Initial load**: < 3 seconds on slow 3G
- **Interaction response**: < 100ms
- **Animation frame rate**: 60fps minimum
- **Bundle size**: Minimize, code-split where possible

### Performance Restrictions (DO NOT)
- Fetch large assets without caching
- Rely on real-time APIs
- Use heavy external libraries
- Block UI for network requests
- Load unnecessary resources upfront

---

## Measurement & Iteration Layer

### Role
Instrument learning quality signals only, without compromising privacy.

### Allowed Metrics
**Local-only tracking**:
- **Audio replays**: Count per question
- **Retry counts**: Attempts per question
- **Screen completion**: Boolean per lesson
- **Time spent**: Per lesson/question (optional)

### Storage
- **Local only**: IndexedDB or localStorage
- **Resettable**: User can clear all data
- **No identifiers**: No user IDs or session tokens
- **Aggregated only**: No individual tracking

### Usage of Metrics
- **Improve lesson difficulty**: Adjust based on retry patterns
- **Identify confusing content**: High audio replay = unclear
- **Optimize flow**: Screen completion rates
- **A/B testing**: Local variations only

### Measurement Restrictions (DO NOT)
- Track identity or personal information
- Track location or device IDs
- Track behavior across sessions
- Send data to external servers
- Use third-party analytics
- Create user profiles
- Share data with partners

---

## Component Library

### Core Components

#### 1. QuestionCard
**Purpose**: Main router for all question types

**Props**:
```typescript
interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string) => void
  disabled?: boolean
}
```

**Styles**:
- Container: `max-w-2xl mx-auto`
- Card: `bg-white rounded-child shadow-xl p-8`
- Question text: `text-[32px] font-body font-medium`
- Options: `bg-accent-500 hover:bg-accent-600 text-[30px] py-6 rounded-child`
- Minimum height: `min-h-[4rem]`

**States**: Default, Disabled

---

#### 2. FeedbackModal
**Purpose**: Show immediate feedback after answer

**Props**:
```typescript
interface FeedbackModalProps {
  isCorrect: boolean
  show: boolean
  onClose: () => void
}
```

**Behavior**:
- Auto-closes after 1500ms
- Plays sound effect (correct/retry)
- Plays TTS feedback
- Shows icon (checkmark or retry symbol)

**Styles**:
- Overlay: `bg-black bg-opacity-50`
- Modal: `bg-white rounded-child shadow-2xl p-8`
- Icon: `w-20 h-20 text-gray-700`
- Text: `text-child-lg font-medium text-gray-800`

**Messages**:
- Correct: "You answered correctly."
- Retry: "Keep practicing."

---

#### 3. LevelCompleteModal
**Purpose**: Show completion screen between levels/blocks

**Props**:
```typescript
interface LevelCompleteModalProps {
  show: boolean
  stoppedEarly: boolean
  onContinue: () => void
  onFinish: () => void
}
```

**Behavior**:
- Plays completion sound (if not stopped early)
- Plays TTS message
- Shows continue/finish buttons

**Styles**:
- Modal: `bg-white rounded-child shadow-2xl p-8 max-w-md`
- Title: `text-child-lg font-medium text-gray-800`
- Buttons: `min-h-[3rem] rounded-child py-5 px-8`
- Continue button: `bg-accent-500 hover:bg-accent-600`
- Finish button: `bg-gray-500 hover:bg-gray-600`

---

#### 4. ProgressBar
**Purpose**: Show question progress and mistake counter

**Props**:
```typescript
interface ProgressBarProps {
  current: number
  total: number
  mistakes: number
  maxMistakes: number
}
```

**Features**:
- Question counter with percentage
- Visual progress bar
- Neutral mistake counter (circles)

**Styles**:
- Container: `max-w-2xl mx-auto`
- Card: `bg-white rounded-child shadow-md p-4`
- Progress bar: `bg-gray-200 h-4 rounded-full`
- Fill: `bg-accent-500 h-4 rounded-full transition-all duration-500`
- Mistake circles: `w-12 h-12 rounded-full`
  - Used: `bg-gray-400`
  - Unused: `bg-gray-100 border-4 border-gray-300`

---

#### 5. IntroductionCard
**Purpose**: Multi-step introduction before lesson blocks

**Props**:
```typescript
interface IntroductionCardProps {
  introduction: BlockIntroduction
  onContinue: () => void
  disabled?: boolean
}
```

**Steps**:
1. Concept explanation
2. Example
3. Activity instruction

**Styles**:
- Container: `max-w-3xl mx-auto`
- Card: `bg-white rounded-child shadow-xl p-8`
- Title: `text-[32px] font-medium`
- Content area: `bg-gray-50 rounded-child p-6`
- Progress dots: `w-3 h-3 rounded-full` (active: `bg-accent-500`, inactive: `bg-gray-300`)

---

#### 6. DraggableCard
**Purpose**: Draggable element for rearrange activities

**Props**:
```typescript
interface DraggableCardProps {
  id: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  showHandle?: boolean
}
```

**Features**:
- Smooth drag and drop
- Visual feedback during drag
- Touch-optimized
- Optional drag handle
- Drop indicators

**Styles**:
- Card: `bg-white rounded-2xl min-h-[64px] border-2`
- Default border: `border-gray-200`
- Dragging: `opacity-30 scale-95 border-accent-300`
- Drop target: `ring-2 ring-accent-500 ring-offset-2 bg-accent-50`
- Hover: `hover:shadow-lg hover:scale-[1.02]`

---

### Shared Patterns

#### Button Pattern
All buttons follow this base pattern:
```jsx
className="
  bg-accent-500 hover:bg-accent-600
  text-white font-medium
  py-6 px-8
  rounded-child shadow-lg
  active:scale-95 transition-all
  disabled:opacity-50 disabled:cursor-not-allowed
  min-h-[3rem]
"
```

#### Card Pattern
All cards follow this base pattern:
```jsx
className="
  bg-white
  rounded-child
  shadow-xl
  p-8
"
```

#### Animation Pattern
Standard fade in/out:
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
```

#### Modal Pattern
Full-screen overlay with centered content:
```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
  <motion.div className="bg-white rounded-child shadow-2xl p-8 max-w-lg">
    {/* Content */}
  </motion.div>
</div>
```

---

## Implementation Guidelines

### When Building New Components

1. **Start with the visual layer**: Layout, colors, typography
2. **Add interaction states**: Hover, active, disabled, loading
3. **Implement audio**: Sound effects, TTS if needed
4. **Add animations**: Fade in/out, scale on tap (150-250ms)
5. **Check cognitive load**: One decision, one action
6. **Verify accessibility**: Touch targets, contrast, keyboard nav
7. **Add emotional safety**: Neutral feedback, no penalties
8. **Test on low-spec device**: Performance, responsiveness

### Design Checklist

- [ ] Touch targets ≥ 48px
- [ ] Contrast ratio ≥ 4.5:1
- [ ] Font size appropriate for age group
- [ ] One concept per screen
- [ ] Clear visual hierarchy
- [ ] Animations 150-250ms, ease-out
- [ ] Neutral, supportive language
- [ ] No fear of failure
- [ ] Audio has visual cue
- [ ] Cached assets for performance
- [ ] Local-only data storage
- [ ] Culturally appropriate content

---

## Version History

**Version 1.0** - January 2026
- Initial design system based on existing implementation
- 11 foundational layers documented
- Component library established
- Style tokens defined

---

## Maintenance

This design system should be reviewed and updated:
- When adding new component types
- After user testing with target audience
- When performance issues are identified
- When new accessibility standards emerge
- Based on learning metrics (local-only)

---

## Contact & Feedback

For questions or suggestions about this design system, refer to the project documentation or create an issue in the project repository.
