# Module Interfaces: Social Media Impact Visualizer

**Feature**: 001-social-media-impact-viz
**Date**: 2026-01-07
**Phase**: 1 - Design

## Overview

This document defines the JavaScript module interfaces and function contracts for the static web application. Since this is a client-side only application with no backend API, these contracts represent the internal module boundaries and data flow between JavaScript components.

---

## Module: main.js (Entry Point & User Input Handler)

**Responsibility**: Handle user input, form validation, orchestrate data flow between modules

### Function: `handleAgeSubmit(event)`

**Purpose**: Process form submission when user enters age and optional gender

**Input**:
```javascript
event: Event  // Form submit event
```

**Process**:
1. Prevent default form submission
2. Extract age from input field
3. Extract gender selection (if any)
4. Validate input using `validateAge()`
5. If valid: call `stats.fetchStatistics()` and `visualizations.renderCharts()`
6. If invalid: display error message

**Output**: `void`

**Error Handling**: Displays inline error message for invalid input

---

### Function: `validateAge(age)`

**Purpose**: Validate age input meets requirements (FR-002)

**Input**:
```javascript
age: string  // Raw input from form field
```

**Validation Rules**:
- Must be numeric (integer)
- Must be >= 13
- Must be <= 99
- No decimals, letters, or special characters

**Output**:
```javascript
{
  valid: boolean,
  error: string | null  // Error message if invalid, null if valid
}
```

**Examples**:
```javascript
validateAge("22")      → { valid: true, error: null }
validateAge("abc")     → { valid: false, error: "Please enter a valid age between 13 and 99" }
validateAge("-5")      → { valid: false, error: "Please enter a valid age between 13 and 99" }
validateAge("22.5")    → { valid: false, error: "Please enter a valid age between 13 and 99" }
```

---

### Function: `displayError(message)`

**Purpose**: Show user-friendly error message (FR-010)

**Input**:
```javascript
message: string  // Error message to display
```

**Output**: `void`

**Side Effects**: Modifies DOM to show error message with appropriate styling

---

## Module: stats.js (Statistics Data Handler)

**Responsibility**: Load, parse, and query statistical data

### Function: `loadStatisticsData()`

**Purpose**: Load statistics.json file (called once on page load)

**Input**: `void`

**Process**:
1. Fetch `/data/statistics.json`
2. Parse JSON
3. Store in module-level variable
4. Handle load failure gracefully

**Output**:
```javascript
Promise<StatisticsData>  // Resolves to full data object
```

**Error Handling**: Returns rejected promise if fetch fails; main.js displays error to user

---

### Function: `getStatisticsForAge(age, gender)`

**Purpose**: Retrieve relevant statistics for given age and gender (FR-013)

**Input**:
```javascript
age: number          // User's age (13-99)
gender: string|null  // "male", "female", or null
```

**Process**:
1. Map age to closest age group key (e.g., 22 → "18-24")
2. Select gender-specific data if available, else use "all"
3. Return StatisticsMetrics object

**Output**:
```javascript
{
  ageRange: string,               // e.g., "18-24"
  metrics: StatisticsMetrics,     // From data-model.md
  dataSource: string              // "male", "female", or "all"
}
```

**Age Mapping Logic**:
```javascript
13-17 → "13-17"
18-24 → "18-24"
25-34 → "25-34"
35-44 → "35-44"
45-99 → Use "35-44" as closest available (or display message about limited data)
```

---

### Function: `formatMetricsForDisplay(metrics)`

**Purpose**: Transform raw metrics into display-ready format

**Input**:
```javascript
metrics: StatisticsMetrics  // From data-model.md
```

**Process**:
1. Convert dailyMinutes to hours:minutes format
2. Format distractionRate as percentage string
3. Round numbers for display

**Output**:
```javascript
{
  dailyTime: string,              // e.g., "3h 6min"
  dailyMinutes: number,           // For counter animation
  notifications: number,
  distractionRate: string,        // e.g., "50%"
  distractionRateDecimal: number, // For potential chart use
  topPlatforms: Array<string>,
  platformBreakdown: Object       // Ready for chart
}
```

---

## Module: visualizations.js (Chart Rendering & Animations)

**Responsibility**: Render Chart.js visualizations and animate counters (FR-005, FR-017)

### Function: `renderCharts(displayData)`

**Purpose**: Render all visualizations after data is loaded

**Input**:
```javascript
displayData: {
  metrics: StatisticsMetrics,
  ageRange: string,
  dataSource: string
}
```

**Process**:
1. Render bar chart for platform breakdown using `renderPlatformChart()`
2. Animate numeric counters using `animateCounter()`
3. Add slide-in animations (FR-017)

**Output**: `void`

**Side Effects**: Modifies DOM, creates Chart.js instances

---

### Function: `renderPlatformChart(platformBreakdown)`

**Purpose**: Create bar chart showing time spent per platform (FR-015)

**Input**:
```javascript
platformBreakdown: {
  tiktok: number,
  instagram: number,
  snapchat: number,
  facebook: number,
  other: number
}
```

