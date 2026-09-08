# Specification Quality Checklist: PresupuestosPro v0

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-09-07
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- All validation items pass for the current draft.
- No blocking issues remain before moving to planning.

## Requirement Completeness

- [ ] CHK001 Are required profile fields, optional fields, and validation rules for name, NIF, contact data, and logo explicitly documented? [Completeness, Spec §FR-001]
- [ ] CHK002 Are the client's required data fields, optional data fields, and permitted client types specified consistently across the user story, data model, and contract? [Completeness, Spec §FR-003, Data Model]
- [ ] CHK003 Are the allowed retention choices, their defaults, and the meaning of an inactive retention explicitly defined? [Gap, Spec §FR-005, Data Model]
- [ ] CHK004 Are valid quantity and unit-price boundaries, decimal precision, and currency formatting requirements defined for every quote line? [Gap, Spec §FR-004]
- [ ] CHK005 Is the lifecycle of a quote defined, including the meaning and transition criteria for draft and ready-for-PDF states? [Gap, Data Model]
- [ ] CHK006 Are requirements defined for preserving or updating branding and customer data on quotes created before a profile change? [Completeness, Spec §FR-001, Spec §FR-010]

## Requirement Clarity

- [ ] CHK007 Is the formula and rounding order for base, IVA, IRPF, and total stated unambiguously, including the precision used for intermediate and final amounts? [Clarity, Spec §FR-005, Spec §SC-002]
- [ ] CHK008 Is the phrase "líneas válidas" defined with objective criteria for description, quantity, and unit price? [Ambiguity, Spec §FR-012]
- [ ] CHK009 Is the interpretation of a 30-day validity period defined, including whether the issue date counts and how month/year boundaries are handled? [Ambiguity, Spec §FR-008]
- [ ] CHK010 Is the `AAAA-NNN` numbering rule precise about the initial sequence, yearly rollover, and behavior when dates are edited or records are restored? [Clarity, Spec §FR-007]
- [ ] CHK011 Is "inmediatamente" quantified with an acceptable update latency for totals after line or client-type changes? [Ambiguity, Spec §FR-009, User Story 2]
- [ ] CHK012 Is "apariencia profesional" translated into concrete PDF content, layout, language, currency, and readability criteria? [Ambiguity, Spec §FR-010, Spec §SC-004]

## Requirement Consistency

- [ ] CHK013 Do the retention rules in the specification, data model, contract, and acceptance scenarios agree on eligible client types and the 15%/7% options? [Consistency, Spec §FR-005, Spec §FR-006, Data Model, Contract]
- [ ] CHK014 Do the requirements consistently describe whether a quote has one associated client, as opposed to the data model statement that a quote has several clients? [Conflict, Spec §FR-003, Data Model]
- [ ] CHK015 Are the requirements consistent about whether a generated PDF is merely downloadable or also saved as part of the quote's persisted data? [Conflict, Spec §FR-010, Spec §FR-011, User Story 4]
- [ ] CHK016 Are the local-only storage assumptions consistent with every requirement concerning reopening, saved drafts, and previously generated documents? [Consistency, Assumption, Spec §FR-011]

## Acceptance Criteria Quality

- [ ] CHK017 Can each functional requirement be mapped to at least one acceptance scenario with observable inputs, outputs, and failure conditions? [Traceability, Spec §FR-001–FR-012]
- [ ] CHK018 Are the expected amounts for the 15%, 7%, and particular-client examples accompanied by an explicit calculation basis and rounding rule? [Measurability, Spec §SC-002, User Story 3]
- [ ] CHK019 Is the population, sample size, and assessment method defined for the 90% correction-free outcome? [Gap, Spec §SC-003]
- [ ] CHK020 Is the population, sample size, and definition of "incluyen" defined for the 95% PDF-content outcome? [Gap, Spec §SC-004]
- [ ] CHK021 Is "less than 5 minutes" anchored to a defined starting state, included actions, and completion condition? [Clarity, Spec §SC-001]
- [ ] CHK022 Is data preservation after reopening measurable for profile, catalog, drafts, finalized quotes, and any generated PDF artifacts? [Completeness, Spec §SC-005]

## Scenario And Edge Case Coverage

- [ ] CHK023 Are primary, alternate, exception, and recovery requirements defined for profile saving, catalog changes, quote editing, tax changes, PDF generation, and reopening? [Coverage, Spec §US1–US4]
- [ ] CHK024 Are requirements defined for a failed or interrupted local save, including whether the user is warned and whether unsaved changes can be recovered? [Gap, Recovery, Spec §FR-011]
- [ ] CHK025 Are requirements defined for PDF generation failure, partial output, repeated export, and a quote whose data becomes invalid before export? [Gap, Exception Flow, Spec §FR-010, Spec §FR-012]
- [ ] CHK026 Are boundary cases for zero, fractional, negative, and very large quantities or prices explicitly addressed? [Gap, Edge Case, Spec §FR-004, Spec §FR-005]
- [ ] CHK027 Are requirements defined for missing, invalid, or unusually long freelancer, client, service, and line text data? [Gap, Edge Case, Spec §FR-001, Spec §FR-003, Spec §FR-004]
- [ ] CHK028 Are year-boundary cases for quote numbering and validity intentionally covered? [Coverage, Edge Case, Spec §FR-007, Spec §FR-008]

## Non-Functional Requirements

- [ ] CHK029 Are responsive behavior and minimum supported viewport requirements specified for the stated web-and-mobile target? [Gap, Plan Technical Context]
- [ ] CHK030 Are accessibility requirements defined for keyboard operation, focus visibility, labels, validation messages, and PDF-relevant content? [Gap, Non-Functional]
- [ ] CHK031 Are performance thresholds defined separately for recalculation, local persistence, PDF generation, and reopening the application? [Gap, Plan Performance Goals]
- [ ] CHK032 Are privacy and data-handling requirements documented for local profile, NIF, contact, client, and logo data, including deletion or reset expectations? [Completeness, Constitution §V, Assumptions]
- [ ] CHK033 Are Spanish (Spain) language, euro formatting, date formatting, and tax terminology requirements explicit for the interface, notices, and PDF? [Completeness, Constitution §II]

## Dependencies And Assumptions

- [ ] CHK034 Are the assumptions about local storage availability, browser/device scope, and absence of synchronization stated with their user-visible consequences? [Assumption, Spec Assumptions]
- [ ] CHK035 Is the source of truth for tax rates, retention options, and future changes to those rules documented without introducing unsupported v0 scope? [Dependency, Spec §FR-005, Spec Assumptions]
- [ ] CHK036 Are dependencies between profile, catalog, quote, calculation, persistence, and PDF requirements traceable without relying solely on implementation task names? [Traceability, Plan Dependencies]

## Ambiguities And Conflicts

- [ ] CHK037 Is the phrase "el nuevo branding aparece" clarified for existing drafts, already generated PDFs, and quotes created after the profile edit? [Ambiguity, Spec §US1]
- [ ] CHK038 Is the conflict between "sin correcciones manuales" and the user's ability to edit lines and review the PDF resolved with a precise success definition? [Conflict, Spec §SC-003, Spec §FR-009]
- [ ] CHK039 Is the requirement for a logo fallback specific enough to distinguish an empty area from a textual placeholder while remaining compatible with the no-logo assumption? [Ambiguity, Spec Edge Cases, Spec Assumptions]
- [ ] CHK040 Is the relationship between quote persistence and PDF retention explicitly bounded so that no unapproved document-management scope is implied? [Ambiguity, Constitution §III, Spec §FR-011]
