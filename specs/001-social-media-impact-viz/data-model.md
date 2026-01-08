# Data Model: Social Media Impact Visualizer

**Feature**: 001-social-media-impact-viz
**Date**: 2026-01-07
**Phase**: 1 - Design

## Overview

This document defines the data structures for the static JSON file containing social media usage statistics and the client-side models used to represent and manipulate this data.

---

## Entity: StatisticsData

**Purpose**: Root container for all social media usage statistics organized by age and gender

**Location**: `/public/data/statistics.json`

**Structure**:

```json
{
  "ageGroups": {
    "[age-range-key]": {
      "all": { StatisticsMetrics },
      "male": { StatisticsMetrics },
      "female": { StatisticsMetrics }
    }
  },
  "metadata": {
    "lastUpdated": "YYYY-MM-DD",
    "sources": [ "string" ],
    "disclaimer": "string"
  }
}
```

**Fields**:

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `ageGroups` | Object | Map of age range keys to gender-specific data | Required, non-empty |
| `metadata` | Object | Information about data sources and freshness | Required |

---

## Entity: StatisticsMetrics

**Purpose**: Contains measurable statistics for a specific age/gender combination

**Structure**:

```json
{
  "dailyMinutes": number,
  "platformBreakdown": {
    "tiktok": number,
    "instagram": number,
    "snapchat": number,
    "facebook": number,
    "other": number
  },
  "notifications": number,
  "distractionRate": number,
  "topPlatforms": [ "string" ]
}
```

**Fields**:

| Field | Type | Description | Validation | Unit |
|-------|------|-------------|------------|------|
| `dailyMinutes` | Number | Total minutes spent on social media per day | ≥0, integer | minutes |
| `platformBreakdown` | Object | Minutes per platform per day | Each value ≥0, sum ≤ dailyMinutes | minutes |
| `notifications` | Number | Average daily notifications/messages received | ≥0, integer | count/day |
| `distractionRate` | Number | Percentage reporting social media as distraction source | 0.0-1.0 (e.g., 0.50 = 50%) | decimal |
| `topPlatforms` | Array<String> | Ordered list of most-used platforms for demographic | 1-5 platform names | — |

---

## Age Range Keys

**Convention**: Age ranges are represented as string keys in format `"min-max"`

**Supported Ranges** (from research data):

- `"18-24"`: Young adults, college-age
- `"25-34"`: Late twenties to early thirties
- `"13-17"`: Optional extension for teen data (edge case handling)
- `"35-44"`: Optional extension for broader audience

**Rationale**: String keys allow flexible age groupings matching research data granularity. Primary focus on 18-34 per spec.

---

## Gender Keys

**Convention**: Gender identifiers are lowercase strings

**Supported Values**:

- `"all"`: Aggregated data for all genders (default)
- `"male"`: Data specific to males
- `"female"`: Data specific to females

**Rationale**: Binary options match available research data. "all" provides fallback when gender-specific data unavailable (FR-009 requirement).

---

## Client-Side Model: UserInput

**Purpose**: Represents user-provided form data

**JavaScript Object**:

```javascript
{
  age: number,           // Integer 13-99
  gender: string | null  // "male", "female", or null (prefer not to say)
}
```

**Validation Rules** (from spec FR-002, FR-008):

| Field | Rule | Error Message |
|-------|------|---------------|
| `age` | Required, integer, 13 ≤ age ≤ 99 | "Please enter a valid age between 13 and 99" |
| `gender` | Optional, one of: "male", "female", null | (No error, default to null if not selected) |

---

## Client-Side Model: DisplayData

**Purpose**: Transformed data ready for visualization rendering

**JavaScript Object**:

```javascript
{
  userAge: number,
  ageRange: string,                 // e.g., "18-24"
  metrics: StatisticsMetrics,       // Matched from statistics.json
  chartData: {
    dailyUsage: ChartDataset,       // For Chart.js bar/line chart
    platformBreakdown: ChartDataset, // For Chart.js pie/doughnut chart
    notifications: number,
    distractionRate: string          // Formatted percentage (e.g., "50%")
  },
  dataSource: string                 // "male", "female", or "all"
}
```

**Derivation Logic**:

1. Map `UserInput.age` → closest `ageGroups[key]` in statistics.json
2. Select gender-specific metrics if `UserInput.gender` provided, else use "all"
3. Transform `StatisticsMetrics` into Chart.js-compatible format
4. Format percentages for display

---

## Chart Data Structures

### ChartDataset (Chart.js Format)

**Purpose**: Data structure consumed by Chart.js library

**Example for Bar Chart (Daily Usage)**:

```javascript
{
  labels: ['TikTok', 'Instagram', 'Snapchat', 'Facebook', 'Other'],
  datasets: [{
    label: 'Minutes per Day',
    data: [76, 53, 35, 22, 0],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ],
    borderWidth: 2
  }]
}
```

**Transformation Function**:

```javascript
function transformToChartData(platformBreakdown) {
  return {
    labels: Object.keys(platformBreakdown).map(capitalize),
    datasets: [{
      label: 'Minutes per Day',
      data: Object.values(platformBreakdown),
      backgroundColor: PLATFORM_COLORS.background,
      borderColor: PLATFORM_COLORS.border,
      borderWidth: 2
    }]
  };
}
```

