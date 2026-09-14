import { cars, featuredCarIds, wishlistCarIds, newReleases, totalAvailable } from '@/data/mock/cars';
import { brands, getBrand } from '@/data/mock/brands';
import { ApiError, mockRequest } from '@/services/http';

/**
 * Every car handed to the UI is "hydrated": the brand object is joined in so no component
 * has to know brands live in a separate collection. The future API returns this shape.
 */
const hydrate = (car) => ({ ...car, brand: getBrand(car.brandId) });

const matchesQuery = (car, query) => {
  if (!query) return true;
  const haystack = `${car.name} ${car.latinName ?? ''} ${car.brand?.name ?? ''} ${car.brand?.latin ?? ''}`;
  return haystack.toLowerCase().includes(query.trim().toLowerCase());
};

const inList = (value, list) => !list?.length || list.includes(value);

const sorters = {
  newest: (a, b) => b.year - a.year || a.price - b.price,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

/**
 * @param {object} filters
 * @param {string}   [filters.query]
 * @param {string[]} [filters.brands]  @param {string[]} [filters.types]
 * @param {string[]} [filters.gears]
 * @param {number}   [filters.minPrice] @param {number} [filters.maxPrice]
 * @param {string}   [filters.sort]
 */
export const listCars = (filters = {}) =>
  mockRequest(() => {
    const { query, brands: brandIds, types, gears, minPrice, maxPrice, sort = 'newest' } = filters;

    const items = cars
      .map(hydrate)
      .filter(
        (car) =>
          matchesQuery(car, query) &&
          inList(car.brandId, brandIds) &&
          inList(car.type, types) &&
          inList(car.gear, gears) &&
          (minPrice == null || car.price >= minPrice) &&
          (maxPrice == null || car.price <= maxPrice),
      )
      .sort(sorters[sort] ?? sorters.newest);

    return { items, total: items.length, available: totalAvailable };
  });

export const getCarById = (id) =>
  mockRequest(() => {
    const car = cars.find((item) => item.id === id);
    if (!car) throw new ApiError('لم نعثر على هذه السيارة.', { status: 404, code: 'car_not_found' });
    return hydrate(car);
  });

export const getCarsByIds = (ids = []) =>
  mockRequest(() => ids.map((id) => cars.find((car) => car.id === id)).filter(Boolean).map(hydrate));

/** "أيقونات الطريق" — the three cars the home rail and the listing grid open with. */
export const listFeatured = () => mockRequest(() => featuredCarIds.map((id) => hydrate(cars.find((c) => c.id === id))));

/** The cards the wishlist page ships with, until favourites sync to an account. */
export const listWishlistDefaults = () => mockRequest(() => wishlistCarIds);

/** "إصدارات جديدة" — the bento block. */
export const listNewReleases = () => mockRequest(() => newReleases);

export const listBrands = () => mockRequest(() => brands);
