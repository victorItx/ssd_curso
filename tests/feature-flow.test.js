import test from 'node:test';
import assert from 'node:assert/strict';

import { createProfile, buildBrandingInfo } from '../app/profile/profile_model.js';
import { createService, listServices } from '../app/catalog/service_model.js';
import { createQuoteDraft } from '../app/quotes/quote_creator.js';
import { calculateQuoteSummary } from '../shared/calculations/quote_summary.js';
import { canGeneratePdf } from '../app/quotes/quote_validator.js';
import { exportQuotePdf } from '../app/pdf/pdf_export.js';

test('profile model preserves freelancer identity and branding', () => {
  const profile = createProfile({
    name: 'Ana García',
    nif: '12345678A',
    email: 'ana@presupuestospro.es',
    phone: '600000000',
    logo: 'https://example.com/logo.png',
  });

  assert.equal(profile.name, 'Ana García');
  assert.equal(profile.nif, '12345678A');
  assert.equal(buildBrandingInfo(profile).logo, 'https://example.com/logo.png');
});

test('catalog and quote creation work together', () => {
  const service = createService({ name: 'Diseño web', price: 450 });
  const quote = createQuoteDraft({
    customer: 'Hotel Sol y Mar',
    customerType: 'empresa',
    irpfEnabled: true,
    irpfRate: 15,
    lines: [
      { description: 'Diseño web', quantity: 1, price: service.price },
      { description: 'Mantenimiento', quantity: 2, price: 120 },
    ],
  });

  assert.equal(listServices().length >= 1, true);
  assert.equal(quote.customer, 'Hotel Sol y Mar');
  assert.equal(quote.lines.length, 2);
});

test('quote summary matches the business rule', () => {
  const summary = calculateQuoteSummary({
    customerType: 'empresa',
    irpfEnabled: true,
    irpfRate: 15,
    lines: [
      { quantity: 1, price: 1500 },
      { quantity: 1, price: 500 },
    ],
  });

  assert.equal(summary.baseImponible, 2000);
  assert.equal(summary.iva, 420);
  assert.equal(summary.irpf, 300);
  assert.equal(summary.total, 2120);
});

test('pdf is blocked when the quote has no valid lines', () => {
  const status = canGeneratePdf({ lines: [] });
  assert.equal(status.valid, false);
  assert.match(status.message, /sin líneas/i);

  const pdf = exportQuotePdf({ name: 'Ana García' }, { customer: 'Cliente', lines: [] });
  assert.equal(pdf.valid, false);
});
