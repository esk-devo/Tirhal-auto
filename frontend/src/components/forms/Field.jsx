import { useId, useState } from 'react';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';

/**
 * Form primitives.
 *
 * The design uses two input treatments and both live here: `filled` — a pale field with a
 * hairline, used on the contact and auth screens — and `underline`, the bottom-ruled field
 * the checkout form uses. Every control is label-bound, and the invalid state is carried
 * by an icon as well as colour so it never relies on hue alone.
 */
const filled =
  'w-full rounded-[10px] border bg-paper px-4 text-[14px] text-charcoal outline-none transition-[border-color,background-color] duration-250 ease-tirhal placeholder:text-muted/70 focus:border-cyan focus:bg-white disabled:cursor-not-allowed disabled:opacity-60';

const underline =
  'w-full border-0 border-b bg-transparent px-0 pb-2.5 text-[14px] text-charcoal outline-none transition-colors duration-250 ease-tirhal placeholder:text-muted/70 focus:border-cyan disabled:cursor-not-allowed disabled:opacity-60';

const controlClass = (variant, invalid) =>
  variant === 'underline'
    ? cn(underline, invalid ? 'border-[#E4463C]' : 'border-hairline')
    : cn(filled, 'h-12', invalid ? 'border-[#E4463C]' : 'border-hairline');

function Wrapper({ id, label, error, hint, children, className, labelExtra }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={id} className="text-[13px] text-muted">
            {label}
          </label>
          {labelExtra ?? null}
        </div>
      ) : null}

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center justify-start gap-1.5 text-[12px] text-[#E4463C]">
          {error}
          <Icon name="alert" size={13} />
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-start text-[12px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Latin-shaped values stay LTR inside the RTL page. */
const LTR_TYPES = ['email', 'tel', 'password', 'url', 'number'];

export function Input({ label, error, hint, variant = 'filled', className, containerClassName, labelExtra, ...rest }) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <Wrapper
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={rest.required}
      className={containerClassName}
      labelExtra={labelExtra}
    >
      <input
        {...rest}
        id={id}
        dir={rest.dir ?? (LTR_TYPES.includes(rest.type) ? 'ltr' : 'rtl')}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlClass(variant, Boolean(error)), 'text-start', className)}
      />
    </Wrapper>
  );
}

/** Password field with the show/hide control the auth screens draw on the end edge. */
export function PasswordInput({ label, error, variant = 'filled', className, containerClassName, labelExtra, ...rest }) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <Wrapper id={id} label={label} error={error} required={rest.required} className={containerClassName} labelExtra={labelExtra}>
      <div className="relative">
        <input
          {...rest}
          id={id}
          type={visible ? 'text' : 'password'}
          dir="ltr"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlClass(variant, Boolean(error)), 'ps-12 text-start', className)}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
          className="absolute inset-y-0 start-3.5 flex items-center text-muted transition-colors duration-250 ease-tirhal hover:text-charcoal"
        >
          <Icon name={visible ? 'eye-off' : 'eye'} size={18} />
        </button>
      </div>
    </Wrapper>
  );
}

export function Textarea({ label, error, hint, variant = 'filled', className, containerClassName, rows = 5, ...rest }) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={rest.required} className={containerClassName}>
      <textarea
        {...rest}
        id={id}
        rows={rows}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          variant === 'underline' ? underline : cn(filled, 'py-3.5'),
          'resize-y leading-[1.9] text-start',
          error ? 'border-[#E4463C]' : 'border-hairline',
          className,
        )}
      />
    </Wrapper>
  );
}

export function Select({
  label,
  error,
  hint,
  options = [],
  placeholder,
  variant = 'filled',
  className,
  containerClassName,
  ...rest
}) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={rest.required} className={containerClassName}>
      <div className="relative">
        <select
          {...rest}
          id={id}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(controlClass(variant, Boolean(error)), 'appearance-none pe-10 text-start', className)}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.id ?? option.value} value={option.id ?? option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* The caret sits on the end edge — the left, in RTL — via a logical inset. */}
        <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-muted">
          <Icon name="chevron" size={16} style={{ transform: 'rotate(90deg)' }} />
        </span>
      </div>
    </Wrapper>
  );
}

export function Checkbox({ label, error, className, ...rest }) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-[1.8] text-charcoal">
        <input
          {...rest}
          id={id}
          type="checkbox"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-[17px] w-[17px] shrink-0 cursor-pointer accent-cyan"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[12px] text-[#E4463C]">
          <Icon name="alert" size={13} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Radio group — the "افراد / شركات" control on the checkout form. */
export function RadioGroup({ label, name, options = [], value, onChange, className = '' }) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      {label ? <legend className="mb-2 text-start text-[13px] text-muted">{label}</legend> : null}
      <div className="flex items-center justify-start gap-7 pb-2.5">
        {options.map((option) => (
          <label key={option.id} className="flex cursor-pointer items-center gap-2.5 text-[14px] text-charcoal">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="h-[17px] w-[17px] cursor-pointer accent-cyan"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Range slider. Styled to the design's cyan track and round thumb, and kept as a real
 * `<input type="range">` so keyboard and screen-reader support come for free.
 */
export function RangeInput({ label, valueLabel, className = '', ...rest }) {
  const generatedId = useId();
  const id = rest.id ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-cyan ltr-run">{valueLabel}</span>
        <label htmlFor={id} className="text-[13px] text-muted">
          {label}
        </label>
      </div>
      <input
        {...rest}
        id={id}
        type="range"
        dir="ltr"
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-hairline accent-cyan"
      />
    </div>
  );
}
