export function getCurrentYear() {
  return new Date().getFullYear();
}

export function generateQuoteNumber(existingQuotes = []) {
  const currentYear = getCurrentYear();
  const yearQuotes = existingQuotes.filter((quote) => {
    const quoteYear = Number(String(quote?.number ?? '').split('-')[0]);
    return Number.isFinite(quoteYear) && quoteYear === currentYear;
  });

  const nextSequence = yearQuotes.length + 1;
  return `${currentYear}-${String(nextSequence).padStart(3, '0')}`;
}

export function getQuoteValidityDate(issuedAt = new Date()) {
  const baseDate = issuedAt instanceof Date ? issuedAt : new Date(issuedAt);
  const validityDate = new Date(baseDate);
  validityDate.setDate(validityDate.getDate() + 30);
  return validityDate;
}
