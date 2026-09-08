# Feature Specification: Presentacion y navegacion de PresupuestosPro

**Feature Branch**: `002-presentacion-navegacion`

**Created**: 2026-09-08

**Status**: Draft

**Input**: User description: "Mejorar la presentación de PresupuestosPro con una página de inicio, navegación común y un rediseño visual profesional, sin alterar funcionalidad ni datos existentes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Encontrar cualquier sección desde el inicio (Priority: P1)

Como freelancer, quiero que la raíz de la aplicación muestre una página de inicio clara para acceder directamente a Presupuestos, Clientes, Catálogo y Perfil, y entender de un vistazo la actividad de mis presupuestos.

**Why this priority**: La página de inicio será el punto de entrada habitual y debe reducir el tiempo necesario para retomar el trabajo.

**Independent Test**: Con la aplicación abierta en su raíz, un freelancer puede identificar las cuatro secciones, entrar en cada una y consultar un resumen de actividad sin modificar ningún dato.

**Acceptance Scenarios**:

1. **Given** que el freelancer accede a la raíz de la aplicación, **When** se muestra la página de inicio, **Then** aparecen accesos claros a Presupuestos, Clientes, Catálogo y Perfil.
2. **Given** que existen presupuestos en distintos estados, **When** el freelancer consulta el resumen de actividad, **Then** puede distinguir el número de presupuestos de cada estado existente, incluidos Borrador, Enviado, Aceptado, Rechazado y Caducado cuando correspondan.
3. **Given** que no hay presupuestos o no hay actividad para un estado, **When** el freelancer consulta el resumen, **Then** la interfaz muestra un estado vacío comprensible sin inventar datos ni bloquear el acceso a las secciones.
4. **Given** que el freelancer está en cualquiera de las páginas de la aplicación, **When** quiere cambiar de sección, **Then** encuentra la navegación común visible y puede ir a otra sección sin depender del botón atrás del navegador.

### User Story 2 - Reconocer y usar una interfaz coherente (Priority: P1)

Como freelancer, quiero que todas las secciones compartan una apariencia profesional y sobria para localizar títulos, formularios, tablas, totales y acciones sin tener que aprender un diseño distinto en cada página.

**Why this priority**: La coherencia visual transmite confianza y reduce la carga cognitiva en un flujo de uso repetido.

**Independent Test**: El freelancer recorre las cuatro secciones y puede identificar de forma consistente la navegación, el título de la página, el contenido principal, las acciones y los estados de presupuesto en móvil y escritorio.

**Acceptance Scenarios**:

1. **Given** que el freelancer cambia entre secciones, **When** observa sus páginas, **Then** la tipografía, los colores, el espaciado y la jerarquía de títulos, tablas, formularios y totales siguen las mismas reglas visuales.
2. **Given** que un presupuesto aparece en una tabla, resumen o detalle, **When** su estado cambia entre Borrador, Enviado, Aceptado, Rechazado y Caducado, **Then** cada estado se distingue de forma clara y consistente mediante texto y una señal visual que no dependa únicamente del color.
3. **Given** que el freelancer usa la aplicación en una pantalla móvil, **When** consulta o edita cualquier sección existente, **Then** el contenido conserva legibilidad, orden visual y acceso a las acciones sin perder información por desbordamiento horizontal.

### User Story 3 - Entregar un PDF alineado con la aplicación (Priority: P2)

Como freelancer, quiero que el PDF que recibe mi cliente conserve la misma imagen profesional que la aplicación para que la experiencia sea coherente desde la preparación hasta el documento final.

**Why this priority**: El PDF es el resultado que sale de la aplicación y representa directamente al profesional ante su cliente.

**Independent Test**: Con un presupuesto válido ya existente, el freelancer genera el PDF y compara su presentación con las reglas visuales de la aplicación sin que cambien sus datos ni sus importes.

**Acceptance Scenarios**:

1. **Given** un presupuesto válido, **When** el freelancer genera el PDF, **Then** el documento conserva la identidad visual definida para la aplicación en tipografía, colores, espaciado y jerarquía de información.
2. **Given** que el PDF contiene datos de freelancer, cliente, líneas, fechas y totales, **When** se aplica el nuevo diseño, **Then** todos esos datos permanecen presentes, legibles y sin cambios de valor o formato funcional.
3. **Given** que el perfil no tiene logo, **When** el freelancer genera el PDF, **Then** se conserva el comportamiento existente de sustitución o espacio reservado y el rediseño no bloquea la generación.

### Edge Cases

