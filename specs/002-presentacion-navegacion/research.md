# Research: Presentacion y navegacion de PresupuestosPro

## Decision: Mantener la aplicacion como una experiencia web local de una sola entrada

**Decision**: La raiz del servidor seguirá sirviendo la experiencia principal y la navegación se resolverá dentro de la página pública, reutilizando las rutas de entrada actuales sin crear una API ni un sistema de autenticación nuevo.

**Rationale**: El servidor actual sirve `public/index.html` para la raíz y para cualquier URL no reservada. La feature es de presentación y debe minimizar el riesgo de tocar el dominio o el contrato HTTP existente.

**Alternatives considered**: Crear un router de servidor o separar la aplicación en varias páginas físicas. Se descartan porque añadirían superficie de infraestructura y no aportan valor frente a vistas de presentación dentro de la entrada existente.

## Decision: Representar las cuatro secciones como vistas de presentación sobre el estado existente

**Decision**: Presupuestos, Clientes, Catálogo y Perfil se presentarán como secciones navegables que leen los datos ya disponibles. El resumen de inicio será de solo lectura y derivará los contadores del listado existente de presupuestos.

**Rationale**: El código actual concentra perfil, conceptos, cliente, resumen e historial en `public/index.html`, mientras que el almacenamiento de dominio conserva perfil, catálogo y presupuestos. No existe un modelo nuevo de cliente ni un router de negocio que deba modificarse.

**Alternatives considered**: Añadir entidades, endpoints o persistencia específica para clientes y estados. Se descartan por conflicto directo con FR-013 y FR-014.

## Decision: Centralizar el sistema visual en la hoja de estilos de la interfaz

**Decision**: La tipografía, paleta, espaciado, radios, bordes, estados y jerarquía se definirán en un único bloque de tokens visuales y reglas compartidas dentro de la superficie de estilos existente.

**Rationale**: La interfaz actual usa CSS inline con variables ya existentes, por lo que una evolución centralizada permite aplicar el rediseño a todas las vistas sin duplicar decisiones ni cambiar la lógica JavaScript.

**Alternatives considered**: Introducir un framework o una dependencia de componentes. Se descarta porque la aplicación no tiene pipeline frontend ni dependencia visual y la constitución prioriza simplicidad.

## Decision: Hacer distinguibles los estados sin cambiar el dominio

**Decision**: La presentación mostrará Borrador, Enviado, Aceptado, Rechazado y Caducado mediante su etiqueta textual y señales visuales redundantes. La implementación leerá los valores existentes y no creará transiciones ni almacenamiento para estados que el dominio no proporcione.

**Rationale**: La spec exige presentación de estados, pero la exploración no encontró una máquina de estados equivalente en el código actual. La separación evita inventar comportamiento de negocio mientras deja definido el contrato visual.

**Alternatives considered**: Añadir estados y acciones de envío/aceptación/rechazo/caducidad. Se descarta por el alcance explícito de la feature.

## Decision: Tratar el PDF actual como documento estructurado con identidad visual

**Decision**: La identidad del PDF se expresará en la representación de documento que ya devuelve `app/pdf/pdf_export.js`, preservando validación, campos, importes y nombre de descarga. La creación de un renderer binario o una nueva librería PDF queda fuera de esta feature.

**Rationale**: El exportador actual no produce un binario; produce título, páginas textuales y metadatos de descarga. Mantener ese contrato permite aplicar orden, encabezados, etiquetas y jerarquía sin cambiar cálculos o datos.

**Alternatives considered**: Incorporar una dependencia de renderizado PDF. Se descarta porque sería una ampliación técnica y funcional no solicitada y requeriría definir un nuevo contrato de salida.

## Decision: Validar presentación con pruebas de regresión y escenarios de viewport

**Decision**: Se conservarán las pruebas Node existentes para la lógica y se añadirán comprobaciones de estructura de la página pública, navegación, contadores, textos de estado y documento exportado. La validación visual deberá cubrir móvil y escritorio mediante escenarios manuales o una herramienta de navegador disponible en el entorno.

**Rationale**: La feature tiene riesgo principal de regresión visual y de datos, no de cálculo. Separar ambas verificaciones permite demostrar que el rediseño no altera la lógica existente.

**Alternatives considered**: Sustituir las pruebas de negocio por pruebas de interfaz. Se descarta porque los cálculos, validadores y modelos deben seguir protegidos por sus pruebas actuales.
