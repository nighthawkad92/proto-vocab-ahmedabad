# Redundancy Audit Report

**Date**: 2026-01-09
**Total Files Analyzed**: 110+ code files, 80 markdown docs, 33 SQL files
**Directory Size**: 892MB (495MB node_modules, 178MB .next build cache)

---

## Executive Summary

Found **significant redundancies** across database schema, documentation, and configuration:
- 🔴 **Critical**: Outdated database schema still using "blocks" terminology
- 🟡 **Moderate**: 17+ redundant status/completion documents
- 🟡 **Moderate**: Unused npm dependencies (lottie-react)
- 🟢 **Low**: Minimal code duplication in components

**Estimated Space Savings**: ~2-5MB in docs, improved maintainability

---

## 🔴 CRITICAL: Database Schema Redundancy

### Issue: Outdated Column Names

**File**: [`supabase-schema.sql`](supabase-schema.sql)
**Lines**: 65-66, 75

The main schema file still uses **old "blocks" terminology** despite code migration:

```sql
-- ❌ OUTDATED (Line 65-66)
blocks_completed INTEGER DEFAULT 0,
blocks_stopped_at INTEGER

-- ❌ OUTDATED (Line 75)
block_number INTEGER NOT NULL,
```

**Should be**:
```sql
-- ✅ UPDATED
levels_completed INTEGER DEFAULT 0,
levels_stopped_at INTEGER

level_number INTEGER NOT NULL,
```

**Impact**:
- ⚠️ New deployments will use wrong column names
- ⚠️ Migration scripts won't match base schema
- ⚠️ Database types already updated, causing mismatch

**Recommendation**: **Update `supabase-schema.sql` immediately** before next deployment

---

## 🟡 MODERATE: Documentation Redundancy

### 1. Status/Completion Documents (17 files - ~500KB)

These documents all mark various completion milestones but create confusion:

#### Redundant "Complete" Docs
1. `ALL-STEPS-COMPLETED.md` ← Generic completion
2. `COMPREHENSIVE-TEST-PLAN.md` ← Test planning
3. `CONTENT-CREATION-COMPLETE.md` ← Content creation done
4. `IMPLEMENTATION-COMPLETE-REPORT.md` ← Implementation done
5. `READY-TO-TEST.md` ← Ready for testing
6. `ROTATION-SETS-DEPLOYED.md` ← Rotation sets done
7. `TESTING-COMPLETE.md` ← Testing done
8. `TESTING-STATUS.md` ← Testing status
9. `TEST-RESULTS-SUMMARY.md` ← Test results
10. `UX-IMPLEMENTATION-COMPLETE.md` ← UX done
11. `UX-TEST-RESULTS.md` ← UX test results

#### Redundant "Deployment" Docs
12. `DEPLOYMENT.md` ← General deployment guide
13. `DEPLOYMENT_CHECKLIST.md` ← Deployment checklist
14. `TESTING-DEPLOYMENT-CHECKLIST.md` ← Test + deploy checklist

#### Redundant "Quick Start" Docs
15. `QUICK-START-TESTING.md` ← Quick testing guide
16. `START-HERE.md` ← Starting point
17. `QUICK_FIX.sql` ← Quick SQL fix

**Problem**:
- Hard to find current status
- Outdated info mixed with current
- Maintenance burden (80 markdown files total!)

**Recommendation**:
1. **Consolidate into 3 files**:
   - `PROJECT-STATUS.md` - Current status
   - `DEPLOYMENT-GUIDE.md` - How to deploy
   - `TESTING-GUIDE.md` - How to test
2. **Archive old docs** to `docs/archive/`
3. **Delete obvious duplicates**

---

### 2. Migration/Setup SQL Files (11 seed files - ~2MB)

Multiple versions of seed data with unclear purposes:

#### Seed Files
1. `seed-lessons.sql` ← Original?
2. `seed-lessons-2-5-integrated-master.sql` ← Master?
3. `seed-lesson-2-vocabulary-integrated.sql` ← Lesson 2 only
4. `seed-lesson-3-reading-integrated.sql` ← Lesson 3 only
5. `seed-lesson-4-sentence-expansion-integrated.sql` ← Lesson 4 only
6. `seed-lesson-5-reading-writing-integrated.sql` ← Lesson 5 only
7. `seed-lessons-grade4.sql` ← Grade 4 version
8. `seed-lessons-grade4-lessons-4-5.sql` ← Grade 4 subset
9. `seed-lessons-grade4-new-content.sql` ← Grade 4 new
10. `seed-lessons-grade4-backup.sql` ← Grade 4 backup
11. `seed-test-questions.sql` ← Test data

