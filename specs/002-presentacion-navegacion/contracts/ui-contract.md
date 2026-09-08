# Contrato de interfaz: Presentacion y navegacion

Este contrato describe la superficie visible de la feature. No modifica endpoints, estructuras persistidas ni contratos de cálculo.

## Entrada

- La raíz del servidor muestra la página de inicio.
- La página de inicio no requiere autenticación ni datos adicionales.
- El estado existente del perfil, catálogo y presupuestos se conserva.

## Navegación común

La navegación debe exponer estos accesos visibles en todas las vistas:

| Etiqueta | Sección | Semántica |
| --- | --- | --- |
| Presupuestos | Presupuestos | Gestión y consulta de presupuestos existentes |
| Clientes | Clientes | Consulta de información de cliente ya disponible |
| Catálogo | Catálogo | Gestión y consulta del catálogo existente |
| Perfil | Perfil | Consulta y edición del perfil existente |

Requisitos del contrato:

- La sección activa debe ser identificable.
- El acceso debe funcionar sin depender del botón atrás.
- La navegación debe seguir siendo utilizable en móvil.
- La navegación no puede crear ni modificar datos por sí misma.

## Página de inicio

Debe incluir:

- Identidad de PresupuestosPro.
- Los cuatro accesos de navegación.
- Un resumen de conteos por Borrador, Enviado, Aceptado, Rechazado y Caducado.
- Estado vacío comprensible cuando no haya presupuestos o un estado no tenga registros.

El resumen no debe incluir operaciones de edición, filtros, archivado ni transiciones de estado.

## Estados visuales

Cuando la interfaz disponga de un estado de presupuesto, debe mostrar su nombre y una señal adicional distinguible para:

- Borrador
- Enviado
- Aceptado
- Rechazado
- Caducado

La señal adicional no puede depender únicamente del color.

## PDF

La salida de documento debe conservar el contrato funcional existente:

- `title`
- `pages[].text`
- `valid`
- `message`
- `downloadName` en la operación de exportación

El rediseño puede ordenar y jerarquizar el contenido de `pages[].text`, pero no puede cambiar los campos, importes, validación de líneas ni reglas de cálculo. Un presupuesto no válido debe conservar su mensaje y no generar un documento válido.
