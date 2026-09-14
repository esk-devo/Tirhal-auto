import { cn } from '@/utils/cn';
import { Logo } from '@/components/common/Logo';
import { Diamond } from '@/components/common/SectionHeading';
import { bannerImage } from '@/utils/assets';

/**
 * Shared frame for Sign in / Sign up.
 *
 * The design mirrors the two screens: the artwork panel sits on the start (right) edge for
 * sign-in and the end edge for sign-up, so `side` says which. Below 1024px the panel is
 * dropped rather than squashed and the card takes the full width.
 */
export function AuthLayout({ side = 'start', title, description, children, footer, caption }) {
  return (
    <div className="grid min-h-[calc(100vh-76px)] bg-paper lg:min-h-[calc(100vh-90px)] lg:grid-cols-2">
      {/* Artwork panel */}
      <aside
        className={cn(
          'relative hidden overflow-hidden bg-[#0B49A8] lg:block',
          side === 'start' ? 'lg:order-1' : 'lg:order-2',
        )}
      >
        <img
          src={bannerImage('auth-visual')}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,38,90,.85) 0%, rgba(6,38,90,0) 45%)' }}
        />

        <div className={cn('absolute top-10 flex', side === 'start' ? 'start-10' : 'end-10')}>
          <Logo size={64} />
        </div>

        {caption ? (
          <div className="absolute inset-x-10 bottom-10 text-start text-white">
            <p className="flex items-center justify-start gap-2.5 text-[13.5px] font-bold">
              <Diamond />
              {caption.eyebrow}
            </p>
            <p className="mt-2.5 font-display text-[21px] font-bold leading-[1.6]">{caption.title}</p>
            {caption.body ? <p className="mt-2 text-[13px] text-white/70">{caption.body}</p> : null}
          </div>
        ) : null}
      </aside>

      {/* Form panel */}
      <main
        className={cn(
          'flex items-center justify-center px-6 py-14 lg:py-20',
          side === 'start' ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        <div className="w-full max-w-[480px] rounded-panel bg-white p-8 shadow-card sm:p-11">
          {title || description ? (
            <header className="text-center">
              {title ? <h1 className="font-display text-[30px] font-black text-charcoal">{title}</h1> : null}
              {description ? <p className="mt-2 text-[13.5px] text-muted">{description}</p> : null}
            </header>
          ) : null}

          <div className={title || description ? 'mt-9' : ''}>{children}</div>

          {footer ? <div className="mt-8 text-center text-[13.5px] text-muted">{footer}</div> : null}
        </div>
      </main>
    </div>
  );
}
