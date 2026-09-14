import { Link } from 'react-router-dom';
import { CarImage } from '@/components/car/CarImage';
import { DirectionalIcon } from '@/components/common/Icon';
import { newReleases } from '@/data/mock/cars';

/**
 * "إصدارات جديدة" — the bento block.
 *
 * A tall featured card on the start (right) column and two stacked cards on the end
 * column. Below 1024px all three stack into a single column, featured first.
 */
export function NewReleases() {
  const { featured, side } = newReleases;

  return (
    <section className="sec bg-paper">
      <div className="wrap">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="relative order-1 font-display text-[34px] font-light leading-[1.2] text-charcoal sm:text-[42px] lg:text-start">
            إصدارات
            <br />
            جديدة
            <span
              aria-hidden="true"
              className="absolute -top-1 -start-4 hidden h-[7px] w-[7px] rounded-full bg-cyan lg:block"
            />
          </h2>

          <Link
            to="/cars"
            className="order-2 inline-flex items-center gap-2 text-[14px] font-medium text-cyan transition-colors duration-250 ease-tirhal hover:text-cyan-deep"
          >
            <DirectionalIcon direction="forward" name="arrow" size={16} />
            عرض الكل
          </Link>
        </header>

        <div className="grid gap-7 lg:grid-cols-[1.45fr_1fr]">
          {/* Featured */}
          <article className="overflow-hidden rounded-card border border-hairline bg-white shadow-card">
            <Link to="/cars" className="group block">
              <CarImage imageKey={featured.image} alt={featured.name} ratio="aspect-[16/9]" zoomOnHover priority />
              <div className="p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-sans text-[24px] font-bold text-charcoal ltr-run">{featured.name}</h3>
                  <span className="font-sans text-[22px] font-light text-cyan ltr-run">{featured.year}</span>
                </div>
                <p className="mt-3 text-start text-[14px] text-muted">{featured.description}</p>
              </div>
            </Link>
          </article>

          {/* Two stacked */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
            {side.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-card border border-hairline bg-white shadow-card"
              >
                <Link to="/cars" className="group block">
                  <CarImage imageKey={item.image} alt={item.name} ratio="aspect-[16/7]" zoomOnHover />
                  <div className="p-6">
                    <h3 className="text-start font-sans text-[17px] font-bold text-charcoal ltr-run">{item.name}</h3>
                    <p className="mt-2 text-start text-[13.5px] text-muted">{item.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
