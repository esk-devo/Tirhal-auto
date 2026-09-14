import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Logo } from '@/components/common/Logo';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/buttons/Button';
import { primaryNav } from '@/components/navigation/navItems';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { useFavorites } from '@/context/FavoritesContext';
import { useComparison } from '@/context/ComparisonContext';
import { useAuth } from '@/context/AuthContext';

/**
 * The cyan dot the Figma puts on the heart and compare icons when they hold something.
 * It is a presence indicator, not a counter — the count lives in the compare bar.
 */
function Dot({ show }) {
  if (!show) return null;
  return (
    <span
      aria-hidden="true"
      className="absolute -top-0.5 -end-0.5 h-[11px] w-[11px] rounded-full border-2 border-white bg-cyan"
    />
  );
}

function UtilityLink({ to, label, icon, dot = false, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        cn(
          'relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-250 ease-tirhal',
          isActive ? 'text-cyan' : 'text-charcoal hover:text-cyan',
        )
      }
    >
      <Icon name={icon} size={21} />
      <Dot show={dot} />
    </NavLink>
  );
}

/**
 * Header.
 *
 * Figma layout, right to left: the cyan mark, the three nav links centred in the bar,
 * then the utility icons, a hairline divider and the "تواصل معنا" pill on the end edge.
 * Below 1024px the links and the pill collapse into the sheet behind a menu button.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count: favoriteCount } = useFavorites();
  const { count: compareCount } = useComparison();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-[75] border-b border-hairline bg-white">
      <div className="wrap flex h-[76px] items-center gap-4 lg:h-[90px]">
        <Logo size={44} />

        <nav aria-label="التنقل الرئيسي" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-block py-1 text-[15px] transition-colors duration-250 ease-tirhal',
                      isActive ? 'font-medium text-cyan' : 'text-charcoal hover:text-cyan',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {/* Active state is a cyan underline, matching the design. */}
                      {isActive ? (
                        <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-cyan" />
                      ) : null}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-1 lg:ms-0">
          <UtilityLink to="/cars" label="البحث عن سيارة" icon="search" end />
          <UtilityLink to="/favorites" label="المفضلة" icon="heart" dot={favoriteCount > 0} />
          <UtilityLink to="/compare" label="المقارنة" icon="compare" dot={compareCount > 0} />
          <UtilityLink
            to={isAuthenticated ? '/favorites' : '/signin'}
            label={isAuthenticated ? 'حسابي' : 'تسجيل الدخول'}
            icon="user"
          />

          <span aria-hidden="true" className="mx-3 hidden h-6 w-px bg-hairline lg:block" />

          <Button to="/contact" size="sm" className="hidden lg:inline-flex">
            تواصل معنا
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors duration-250 ease-tirhal hover:text-cyan lg:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
