# EXECUTION SPEC — Performance & Reliability Layer

## Role for Claude
Optimize for low-bandwidth devices.

## Performance Rules
- Preload next screen assets
- Cache audio and images
- Fail gracefully offline

## Loading Rules
- Show text + spinner
- Never block whole app

## DO NOT
- Fetch large assets
- Rely on real-time APIs
