import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { useToast } from '@/context/ToastContext';
import { useCompareTrayVisible } from '@/hooks/useCompareTray';

const tones = {
  info: 'border-white/15',
  success: 'border-cyan/60',
  warning: 'border-cyan/60',
};

const icons = { info: 'info', success: 'check', warning: 'alert' };

/** Bottom-start stack. Every toast that follows an "add" action names its destination. */
export function ToastViewport() {
  const { toasts, dismiss } = useToast();
  const trayVisible = useCompareTrayVisible();
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className={cn(
        'pointer-events-none fixed start-5 z-[95] flex w-[min(360px,calc(100vw-40px))] flex-col gap-3',
        // Stack above the comparison tray rather than behind it.
        trayVisible ? 'bottom-[124px]' : 'bottom-5',
      )}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'on-dark pointer-events-auto flex items-start gap-3 rounded-[14px] border bg-charcoal px-4 py-3.5 text-white shadow-lift animate-fade-up',
            tones[toast.tone] ?? tones.info,
          )}
        >
          <span className="mt-0.5 shrink-0 text-cyan">
            <Icon name={icons[toast.tone] ?? 'info'} size={18} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] leading-[1.6]">{toast.message}</p>
            {toast.action ? (
              <Link
                to={toast.action.to}
                onClick={() => dismiss(toast.id)}
                className="mt-1.5 inline-block text-[13px] font-bold text-cyan underline-offset-4 hover:underline"
              >
                {toast.action.label}
              </Link>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            aria-label="إغلاق التنبيه"
            className="shrink-0 rounded-full p-1 text-white/45 transition-colors duration-250 ease-tirhal hover:text-white"
          >
            <Icon name="close" size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