**Problem**:
- Which one to use for production?
- Do they conflict or complement each other?
- Backups mixed with current data

**Recommendation**:
1. **Identify ONE production seed file**
2. **Archive others** to `seeds/archive/`
3. **Document** which seed file to use in README

---

### 3. Test Files (7 JS files - ~100KB)

Multiple test scripts with overlapping purposes:

1. `test-attempt-direct.mjs`
2. `test-attempt-creation.mjs`
3. `test-comprehensive.js`
4. `test-e2e-rotation.js`
5. `test-e2e-ux.js`
6. `test-lesson-progression.js`
7. `test-ux-implementation.js`

**Problem**:
- No clear test runner
- Manual execution required
- Results not automated

**Recommendation**:
1. **Move to `tests/` directory**
2. **Add proper test framework** (Jest/Vitest)
3. **Create `npm test` script**

---

## 🟡 MODERATE: Unused Dependencies

### 1. lottie-react (NOT USED)

**Package**: `lottie-react@^2.4.0`
**Size**: ~50KB
**Usage**: ❌ No imports found in codebase

```bash
# Search results:
grep -r "lottie-react" app/ components/ lib/
# No results
```

**Recommendation**: **Remove from package.json**

```bash
npm uninstall lottie-react
```

### 2. lucide-react (BARELY USED)

**Package**: `lucide-react@^0.562.0`
**Size**: ~2MB
**Usage**: ✅ 1 import in [`components/game/shared/DraggableCard.tsx`](components/game/shared/DraggableCard.tsx)

```typescript
import { GripVertical } from 'lucide-react'
```

**Problem**: 2MB package for 1 icon

**Recommendation**:
- **Option A**: Use Heroicons (already installed) for consistency
- **Option B**: Keep if using more Lucide icons in future

**Current**: Using `@heroicons/react` everywhere else (20+ components)

---

## 🟢 LOW: Code Duplication

### Analysis Summary

**Components**: 22 files
**Lib Files**: 12 files
**API Routes**: 8 files

**Findings**:
- ✅ **No significant component duplication** - Each serves unique purpose
- ✅ **Good code reuse** - Shared components (Button, Input, Header, etc.)
- ✅ **Clean separation** - question-types/, shared/, ui/, navigation/
- ⚠️ **Minor duplication**: localStorage patterns repeated in 3 files

### Minor Duplication: localStorage Patterns

**Files**:
1. `lib/studentSession.ts` - localStorage save/load/clear
2. `lib/teacherSession.ts` - localStorage save/load/clear
3. `lib/offlineQueue.ts` - localStorage save/load/clear

**Pattern repeated 3 times**:
```typescript
// Same pattern in all 3 files:
if (typeof window === 'undefined') return
try {
  localStorage.setItem(KEY, JSON.stringify(data))
} catch (error) {
  console.error('Failed to save:', error)
}
```

**Impact**: Low - only ~30 lines total
**Recommendation**: Could extract to `lib/storage.ts` utility, but not critical

---

## 🔴 CRITICAL: Rewards Schema (Unused Table)

### Issue: rewards-schema.sql

**File**: [`rewards-schema.sql`](rewards-schema.sql)
**Purpose**: Creates rewards/badges tables
**Status**: ❌ **NOT REFERENCED ANYWHERE**

```sql
CREATE TABLE student_rewards (...)
CREATE TABLE reward_definitions (...)
```

**Usage check**:
```bash
grep -r "student_rewards\|reward_definitions" app/ components/ lib/
# No results
```

**Recommendation**:
1. **If future feature**: Move to `schemas/future/` and document
2. **If not planned**: Delete file
3. **If already deployed**: Create migration to DROP tables

---

## 📊 Redundancy Summary Table

| Category | Count | Impact | Priority | Action |
|----------|-------|--------|----------|--------|
| **Outdated DB Schema** | 3 cols | 🔴 Critical | 1 | Update supabase-schema.sql |
| **Completion Docs** | 17 files | 🟡 Moderate | 2 | Consolidate to 3 files |
| **Seed Files** | 11 files | 🟡 Moderate | 3 | Archive old versions |
| **Test Scripts** | 7 files | 🟡 Moderate | 4 | Move to tests/ dir |
| **Unused Deps** | 1 package | 🟡 Moderate | 5 | Remove lottie-react |
| **Unused Schema** | 1 file | 🔴 Critical | 6 | Delete or move rewards-schema.sql |
| **localStorage Patterns** | 3 files | 🟢 Low | 7 | Optional: Extract utility |

