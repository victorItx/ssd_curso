import { calculateIrpf } from '../rules/irpf_rules.js';
import { shouldApplyIrpf } from '../rules/client_type_rules.js';
import { hasValidLines } from '../rules/business_rules.js';

export function calculateQuoteTotals(quote = {}) {
  const safeLines = Array.isArray(quote?.lines) ? quote.lines : [];
  const baseImponible = safeLines.reduce((sum, line) => {
    const quantity = Number(line?.quantity ?? 0);
    const price = Number(line?.price ?? 0);
    return sum + quantity * price;
  }, 0);

  const iva = Number((baseImponible * 0.21).toFixed(2));
  const normalizedType = String(quote?.customerType ?? 'empresa').toLowerCase();
  const irpfEnabled = shouldApplyIrpf(normalizedType) && Boolean(quote?.irpfEnabled);
  const irpf = calculateIrpf(baseImponible, normalizedType, irpfEnabled, quote?.irpfRate ?? 0);
  const total = Number((baseImponible + iva - irpf).toFixed(2));

  return {
    baseImponible,
    iva,
    irpf,
    total,
  };
}

export function validateQuoteForPdf(quote) {
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
