# Research: Social Media Impact Visualizer

**Feature**: 001-social-media-impact-viz
**Date**: 2026-01-07
**Phase**: 0 - Technical Research

## Overview

This document resolves all "NEEDS CLARIFICATION" items from the Technical Context section of plan.md through research and evaluation of available options.

---

## Research Area 1: Chart/Visualization Library

### Decision: Chart.js v4.x

### Rationale

Chart.js is the optimal choice for a simple static website requiring lightweight, mobile-responsive visualizations:

- **Lightweight**: 11-12 KB minified + gzipped (well under 50KB requirement)
- **Zero build tools**: Include via CDN, works directly in browser
- **Mobile responsive**: Automatically scales to container dimensions
- **Simple API**: Minimal configuration for bar/line charts
- **Excellent documentation**: Comprehensive official docs with examples
- **Active maintenance**: Regular updates, large community support
- **MIT licensed**: Free and open source

### Alternatives Considered

| Library | Size | Pros | Rejected Because |
|---------|------|------|------------------|
| **Chartist.js** | ~10 KB | Very lightweight, SVG-based | Less active maintenance, fewer features, limited animations |
| **ApexCharts** | ~108 KB | Beautiful defaults, extensive features | Exceeds 50KB requirement by 2x, overkill for simple needs |
| **D3.js** | 120+ KB | Maximum customization | Steep learning curve, 10x complexity, violates YAGNI principle |
| **ECharts** | Varies | Powerful, server-rendering option | Full version too large, lightweight runtime requires SSR setup |

### Implementation Details