---

## 🎯 Recommended Action Plan

### Phase 1: Critical Fixes (Do First)

1. **Update Database Schema** ⚠️
   ```bash
   # Edit supabase-schema.sql
   # Change: blocks_completed → levels_completed
   # Change: blocks_stopped_at → levels_stopped_at
   # Change: block_number → level_number
   ```

2. **Handle Rewards Schema** ⚠️
   - If keeping: Move to `schemas/future/rewards-schema.sql`
   - If deleting: Remove file + create DROP migration if deployed

### Phase 2: Documentation Cleanup

1. **Consolidate Status Docs**
   ```bash
   mkdir -p docs/archive
   mv *-COMPLETE*.md docs/archive/
   mv TESTING-*.md docs/archive/
   mv DEPLOYMENT_CHECKLIST.md docs/archive/

   # Create new consolidated docs:
   # - PROJECT-STATUS.md
   # - DEPLOYMENT-GUIDE.md
   # - TESTING-GUIDE.md
   ```

2. **Organize Seed Files**
   ```bash
   mkdir -p seeds/archive
   mv seed-lessons-grade4-backup.sql seeds/archive/
   mv seed-lessons-grade4-lessons-4-5.sql seeds/archive/
   mv seed-test-questions.sql seeds/archive/

   # Document in README which seed file to use
   ```

3. **Organize Test Files**
   ```bash
   mkdir -p tests
   mv test-*.js tests/
   mv test-*.mjs tests/
   ```

### Phase 3: Dependency Cleanup

1. **Remove Unused Dependency**
   ```bash
   npm uninstall lottie-react
   ```

2. **Optional: Replace Lucide Icon**
   ```typescript
   // In DraggableCard.tsx
   // Replace: import { GripVertical } from 'lucide-react'
   // With: import { Bars3Icon } from '@heroicons/react/24/outline'

   // Then: npm uninstall lucide-react
   ```

### Phase 4: Optional Improvements

1. **Extract localStorage Utility** (if time permits)
   ```typescript
   // lib/storage.ts
   export function saveToStorage<T>(key: string, data: T) {
     if (typeof window === 'undefined') return
     try {
       localStorage.setItem(key, JSON.stringify(data))
     } catch (error) {
       console.error(`Failed to save ${key}:`, error)
     }
   }
   // etc.
   ```

---

## 📈 Expected Benefits

### After Cleanup:

**Space Savings**:
- Documentation: ~500KB → ~50KB (90% reduction)
- Dependencies: ~2MB → 0MB (if removing lucide-react)
- Seeds: ~2MB → ~200KB (moving to archive)

**Maintainability**:
- ✅ Single source of truth for status
- ✅ Clear which seed file to use
- ✅ Cleaner project structure
- ✅ Faster onboarding for new developers

**Reliability**:
- ✅ Database schema matches code
- ✅ No confusion about deployment steps
- ✅ Clearer testing process

---

## ❓ Questions to Resolve

1. **Rewards System**: Is `rewards-schema.sql` for future feature? Or delete?
2. **Seed Files**: Which is the "production" seed file to use?
3. **Test Files**: Should we set up proper test framework (Jest/Vitest)?
4. **Lucide Icons**: Keep lucide-react or migrate to Heroicons?

---

## 📋 Cleanup Checklist

### Critical (Do First)
- [ ] Update `supabase-schema.sql` with levels terminology
- [ ] Resolve rewards-schema.sql (keep or delete)
- [ ] Test schema changes in staging

### Important (Do Soon)
- [ ] Consolidate completion docs into 3 files
- [ ] Archive old seed files
- [ ] Document which seed file is production
- [ ] Move test files to tests/ directory

### Nice to Have (Optional)
- [ ] Remove lottie-react dependency
- [ ] Consider removing lucide-react
- [ ] Extract localStorage utility
- [ ] Add proper test framework

---

**Next Steps**: Review findings and approve action plan before executing cleanup.

---

*Report Generated: 2026-01-09*
*Analyzer: Claude Sonnet 4.5*
