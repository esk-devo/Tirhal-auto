import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

/** Accessible dialog: Escape closes, focus moves in and is trapped, scroll is locked. */
export function Modal({ open, onClose, title, description, children, footer, size = 'md' }) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;

    previouslyFocused.current = document.activeElement;
    panelRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="إغلاق النافذة"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          'relative w-full overflow-hidden rounded-t-panel bg-white shadow-lift outline-none sm:rounded-panel',
          'animate-fade-up',
          size === 'sm' && 'sm:max-w-[420px]',
          size === 'md' && 'sm:max-w-[560px]',
          size === 'lg' && 'sm:max-w-[820px]',
        )}
      >
        <header className="flex items-start justify-between gap-6 border-b border-hairline px-6 py-5">
          <div>
            <h2 className="font-display text-[19px] font-bold text-charcoal">{title}</h2>
            {description ? <p className="mt-1 text-[13px] text-muted">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="rounded-full p-1.5 text-muted transition-colors duration-250 ease-tirhal hover:bg-paper hover:text-charcoal"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">{children}</div>

        {footer ? <footer className="border-t border-hairline px-6 py-4">{footer}</footer> : null}
      </div>
    </div>,
    document.body,
  );
}