**CDN Include**:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
```

**Basic Usage Pattern**:
```javascript
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: { /* data */ },
  options: {
    responsive: true,
    maintainAspectRatio: true
  }
});
```

### Sources
- [Chart.js Official Documentation](https://www.chartjs.org/)
- [Comparing JavaScript Charting Libraries - LogRocket](https://blog.logrocket.com/comparing-most-popular-javascript-charting-libraries/)
- [Best JavaScript Chart Libraries 2026 - Embeddable](https://embeddable.com/blog/javascript-charting-libraries)

---

## Research Area 2: Statistical Data Sources

### Decision: Multi-source aggregation from Pew Research, Statista, and Common Sense Media

### Rationale

Public research data exists from credible sources covering:
- Age-specific usage patterns (18-35 demographic)
- Gender-specific data where available
- Message/notification frequency
- Time spent on social media platforms
- Distraction metrics

Data will be manually compiled into a static JSON file embedded in the application. This approach:
- Requires no API keys or external dependencies
- Works offline after initial page load
- Ensures fast load times (<3 seconds)
- Aligns with static site architecture

### Key Statistics to Include

**Ages 18-24:**
- Daily time spent: 186 minutes (3.1 hours)
- TikTok: 76 min/day, Instagram: 53 min/day, Snapchat: 35 min/day
- Average notifications: ~23 messages/day
- 50% report social media distracts them from daily tasks

**Ages 25-34:**
- Daily time spent: 140 minutes (2.3 hours)
- TikTok: 50 min/day, Instagram: 37 min/day, Facebook: 26 min/day
- Similar distraction patterns

**Gender Differences:**
- Women spend ~15 minutes more daily on social media than men
- Women prefer Instagram, TikTok, Facebook
- Men prefer YouTube, X (Twitter), Reddit

### Data Structure

Create `/public/data/statistics.json`:
```json
{
  "ageGroups": {
    "18-24": {
      "all": { "dailyMinutes": 186, "notifications": 23, "distractionRate": 0.50 },
      "male": { "dailyMinutes": 178, "notifications": 20, "distractionRate": 0.48 },
      "female": { "dailyMinutes": 193, "notifications": 26, "distractionRate": 0.52 }
    },
    "25-34": { /* similar structure */ }
  },
  "sources": [
    "Pew Research Center - Americans' Social Media Use 2025",
    "Statista - Time Spent on Social Media by Age (U.S. 2024)",
    "Common Sense Media - Social Media & Youth Media Use Research"
  ]
}
```

### Sources
- [Pew Research Center - Americans' Social Media Use 2025](https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/)
- [Statista - Time Spent on Social Media by Age](https://www.statista.com/statistics/1484565/time-spent-social-media-us-by-age/)
- [Common Sense Media Research](https://www.commonsensemedia.org/research)
- [Journal of Computer-Mediated Communication - Social Media and Distraction](https://www.tandfonline.com/doi/full/10.1080/15213269.2021.1959350)
- [Gallup - Teens and Social Media Usage](https://news.gallup.com/poll/512576/teens-spend-average-hours-social-media-per-day.aspx)

---

## Research Area 3: Browser Testing Approach

### Decision: Manual Testing Checklist (Option 1)

### Rationale

For an MVP with ~5 screens and <500 lines of code, a manual testing checklist aligns best with constitution principles:

**Simplicity & YAGNI:**
- Zero dependencies (no Playwright, Cypress, or test framework)
- Zero infrastructure (no CI/CD test pipelines needed initially)
- Zero maintenance burden (no brittle test selectors to update)
- 15-20 minutes to execute vs. 3+ hours to set up automation

**Visual-First Design:**
- Manual testing catches layout shifts, animation quality, responsive breakpoint issues
- Human verification ensures "visually engaging" requirement is met
- Screenshot tests cannot assess if chart animations "feel right"

**Testing Philosophy from Constitution:**
- Tests are OPTIONAL per constitution
- Focus on integration tests over unit tests
- Test user-visible behavior

### Implementation

Create `/docs/TESTING.md` with comprehensive checklist covering:

1. **Device/Browser Matrix**: Desktop (1920px), Tablet (768px), Mobile (375px, 320px)
2. **Browser Coverage**: Chrome, Firefox, Safari, Edge (last 2 versions each)
3. **Functional Testing**: Age input, statistics display, gender filtering
4. **Responsive Design**: No horizontal scrolling, touch targets, device rotation
5. **Performance**: <3s load time, <1s chart render, 60fps animations
6. **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, contrast ratios

### Testing Tools (Free)

- **Browser DevTools**: Device emulation, network throttling, responsive design mode
- **Chrome Extensions**: axe DevTools (accessibility), Lighthouse (performance)
- **Manual Devices**: Test on actual phones/tablets when available

### Growth Path

If testing becomes a bottleneck (frequent regressions, rapid iteration), migrate to automated testing:

**Phase 2 (if needed):**
- Playwright for cross-browser automation
- GitHub Actions for CI/CD integration
- Minimal test suite (~5 tests covering critical paths)

This preserves the option to automate later without upfront complexity cost.

### Alternative Considered

**Playwright + GitHub Actions** was evaluated but rejected for MVP phase because:
- 2-3 hours setup + 1 hour/week maintenance overhead
- Overkill for current scope (5 screens, small codebase)
- Automated tests miss visual nuances critical to "Visual-First Design" principle
- Can implement later if scope expands

### Sources
- [Playwright Official Documentation](https://playwright.dev/)
- [MDN - Cross-Browser Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Research Area 4: Deployment Platform

### Decision: Railway (Static Site Hosting)

### Rationale

Railway provides the simplest deployment path for a static website:

**Pros:**
- **Zero configuration**: Detects static files automatically
- **Free tier**: Sufficient for MVP traffic (<1000 concurrent users)
- **HTTPS included**: SSL certificates automatically provisioned
- **GitHub integration**: Deploy on every push to main branch
- **Custom domains**: Easy to add later
- **No build step needed**: Serves static files directly from `/public` directory

**Deployment Process:**
1. Connect GitHub repository to Railway
2. Select `/public` as root directory
3. Deploy automatically on push

### Alternatives Considered

| Platform | Pros | Rejected Because |
|----------|------|------------------|
| **Netlify** | Excellent static hosting, great DX | Similar to Railway, no compelling advantage |
| **Vercel** | Fast CDN, serverless functions | Overkill for static site, serverless not needed |
| **GitHub Pages** | Free, built-in to GitHub | Requires Jekyll setup or gh-pages branch management |
| **Cloudflare Pages** | Fast CDN, unlimited bandwidth | More complex setup than Railway |

Railway selected for **simplicity** (aligns with constitution) and **user familiarity** (mentioned in user input).

### Implementation

**railway.toml** (optional, for explicit configuration):
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npx http-server public -p ${PORT}"
```

Alternatively, Railway auto-detects static sites and serves them without configuration.

### Sources
- [Railway Documentation](https://docs.railway.app/)
- [Railway Static Site Deployment Guide](https://docs.railway.app/guides/static-sites)

---

## Updated Technical Context

Based on research findings, update plan.md Technical Context section:

**Language/Version**: HTML5, CSS3, JavaScript (ES6+)
**Primary Dependencies**: Chart.js v4.4.1 (11KB, CDN-hosted)
**Storage**: Static JSON files (embedded statistical data)
**Testing**: Manual testing checklist (see /docs/TESTING.md)
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Web (static frontend)
**Performance Goals**: <3 second load time, <1 second chart render time, 60fps animations
**Constraints**: Mobile-first responsive design (320px-1920px), accessible (WCAG 2.1 AA)
**Scale/Scope**: Public informational site, <1000 concurrent users, ~5 screens, <500 LOC
**Deployment**: Railway (static site hosting with auto-deploy from GitHub)

---

## Next Steps

Proceed to **Phase 1: Design & Contracts**
1. Create data-model.md (data structures for statistics.json)
2. Define API contracts (if any client-side "API" structure needed)
3. Create quickstart.md (developer setup instructions)
4. Update agent context with selected technologies
