import { loadState, saveCatalog } from '../storage/local_store.js';

export function getCatalog() {
  return loadState().catalog;
}

export function addService(service) {
  const current = getCatalog();
  const item = {
    id: service.id ?? `srv-${Date.now()}`,
    name: service.name ?? 'Servicio',
    price: Number(service.price ?? 0),
  };

  const next = [...current, item];
  saveCatalog(next);
  return item;
}

export function removeService(serviceId) {
  const next = getCatalog().filter((service) => service.id !== serviceId);
  saveCatalog(next);
  return next;
}
