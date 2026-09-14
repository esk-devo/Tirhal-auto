import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as comparisonService from '@/services/comparison';
import { MAX_COMPARE } from '@/data/mock/taxonomy';
import { defaultCompareIds } from '@/data/mock/cars';
import { useToast } from '@/context/ToastContext';

const ComparisonContext = createContext(null);

export function ComparisonProvider({ children }) {
  const [ids, setIds] = useState([]);
  const { notify } = useToast();

  useEffect(() => {
    let active = true;
    comparisonService.listComparisonIds(defaultCompareIds).then((stored) => {
      if (active) setIds(stored);
    });
    return () => {
      active = false;
    };
  }, []);

  const isCompared = useCallback((carId) => ids.includes(carId), [ids]);
  const isFull = ids.length >= MAX_COMPARE;

  const toggleComparison = useCallback(
    async (car) => {
      const carId = typeof car === 'string' ? car : car.id;
      const carName = typeof car === 'string' ? 'السيارة' : car.name;

      if (ids.includes(carId)) {
        setIds(await comparisonService.removeFromComparison(carId));
        notify({ message: `أزلنا ${carName} من المقارنة` });
        return false;
      }

      if (ids.length >= MAX_COMPARE) {
        notify({
          message: `يمكنك مقارنة ${MAX_COMPARE} سيارات كحد أقصى. أزل سيارة أولًا.`,
          tone: 'warning',
          action: { label: 'عرض المقارنة', to: '/compare' },
        });
        return false;
      }

      const next = await comparisonService.addToComparison(carId);
      setIds(next);
      // The audit's headline finding: never confirm without naming the destination.
      notify({
        message: `تمت إضافة ${carName} إلى المقارنة (${next.length}/${MAX_COMPARE})`,
        tone: 'success',
        action: { label: 'عرض المقارنة', to: '/compare' },
      });
      return true;
    },
    [ids, notify],
  );

  const remove = useCallback(async (carId) => {
    setIds(await comparisonService.removeFromComparison(carId));
  }, []);

  const clear = useCallback(async () => {
    setIds(await comparisonService.clearComparison());
  }, []);

  const value = useMemo(
    () => ({ ids, count: ids.length, max: MAX_COMPARE, isFull, isCompared, toggleComparison, remove, clear }),
    [ids, isFull, isCompared, toggleComparison, remove, clear],
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error('useComparison must be used inside <ComparisonProvider>');
  return context;
};
