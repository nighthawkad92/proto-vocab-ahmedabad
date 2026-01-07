# Quick Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create account
2. Click "New Project"
3. Name it "pal-vocab-tool"
4. Choose a strong database password
5. Select region closest to Ahmedabad (e.g., Mumbai)
6. Wait for project to be created (~2 minutes)

## Step 2: Setup Database

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy entire contents of `supabase-schema.sql`
4. Paste and click "Run"
5. Wait for success message
6. Click "New Query" again
7. Copy entire contents of `seed-lessons.sql`
8. Paste and click "Run"

## Step 3: Get Supabase Credentials

1. Go to Settings → API
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)
   - **service_role key**: `eyJhbGc...` (different long string)

## Step 4: Setup Google Cloud TTS

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing
3. In search bar, type "Text-to-Speech API"
4. Click "Enable"
5. Go to "APIs & Services" → "Credentials"
6. Click "Create Credentials" → "API Key"
7. Copy the API key
8. Click "Restrict Key"
9. Under "API restrictions", select "Cloud Text-to-Speech API"
10. Save

## Step 5: Configure Environment

1. Open the project folder
2. Copy `.env.local.example` to `.env.local`
3. Open `.env.local` in a text editor
4. Fill in the values from Steps 3 and 4:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_TTS_API_KEY=AIzaSy...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Install and Run

Open terminal in project folder:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open browser to [http://localhost:3000](http://localhost:3000)

## Step 7: Create First Teacher Account

1. Go to [http://localhost:3000/teacher](http://localhost:3000/teacher)
2. Click "Sign up"
3. Enter name, email, password
4. Click "Create Account"
5. Sign in with your credentials

## Step 8: Create First Class

1. In teacher dashboard, click "New Class"
2. Enter class name (e.g., "Class 3-A")
3. Click "Create"
4. Note the class code (e.g., "ABC123")
5. Click "Manage Class"
6. Unlock some lessons

## Step 9: Test Student Flow

1. Open new browser tab (or incognito)
2. Go to [http://localhost:3000/student](http://localhost:3000/student)
3. Enter class code from Step 8
4. Enter student name (e.g., "Raj")
5. Click "Let's Learn!"
6. Try a lesson

## Step 10: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow prompts, then:

1. Go to [vercel.com](https://vercel.com)
2. Find your project
3. Go to Settings → Environment Variables
4. Add all variables from `.env.local`
5. Redeploy

Your app is now live! 🎉

## Troubleshooting

### Database Connection Error
- Check Supabase URL and keys are correct
- Make sure RLS policies are applied (run schema again)

### TTS Not Working
- Check Google Cloud API key is valid
- Verify Text-to-Speech API is enabled
- Check for billing account setup

### PWA Not Working
- PWA only works in production (not localhost)
- Make sure you've deployed to Vercel
- Try opening in Chrome on Android/iOS

### Offline Mode Issues
- Service worker needs HTTPS (works on localhost and production)
- Check browser console for errors
- Clear cache and reload

## Need Help?

Check the main [README.md](README.md) for detailed documentation.
