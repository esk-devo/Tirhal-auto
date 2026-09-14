import { useCallback } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CarGrid } from '@/components/car/CarGrid';
import { listFeatured } from '@/services/cars';
import { useAsync } from '@/hooks/useAsync';

/** "أيقونات الطريق" — three listing cards on the pale blue band. */
export function Fleet() {
  const { data, loading, error, reload } = useAsync(useCallback(() => listFeatured(), []), [], { initialData: [] });

  return (
    <section className="sec bg-sky">
      <div className="wrap">
        <SectionHeading
          eyebrow="الأسطول المميز"
          title="أيقونات الطريق"
          action={{ label: 'عرض الكل', to: '/cars' }}
          className="mb-10"
        />

        <CarGrid cars={data} loading={loading} error={error} onRetry={reload} skeletonCount={3} />
      </div>
    </section>
  );
}
