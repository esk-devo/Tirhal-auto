import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Icon } from '@/components/common/Icon';
import { footerLinks } from '@/components/navigation/navItems';
import { branches, contactInfo } from '@/data/mock/company';

/**
 * Footer, reproduced from the Figma.
 *
 * Four columns on a charcoal ground, read right to left: the brand lockup with its
 * tagline and social row, "روابط سريعة", "فروعنا", "تواصل". A hairline then separates the
 * copyright row from the two legal links on the end edge.
 */
function Column({ title, children }) {
  return (
    <div>
      <h3 className="mb-6 font-display text-[16px] font-bold text-white">{title}</h3>
      {children}
    </div>
  );
}

/** Circular outlined icon used by the branch and social rows. */
function IconCircle({ name, size = 34 }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/25 text-white/75 transition-colors duration-250 ease-tirhal group-hover:border-cyan group-hover:text-cyan"
    >
      <Icon name={name} size={size * 0.45} />
    </span>
  );
}

const rowClass =
  'group flex items-center justify-start gap-3 text-[14px] text-white/65 transition-colors duration-250 ease-tirhal hover:text-white';

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="wrap pt-16 lg:pt-[72px]">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start lg:items-start lg:text-start">
            <Logo variant="lockup" tone="white" size={52} />

            <p className="mt-6 max-w-[300px] text-[14px] leading-[1.9] text-white/55">
              الهدوء المتزن الذي ينبع من الثقة. نتحرك معك نحو المستقبل بخطوات واثقة.
            </p>

            <ul className="mt-7 flex items-center gap-3">
              {contactInfo.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    title={social.label}
                    className="group inline-flex"
                  >
                    <IconCircle name={social.icon} size={36} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <Column title="روابط سريعة">
            <ul className="flex flex-col gap-4">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-start gap-3 text-[14px] text-white/65 transition-colors duration-250 ease-tirhal hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[6px] w-[6px] shrink-0 rotate-45 bg-white/45"
                      style={{ borderRadius: '1px 1px 1px 0' }}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          {/* Branches */}
          <Column title="فروعنا">
            <ul className="flex flex-col gap-3">
              {branches.map((branch) => (
                <li key={branch.id}>
                  <Link to="/contact" className={rowClass}>
                    <IconCircle name="pin" />
                    <span>{branch.city}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          {/* Contact */}
          <Column title="تواصل">
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`tel:${contactInfo.phone}`} className={rowClass}>
                  <IconCircle name="phone" />
                  <span className="ltr-run">{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className={rowClass}>
                  <IconCircle name="mail" />
                  <span className="ltr-run">{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer noopener" className={rowClass}>
                  <IconCircle name="chat" />
                  <span>واتساب</span>
                </a>
              </li>
            </ul>
          </Column>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 py-7 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="ltr-run">{new Date().getFullYear()}</span> ترحال للسيارات. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/about" className="transition-colors duration-250 ease-tirhal hover:text-white">
              الشروط والأحكام
            </Link>
            <Link to="/about" className="transition-colors duration-250 ease-tirhal hover:text-white">
              سياسة الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
