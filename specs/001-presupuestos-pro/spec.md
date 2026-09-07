# Feature Specification: PresupuestosPro v0

**Feature Branch**: 001-presupuestos-pro

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "Especificación: PresupuestosPro v0"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Configurar mi identidad y marca (Priority: P1)

Como freelancer, quiero configurar mi nombre, NIF, datos de contacto y logo para que cada presupuesto salga con mi marca sin reescribir los datos cada vez.

**Why this priority**: Esta es la base del producto. Si no puede personalizar su identidad, la herramienta no transmite profesionalidad ni genera confianza en el cliente.

**Independent Test**: Un freelancer puede completar su perfil, guardar cambios y comprobar que ese mismo perfil aparece en un presupuesto nuevo y en el PDF final.

**Acceptance Scenarios**:

1. **Given** que el freelancer aún no ha definido su perfil, **When** accede a la configuración y completa nombre, NIF, contacto y logo, **Then** esos datos quedan guardados y se reutilizan en todos los presupuestos posteriores.
2. **Given** que el perfil ya existe, **When** el usuario modifica su nombre o su logo, **Then** el nuevo branding aparece en los presupuestos y PDFs creados a partir de ese momento.

---

### User Story 2 - Gestionar catálogo y crear presupuestos (Priority: P1)

Como freelancer, quiero mantener un catálogo de servicios y crear un presupuesto a partir de ese catálogo o de líneas manuales para adaptar cada oferta a cada cliente sin perder tiempo.

**Why this priority**: El ahorro real del producto viene de no volver a escribir tareas repetitivas y de poder preparar ofertas con un flujo claro y rápido.

**Independent Test**: El freelancer puede añadir servicios, crear un presupuesto nuevo, elegir cliente y añadir líneas con o sin catálogo, y verificar que el presupuesto refleja los datos introducidos.

**Acceptance Scenarios**:

1. **Given** un catálogo con servicios habituales, **When** crea un presupuesto y añade una línea del catálogo, **Then** la descripción, cantidad y precio por defecto se cargan automáticamente.
2. **Given** un encargo que no está en el catálogo, **When** añade una línea escrita a mano, **Then** el sistema permite introducir descripción, cantidad y precio y lo integra dentro del presupuesto.
3. **Given** un presupuesto parcialmente completado, **When** el freelancer edita o elimina líneas, **Then** el presupuesto y sus totales se actualizan inmediatamente.

---

### User Story 3 - Calcular impuestos y validar el total (Priority: P1)

Como freelancer, quiero que la base imponible, el IVA, la retención de IRPF y el total se calculen solo para evitar errores de impuestos y asegurar que el importe final es correcto.

**Why this priority**: Este es el valor principal del producto: eliminar el cálculo manual y la posibilidad de errores que puedan dañar la credibilidad del profesional.

**Independent Test**: El freelancer crea un presupuesto con líneas de ejemplo, cambia el tipo de cliente y la retención, y comprueba que los importes del resumen se recalculan de forma consistente.

**Acceptance Scenarios**:

1. **Given** un presupuesto con líneas por valor de 2.000,00 €, **When** el cliente es una empresa o autónomo y la retención está activa al 15 %, **Then** el total mostrado es de 2.120,00 €.
2. **Given** el mismo presupuesto con retención del 7 %, **When** el usuario cambia la retención, **Then** el total cambia a 2.280,00 € sin tocar manualmente los importes.
3. **Given** un presupuesto para un cliente particular, **When** el usuario marca el tipo de cliente como particular, **Then** la retención no se aplica y el total sube respecto al mismo presupuesto con retención.

---

### User Story 4 - Descargar el presupuesto como PDF y conservarlo (Priority: P2)

Como freelancer, quiero generar un PDF con mi marca y los datos del cliente para enviárselo por email con una imagen profesional y conservar mi trabajo al cerrar la aplicación.

**Why this priority**: La descarga en PDF es la entrega final del valor del producto; la persistencia garantiza que el trabajo no se pierde entre sesiones.

**Independent Test**: El freelancer genera un PDF, revisa que contiene la información relevante y cierra la aplicación para volver a abrirla y comprobar que perfil, catálogo y presupuestos siguen disponibles.

**Acceptance Scenarios**:

1. **Given** un presupuesto completo y válido, **When** el freelancer solicita el PDF, **Then** la aplicación genera un documento con logo, número, fechas, tabla de líneas y desglose de cantidades.
2. **Given** que el freelancer ha guardado datos anteriores, **When** reinicia la aplicación, **Then** el perfil, el catálogo y los presupuestos permanecen disponibles.

### Edge Cases

