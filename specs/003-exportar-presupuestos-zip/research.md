# Research: Exportación de presupuestos en ZIP

## Decisión: Generar el ZIP en el servidor local a partir de un snapshot del navegador

**Rationale**: La interfaz actual conserva los presupuestos en `localStorage`, mientras que `server.js` ya es el punto local de entrada. El navegador puede enviar una copia puntual del estado al proceso local para transformarla y devolverla como descarga, sin introducir persistencia nueva ni servicios remotos.

**Alternatives considered**:
- Generar el ZIP en un servicio remoto: rechazado por la constitución y por la naturaleza local de los datos.
- Añadir una segunda base de datos o persistencia en servidor: rechazado; duplicaría la fuente de verdad.
- Crear el ZIP íntegramente en la interfaz con un formato manual: rechazado por riesgo de errores en CRC, offsets y archivos grandes.

## Decisión: Usar `fflate` como dependencia técnica aislada

**Rationale**: El proyecto no tiene una API nativa de navegador/Node para crear ZIP y necesita un archivo estándar compatible con doble clic. `fflate` es una utilidad pequeña, sin framework ni servicio, adecuada para comprimir entradas en memoria dentro del endpoint local.

**Alternatives considered**:
- Implementar un escritor ZIP propio: rechazado por complejidad y riesgo en el formato binario.
- Añadir una dependencia de servidor más amplia: rechazado para mantener el alcance mínimo.
- Descargar una librería desde CDN: rechazado porque la app debe funcionar localmente sin dependencias remotas.

## Decisión: Validación previa todo-o-nada

**Rationale**: Todos los presupuestos y el archivo de datos se preparan antes de enviar la respuesta. Si un PDF no es válido, no se descarga ningún ZIP y se identifica el presupuesto afectado. Esto protege la copia de seguridad frente a resultados incompletos.

**Alternatives considered**:
- Descargar un ZIP parcial: rechazado explícitamente por la aclaración de la spec.
- Omitir silenciosamente el presupuesto problemático: rechazado porque destruye la confianza del usuario.

## Decisión: Reutilizar una única representación PDF

**Rationale**: `buildPdfDocument` y `exportQuotePdf` son contratos públicos existentes. La exportación masiva debe llamar a la misma representación y al mismo renderer de bytes que la descarga individual, de forma que contenido y presentación coincidan.

**Alternatives considered**:
- Crear un renderer distinto para el ZIP: rechazado porque podría producir diferencias visuales o de importes.
- Regenerar los totales durante la exportación: rechazado; los totales deben provenir del presupuesto existente y de las reglas compartidas.

## Decisión: Progreso como estado de trabajo, no como nueva persistencia

**Rationale**: Para 50 o más presupuestos basta con mostrar inmediatamente un estado "Preparando copia...", desactivar el botón y restaurarlo al terminar o fallar. La spec exige visibilidad del trabajo, no una cola ni porcentaje persistido.

**Alternatives considered**:
- Añadir trabajos en segundo plano o historial de exportaciones: rechazado por alcance fantasma.
- Crear un sistema de progreso persistente: rechazado porque la operación es bajo demanda y local.
