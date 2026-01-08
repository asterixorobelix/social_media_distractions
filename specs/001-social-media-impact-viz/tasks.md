# Tasks: Social Media Impact Visualizer

**Input**: Design documents from `/specs/001-social-media-impact-viz/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/

**Tests**: Not requested in specification - tests are OPTIONAL per constitution

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Static site**: `public/` at repository root
- All source files served directly from public/ directory
- Documentation in `docs/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directory structure per plan.md (public/, public/styles/, public/scripts/, public/data/, public/assets/, docs/)
- [x] T002 [P] Create docs/data-sources.md with research citations from research.md
- [x] T003 [P] Create docs/TESTING.md manual testing checklist from research.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create public/data/statistics.json with age groups 13-17, 18-24, 25-34, 35-44 using data from research.md
- [x] T005 [P] Set up Chart.js v4.4.1 CDN link in public/index.html head section
- [x] T006 [P] Create public/styles/theme.css with CSS custom properties for light/dark themes and platform-branded colors (TikTok #FE2C55, Instagram gradient, Snapchat #FFFC00, Facebook #1877F2)
- [x] T007 [P] Implement theme detection and application in public/scripts/theme.js using window.matchMedia for prefers-color-scheme
- [x] T008 Select and integrate fun, engaging typography from Google Fonts (Poppins, Quicksand, Nunito, or Space Grotesk) in public/index.html and public/styles/theme.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Age-Based Social Media Statistics Display (Priority: P1) 🎯 MVP

**Goal**: Users can enter their age and see visual statistics with animated charts showing social media usage for their age group

**Independent Test**: Enter age 22, verify bar chart displays platform breakdown (TikTok, Instagram, Snapchat, Facebook) and animated counters show daily minutes, notifications, and distraction rate

### Implementation for User Story 1

- [x] T009 [P] [US1] Create public/index.html with semantic HTML5 structure, age input form, and chart/stats containers
- [x] T010 [P] [US1] Implement validateAge() function in public/scripts/main.js to validate age 13-99 per FR-002
- [x] T011 [US1] Implement handleAgeSubmit() function in public/scripts/main.js to process form submission and orchestrate data flow
- [x] T012 [P] [US1] Implement loadStatisticsData() function in public/scripts/stats.js to fetch and parse public/data/statistics.json
- [x] T013 [P] [US1] Implement getStatisticsForAge() function in public/scripts/stats.js to map age to age group and retrieve metrics
- [x] T014 [US1] Implement formatMetricsForDisplay() function in public/scripts/stats.js to transform metrics into display-ready format
- [x] T015 [P] [US1] Implement renderPlatformChart() function in public/scripts/visualizations.js to create Chart.js bar chart with platform-branded colors
- [x] T016 [P] [US1] Implement animateCounter() function in public/scripts/visualizations.js with 1-2 second count-up animation using ease-out timing
- [x] T017 [US1] Implement renderCharts() function in public/scripts/visualizations.js to coordinate chart rendering and counter animations
- [x] T018 [US1] Implement displayError() function in public/scripts/main.js to show user-friendly error messages per FR-010
- [x] T019 [US1] Wire up form submission event listener in public/scripts/main.js to call handleAgeSubmit() on DOMContentLoaded
- [x] T020 [US1] Add supportive, normalizing messaging to public/index.html that reassures users distractions are common per FR-014

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can enter age, see animated charts and statistics.

---

## Phase 4: User Story 2 - Mobile Responsive Experience (Priority: P2)

**Goal**: Website adapts seamlessly to all screen sizes from 320px to 1920px with touch-friendly controls and no horizontal scrolling

**Independent Test**: Access site from smartphone (375px width), tablet (768px), and desktop (1920px). Verify charts scale, input fields are thumb-friendly (44px min), no horizontal scrolling, and device rotation works smoothly.

### Implementation for User Story 2

- [ ] T021 [P] [US2] Create public/styles/main.css with mobile-first responsive layout using CSS Grid or Flexbox
- [ ] T022 [P] [US2] Implement responsive breakpoints in public/styles/main.css for 320px, 375px, 768px, 1024px, 1920px viewports
- [ ] T023 [US2] Add meta viewport tag to public/index.html with width=device-width, initial-scale=1
- [ ] T024 [P] [US2] Style form input fields in public/styles/main.css with minimum 44px touch targets and 16px font size to prevent mobile zoom
- [ ] T025 [P] [US2] Configure Chart.js responsive options in public/scripts/visualizations.js (responsive: true, maintainAspectRatio: true)
- [ ] T026 [US2] Implement vertical stacking layout for mobile in public/styles/main.css with appropriate spacing and margins
- [ ] T027 [US2] Add CSS media queries in public/styles/main.css to handle device orientation changes (portrait/landscape)
- [ ] T028 [US2] Test and adjust font sizes in public/styles/main.css for readability across all viewport sizes (14px minimum for small screens)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Site is fully functional on desktop and mobile.

---

## Phase 5: User Story 3 - Gender-Specific Data Filtering (Priority: P3)

**Goal**: Users can optionally select gender (Male/Female/Prefer not to say) to see gender-specific statistics when available

**Independent Test**: Select "Male" before entering age 22. Verify statistics update to show male-specific data. Select "Female" and verify female-specific data displays. Leave gender unselected and verify general "all" data is shown.

### Implementation for User Story 3

- [ ] T029 [P] [US3] Add gender selection radio buttons (Male/Female/Prefer not to say) to public/index.html form
- [ ] T030 [P] [US3] Style gender selection controls in public/styles/main.css to match design and ensure mobile usability
- [ ] T031 [US3] Update handleAgeSubmit() in public/scripts/main.js to extract gender selection from form
- [ ] T032 [US3] Update getStatisticsForAge() in public/scripts/stats.js to accept gender parameter and select appropriate data (male/female/all)
- [ ] T033 [US3] Implement fallback logic in public/scripts/stats.js to use "all" data when gender-specific data unavailable per FR-009
- [ ] T034 [US3] Add visual indicator in public/index.html or public/scripts/visualizations.js to show when gender-specific vs general data is displayed
- [ ] T035 [US3] Update statistics display to show data source (male/female/all) in UI

**Checkpoint**: All user stories should now be independently functional. Full feature set complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality checks

- [ ] T036 [P] Add loading spinner or skeleton UI in public/index.html to display while statistics.json loads per FR-011
- [ ] T037 [P] Implement applySlideInAnimation() in public/scripts/visualizations.js with 1-second slide-in from bottom using CSS animation
- [ ] T038 [P] Add data source citations display in public/index.html footer linking to docs/data-sources.md
- [ ] T039 [P] Optimize CSS in public/styles/main.css and public/styles/theme.css for performance (remove unused rules, minify if needed)
- [ ] T040 [P] Add ARIA labels and roles to form controls in public/index.html for screen reader accessibility per FR-016
- [ ] T041 [P] Verify WCAG 2.1 AA contrast ratios for all text colors in public/styles/theme.css (4.5:1 minimum)
- [ ] T042 [P] Add error boundary/graceful degradation for Chart.js initialization failures in public/scripts/visualizations.js
- [ ] T043 [P] Add retry button for statistics.json load failures in public/scripts/main.js
- [ ] T044 Test complete user flow per docs/TESTING.md checklist on Chrome, Firefox, Safari, Edge
- [ ] T045 [P] Add favicon and page metadata (title, description, og:tags) to public/index.html
- [ ] T046 Create Railway deployment configuration or verify auto-detection works with public/ directory

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable

### Within Each User Story

- Tasks marked [P] within a story can run in parallel
- Non-parallel tasks must complete in order (e.g., T011 depends on T010 being complete)
- Module structure: main.js → stats.js → visualizations.js (sequential dependency within US1)

### Parallel Opportunities

- All Setup tasks (T001-T003) can run in parallel
- All Foundational tasks marked [P] (T005-T008) can run in parallel
- Once Foundational phase completes, all three user stories can start in parallel (if team capacity allows)
- Within each user story, all tasks marked [P] can run in parallel
- All Polish tasks marked [P] (T036-T043, T045) can run in parallel

---

## Parallel Example: User Story 1

```bash
# After Foundational phase completes, launch these US1 tasks together:
Task T009: Create public/index.html structure
Task T010: Implement validateAge() in main.js
Task T012: Implement loadStatisticsData() in stats.js
Task T013: Implement getStatisticsForAge() in stats.js
Task T015: Implement renderPlatformChart() in visualizations.js
Task T016: Implement animateCounter() in visualizations.js

# Then sequentially:
Task T011: Implement handleAgeSubmit() (depends on T010)
Task T014: Implement formatMetricsForDisplay() (depends on T013)
Task T017: Implement renderCharts() (depends on T015, T016)
Task T018: Implement displayError()
Task T019: Wire up event listeners (depends on T011)
Task T020: Add supportive messaging to HTML
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T008) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 (T009-T020)
4. **STOP and VALIDATE**: Test User Story 1 independently per docs/TESTING.md
5. Deploy to Railway for demo/feedback

**MVP Deliverable**: Functional website where users enter age and see animated statistics with platform-branded charts. Works on desktop only initially.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (8 tasks)
2. Add User Story 1 (T009-T020) → Test independently → Deploy/Demo (MVP! 12 tasks)
3. Add User Story 2 (T021-T028) → Test independently → Deploy/Demo (20 total tasks, mobile responsive)
4. Add User Story 3 (T029-T035) → Test independently → Deploy/Demo (27 total tasks, full feature set)
5. Add Polish (T036-T046) → Final testing → Production deploy (All 46 tasks complete)

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (8 tasks, ~2-3 hours)
2. Once Foundational is done:
   - **Developer A**: User Story 1 (12 tasks, ~4-6 hours)
   - **Developer B**: User Story 2 (8 tasks, ~3-4 hours, starts parallel but enhances US1)
   - **Developer C**: User Story 3 (7 tasks, ~2-3 hours, starts parallel but enhances US1)
3. Stories complete and integrate independently
4. Team completes Polish together (11 tasks, ~2-3 hours)

**Total time estimate**: 8-12 hours for MVP, 15-20 hours for full feature with polish

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No tests included (per constitution: tests OPTIONAL unless requested)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Static site = no build step required, changes reflect immediately on browser refresh
- Deployment to Railway: Push to GitHub, Railway auto-detects static site from public/ directory
