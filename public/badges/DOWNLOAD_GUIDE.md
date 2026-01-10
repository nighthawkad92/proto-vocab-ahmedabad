# Badge Illustration Download Guide

This guide will help you download free, public domain badge illustrations for the 8 badges in the gamification system.

## Quick Setup

All badges need to be 256×256px PNG files with transparent backgrounds.

---

## Recommended Sources

### 1. Flaticon (Free with Attribution)
- **URL**: https://www.flaticon.com
- **License**: Free with attribution
- **Quality**: High quality, consistent style
- **Format**: SVG, PNG, EPS

### 2. Icons8 (Free Tier)
- **URL**: https://icons8.com
- **License**: Free with attribution (up to 100/day)
- **Quality**: Multiple styles available
- **Format**: PNG, SVG

### 3. Game Icons (CC BY 3.0)
- **URL**: https://game-icons.net
- **License**: CC BY 3.0 (attribution required)
- **Quality**: Consistent game-style icons
- **Format**: SVG, PNG

### 4. Aiconica (Public Domain)
- **URL**: https://aiconica.net
- **License**: CC0 Public Domain (no attribution)
- **Quality**: Simple, clean icons
- **Format**: PNG, GIF (configurable size)

---

## Badge Requirements

### 1. first-steps.png
**Theme**: Footprints or path illustration
**Keywords**: footprints, first step, walking, path, journey

