import { saveQuote, listQuotes, loadState } from '../storage/local_store.js';
import { calculateQuoteTotals, validateQuoteForPdf } from '../../shared/calculations/quote_totals.js';

export function createQuote({ customer, customerType, lines, irpfEnabled, irpfRate }) {
  const quote = {
    id: `q-${Date.now()}`,
    customer: customer ?? '',
    customerType: customerType ?? 'empresa',
    irpfEnabled: Boolean(irpfEnabled),
    irpfRate: Number(irpfRate ?? 15),
    lines: Array.isArray(lines) ? lines : [],
    createdAt: new Date().toISOString(),
    validForDays: 30,
  };

  const totals = calculateQuoteTotals(quote);
  const finalQuote = { ...quote, totals };
  saveQuote(finalQuote);
  return finalQuote;
}

export function updateQuote(quoteId, changes) {
  const quotes = listQuotes();
  const index = quotes.findIndex((quote) => quote.id === quoteId);

  if (index === -1) {
    return null;
  }

  const updated = {
    ...quotes[index],
    ...changes,
    lines: Array.isArray(changes.lines) ? changes.lines : quotes[index].lines,
  };

  const totals = calculateQuoteTotals(updated);
  const finalQuote = { ...updated, totals };
  saveQuote(finalQuote);
  return finalQuote;
}

export function getQuotes() {
  return listQuotes();
}

export function canGeneratePdf(quote) {
  return validateQuoteForPdf(quote);
}
