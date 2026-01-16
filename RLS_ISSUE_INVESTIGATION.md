# RLS Issue Investigation Summary

## Problem
Student dashboard was only showing 1 unlocked lesson (lesson 2) instead of all 5 unlocked lessons when using the anon key on Vercel. Same code worked perfectly locally.

## Diagnosis Results

### Local Testing (Node.js)
✅ **Anon key returns 5 unlocks** - All tests passed
✅ **Service role returns 5 unlocks** - Works as expected
✅ **RLS policies are correct** - `USING (true)` allows public read access

### Vercel Testing
❌ **Anon key returned only 1 unlock** (lesson 2)
✅ **Service role returns 5 unlocks** - Works as expected

## Key Finding
**The issue is Vercel-specific, not with the RLS policies themselves.**

## Potential Root Causes

### 1. Outdated Supabase JS Library (Most Likely)
**Current version**: 2.39.3
**Latest version**: 2.90.1
**Gap**: 51 versions behind!

There were several bug fixes related to RLS and caching between these versions.

**Solution**: Update `@supabase/supabase-js` to latest version:
```bash
npm install @supabase/supabase-js@latest
```

### 2. Vercel Edge Caching
Vercel might be caching Supabase responses or schema metadata differently than local environment.

**Potential solutions**:
- Add unique timestamps to queries (already implemented)
- Force Vercel to bypass edge cache with headers
- Use Vercel's data cache revalidation

### 3. PostgREST Schema Cache
Supabase's PostgREST might have cached an old schema before the RLS policies were updated.

**Solution**: Refresh Supabase's schema cache via Dashboard:
1. Go to Supabase Dashboard → Project Settings → API
2. Restart PostgREST or restart the project

### 4. Environment Variable Mismatch
The anon key in Vercel environment variables might be different or outdated.

**Check**: Verify in Vercel Dashboard → Settings → Environment Variables that:
- `NEXT_PUBLIC_SUPABASE_URL` matches `.env.local`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` matches `.env.local`
- Keys were added to all environments (Production, Preview, Development)

### 5. Regional Latency / Connection Pooling
If Vercel and Supabase are in different regions, connection pooling or CDN caching might cause issues.

**Check**:
- Vercel deployment region
- Supabase project region
- Consider using same region for both

## Current Workaround
✅ Using service role key in the API route (server-side only)

**Why this is safe**:
- Service role key is only used server-side (never exposed to browser)
- The data being read (`lesson_unlocks`) is public anyway (RLS allows anyone to read)
- Only reading data, not writing

**Why this is not ideal**:
- Bypasses all RLS policies for this route
- If we add sensitive data to related tables later, this could be a security issue
- Not following best practices

## Recommended Next Steps

### Step 1: Update Supabase JS (Do this first)
```bash
npm install @supabase/supabase-js@latest
npm install
git add package.json package-lock.json
git commit -m "chore: Update @supabase/supabase-js to latest version"
git push
```

### Step 2: Test with anon key again
After updating, change the API route back to using anon key and test:

```typescript
// app/api/student/lessons/route.ts
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### Step 3: If still not working, check Vercel environment variables
Go to Vercel Dashboard and verify all environment variables are correct.

### Step 4: If still not working, restart Supabase PostgREST
Go to Supabase Dashboard → Project Settings → General → Pause and Resume project

## Why We Care About Fixing This

While the service role key works, using the anon key is better because:
1. **Principle of least privilege** - Only give the minimum permissions needed
2. **Future-proofing** - If we add more tables/data, RLS will protect them
3. **Best practices** - Aligns with Supabase's recommended architecture
4. **Auditability** - RLS policies document what data is public vs private

## Questions for User

To help diagnose further, please provide:
1. Screenshot of Vercel environment variables (hide the actual keys)
2. Vercel deployment region (Settings → General)
3. Supabase project region (Dashboard → Project Settings → General)
4. When were the RLS policies last updated? (relative to when Vercel first showed the issue)
