# AGENTS.md

## Qué es
PresupuestosPro es una aplicación web local para que autónomos españoles creen, calculen, revisen y exporten presupuestos profesionales.

## Stack y decisiones vigentes
- Node.js con módulos ES (`"type": "module"`) y servidor HTTP nativo (`node:http`).
- Interfaz con HTML, CSS y JavaScript nativos, sin framework ni dependencias de frontend.
- Dominio separado en `app/`; cálculos, formato y reglas compartidos en `shared/`.
- Persistencia únicamente local, sin cuentas, nube, sincronización ni servicios remotos.
- Exportación documental desde `app/pdf/`, conservando los contratos públicos existentes.
- Aplicación en español de España y moneda base en euros.
- Diseño mobile-first, con navegación y presentación sobre el estado existente.
- No modificar reglas, cálculos, modelos ni persistencia para resolver necesidades puramente visuales.

## Arranque y pruebas locales
- Instalar dependencias: `npm install` (actualmente no hay dependencias externas).
- Arrancar: `npm start`
- Abrir: `http://localhost:3000`
- Comprobar salud: `http://localhost:3000/health`
- Ejecutar pruebas: `npm test`

## Convenciones
- Usar JavaScript ES modules e imports relativos con extensión `.js`.
- Mantener separadas presentación, dominio, persistencia, cálculos y reglas.
- Preferir funciones pequeñas, datos explícitos y validación antes de exportar.
- Mantener textos y mensajes en español de España.
- Derivar los resúmenes del estado existente; no crear fuentes de verdad duplicadas.
- Añadir pruebas con `node:test` y `node:assert/strict` para cambios de comportamiento.
- Mantener el alcance simple, local, verificable y definido por las specs.

Las reglas de producto viven en .specify/memory/constitution.md y el estado del producto en specs/README.md
