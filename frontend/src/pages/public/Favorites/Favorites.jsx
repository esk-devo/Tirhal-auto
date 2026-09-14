import { useCallback } from 'react';
import { WishlistCard } from '@/components/car/WishlistCard';
import { EmptyState, GridSkeleton, ErrorState } from '@/components/common/States';
import { useFavorites } from '@/context/FavoritesContext';
import { useAsync } from '@/hooks/useAsync';
import { getCarsByIds } from '@/services/cars';

/** "قائمة أمنياتي" — the saved list, in the heavy display weight the design uses here. */
export function Favorites() {
  const { ids, ready, toggleFavorite } = useFavorites();

  const { data: cars, loading, error, reload } = useAsync(
    useCallback(() => getCarsByIds(ids), [ids]),
    [ids.join(',')],
    { initialData: [], enabled: ready },
  );

  const isEmpty = ready && ids.length === 0;

  return (
    <div className="sec bg-paper">
      <div className="wrap">
        <header className="text-start">
          <h1 className="font-display text-[38px] font-black leading-[1.15] text-charcoal sm:text-[52px]">
            قائمة أمنياتي
          </h1>
          <p className="mt-2 text-[14.5px] text-muted">السيارات التي لفتت انتباهك في رحلتك</p>
        </header>

        <div className="mt-11">
          {isEmpty ? (
            <EmptyState
              title="لا توجد سيارات في القائمة"
              body="اضغط على أيقونة القلب في أي سيارة لحفظها هنا والرجوع إليها لاحقًا."
              action={{ label: 'تصفّح السيارات', to: '/cars' }}
            />
          ) : loading || !ready ? (
            <GridSkeleton count={3} />
          ) : error ? (
            <ErrorState message={error.message} onRetry={reload} />
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <WishlistCard key={car.id} car={car} onRemove={toggleFavorite} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
