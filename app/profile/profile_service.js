import { saveProfile, loadState } from '../storage/local_store.js';

export function upsertProfile(profile) {
  const normalized = {
    name: profile?.name ?? '',
    nif: profile?.nif ?? '',
    email: profile?.email ?? '',
    phone: profile?.phone ?? '',
    logo: profile?.logo ?? '',
  };

  const state = saveProfile(normalized);
  return state.profile;
}

export function getProfile() {
  const state = loadState();
  return state.profile;
}
