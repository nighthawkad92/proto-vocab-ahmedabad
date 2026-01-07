# Build Plan — Claude Execution Guide

## IMPORTANT EXECUTION RULE
Claude MUST pause and ask the user for the following before proceeding:
- Supabase project URL + anon key
- Supabase service role key (for server routes)
- Vercel CLI login confirmation
- GitHub CLI login confirmation
- Google Cloud TTS API key + project ID

## Stack
- Next.js (App Router, TypeScript)
- Supabase (Postgres + Storage + RLS)
- Vercel (deployment)
- Google TTS (Indian female English voice)
- Lottie for animations

## Phase 1: Foundation
- Initialise Next.js app
- Configure PWA support
- Setup Supabase client
- Setup environment variables
- Verify local dev + build

## Phase 2: Data + Security
- Create Supabase tables
- Enable Row Level Security
- Apply policies for:
  - teachers
  - students
  - attempts
  - responses

## Phase 3: Core Features
- Student login (class code + name)
- Lesson unlock gating
- Lesson runner engine
- 2-mistake progression rule
- Offline attempt queue + sync

## Phase 4: Teacher Dashboard
- Login via Supabase Auth
- Class overview
- Unlock lesson toggles
- Student detail view

## Phase 5: Polish
- Animations
- Audio preloading
- Performance optimisation
- Accessibility checks