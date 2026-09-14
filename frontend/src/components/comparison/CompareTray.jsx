import { useEffect, useState } from 'react';
import { getCarsByIds } from '@/services/cars';
import { useComparison } from '@/context/ComparisonContext';
import { useCompareTrayVisible } from '@/hooks/useCompareTray';
import { CarImage } from '@/components/car/CarImage';
import { Button } from '@/components/buttons/Button';
import { Icon } from '@/components/common/Icon';

/**
 * The comparison bar.
 *
 * Reproduced from the listing page: a charcoal panel docked to the bottom of the viewport
 * with rounded top corners, the filled thumbnails and empty slots on the start (right)
 * edge beside the count, and "مسح الكل" plus the "قارن الآن" pill on the end edge.
 *
 * It is also the answer to the audit's headline finding — adding a car to the comparison
 * now has a visible, permanent destination rather than a message that goes nowhere.
 */
export function CompareTray() {
  const { ids, count, max, remove, clear } = useComparison();
  const visible = useCompareTrayVisible();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    let active = true;
    if (ids.length === 0) {
      setCars([]);
      return undefined;
    }
    getCarsByIds(ids).then((result) => {
      if (active) setCars(result);
    });
    return () => {
      active = false;
    };
  }, [ids]);

  if (!visible) return null;

  const emptySlots = Math.max(max - cars.length, 0);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-0 sm:px-6">
      <div className="mx-auto flex w-full max-w-[1360px] flex-wrap items-center justify-between gap-4 rounded-t-panel bg-charcoal px-5 py-4 text-white shadow-lift sm:px-7">
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-2.5">
            {cars.map((car) => (
              <li key={car.id} className="group relative">
                <span className="block w-[58px] overflow-hidden rounded-[8px]">
                  <CarImage imageKey={car.image} alt={car.name} ratio="aspect-[4/3]" />
                </span>
                <button
                  type="button"
                  onClick={() => remove(car.id)}
                  aria-label={`إزالة ${car.name} من المقارنة`}
                  className="absolute -end-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-charcoal opacity-0 transition-opacity duration-250 ease-tirhal focus-visible:opacity-100 group-hover:opacity-100"
                >
                  <Icon name="close" size={12} />
                </button>
              </li>
            ))}

            {Array.from({ length: emptySlots }, (_, index) => (
              <li
                key={`slot-${index}`}
                aria-hidden="true"
                className="flex h-[44px] w-[58px] items-center justify-center rounded-[8px] border border-dashed border-white/30 text-white/45"
              >
                <Icon name="plus" size={16} />
              </li>
            ))}
          </ul>

          <div className="text-start">
            <p className="font-display text-[15px] font-bold">
              <span className="ltr-run">{count}</span> سيارة للمقارنة
            </p>
            <p className="mt-0.5 text-[12px] text-white/45">
              الحد الأقصى <span className="ltr-run">{max}</span> سيارات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={clear}
            className="text-[13px] text-white/70 underline underline-offset-4 transition-colors duration-250 ease-tirhal hover:text-white"
          >
            مسح الكل
          </button>

          <Button to="/compare" size="sm" className="gap-2.5">
            قارن الآن
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink px-1 text-[11px] font-bold text-white ltr-run">
              {count}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
