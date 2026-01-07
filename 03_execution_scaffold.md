# Execution Steps & File Scaffold

## Repo Structure
/app
  /student
  /teacher
  /api
/components
  /game
  /ui
/lib
  supabase.ts
  lessonEngine.ts
  audioCache.ts
  offlineQueue.ts
/public
  /audio
  /lottie
/styles

## Step-by-Step
1. Scaffold Next.js app
2. Add Supabase client + types
3. Implement student entry flow
4. Build lesson engine (JSON driven)
5. Implement question components
6. Log attempts + responses
7. Build teacher dashboard
8. Add PWA caching
9. Deploy to Vercel

## Lesson Engine Rules
- Randomise questions per attempt
- Stop block after 2 mistakes
- Never reveal correct answers
- Store every response