const state = {
  profile: null,
  catalog: [],
  quotes: [],
};

export function loadState() {
  return { ...state, catalog: [...state.catalog], quotes: [...state.quotes] };
}

export function saveState(nextState) {
  Object.assign(state, nextState);
  return loadState();
}

export function saveProfile(profile) {
  state.profile = profile;
  return loadState();
}

export function saveCatalog(catalog) {
  state.catalog = Array.isArray(catalog) ? catalog : [];
  return loadState();
}

export function saveQuote(quote) {
  const existingIndex = state.quotes.findIndex((item) => item.id === quote.id);

  if (existingIndex >= 0) {
    state.quotes[existingIndex] = quote;
  } else {
    state.quotes.push(quote);
  }

  return loadState();
}

export function listQuotes() {
  return loadState().quotes;
}
