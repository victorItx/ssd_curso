# Research: PresupuestosPro v0

## Decisión principal

La aplicación debe funcionar como una herramienta local, simple y rápida para un autónomo que necesita sacar un presupuesto sin complicarse. La prioridad es la velocidad, la claridad y la confianza en los importes.

## Razonamiento

### 1. Guardar los datos en el equipo del usuario
- Decision: Los datos del perfil, catálogo y presupuestos se guardan localmente en el dispositivo del freelancer.
- Rationale: Esto encaja con la versión inicial, evita cuentas, no requiere nube y cumple el objetivo de no añadir fricción.
- Alternatives considered: Guardar en la nube, crear cuentas y sincronización entre equipos. Se descartan porque la primera versión quiere rapidez y sencillez.

### 2. Mantener una sola regla clara para los impuestos
- Decision: El IVA es fijo al 21 % y la retención de IRPF es opcional solo para clientes empresa/autónomo, con 15 % o 7 %.
- Rationale: La regla económica es simple, comprensible y ya está definida en la especificación.
- Alternatives considered: Dejar que el usuario configure cualquier porcentaje, añadir más impuestos o tipos de cliente complejos. Se descartan para mantener la primera versión útil y estable.

### 3. Hacer el cálculo visible en cada paso
- Decision: El presupuesto muestra la base, el IVA, la retención y el total en la misma pantalla mientras se escribe.
- Rationale: Esto reduce errores y ayuda a que el usuario vea el impacto de cada cambio al instante.
- Alternatives considered: Calcular solo al final o ocultar el desglose. Se descarta porque la revisión en vivo es clave para la confianza del freelancer.

### 4. Exportar la entrega final en PDF
- Decision: El presupuesto se entrega como un documento PDF con la marca del freelancer, los datos del cliente y el desglose final.
- Rationale: Es la forma de enviarlo por email sin necesidad de más herramientas ni complejidad.
- Alternatives considered: Enviar desde la app, abrir un HTML para imprimir o generar solo texto. Se descarta porque la especificación pide un PDF con buena imagen y sin acciones extra.

### 5. Diseñar para web y móvil sin cambiar la idea
- Decision: La experiencia se organiza con tres bloques básicos: perfil, catálogo y presupuesto. En móvil se adaptan los tamaños, pero no la lógica.
- Rationale: La funcionalidad no cambia según el dispositivo; solo cambia la forma en que se muestra.
- Alternatives considered: Mantener una versión distinta para móvil y otra para web. Se descarta porque la primera versión debe ser coherente y económica de mantener.

## Conclusión

La solución adecuada para v0 es una herramienta local, de uso diario y fácil de entender, con cálculo automático y salida en PDF. La funcionalidad principal no necesita más cosas para ser útil: perfil, catálogo, presupuesto y entregable final.
