# EXECUTION SPEC — Interaction & Motion Layer

## Role for Claude
Implement motion as feedback only, optimized for low-spec tablets.

## Animation Constraints
- Duration: 150–250ms
- Easing: ease-out only
- Max 1 animation at a time

## Required States per Component
- Default
- Pressed
- Disabled
- Loading
- Success
- Retry

## Interaction Rules
- Every tap gives visual feedback
- Mis-taps do nothing (no error)
- Loading must show text + spinner

## DO NOT
- Chain animations
- Animate entire screens
- Use parallax or gestures
