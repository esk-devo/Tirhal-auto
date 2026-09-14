import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/buttons/Button';

/** Loading, empty and error states — all Arabic, all shaped like the content they replace. */

export function CardSkeleton({ className = '' }) {
  return (
    <div
      className={cn('overflow-hidden rounded-card border border-hairline bg-white shadow-card', className)}
      aria-hidden="true"
    >
      <div className="aspect-[16/10] animate-pulse bg-charcoal/[.06]" />
      <div className="space-y-3 p-5">
        <div className="ms-auto h-3 w-1/4 animate-pulse rounded bg-charcoal/[.06]" />
        <div className="ms-auto h-4 w-2/3 animate-pulse rounded bg-charcoal/[.06]" />
        <div className="h-[52px] w-full animate-pulse rounded bg-charcoal/[.06]" />
        <div className="h-10 w-full animate-pulse rounded-pill bg-charcoal/[.06]" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="جارٍ تحميل السيارات">
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function EmptyState({ title, body, action, className = '' }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-panel border border-dashed border-hairline bg-white px-6 py-16 text-center',
        className,
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky text-cyan">
        <Icon name="search" size={22} />
      </span>
      <h3 className="mt-5 font-display text-[19px] font-medium text-charcoal">{title}</h3>
      {body ? <p className="mt-2.5 max-w-[420px] text-[14px] text-muted">{body}</p> : null}
      {action ? (
        <Button to={action.to} onClick={action.onClick} className="mt-7">
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}

export function ErrorState({ message = 'تعذّر تحميل البيانات. حاول مرة أخرى.', onRetry }) {
  return (
    <EmptyState
      title="حدث خطأ"
      body={message}
      action={onRetry ? { label: 'إعادة المحاولة', onClick: onRetry } : undefined}
    />
  );
}

export function Spinner({ size = 18, className = '' }) {
  return (
    <span
      role="status"
      aria-label="جارٍ التحميل"
      style={{ width: size, height: size }}
      className={cn('inline-block animate-spin rounded-full border-2 border-current border-t-transparent', className)}
    />
  );
}
