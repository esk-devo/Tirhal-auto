import { CarCard } from '@/components/car/CarCard';
import { GridSkeleton, EmptyState, ErrorState } from '@/components/common/States';

/**
 * Three columns above 1024px, two from 640px, one below — the grid the design uses on
 * both the home fleet band and the listing page. Owns the loading / error / empty
 * branches so no page repeats them.
 */
export function CarGrid({ cars = [], loading = false, error = null, onRetry, empty, skeletonCount = 3 }) {
  if (loading) return <GridSkeleton count={skeletonCount} />;
  if (error) return <ErrorState message={error.message} onRetry={onRetry} />;

  if (cars.length === 0) {
    return (
      <EmptyState
        title={empty?.title ?? 'لا توجد سيارات مطابقة'}
        body={empty?.body ?? 'جرّب توسيع نطاق السعر أو إزالة بعض الفلاتر.'}
        action={empty?.action}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
