# Data Model: PresupuestosPro v0

## Entidades principales

### Perfil del freelancer

Representa la identidad comercial del usuario.

Campos clave:
- nombre comercial
- NIF
- datos de contacto
- logo
- configuración de retención por defecto

Reglas:
- Debe poder editarse en cualquier momento.
- La marca debe aplicarse a los presupuestos y al PDF.
- Si no hay logo, la aplicación debe seguir permitiendo generar el documento.

### Servicio del catálogo

Representa una línea de trabajo habitual que se reutiliza muchas veces.

Campos clave:
- nombre del servicio
- precio por defecto

Reglas:
- Se puede crear, editar y borrar.
- Debe poder reutilizarse en varios presupuestos.
- El nombre debe ser claro y entendible por el cliente.

### Cliente

Representa la persona o empresa que recibe el presupuesto.

Campos clave:
- nombre
- tipo: empresa/autónomo o particular
- datos de contacto
- observaciones del presupuesto

Reglas:
- Si es particular, la retención no se aplica.
- Si es empresa/autónomo, la retención puede activarse con 15 % o 7 %.

### Presupuesto

Representa la propuesta económica que se envía al cliente.

Campos clave:
- número automático
- fecha de emisión
- validez
- cliente asociado
- lista de líneas
- base imponible
- IVA
- retención
- total
- estado (borrador o listo para PDF)

Reglas:
- El número debe seguir el formato AAAA-NNN.
- La validez es de 30 días desde la fecha de emisión.
- El total se calcula automáticamente con la fórmula de la especificación.

### Línea del presupuesto

Representa cada concepto incluido en la oferta.

Campos clave:
- descripción
- cantidad
- precio unitario
- origen: catálogo o escrita a mano

Reglas:
- Se puede editar o borrar antes de generar el PDF.
- Si no hay líneas válidas, el PDF no puede generarse.
- Es válido tanto un servicio del catálogo como una línea escrita a mano.

## Relaciones

- Un freelancer tiene un perfil único.
- Un freelancer tiene muchos servicios en su catálogo.
- Un freelancer tiene muchos presupuestos.
- Cada presupuesto tiene varios clientes y varias líneas.
- La información de cliente, catálogo y líneas se usa para generar el PDF final.

## Reglas de negocio clave

- IVA general: 21 %.
- Retención solo para empresa/autónomo.
- Retención general: 15 %.
- Retención para nuevos autónomos: 7 %.
- Fórmula: total = base + IVA − retención.
- Sin retención para particulares.
