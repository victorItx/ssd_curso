export function hasValidLines(lines = []) {
  return Array.isArray(lines) && lines.some((line) => Number(line?.quantity ?? 0) > 0 && Number(line?.price ?? 0) >= 0);
}

export function isEmptyQuote(quote = {}) {
  return !hasValidLines(quote?.lines ?? []);
}

export function getClientIrpfRate(customerType, irpfRate = 0) {
  const normalizedType = String(customerType ?? '').toLowerCase();
  if (normalizedType === 'particular') {
    return 0;
  }

  return Number(irpfRate ?? 0);
}
