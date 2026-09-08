# Implementation Plan: Exportación de presupuestos en ZIP

**Branch**: `003-exportar-presupuestos-zip` | **Date**: 2026-09-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-exportar-presupuestos-zip/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

La feature añadirá una exportación bajo demanda de todos los presupuestos en un único ZIP con un PDF por presupuesto y un archivo de datos completo. El navegador tomará un snapshot del estado local y lo enviará únicamente al servidor local, que reutilizará la representación PDF existente, validará todos los presupuestos y devolverá un ZIP completo o un error sin descarga parcial.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript ES modules en Node.js y JavaScript/HTML/CSS nativos en navegador.

**Primary Dependencies**: `node:http`, `node:fs`, `node:test` y `fflate` como utilidad local para crear ZIP; no se añade framework ni servicio remoto.

**Storage**: `localStorage` de la interfaz y estructuras existentes de `app/storage/local_store.js`; la exportación no persiste ni modifica datos.

**Testing**: `npm test` con `node:test`/`node:assert/strict`, pruebas del contrato de ZIP/PDF y validación manual en navegador de descarga, vacío, progreso y no modificación.

**Target Platform**: Navegador de escritorio o móvil servido por el Node.js local.

**Project Type**: Aplicación web local con entrada HTML única y endpoint local de transformación.

**Performance Goals**: Aceptar entre 1 y 200 presupuestos sin omisiones; mostrar estado de trabajo desde el inicio para 50 o más; no iniciar exportaciones simultáneas.

**Constraints**: Solo lectura, todo o nada, español de España, sin nube ni correo, sin cambios en cálculos/reglas/modelos/persistencia, y conservación de `exportQuotePdf`/`buildPdfDocument`.

**Scale/Scope**: Una persona usuaria y hasta 200 presupuestos por exportación; incluye presupuestos, catálogo, perfil y logo; no incluye importación, restauración, automatización ni otros formatos.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicidad ante todo**: PASS. Se añade una única operación de exportación y una utilidad ZIP aislada.
- **Idioma y mercado**: PASS. El botón, avisos, nombres y guía usan español de España y euros.
- **Cero alcance fantasma**: PASS. No se incorpora restauración, sincronización ni gestión documental adicional.
- **Verificable por una persona no técnica**: PASS. Los escenarios cubren botón, ZIP, PDF, error, vacío y progreso.
- **Datos del usuario con respeto**: PASS. El snapshot solo viaja al servidor local durante la descarga y no se persiste fuera del estado existente.

## Project Structure

### Documentation (this feature)

```text
specs/003-exportar-presupuestos-zip/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
```text
app/
├── export/
│   └── backup_export.js       # Snapshot, nombres, validación y composición del ZIP
├── pdf/
│   └── pdf_export.js           # Representación PDF compartida por exportación individual y masiva
└── storage/
    └── local_store.js           # Lectura del estado de dominio existente
public/
└── index.html                  # Botón, estado de trabajo y POST del snapshot local
server.js                       # Endpoint local POST /api/export-backup
shared/
├── calculations/               # Sin cambios
└── rules/                      # Sin cambios
tests/
├── backup-export.test.js       # ZIP, nombres, snapshot y errores todo-o-nada
├── feature-flow.test.js        # Regresión de dominio y PDF
└── presentation.test.js        # Contrato visible y PDF existente
```

**Structure Decision**: Se mantiene la aplicación web local actual. La interfaz conserva el estado en el navegador y envía un snapshot puntual a `server.js`; la lógica de exportación se separa en `app/export/` y delega en `app/pdf/` para no duplicar la representación documental. El endpoint no crea persistencia ni expone datos fuera del equipo.

## Phase 0: Research Summary

La investigación está consolidada en [research.md](research.md). Las decisiones clave son usar una utilidad ZIP local (`fflate`), generar el archivo en el servidor local a partir de un snapshot explícito y aplicar validación previa de todos los presupuestos para garantizar una exportación todo-o-nada.

## Phase 1: Design Summary

- [data-model.md](data-model.md) define el snapshot, los archivos del ZIP, los nombres seguros y los estados transitorios.
- [contracts/export-backup-contract.md](contracts/export-backup-contract.md) fija el botón, el payload local, la respuesta ZIP y los errores.
- [quickstart.md](quickstart.md) contiene pruebas automatizadas y escenarios manuales para exportación normal, vacío, volumen alto, nombres conflictivos, igualdad de PDF y no modificación.

## Design Boundaries

- No modificar `shared/calculations/`, `shared/rules/`, modelos de perfil/catálogo/presupuestos ni el esquema de persistencia.
- Mantener las funciones públicas `buildPdfDocument` y `exportQuotePdf`; cualquier renderer de bytes debe consumir la misma representación.
- No descargar ZIP parcial: si un PDF o el archivo de datos falla, se devuelve error y no se crea descarga.
- El snapshot se toma al iniciar y se usa como única fuente de esa exportación, aunque cambie la interfaz después.
- No añadir importación, restauración, copias programadas, correo, nube, Excel ni CSV.

## Post-Design Constitution Check

- **Simplicidad ante todo**: PASS. La dependencia ZIP y el módulo de exportación tienen una responsabilidad única.
- **Idioma y mercado**: PASS. Se conservan textos, formato monetario y nombres de producto locales.
- **Cero alcance fantasma**: PASS. El diseño se limita a la copia bajo demanda definida por la spec.
- **Verificable por una persona no técnica**: PASS. `quickstart.md` cubre resultados visibles y contenidos del ZIP.
- **Datos del usuario con respeto**: PASS. El endpoint es local, no almacena el snapshot y no añade cuentas ni servicios externos.

## Complexity Tracking

No hay violaciones de la constitución que requieran justificación. `fflate` se incorpora como dependencia técnica acotada para producir un ZIP válido sin añadir framework, servicio ni almacenamiento.

## Final Phase: Maintenance

- Actualizar `AGENTS.md` con las decisiones de diseño y convenciones nuevas de esta feature, una línea por decisión, con referencia a la spec (p. ej. ‘[003] ...’). No incluyas entradas por incluir, asegúrate siempre de que es información transversal y relevante para el proyecto que pueden aprovechar futuras features.

