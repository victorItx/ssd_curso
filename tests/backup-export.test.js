import test from 'node:test';
import assert from 'node:assert/strict';
import { unzipSync } from 'fflate';

import { renderPdfBytes } from '../app/pdf/pdf_export.js';
import {
  BackupExportError,
  buildBackupArchive,
  createExportSnapshot,
  createPdfFileName,
} from '../app/export/backup_export.js';

function makeQuote(index, customer = `Cliente ${index}`) {
  return {
    id: `q-${index}`,
    number: `2026-${String(index).padStart(3, '0')}`,
    customer,
    customerType: 'empresa',
    irpfEnabled: true,
    irpfRate: 15,
    lines: [{ description: 'Servicio', quantity: 1, price: 3604 }],
    totals: { baseImponible: 3604, iva: 756.84, irpf: 540.6, total: 3820.24 },
    createdAt: '2026-03-15T10:00:00.000Z',
    validForDays: 30,
  };
}

function makeSnapshot(quotes = [makeQuote(1)]) {
  return createExportSnapshot({
    exportDate: '2026-03-15',
    profile: { name: 'Ana García', nif: '12345678A', logo: 'data:image/png;base64,logo' },
    catalog: [{ id: 'srv-1', name: 'Servicio', price: 3604 }],
    quotes,
  });
}

test('backup archive contains one data file and one PDF per quote', () => {
  const archive = buildBackupArchive(makeSnapshot([makeQuote(1), makeQuote(2), makeQuote(3)]));
  const files = Object.keys(unzipSync(archive.bytes));

  assert.equal(archive.fileName, 'presupuestospro-copia-2026-03-15.zip');
  assert.equal(files.length, 4);
  assert.equal(files.filter((file) => file.endsWith('.pdf')).length, 3);
  assert.deepEqual(JSON.parse(new TextDecoder().decode(unzipSync(archive.bytes)['presupuestospro-datos.json'])).profile.logo, 'data:image/png;base64,logo');
});

test('ZIP PDF bytes match the individual PDF renderer', () => {
  const quote = makeQuote(1, 'Estudio García');
  const profile = makeSnapshot([quote]).profile;
  const individual = renderPdfBytes(profile, quote);
  const archive = buildBackupArchive(makeSnapshot([quote]));
  const files = unzipSync(archive.bytes);

  assert.deepEqual(files['2026-001 - Estudio Garcia.pdf'], individual.bytes);
  assert.match(new TextDecoder().decode(files['2026-001 - Estudio Garcia.pdf']), /Total: 3820\.24/);
});

test('empty snapshots are rejected without creating an archive', () => {
  assert.throws(() => buildBackupArchive(makeSnapshot([])), (error) => {
    assert.ok(error instanceof BackupExportError);
    assert.equal(error.status, 400);
    assert.match(error.message, /No hay presupuestos/i);
    return true;
  });
});

test('large snapshots include every quote and produce unique safe names', () => {
  const quotes = Array.from({ length: 50 }, (_, index) => makeQuote(index + 1, index === 0 ? 'Diseño/Web S.L.' : `Cliente ${index + 1}`));
  const archive = buildBackupArchive(makeSnapshot(quotes));
  const files = Object.keys(unzipSync(archive.bytes));

  assert.equal(files.filter((file) => file.endsWith('.pdf')).length, 50);
  assert.equal(new Set(files).size, files.length);
  assert.match(files[0], /Dise.+Web S\.L\.pdf/);
});

test('duplicate cleaned names receive stable suffixes', () => {
  const usedNames = new Set();
  const first = createPdfFileName(makeQuote(1, 'Diseño/Web S.L.'), 0, usedNames);
  const second = createPdfFileName(makeQuote(1, 'Diseño\\Web S.L.'), 1, usedNames);

  assert.equal(first, '2026-001 - Diseno-Web S.L.pdf');
  assert.equal(second, '2026-001 - Diseno-Web S.L (2).pdf');
});

test('invalid quote fails before returning a partial archive', () => {
  assert.throws(() => buildBackupArchive(makeSnapshot([makeQuote(1), { number: '2026-002', customer: 'Vacío', lines: [] }])), (error) => {
    assert.ok(error instanceof BackupExportError);
    assert.equal(error.status, 422);
    assert.equal(error.quoteNumber, '2026-002');
    return true;
  });
});

test('legacy quotes with only a saved total receive a summary PDF', () => {
  const archive = buildBackupArchive(makeSnapshot([{
    customer: 'Cliente histórico',
    total: 121,
    createdAt: '2025-12-01T10:00:00.000Z',
  }]));
  const files = unzipSync(archive.bytes);

  assert.equal(Object.keys(files).filter((file) => file.endsWith('.pdf')).length, 1);
  assert.match(new TextDecoder().decode(files['presupuesto-001 - Cliente historico.pdf']), /Total guardado: 121\.00/);
});

test('building an archive does not mutate the snapshot', () => {
  const snapshot = makeSnapshot([makeQuote(1)]);
  const before = structuredClone(snapshot);

  buildBackupArchive(snapshot);

  assert.deepEqual(snapshot, before);
});