- Qué ocurre cuando un presupuesto no tiene ninguna línea: la aplicación debe avisar al usuario y bloquear la generación de PDF hasta que haya contenido válido.
- Qué ocurre cuando una línea se escribe a mano y no existe en el catálogo: debe admitirse como una línea válida del presupuesto.
- Qué ocurre si un cliente particular tiene activada una retención por error: la aplicación debe ignorar la retención y no aplicarla en ningún caso.
- Qué ocurre si el perfil aún no tiene logo: la aplicación debe mostrar una zona vacía o una referencia textual mínima sin bloquear la generación del PDF.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema debe permitir guardar y editar el perfil del freelancer con nombre, NIF, datos de contacto y logo.
- **FR-002**: El sistema debe permitir crear, editar y eliminar servicios del catálogo, cada uno con nombre y precio por defecto.
- **FR-003**: El sistema debe permitir crear un presupuesto indicando los datos del cliente y su tipo: empresa/autónomo o particular.
- **FR-004**: Cada línea del presupuesto debe poder venir del catálogo o escribirse a mano con descripción, cantidad y precio unitario.
- **FR-005**: El sistema debe calcular automáticamente la base imponible, el IVA al 21 %, la retención de IRPF cuando corresponda y el total final del presupuesto.
- **FR-006**: Si el cliente es particular, la retención de IRPF no se aplicará bajo ninguna circunstancia.
- **FR-007**: El sistema debe numerar cada presupuesto con el formato AAAA-NNN y reiniciar el contador al comenzar cada año.
- **FR-008**: El sistema debe mostrar la fecha de emisión y una validez de 30 días desde esa fecha en cada presupuesto.
- **FR-009**: El sistema debe permitir editar o eliminar cualquier línea del presupuesto antes de generar el PDF.
- **FR-010**: El sistema debe generar un PDF con logo, datos del freelancer y del cliente, número, fechas, líneas del presupuesto y desglose completo de base, IVA, retención y total.
- **FR-011**: Cuando el freelancer vuelva a abrir la aplicación, su perfil, su catálogo y sus presupuestos deben seguir disponibles en el equipo local.
- **FR-012**: El sistema debe evitar la generación de un PDF para un presupuesto vacío o sin líneas válidas y mostrar un aviso claro al usuario.

### Key Entities *(include if feature involves data)*

- **Freelancer**: Persona que emite presupuestos y que define su identidad comercial, datos fiscales y marca visual.
- **Servicio**: Concepto del catálogo con un nombre y un precio por defecto que se reutiliza en múltiples presupuestos.
- **Cliente**: Persona o empresa que recibe el presupuesto y cuyo tipo determina si aplica o no la retención de IRPF.
- **Presupuesto**: Documento emitido por el freelancer con número, fechas, cliente, líneas y desglose financiero.
- **Línea de presupuesto**: Registro dentro de un presupuesto que representa una cantidad, un precio unitario y una descripción, ya sea del catálogo o escrita a mano.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un freelancer puede crear un presupuesto profesional y válido en menos de 5 minutos desde el primer contacto con la herramienta.
- **SC-002**: Los importes del resumen de un presupuesto coinciden exactamente con la fórmula de la referencia de negocio para los casos de 15 %, 7 % y cliente particular.
- **SC-003**: El 90 % de los presupuestos generados se pueden completar, revisar y enviar sin correcciones manuales por parte del usuario.
- **SC-004**: El 95 % de los PDFs descargados incluyen la marca del freelancer, los datos del cliente, el número, la fecha de emisión, la validez y el desglose completo de totales.
- **SC-005**: Al cerrar y volver a abrir la aplicación, el freelancer encuentra intactos su perfil, su catálogo y sus presupuestos previamente creados.

## Assumptions

- El producto se usa como herramienta local en un equipo personal del freelancer; no se contempla sincronización ni acceso desde varios dispositivos.
- El IVA se mantiene en el 21 % por defecto para toda la versión inicial; otros tipos impositivos no se contemplan en v0.
- La retención de IRPF solo se aplica a clientes empresa/autónomo y nunca a clientes particulares.
- Si el freelancer no ha subido un logo, la aplicación mostrará una zona vacía o texto mínimo en el PDF en lugar de bloquear la emisión del documento.
- La numeración de presupuestos se reinicia cada año y el usuario no necesita introducir el número manualmente en la versión inicial.
- El sistema persistirá los datos del usuario en el almacenamiento local del equipo y no requiere cuentas ni autenticación de usuario.
- La versión inicial trabaja únicamente con euros y no incluye descuentos, impuestos alternativos ni envío del PDF desde la aplicación.
