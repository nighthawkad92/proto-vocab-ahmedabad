# PAL Vocabulary Support Tool

A lightweight, web-based supplemental learning tool for Class 3 students in Ahmedabad, Gujarat, India. This tool supports students who struggle with in-class English instruction by reinforcing vocabulary, decoding, reading, and writing skills at home using a tablet and slow internet.

## Features

- **Student Portal**: Simple class code + name login
- **Lesson System**: Interactive vocabulary lessons with multiple question types
- **2-Mistake Rule**: Diagnostic approach that stops blocks after 2 mistakes
- **Teacher Dashboard**: Manage classes, unlock lessons, track progress
- **Offline Support**: PWA with offline caching and sync
- **Child-Friendly UI**: Large tap targets, encouraging feedback, no punishment
- **Text-to-Speech**: Google Cloud TTS with Indian English female voice

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel
- **Audio**: Google Cloud Text-to-Speech API
- **Animations**: Framer Motion, Lottie

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Cloud account (for TTS)
- Vercel account (for deployment)

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema:
   ```bash
   # Run the contents of supabase-schema.sql
   ```
3. Optionally run seed data:
   ```bash
   # Run the contents of seed-lessons.sql
   ```
4. Get your credentials:
   - Project URL: Settings → API → Project URL
   - Anon Key: Settings → API → anon/public key
   - Service Role Key: Settings → API → service_role key

### 3. Google Cloud TTS Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the "Cloud Text-to-Speech API"
4. Create API credentials:
   - Go to APIs & Services → Credentials
   - Create API Key
   - Restrict to Text-to-Speech API
5. Copy your API key and project ID

### 4. Environment Variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_TTS_API_KEY=your-api-key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 7. Build for Production

```bash
npm run build
npm start
```

### 8. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

Add environment variables in Vercel dashboard:
- Go to your project → Settings → Environment Variables
- Add all variables from `.env.local`

## Project Structure

```
/app
  /student          # Student portal
  /teacher          # Teacher dashboard
  /api              # API routes
/components
  /game             # Game UI components
  /ui               # Shared UI components
/lib
  supabase.ts       # Supabase client
  lessonEngine.ts   # Lesson logic with 2-mistake rule
  audioCache.ts     # Audio preloading and playback
  offlineQueue.ts   # Offline sync queue
  studentSession.ts # Session management
/public
  /audio            # Audio files
  /lottie           # Lottie animations
```

## Usage

### For Teachers

1. Sign up at `/teacher`
2. Create a class (generates unique code)
3. Share class code with students
4. Unlock lessons for your class
5. Track student progress

### For Students

1. Go to `/student`
2. Enter class code + name
3. Select unlocked lesson
4. Complete questions (stops after 2 mistakes per block)
5. Progress saves automatically

## Design Principles

- **No Punishment**: Never show correct answers or negative feedback
- **Diagnostic**: Track progress without instructing
- **Child-Friendly**: Large buttons, simple text, encouraging messages
- **Offline-First**: Works on slow/unreliable connections
- **Accessible**: Touch-only usable, high contrast

## Security Features

- Row Level Security (RLS) on all tables
- Teacher authentication via Supabase Auth
- No passwords for students (class code + name)
- API routes validate permissions
- Sensitive operations require teacher auth

## Testing Checklist

- [ ] Can student refresh mid-lesson without losing progress?
- [ ] Does offline mode save and sync correctly?
- [ ] Are lesson unlocks enforced (students can't access locked lessons)?
- [ ] Can teachers only access their own classes?
- [ ] Does 2-mistake rule work correctly?
- [ ] Do large tap targets work on tablets?
- [ ] Is audio loading gracefully?

## Known Limitations (MVP)

- No pronunciation scoring
- No parent dashboards
- No adaptive tutoring
- Audio stored as base64 (should use Supabase Storage in production)
- Basic analytics only

## Support

For issues or questions, please create an issue in the GitHub repository.

## License

MIT
