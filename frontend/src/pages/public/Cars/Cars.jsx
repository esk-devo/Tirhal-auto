import { useCallback, useMemo, useState } from 'react';
import { cn } from '@/utils/cn';
import { Icon, DirectionalIcon } from '@/components/common/Icon';
import { IconButton } from '@/components/buttons/Button';
import { CarGrid } from '@/components/car/CarGrid';
import { CarFilters } from '@/components/car/CarFilters';
import { Diamond } from '@/components/common/SectionHeading';
import { useCarFilters } from '@/hooks/useCarFilters';
import { useAsync } from '@/hooks/useAsync';
import { listCars } from '@/services/cars';
import { sortOptions, vehicleTypes, gearTypes } from '@/data/mock/taxonomy';
import { brands } from '@/data/mock/brands';
import { formatNumber } from '@/utils/format';

const PAGE_SIZE = 6;

/** Turns an active facet value into the label the chip prints. */
function chipLabel({ key, value }) {
  if (key === 'brands') return brands.find((brand) => brand.id === value)?.latin ?? value;
  if (key === 'types') return vehicleTypes.find((type) => type.id === value)?.label ?? value;
  if (key === 'gears') return gearTypes.find((gear) => gear.id === value)?.label ?? value;
  return value;
}

/**
 * Listing page.
 *
 * Filters live in the URL (useCarFilters), so a filtered view is shareable and the back
 * button behaves. Layout follows the design top to bottom: centred title, search field,
 * two filter rows, the active-chips bar, the grid, then pagination.
 */
export function Cars() {
  const { filters, serviceFilters, update, toggleInList, reset, activeChips } = useCarFilters();
  const [page, setPage] = useState(1);

  const { data, loading, error, reload } = useAsync(
    useCallback(() => listCars(serviceFilters), [serviceFilters]),
    [JSON.stringify(serviceFilters)],
  );

  const items = data?.items ?? [];
  const available = data?.available ?? 0;
  const pageCount = Math.max(Math.ceil(items.length / PAGE_SIZE), 1);
  const current = Math.min(page, pageCount);
  const visible = useMemo(
    () => items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    [items, current],
  );

  const removeChip = (chip) => {
    if (chip.key === 'query') update({ query: '' });
    else toggleInList(chip.key, chip.value);
    setPage(1);
  };

  return (
    <div className="sec bg-paper">
      <div className="wrap">
        <header className="text-center">
          <h1 className="font-display text-[34px] font-light text-charcoal sm:text-[44px]">
            اختر <span className="text-cyan">سيارتك</span>
          </h1>
          <p className="mt-2.5 text-[14px] text-muted">
            <span className="ltr-run">{formatNumber(available)}</span> سيارة متاحة الآن
          </p>
        </header>

        <div className="mx-auto mt-8 max-w-[690px]">
          <label htmlFor="cars-search" className="sr-only">
            ابحث بالماركة أو الموديل
          </label>
          <div className="relative">
            <input
              id="cars-search"
              type="search"
              value={filters.query}
              onChange={(event) => {
                update({ query: event.target.value });
                setPage(1);
              }}
              placeholder="ابحث بالماركة أو الموديل..."
              className="h-[54px] w-full rounded-pill border border-hairline bg-white ps-14 pe-6 text-[14px] text-charcoal outline-none transition-colors duration-250 ease-tirhal placeholder:text-muted/80 focus:border-cyan"
            />
            <span className="pointer-events-none absolute inset-y-0 start-6 flex items-center text-muted">
              <Icon name="search" size={19} />
            </span>
          </div>
        </div>

        <div className="mt-12">
          <CarFilters filters={filters} update={update} toggleInList={toggleInList} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <label htmlFor="cars-sort" className="text-[13px] text-muted">
              ترتيب حسب:
            </label>
            <div className="relative">
              <select
                id="cars-sort"
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value })}
                className="appearance-none bg-transparent pe-5 text-[13px] font-medium text-charcoal outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center text-charcoal">
                <Icon name="chevron" size={13} style={{ transform: 'rotate(90deg)' }} />
              </span>
            </div>
          </div>

          {activeChips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2.5">
              {activeChips.map((chip) => (
                <span
                  key={`${chip.key}-${chip.value}`}
                  className="inline-flex items-center gap-2.5 rounded-pill border border-cyan/25 bg-sky px-3.5 py-1.5 text-[13px] font-medium text-charcoal"
                >
                  <Diamond />
                  {chipLabel(chip)}
                  <button
                    type="button"
                    onClick={() => removeChip(chip)}
                    aria-label={`إزالة الفلتر ${chipLabel(chip)}`}
                    className="text-charcoal/70 transition-colors duration-250 ease-tirhal hover:text-charcoal"
                  >
                    <Icon name="close" size={13} />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={() => {
                  reset();
                  setPage(1);
                }}
                className="text-[13px] text-charcoal underline underline-offset-4 transition-colors duration-250 ease-tirhal hover:text-cyan"
              >
                مسح الكل
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-8">
          <CarGrid
            cars={visible}
            loading={loading}
            error={error}
            onRetry={reload}
            skeletonCount={PAGE_SIZE}
            empty={{
              title: 'لا توجد سيارات مطابقة',
              body: 'جرّب توسيع نطاق السعر أو إزالة بعض الفلاتر.',
              action: activeChips.length ? { label: 'مسح الفلاتر', onClick: reset } : undefined,
            }}
          />
        </div>

        {pageCount > 1 ? (
          <nav aria-label="تنقّل بين الصفحات" className="mt-14 flex items-center justify-center gap-5">
            {/* In RTL, "previous" is the start (right) control and points right. */}
            <IconButton
              label="الصفحة السابقة"
              variant="outline"
              size={46}
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              <DirectionalIcon direction="back" size={18} />
            </IconButton>

            <ol className="flex items-center gap-4">
              {Array.from({ length: pageCount }, (_, index) => {
                const number = index + 1;
                const active = number === current;
                return (
                  <li key={number}>
                    <button
                      type="button"
                      onClick={() => setPage(number)}
                      aria-current={active ? 'page' : undefined}
                      aria-label={`الصفحة ${number}`}
                      className={cn(
                        'block h-[13px] w-[13px] rotate-45 transition-[background-color,transform] duration-250 ease-tirhal',
                        active ? 'bg-cyan shadow-cta' : 'bg-charcoal/20 hover:bg-charcoal/35',
                      )}
                      style={{ borderRadius: '3px 3px 3px 0' }}
                    />
                  </li>
                );
              })}
            </ol>

            <IconButton
              label="الصفحة التالية"
              variant="outline"
              size={46}
              disabled={current === pageCount}
              onClick={() => setPage(current + 1)}
            >
              <DirectionalIcon direction="forward" size={18} />
            </IconButton>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
