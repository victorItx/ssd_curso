import { zipSync } from 'fflate';
import { renderPdfBytes } from '../pdf/pdf_export.js';

const DATA_FILE_NAME = 'presupuestospro-datos.json';

export class BackupExportError extends Error {
  constructor(message, status = 400, quoteNumber = '') {
    super(message);
    this.name = 'BackupExportError';
    this.status = status;
    this.quoteNumber = quoteNumber;
  }
}

export function createExportSnapshot({ profile = {}, catalog = [], quotes = [], exportDate = formatLocalDate() } = {}) {
  return {
    exportDate,
    profile: structuredClone(profile ?? {}),
    catalog: structuredClone(Array.isArray(catalog) ? catalog : []),
    quotes: structuredClone(Array.isArray(quotes) ? quotes : []),
  };
}

export function sanitizeFilePart(value, fallback = 'cliente') {
  const normalized = String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^[. -]+|[. -]+$/g, '');

  return normalized || fallback;
}

export function createPdfFileName(quote, index, usedNames = new Set()) {
  const number = sanitizeFilePart(quote?.number, `presupuesto-${String(index + 1).padStart(3, '0')}`);
  const customer = sanitizeFilePart(quote?.customer, 'cliente');
  const baseName = `${number} - ${customer}`;
  let fileName = `${baseName}.pdf`;
  let suffix = 2;

  while (usedNames.has(fileName)) {
    fileName = `${baseName} (${suffix}).pdf`;
    suffix += 1;
  }

  usedNames.add(fileName);
  return fileName;
}

export function buildBackupArchive(snapshot) {
  validateSnapshot(snapshot);

  const usedNames = new Set();
  const entries = {};

  snapshot.quotes.forEach((quote, index) => {
    const document = renderPdfBytes(snapshot.profile, quote, { allowLegacySummary: true });
    if (!document.valid) {
      const quoteNumber = quote?.number ?? `presupuesto-${index + 1}`;
      throw new BackupExportError(
        `No se pudo generar el PDF del presupuesto ${quoteNumber}.`,
        422,
        quoteNumber,
      );
    }

    entries[createPdfFileName(quote, index, usedNames)] = document.bytes;
  });

  entries[DATA_FILE_NAME] = new TextEncoder().encode(JSON.stringify(snapshot, null, 2));

  return {
    bytes: zipSync(entries),
    fileName: `presupuestospro-copia-${snapshot.exportDate}.zip`,
    entries: Object.keys(entries),
  };
}

export function validateSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    throw new BackupExportError('La copia no contiene un estado válido.', 400);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.exportDate ?? '')) {
    throw new BackupExportError('La fecha de exportación no tiene un formato válido.', 400);
  }

  if (!Array.isArray(snapshot.quotes) || snapshot.quotes.length === 0) {
    throw new BackupExportError('No hay presupuestos para exportar.', 400);
  }

  if (!Array.isArray(snapshot.catalog) || !snapshot.profile || typeof snapshot.profile !== 'object') {
    throw new BackupExportError('La copia no contiene perfil o catálogo válidos.', 400);
  }
}

function formatLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
