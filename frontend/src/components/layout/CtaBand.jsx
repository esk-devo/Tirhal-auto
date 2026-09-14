import { Button } from '@/components/buttons/Button';

/**
 * The closing CTA band: a cyan gradient panel with centred copy and a near-black pill.
 * The gradient runs left to right physically, so it is written with a physical direction
 * rather than a logical one and does not flip with the document.
 */
export function CtaBand({
  title = 'هل أنت مستعد لبدء رحلتك؟',
  body = 'تواصل مع فريق المبيعات اليوم لاختيار سيارتك القادمة بأفضل الأسعار وأسهل الطرق',
  action = { label: 'تواصل معنا الآن', to: '/contact' },
  className = 'bg-paper',
}) {
  return (
    <section className={`pb-16 lg:pb-[88px] ${className}`}>
      <div className="wrap">
        <div
          className="rounded-panel px-7 py-14 text-center text-white sm:px-12 lg:py-[70px]"
          style={{ background: 'linear-gradient(90deg, #0F79B7 0%, #17A3F4 100%)' }}
        >
          <h2 className="mx-auto max-w-[640px] font-display text-[28px] font-light leading-[1.35] sm:text-[36px]">
            {title}
          </h2>
          {body ? <p className="mx-auto mt-5 max-w-[620px] text-[14.5px] text-white/85">{body}</p> : null}

          <Button to={action.to} variant="dark" size="lg" className="mt-9">
            {action.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
