import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import markCyan from '@/assets/logos/tirhal-mark-cyan.png';
import markWhite from '@/assets/logos/tirhal-mark-white.png';

/** s in material in share to a lot you shall show me as I may start high market him to artifact into a share down draftmassive
 * The official Tirhal Auto mark, used as supplied — cropped to its own bounds and
 * recoloured to white for dark surfaces, never redrawn.
 *
 * Figma uses two lockups: the bare cyan mark in the header, and the white mark with the
 * stacked Arabic wordmark beside it in the footer. In RTL the mark is the first child,
 * so it sits on the start (right) edge exactly as the design shows.
 */
export function Logo({ variant = 'mark', tone = 'cyan', size = 48, className = '' }) {
  const src = tone === 'white' ? markWhite : markCyan;

  return (
    <Link
      to="/"
      aria-label="ترحال للسيارات — الصفحة الرئيسية"
      className={cn('inline-flex items-center gap-3.5', className)}
    >
      <img src={src} alt="" width={size} height={size} style={{ width: size, height: size }} className="shrink-0" />

      {variant === 'lockup' ? (
        <span
          className="flex flex-col items-start font-display font-bold leading-[1.12] text-white"
          style={{ fontSize: Math.round(size * 0.62) }}
        >
          <span>ترحال</span>
          <span>للسيارات</span>
        </span>
      ) : null}
    </Link>
  );
}
