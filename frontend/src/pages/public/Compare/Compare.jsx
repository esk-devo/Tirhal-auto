import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/buttons/Button';
import { CarImage } from '@/components/car/CarImage';
import { Spinner } from '@/components/common/States';
import { useComparison } from '@/context/ComparisonContext';
import { useAsync } from '@/hooks/useAsync';
import { getCarsByIds } from '@/services/cars';
import { compareGroups } from '@/data/mock/taxonomy';
import { formatPrice, formatNumber } from '@/utils/format';

/**
 * Works out which car wins each row so the design's cyan highlight can be applied.
 * Rows without a `better` direction, or where the values tie, highlight nothing.
 */
function bestIndexFor(row, cars) {
  if (!row.better || cars.length < 2) return -1;
  const values = cars.map((car) => Number(car.specs[row.key]));
  if (values.some((value) => Number.isNaN(value))) return -1;
  const target = row.better === 'high' ? Math.max(...values) : Math.min(...values);
  if (values.filter((value) => value === target).length > 1) return -1;
  return values.indexOf(target);
}

/** The dashed slot that invites another car into the table. */
function AddSlot() {
  return (
    <div className="flex h-full min-h-[290px] flex-col items-center justify-center rounded-card border border-dashed border-hairline px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-muted">
        <Icon name="plus" size={22} />
      </span>
      <h3 className="mt-5 font-display text-[19px] font-bold text-charcoal">إضافة سيارة</h3>
      <p className="mt-2.5 text-[13px] leading-[1.8] text-muted">
        اختر سيارة أخرى من المخزون لإضافتها إلى جدول المقارنة.
      </p>
    </div>
  );
}

export function Compare() {
  const { ids, remove, max } = useComparison();
  const { data: cars, loading } = useAsync(useCallback(() => getCarsByIds(ids), [ids]), [ids.join(',')], {
    initialData: [],
  });

  const slots = useMemo(() => Math.max(max - cars.length, 0), [cars.length, max]);
  const columns = cars.length + (slots > 0 ? 1 : 0);

  return (
    <div className="sec bg-paper">
      <div className="wrap">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <Button to="/cars" variant="outline" size="md" className="order-2">
            <Icon name="plus" size={16} />
            إضافة سيارة للمقارنة
          </Button>

          <div className="order-1 lg:text-start">
            <h1 className="font-display text-[34px] font-light text-charcoal sm:text-[42px]">مقارنة السيارات</h1>
            <p className="mt-2.5 text-[14px] text-muted">
              حلل المواصفات والأسعار جنباً إلى جنب لاختيار السيارة الأنسب لرحلتك القادمة.
            </p>
          </div>
        </header>

        <div className="mt-10 border-t border-hairline pt-10">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center text-cyan">
              <Spinner size={26} />
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              <div className="min-w-[760px]">
                {/* Car header row — the label column stays empty here, as in the design. */}
                <div
                  className="grid gap-5"
                  style={{ gridTemplateColumns: `200px repeat(${Math.max(columns, 1)}, minmax(210px, 1fr))` }}
                >
                  <div aria-hidden="true" />

                  {cars.map((car) => (
                    <article
                      key={car.id}
                      className="relative overflow-hidden rounded-card border border-hairline bg-white p-3.5 shadow-card"
                    >
                      <button
                        type="button"
                        onClick={() => remove(car.id)}
                        aria-label={`إزالة ${car.name} من المقارنة`}
                        className="absolute end-3 top-3 z-10 rounded-full bg-white/85 p-1.5 text-muted transition-colors duration-250 ease-tirhal hover:text-charcoal"
                      >
                        <Icon name="close" size={14} />
                      </button>

                      <div className="overflow-hidden rounded-[10px]">
                        <CarImage imageKey={car.image} alt={car.name} ratio="aspect-[16/10]" />
                      </div>

                      <div className="px-1.5 pb-1 pt-4 text-start">
                        <p className="text-[12px] text-muted ltr-run">{car.year}</p>
                        <h2 className="mt-1 font-display text-[21px] font-bold text-charcoal">
                          <Link to={`/cars/${car.id}`} className="transition-colors duration-250 ease-tirhal hover:text-cyan">
                            {car.name}
                          </Link>
                        </h2>
                        <p className="mt-1 text-[13px] text-muted">{car.bodyLabel}</p>
                        <p className="mt-4 font-sans text-[24px] font-light text-cyan">
                          <span className="ltr-run">{formatPrice(car.price, { withCurrency: false })}</span>
                          <span className="ms-1.5 text-[18px]">ر.س</span>
                        </p>
                      </div>
                    </article>
                  ))}

                  {slots > 0 ? <AddSlot /> : null}
                </div>

                {/* Spec groups */}
                {cars.length > 0
                  ? compareGroups.map((group) => (
                      <section key={group.id} className="mt-12">
                        <div
                          className="grid gap-5"
                          style={{ gridTemplateColumns: `200px repeat(${Math.max(columns, 1)}, minmax(210px, 1fr))` }}
                        >
                          <h2 className="border-b border-hairline pb-3 text-start font-display text-[21px] font-light text-charcoal">
                            {group.title}
                          </h2>
                          <div className="col-span-full -mt-px" aria-hidden="true" />
                        </div>

                        <dl>
                          {group.rows.map((row) => {
                            const best = bestIndexFor(row, cars);
                            return (
                              <div
                                key={row.key}
                                className="grid items-center gap-5"
                                style={{
                                  gridTemplateColumns: `200px repeat(${Math.max(columns, 1)}, minmax(210px, 1fr))`,
                                }}
                              >
                                <dt className="border-b border-hairline py-4 text-start text-[13.5px] text-muted">
                                  {row.label}
                                </dt>

                                {cars.map((car, index) => {
                                  const value = car.specs[row.key];
                                  const winner = index === best;
                                  return (
                                    <dd
                                      key={car.id}
                                      className={cn(
                                        'flex items-center justify-start gap-2 border-b border-hairline px-4 py-4 text-[14px]',
                                        winner ? 'bg-sky font-bold text-cyan' : 'text-charcoal',
                                      )}
                                    >
                                      <span className="ltr-run">
                                        {value == null ? '—' : row.numeric ? formatNumber(value) : value}
                                        {value != null && row.suffix ? <span className="ms-1">{row.suffix}</span> : null}
                                      </span>
                                      {winner ? <Icon name="check-circle" size={16} /> : null}
                                    </dd>
                                  );
                                })}

                                {slots > 0 ? <div className="border-b border-hairline py-4" aria-hidden="true" /> : null}
                              </div>
                            );
                          })}
                        </dl>
                      </section>
                    ))
                  : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
