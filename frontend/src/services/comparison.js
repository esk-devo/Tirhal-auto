import { mockRequest } from '@/services/http';
import { MAX_COMPARE } from '@/data/mock/taxonomy';

/**
 * The comparison tray. Session-scoped by design — it is a working set, not a saved list.
 *
 * `listComparisonIds` accepts a seed used only on a viewer's very first visit, so the
 * comparison page opens in the populated state the design shows instead of empty. Once
 * the viewer touches the tray, their own selection is what persists.
 */
const STORE_KEY = 'tirhal.comparison';
const SEEDED_KEY = 'tirhal.comparison.seeded';

const read = () => {
  try {
    const value = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? 'null');
    return Array.isArray(value) ? value.slice(0, MAX_COMPARE) : null;
  } catch {
    return null;
  }
};

const write = (ids) => {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(ids));
    sessionStorage.setItem(SEEDED_KEY, '1');
  } catch {
    /* storage unavailable — the tray still works for this page session */
  }
  return ids;
};

export const listComparisonIds = (seed = []) =>
  mockRequest(() => {
    const stored = read();
    if (stored) return stored;
    return write(seed.slice(0, MAX_COMPARE));
  }, { latency: 0 });

export const addToComparison = (carId) =>
  mockRequest(() => {
    const current = read() ?? [];
    if (current.includes(carId) || current.length >= MAX_COMPARE) return current;
    return write([...current, carId]);
  }, { latency: 0 });

export const removeFromComparison = (carId) =>
  mockRequest(() => write((read() ?? []).filter((id) => id !== carId)), { latency: 0 });

export const clearComparison = () => mockRequest(() => write([]), { latency: 0 });