**Process**:
1. Transform data into Chart.js format
2. Apply platform-branded colors (FR-015):
   - TikTok: #FE2C55 (pink)
   - Instagram: linear gradient (#833AB4 → #FD1D1D → #FCAF45)
   - Snapchat: #FFFC00 (yellow)
   - Facebook: #1877F2 (blue)
   - Other: #808080 (gray)
3. Configure responsive options
4. Create Chart.js bar chart instance

**Output**:
```javascript
Chart  // Chart.js instance
```

**Configuration**:
```javascript
{
  type: 'bar',
  data: {
    labels: ['TikTok', 'Instagram', 'Snapchat', 'Facebook', 'Other'],
    datasets: [{
      label: 'Minutes per Day',
      data: [values],
      backgroundColor: [platform colors],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 1000,
      easing: 'easeOut'  // FR-017
    },
    plugins: {
      legend: { display: false }
    }
  }
}
```

---

### Function: `animateCounter(element, targetValue, duration)`

**Purpose**: Animate number from 0 to target value with count-up effect (FR-017)

**Input**:
```javascript
element: HTMLElement  // DOM element to update
targetValue: number   // Final value to count to
duration: number      // Animation duration in ms (1000-2000)
```

**Process**:
1. Use requestAnimationFrame for smooth 60fps animation
2. Implement ease-out timing function
3. Update element.textContent each frame
4. Complete at exactly targetValue

**Output**: `void`

**Timing**: 1-2 seconds per FR-017, 60fps

**Math**:
```javascript
easeOut(t) = 1 - (1 - t)^3  // Cubic ease-out
currentValue = targetValue * easeOut(progress)
```

---

### Function: `applySlideInAnimation(element)`

**Purpose**: Add CSS slide-in animation to chart container (FR-017)

**Input**:
```javascript
element: HTMLElement  // Chart container
```

**Process**:
1. Add CSS class triggering slide-in from bottom
2. 1-second duration with ease-out timing

**Output**: `void`

**CSS Animation**:
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Module: theme.js (Light/Dark Mode Handler)

**Responsibility**: Detect and apply light/dark theme (FR-016)

### Function: `detectThemePreference()`

**Purpose**: Detect user's OS theme preference

**Input**: `void`

**Process**:
1. Check `window.matchMedia('(prefers-color-scheme: dark)')`
2. Listen for theme changes
3. Apply appropriate CSS classes

**Output**:
```javascript
{
  theme: 'light' | 'dark',
  isSystemPreference: boolean
}
```

---

### Function: `applyTheme(theme)`

**Purpose**: Apply light or dark theme CSS variables

**Input**:
```javascript
theme: 'light' | 'dark'
```

**Process**:
1. Set CSS custom properties for:
   - Background color
   - Text color
   - Chart background
   - Input field styling
2. Ensure WCAG 2.1 AA contrast ratios (FR-016)

**Output**: `void`

**CSS Variables**:
```css
:root[data-theme="light"] {
  --bg-color: #FFFFFF;
  --text-color: #000000;
  --chart-bg: #F5F5F5;
}

:root[data-theme="dark"] {
  --bg-color: #121212;
  --text-color: #FFFFFF;
  --chart-bg: #1E1E1E;
}
```

---

## Data Flow Diagram

```
User Input (age, gender)
    ↓
main.js: handleAgeSubmit()
    ↓
main.js: validateAge()
    ↓ (if valid)
stats.js: getStatisticsForAge()
    ↓
stats.js: formatMetricsForDisplay()
    ↓
visualizations.js: renderCharts()
    ├→ renderPlatformChart()  (bar chart)
    ├→ animateCounter()       (daily minutes)
    ├→ animateCounter()       (notifications)
    └→ animateCounter()       (distraction %)
```

---

## Error Handling Strategy

| Module | Error Type | Handling |
|--------|-----------|----------|
| main.js | Invalid age input | Display inline error message, prevent submission |
| stats.js | statistics.json load failure | Display user-friendly error with retry button |
| stats.js | Age mapping fails | Use closest available age group with disclaimer |
| stats.js | Gender data unavailable | Fall back to "all" data, indicate to user (FR-009) |
| visualizations.js | Chart.js initialization fails | Log error, show static numbers without charts |
| theme.js | Theme detection fails | Default to light theme |

---

## Performance Contracts

**FR-011 Compliance**: Load and display statistics within 3 seconds

| Operation | Max Duration | Notes |
|-----------|--------------|-------|
| statistics.json fetch | 500ms | ~10KB file, local or CDN |
| Data parsing & mapping | 50ms | Pure JavaScript operations |
| Chart.js initialization | 300ms | Library load + render |
| Counter animations | 2000ms | Runs concurrently, doesn't block |
| **Total (critical path)** | **<1 second** | Leaves 2s buffer for network/device variance |

---

## Module Dependencies

```
index.html
├── Chart.js (CDN)
├── main.js
│   ├── requires: stats.js, visualizations.js
│   └── initializes: form event listeners
├── stats.js
│   ├── requires: data/statistics.json
│   └── provides: data access layer
├── visualizations.js
│   ├── requires: Chart.js, stats.js
│   └── provides: rendering layer
└── theme.js
    └── provides: theme management
```

**Load Order**:
1. Chart.js (CDN, in `<head>`)
2. theme.js (detect theme early to prevent flash)
3. stats.js
4. visualizations.js
5. main.js (DOMContentLoaded)

---

## Testing Contracts

**Manual Testing Checklist** (per research.md):

Each function should be testable via browser console:

```javascript
// Validate age function
validateAge("22")   // Should return { valid: true, error: null }
validateAge("abc")  // Should return { valid: false, error: "..." }

// Get statistics
getStatisticsForAge(22, "male")  // Should return data for 18-24 male

// Animation timing
// Counter should complete in 1-2 seconds, 60fps
// Charts should slide in over 1 second
```

**Cross-browser compatibility**: Test in Chrome, Firefox, Safari, Edge (last 2 versions)

**Mobile responsiveness**: Test at 320px, 375px, 768px, 1920px widths
