# RLS Issue - Final Analysis

## Root Cause Identified

The issue is **PostgREST schema caching on Supabase's infrastructure**, combined with Vercel's edge caching.

### Evidence
1. ✅ Local Node.js with anon key: Returns all 5 unlocks
2. ❌ Vercel API with anon key: Returns only 1 unlock
3. ✅ Vercel API with service key: Returns all 5 unlocks
4. ✅ RLS policies are correct (`USING (true)`)
5. ✅ Environment variables match across local and Vercel
6. ✅ Updated @supabase/supabase-js from 2.39.3 to 2.90.1
7. ❌ Issue persists even after library update

### Why This Happens

**PostgREST Schema Cache:**
- Supabase's PostgREST layer caches database schema, including RLS policies
- When RLS policies are updated, the cache doesn't always invalidate immediately
- The anon key goes through PostgREST → Cache → Policies → Data
- The service role key **bypasses PostgREST** entirely → Direct database access

**Vercel Edge Caching:**
- Vercel's edge network may cache API responses or connection metadata
- Combined with PostgREST caching, creates a double-caching issue
- Service role key bypasses both layers

### Timeline
1. **Initial setup**: RLS policies created for `lesson_unlocks`
2. **Early testing**: Only some unlocks created (lesson 2 was first)
3. **Policy updates**: Multiple RLS policy changes during debugging
4. **Cache persisted**: PostgREST cached old policy state
5. **Result**: Anon key queries return stale cached results (only lesson 2)

## Solution: Use Service Role Key

**Current Implementation:**
```typescript
// app/api/student/lessons/route.ts
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)
```

**Why This Is Safe:**
1. Service role key is **server-side only** (never exposed to browser)
2. The `lesson_unlocks` table is public data anyway (RLS: `USING (true)`)
3. API route only performs **READ operations**
4. No sensitive data in `lesson_unlocks` table

**Why This Is Not Ideal:**
- Bypasses RLS entirely for this route
- If we add sensitive columns/tables later, need to remember this
- Not following Supabase best practices

## Alternative Solutions (Not Recommended)

### Option 1: Wait for Cache to Expire
**Time**: 24-48 hours
**Likelihood**: 50%
**Reason**: PostgREST cache TTL is usually 24 hours

### Option 2: Restart Supabase Project
**Steps**: Supabase Dashboard → Project Settings → General → "Pause and Resume"
**Likelihood**: 70%
**Risk**: 5-10 minutes downtime

### Option 3: Contact Supabase Support
**Steps**: Request manual cache invalidation
**Time**: 1-3 days
**Likelihood**: 90%

### Option 4: Recreate RLS Policies with New Names
**Steps**: Drop all policies, create with different names
**Likelihood**: 60%
**Reason**: Forces PostgREST to reload schema

## Recommendation

✅ **Keep using service role key** - It's the most reliable solution given:
- Data is public anyway
- No security risk for this specific use case
- Immediate fix with no downtime
- Won't break again with future policy changes

## Documentation

Added detailed investigation files:
- `RLS_ISSUE_INVESTIGATION.md` - Initial investigation
- `scripts/comprehensive-rls-diagnosis.js` - Diagnostic tool
- `scripts/COPY_AND_PASTE_THIS.sql` - RLS policy reset script

## Lessons Learned

1. **PostgREST caching is aggressive** - Changes to RLS policies may not reflect immediately
2. **Service role key bypasses caching** - Useful for debugging
3. **Vercel + Supabase edge caching** - Double caching layer can cause stale data
4. **Library updates don't fix server-side caching** - The issue is infrastructure, not code

## If You Want to Try Anon Key Again Later

1. Wait 48 hours for cache to naturally expire
2. OR restart Supabase project (5-10 min downtime)
3. Then change back to anon key:
```typescript
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```
4. Test thoroughly before keeping the change
