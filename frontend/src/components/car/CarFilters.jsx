import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { Diamond } from '@/components/common/SectionHeading';
import { vehicleTypes, gearTypes, priceBounds } from '@/data/mock/taxonomy';
import { brands, filterBrandIds } from '@/data/mock/brands';
import { brandLogo } from '@/utils/assets';
import { formatNumber } from '@/utils/format';

/** Group label with the pennant tick on its start (right) edge. */
function GroupLabel({ children, id }) {
  return (
    <p id={id} className="mb-4 flex items-center justify-start gap-2.5 font-display text-[15px] font-bold text-charcoal">
      <Diamond />
      <span>{children}</span>
    </p>
  );
}

/** "نوع المركبة" — seven body-style tiles. */
function VehicleTypes({ selected, onToggle }) {
  return (
    <div>
      <GroupLabel id="filter-body">نوع المركبة</GroupLabel>
      <div role="group" aria-labelledby="filter-body" className="flex flex-wrap gap-3">
        {vehicleTypes.map((type) => {
          const active = selected.includes(type.id);
          return (
            <button
              key={type.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle('types', type.id)}
              className={cn(
                'flex h-[86px] w-[104px] flex-col items-center justify-center gap-2 rounded-[14px] border',
                'transition-[background-color,border-color,color,transform] duration-250 ease-tirhal hover:-translate-y-[1px]',
                active
                  ? 'border-cyan bg-cyan text-white shadow-cta'
                  : 'border-hairline bg-white text-charcoal hover:border-cyan/50',
              )}
            >
              <Icon name={type.icon} size={30} strokeWidth={1.5} />
              <span className="font-sans text-[12.5px] font-semibold">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** "نوع القير" — two compact tiles beside the body styles. */
function GearTypes({ selected, onToggle }) {
  return (
    <div>
      <GroupLabel id="filter-gear">نوع القير</GroupLabel>
      <div role="group" aria-labelledby="filter-gear" className="flex flex-col gap-3">
        {gearTypes.map((gear) => {
          const active = selected.includes(gear.id);
          return (
            <button
              key={gear.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle('gears', gear.id)}
              className={cn(
                'flex h-[42px] w-[124px] items-center justify-center gap-2.5 rounded-[12px] border text-[13px]',
                'transition-[background-color,border-color,color] duration-250 ease-tirhal',
                active ? 'border-cyan bg-cyan text-white' : 'border-hairline bg-white text-muted hover:border-cyan/50',
              )}
            >
              <span>{gear.label}</span>
              <Icon name={gear.icon} size={17} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** "الماركة" — a 2×2 grid of brand tiles. */
function BrandTiles({ selected, onToggle }) {
  const tiles = filterBrandIds.map((id) => brands.find((brand) => brand.id === id)).filter(Boolean);

  return (
    <div>
      <GroupLabel id="filter-brand">الماركة</GroupLabel>
      <div role="group" aria-labelledby="filter-brand" className="grid grid-cols-2 gap-3">
        {tiles.map((brand) => {
          const active = selected.includes(brand.id);
          return (
            <button
              key={brand.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle('brands', brand.id)}
              className={cn(
                'flex h-[58px] items-center justify-start gap-3 rounded-[12px] border px-5',
                'transition-[background-color,border-color] duration-250 ease-tirhal',
                active ? 'border-cyan bg-sky' : 'border-hairline bg-white hover:border-cyan/50',
              )}
            >
              <img src={brandLogo(brand.logo)} alt="" aria-hidden="true" className="h-6 w-auto max-w-8 object-contain" />
              <span className={cn('font-sans text-[14px]', active ? 'text-charcoal' : 'text-muted')}>
                {brand.latin}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * "نطاق السعر" — a two-handle range.
 *
 * The design draws the bound labels at the physical ends of the track (minimum on the
 * left, maximum on the right) rather than mirroring them with the document, so the track
 * is marked `dir="ltr"` to match it exactly.
 */
function PriceRange({ min, max, onChange }) {
  const span = priceBounds.max - priceBounds.min;
  const left = ((min - priceBounds.min) / span) * 100;
  const right = ((max - priceBounds.min) / span) * 100;

  return (
    <div>
      <GroupLabel id="filter-price">نطاق السعر</GroupLabel>

      <div dir="ltr" className="pt-1">
        <div className="mb-3 flex items-center justify-between text-[12.5px] text-muted">
          <span className="ltr-run">{formatNumber(priceBounds.min)} ر.س</span>
          <span className="ltr-run">{formatNumber(priceBounds.max)} ر.س</span>
        </div>

        <div className="relative h-6">
          <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-hairline" />
          <span
            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-cyan"
            style={{ left: `${left}%`, right: `${100 - right}%` }}
          />

          <label htmlFor="price-min" className="sr-only">
            أقل سعر
          </label>
          <input
            id="price-min"
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={priceBounds.step}
            value={min}
            onChange={(event) => onChange({ minPrice: Math.min(Number(event.target.value), max - priceBounds.step) })}
            className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-cyan [&::-webkit-slider-thumb]:shadow-cta [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-cyan"
          />

          <label htmlFor="price-max" className="sr-only">
            أعلى سعر
          </label>
          <input
            id="price-max"
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={priceBounds.step}
            value={max}
            onChange={(event) => onChange({ maxPrice: Math.max(Number(event.target.value), min + priceBounds.step) })}
            className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-cyan [&::-webkit-slider-thumb]:shadow-cta [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-cyan"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * The listing filter panel: body style and gear on the first row, brand and price range
 * on the second, matching the two-column arrangement of the design.
 */
export function CarFilters({ filters, update, toggleInList }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
        <VehicleTypes selected={filters.types} onToggle={toggleInList} />
        <GearTypes selected={filters.gears} onToggle={toggleInList} />
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <BrandTiles selected={filters.brands} onToggle={toggleInList} />
        <PriceRange min={filters.minPrice} max={filters.maxPrice} onChange={update} />
      </div>
    </div>
  );
}
