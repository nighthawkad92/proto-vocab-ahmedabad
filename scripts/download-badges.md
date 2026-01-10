# Badge Download Helper - Direct Links

Since automated downloading requires authentication, here are **direct links** to curated, high-quality icons from Flaticon that match each badge perfectly. These are all free to use with attribution.

---

## Quick Download Instructions

1. Click each link below
2. Click the "Download" button on the page
3. Select **PNG format**
4. Select **256px size**
5. Save with the exact filename listed
6. Move to `public/badges/` directory

---

## Direct Download Links

### 1. first-steps.png
**🦶 Footprints Icon**

**Option A** (Recommended):
- URL: https://www.flaticon.com/free-icon/footprints_1649958
- Style: Simple green footprints
- Designer: Freepik

**Option B**:
- URL: https://www.flaticon.com/free-icon/footprints_22796
- Style: Blue footprints
- Designer: Freepik

---

### 2. week-warrior.png
**🔥 Fire/Flame Icon**

**Option A** (Recommended):
- Search: https://www.flaticon.com/search?word=fire
- Suggested: Icon ID #785116 (orange flame)
- Style: Flat fire icon
- Designer: Freepik

**Option B**:
- Search: https://www.flaticon.com/search?word=streak
- Suggested: Flame with 7 marks
- Style: Game badge style

---

### 3. perfect-practice.png
**🎯 Target/Bullseye Icon**

**Option A** (Recommended):
- Search: https://www.flaticon.com/search?word=bullseye
- Suggested: Red and white target with arrow
- Style: Flat design
- Designer: Freepik

**Option B**:
- Search: https://www.flaticon.com/search?word=target
- Suggested: Dart board icon
- Style: Game icon

---

### 4. bookworm.png
**📚 Book Icon**

**Option A** (Recommended):
- Search: https://www.flaticon.com/search?word=open%20book
- Suggested: Blue open book icon
- Style: Flat illustration
- Designer: Freepik

**Option B**:
- Search: https://www.flaticon.com/search?word=reading
- Suggested: Stack of books
- Style: Simple flat design

---

### 5. century.png
**💯 Number 100 Icon**

**Option A** (Recommended):
- Search: https://www.flaticon.com/search?word=100%20percent
- Suggested: Red "100" with circle
- Style: Bold number
- Designer: Freepik

**Option B**:
- Search: https://www.flaticon.com/search?word=hundred
- Suggested: Gold "100" with stars
- Style: Achievement badge

---

### 6. dedicated-learner.png
**⭐ Star/Medal Icon**

**Option A** (Recommended):
- Search: https://www.flaticon.com/search?word=gold%20star
- Suggested: Yellow star with rays
- Style: Flat star icon
- Designer: Freepik

**Option B**:
- Search: https://www.flaticon.com/search?word=medal
- Suggested: Gold medal icon
- Style: Achievement medal

---

### 7. master-student.png
**👑 Crown Icon**

**Option A** (Recommended):
- Search: https://www.flaticon.com/search?word=crown
- Suggested: Gold crown icon
- Style: Royal crown
- Designer: Freepik

**Option B**:
- Search: https://www.flaticon.com/search?word=graduation%20cap
- Suggested: Black graduation cap
- Style: Education icon

---

### 8. quick-learner.png
**⚡ Lightning Bolt Icon**

**Option A** (Recommended):
- Search: https://www.flaticon.com/search?word=lightning%20bolt
- Suggested: Yellow lightning bolt
- Style: Simple flat design
- Designer: Freepik

**Option B**:
- Search: https://www.flaticon.com/search?word=thunder
- Suggested: Orange lightning
- Style: Power/speed icon

---

## Alternative: Simple Colored Icons

If you want a quick, consistent set, use the **Flaticon Achievement Pack**:

**📦 Achievements and Badges Pack** (50 icons):
- URL: https://www.flaticon.com/packs/achievements-and-badges
- Designer: flatart_icons
- Style: Consistent colorful badges
- Format: SVG, PNG, EPS

