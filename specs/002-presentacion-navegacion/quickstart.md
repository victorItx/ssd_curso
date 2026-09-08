# Quickstart: validar Presentacion y navegacion

## Prerrequisitos

- Node.js disponible en el entorno del proyecto.
- Dependencias del proyecto instaladas, si fueran necesarias.
- Aplicación iniciada con `npm start`.
- Navegador de escritorio y una viewport móvil o emulador equivalente.
- Datos de ejemplo existentes: al menos un perfil, un servicio y varios presupuestos; preparar también el caso sin presupuestos.

## Comprobaciones automatizadas

Desde la raíz del proyecto:

```bash
npm test
```

Resultado esperado: las pruebas existentes de perfil, catálogo, creación de presupuestos, cálculos y validación de PDF siguen pasando sin cambios en sus importes ni reglas.

## Escenario 1: entrada y navegación

1. Iniciar la aplicación con `npm start`.
2. Abrir la raíz del servidor.
3. Confirmar que aparece la página de inicio.
4. Identificar Presupuestos, Clientes, Catálogo y Perfil.
5. Entrar en cada sección desde la navegación común.
6. Confirmar que la sección activa se distingue y que no es necesario usar el botón atrás.

Resultado esperado: la raíz es una entrada útil y todas las secciones se alcanzan con navegación visible.

## Escenario 2: resumen de actividad

1. Preparar presupuestos con varios estados disponibles.
2. Volver a la página de inicio.
3. Comparar los conteos mostrados con los presupuestos existentes.
4. Repetir con una colección vacía o con un estado sin registros.

Resultado esperado: el resumen solo refleja datos existentes y muestra cero o un estado vacío claro cuando no hay actividad.

## Escenario 3: coherencia visual y responsive

1. Recorrer inicio, Presupuestos, Clientes, Catálogo y Perfil.
2. Comparar tipografía, paleta, espaciado, títulos, formularios, tablas, acciones y totales.
3. Repetir la revisión en una viewport móvil.
4. Introducir textos largos en los datos ya disponibles.
5. Revisar los cinco estados con una señal que no dependa solo del color.

Resultado esperado: no hay solapamientos, pérdida de información ni desplazamiento horizontal de la página; la jerarquía visual es consistente y los estados se distinguen.

## Escenario 4: PDF y regresión funcional

1. Generar el documento de un presupuesto válido.
2. Comparar datos de perfil, cliente, líneas, fechas y totales con el presupuesto de origen.
3. Revisar que la presentación del documento comparte la identidad visual de la aplicación.
4. Intentar generar un documento sin líneas válidas.
5. Ejecutar de nuevo `npm test`.

Resultado esperado: el documento válido conserva todos los datos e importes y el caso inválido mantiene el bloqueo y el mensaje existentes. Ninguna regla de negocio ni estructura de datos cambia.

## Referencias

- Contrato de interfaz: [contracts/ui-contract.md](contracts/ui-contract.md)
- Modelo de proyecciones: [data-model.md](data-model.md)
- Requisitos: [spec.md](spec.md)
