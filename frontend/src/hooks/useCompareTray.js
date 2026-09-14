import { useLocation } from 'react-router-dom';
import { useComparison } from '@/context/ComparisonContext';

/**
 * Whether the comparison bar is currently on screen.
 *
 * The design docks the bar to the listing page, which is where cars are added to the
 * tray; every other screen carries the state in the header's compare icon instead. Three
 * separate pieces of chrome need this answer — the layout's bottom padding, the
 * back-to-top button and the toast stack — so the rule lives here rather than being
 * re-derived, and drifting, in each of them.
 */
export function useCompareTrayVisible() {
  const { count } = useComparison();
  const { pathname } = useLocation();
  return count > 0 && pathname === '/cars';
}
