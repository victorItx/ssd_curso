import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuoteTotals, validateQuoteForPdf } from '../shared/calculations/quote_totals.js';
import { createQuoteDraft } from '../app/quotes/quote_creator.js';

const sampleQuote = {
  customerType: 'empresa',
  irpfEnabled: true,
  irpfRate: 15,
  lines: [
    { quantity: 1, price: 1500 },
    { quantity: 1, price: 500 },
  ],
};

test('empresa with 15% IRPF gives total 2120', () => {
  const totals = calculateQuoteTotals(sampleQuote);
  assert.equal(totals.baseImponible, 2000);
  assert.equal(totals.iva, 420);
  assert.equal(totals.irpf, 300);
  assert.equal(totals.total, 2120);
});

test('empresa with 7% IRPF gives total 2280', () => {
  const totals = calculateQuoteTotals({ ...sampleQuote, irpfRate: 7 });
  assert.equal(totals.irpf, 140);
  assert.equal(totals.total, 2280);
});

test('particular ignores IRPF and totals 2420', () => {
  const totals = calculateQuoteTotals({ ...sampleQuote, customerType: 'particular', irpfEnabled: true, irpfRate: 15 });
  assert.equal(totals.irpf, 0);
  assert.equal(totals.total, 2420);
});

test('quote number uses current year and keeps 30-day validity', () => {
  const quote = createQuoteDraft({
    customer: 'Cliente prueba',
    customerType: 'empresa',
    irpfEnabled: true,
    irpfRate: 15,
    lines: [{ description: 'Servicio', quantity: 1, price: 100 }],
  });

  assert.match(quote.number, new RegExp(`^${new Date().getFullYear()}-\\d{3}$`));
  assert.equal(quote.validForDays, 30);
});

test('empty quote cannot generate PDF', () => {
  const validation = validateQuoteForPdf({ lines: [] });
  assert.equal(validation.valid, false);
  assert.match(validation.message, /sin líneas/i);
});
