import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { exportQuotePdf } from '../app/pdf/pdf_export.js';

const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');

test('public shell exposes the four sections and shared navigation', () => {
  for (const label of ['Presupuestos', 'Clientes', 'Catálogo', 'Perfil']) {
    assert.match(html, new RegExp(label));
  }

  assert.match(html, /id=["']homeView["']/);
  assert.match(html, /id=["']sectionNav["']/);
  assert.match(html, /aria-current/);
});

test('public shell defines all quote status labels and non-color markers', () => {
  for (const status of ['Borrador', 'Enviado', 'Aceptado', 'Rechazado', 'Caducado']) {
    assert.match(html, new RegExp(status));
  }

  assert.match(html, /status-icon|status-marker|data-status/);
  assert.match(html, /--accent:/);
  assert.match(html, /--space-4:/);
});

test('pdf presentation preserves the existing document contract and includes status', () => {
  const pdf = exportQuotePdf(
    { name: 'Ana García' },
    {
      customer: 'Cliente',
      status: 'Aceptado',
      number: '2026-001',
      lines: [{ description: 'Servicio', quantity: 1, price: 100 }],
    },
  );

  assert.equal(pdf.valid, true);
  assert.equal(pdf.downloadName, '2026-001.pdf');
  assert.equal(typeof pdf.pages[0].text, 'string');
  assert.match(pdf.pages[0].text, /Estado: Aceptado/);
  assert.match(pdf.pages[0].text, /Total:/);
});

test('invalid quote keeps the existing PDF validation contract', () => {
  const pdf = exportQuotePdf({ name: 'Ana García' }, { customer: 'Cliente', lines: [] });

  assert.equal(pdf.valid, false);
  assert.equal(pdf.downloadName, 'presupuesto.pdf');
  assert.match(pdf.message, /sin líneas válidas/i);
  assert.match(pdf.pages[0].text, /sin líneas válidas/i);
});
