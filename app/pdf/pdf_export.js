import { calculateQuoteTotals } from '../../shared/calculations/quote_totals.js';
import { canGeneratePdf } from '../quotes/quote_validator.js';

export function buildPdfDocument(profile, quote, { allowLegacySummary = false } = {}) {
  const validation = canGeneratePdf(quote);
  if (!validation.valid) {
    if (allowLegacySummary && Number.isFinite(Number(quote?.total))) {
      return {
        title: 'Presupuesto Profesional',
        pages: [{ text: [
          'Presupuesto Profesional',
          `Emisor: ${profile?.name ?? 'Freelancer'}`,
          `Cliente: ${quote?.customer ?? 'Cliente'}`,
          `Número: ${quote?.number ?? 'presupuesto histórico'}`,
          `Fecha: ${quote?.createdAt ?? new Date().toISOString()}`,
          `Total guardado: ${Number(quote.total).toFixed(2)} €`,
        ].join('\n') }],
        valid: true,
        message: 'Resumen histórico exportado correctamente.',
      };
    }

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
    `Estado: ${quote?.status ?? 'Borrador'}`,
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

function escapePdfText(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '?')
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
    .replaceAll('\n', ' ')
    .replaceAll('\r', ' ');
}

export function renderPdfBytes(profile, quote, options = {}) {
  const document = buildPdfDocument(profile, quote, options);
  if (!document.valid) {
    return { valid: false, message: document.message };
  }

  const lines = document.pages[0].text.split('\n');
  const content = [
    'BT',
    '/F1 12 Tf',
    '50 790 Td',
    ...lines.flatMap((line, index) => [
      index === 0 ? `(${escapePdfText(line)}) Tj` : '0 -18 Td',
      index === 0 ? '' : `(${escapePdfText(line)}) Tj`,
    ]).filter(Boolean),
    'ET',
  ].join('\n');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];

  const encoder = new TextEncoder();
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(encoder.encode(pdf).byteLength);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = encoder.encode(pdf).byteLength;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return { valid: true, bytes: encoder.encode(pdf) };
}
