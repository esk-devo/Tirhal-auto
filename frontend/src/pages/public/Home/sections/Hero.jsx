import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/buttons/Button';
import { brands } from '@/data/mock/brands';
import { heroTabs, heroStats } from '@/data/mock/company';
import { bannerImage } from '@/utils/assets';

/**
 * Hero.
 *
 * A charcoal band with the headline stacked on the start (right) edge, the cut-out car
 * bleeding off the end (left) edge over a soft cyan glow, the three figures beneath the
 * headline, and the white search panel overlapping the car on the end side.
 *
 * Type is set to the Figma values at the large breakpoint — 96px / 120px line-height /
 * -1.92px tracking — and steps down below it. The tracking is written in em (-0.02em)
 * so the ratio holds at every step instead of only at 96px.
 *
 * `me-auto` holds the copy against the start edge and `ms-auto` pushes the panel to the
 * end edge — logical margins, so the whole composition mirrors with the document rather
 * than being pinned to physical sides.
 *
 * Below 1024px the car drops out rather than being squashed and the panel goes full
 * width; it stays the first thing under the headline, never behind a toggle.
 */
export function Hero() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (tab !== 'all') params.set('types', tab);
    if (brand) params.set('brands', brand);
    if (model.trim()) params.set('q', model.trim());
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
            {/*
        Cyan glow — #17A3F4 at 10%, centred in the band and faded to nothing, so it reads
        as ambient light behind the composition rather than a shape of its own.
        `inset-0 m-auto` centres it on both axes without a transform.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto hidden h-[620px] w-[900px] lg:block"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(23,163,244,0.10) 0%, rgba(23,163,244,0.05) 45%, rgba(23,163,244,0) 100%)',
        }}
      />

      <div className="wrap pb-14 pt-14 lg:pb-[72px] lg:pt-[88px]">
        <div className="relative me-auto max-w-[54%] text-start sm:max-w-[56%] lg:max-w-[560px]">
          <h1
            className={cn(
              'font-display font-black',
              'text-[38px] leading-[1.18] tracking-[-0.02em]',
              'sm:text-[58px] sm:leading-[1.2]',
              'lg:text-[90px] lg:leading-[120px]',
            )}
          >
            وجهتك
            <br />
            <span className="text-cyan">الأولى</span>
            <br />
            للسيارات
          </h1>

          <p className="mt-6 text-[14.5px] leading-[1.9] text-white/60 lg:mt-7">
            خيارات متعددة، أسعار تنافسية، وتمويل ميسر. انطلق بثقة مع ترحال للسيارات.
          </p>
        </div>

        {/*
          Car artwork — decorative.

          Pinned to the end (left) edge at every size, flush to the viewport with no
          gutter, sitting alongside the right-aligned copy. The section is the positioned
          ancestor — the container above is deliberately static — so `end-0` reaches the
          viewport edge rather than the container's.

          The wrapper carries the arrival drift and the image the slow float, so the two
          transforms compose rather than overwrite one another; both are switched off by
          the prefers-reduced-motion rule in index.css.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[70px] end-0 h-[150px] max-w-[46%] animate-car-in sm:top-[104px] sm:h-[240px] lg:top-[150px] lg:h-[450px] lg:max-w-[60%]"
        >
          <img
            src={bannerImage('hero-car')}
            alt=""
            width={1136}
            height={1036}
            className="h-full w-auto max-w-full animate-car-float select-none object-contain object-bottom"
          />
        </div>

        {/*
          Bottom row — the figures hold the start (right) edge and the search panel the
          end edge. 68px separates the row from the headline block, and `items-center`
          lines the figures up with the middle of the panel beside them.

          Below 1024px the row stacks: figures first, then the panel.
        */}
        <div className="mt-10 flex flex-col gap-10 lg:mt-[68px] lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <dl className="flex flex-wrap gap-x-11 gap-y-6 lg:shrink-0">
            {heroStats.map((stat) => (
              <div key={stat.id} className="flex flex-col lg:items-start">
                <dd
                  className={cn(
                    'font-sans text-[34px] font-light leading-none ltr-run',
                    stat.accent ? 'text-cyan' : 'text-white',
                  )}
                >
                  {stat.value}
                </dd>
                <dt className="mt-2 text-[12.5px] text-white/50">{stat.label}</dt>
              </div>
            ))}
          </dl>

          {/* Search panel — sits on the end edge, over the car, as the design places it. */}
          <form
            onSubmit={onSubmit}
            role="search"
            aria-label="البحث عن سيارة"
            className="relative w-full rounded-[8px] bg-white p-4 shadow-lift sm:p-5 lg:w-[800px]"
          >
            <div
              role="tablist"
              aria-label="نوع المركبة"
              className="mb-5 flex items-center justify-start gap-7 overflow-x-auto border-b border-hairline no-scrollbar"
            >
              {heroTabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    'relative shrink-0 pb-3 text-[14px] transition-colors duration-250 ease-tirhal',
                    tab === item.id ? 'font-medium text-cyan' : 'text-muted hover:text-charcoal',
                  )}
                >
                  {item.label}
                  {tab === item.id ? (
                    <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-cyan" />
                  ) : null}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <div className="relative sm:order-1">
                <label htmlFor="hero-brand" className="sr-only">
                  الماركة
                </label>
                <select
                  id="hero-brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  className="h-12 w-full appearance-none rounded-[8px] bg-paper px-4 pe-10 text-start text-[14px] text-charcoal outline-none transition-colors duration-250 ease-tirhal focus:ring-1 focus:ring-cyan"
                >
                  <option value="">جميع الماركات</option>
                  {brands.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.latin}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 end-3.5 flex items-center text-muted">
                  <Icon name="chevron" size={16} style={{ transform: 'rotate(90deg)' }} />
                </span>
              </div>

              <div className="relative sm:order-2">
                <label htmlFor="hero-model" className="sr-only">
                  الموديل
                </label>
                <input
                  id="hero-model"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  placeholder="الموديل"
                  className="h-12 w-full rounded-[8px] bg-paper px-4 pe-10 text-start text-[14px] text-charcoal outline-none transition-colors duration-250 ease-tirhal placeholder:text-muted focus:ring-1 focus:ring-cyan"
                />
                <span className="pointer-events-none absolute inset-y-0 end-3.5 flex items-center text-muted">
                  <Icon name="chevron" size={16} style={{ transform: 'rotate(90deg)' }} />
                </span>
              </div>

              <Button type="submit" radius="md" className="h-12 sm:order-3 sm:w-[160px]">
                <Icon name="search" size={17} />
                بحث
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}