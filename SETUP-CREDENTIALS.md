# API Credentials Setup Guide

## Overview

This application requires two sets of credentials:
1. **Supabase** - Database and authentication (✅ Already configured)
2. **Google Cloud TTS** - Text-to-speech for audio (⚠️ Needs setup)

---

## ✅ Supabase (Already Configured)

Your Supabase credentials are already in `.env.local`:
- Project URL: `https://sguffpxuaahivvponwfb.supabase.co`
- Status: Active and working

---

## ⚠️ Google Cloud Text-to-Speech API Setup

### Why This Is Required

The app uses Google Cloud TTS to generate audio pronunciation for vocabulary words with an Indian English female voice (`en-IN-Wavenet-D`), as specified in the UX specs.

### Current Status

In `.env.local`, these values are empty:
```bash
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_TTS_API_KEY=
```

### Setup Steps

#### Step 1: Create/Select Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click the project dropdown at the top
4. Click **"New Project"** or select an existing project
5. If creating new:
   - Project name: `vocab-learning-tool` (or your choice)
   - Click **Create**
6. **Copy your Project ID** (shown on the project dashboard)

#### Step 2: Enable Text-to-Speech API

1. In the Google Cloud Console, use the search bar at the top
2. Search for: **"Cloud Text-to-Speech API"**
3. Click on the API result
4. Click the blue **"Enable"** button
5. Wait for it to enable (takes a few seconds)

#### Step 3: Create API Key

1. In the left sidebar, go to: **APIs & Services** > **Credentials**
2. Click the blue **"+ Create Credentials"** button at the top
3. Select **"API Key"** from the dropdown
4. A dialog will show your new API key - **Copy it immediately**

#### Step 4: Restrict API Key (Security Best Practice)

1. After the API key is created, click **"Restrict Key"** in the dialog
2. Or click the pencil icon next to your API key in the credentials list
3. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Click **"Select APIs"** dropdown
   - Find and check **"Cloud Text-to-Speech API"**
   - Save
4. Under **"Application restrictions"** (optional but recommended):
   - For local development: Select **"None"**
   - For production: Select **"HTTP referrers"** and add your domain
5. Click **"Save"** at the bottom

#### Step 5: Add Credentials to `.env.local`

1. Open `.env.local` in your project root
2. Replace the placeholder values:

```bash
# Before:
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_TTS_API_KEY=

# After (use your actual values):
GOOGLE_CLOUD_PROJECT_ID=vocab-learning-tool-123456
GOOGLE_CLOUD_TTS_API_KEY=AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Save the file

#### Step 6: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

---

## Verify Setup

### Test Google Cloud TTS

Run this test script to verify your TTS API is working:

```bash
node test-tts-connection.js
```

If successful, you'll see:
```
✅ Google Cloud TTS API is working
✅ Generated audio for test text
✅ Voice: en-IN-Wavenet-D (Indian English Female)
```

If there are errors:
- ❌ Check your API key is correct
- ❌ Verify "Cloud Text-to-Speech API" is enabled
- ❌ Ensure no quotation marks around values in .env.local
- ❌ Make sure you restarted the dev server

### Test Supabase

Run this test script to verify database connection:

```bash
node check-schema.js
```

---

## Cost Information

### Google Cloud TTS Pricing (as of 2024)

- **Free Tier**: 1 million characters per month (WaveNet voices like en-IN-Wavenet-D)
- **After Free Tier**: $16 per 1 million characters
- **Estimated Usage**:
  - 5 lessons × 15 blocks × 4 questions × 20 characters = ~6,000 characters per student session
  - Free tier covers ~166 student sessions per month
  - For a class of 30 students doing 2 lessons/week = ~240 sessions/month (requires paid usage)

### Recommendation

For development/testing: Free tier is sufficient

For production with multiple classes: Consider:
1. Pre-generating all audio and storing in Supabase Storage (one-time cost)
2. Caching audio files to avoid regeneration
3. Budget ~$20-50/month depending on usage

The current implementation already caches audio in memory during lessons to minimize API calls.

---

## Troubleshooting

### Error: "TTS service not configured"

**Cause**: API key is missing or incorrect

**Solution**:
- Check `.env.local` has both `GOOGLE_CLOUD_PROJECT_ID` and `GOOGLE_CLOUD_TTS_API_KEY`
- Ensure no extra spaces or quotes
- Restart dev server after changes

### Error: "API key not valid"

**Cause**: API key is incorrect or restricted

**Solution**:
- Regenerate API key in Google Cloud Console
- Check API restrictions allow "Cloud Text-to-Speech API"
- Verify you're using the right Google Cloud project

### Error: "Cloud Text-to-Speech API has not been used"

**Cause**: API not enabled for your project

**Solution**:
- Go to Google Cloud Console
- Search "Cloud Text-to-Speech API"
- Click "Enable"

### Audio not playing in app

**Possible causes**:
1. TTS API not configured (see above)
2. Browser audio autoplay policy blocking audio
3. Network issues preventing API calls

**Check**:
- Open browser console (F12) and look for errors
- Verify TTS API calls are returning 200 status
- Test with headphones to rule out device audio issues

---

## Security Notes

### ⚠️ IMPORTANT: `.env.local` Security

- **Never commit `.env.local` to git** (already in `.gitignore`)
- **Never share API keys publicly**
- **Restrict API keys** to only the APIs you need
- **Rotate keys** if accidentally exposed

### Production Deployment

When deploying to Vercel/Netlify/etc:

1. Add environment variables in your hosting platform's dashboard
2. Do NOT add them to git
3. Use separate API keys for production vs development
4. Enable additional restrictions (domain, IP, etc.)

---

## Next Steps

After setting up credentials:

1. ✅ Verify both APIs are working (run test scripts)
2. ✅ Pre-generate audio for all lessons (optional but recommended)
3. ✅ Test audio playback in student lesson interface
4. ✅ Proceed with UX improvements implementation

---

## Questions?

If you encounter issues:
1. Check error messages in browser console (F12)
2. Check server logs in terminal
3. Verify all steps above were followed
4. Review Google Cloud Console for API quota/errors

