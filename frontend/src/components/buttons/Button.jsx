import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

/**
 * Buttons, exactly as the Figma uses them.
 *
 * `primary`  — cyan pill, white text (search, عرض التفاصيل, إرسال, تواصل معنا)
 * `dark`     — near-black pill on the cyan CTA band (تواصل معنا الآن)
 * `outline`  — hairline border on white (أضف للمقارنة, إضافة سيارة للمقارنة)
 * `ghost`    — borderless, used inside dark panels
 *
 * The pill radius is reserved for actions: if it is a pill, it is clickable. A few places
 * in the design square it off instead — the hero search submit sits in a rounded-rect
 * field row — so the radius is a named prop rather than something a caller overrides
 * through `className`, where two competing border-radius utilities would be decided by
 * stylesheet order rather than by intent.
 */
const base = cn(
  'inline-flex items-center justify-center gap-2 font-display font-medium',
  'transition-[transform,background-color,border-color,box-shadow,color] duration-250 ease-tirhal',
  'hover:-translate-y-[1px] active:translate-y-0 disabled:pointer-events-none disabled:opacity-45',
);

const radii = {
  pill: 'rounded-pill',
  md: 'rounded-[8px]',
};

const variants = {
  primary: 'bg-cyan text-white shadow-cta hover:bg-[#0F93E2]',
  dark: 'bg-ink text-white hover:bg-charcoal',
  outline: 'border border-hairline bg-white text-charcoal hover:border-cyan hover:text-cyan',
  ghost: 'border border-line bg-transparent text-white hover:border-white/40 hover:bg-white/5',
  subtle: 'bg-cyan/10 text-cyan hover:bg-cyan hover:text-white',
};

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-[14px]',
  lg: 'h-[52px] px-8 text-[15px]',
};

export const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', radius = 'pill', block = false, className = '', children, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], radii[radius], block && 'w-full', className);

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const Component = as ?? 'button';
  return (
    <Component
      ref={ref}
      type={Component === 'button' ? (rest.type ?? 'button') : undefined}
      className={classes}
      {...rest}
    >
      {children}
    </Component>
  );
});

/**
 * Circular icon control. Used for the card overlay actions (heart / compare), the
 * gallery arrows and the carousel controls.
 */
export const IconButton = forwardRef(function IconButton(
  { label, variant = 'white', size = 42, className = '', children, ...rest },
  ref,
) {
  const tones = {
    white: 'bg-white text-charcoal shadow-float hover:text-cyan',
    cyan: 'bg-cyan text-white shadow-cta',
    outline: 'border border-hairline bg-white text-charcoal hover:border-cyan hover:text-cyan',
    dark: 'border border-line text-white hover:border-cyan hover:text-cyan',
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      style={{ width: size, height: size }}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        'transition-[transform,color,background-color,border-color] duration-250 ease-tirhal',
        'hover:-translate-y-[1px] disabled:pointer-events-none disabled:opacity-40',
        tones[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
