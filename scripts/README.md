# Database Maintenance Scripts

This directory contains scripts for auditing and maintaining the lesson database.

## Scripts

### audit-lessons.js

Audits all lessons in the database to verify they have the correct structure:
- 4 questions per level
- 2 rotation sets per level
- 3 levels per lesson

**Usage:**
```bash
# First, fetch latest lesson data
curl -s "https://sguffpxuaahivvponwfb.supabase.co/rest/v1/lessons?select=id,title,order,content&order=order" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY" > /tmp/all-lessons-fresh.json

# Then run the audit
node scripts/audit-lessons.js
```

**Expected Output:**
```
✅ All lessons with 4/4 questions per level
✅ All lessons with 2/2 rotation sets per level
✨ PERFECT status for each lesson
```

## Related Documentation

- `DATABASE_UPDATE_LOG.md` - History of database updates
- `RESEED_INSTRUCTIONS.md` - Guide for database reseeding
- `complete-lesson2-update.sql` - SQL update script example
