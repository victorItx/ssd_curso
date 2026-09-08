# Implementation Plan: Presentacion y navegacion de PresupuestosPro

**Branch**: `002-presentacion-navegacion` | **Date**: 2026-09-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-presentacion-navegacion/spec.md`

## Summary

La feature convertirá la entrada web local actual en una experiencia navegable con página de inicio, cuatro vistas de presentación y navegación común. Se mantendrá el dominio existente: los contadores se derivarán de presupuestos ya disponibles, los estados se presentarán sin crear transiciones y el documento exportado conservará su contrato, validación, datos e importes mientras adopta una jerarquía visual coherente.

La implementación se concentra en `public/index.html` y, solo si resulta necesario para servir recursos estáticos o conservar el fallback, en `server.js`. La representación documental se ajustará en `app/pdf/pdf_export.js` sin cambiar `shared/calculations/`, `shared/rules/`, los modelos ni la persistencia.

## Technical Context

**Language/Version**: JavaScript ES modules ejecutado en Node.js; HTML y CSS nativos en la interfaz pública.

**Primary Dependencies**: Node.js `node:http`; APIs nativas del navegador; no se añade dependencia de frontend ni de PDF.

**Storage**: Estado local existente y estructuras de `app/storage/local_store.js`; la interfaz no añade almacenamiento ni modifica el esquema.

**Testing**: `node --test` mediante `npm test`, pruebas focalizadas de exportación/modelos existentes y validación manual o de navegador de navegación, responsive y presentación documental.

**Target Platform**: Navegador web en escritorio y móvil, servido localmente por Node.js.

**Project Type**: Aplicación web local con una entrada HTML pública y módulos de dominio JavaScript.

**Performance Goals**: La navegación entre vistas debe sentirse inmediata para el volumen de uso individual existente; la página de inicio debe calcular el resumen sin operaciones remotas ni esperas perceptibles.

**Constraints**: Mobile-first; español de España; paleta y tokens visuales centralizados; sin cambios en lógica de negocio, cálculos, API, esquema, persistencia, estados ni flujos funcionales. La implementación debe respetar que el servidor actual sirve `public/index.html` como fallback para las rutas.

**Scale/Scope**: Una aplicación local de uso individual, cuatro vistas de presentación, un resumen de actividad y una representación de documento; sin cuentas, sincronización, analítica, correo ni gestión documental nueva.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicidad ante todo**: PASS. Se reutiliza la entrada HTML y el estado existente; no se incorpora framework, dependencia visual ni servicio nuevo.
- **Idioma y mercado**: PASS. Los textos nuevos y la salida documental se definen en español de España y conservan el contexto de euros y presupuestos locales.
- **Cero alcance fantasma**: PASS WITH BOUNDARY. La exploración confirmó que las cuatro secciones visuales aún no están separadas en el código; el plan las crea como vistas de presentación sobre datos existentes, no como nuevas capacidades de negocio. No se añaden estados, operaciones ni entidades.
- **Verificable por una persona no técnica**: PASS. El quickstart valida entrada, navegación, contadores, estados, responsive y documento desde la aplicación, junto con una regresión de los flujos existentes.
- **Datos del usuario con respeto**: PASS. No se piden datos nuevos ni se trasladan datos a servicios externos; el resumen solo lee presupuestos existentes.

## Phase 0: Research Summary

La investigación está consolidada en [research.md](research.md) y resuelve las decisiones necesarias:

- La navegación se mantiene dentro de la entrada web actual.
- Las cuatro secciones son proyecciones de presentación y no nuevas entidades.
- El sistema visual se centraliza en la superficie CSS existente.
- Los estados se etiquetan y diferencian sin cambiar el dominio.
- El documento conserva la salida estructurada existente; no se añade un renderer binario.
- La validación separa regresión de negocio y escenarios visuales responsive.

No quedan marcadores `NEEDS CLARIFICATION` en el contexto técnico ni en los artefactos de diseño.

## Phase 1: Design Summary

- [data-model.md](data-model.md) define las proyecciones de actividad, navegación, estados visuales y tokens sin persistencia nueva.
- [contracts/ui-contract.md](contracts/ui-contract.md) fija los accesos, estados, entrada y contrato documental sin cambiar API ni campos de dominio.
- [quickstart.md](quickstart.md) contiene escenarios ejecutables para navegación, actividad, responsive, PDF y regresión funcional.

## Project Structure

### Documentation (this feature)

```text
specs/002-presentacion-navegacion/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md                 # Phase 2; generado por /speckit-tasks
```

### Source Code (repository root)

```text
server.js                    # Entrada HTTP y fallback de public/index.html
public/
└── index.html               # Vistas, navegación, estilos y presentación responsive
app/
└── pdf/
    └── pdf_export.js        # Representación visual estructurada del documento
shared/
├── calculations/            # Solo lectura; no modificar en esta feature
├── formatting/              # Solo lectura; no modificar en esta feature
└── rules/                   # Solo lectura; no modificar en esta feature
tests/
├── feature-flow.test.js     # Regresión de flujo y exportación
└── quote-calculations.test.js
```

**Structure Decision**: Se mantiene el proyecto web local actual y su página pública única. La navegación y las vistas se organizan en la interfaz sin extraer un framework ni duplicar módulos de dominio. `server.js` solo se ajustará si la entrada de rutas o recursos lo exige; `app/pdf/pdf_export.js` conserva sus funciones públicas y cambia únicamente la composición visual de la salida.

## Design Boundaries

- No modificar `shared/calculations/`, `shared/rules/`, modelos de `app/profile/`, `app/catalog/` o `app/quotes/`, ni `app/storage/local_store.js`.
- No añadir campos, estados, transiciones, endpoints, autenticación o persistencia.
- No interpretar el resumen como una nueva fuente de verdad: siempre deriva del estado existente.
- No corregir en esta feature discrepancias de negocio ya presentes en la aplicación, salvo que un cambio visual las exponga y sea imprescindible conservar el comportamiento actual.
- Mantener los nombres y formas públicas de `buildPdfDocument` y `exportQuotePdf`.

## Complexity Tracking

No hay violaciones constitucionales que requieran justificación. La única ampliación respecto al estado actual es separar visualmente las cuatro áreas que hoy están concentradas en `public/index.html`; se mantiene dentro de la spec porque no crea capacidades ni datos de negocio.

## Post-Design Constitution Check

- **Simplicidad ante todo**: PASS. Los artefactos no introducen dependencias ni servicios nuevos.
- **Idioma y mercado**: PASS. El contrato y el quickstart fijan español de España y preservan el contexto local.
- **Cero alcance fantasma**: PASS. El contrato limita navegación, resumen, presentación y documento; excluye operaciones de dominio.
- **Verificable por una persona no técnica**: PASS. Los escenarios del quickstart cubren cada criterio de éxito mediante la interfaz.
- **Datos del usuario con respeto**: PASS. Las proyecciones son de lectura y no se requieren datos adicionales.
