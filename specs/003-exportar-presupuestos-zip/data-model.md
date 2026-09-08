# Data Model: Exportación de presupuestos en ZIP

## Snapshot de exportación

Representa una copia inmutable del estado leído al iniciar la exportación.

| Campo | Tipo | Reglas |
|---|---|---|
| `profile` | objeto | Incluye identidad, datos de contacto y `logo`; se conserva sin mutar. |
| `catalog` | lista de servicios | Incluye cada servicio y su precio actual. |
| `quotes` | lista de presupuestos | Incluye todos los presupuestos existentes al tomar el snapshot. |
| `exportDate` | fecha local `AAAA-MM-DD` | Se usa para el nombre del ZIP. |

El snapshot no se guarda como nueva fuente de verdad. Si el estado cambia después de iniciarlo, la exportación sigue usando el snapshot original.

## Presupuesto exportado

Es cada elemento de `quotes` transformado en un PDF válido.

- **Identidad**: `id` y número visible del presupuesto.
- **Contenido**: cliente, líneas, estado, fecha, validez, perfil emisor e importes.
- **Nombre**: `<número> - <cliente-limpio>.pdf`.
- **Validez**: debe pasar la validación PDF existente antes de crear el ZIP.
- **Unicidad**: si dos nombres quedan iguales tras limpiarlos, se añade un sufijo estable para evitar colisiones.

## Archivo de datos

Único archivo `presupuestospro-datos.json` dentro del ZIP.

- Contiene `profile`, `catalog` y `quotes` del snapshot.
- Incluye el logo dentro de `profile.logo`.
- Mantiene los campos necesarios para una futura importación, pero esta feature no interpreta ni restaura el archivo.
- Su contenido representa el snapshot y no cambia el estado local.

## Copia de seguridad ZIP

- **Nombre**: `presupuestospro-copia-AAAA-MM-DD.zip`.
- **Entradas**: un PDF por presupuesto más exactamente un archivo de datos.
- **Éxito**: todas las entradas se generan y el archivo se descarga.
- **Fallo**: no se descarga archivo; la interfaz muestra el presupuesto afectado cuando proceda.

## Estados transitorios de interfaz

1. `idle`: botón disponible.
2. `preparing`: snapshot tomado, botón desactivado y estado visible de trabajo.
3. `success`: descarga iniciada y botón vuelve a estar disponible.
4. `empty`: no hay presupuestos; se muestra aviso y no se inicia descarga.
5. `error`: se informa del fallo, no se descarga ZIP y el botón vuelve a estar disponible.

Estos estados son de presentación y no se persisten.
