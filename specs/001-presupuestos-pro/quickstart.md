# Quickstart: validación funcional de PresupuestosPro v0

## Objetivo

Comprobar que la aplicación cumple la necesidad principal: crear un presupuesto profesional, revisar los números y entregarlo en PDF sin fricción.

## Prerrequisitos

- El freelancer dispone de la aplicación abierta.
- Tiene una idea básica de su nombre, NIF y datos de contacto.
- Tiene al menos un servicio típico en el catálogo o puede escribir uno a mano.

## Escenarios de validación

### 1. Configurar el perfil
1. Abrir la configuración del freelancer.
2. Rellenar nombre, NIF, datos de contacto y logo.
3. Guardar los cambios.
4. Comprobar que el perfil queda disponible al crear un presupuesto nuevo.

Resultado esperado: el presupuesto sale con la marca del profesional y sin repetir la información cada vez.

### 2. Crear un catálogo básico
1. Añadir un servicio con nombre y precio por defecto.
2. Guardar ese servicio.
3. Crear un segundo servicio más.
4. Comprobar que ambos están disponibles para reutilizar.

Resultado esperado: el freelancer puede reutilizar servicios sin volver a escribirlos cada vez.

### 3. Crear un presupuesto con retención
1. Crear un presupuesto para una empresa o autónomo.
2. Añadir dos líneas con importes de ejemplo.
3. Seleccionar la retención del 15 %.
4. Revisar la base, el IVA, la retención y el total.

Resultado esperado: los importes aparecen calculados automáticamente y el total coincide con la regla de negocio.

### 4. Probar el caso particular
1. Cambiar el tipo de cliente a particular.
2. Verificar que la retención no se aplica.
3. Comprobar que el total aumenta respecto al caso con retención.

Resultado esperado: la retención desaparece sin intervención manual y el total se recalcula.

### 5. Generar el PDF
1. Revisar todas las líneas.
2. Editar o borrar una línea si hace falta.
3. Generar el PDF.
4. Revisar que el documento incluye logo, cliente, número, fechas, validez y desglose completo.

Resultado esperado: el documento final tiene una apariencia profesional y se puede enviar al cliente.

### 6. Reabrir la aplicación
1. Cerrar la aplicación.
2. Volver a abrirla.
3. Comprobar que perfil, catálogo y presupuestos siguen disponibles.

Resultado esperado: la información persiste en el equipo del usuario.

## Criterio de éxito del flujo

La app cumple la primera versión si un freelancer puede, en una sesión normal, configurar su perfil, crear un presupuesto, corregir datos si hace falta y descargar un PDF listo para enviar, sin dudas sobre los importes.
