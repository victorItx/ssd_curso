# Quickstart: Exportación de presupuestos en ZIP

## Prerrequisitos

- Node.js instalado.
- Dependencias instaladas con `npm install`.
- Navegador local disponible.

## Validación automatizada

```bash
npm test
```

Debe mantenerse la regresión existente y añadirse cobertura para:

- Snapshot con perfil, logo, catálogo y todos los presupuestos.
- ZIP con exactamente un archivo de datos y un PDF por presupuesto.
- Nombre `presupuestospro-copia-AAAA-MM-DD.zip` y nombres PDF seguros/unívocos.
- Rechazo todo-o-nada cuando un presupuesto no puede producir un PDF.
- No modificación del estado antes y después de exportar.
- Totales idénticos al céntimo y misma presentación que el PDF individual.

## Validación manual de navegador

Arrancar la app:

```bash
npm start
```

Abrir `http://localhost:3000` y seguir estos escenarios:

1. Crear y guardar tres presupuestos. En `Presupuestos`, pulsar `Exportar todo (.zip)`. Confirmar una única descarga con nombre `presupuestospro-copia-AAAA-MM-DD.zip`.
2. Descomprimir el ZIP. Confirmar tres PDF con formato `número - cliente.pdf` y un único `presupuestospro-datos.json` que contiene presupuestos, catálogo, perfil y logo.
3. Comparar un PDF del ZIP con el PDF individual. Confirmar que contenido, presentación y total, incluido un caso de `3.604,00 €`, son idénticos.
4. Borrar o usar un perfil sin presupuestos. Pulsar el botón y confirmar aviso claro, cero descargas y estado normal de la app.
5. Preparar 50 o más presupuestos. Confirmar que aparece inmediatamente el estado de trabajo, que el botón no permite una segunda exportación y que el ZIP final no omite elementos.
6. Usar un cliente como `Diseño/Web S.L.` y otro que produzca el mismo nombre limpio. Confirmar nombres válidos, reconocibles y únicos.
7. Comparar presupuestos, catálogo, perfil y logo antes y después. Confirmar que la exportación no cambia ningún dato.

## Contratos relacionados

- [data-model.md](data-model.md)
- [export-backup-contract.md](contracts/export-backup-contract.md)
