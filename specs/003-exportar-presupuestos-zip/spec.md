# Feature Specification: Exportación de presupuestos en ZIP

**Feature Branch**: `003-exportar-presupuestos-zip`

**Created**: 2026-09-08

**Status**: Draft

**Input**: User description: "Exportar todos mis presupuestos en un .zip para disponer de una copia de seguridad con un PDF por presupuesto y un único archivo de datos restaurable en el futuro."

## Clarifications

### Session 2026-09-08

- Q: ¿Qué debe ocurrir si no se puede generar uno de los PDF durante la exportación? → A: No descargar ningún ZIP y mostrar un error indicando el presupuesto afectado.
- Q: ¿Qué significa que el PDF incluido sea idéntico al PDF individual? → A: Debe coincidir en contenido y presentación.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Exportar una copia completa (Priority: P1)

Como freelancer, quiero descargar todos mis presupuestos en un único archivo ZIP para conservar una copia de seguridad y archivarla donde quiera.

**Why this priority**: Es el objetivo principal de la feature y protege los datos frente a la pérdida del navegador o del equipo.

**Independent Test**: Con tres presupuestos existentes, el usuario pulsa "Exportar todo (.zip)" y descarga un único ZIP que contiene tres PDF y un archivo de datos.

**Acceptance Scenarios**:

1. **Given** que existen tres presupuestos, **When** el usuario pulsa "Exportar todo (.zip)", **Then** se descarga un único archivo con el nombre `presupuestospro-copia-AAAA-MM-DD.zip` usando la fecha de exportación.
2. **Given** que el ZIP se ha descargado, **When** el usuario lo descomprime, **Then** encuentra un PDF por cada presupuesto y un único archivo de datos con los presupuestos, el catálogo de servicios y el perfil completo, incluido el logo.
3. **Given** que un presupuesto también puede descargarse individualmente, **When** el usuario compara ambos PDF, **Then** el PDF incluido en el ZIP es idéntico al PDF individual en contenido y presentación.
4. **Given** que un presupuesto tiene un total de 3.604,00 €, **When** se revisa su PDF dentro del ZIP, **Then** el total mostrado coincide al céntimo con el presupuesto individual.

---

### User Story 2 - Informar cuando no hay nada que exportar (Priority: P2)

Como freelancer, quiero recibir un aviso claro si todavía no tengo presupuestos para no descargar una copia vacía que pueda confundirme.

**Why this priority**: Evita una descarga inútil y explica al usuario qué debe hacer antes de poder crear una copia.

**Independent Test**: Con cero presupuestos, el usuario pulsa el botón y comprueba que aparece un aviso y que no se descarga ningún ZIP.

**Acceptance Scenarios**:

1. **Given** que no existen presupuestos, **When** el usuario pulsa "Exportar todo (.zip)", **Then** la aplicación muestra un aviso claro de que no hay presupuestos para exportar.
2. **Given** que no existen presupuestos, **When** termina la acción, **Then** no se descarga ningún archivo ZIP.

---

### User Story 3 - Exportar muchos presupuestos con información de progreso (Priority: P3)

Como freelancer con muchos presupuestos, quiero saber que la exportación sigue trabajando para no repetir la acción ni pensar que la aplicación se ha bloqueado.

**Why this priority**: La exportación debe seguir siendo comprensible y controlable cuando el volumen crece, sin añadir una gestión documental nueva.

**Independent Test**: Con al menos 50 presupuestos, el usuario inicia la exportación y observa una indicación de trabajo hasta que se descarga el ZIP completo.

**Acceptance Scenarios**:

1. **Given** que existen 50 o más presupuestos, **When** el usuario inicia la exportación, **Then** la interfaz muestra una indicación visible de que la copia se está preparando.
2. **Given** que la exportación está en curso, **When** todavía no ha terminado, **Then** el botón evita iniciar una segunda exportación simultánea.
3. **Given** que la exportación finaliza correctamente, **When** el usuario abre el ZIP, **Then** contiene todos los presupuestos existentes, sin omisiones.

### Edge Cases

