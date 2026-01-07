<!--
  Sync Impact Report - Constitution Update

  Version Change: N/A → 1.0.0
  Change Type: MAJOR (Initial ratification)

  Modified Principles: N/A (initial version)
  Added Sections: All (initial creation)
  - Core Principles (I. Visual-First Design, II. Simplicity & YAGNI)
  - Development Standards
  - Governance

  Removed Sections: N/A

  Templates Requiring Updates:
  ✅ .specify/templates/plan-template.md - Constitution Check references updated
  ✅ .specify/templates/spec-template.md - Requirements aligned with principles
  ✅ .specify/templates/tasks-template.md - Task structure supports principles

  Follow-up TODOs: None

  Rationale: Initial constitution for social_media_distractions project focusing on
  visual display of social media distractions. Two core principles selected to keep
  governance lightweight while ensuring quality standards for visual design and
  simplicity.
-->

# Social Media Distractions Constitution

## Core Principles

### I. Visual-First Design

Every feature prioritizes the visual experience and user interface quality. Designs
must be intentional, distinctive, and production-grade, avoiding generic or
placeholder aesthetics. Visual feedback, animations, and presentation details are
first-class concerns, not afterthoughts.

**Rationale**: This project exists to visually display social media distractions.
The visual presentation is the core value proposition, making design quality
non-negotiable for project success.

**Rules**:
- Visual design decisions MUST be explicit and justified in specifications
- UI components MUST have clear visual behavior descriptions
- Color schemes, typography, and layouts MUST be specified before implementation
- Visual states (loading, error, success) MUST be designed
- Accessibility standards MUST be met (contrast ratios, screen reader support)

### II. Simplicity & YAGNI (You Aren't Gonna Need It)

Start with the simplest implementation that solves the current problem. Avoid
premature abstractions, over-engineering, and speculative features. Three similar
lines of code are better than a premature abstraction. Complexity requires explicit
justification against simpler alternatives.

**Rationale**: Early-stage projects suffer more from unnecessary complexity than
from missing features. Keeping the codebase simple allows rapid iteration and
easier maintenance.

**Rules**:
- Implement ONLY explicitly requested features
- Reject abstractions until third concrete use case emerges
- Prefer duplication over wrong abstraction
- Remove unused code completely (no commented-out code, no backwards-compatibility
  shims for nonexistent use cases)
- New dependencies MUST be justified against built-in alternatives

## Development Standards

### Code Quality
- Write self-documenting code; add comments only where logic is not self-evident
- Remove dead code immediately (no `_unused` renames, no `// removed` comments)
- Use meaningful names that reveal intent
- Keep functions small and focused on single responsibility

### Visual Standards
- Support both light and dark themes where applicable
- Provide loading states for async operations
- Handle error states gracefully with clear visual feedback
- Ensure responsive design across common viewport sizes
- Maintain consistent spacing, typography, and color usage

### Testing Philosophy
- Tests are OPTIONAL unless explicitly requested in feature specification
- When tests are required, write them before implementation
- Focus on integration tests over unit tests for visual features
- Test user-visible behavior, not implementation details

## Governance

### Constitution Authority
This constitution supersedes all other development practices. When conflicts arise,
constitutional principles take precedence. Amendments require documented rationale
and approval.

### Versioning
Constitution follows semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Backward-incompatible governance changes, principle removals/redefinitions
- **MINOR**: New principles added or existing principles materially expanded
- **PATCH**: Clarifications, wording improvements, typo fixes

### Compliance
- All feature specifications MUST explicitly reference relevant constitutional
  principles
- Implementation plans MUST include Constitution Check section validating compliance
- Any violation of core principles MUST be explicitly justified with rationale for
  why simpler alternatives are insufficient

### Amendment Process
1. Propose change with clear rationale
2. Document impact on existing templates and workflows
3. Obtain approval from project maintainer(s)
4. Update constitution with incremented version
5. Propagate changes to affected templates and documentation
6. Include Sync Impact Report as HTML comment at top of file

**Version**: 1.0.0 | **Ratified**: 2026-01-07 | **Last Amended**: 2026-01-07
