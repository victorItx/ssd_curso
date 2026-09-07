export function createProfile(profile = {}) {
  return {
    name: profile.name ?? '',
    nif: profile.nif ?? '',
    email: profile.email ?? '',
    phone: profile.phone ?? '',
    logo: profile.logo ?? '',
    defaultIrpfRate: Number(profile.defaultIrpfRate ?? 15),
  };
}

export function buildBrandingInfo(profile = {}) {
  const normalized = createProfile(profile);
  return {
    name: normalized.name || 'Freelancer',
    logo: normalized.logo || '',
    nif: normalized.nif || '',
    email: normalized.email || '',
    phone: normalized.phone || '',
  };
}
