# Tasks: PresupuestosPro v0

**Input**: Design documents from `/specs/001-presupuestos-pro/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the base structure and shared rules for the first working version.

- [X] T001 Create the project structure described in the implementation plan under `app/`, `shared/`, and `tests/` in the repo root
- [X] T002 Initialize the local app skeleton in `app/profile/`, `app/catalog/`, `app/quotes/`, `app/pdf/`, and `app/storage/`
- [X] T003 [P] Configure shared validation, formatting, and edge-case rules in `shared/rules/` and `shared/formatting/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the reusable base that all stories depend on before story-specific work begins.

- [X] T004 Define the local data model for freelancer profile, services, customers, quotes, and quote lines
- [X] T005 [P] Implement local storage for profile, catalog, and saved quotes in `app/storage/local_store`
- [X] T006 [P] Implement shared calculation rules for subtotal, IVA, IRPF, and total in `shared/calculations/quote_totals`
- [X] T007 Create quote numbering and date utilities for yearly numbering and 30-day validity in `shared/formatting/quote_metadata`
- [X] T008 Create validation helpers for empty quotes, invalid lines, and client-type IRPF behavior in `shared/rules/business_rules`
- [X] T009 [P] Create the reusable PDF layout foundation for branding, summaries, and document structure in `app/pdf/pdf_template`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Configurar mi identidad y marca (Priority: P1) 🎯 MVP

**Goal**: Let the freelancer keep their identity and branding stored once, then reuse it in every quote and PDF.

**Independent Test**: A freelancer can save their profile, create a new budget, and confirm the same branding appears in the generated document without re-entering details.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create the freelancer profile model in `app/profile/profile_model`
- [X] T011 [US1] Implement profile editing and save flow in `app/profile/profile_editor`
- [X] T012 [US1] Implement profile loading for new quotes and PDFs in `app/profile/profile_loader`
- [X] T013 [US1] Add the empty-logo fallback behavior in `app/profile/profile_branding`
- [X] T014 [US1] Connect the profile data to quote generation and PDF export in `app/quotes/quote_builder`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Gestionar catálogo y crear presupuestos (Priority: P1)

**Goal**: Let the freelancer maintain a reusable service catalog and build custom quotes quickly.

**Independent Test**: A freelancer can add services, create a new quote, include catalog entries or manual lines, edit them, and see totals update immediately.

### Implementation for User Story 2

- [X] T015 [P] [US2] Create the service entity and catalog storage in `app/catalog/service_model`
- [X] T016 [US2] Implement add, edit, and delete catalog actions in `app/catalog/catalog_service`
- [X] T017 [US2] Implement quote creation and customer selection in `app/quotes/quote_creator`
- [X] T018 [P] [US2] Implement line creation for catalog and manual entries in `app/quotes/quote_lines`
- [X] T019 [US2] Implement line editing and removal with recalculation in `app/quotes/quote_editor`
- [X] T020 [US2] Ensure quote drafts remain saved locally between sessions in `app/storage/local_store`

**Checkpoint**: At this point, User Story 2 should be independently usable and reliable.

---

## Phase 5: User Story 3 - Calcular impuestos y validar el total (Priority: P1)

**Goal**: Remove manual tax work and make totals reliable for every quote.

**Independent Test**: With a sample quote, the system must calculate base, IVA, IRPF, and total correctly for company/autónomo and particular scenarios.

### Implementation for User Story 3

- [X] T021 [P] [US3] Build the quote summary model in `shared/calculations/quote_summary`
- [X] T022 [US3] Implement the automatic subtotal and IVA logic in `shared/calculations/quote_totals`
- [X] T023 [US3] Implement the optional IRPF rule for company/autónomo clients in `shared/rules/irpf_rules`
- [X] T024 [US3] Override IRPF when the client is a particular in `shared/rules/client_type_rules`
- [X] T025 [US3] Recalculate totals when the user changes customer type, retention rate, or line values in `app/quotes/quote_summary`
- [X] T026 [US3] Add safeguards for invalid totals and empty quote states in `shared/rules/business_rules`

**Checkpoint**: At this point, the tax logic is trustworthy and independent from the rest of the app.

---

## Phase 6: User Story 4 - Descargar el presupuesto como PDF y conservarlo (Priority: P2)

**Goal**: Turn the prepared quote into a professional PDF and keep the work available after reopening the app.

**Independent Test**: A valid quote can be exported to PDF with the freelancer brand, customer data, dates, validity, and full amount breakdown, and remains saved after reopening the app.

### Implementation for User Story 4

- [X] T027 [P] [US4] Create the PDF document generator in `app/pdf/pdf_export`
- [X] T028 [US4] Add brand, customer, quote number, date, validity, and line table to the PDF in `app/pdf/pdf_template`
- [X] T029 [US4] Add the financial summary section with base, IVA, IRPF, and total to the PDF in `app/pdf/pdf_export`
- [X] T030 [US4] Prevent PDF generation when the quote has no valid lines in `app/quotes/quote_validator`
- [X] T031 [US4] Ensure data persistence across app restarts in `app/storage/local_store`
- [X] T032 [US4] Validate end-to-end flow from quote creation to saved PDF in `tests/happy-path/quote_export_flow`

**Checkpoint**: Story 4 should deliver the final business value: a professional quote that can be sent to the client.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass across the whole product.

- [X] T033 [P] Review the edge-case behavior from `specs/001-presupuestos-pro/spec.md` and confirm the app handles them clearly
- [X] T034 [P] Validate the Spanish language and labels across the app flows in `app/`
- [X] T035 Run the quickstart validation flow from `specs/001-presupuestos-pro/quickstart.md`
- [X] T036 Review the data model and business rules in `specs/001-presupuestos-pro/data-model.md` and `shared/rules/` before the MVP is closed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: No dependencies; can start immediately.
- **Phase 2**: Depends on Phase 1; blocks all user stories.
- **Phase 3+**: All user story phases depend on Phase 2 completion.
- **Phase 7**: Depends on all required user stories being complete.

### User Story Dependencies

- **User Story 1**: Independent after Phase 2.
- **User Story 2**: Independent after Phase 2.
- **User Story 3**: Independent after Phase 2.
- **User Story 4**: Depends on the quote model and persistence from earlier stories, but still remains independently testable once base flows are ready.

### Parallel Opportunities

- T003, T005, T006, T009 can run in parallel after Phase 1.
- T010 and T015 can be worked in parallel within their respective user stories.
- T018 and T021 can run in parallel because they build different parts of the user experience.
- T027 and T031 can progress in parallel once underlying quote logic is stable.

---

## Parallel Example

```bash
# After foundational setup is ready
Task: "Create the freelancer profile model in app/profile/profile_model"
Task: "Create the service entity and catalog storage in app/catalog/service_model"
Task: "Build the quote summary model in shared/calculations/quote_summary"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 for User Story 1.
3. Validate the profile flow and PDF branding in isolation.
4. Stop and confirm the MVP works before adding more stories.

### Incremental Delivery

1. Setup + Foundation.
2. Add User Story 1.
3. Add User Story 2.
4. Add User Story 3.
5. Add User Story 4.
6. Run the final polish pass.

### Suggested MVP Scope

The simplest viable version is: User Story 1 + User Story 2 + User Story 3, with PDF export as the final step before sending the quote. This still delivers real value to the freelancer without adding complexity.

---

## Notes

- [P] tasks indicate tasks that can run in parallel because they touch different files or areas.
- Each task includes a clear path for implementation.
- The sequence is designed so that each user story can be delivered independently of the others.
- The app remains focused on the core business problem: create a polished quote, calculate it correctly, and send it as a PDF.
