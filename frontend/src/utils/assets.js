/**
 * Asset resolution.
 *
 * Data files reference a bare key; the maps below turn that key into a hashed build URL.
 * Dropping a replacement file into the matching folder under the same name is the only
 * step needed to swap an asset — no data edits, no component edits.
 *
 * The glob options have to be written inline: Vite parses them statically.
 */
const carModules = import.meta.glob('../assets/images/cars/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const brandModules = import.meta.glob('../assets/images/brands/*.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const bannerModules = import.meta.glob('../assets/images/banners/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const decorModules = import.meta.glob('../assets/images/decor/*.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const mapModules = import.meta.glob('../assets/images/maps/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/**
 * Filenames are indexed lower-cased, and lookups are lower-cased to match, so a file
 * dropped in as `Audi.png`, `AUDI.png` or `audi.png` all resolve from the key `audi`.
 * Without this, replacing an asset with a differently-cased filename silently breaks it.
 */
const indexByKey = (modules) =>
  Object.entries(modules).reduce((acc, [path, url]) => {
    const name = path.split('/').pop().replace(/\.[^.]+$/, '');
    acc[name.toLowerCase()] = url;
    return acc;
  }, {});

const lookup = (index, key) => (key ? (index[String(key).toLowerCase()] ?? null) : null);

const carImages = indexByKey(carModules);
const brandImages = indexByKey(brandModules);
const bannerImages = indexByKey(bannerModules);
const decorImages = indexByKey(decorModules);
const mapImages = indexByKey(mapModules);

export const carImage = (key) => lookup(carImages, key);
export const brandLogo = (key) => lookup(brandImages, key);
export const bannerImage = (key) => lookup(bannerImages, key);
export const decorImage = (key) => lookup(decorImages, key);
export const mapImage = (key) => lookup(mapImages, key);