- Qué ocurre cuando se accede directamente a una sección profunda o a una ruta no reconocida: la navegación debe seguir siendo comprensible y el usuario debe recibir el tratamiento de ruta ya definido por la aplicación, sin crear una nueva funcionalidad de negocio.
- Qué ocurre cuando un estado de presupuesto no tiene registros: el contador debe mostrar cero o el estado vacío definido, sin ocultar la categoría ni presentar un valor ambiguo.
- Qué ocurre cuando un texto de cliente, servicio o presupuesto es largo: debe conservarse la legibilidad en tablas, tarjetas, formularios y PDF sin solapar otros contenidos.
- Qué ocurre cuando un presupuesto tiene un estado cuyo color no es distinguible para una persona con deficiencia de visión cromática: el nombre del estado y otra señal visual deben seguir comunicándolo.
- Qué ocurre cuando el tamaño de pantalla es reducido: la navegación y las acciones deben seguir siendo utilizables sin exigir desplazamiento horizontal de la página.
- Qué ocurre cuando el PDF ocupa más de una página: la jerarquía visual y la legibilidad deben mantenerse sin eliminar ni duplicar información.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación debe mostrar una página de inicio al acceder a la raíz del servidor, sin requerir una acción previa ni modificar el estado del usuario.
- **FR-002**: La página de inicio debe ofrecer navegación directa y claramente identificada hacia Presupuestos, Clientes, Catálogo y Perfil.
- **FR-003**: La página de inicio debe mostrar un resumen de actividad basado exclusivamente en los presupuestos existentes, con el número correspondiente a cada estado disponible.
- **FR-004**: El resumen de actividad debe contemplar Borrador, Enviado, Aceptado, Rechazado y Caducado, y debe representar de forma explícita los estados sin registros.
- **FR-005**: Todas las páginas existentes y la página de inicio deben compartir una navegación visible hacia las cuatro secciones, con una indicación clara de la sección activa.
- **FR-006**: La navegación común debe conservar su utilidad en las anchuras de pantalla ya admitidas por la aplicación y no depender del botón atrás del navegador para cambiar de sección.
- **FR-007**: La aplicación debe aplicar una única definición coherente de tipografía, paleta de colores limitada, espaciado y jerarquía visual a la página de inicio y a todas las secciones existentes.
- **FR-008**: La jerarquía visual debe distinguir de forma consistente títulos, contenido principal, tablas, formularios, acciones y totales, sin cambiar el significado ni la disponibilidad de dichas áreas.
- **FR-009**: Cada presupuesto debe mostrar sus estados Borrador, Enviado, Aceptado, Rechazado y Caducado con una presentación distinguible, consistente y accesible, usando el nombre del estado además de señales visuales.
- **FR-010**: El rediseño debe mantener el enfoque mobile-first existente, conservar la legibilidad y evitar que el contenido o las acciones queden ocultos, solapados o inutilizables en pantallas pequeñas.
- **FR-011**: La plantilla del PDF debe aplicar la misma identidad visual definida para la aplicación, incluyendo tipografía, paleta, espaciado y jerarquía de información.
- **FR-012**: El PDF rediseñado debe conservar todos los datos, importes, fechas, líneas, estados y reglas de generación ya existentes, sin añadir ni eliminar información funcional.
- **FR-013**: La mejora debe conservar sin cambios la lógica de negocio, los cálculos, la API, el esquema de datos, la persistencia y los flujos funcionales existentes.
- **FR-014**: La mejora no debe crear nuevos campos, estados de negocio, transiciones, operaciones de datos ni configuraciones que no estén ya disponibles en la aplicación.
- **FR-015**: Todos los textos nuevos o modificados de la interfaz y del PDF deben estar en español de España y usar terminología coherente con la aplicación existente.

### Key Entities *(include if feature involves data)*

- **Página de inicio**: Punto de entrada visual que ofrece navegación a las cuatro secciones y presenta un resumen derivado de los presupuestos existentes.
- **Navegación común**: Elemento compartido por las páginas de la aplicación que identifica las cuatro secciones y la sección activa sin alterar sus rutas ni sus datos.
- **Estado de presupuesto**: Valor existente del presupuesto que se presenta con una señal visual diferenciada para Borrador, Enviado, Aceptado, Rechazado y Caducado.
- **Sistema visual**: Conjunto coherente de decisiones de tipografía, colores, espaciado y jerarquía que se aplica a la interfaz y a la plantilla del PDF sin constituir nuevos datos de negocio.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En una sesión de uso, el freelancer puede llegar desde la raíz a cualquiera de las cuatro secciones con un único acceso visible desde la página de inicio.
- **SC-002**: El 100% de las páginas existentes muestran la navegación común y una indicación identificable de la sección activa en las anchuras de pantalla admitidas.
- **SC-003**: El 100% de los estados Borrador, Enviado, Aceptado, Rechazado y Caducado se distinguen mediante su texto y al menos una señal visual adicional, sin depender únicamente del color.
- **SC-004**: En una revisión de las cuatro secciones y de la página de inicio, todos los títulos, tablas, formularios, totales y acciones principales siguen una jerarquía visual consistente y no presentan solapamientos ni desbordamiento horizontal en móvil.
- **SC-005**: El 100% de los PDFs generados después del rediseño conserva los datos e importes del presupuesto de origen y aplica la identidad visual definida para la aplicación.
- **SC-006**: Una comparación de regresión sobre los datos y cálculos existentes no identifica cambios en el esquema, la API, la persistencia, las reglas de negocio ni los importes generados.
- **SC-007**: El 100% de los textos nuevos o modificados de la interfaz y del PDF está escrito en español de España.

## Assumptions

- La aplicación ya dispone de las cuatro secciones y de sus rutas actuales; esta feature solo mejora su entrada, navegación y presentación.
- Los estados Borrador, Enviado, Aceptado, Rechazado y Caducado ya forman parte del dominio o de la información disponible para mostrar; esta feature no define cómo se crean ni cambian.
- El resumen de actividad es informativo y de solo lectura: no añade filtros, edición, archivado ni nuevas operaciones sobre presupuestos.
- Se conserva el comportamiento actual para perfiles sin logo, presupuestos vacíos, persistencia local, cálculos fiscales y exportación del contenido.
- La misma identidad visual puede expresarse en la aplicación y en el PDF respetando las limitaciones de legibilidad y paginación del formato PDF.
- No se añaden autenticación, sincronización, analítica, notificaciones, envío por correo ni nuevas capacidades de gestión documental.