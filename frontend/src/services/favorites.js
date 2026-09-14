import { mockRequest } from '@/services/http';

/**
 * Favourites are a list of car ids in localStorage.
 *
 * `listFavoriteIds` takes a seed used only on a viewer's very first visit, so the wishlist
 * opens in the populated state the design shows instead of empty. Once the viewer saves or
 * removes anything, their own list is what persists.
 *
 * The service boundary means a future "sync my favourites to my account" endpoint replaces
 * the body of these functions only.
 */
const STORE_KEY = 'tirhal.favorites';

const read = () => {
  try {
    const value = JSON.parse(localStorage.getItem(STORE_KEY) ?? 'null');
    return Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
};

const write = (ids) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable — favourites stay in memory for this session */
  }
  return ids;
};

export const listFavoriteIds = (seed = []) =>
  mockRequest(() => read() ?? write(seed), { latency: 0 });

export const addFavorite = (carId) =>
  mockRequest(() => {
    const current = read() ?? [];
    return write(current.includes(carId) ? current : [carId, ...current]);
  }, { latency: 0 });

export const removeFavorite = (carId) =>
  mockRequest(() => write((read() ?? []).filter((id) => id !== carId)), { latency: 0 });

export const clearFavorites = () => mockRequest(() => write([]), { latency: 0 });
