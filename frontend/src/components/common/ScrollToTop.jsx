import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { useCompareTrayVisible } from '@/hooks/useCompareTray';

/** Resets scroll on navigation — a router concern, not a page concern. */
export function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

/**
 * Back-to-top control, in the primary brand cyan so it reads as part of the same system
 * as every other action. It lifts clear of the comparison bar when that is on screen.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const trayVisible = useCompareTrayVisible();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="العودة إلى أعلى الصفحة"
      className={cn(
        'fixed end-5 z-[80] inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan text-white shadow-cta',
        'transition-[transform,box-shadow,bottom] duration-250 ease-tirhal hover:-translate-y-[2px]',
        trayVisible ? 'bottom-[124px]' : 'bottom-5',
      )}
    >
      <Icon name="arrow" size={20} style={{ transform: 'rotate(-90deg)' }} />
    </button>
  );
}
