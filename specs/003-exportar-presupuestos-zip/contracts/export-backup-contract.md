# Contrato: Exportación de presupuestos en ZIP

## Interfaz visible

- Ubicación: vista `Presupuestos`, junto a las acciones de exportación del presupuesto actual.
- Texto: `Exportar todo (.zip)`.
- Estado normal: botón habilitado si hay presupuestos.
- Estado vacío: aviso claro y sin descarga.
- Estado en curso: botón deshabilitado, `aria-busy="true"` en el contenedor de estado y texto visible de preparación.
- Estado de error: mensaje visible; el botón vuelve a estar disponible.

## Endpoint local

### `POST /api/export-backup`

La petición se realiza únicamente contra el servidor local que sirve la aplicación.

**Payload JSON**:

```json
{
  "exportDate": "2026-03-15",
  "profile": { "name": "Ana García", "logo": "..." },
  "catalog": [{ "id": "srv-1", "name": "Diseño web", "price": 450 }],
  "quotes": [{ "number": "2026-001", "customer": "Estudio García", "lines": [] }]
}
```

**Precondiciones**:

- `quotes` contiene al menos un presupuesto.
- `exportDate` tiene formato `AAAA-MM-DD`.
- `profile`, `catalog` y `quotes` son datos serializables del snapshot local.

### Respuesta correcta

- Estado HTTP: `200`.
- Tipo: `application/zip`.
- Cabecera de descarga: `presupuestospro-copia-AAAA-MM-DD.zip`.
- Contenido: PDFs válidos y exactamente un `presupuestospro-datos.json`.

### Respuesta de error

- Estado HTTP: `400` para snapshot vacío o inválido; `422` si un presupuesto no puede producir un PDF válido; `500` para fallo inesperado de creación.
- Tipo: `application/json`.

```json
{
  "error": "No se pudo generar el PDF del presupuesto 2026-001.",
  "quoteNumber": "2026-001"
}
```

No se devuelve ningún ZIP parcial.

## Contrato de PDF

La generación masiva debe consumir la misma función/representación que `exportQuotePdf` usa para la descarga individual. El renderer de bytes no puede recalcular reglas ni cambiar formato, y debe conservar los contratos públicos existentes.