This pack contains pre-made achievement badges that you can adapt:
- Trophy for "First Steps"
- Flame for "Week Warrior"
- Target for "Perfect Practice"
- Book for "Bookworm"
- "100" badge for "Century"
- Star for "Dedicated Learner"
- Crown for "Master Student"
- Lightning for "Quick Learner"

---

## One-Click Alternative: Icons8

If Flaticon requires too much manual work, try Icons8's direct download:

### Icons8 Direct Links:

1. **First Steps**: https://icons8.com/icon/11716/footsteps
2. **Week Warrior**: https://icons8.com/icon/27831/fire
3. **Perfect Practice**: https://icons8.com/icon/67821/bullseye
4. **Bookworm**: https://icons8.com/icon/26212/book
5. **Century**: https://icons8.com/icon/98978/100
6. **Dedicated Learner**: https://icons8.com/icon/7880/star
7. **Master Student**: https://icons8.com/icon/13156/crown
8. **Quick Learner**: https://icons8.com/icon/110/lightning-bolt

**Download Process**:
1. Click link
2. Click "Download" (select PNG, 256px)
3. Free tier requires Icons8 attribution

---

## Batch Download Script (Manual)

Since you need to download each icon manually, here's a checklist:

```bash
# Create a checklist file
cd public/badges

# Download each icon and rename:
# 1. Download from Flaticon/Icons8
# 2. Rename to exact filename
# 3. Verify 256x256 size
# 4. Move to this directory

# Checklist:
echo "[ ] first-steps.png"
echo "[ ] week-warrior.png"
echo "[ ] perfect-practice.png"
echo "[ ] bookworm.png"
echo "[ ] century.png"
echo "[ ] dedicated-learner.png"
echo "[ ] master-student.png"
echo "[ ] quick-learner.png"
```

---

## After Download: Optimize

```bash
# If you have ImageMagick installed:
cd public/badges
mogrify -resize 256x256 *.png
mogrify -strip *.png  # Remove metadata

# Or use TinyPNG website:
# https://tinypng.com - upload all 8 files
```

---

## Verify Installation

```bash
# Check all files exist and are correct size
cd public/badges
ls -lh *.png

# Should show 8 files, each around 10-50KB
# Expected output:
# first-steps.png
# week-warrior.png
# perfect-practice.png
# bookworm.png
# century.png
# dedicated-learner.png
# master-student.png
# quick-learner.png
```

---

## Test in App

```bash
# Start dev server
npm run dev

# Navigate to http://localhost:3000
# Log in as student
# Complete a lesson
# Verify badge modal shows PNG image (not emoji)
```

---

## Attribution Template

Add to your app's footer or credits page:

```html
<footer>
  <p>Badge icons by
    <a href="https://www.flaticon.com/authors/freepik">Freepik</a>
    from <a href="https://www.flaticon.com">Flaticon</a>
  </p>
</footer>
```

Or if using Icons8:

```html
<footer>
  <p>Badge icons by <a href="https://icons8.com">Icons8</a></p>
</footer>
```

---

## Sources

- [Flaticon - 5,434 Footprints Icons](https://www.flaticon.com/free-icons/footprints)
- [Flaticon - Achievements and Badges Pack](https://www.flaticon.com/packs/achievements-and-badges)
- [Icons8 - Free Icons with Attribution](https://icons8.com)
- [Aiconica - Public Domain Icons (No Attribution)](https://aiconica.net/)

---

## Need Help?

If download links are broken or you need assistance:
1. Visit [Flaticon's icon search](https://www.flaticon.com/search)
2. Search for each badge keyword
3. Sort by "Most Downloaded" for quality icons
4. Download PNG at 256px size
5. Rename to match badge filenames exactly

Remember: The app will work with emoji fallbacks if images aren't ready yet!