---

## Data Relationships

```
StatisticsData (root)
  └── ageGroups: Map<string, GenderData>
       └── GenderData
            ├── all: StatisticsMetrics
            ├── male: StatisticsMetrics
            └── female: StatisticsMetrics

UserInput ──(lookup)──> StatisticsMetrics ──(transform)──> DisplayData ──(render)──> Chart.js
```

**Lookup Logic**:

1. `UserInput.age` (e.g., 22) → find matching `ageGroups` key (e.g., "18-24")
2. `UserInput.gender` (e.g., "male" or null) → select metrics from `male` or `all`
3. Return `StatisticsMetrics` object

---

## Validation Rules Summary

### Input Validation (Client-Side)

| Field | Rules | Error Handling |
|-------|-------|----------------|
| Age | Integer, 13-99, required | Show inline error message (spec FR-010) |
| Gender | Optional, radio button selection | Default to null if not selected |

### Data Integrity (statistics.json)

| Field | Rules | Fallback Behavior |
|-------|-------|-------------------|
| Age range match | Exact match preferred | If age=20 not found, use nearest range (18-24) |
| Gender-specific data | Use if available | Fall back to "all" if gender data missing (spec FR-009) |
| Missing platform data | Individual platforms may be 0 | Display "No data available" for missing platforms |

---

## Example: Complete statistics.json

```json
{
  "ageGroups": {
    "18-24": {
      "all": {
        "dailyMinutes": 186,
        "platformBreakdown": {
          "tiktok": 76,
          "instagram": 53,
          "snapchat": 35,
          "facebook": 22,
          "other": 0
        },
        "notifications": 23,
        "distractionRate": 0.50,
        "topPlatforms": ["TikTok", "Instagram", "Snapchat"]
      },
      "male": {
        "dailyMinutes": 178,
        "platformBreakdown": {
          "tiktok": 70,
          "instagram": 48,
          "snapchat": 30,
          "facebook": 20,
          "other": 10
        },
        "notifications": 20,
        "distractionRate": 0.48,
        "topPlatforms": ["TikTok", "Instagram", "Snapchat"]
      },
      "female": {
        "dailyMinutes": 193,
        "platformBreakdown": {
          "tiktok": 82,
          "instagram": 58,
          "snapchat": 40,
          "facebook": 13,
          "other": 0
        },
        "notifications": 26,
        "distractionRate": 0.52,
        "topPlatforms": ["TikTok", "Instagram", "Snapchat"]
      }
    },
    "25-34": {
      "all": {
        "dailyMinutes": 140,
        "platformBreakdown": {
          "tiktok": 50,
          "instagram": 37,
          "facebook": 26,
          "snapchat": 27,
          "other": 0
        },
        "notifications": 18,
        "distractionRate": 0.45,
        "topPlatforms": ["TikTok", "Instagram", "Facebook"]
      },
      "male": {
        "dailyMinutes": 133,
        "platformBreakdown": {
          "tiktok": 45,
          "instagram": 32,
          "facebook": 28,
          "snapchat": 20,
          "other": 8
        },
        "notifications": 16,
        "distractionRate": 0.42,
        "topPlatforms": ["TikTok", "Facebook", "Instagram"]
      },
      "female": {
        "dailyMinutes": 147,
        "platformBreakdown": {
          "tiktok": 55,
          "instagram": 42,
          "facebook": 24,
          "snapchat": 26,
          "other": 0
        },
        "notifications": 20,
        "distractionRate": 0.48,
        "topPlatforms": ["TikTok", "Instagram", "Snapchat"]
      }
    }
  },
  "metadata": {
    "lastUpdated": "2026-01-07",
    "sources": [
      "Pew Research Center - Americans' Social Media Use 2025",
      "Statista - Time Spent on Social Media by Age (U.S. 2024)",
      "Common Sense Media - Social Media & Youth Media Use Research"
    ],
    "disclaimer": "Statistics represent averages compiled from multiple research sources. Individual experiences may vary."
  }
}
```

---

## State Transitions

**User Journey Data Flow**:

```
1. User lands on page
   → DisplayData: null (show empty state / welcome screen)

2. User enters age (e.g., 22) and gender (e.g., "male")
   → UserInput: { age: 22, gender: "male" }

3. Form submission
   → Lookup: statistics.json["18-24"]["male"]
   → Transform: StatisticsMetrics → DisplayData

4. Render visualization
   → Chart.js consumes DisplayData.chartData
   → Display metrics (notifications, distraction rate)

5. User changes age (e.g., 28)
   → Lookup: statistics.json["25-34"]["male"]
   → Update DisplayData
   → Re-render charts (animate transition)
```

---

## Notes

- **No backend**: All data is static JSON, no API calls required
- **Offline capable**: Once statistics.json loaded, works without network
- **Data freshness**: Update statistics.json periodically from research sources (manual process)
- **Extensibility**: Can add more age ranges by adding keys to `ageGroups` object
- **Performance**: JSON file ~5-10KB uncompressed, loads in <100ms
