import { saveQuote, listQuotes } from '../storage/local_store.js';
import { generateQuoteNumber } from '../../shared/formatting/quote_metadata.js';

export function createQuoteDraft({ customer, customerType = 'empresa', irpfEnabled = false, irpfRate = 15, lines = [] }) {
  const normalizedCustomerType = String(customerType ?? 'empresa').toLowerCase();
  const quote = {
    id: `q-${Date.now()}`,
    customer: customer ?? 'Cliente',
    customerType: normalizedCustomerType,
    irpfEnabled: Boolean(irpfEnabled) && normalizedCustomerType !== 'particular',
    irpfRate: Number(irpfRate ?? 15),
    lines: Array.isArray(lines) ? lines.map((line) => ({
      description: line?.description ?? 'Servicio',
      quantity: Number(line?.quantity ?? 0),
      price: Number(line?.price ?? 0),
    })) : [],
    createdAt: new Date().toISOString(),
    validForDays: 30,
    number: generateQuoteNumber(listQuotes()),
  };

  const totals = {
    baseImponible: quote.lines.reduce((sum, line) => sum + (Number(line.quantity) * Number(line.price)), 0),
    iva: 0,
    irpf: 0,
    total: 0,
  };

  const base = totals.baseImponible;
  totals.iva = Number((base * 0.21).toFixed(2));
  const irpf = normalizedCustomerType !== 'particular' && quote.irpfEnabled ? Number((base * (Number(quote.irpfRate) / 100)).toFixed(2)) : 0;
  totals.irpf = irpf;
  totals.total = Number((base + totals.iva - irpf).toFixed(2));

  const finalQuote = { ...quote, totals };
  saveQuote(finalQuote);
  return finalQuote;
}