**Flaticon Options**:
- [5,434 Free Footprints Icons](https://www.flaticon.com/free-icons/footprints)
- [200 Footprints Pack by Freepik](https://www.flaticon.com/packs/footprints)
- [Single Footprints Icon](https://www.flaticon.com/free-icon/footprints_1649958)

**Recommended**: Green or blue footprints, simple design

---

### 2. week-warrior.png
**Theme**: Calendar with 7 checks or fire/streak icon
**Keywords**: fire, flame, streak, 7 days, calendar

**Flaticon Options**:
- [Free Fire Icons](https://www.flaticon.com/free-icons/fire)
- [Free Flame Icons](https://www.flaticon.com/free-icons/flame)

**Recommended**: Orange/red fire icon or calendar with checkmarks

---

### 3. perfect-practice.png
**Theme**: Bullseye or target with arrow
**Keywords**: bullseye, target, accuracy, precision, dart

**Flaticon Options**:
- [Free Target Icons](https://www.flaticon.com/free-icons/target)
- [Free Bullseye Icons](https://www.flaticon.com/free-icons/bullseye)

**Recommended**: Red and white target with arrow in center

---

### 4. bookworm.png
**Theme**: Book with worm or reading illustration
**Keywords**: book, reading, bookworm, library, learning

**Flaticon Options**:
- [Free Book Icons](https://www.flaticon.com/free-icons/book)
- [Free Reading Icons](https://www.flaticon.com/free-icons/reading)
- [Free Library Icons](https://www.flaticon.com/free-icons/library)

**Recommended**: Open book or stack of books, blue or brown color

---

### 5. century.png
**Theme**: "100" with celebration elements
**Keywords**: 100, hundred, century, perfect score, 100 percent

**Flaticon Options**:
- [Free 100 Icons](https://www.flaticon.com/free-icons/100)
- [Free Hundred Icons](https://www.flaticon.com/free-icons/hundred)
- [Free Perfect Score Icons](https://www.flaticon.com/search?word=perfect%20score)

**Recommended**: Bold "100" with sparkles or stars, red or gold

---

### 6. dedicated-learner.png
**Theme**: Star or medal
**Keywords**: star, medal, achievement, dedication, award

**Flaticon Options**:
- [Free Star Icons](https://www.flaticon.com/free-icons/star)
- [Free Medal Icons](https://www.flaticon.com/free-icons/medal)
- [Free Award Icons](https://www.flaticon.com/free-icons/award)

**Recommended**: Gold star with rays or medal, gold/yellow color

---

### 7. master-student.png
**Theme**: Crown or graduation cap
**Keywords**: crown, king, graduation, master, graduate, cap

**Flaticon Options**:
- [Free Crown Icons](https://www.flaticon.com/free-icons/crown)
- [Free Graduation Icons](https://www.flaticon.com/free-icons/graduation)
- [Free Graduate Icons](https://www.flaticon.com/free-icons/graduate)

**Recommended**: Gold crown or graduation cap, gold/black color

---

### 8. quick-learner.png
**Theme**: Lightning bolt
**Keywords**: lightning, bolt, thunder, fast, speed, quick

**Flaticon Options**:
- [Free Lightning Icons](https://www.flaticon.com/free-icons/lightning)
- [Free Bolt Icons](https://www.flaticon.com/free-icons/bolt)
- [Free Thunder Icons](https://www.flaticon.com/free-icons/thunder)

**Recommended**: Yellow or orange lightning bolt, simple design

---

## Download Instructions

### Option 1: Manual Download (Recommended)

1. Visit [Flaticon](https://www.flaticon.com)
2. Search for the icon using keywords above
3. Select an icon that matches the badge theme
4. Click "Download" button
5. Select **PNG format**, **256px size**
6. Download and rename to match badge filename
7. Move to `public/badges/` directory

### Option 2: Icons8 Download

1. Visit [Icons8](https://icons8.com)
2. Search for the icon
3. Select icon style (recommend "Color" or "Flat")
4. Click "Download"
5. Select **PNG**, **256px size**
6. Download and rename
7. Move to `public/badges/` directory

### Option 3: Aiconica (No Attribution)

1. Visit [Aiconica](https://aiconica.net)
2. Search or browse for icon
3. Configure size to **256×256**
4. Select **PNG format**
5. Download (no attribution required)
6. Rename and move to `public/badges/`

---

## Post-Download Optimization

After downloading all 8 images, optimize them for web:

### Using TinyPNG (Recommended)
1. Visit [TinyPNG](https://tinypng.com)
2. Upload all 8 PNG files
3. Download compressed versions
4. Replace originals in `public/badges/`

### Using ImageOptim (Mac)
```bash
brew install imageoptim
imageoptim public/badges/*.png
```

### Using pngquant (Command Line)
```bash
brew install pngquant
pngquant --quality=65-80 public/badges/*.png
```

---

## Verification Checklist

After downloading all images:

- [ ] All 8 files exist in `public/badges/`
- [ ] Files are exactly 256×256px
- [ ] Files are PNG format with transparency
- [ ] File sizes are optimized (< 50KB each)
- [ ] Filenames match exactly:
  - [ ] `first-steps.png`
  - [ ] `week-warrior.png`
  - [ ] `perfect-practice.png`
  - [ ] `bookworm.png`
  - [ ] `century.png`
  - [ ] `dedicated-learner.png`
  - [ ] `master-student.png`
  - [ ] `quick-learner.png`

---

## Attribution (If Required)

If using Flaticon or Icons8 free tier, add attribution to your app footer or credits page:

```html
<!-- Icons by Flaticon -->
Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

<!-- Icons by Icons8 -->
Icons by <a href="https://icons8.com">Icons8</a>
```

If using Aiconica (CC0), no attribution is required.

---

## Alternative: AI-Generated Icons

If you have access to AI image generation tools:

### Prompts for Each Badge:

1. **First Steps**: "Simple green footprints icon, flat design, transparent background, 256x256"
2. **Week Warrior**: "Orange fire flame icon, game badge style, transparent background, 256x256"
3. **Perfect Practice**: "Red and white bullseye target icon, flat design, transparent background, 256x256"
4. **Bookworm**: "Blue open book icon, simple illustration, transparent background, 256x256"
5. **Century**: "Bold number 100 with gold sparkles, achievement badge, transparent background, 256x256"
6. **Dedicated Learner**: "Gold star with rays, achievement medal, transparent background, 256x256"
7. **Master Student**: "Gold crown icon, royal badge, transparent background, 256x256"
8. **Quick Learner**: "Yellow lightning bolt icon, speed symbol, transparent background, 256x256"

---

## Testing After Download

1. Start development server: `npm run dev`
2. Complete a lesson to earn "First Steps" badge
3. Badge modal should display the PNG illustration
4. If image doesn't load, check browser console for errors
5. Verify all 8 badges display correctly

---

## Sources

- [Flaticon - Footprints Icons](https://www.flaticon.com/free-icons/footprints)
- [Flaticon - Achievements and Badges Pack](https://www.flaticon.com/packs/achievements-and-badges)
- [Icons8 Achievement Icons](https://iconscout.com/icons/achievement)
- [Aiconica - Public Domain Icons](https://aiconica.net/)
- [Game Icons - CC BY 3.0](https://game-icons.net)
- [CraftPix - Free Game Achievement Icons](https://craftpix.net/freebies/free-game-achievement-vector-rpg-icons/)

---

## Need Help?

If you encounter issues:
1. Check file naming (must be exact, lowercase, with hyphens)
2. Verify file size is 256×256px
3. Ensure PNG format with transparency
4. Check browser console for 404 errors
5. Clear browser cache and refresh

The system will automatically fall back to emoji icons if images fail to load.
