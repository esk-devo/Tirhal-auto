import { Icon } from '@/components/common/Icon';
import { detailStrip, techGroups } from '@/data/mock/taxonomy';

/** The five-item strip under the gallery: icon, value, label — right to left. */
export function SpecStrip({ car }) {
  return (
    <ul className="grid grid-cols-2 gap-y-7 border-y border-hairline py-7 sm:grid-cols-3 lg:grid-cols-5">
      {detailStrip.map((item) => (
        <li key={item.key} className="flex flex-col items-center gap-2 text-center">
          <Icon name={item.icon} size={22} className="text-muted" />
          <span className="font-sans text-[16px] font-medium text-charcoal ltr-run">{car.specs[item.key]}</span>
          <span className="text-[12.5px] text-muted">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** "المواصفات التقنية" — two labelled groups of label/value rows. */
export function TechSpecs({ car }) {
  return (
    <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2">
      {techGroups.map((group) => (
        <section key={group.id}>
          <h3 className="border-b border-hairline pb-2.5 text-start text-[13px] font-semibold tracking-[.24em] text-cyan">
            {group.title}
          </h3>
          <dl>
            {group.rows.map((row) => (
              <div key={row.key} className="flex items-center justify-between gap-4 border-b border-hairline py-3.5">
                <dt className="text-[13.5px] text-muted">{row.label}</dt>
                <dd className="font-sans text-[14px] text-charcoal ltr-run">{car.specs[row.key] ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

/** "المميزات الأساسية" — a pale card of check-marked features in three columns. */
export function CarFeatures({ features = [] }) {
  if (features.length === 0) return null;

  return (
    <section className="rounded-card bg-paper p-8 lg:p-10">
      <h3 className="text-start font-display text-[22px] font-bold text-charcoal">المميزات الأساسية</h3>
      <ul className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center justify-start gap-2.5 text-[14px] text-charcoal">
            <span>{feature}</span>
            <Icon name="check-circle" size={19} className="text-cyan" />
          </li>
        ))}
      </ul>
    </section>
  );
}
