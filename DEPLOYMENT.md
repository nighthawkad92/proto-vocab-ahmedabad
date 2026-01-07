# Deployment Guidelines

## Deployment Philosophy
**Single Source of Truth:** All deployments happen through GitHub. Vercel auto-deploys from GitHub - never deploy directly to Vercel.

## Pre-Deployment Checklist

### 1. Code Quality Checks
```bash
# Run linting (if configured)
npm run lint

# Run type checking
npx tsc --noEmit

# Run production build locally
npm run build

# Test the production build
npm run start
```

### 2. Environment Variables Verification
Ensure all required environment variables are set in:
- ✅ `.env.local` (for local development)
- ✅ Vercel Dashboard (for production)

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

Optional variables:
- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_CLOUD_TTS_API_KEY`

### 3. Database State Check
Before deploying major changes:
```bash
# Verify database schema is up to date
# Check Supabase dashboard for any pending migrations
# Ensure RLS policies are correctly configured
```

### 4. Security Audit
- [ ] No sensitive data in code (API keys, passwords)
- [ ] `.env.local` is in `.gitignore`
- [ ] Service role keys are only used server-side
- [ ] Row Level Security is enabled on all tables
- [ ] CORS settings are appropriate

## Deployment Process

### Step 1: Local Testing
```bash
# Ensure dev server works
npm run dev

# Test all critical flows:
# - Teacher signup/login
# - Class creation
# - Lesson unlock
# - Student login
# - Lesson completion
```

### Step 2: Build Verification
```bash
# Clean build
rm -rf .next
npm run build

# Check build output for errors
# Verify bundle sizes are reasonable
```

### Step 3: Commit and Push
```bash
# Stage changes
git add -A

# Write descriptive commit message
git commit -m "feat: description of changes

- Bullet point of major changes
- Another important change
- Fix any bugs

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to GitHub (Vercel will auto-deploy)
git push origin main
```

### Step 4: Monitor Vercel Deployment
1. Go to: https://vercel.com/akash-dattas-projects/proto-vocab-ahmedabad/deployments
2. Watch the deployment status
3. Check build logs for any errors
4. Wait for "Ready" status

### Step 5: Post-Deployment Verification
```bash
# Test production URL
# Visit: https://proto-vocab-ahmedabad.vercel.app

# Critical smoke tests:
# 1. Home page loads
# 2. Teacher login works
# 3. Student login works
# 4. Lesson loads correctly
# 5. Database operations work
```

## Common Deployment Issues & Solutions

### Issue: Build Fails with TypeScript Errors
**Cause:** Supabase types are strict when environment variables aren't set during build

**Solution:** Add `// @ts-ignore` comments above problematic Supabase calls

Example:
```typescript
// @ts-ignore - Supabase types are strict when env vars aren't set
const { data, error } = await supabase.from('table').insert({ ... })
```

### Issue: Environment Variables Not Found
**Cause:** Variables not set in Vercel dashboard

**Solution:**
1. Go to Project Settings → Environment Variables
2. Add all required variables
3. Select all environments (Production, Preview, Development)
4. Redeploy

### Issue: Database Connection Fails
**Cause:** Incorrect Supabase credentials

**Solution:**
1. Verify credentials in Supabase dashboard: https://supabase.com/dashboard/project/sguffpxuaahivvponwfb/settings/api
2. Update in Vercel if changed
3. Check RLS policies allow operations

### Issue: PWA Not Working
**Cause:** Service worker requires HTTPS

**Solution:**
- PWA only works in production (not localhost)
- Ensure Vercel deployment has HTTPS (automatic)
- Clear browser cache if updating PWA

## Rollback Procedure

If deployment fails or has critical bugs:

```bash
# Find the last working commit
git log --oneline

# Revert to that commit
git revert <commit-hash>

# Or reset to previous commit (destructive)
git reset --hard <commit-hash>
git push --force origin main

# Vercel will automatically deploy the previous version
```

## Deployment Frequency

### When to Deploy:
- ✅ New features are complete and tested
- ✅ Critical bug fixes
- ✅ Security patches
- ✅ After thorough local testing

### When NOT to Deploy:
- ❌ Untested code
- ❌ Work in progress
- ❌ During peak usage hours (if known)
- ❌ Without environment variables configured

## Branch Strategy

### Main Branch (`main`)
- Production-ready code only
- Protected branch (if configured)
- Auto-deploys to Vercel production

### Feature Branches (optional for future)
```bash
# Create feature branch
git checkout -b feature/new-feature

# Work on feature
git add -A
git commit -m "feat: new feature"

# Push feature branch
git push origin feature/new-feature

# Create pull request on GitHub
# Merge to main after review
```

## Monitoring & Maintenance

### After Each Deployment:
1. Check Vercel deployment logs
2. Monitor Supabase dashboard for errors
3. Test critical user flows
4. Check application analytics (if configured)

### Weekly Checks:
- Review error logs in Vercel
- Check database performance in Supabase
- Monitor storage usage
- Review user feedback

### Monthly Maintenance:
- Update dependencies: `npm update`
- Review and update security policies
- Backup database (Supabase does this automatically)
- Review Vercel usage and costs

## Quick Reference Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Production build
npm run start              # Test production build locally

# Git Operations
git status                 # Check current state
git add -A                 # Stage all changes
git commit -m "message"    # Commit changes
git push origin main       # Deploy to production

# Vercel (via GitHub)
# Just push to main, Vercel handles the rest!

# Emergency Rollback
git revert HEAD           # Undo last commit
git push origin main      # Deploy previous version
```

## Support & Resources

- **GitHub Repo:** https://github.com/nighthawkad92/proto-vocab-ahmedabad
- **Vercel Dashboard:** https://vercel.com/akash-dattas-projects/proto-vocab-ahmedabad
- **Supabase Dashboard:** https://supabase.com/dashboard/project/sguffpxuaahivvponwfb
- **Documentation:** README.md and SETUP_GUIDE.md

## Notes for Future Developers

1. **Never commit sensitive data** - Always use environment variables
2. **Test locally first** - Don't debug in production
3. **Write clear commit messages** - Future you will thank you
4. **Document changes** - Update README if needed
5. **Keep dependencies updated** - But test after updates
6. **Monitor Vercel build logs** - Catch issues early
7. **Respect the single deployment path** - GitHub → Vercel only

---

**Last Updated:** January 2025
**Maintained By:** nighthawkad92
