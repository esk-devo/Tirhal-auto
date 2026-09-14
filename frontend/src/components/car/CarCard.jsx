import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { CarImage } from '@/components/car/CarImage';
import { Button } from '@/components/buttons/Button';
import { formatPrice } from '@/utils/format';
import { cardSpecFields } from '@/data/mock/taxonomy';
import { useFavorites } from '@/context/FavoritesContext';
import { useComparison } from '@/context/ComparisonContext';
import { brandLogo } from '@/utils/assets';

const specIcon = { mileage: 'gauge', fuel: 'fuel', transmission: 'cog' };
const fuelIcon = (value) => (value === 'كهرباء' ? 'plug' : 'fuel');

/**
 * The listing card, reproduced from the Figma.
 *
 * Image with the heart on the top-end corner, the compare control on the top-start
 * corner and the year pill at the bottom-start; then the brand row, model name, a
 * three-cell spec strip split by hairlines, and the price / details row.
 *
 * The overlay controls sit at the coordinates the exported photography already reserves
 * for them, so they land exactly where the design places them.
 */
export function CarCard({ car, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isCompared, toggleComparison } = useComparison();

  const favorite = isFavorite(car.id);
  const compared = isCompared(car.id);
  const logo = brandLogo(car.brand?.logo);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-card border border-hairline bg-white shadow-card',
        'transition-[transform,border-color,box-shadow] duration-300 ease-tirhal',
        'hover:-translate-y-[4px] hover:shadow-lift',
        className,
      )}
    >
      <div className="relative">
        <CarImage imageKey={car.image} alt={car.name} zoomOnHover />

        {/* Compare — start (right) corner, cyan once the car is in the tray. */}
        <button
          type="button"
          onClick={() => toggleComparison(car)}
          aria-pressed={compared}
          aria-label={compared ? `إزالة ${car.name} من المقارنة` : `إضافة ${car.name} إلى المقارنة`}
          className={cn(
            'absolute top-3 start-3 z-10 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full shadow-float',
            'transition-[color,background-color,transform] duration-250 ease-tirhal hover:-translate-y-[1px]',
            compared ? 'bg-cyan text-white' : 'bg-white text-charcoal hover:text-cyan',
          )}
        >
          <Icon name="compare" size={19} />
        </button>

        {/* Favourite — end (left) corner, red once saved. */}
        <button
          type="button"
          onClick={() => toggleFavorite(car)}
          aria-pressed={favorite}
          aria-label={favorite ? `إزالة ${car.name} من المفضلة` : `إضافة ${car.name} إلى المفضلة`}
          className={cn(
            'absolute top-3 end-3 z-10 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-float',
            'transition-[color,transform] duration-250 ease-tirhal hover:-translate-y-[1px]',
            favorite ? 'text-[#E4463C]' : 'text-charcoal hover:text-cyan',
          )}
        >
          <Icon name={favorite ? 'heart-fill' : 'heart'} size={19} />
        </button>

        {/* Year pill — bottom end corner, tick on its end side, matching the design. */}
        <span className="absolute bottom-3 end-3 z-10 inline-flex items-center gap-2.5 rounded-pill bg-ink/85 px-3.5 py-1.5 text-[12.5px] font-medium text-white backdrop-blur-sm">
          <span aria-hidden="true" className="h-[8px] w-[8px] rotate-45 rounded-[1px] bg-cyan" />
          <span className="ltr-run">{car.year}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-start gap-2.5">
          {logo ? (
            <img src={logo} alt="" aria-hidden="true" className="h-[22px] w-auto max-w-[34px] object-contain" />
          ) : null}
          <span className="text-[13px] text-muted ltr-run">{car.brand?.latin}</span>
        </div>

        <h3 className="mt-2.5 text-start font-sans text-[19px] font-bold text-charcoal">
          <Link
            to={`/cars/${car.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            <span className="ltr-run">{car.name}</span>
          </Link>
        </h3>

        <ul className="mt-5 grid grid-cols-3 border-y border-hairline">
          {cardSpecFields.map((key, index) => (
            <li
              key={key}
              className={cn(
                'flex flex-col items-center gap-1.5 py-3.5',
                index < cardSpecFields.length - 1 && 'border-s border-hairline',
              )}
            >
              <Icon name={key === 'fuel' ? fuelIcon(car.specs.fuel) : specIcon[key]} size={19} className="text-cyan" />
              <span className="text-[12.5px] text-charcoal">{car.specs[key]}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="text-start">
            <p className="text-[11.5px] text-muted">السعر</p>
            <p className="mt-0.5 font-sans text-[22px] font-bold text-cyan">
              <span className="ltr-run">{formatPrice(car.price, { withCurrency: false })}</span>
              <span className="ms-1.5 text-[12px] font-normal text-muted">ر.س</span>
            </p>
          </div>

          <Button to={`/cars/${car.id}`} size="sm" className="relative z-10">
            عرض التفاصيل
          </Button>
        </div>
      </div>
    </article>
  );
}
