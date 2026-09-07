import { calculateQuoteTotals } from '../../shared/calculations/quote_totals.js';
import { canGeneratePdf } from '../quotes/quote_validator.js';

export function buildPdfDocument(profile, quote) {
  const validation = canGeneratePdf(quote);
  if (!validation.valid) {
    return {
      title: 'Presupuesto Profesional',
      pages: [{ text: validation.message }],
      valid: false,
      message: validation.message,
    };
  }

  const totals = quote?.totals ?? calculateQuoteTotals(quote);

  const summary = [
    'Presupuesto Profesional',
    `Emisor: ${profile?.name ?? 'Freelancer'}`,
    `Cliente: ${quote?.customer ?? 'Cliente'}`,
    `Tipo de cliente: ${quote?.customerType ?? 'empresa'}`,
    `Número: ${quote?.number ?? '2026-001'}`,
    `Fecha: ${quote?.createdAt ?? new Date().toISOString()}`,
    `Validez: ${quote?.validForDays ?? 30} días`,
    `Base imponible: ${totals.baseImponible.toFixed(2)} €`,
    `IVA: ${totals.iva.toFixed(2)} €`,
    `IRPF: ${totals.irpf.toFixed(2)} €`,
    `Total: ${totals.total.toFixed(2)} €`,
  ];

  return {
    title: 'Presupuesto Profesional',
    pages: [{ text: summary.join('\n') }],
    valid: true,
    message: 'PDF generado correctamente.',
  };
}

export function exportQuotePdf(profile, quote) {
  const document = buildPdfDocument(profile, quote);
  return {
    ...document,
    downloadName: `${quote?.number ?? 'presupuesto'}.pdf`,
  };
}
