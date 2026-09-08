# Data Model: Presentacion y navegacion de PresupuestosPro

Esta feature no introduce entidades persistentes ni cambia el esquema de datos. Las estructuras siguientes son proyecciones de lectura para la interfaz.

## Inicio de actividad

**Purpose**: Proyección informativa para la página de inicio.

**Fields**:

- `quoteCounts`: conteos por estado de los presupuestos existentes.
- `hasQuotes`: indica si existe al menos un presupuesto disponible para resumir.

**Rules**:

- Se calcula únicamente a partir de los presupuestos ya disponibles.
- Debe contemplar Borrador, Enviado, Aceptado, Rechazado y Caducado.
- Un estado sin registros se representa explícitamente con cero o con el estado vacío visual definido.
- No se persiste como una entidad independiente.

## Seccion de navegacion

**Purpose**: Proyección de la sección activa y los accesos comunes.

**Fields**:

- `section`: uno de `inicio`, `presupuestos`, `clientes`, `catalogo` o `perfil`.
- `label`: texto visible en español de España.
- `href`: destino de presentación que conserva la entrada/ruta que la aplicación admita.
- `active`: indicador visual derivado de la sección actual.

**Rules**:

- Las cuatro secciones funcionales deben estar disponibles desde la navegación común.
- La sección activa se comunica mediante texto, estilo o atributo accesible.
- No se crea un permiso, usuario, entidad o registro nuevo.

## Estado visual de presupuesto

**Purpose**: Presentación consistente de un estado de presupuesto que ya exista en los datos de la aplicación.

**Values**:

- `Borrador`
- `Enviado`
- `Aceptado`
- `Rechazado`
- `Caducado`

**Rules**:

- El texto del estado es obligatorio cuando el estado se muestra.
- Cada valor tiene una señal visual diferenciable además del color, como icono, borde, patrón o contraste de peso.
- La proyección no cambia el estado, no crea transiciones y no persiste cambios.

## Sistema visual

**Purpose**: Tokens de presentación compartidos por interfaz y documento.

**Fields**:

- `fontFamily`: familia tipográfica coherente.
- `colors`: paleta limitada para fondo, superficie, texto, borde, acción, aviso y estados.
- `spacing`: escala uniforme de espaciado.
- `hierarchy`: reglas de tamaño, peso y contraste para títulos, tablas, formularios, acciones y totales.

**Rules**:

- Se define en un único lugar de la presentación.
- No representa datos de negocio.
- Debe poder aplicarse tanto a móvil como a escritorio y al documento exportado.

## Relaciones

- `Inicio de actividad` lee una colección existente de `Presupuesto`.
- `Seccion de navegacion` apunta a vistas de presentación de Perfil, Catálogo, Clientes y Presupuestos.
- `Estado visual de presupuesto` presenta un valor existente de `Presupuesto`.
- `Sistema visual` es compartido por todas las vistas y por la representación del PDF.
