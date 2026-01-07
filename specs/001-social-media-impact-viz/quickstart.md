# Quickstart: Social Media Impact Visualizer

**Feature**: 001-social-media-impact-viz
**Date**: 2026-01-07
**Audience**: Developers implementing this feature

## Overview

This guide helps you set up and run the Social Media Impact Visualizer locally. The project is a static website requiring minimal setup—no build tools, frameworks, or backend servers needed.

---

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge - last 2 versions)
- Local web server (for loading JSON data, see options below)
- Text editor or IDE
- Git (for version control)

---

## Project Structure

```
social_media_distractions/
├── public/                        # All static files served from here
│   ├── index.html                # Landing page
│   ├── styles/
│   │   ├── main.css             # Core layout & responsive styles
│   │   └── theme.css            # Colors, typography, light/dark themes
│   ├── scripts/
│   │   ├── main.js              # Entry point, form handling
│   │   ├── stats.js             # Data loading & querying
│   │   ├── visualizations.js    # Chart.js rendering & animations
│   │   └── theme.js             # Light/dark mode detection
│   ├── data/
│   │   └── statistics.json      # Age/gender statistics data
│   └── assets/
│       ├── images/              # Icons, logos
│       └── fonts/               # Custom fonts (if not using CDN)
├── specs/001-social-media-impact-viz/  # Design docs (not deployed)
│   ├── spec.md
│   ├── plan.md
│   ├── research.md
│   ├── data-model.md
│   ├── contracts/
│   └── quickstart.md            # This file
└── docs/
    ├── TESTING.md               # Manual testing checklist
    └── data-sources.md          # Research source citations
```

---

## Quick Start (5 Minutes)

### 1. Clone & Navigate

```bash
git clone <repository-url>
cd social_media_distractions
git checkout 001-social-media-impact-viz
```

### 2. Start Local Server

**Option A: Python (if installed)**
```bash
cd public
python3 -m http.server 8000
# or for Python 2:
python -m SimpleHTTPServer 8000
```

**Option B: Node.js http-server (if installed)**
```bash
npm install -g http-server  # First time only
cd public
http-server -p 8000
```

**Option C: PHP (if installed)**
```bash
cd public
php -S localhost:8000
```

**Option D: VS Code Live Server Extension**
1. Install "Live Server" extension in VS Code
2. Right-click `public/index.html`
3. Select "Open with Live Server"

### 3. Open in Browser

Navigate to: `http://localhost:8000`

You should see the landing page with an age input field.

---

## Development Workflow

### File Organization

| File | Purpose | When to Edit |
|------|---------|--------------|
| `index.html` | Page structure, form elements | Adding/removing UI elements |
| `styles/main.css` | Layout, responsive design, animations | Changing layout or responsiveness |
| `styles/theme.css` | Colors, fonts, light/dark themes | Adjusting visual design (FR-015, FR-016, FR-018) |
| `scripts/main.js` | Form handling, validation, orchestration | Changing user input flow |
| `scripts/stats.js` | Data loading, age/gender mapping | Modifying data queries or logic |
| `scripts/visualizations.js` | Chart.js rendering, counter animations | Adjusting charts or animations (FR-005, FR-017) |
| `scripts/theme.js` | Theme detection & switching | Modifying light/dark mode behavior |
| `data/statistics.json` | Statistical data | Updating research data |

### Making Changes

1. **Edit files** in `/public` directory
2. **Save changes**
3. **Refresh browser** (Ctrl/Cmd + R)
4. **Test** per `/docs/TESTING.md` checklist

No build step required—changes appear immediately on refresh.

---

## Key Implementation Details

### External Dependencies

**Chart.js v4.4.1** (loaded via CDN in `<head>`)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
```

No other external libraries required.

### Data File Format

`/public/data/statistics.json` structure (see `data-model.md` for full schema):

```json
{
  "ageGroups": {
    "18-24": {
      "all": {
        "dailyMinutes": 186,
        "platformBreakdown": { "tiktok": 76, "instagram": 53, ... },
        "notifications": 23,
        "distractionRate": 0.50,
        "topPlatforms": ["TikTok", "Instagram", "Snapchat"]
      },
      "male": { ... },
      "female": { ... }
    },
    "25-34": { ... }
  },
  "metadata": {
    "lastUpdated": "2026-01-07",
    "sources": [ ... ]
  }
}
```

### Platform Colors (FR-015)

Defined in `styles/theme.css`:

```css
--color-tiktok: #FE2C55;
--color-instagram-start: #833AB4;
--color-instagram-mid: #FD1D1D;
--color-instagram-end: #FCAF45;
--color-snapchat: #FFFC00;
--color-facebook: #1877F2;
--color-other: #808080;
```

### Typography (FR-018)

Recommended fun, engaging font options (choose one):

- **Poppins** (Google Fonts): Clean, modern, rounded
- **Quicksand** (Google Fonts): Friendly, geometric
- **Nunito** (Google Fonts): Rounded, playful
- **Space Grotesk** (Google Fonts): Modern, quirky

Include in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

Apply in `theme.css`:
```css
body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## Testing Your Changes

### Quick Functional Test

