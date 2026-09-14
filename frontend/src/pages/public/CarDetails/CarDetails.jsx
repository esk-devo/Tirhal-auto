import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CarGallery } from '@/components/car/CarGallery';
import { SpecStrip, TechSpecs, CarFeatures } from '@/components/car/CarSpecifications';
import { FinanceCalculator } from '@/components/car/FinanceCalculator';
import { Button } from '@/components/buttons/Button';
import { Icon } from '@/components/common/Icon';
import { EmptyState, Spinner } from '@/components/common/States';
import { getCarById } from '@/services/cars';
import { useAsync } from '@/hooks/useAsync';
import { useFavorites } from '@/context/FavoritesContext';
import { useComparison } from '@/context/ComparisonContext';
import { formatPrice } from '@/utils/format';

/**
 * Car details.
 *
 * Two columns above 1024px: the title, gallery and specifications on the start (right)
 * side, and the sticky price card on the end side. Below that the price card moves under
 * the title so the price is still the first thing after the name.
 */
export function CarDetails() {
  const { carId } = useParams();
  const { data: car, loading, error } = useAsync(useCallback(() => getCarById(carId), [carId]), [carId]);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isCompared, toggleComparison } = useComparison();
  const [color, setColor] = useState(0);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-cyan">
        <Spinner size={26} />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="wrap sec">
        <EmptyState
          title="لم نعثر على هذه السيارة"
          body="ربما بيعت أو تغيّر رابطها. تصفّح المعروض الحالي."
          action={{ label: 'تصفّح السيارات', to: '/cars' }}
        />
      </div>
    );
  }

  const favorite = isFavorite(car.id);
  const compared = isCompared(car.id);

  return (
    <div className="bg-white pb-16 pt-8 lg:pb-[88px]">
      <div className="wrap">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'الرئيسية', to: '/' },
            { label: 'كل السيارات', to: '/cars' },
            { label: car.name },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
          {/* Main column */}
          <div className="min-w-0 lg:order-1">
            <header className="text-start">
              <h1 className="font-sans text-[34px] font-light text-charcoal sm:text-[40px] ltr-run">{car.name}</h1>
              {car.tagline ? <p className="mt-2 font-display text-[22px] text-cyan">{car.tagline}</p> : null}

              {car.badges?.length ? (
                <ul className="mt-6 flex flex-wrap justify-start gap-3">
                  {car.badges.map((badge, index) => (
                    <li
                      key={badge}
                      className={cn(
                        'inline-flex items-center gap-2.5 rounded-pill border px-4 py-2 text-[13px]',
                        index === 0 ? 'border-cyan/25 bg-sky text-charcoal' : 'border-hairline bg-white text-charcoal',
                      )}
                    >
                      <Icon name="flag" size={15} className="text-cyan" />
                      {badge}
                    </li>
                  ))}
                </ul>
              ) : null}
            </header>

            <div className="mt-8">
              <CarGallery car={car} />
            </div>

            <div className="mt-10">
              <SpecStrip car={car} />
            </div>

            <section className="mt-12">
              <h2 className="mb-8 text-start font-display text-[26px] font-bold text-charcoal">المواصفات التقنية</h2>
              <TechSpecs car={car} />
            </section>

            <div className="mt-12">
              <CarFeatures features={car.features} />
            </div>

            <div className="mt-10">
              <FinanceCalculator car={car} />
            </div>
          </div>

          {/* Price card */}
          <aside className="min-w-0 lg:order-2 lg:sticky lg:top-[110px] lg:self-start">
            <div className="rounded-card border border-hairline bg-white p-7 shadow-card">
              <p className="text-start text-[13px] text-muted">السعر الإجمالي</p>
              <p className="mt-2 text-start font-sans text-[30px] font-medium text-charcoal">
                <span className="ltr-run">{formatPrice(car.price, { withCurrency: false })}</span>
                <span className="ms-1 text-[16px]">ر.س</span>
              </p>
              <p className="mt-1.5 text-start text-[12px] text-muted">شامل ضريبة القيمة المضافة</p>

              {car.colors?.length ? (
                <div className="mt-7 border-t border-hairline pt-6">
                  <p id="car-color" className="mb-3.5 text-start text-[13px] text-muted">
                    اللون الخارجي
                  </p>
                  <div role="group" aria-labelledby="car-color" className="flex justify-start gap-3">
                    {car.colors.map((value, index) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={color === index}
                        aria-label={`اللون ${index + 1}`}
                        onClick={() => setColor(index)}
                        style={{ backgroundColor: value }}
                        className={cn(
                          'h-9 w-9 rounded-full border transition-[box-shadow] duration-250 ease-tirhal',
                          color === index
                            ? 'border-cyan shadow-[0_0_0_2px_#fff,0_0_0_4px_#17A3F4]'
                            : 'border-hairline',
                        )}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-7 border-t border-hairline pt-6">
                <Button to={`/reservation?car=${car.id}`} block size="md">
                  احجز معاينة
                </Button>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" onClick={() => toggleComparison(car)} aria-pressed={compared}>
                    <Icon name="compare" size={16} />
                    {compared ? 'في المقارنة' : 'أضف للمقارنة'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleFavorite(car)} aria-pressed={favorite}>
                    <Icon name={favorite ? 'heart-fill' : 'heart'} size={16} />
                    {favorite ? 'في المفضلة' : 'أضف للمفضلة'}
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
