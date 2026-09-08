---

description: "Task list for exporting all budgets as a ZIP backup"
---

# Tasks: Exportación de presupuestos en ZIP

**Input**: Design documents from `specs/003-exportar-presupuestos-zip/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/export-backup-contract.md`, `quickstart.md`

**Organization**: Las tareas están agrupadas por historia de usuario y mantienen un MVP independiente en US1.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar la única dependencia necesaria para producir archivos ZIP estándar localmente.

- [X] T001 Añadir `fflate` como dependencia de producción en `package.json` y actualizar el lockfile generado por npm.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Crear los contratos técnicos compartidos que necesitan todas las historias.

- [X] T002 [P] Extraer en `app/pdf/pdf_export.js` un renderer de bytes que consuma la misma representación que `exportQuotePdf` sin cambiar sus funciones públicas.
- [X] T003 [P] Implementar en `app/export/backup_export.js` el snapshot inmutable, la serialización de `presupuestospro-datos.json`, la limpieza de nombres y la resolución de colisiones.
- [X] T004 Implementar en `app/export/backup_export.js` la composición ZIP con `fflate`, validación previa de todas las entradas y resultado todo-o-nada.
- [X] T005 Implementar en `server.js` el endpoint local `POST /api/export-backup`, lectura segura del cuerpo JSON, respuestas HTTP del contrato y cabecera de descarga.

**Checkpoint**: La base de exportación puede recibir un snapshot, validar presupuestos y producir una respuesta ZIP local sin modificar el estado.

---

## Phase 3: User Story 1 - Exportar una copia completa (Priority: P1) 🎯 MVP

**Goal**: Descargar un ZIP completo con un PDF idéntico por presupuesto y un único archivo de datos.

**Independent Test**: Con tres presupuestos, pulsar `Exportar todo (.zip)`, descomprimir el resultado y comprobar tres PDF, un archivo de datos, nombres correctos y totales idénticos a la exportación individual.

### Tests for User Story 1

- [X] T006 [US1] Añadir en `tests/backup-export.test.js` pruebas del contrato de composición: nombre del ZIP, una entrada de datos y un PDF por presupuesto.
- [X] T007 [US1] Añadir en `tests/backup-export.test.js` pruebas de igualdad de contenido, presentación e importes entre PDF individual y PDF incluido en el ZIP.

### Implementation for User Story 1

- [X] T008 [US1] Añadir en `public/index.html` el botón visible `Exportar todo (.zip)` y el contenedor accesible para mensajes de estado en la vista de presupuestos.
- [X] T009 [US1] Implementar en `public/index.html` la lectura del snapshot de `localStorage`, la petición `POST /api/export-backup` y la descarga del blob con el nombre recibido.
- [X] T010 [US1] Conectar en `public/index.html` la exportación individual y masiva al renderer PDF compartido para conservar el mismo contenido y presentación.

**Checkpoint**: US1 permite exportar tres presupuestos y verificar el contenido completo del ZIP sin depender de US2 ni US3.

---

## Phase 4: User Story 2 - Informar cuando no hay nada que exportar (Priority: P2)

**Goal**: Evitar ZIP vacíos y mostrar un aviso claro cuando no existen presupuestos.

**Independent Test**: Con cero presupuestos, pulsar `Exportar todo (.zip)` y comprobar aviso visible, cero peticiones de exportación efectiva y cero descargas.

### Tests for User Story 2

- [X] T011 [P] [US2] Añadir en `tests/backup-export.test.js` pruebas de snapshot vacío y respuesta sin descarga cuando `quotes` está vacío.

### Implementation for User Story 2

- [X] T012 [US2] Añadir en `public/index.html` la comprobación de lista vacía, el aviso en español y la prevención de la petición ZIP cuando no hay presupuestos.
- [X] T013 [US2] Añadir en `server.js` la validación defensiva de snapshots sin presupuestos con respuesta `400` JSON, sin crear ningún archivo.

**Checkpoint**: US1 y US2 funcionan de forma independiente; una lista vacía no produce una copia engañosa.

---

## Phase 5: User Story 3 - Exportar muchos presupuestos con información de progreso (Priority: P3)

