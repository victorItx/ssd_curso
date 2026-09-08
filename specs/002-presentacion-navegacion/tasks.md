# Tasks: Presentacion y navegacion de PresupuestosPro

**Input**: Design documents from `/specs/002-presentacion-navegacion/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Tests**: Incluidos para proteger el contrato de presentación y evitar regresiones en el documento y en la lógica existente.

**Organization**: Tasks are grouped by user story and ordered by dependency.

## Phase 1: Setup

**Purpose**: Confirm the existing project boundaries before changing presentation code.

- [X] T001 Verify the existing Node.js project setup, `package.json`, and `.gitignore` without adding new runtime dependencies
- [X] T002 [P] Review `public/index.html`, `server.js`, and `app/pdf/pdf_export.js` against the feature plan and record the existing public PDF return shape in `specs/002-presentacion-navegacion/contracts/ui-contract.md`

## Phase 2: Foundational

**Purpose**: Establish presentation-only helpers and regression coverage before user-story implementation.

- [X] T003 Add presentation contract tests for required navigation labels, status labels, and preserved PDF fields in `tests/presentation.test.js`
- [X] T004 [P] Add a pure status-count projection helper for the home summary in `public/index.html` without changing storage or quote entities
- [X] T005 [P] Define the shared visual tokens and status presentation rules in the centralized style block of `public/index.html`

**Checkpoint**: Presentation contracts and shared visual foundations are ready; existing business modules remain untouched.

## Phase 3: User Story 1 - Encontrar cualquier sección desde el inicio (Priority: P1) 🎯 MVP

**Goal**: Provide a useful root page with four visible destinations, read-only activity counts, and common navigation.

**Independent Test**: Open the server root, identify the four sections and status counts, visit every section through common navigation, and verify empty activity states without changing stored data.

### Tests for User Story 1

- [X] T006 [US1] Extend `tests/presentation.test.js` with root-page, navigation, empty-state, and status-count assertions before implementation

### Implementation for User Story 1

- [X] T007 [US1] Refactor the shell markup in `public/index.html` to add a home view, common navigation, active-section indication, and four section views while preserving existing form controls and IDs
- [X] T008 [US1] Implement home activity counters and empty-state rendering in the inline presentation controller of `public/index.html` using existing quote data only
- [X] T009 [US1] Connect the existing profile, catalog, quote, customer, summary, and history content to their corresponding presentation sections in `public/index.html` without changing business calculations
- [X] T010 [US1] Add mobile-safe navigation behavior and direct section selection in `public/index.html` without requiring browser back navigation

**Checkpoint**: User Story 1 is independently usable from the server root.

## Phase 4: User Story 2 - Reconocer y usar una interfaz coherente (Priority: P1)

**Goal**: Apply the professional visual system and accessible status treatment across all views without changing functional behavior.

**Independent Test**: Review all four sections on mobile and desktop, confirm consistent hierarchy and spacing, and distinguish all five status labels using text plus a non-color signal.

### Tests for User Story 2

- [X] T011 [US2] Extend `tests/presentation.test.js` with assertions for centralized visual tokens, all five status labels, and non-color status markers

### Implementation for User Story 2

- [X] T012 [US2] Replace the existing visual rules in `public/index.html` with the planned limited palette, typography, spacing scale, hierarchy, focus states, and responsive layout rules
- [X] T013 [US2] Add consistent status badges or labels for Borrador, Enviado, Aceptado, Rechazado, and Caducado in every existing quote presentation surface in `public/index.html`
- [X] T014 [US2] Add accessible labels, focus visibility, semantic landmarks, and long-text handling to the shared navigation, forms, tables, totals, and status presentations in `public/index.html`
- [X] T015 [US2] Verify that the responsive layout avoids page-level horizontal overflow and preserves all existing actions and values on narrow screens

**Checkpoint**: User Story 2 is independently usable and visually consistent on supported viewport sizes.

## Phase 5: User Story 3 - Entregar un PDF alineado con la aplicación (Priority: P2)

**Goal**: Apply the shared document hierarchy while preserving the current PDF contract, validation, values, and download behavior.

**Independent Test**: Export a valid quote, compare all source values with the document, inspect the shared visual hierarchy, and confirm invalid quotes remain blocked.

### Tests for User Story 3

- [X] T016 [US3] Extend `tests/presentation.test.js` with valid and invalid document assertions for preserved fields, values, status text, and validation messages before implementation

### Implementation for User Story 3

- [X] T017 [US3] Update `app/pdf/pdf_export.js` to compose the existing document text with shared visual labels, section ordering, and status presentation without changing calculations or public function names
- [X] T018 [US3] Preserve the no-logo fallback, invalid-line message, `valid` flag, `message`, `pages[].text`, and `downloadName` behavior in `app/pdf/pdf_export.js`
- [X] T019 [US3] Align PDF headings, totals, dates, customer details, line details, and status labels with the visual rules documented in `specs/002-presentacion-navegacion/contracts/ui-contract.md`

**Checkpoint**: User Story 3 preserves the existing document contract and presents a coherent professional document.

## Phase 6: Polish & Cross-Cutting Validation

**Purpose**: Validate the complete feature and ensure no business behavior or data surface changed.

- [ ] T020 [P] Run `npm test` and confirm existing profile, catalog, quote, calculation, and PDF validation tests pass
- [ ] T021 [P] Validate root entry, common navigation, activity counts, empty states, status markers, mobile layout, and long text using `specs/002-presentacion-navegacion/quickstart.md`
- [X] T022 [P] Review `git diff` for forbidden changes to `shared/calculations/`, `shared/rules/`, models, storage, API behavior, and schema
- [ ] T023 Mark completed tasks `[X]` in this file and record any residual presentation limitations in the implementation summary

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: No dependencies; confirms the existing project boundary.
- **Phase 2**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2 and delivers the MVP entry/navigation experience.
- **Phase 4 (US2)**: Depends on the shared shell from US1 because the visual system must cover all section views.
- **Phase 5 (US3)**: Depends on the visual tokens from Phase 2 and the status vocabulary from US2; it does not change domain modules.
- **Phase 6**: Depends on all user stories being complete.

### User Story Dependencies

- **US1**: Independent after Phase 2; MVP scope.
- **US2**: Depends on the section shell introduced by US1, but remains independently verifiable after that shell exists.
- **US3**: Depends on the shared visual vocabulary and status presentation; it preserves the existing PDF domain contract.

### Parallel Opportunities

- T004 and T005 can run in parallel after T003 because they touch separate presentation concerns in the same planned slice and must be merged carefully.
- T020, T021, and T022 can run in parallel after all implementation work.
- Test additions T006, T011, and T016 must precede their corresponding implementation tasks, but the test file itself is shared and should be edited sequentially.

## Implementation Strategy

### MVP First

1. Complete setup and foundational contract work.
2. Complete US1 with the root page, navigation, four section views, and read-only activity summary.
3. Run the US1 tests and quickstart checks before proceeding.

### Incremental Delivery

1. Add the shared visual system and accessible status presentation.
2. Align the document representation with the same hierarchy.
3. Run regression tests and the full quickstart.

### Scope Guard

Do not modify `shared/calculations/`, `shared/rules/`, `app/profile/`, `app/catalog/`, `app/quotes/`, or `app/storage/`. Do not add entities, fields, endpoints, status transitions, persistence, authentication, synchronization, or document-management features.
