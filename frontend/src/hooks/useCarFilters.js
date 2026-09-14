import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { priceBounds } from '@/data/mock/taxonomy';

/**
 * Filter state lives in the URL, not in component state.
 *
 * That makes a filtered listing shareable and back-button-correct, and it means the
 * future API call can be driven straight from the query string.
 */
const LIST_KEYS = ['brands', 'types', 'gears'];

export function useCarFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const readList = (key) => searchParams.get(key)?.split(',').filter(Boolean) ?? [];
    return {
      query: searchParams.get('q') ?? '',
      brands: readList('brands'),
      types: readList('types'),
      gears: readList('gears'),
      minPrice: Number(searchParams.get('minPrice')) || priceBounds.min,
      maxPrice: Number(searchParams.get('maxPrice')) || priceBounds.max,
      sort: searchParams.get('sort') ?? 'newest',
    };
  }, [searchParams]);

  /**
   * The price range is only applied once a handle has actually been moved.
   *
   * The design's bounds (50,000–250,000) are narrower than the catalogue it shows, so
   * treating the resting position as an active filter would hide most of the inventory
   * before the visitor has touched anything.
   */
  const priceTouched = searchParams.has('minPrice') || searchParams.has('maxPrice');

  const serviceFilters = useMemo(
    () => ({
      ...filters,
      minPrice: priceTouched ? filters.minPrice : undefined,
      maxPrice: priceTouched ? filters.maxPrice : undefined,
    }),
    [filters, priceTouched],
  );

  const update = useCallback(
    (patch) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);

          Object.entries(patch).forEach(([key, value]) => {
            const param = key === 'query' ? 'q' : key;

            if (Array.isArray(value)) {
              if (value.length) next.set(param, value.join(','));
              else next.delete(param);
              return;
            }
            const isDefault =
              value === '' ||
              value === null ||
              value === undefined ||
              (key === 'minPrice' && Number(value) === priceBounds.min) ||
              (key === 'maxPrice' && Number(value) === priceBounds.max) ||
              (key === 'sort' && value === 'newest');

            if (isDefault) next.delete(param);
            else next.set(param, String(value));
          });

          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  /** Adds or removes one value from a multi-select facet. */
  const toggleInList = useCallback(
    (key, value) => {
      const current = filters[key];
      update({ [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] });
    },
    [filters, update],
  );

  const reset = useCallback(() => setSearchParams(new URLSearchParams(), { replace: true }), [setSearchParams]);

  /** The chips row: one entry per active facet value, each able to remove itself. */
  const activeChips = useMemo(
    () =>
      LIST_KEYS.flatMap((key) => filters[key].map((value) => ({ key, value }))).concat(
        filters.query ? [{ key: 'query', value: filters.query }] : [],
      ),
    [filters],
  );

  return { filters, serviceFilters, priceTouched, update, toggleInList, reset, activeChips };
}
