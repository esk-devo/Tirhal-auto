import { Link } from 'react-router-dom';
import { brands } from '@/data/mock/brands';
import { brandLogo } from '@/utils/assets';

/**
 * Brand strip settings.
 *
 * Adjust these values to control the size and spacing
 * of the brand logos from one place.
 */

/* Fixed width of each brand item */
const BRAND_WIDTH = 112;

/* Fixed height of each brand item */
const BRAND_HEIGHT = 48;

/* Height of the actual logo */
const LOGO_HEIGHT = 34;

/* Maximum width of the actual logo */
const LOGO_MAX_WIDTH = 104;

/* Fixed spacing between every brand */
const BRAND_GAP = 22;

const LOGO_SCALE = {
  cupra: 1.3,
  chevrolet: 0.85,
  audi: 0.95,
  mercedes: 1.3,
  bmw: 1.3,
  nissan: 1.3,
  kia: 0.60,
  jetour: 0.75,
  hyundai: 0.96,
  toyota: 1.07,
  mg: 1.2,
  ford: 0.7,
  peugeot: 1.3,
  jeep: 0.8,
  lexus: 1.13,
};

/**
 * How many times the brand list is repeated inside each of the two marquee blocks.
 *
 * The blocks must be content-sized (`w-max`) for the pitch between logos to stay exactly
 * BRAND_WIDTH + BRAND_GAP; stretching a block to the container instead (`min-w-full`)
 * collects the slack into one hole. So the list is repeated until one block is wider than
 * any realistic viewport: 15 brands x 140px x 2 = 4,200px.
 */
const REPEATS = 2;

const track =
  'flex w-max shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none';

export function BrandStrip() {
  const withLogos = brands.filter(
    (brand) => brand.logo && brandLogo(brand.logo)
  );

  const items = (copy) =>
    Array.from({ length: REPEATS }, (_, pass) => withLogos.map((brand) => {
      const scale = LOGO_SCALE[brand.id] ?? 1;

      return (
        <li
          key={`${copy}-${pass}-${brand.id}`}
          className="shrink-0"
          aria-hidden={copy === 'shadow' || undefined}
        >
          <Link
            to={`/cars?brands=${brand.id}`}
            aria-label={`تصفّح سيارات ${brand.name}`}
            title={brand.name}
            tabIndex={copy === 'shadow' ? -1 : undefined}
            className="flex items-center justify-center opacity-80 transition-opacity duration-250 ease-tirhal hover:opacity-100"
            style={{
              width: `${BRAND_WIDTH}px`,
              height: `${BRAND_HEIGHT}px`,
              marginRight: `${BRAND_GAP}px`,
            }}
          >
            <img
              src={brandLogo(brand.logo)}
              alt={brand.latin}
              className="block w-auto object-contain"
              style={{
                height: `${Math.round(LOGO_HEIGHT * scale)}px`,
                maxWidth: `${LOGO_MAX_WIDTH}px`,
                imageRendering: 'auto',
              }}
            />
          </Link>
        </li>
      );
    }));

  return (
    <section
      aria-label="الماركات المتوفرة"
      className="border-b border-hairline bg-white"
    >
      <div className="group flex overflow-hidden py-6 [mask-image:linear-gradient(to_left,transparent,black_7%,black_93%,transparent)]">
        <ul className={track}>
          {items('main')}
        </ul>

        <ul
          className={track}
          aria-hidden="true"
        >
          {items('shadow')}
        </ul>
      </div>
    </section>
  );
}