- Si el nombre de un cliente contiene caracteres conflictivos, como `Diseño/Web S.L.`, el nombre del PDF se limpia para que sea válido dentro del ZIP y conserva una forma reconocible del número y del cliente.
- Si varios clientes producen nombres de archivo iguales después de limpiarlos, cada PDF mantiene un nombre único dentro del ZIP.
- Si un presupuesto no puede generar un PDF válido, la aplicación informa del problema indicando el presupuesto afectado y no descarga ningún ZIP parcial.
- Si la exportación se cancela o falla antes de terminar, no se modifica ningún presupuesto, servicio, perfil ni logo.
- Si el usuario inicia la exportación desde una lista que cambia después, la copia contiene el estado que existía al comenzar la acción.
- La aplicación debe poder exportar desde 1 hasta 200 presupuestos sin omitir archivos; con 50 o más debe mostrar que está trabajando.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación MUST mostrar un botón visible con el texto "Exportar todo (.zip)" en la lista de presupuestos.
- **FR-002**: La aplicación MUST descargar un único archivo ZIP cuando existan uno o más presupuestos.
- **FR-003**: El archivo ZIP MUST llamarse `presupuestospro-copia-AAAA-MM-DD.zip`, donde la fecha corresponde al día de la exportación.
- **FR-004**: El ZIP MUST incluir exactamente un PDF por cada presupuesto existente en el momento de iniciar la exportación.
- **FR-005**: Cada PDF incluido MUST ser idéntico al PDF individual que la aplicación genera para ese presupuesto, tanto en contenido como en presentación.
- **FR-006**: El ZIP MUST incluir un único archivo de datos con toda la información necesaria para una futura restauración: presupuestos, catálogo de servicios, perfil del freelancer y logo.
- **FR-007**: Cada PDF MUST usar un nombre formado por el número del presupuesto y el cliente, separados por ` - `, con extensión `.pdf`.
- **FR-008**: La aplicación MUST limpiar los caracteres conflictivos de los nombres de cliente y MUST garantizar que los nombres de PDF sean únicos dentro del ZIP.
- **FR-009**: Cuando no existan presupuestos, la aplicación MUST mostrar un aviso claro y MUST evitar cualquier descarga de ZIP.
- **FR-010**: Durante la preparación de una exportación grande, la aplicación MUST mostrar una indicación visible de progreso o de trabajo en curso y MUST impedir una segunda exportación simultánea.
- **FR-011**: La exportación MUST ser de solo lectura y MUST dejar sin cambios los presupuestos, el catálogo, el perfil, el logo y cualquier otro estado existente.
- **FR-012**: Si la exportación falla o no puede incluir todos los elementos requeridos, la aplicación MUST informar del error indicando el presupuesto afectado cuando proceda y MUST no descargar ningún ZIP parcial.
- **FR-013**: La aplicación MUST conservar los importes de los presupuestos sin redondeos adicionales: el total del PDF incluido debe coincidir al céntimo con el PDF individual.
- **FR-014**: La exportación MUST estar limitada a la descarga bajo demanda del ZIP y MUST no enviar los datos a correo, nube ni servicios externos.

### Key Entities *(include if feature involves data)*

- **Copia de seguridad**: Archivo ZIP descargado bajo demanda que agrupa la representación documental y los datos actuales del freelancer.
- **Presupuesto exportado**: Presupuesto existente asociado a un PDF cuyo nombre combina su número y cliente.
- **Archivo de datos**: Único archivo incluido en la copia que contiene presupuestos, catálogo de servicios, perfil y logo para una futura restauración.
- **Nombre de archivo seguro**: Nombre de PDF derivado del número y cliente, limpiado para evitar caracteres conflictivos y duplicados dentro del ZIP.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Con 3 presupuestos existentes, el usuario completa una única descarga y obtiene un ZIP con 3 PDF y 1 archivo de datos.
- **SC-002**: En una revisión de 10 presupuestos exportados, el 100% de los PDF del ZIP coincide con su PDF individual en contenido y presentación, incluido el total al céntimo.
- **SC-003**: Con 0 presupuestos, el 100% de los intentos muestra un aviso claro y produce 0 descargas ZIP.
- **SC-004**: Con 50 o más presupuestos, el 100% de las exportaciones muestra una indicación visible mientras trabaja y termina con un ZIP que contiene todos los presupuestos existentes.
- **SC-005**: Tras una exportación correcta, una comparación del estado antes y después no detecta cambios en presupuestos, catálogo, perfil ni logo.
- **SC-006**: En una revisión de nombres con caracteres conflictivos y duplicados, el 100% de los PDF tiene un nombre válido, reconocible y único dentro del ZIP.
- **SC-007**: La persona usuaria puede identificar el botón, iniciar la copia y reconocer el resultado descargado sin consultar documentación técnica.

## Assumptions

- El usuario ya tiene acceso a la lista de presupuestos y a los datos locales que la aplicación conserva.
- El formato del archivo de datos puede ser legible por la aplicación en una futura feature de importación; esta feature solo lo genera y no restaura datos.
- El nombre del archivo de datos será `presupuestospro-datos.json`, salvo que el diseño posterior establezca otro nombre visible y único.
- La numeración de los presupuestos ya existente es la fuente de verdad para nombrar los PDF.
- La fecha usada en el nombre del ZIP corresponde a la fecha local del equipo del usuario.
- Los PDF incluidos reutilizan la misma representación documental que la descarga individual existente.
- La exportación se realiza solo bajo demanda y no crea copias automáticas ni historial adicional.
