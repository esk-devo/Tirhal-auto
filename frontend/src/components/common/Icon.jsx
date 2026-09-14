import { cn } from '@/utils/cn';

/**
 * One inline SVG set for the whole site — no icon dependency, no network cost.
 *
 * The Figma uses stroke icons throughout (24×24 grid, 2px round-joined strokes), so the
 * set is stroke-first. A small number of glyphs are fills (brand marks, the compare
 * pennant) and declare `fill: true`.
 *
 * RTL note: directional glyphs are exposed through <DirectionalIcon> with a *logical*
 * direction, never a physical one — in an RTL document "forward" points left. The icon
 * and the motion it triggers are derived from the same value so they cannot disagree.
 */
const strokeIcons = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></>,
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  // Two arrows converging — the comparison mark used across the cards and the navbar.
  compare: (
    <>
      <path d="M3 15.5h8" />
      <path d="m8.2 12.7 2.8 2.8-2.8 2.8" />
      <path d="M21 8.5h-8" />
      <path d="m15.8 5.7-2.8 2.8 2.8 2.8" />
    </>
  ),
  user: <><circle cx="12" cy="9" r="3.6" /><path d="M18.5 20a6.5 6.5 0 0 0-13 0" /></>,
  building: (
    <>
      <path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
      <path d="M14 10h4a2 2 0 0 1 2 2v9" />
      <path d="M2 21h20" />
      <path d="M7 8h1M7 12h1M7 16h1M11 8h1M11 12h1M11 16h1M17 14h1M17 18h1" />
    </>
  ),
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  check: <path d="m20 6-11 11-5-5" />,
  'check-circle': <><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  gauge: <><path d="m12 14 4-4" /><path d="M3.3 19a10 10 0 1 1 17.4 0" /></>,
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.65 8.9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  fuel: (
    <>
      <path d="M3 22h12" />
      <path d="M4 9h10" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.8a2 2 0 0 0-.6-1.4L18 5" />
    </>
  ),
  plug: (
    <>
      <path d="M5 17h11a2 2 0 0 0 2-2V9.5a2 2 0 0 0-.4-1.2L15.4 5.3A2 2 0 0 0 13.8 4.5H8.9a2 2 0 0 0-1.8 1.1L5 10" />
      <path d="M3 17v-5a2 2 0 0 1 2-2" />
      <circle cx="7.5" cy="19.5" r="1.6" />
      <circle cx="16.5" cy="19.5" r="1.6" />
      <path d="M20 12v3" />
    </>
  ),
  seat: <><path d="M5 4h3v8h6a3 3 0 0 1 3 3v5" /><path d="M8 12v4a2 2 0 0 0 2 2h7" /></>,
  engine: <><path d="M6 9h2V6h5v3h3l3 3h3v5h-2v3h-6v-3H8v3H4v-3H2v-5h2V9Z" /></>,
  ruler: <><path d="m3 15 12-12 6 6-12 12-6-6Z" /><path d="m7 11 2 2M11 7l2 2M9.5 16 12 18.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 1.9" /></>,
  phone: (
    <path d="M15.6 21a17.5 17.5 0 0 1-12.6-12.6 2 2 0 0 1 1.3-2.3l2.2-.7a1.5 1.5 0 0 1 1.8.8l1 2.2a1.5 1.5 0 0 1-.4 1.8l-1 .8a12.5 12.5 0 0 0 5.3 5.3l.8-1a1.5 1.5 0 0 1 1.8-.4l2.2 1a1.5 1.5 0 0 1 .8 1.8l-.7 2.2A2 2 0 0 1 15.6 21Z" />
  ),
  mail: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  chat: <path d="M21 14.5a2 2 0 0 1-2 2H8l-4 4V5.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />,
  pin: <><path d="M20 10c0 5-6.4 10.6-7.4 11.4a1 1 0 0 1-1.2 0C10.4 20.6 4 15 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.8" /></>,
  filter: <><path d="M3 5h18" /><path d="M6.5 12h11" /><path d="M10 19h4" /></>,
  sliders: <><path d="M4 8h10M18 8h2" /><path d="M4 16h4M12 16h8" /><circle cx="16" cy="8" r="2" /><circle cx="10" cy="16" r="2" /></>,
  trash: <><path d="M4 7h16" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M6.5 7 7.3 19a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L18 7" /><path d="M10.5 11v6M13.5 11v6" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
  'eye-off': <><path d="M10.7 6.2A8.9 8.9 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.1 3.9" /><path d="M6.6 7.9A17 17 0 0 0 2.5 12S6 18 12 18a9 9 0 0 0 4.1-.9" /><path d="m3 3 18 18" /><path d="M9.9 10a3 3 0 0 0 4.2 4.2" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>,
  alert: <><path d="M12 3.5 2.5 20h19L12 3.5Z" /><path d="M12 10v4" /><path d="M12 17h.01" /></>,
  flag: <><path d="M4 22v-7" /><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" /></>,
  shield: <><path d="M12 3 5 5.6v5.8c0 4.2 2.9 7.6 7 8.6 4.1-1 7-4.4 7-8.6V5.6L12 3Z" /><path d="m9.3 12 1.9 1.9 3.5-3.7" /></>,
  truck: <><path d="M14 17V6H2v11h2" /><path d="M14 9h4l4 4v4h-2" /><circle cx="7" cy="17.5" r="2" /><circle cx="17.5" cy="17.5" r="2" /><path d="M9 17.5h6.5" /></>,
  sparkles: <><path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8Z" /><path d="M19 15.5 19.7 17.4 21.5 18 19.7 18.7 19 20.5 18.3 18.7 16.5 18 18.3 17.4Z" /></>,
  map: <><path d="m3 6 6-2.5 6 2.5 6-2.5v14.5L15 20.5 9 18 3 20.5Z" /><path d="M9 3.5V18M15 6v14.5" /></>,

  /* Body-style silhouettes for the "نوع المركبة" filter tiles. */
  'body-sedan': (
    <>
      <path d="M2 15h20v-2.2a2 2 0 0 0-1.3-1.9l-3.3-1.2-2.1-2a3 3 0 0 0-2-.8H9.4a3 3 0 0 0-2 .8l-2.2 2-2 .8A2 2 0 0 0 2 12.4Z" />
      <circle cx="7" cy="16.6" r="1.8" />
      <circle cx="17" cy="16.6" r="1.8" />
    </>
  ),
  'body-suv': (
    <>
      <path d="M2 15h20v-3.4a2 2 0 0 0-1.4-1.9l-3.2-1-2-2.4a2.6 2.6 0 0 0-2-.9H9a2.6 2.6 0 0 0-2 .9l-2 2.4-2.1.8A2 2 0 0 0 2 11.4Z" />
      <circle cx="7" cy="16.6" r="1.8" />
      <circle cx="17" cy="16.6" r="1.8" />
    </>
  ),
  'body-coupe': (
    <>
      <path d="M2 15h20v-1.8a2 2 0 0 0-1.4-1.9l-3.8-1.3-3-2.2a3.4 3.4 0 0 0-2-.7h-1.4a3.4 3.4 0 0 0-2.3.9L5.4 11l-2 .9A2 2 0 0 0 2 13.7Z" />
      <circle cx="7" cy="16.6" r="1.8" />
      <circle cx="17" cy="16.6" r="1.8" />
    </>
  ),
  'body-van': (
    <>
      <path d="M2.5 15h19V9.6a2 2 0 0 0-2-2h-15a2 2 0 0 0-2 2Z" />
      <path d="M8.5 7.6V15M2.5 11.4h19" />
      <circle cx="7" cy="16.6" r="1.8" />
      <circle cx="17" cy="16.6" r="1.8" />
    </>
  ),
  'body-electric': (
    <>
      <path d="M3.5 14h17V9.8a2 2 0 0 0-1.3-1.9l-2.4-.8-1.4-1.4a2.4 2.4 0 0 0-1.7-.7H9.3a2.4 2.4 0 0 0-1.7.7L6.2 7.1l-2.4.8a2 2 0 0 0-1.3 1.9V14Z" />
      <path d="M3.5 10.6h17" />
      <path d="M7.5 12.2h.01M16.5 12.2h.01" />
      <path d="m12.8 15.5-2.6 3h3.6l-2.6 3" />
    </>
  ),
  'body-hatchback': (
    <>
      <path d="M2 15h20v-2.5a2 2 0 0 0-1.4-1.9l-2.8-1-2.9-2.7a3 3 0 0 0-2-.8H9.6a3 3 0 0 0-2.1.9L4.6 10.4l-1.4.6A2 2 0 0 0 2 12.8Z" />
      <circle cx="7" cy="16.6" r="1.8" />
      <circle cx="17" cy="16.6" r="1.8" />
    </>
  ),
  'body-4x4': (
    <>
      <path d="M3 14h18v-4a1.6 1.6 0 0 0-1.1-1.6l-2.6-.9-1.6-2a2.2 2.2 0 0 0-1.7-.8H8.4a2.2 2.2 0 0 0-1.7.8l-1.6 2-1.1.4A1.6 1.6 0 0 0 3 9.5Z" />
      <path d="M3 5.5h2.4M18.6 5.5H21" />
      <circle cx="7" cy="16.4" r="2.1" />
      <circle cx="17" cy="16.4" r="2.1" />
    </>
  ),
};

