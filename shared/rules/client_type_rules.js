export function shouldApplyIrpf(customerType = 'empresa') {
  return String(customerType ?? '').toLowerCase() !== 'particular';
}
