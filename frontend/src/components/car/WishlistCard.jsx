import { Link } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { CarImage } from '@/components/car/CarImage';
import { Button } from '@/components/buttons/Button';

const rows = [
  [
    { key: 'engine', icon: 'gauge' },
    { key: 'fuel', icon: 'fuel' },
  ],
  [
    { key: 'transmission', icon: 'cog' },
    { key: 'seats', icon: 'seat', suffix: 'مقاعد' },
  ],
];

/**
 * The wishlist card — a different card from the listing one, per the design: a year pill
 * on the image's end corner, the model and body style, a 2×2 spec grid, a full-width
 * details button and a destructive remove link beneath it. No price and no overlay
 * controls; this list is already the saved state.
 */
export function WishlistCard({ car, onRemove }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-hairline bg-white p-3 shadow-card">
      <div className="relative overflow-hidden rounded-[12px]">
        <CarImage imageKey={car.image} alt={car.name} ratio="aspect-[16/10]" />
        <span className="absolute top-3 end-3 rounded-pill bg-white px-3 py-1 text-[12px] font-medium text-charcoal shadow-float ltr-run">
          {car.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
        <h3 className="text-start font-sans text-[19px] font-bold text-charcoal">
          <Link to={`/cars/${car.id}`} className="ltr-run">
            {car.name}
          </Link>
        </h3>
        <p className="mt-1 text-start text-[13px] text-muted">{car.bodyLabel}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-hairline pt-5">
          {rows.flat().map((row) => (
            <div key={row.key} className="flex items-center justify-start gap-2">
              <Icon name={row.icon} size={16} className="text-cyan" />
              <dt className="sr-only">{row.key}</dt>
              <dd className="text-[13px] text-charcoal ltr-run">
                {car.specs[row.key]}
                {row.suffix ? <span className="ms-1">{row.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </dl>

        <Button to={`/cars/${car.id}`} block className="mt-6">
          عرض التفاصيل
        </Button>

        <button
          type="button"
          onClick={() => onRemove(car)}
          className="mt-3.5 inline-flex items-center justify-center gap-2 py-1 text-[13px] text-[#E4463C] transition-opacity duration-250 ease-tirhal hover:opacity-75"
        >
          إزالة من القائمة
          <Icon name="trash" size={15} />
        </button>
      </div>
    </article>
  );
}
