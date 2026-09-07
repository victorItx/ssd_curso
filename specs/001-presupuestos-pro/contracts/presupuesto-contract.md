# Contrato funcional: presupuesto

## Documento principal

Un presupuesto representa la oferta que el freelancer presenta a un cliente.

### Campos del presupuesto
- número
- fecha de emisión
- fecha de validez
- cliente
- líneas
- resumen financiero
- estado

### Reglas del contrato
- El número se genera automáticamente cada año.
- La fecha de validez se calcula sumando 30 días desde la fecha de emisión.
- El resumen financiero debe mostrar base, IVA, retención y total.
- La retención solo puede aplicarse a clientes empresa/autónomo.
- Si el presupuesto está vacío, no se genera el PDF.

## Contrato de exportación

El PDF final debe incluir:
- logo del freelancer
- nombre del freelancer
- datos del cliente
- número del presupuesto
- fecha de emisión
- validez
- tabla de líneas
- base imponible
- IVA
- retención si procede
- total final

## Objetivo del contrato

Garantizar que el presupuesto enviado al cliente es fácil de entender, correcto y profesional, sin depender de fórmulas manuales ni de pasos extra.
