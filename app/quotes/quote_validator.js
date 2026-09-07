import { hasValidLines } from '../../shared/rules/business_rules.js';

export function canGeneratePdf(quote = {}) {
  if (!hasValidLines(quote?.lines ?? [])) {
    return {
      valid: false,
      message: 'No se puede generar el PDF porque el presupuesto está sin líneas válidas.',
    };
  }

  return {
    valid: true,
    message: 'El presupuesto tiene líneas válidas y puede exportarse a PDF.',
  };
}