// Solid glyphs: brand marks and the two filled indicators.
const fillIcons = {
  'heart-fill': (
    <path d="M12 21.3 3.9 13.6A5.4 5.4 0 0 1 7.6 4.3c1.7 0 3.3.8 4.4 2.2a5.6 5.6 0 0 1 4.4-2.2 5.4 5.4 0 0 1 3.7 9.3L12 21.3Z" />
  ),
  x: <path d="M18.2 3h3.3l-7.2 8.3L22.8 21h-6.6l-5.2-6.8L5 21H1.7l7.7-8.8L1.2 3h6.8l4.7 6.2L18.2 3Zm-1.2 16h1.8L7.1 4.9H5.2L17 19Z" />,
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1a13 13 0 0 1-5.9-5.2c-.4-.7-.9-1.6-.9-2.5s.5-1.4.7-1.6c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a9 9 0 0 0 3.9 3.4c.3.1.5.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l2 1c.3.1.4.2.4.4s0 .3-.2.5Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9s.7.8.9 1.4c.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4s-.8.7-1.4.9c-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4s.8-.7 1.4-.9c.4-.1 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 3.8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 9.9a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8Zm7.6-10.1a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z" />
  ),
  snapchat: (
    <path d="M12 2.2c2.9 0 5 2 5.2 4.9 0 .7 0 1.4-.1 2 .3.2.7.2 1 .1.5-.1 1 .1 1.1.5.1.4-.1.8-.7 1-.3.1-1.3.4-1.5.9-.1.3 0 .7.5 1.4.4.7 1.4 1.8 2.7 2.2.4.1.5.4.4.7-.1.5-1 .9-2.2 1.1-.1.2-.2.5-.2.9-.1.2-.2.3-.5.3h-.4c-.5 0-1 0-1.6.2-.5.1-.9.4-1.4.8-.6.4-1.3.9-2.3.9s-1.7-.5-2.3-.9c-.5-.4-.9-.6-1.4-.8-.5-.2-1-.2-1.6-.2h-.4c-.3 0-.4-.1-.5-.3-.1-.4-.1-.7-.2-.9-1.2-.2-2.1-.6-2.2-1.1-.1-.3 0-.6.4-.7 1.3-.4 2.3-1.5 2.7-2.2.5-.7.6-1.1.5-1.4-.2-.5-1.2-.8-1.5-.9-.6-.2-.8-.6-.7-1 .1-.4.6-.6 1.1-.5.3.1.7.1 1-.1-.1-.6-.1-1.3-.1-2C7 4.2 9.1 2.2 12 2.2Z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
  ),
};

export function Icon({ name, size = 20, className = '', strokeWidth = 1.7, ...rest }) {
  const stroke = strokeIcons[name];
  const fill = fillIcons[name];
  if (!stroke && !fill) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      {...(fill
        ? { fill: 'currentColor' }
        : {
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          })}
      {...rest}
    >
      {fill ?? stroke}
    </svg>
  );
}

/**
 * Logical directional icon. `direction="forward"` is the reading direction of travel —
 * left in RTL — and `"back"` is its opposite. Callers pass the same value to the icon and
 * to the action it triggers, so an arrow can never contradict the motion it causes.
 */
export function DirectionalIcon({ direction = 'forward', name = 'chevron', size = 20, className = '', ...rest }) {
  return (
    <Icon
      name={name}
      size={size}
      className={className}
      style={{ transform: direction === 'forward' ? 'scaleX(-1)' : 'scaleX(1)' }}
      {...rest}
    />
  );
}
