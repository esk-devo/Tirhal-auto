import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/buttons/Button';
import { Logo } from '@/components/common/Logo';
import { Diamond } from '@/components/common/SectionHeading';
import { primaryNav } from '@/components/navigation/navItems';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useAuth } from '@/context/AuthContext';
import { contactInfo } from '@/data/mock/company';

/**
 * Mobile navigation sheet.
 *
 * It slides in from the start edge — the right, in RTL — so it opens under the thumb on
 * the same side as the menu button rather than mirroring an LTR pattern.
 */
export function MobileMenu({ open, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();

  useLockBodyScroll(open);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={cn('fixed inset-0 z-[85] overflow-hidden lg:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="إغلاق القائمة"
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-charcoal/60 transition-opacity duration-250 ease-tirhal',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
        className="absolute inset-y-0 start-0 flex w-[min(86vw,330px)] flex-col bg-white transition-transform duration-300 ease-tirhal"
        // `start-0` is the right edge in RTL, so the closed sheet parks further right.
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
          <Logo size={40} />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="rounded-full p-2 text-muted transition-colors duration-250 ease-tirhal hover:text-charcoal"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav aria-label="التنقل الرئيسي للجوال" className="flex-1 overflow-y-auto px-6 py-5">
          <ul className="flex flex-col">
            {[...primaryNav, { to: '/compare', label: 'المقارنة' }, { to: '/favorites', label: 'المفضلة' }].map(
              (item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 border-b border-hairline py-4 text-[15px] transition-colors duration-250 ease-tirhal',
                        isActive ? 'font-medium text-cyan' : 'text-charcoal hover:text-cyan',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? <Diamond /> : <span className="w-[9px]" aria-hidden="true" />}
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="border-t border-hairline px-6 py-6">
          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <p className="text-[13px] text-muted">أهلًا، {user?.name}</p>
              <Button
                variant="outline"
                block
                onClick={async () => {
                  await signOut();
                  onClose();
                  navigate('/');
                }}
              >
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Button to="/contact" block onClick={onClose}>
                تواصل معنا
              </Button>
              <Button to="/signin" variant="outline" block onClick={onClose}>
                تسجيل الدخول
              </Button>
            </div>
          )}

          <a
            href={`tel:${contactInfo.phone}`}
            className="mt-5 flex items-center gap-2.5 text-[13px] text-muted transition-colors duration-250 ease-tirhal hover:text-cyan"
          >
            <Icon name="phone" size={16} />
            <span className="ltr-run">{contactInfo.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
