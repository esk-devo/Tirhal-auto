import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as favoritesService from '@/services/favorites';
import { wishlistCarIds } from '@/data/mock/cars';
import { useToast } from '@/context/ToastContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [ready, setReady] = useState(false);
  const { notify } = useToast();

  useEffect(() => {
    let active = true;
    favoritesService.listFavoriteIds(wishlistCarIds).then((stored) => {
      if (!active) return;
      setIds(stored);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const isFavorite = useCallback((carId) => ids.includes(carId), [ids]);

  const toggleFavorite = useCallback(
    async (car) => {
      const carId = typeof car === 'string' ? car : car.id;
      const carName = typeof car === 'string' ? null : car.name;
      const wasFavorite = ids.includes(carId);

      const next = wasFavorite
        ? await favoritesService.removeFavorite(carId)
        : await favoritesService.addFavorite(carId);

      setIds(next);
      notify(
        wasFavorite
          ? { message: carName ? `أزلنا ${carName} من المفضلة` : 'أزلنا السيارة من المفضلة' }
          : {
              message: carName ? `أضفنا ${carName} إلى المفضلة` : 'أضفنا السيارة إلى المفضلة',
              tone: 'success',
              action: { label: 'عرض المفضلة', to: '/favorites' },
            },
      );
      return !wasFavorite;
    },
    [ids, notify],
  );

  const clear = useCallback(async () => {
    setIds(await favoritesService.clearFavorites());
    notify({ message: 'أفرغنا قائمة المفضلة' });
  }, [notify]);

  const value = useMemo(
    () => ({ ids, count: ids.length, ready, isFavorite, toggleFavorite, clear }),
    [ids, ready, isFavorite, toggleFavorite, clear],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside <FavoritesProvider>');
  return context;
};