1. **Enter valid age** (e.g., 22) → Should display statistics
2. **Enter invalid age** (e.g., "abc") → Should show error message
3. **Select gender** → Statistics should update (if gender data available)
4. **Change age** → Charts should re-render smoothly
5. **Resize browser** (320px → 1920px) → Layout should adapt
6. **Toggle light/dark mode** (OS setting) → Theme should update

### Performance Check

Open DevTools (F12) → Network tab:
- **Page load**: <3 seconds (FR-011)
- **statistics.json**: <500ms
- **Chart render**: <1 second after data loads

### Cross-Browser Test

Test in at least 2 browsers from: Chrome, Firefox, Safari, Edge

### Mobile Test

Use DevTools device emulation:
- iPhone SE (375px width)
- iPad (768px width)
- Verify no horizontal scrolling

**Full testing checklist**: See `/docs/TESTING.md`

---

## Common Tasks

### Add New Age Group

1. **Update** `data/statistics.json`:
   ```json
   "ageGroups": {
     "45-54": {
       "all": { ... },
       "male": { ... },
       "female": { ... }
     }
   }
   ```

2. **Update** `scripts/stats.js` age mapping logic in `getStatisticsForAge()`

3. **Test** with ages in new range

### Update Platform Data

1. **Edit** `data/statistics.json`
2. **Update** `metadata.lastUpdated` date
3. **Refresh** browser to see changes

### Adjust Animation Speed

1. **Edit** `scripts/visualizations.js`
2. **Find** `animateCounter()` function
3. **Change** `duration` parameter (1000-2000ms recommended)
4. **Refresh** and test

### Change Color Scheme

1. **Edit** `styles/theme.css`
2. **Modify** CSS custom properties:
   ```css
   :root {
     --color-tiktok: #NEW_COLOR;
   }
   ```
3. **Update** both light and dark theme variants
4. **Test** contrast ratios (WCAG 2.1 AA: 4.5:1 minimum)

---

## Troubleshooting

### Issue: Charts not displaying

**Cause**: Chart.js not loaded or JavaScript error

**Fix**:
1. Check browser console (F12) for errors
2. Verify Chart.js CDN loaded in Network tab
3. Ensure `<script>` tags in correct order (Chart.js before visualizations.js)

### Issue: JSON data not loading

**Cause**: CORS policy blocking local file access

**Fix**:
- ✅ **Use local web server** (see Quick Start step 2)
- ❌ Don't open `index.html` directly (`file://` protocol)

### Issue: Animations not smooth

**Cause**: Browser performance or 60fps not achieved

**Fix**:
1. Check CPU usage (DevTools → Performance tab)
2. Reduce animation duration if needed
3. Test on different device

### Issue: Dark mode not working

**Cause**: OS theme detection failing or CSS not applied

**Fix**:
1. Check `theme.js` loaded correctly
2. Verify `data-theme` attribute on `<html>` element
3. Test `window.matchMedia('(prefers-color-scheme: dark)')` in console

---

## Deployment to Railway

### Prerequisites

1. GitHub repository connected to Railway
2. Railway account (free tier available)

### Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: social media impact visualizer"
   git push origin 001-social-media-impact-viz
   ```

2. **Connect to Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**:
   - Railway auto-detects static site
   - Set root directory: `/public`
   - Deploy

4. **Access**:
   - Railway provides a public URL: `https://[your-app].railway.app`
   - Custom domain can be added later

### Railway Configuration (Optional)

Create `railway.toml` in repository root if needed:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npx http-server public -p ${PORT}"
```

---

## Next Steps

### After Initial Implementation

1. **Run full testing checklist**: `/docs/TESTING.md`
2. **Validate against spec**: Check all FR requirements met
3. **Cross-browser test**: Chrome, Firefox, Safari, Edge
4. **Mobile test**: Real devices if possible
5. **Performance audit**: Lighthouse score >90
6. **Accessibility check**: WCAG 2.1 AA compliance (FR-016)

### Future Enhancements (Out of Scope for MVP)

- User preference saving (localStorage)
- Share functionality (social media sharing)
- Comparison view (compare multiple ages side-by-side)
- Historical trends (data over time)
- Additional statistics (screen time, app-specific data)

---

## Resources

### Documentation

- **Feature Spec**: `specs/001-social-media-impact-viz/spec.md`
- **Implementation Plan**: `specs/001-social-media-impact-viz/plan.md`
- **Data Model**: `specs/001-social-media-impact-viz/data-model.md`
- **Module Interfaces**: `specs/001-social-media-impact-viz/contracts/module-interfaces.md`
- **Research**: `specs/001-social-media-impact-viz/research.md`

### External Resources

- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [MDN Web Docs - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Fonts](https://fonts.google.com/)

### Data Sources

- See `/docs/data-sources.md` for research citations
- Pew Research Center, Statista, Common Sense Media

---

## Getting Help

**Questions about the spec?** See `specs/001-social-media-impact-viz/spec.md`

**Questions about implementation?** See `specs/001-social-media-impact-viz/plan.md` and contract docs

**Found a bug?** Check `docs/TESTING.md` for expected behavior, then file an issue

**Performance issues?** Review research.md for performance targets and optimization strategies
