import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { DirectionalIcon } from '@/components/common/Icon';

/** The cyan pennant tick, drawn by the `.diamond` utility in index.css. */
export function Diamond({ size = 'sm', className = '' }) {
  return <span aria-hidden="true" className={cn(size === 'lg' ? 'diamond-lg' : 'diamond', className)} />;
}

/**
 * Eyebrow kicker — cyan label with the pennant tick on its start (right) edge.
 * Figma pairs the tick with the label everywhere; it is never used standalone.
 */
export function Eyebrow({ children, tone = 'cyan', withTick = true, className = '' }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-[13px] font-medium',
        tone === 'light' ? 'text-white/70' : 'text-cyan',
        className,
      )}
    >
      {withTick ? <Diamond /> : null}
      <span>{children}</span>
    </p>
  );
}

/**
 * Section header.
 *
 * Two arrangements are used in the design and both live here so headings cannot drift:
 * `align="center"` (فروعنا حولك, ليش ترحال؟) and `align="start"` with an optional action
 * link on the end edge (إصدارات جديدة, أيقونات الطريق).
 *
 * `weight` follows the design too — most headings are set in a light Cairo, a few
 * (ليش ترحال؟, امتلك سيارتك) in bold.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'start',
  weight = 'light',
  tone = 'dark',
  className = '',
}) {
  const light = tone === 'light';
  const centered = align === 'center';

  const heading = (
    <h2
      className={cn(
        'font-display leading-[1.25] text-[30px] sm:text-[38px] lg:text-[44px]',
        weight === 'bold' ? 'font-extrabold' : 'font-light',
        light ? 'text-white' : 'text-charcoal',
      )}
    >
      {title}
    </h2>
  );

  if (centered) {
    return (
      <header className={cn('flex flex-col items-center text-center', className)}>
        {eyebrow ? (
          <Eyebrow tone={light ? 'light' : 'cyan'} withTick={false} className="mb-4">
            {eyebrow}
          </Eyebrow>
        ) : null}
        {heading}
        {description ? (
          <p className={cn('mt-3 max-w-[560px] text-[15px]', light ? 'text-white/60' : 'text-muted')}>{description}</p>
        ) : null}
      </header>
    );
  }

  return (
    <header className={cn('flex flex-wrap items-end justify-between gap-6', className)}>
      <div>
        {eyebrow ? <Eyebrow tone={light ? 'light' : 'cyan'} className="mb-3">{eyebrow}</Eyebrow> : null}
        {heading}
        {description ? (
          <p className={cn('mt-3 max-w-[520px] text-[15px]', light ? 'text-white/60' : 'text-muted')}>{description}</p>
        ) : null}
      </div>

      {action ? (
        <Link
          to={action.to}
          className="group inline-flex items-center gap-2 border-b border-cyan/40 pb-1 text-[14px] font-medium text-cyan transition-colors duration-250 ease-tirhal hover:border-cyan"
        >
          <DirectionalIcon direction="forward" name="arrow" size={16} />
          {action.label}
        </Link>
      ) : null}
    </header>
  );
}
