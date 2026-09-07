import { loadState, saveCatalog } from '../storage/local_store.js';

export function createService(service = {}) {
  const item = {
    id: service.id ?? `srv-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: service.name ?? 'Servicio',
    price: Number(service.price ?? 0),
  };

  const catalog = loadState().catalog;
  saveCatalog([...catalog, item]);
  return item;
}

export function listServices() {
  return loadState().catalog;
}
