# Implementation Plan: PresupuestosPro v0

**Branch**: 001-presupuestos-pro | **Date**: 2026-09-07 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [spec.md](spec.md)

## Summary

La primera versión de PresupuestosPro debe ayudar a un autónomo español a crear, revisar y enviar presupuestos profesionales con muy poco esfuerzo. La experiencia debe ser clara, local, fiable y útil tanto desde un navegador como desde un móvil, con un cálculo automático que no dependa de la memoria ni de las fórmulas manuales.

## Technical Context

**Language/Version**: Se prioriza una experiencia sencilla y entendible sin exigir lenguaje técnico al usuario. La solución debe funcionar igual de bien en web y móvil.

**Primary Dependencies**: Perfil del freelancer, catálogo de servicios, presupuesto con líneas, cálculo de impuestos y exportación a PDF.

**Storage**: Los datos viven en el equipo del usuario; no se usa una cuenta ni almacenamiento remoto.

**Testing**: Verificación por escenarios de usuario, control de totales y comprobación de que el PDF lleva la información correcta.

**Target Platform**: Web y móvil, pensados para uso diario y con una operación rápida en la práctica.

**Project Type**: Aplicación de uso personal para crear y guardar presupuestos con marca propia.

**Performance Goals**: Un presupuesto completo debe poder prepararse y revisarse en menos de 5 minutos.

**Constraints**: Debe ser simple de entender, sin login, sin sincronización en la nube, sin demasiadas pantallas ni decisiones complejas.

**Scale/Scope**: Uso individual, varios presupuestos al mes, catálogo de servicios con un número limitado de opciones y un flujo de trabajo claro.

## Constitution Check

*GATE: Debe pasar antes de la investigación de diseño. Se revisa de nuevo al terminar la fase de diseño.*

- Simplicidad ante todo: Pass. Se mantiene el alcance a la creación de presupuestos, cálculo y exportación, sin funciones extras.
- Idioma y mercado: Pass. Todo se expresa en español de España y la moneda base es el euro.
- Cero alcance fantasma: Pass. No se añaden funciones fuera de la especificación.
- Verificable por una persona no técnica: Pass. Cada función se puede comprobar desde la pantalla y desde el PDF final.
- Datos del usuario con respeto: Pass. No se pide información extra ni se almacena en la nube.

## Project Structure

### Documentation (this feature)

```text
specs/001-presupuestos-pro/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
├── spec.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
app/
├── profile/
├── catalog/
├── quotes/
├── pdf/
└── storage/

shared/
├── calculations/
├── formatting/
└── rules/

tests/
├── happy-path/
├── edge-cases/
└── export/
```

**Structure Decision**: Se mantiene una sola experiencia funcional con tres áreas claras: perfil del profesional, catálogo y presupuestos. La lógica de cálculo y presentación se comparte para web y móvil para mantener consistencia y simplicidad.

## Complexity Tracking

> No hay violaciones relevantes de la constitución en esta primera versión. La solución se mantiene dentro del alcance propuesto y evita añadidos que no aporten valor directo.
