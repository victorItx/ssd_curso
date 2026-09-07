export function calculateIrpf(baseImponible, customerType = 'empresa', irpfEnabled = false, irpfRate = 0) {
  const normalizedType = String(customerType ?? '').toLowerCase();
  if (normalizedType === 'particular' || !irpfEnabled) {
    return 0;
  }

  return Number((baseImponible * (Number(irpfRate ?? 0) / 100)).toFixed(2));
}