**Goal**: Mantener visible el trabajo y bloquear duplicados durante exportaciones de 50 o más presupuestos.

**Independent Test**: Con al menos 50 presupuestos, iniciar la exportación, observar el estado de preparación, confirmar botón bloqueado durante la petición y verificar que el ZIP contiene todos los elementos.

### Tests for User Story 3

- [X] T014 [P] [US3] Añadir en `tests/backup-export.test.js` pruebas con 50 o más presupuestos, cobertura de todos los PDF y rechazo de una segunda ejecución concurrente.

### Implementation for User Story 3

- [X] T015 [US3] Implementar en `public/index.html` los estados `idle`, `preparing`, `success` y `error`, con `aria-busy`, botón deshabilitado y mensaje visible durante la exportación.
- [X] T016 [US3] Asegurar en `public/index.html` que la instantánea se toma una sola vez al iniciar y que el control de concurrencia se libera después de éxito o error.

**Checkpoint**: Exportaciones de 50+ presupuestos muestran trabajo, no se duplican y conservan todos los elementos.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cubrir robustez transversal, regresión y validación final.

- [X] T017 [P] Añadir en `tests/backup-export.test.js` casos de nombres conflictivos, colisiones, error de PDF, ausencia de ZIP parcial y estado sin mutaciones.
- [X] T018 Ejecutar `npm test`, completar los escenarios de `specs/003-exportar-presupuestos-zip/quickstart.md` y actualizar `AGENTS.md` con las decisiones transversales de esta feature.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: T001 no depende de otras tareas.
- **Phase 2 (Foundational)**: T002 y T003 pueden ejecutarse en paralelo tras T001; T004 depende de T002 y T003; T005 depende de T004.
- **Phase 3 (US1)**: T006 y T007 pueden escribirse tras T002-T004; T008-T010 dependen de T005 y de los contratos PDF/ZIP.
- **Phase 4 (US2)**: Depende de completar US1; T011 puede prepararse junto con T012; T013 depende de T005 y sus validaciones.
- **Phase 5 (US3)**: Depende de completar US1; T014 puede prepararse junto con T015; T016 depende de T015.
- **Phase 6 (Polish)**: T017 depende de la implementación de las tres historias; T018 depende de todas las tareas anteriores.

### User Story Dependencies

- **US1 (P1)**: Puede completarse después de Phase 2; es el MVP.
- **US2 (P2)**: Depende de US1 porque reutiliza el endpoint y el flujo de interfaz de exportación; su escenario vacío sigue siendo verificable por separado.
- **US3 (P3)**: Depende de US1 porque reutiliza el flujo de interfaz de exportación; añade estados de interfaz y control de concurrencia.

### Parallel Execution Examples

**US1**:

```text
T006 y T007 se ejecutan secuencialmente porque comparten tests/backup-export.test.js
```

**US2**:

```text
T011 pruebas de lista vacía en tests/backup-export.test.js
T012 estado vacío en public/index.html
```

**US3**:

```text
T014 pruebas de volumen y concurrencia en tests/backup-export.test.js
T015 estados visuales en public/index.html
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar T001-T005 para dejar lista la base local de ZIP y PDF.
2. Completar T006-T010 para exportar una copia completa con tres presupuestos.
3. Ejecutar T018 parcialmente para validar US1 antes de ampliar el alcance.

### Incremental Delivery

1. Phase 1 + Phase 2: contratos y composición disponibles.
2. US1: copia completa descargable, demo y validación del MVP.
3. US2: estado vacío y protección contra ZIP sin contenido.
4. US3: progreso, bloqueo de duplicados y volumen alto.
5. Polish: errores, colisiones, no mutación y quickstart completo.

## Traceability Summary

- **FR-001, FR-002, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-011, FR-013**: T002-T010 y T017.
- **FR-009**: T011-T013.
- **FR-010**: T014-T016.
- **FR-012**: T004-T005 y T017.
- **FR-014**: T003-T005 y T018.
- **SC-001, SC-002**: T006-T010.
- **SC-003**: T011-T013.
- **SC-004**: T014-T016.
- **SC-005, SC-006, SC-007**: T017-T018.
