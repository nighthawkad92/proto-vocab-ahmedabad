# EXECUTION SPEC — Audio & Speech Layer

## Role for Claude
Implement audio behavior using Google TTS (English–Indian female voice) and provided sound effects.

## Audio Types
1. Word pronunciation (tap-triggered)
2. Instruction narration (auto-play once)
3. Feedback sounds (correct / retry)

## Implementation Rules
- Use Google TTS for:
  - Vocabulary words
  - Instructions
- Cache audio locally once fetched
- Never autoplay word pronunciation

## Timing Rules
- Instruction audio auto-plays ONCE
- Word audio plays ONLY on tap
- Feedback sound plays immediately on action

## UI Requirements
- Speaker icon always visible
- Icon changes state while playing

## DO NOT
- Overlap audio sources
- Play background music
- Block UI during audio playback
