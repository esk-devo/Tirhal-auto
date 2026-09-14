import { useState } from 'react';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/common/Icon';
import { SectionHeading, Eyebrow } from '@/components/common/SectionHeading';
import { BranchCard } from '@/components/cards/BranchCard';
import { branches, aboutStory, faq } from '@/data/mock/company';
import { bannerImage } from '@/utils/assets';

/** FAQ accordion — one panel open at a time, the first open on arrival. */
function Faq() {
  const [open, setOpen] = useState(faq[0].id);

  return (
    <ul className="mx-auto mt-10 flex max-w-[700px] flex-col gap-3.5">
      {faq.map((item) => {
        const expanded = open === item.id;
        return (
          <li key={item.id} className="overflow-hidden rounded-card border border-hairline bg-white">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-${item.id}`}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
              >
                <span className="font-display text-[15.5px] font-bold text-charcoal">{item.question}</span>
                <Icon
                  name="chevron"
                  size={16}
                  className={cn(
                    'shrink-0 transition-transform duration-250 ease-tirhal',
                    expanded ? 'text-cyan' : 'text-muted',
                  )}
                  style={{ transform: expanded ? 'rotate(-90deg)' : 'rotate(90deg)' }}
                />
              </button>
            </h3>

            <div id={`faq-${item.id}`} hidden={!expanded} className="px-6 pb-6">
              <p className="text-start text-[13.5px] leading-[2] text-muted">{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <img
          src={bannerImage('about-hero')}
          alt=""
          aria-hidden="true"
          className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[490px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(48,47,50,.55) 0%, rgba(48,47,50,0) 55%)' }}
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="wrap pb-10 text-start text-white lg:pb-14">
            <h1 className="font-display text-[34px] font-light tracking-[.06em] sm:text-[46px]">طريق بلا حدود.</h1>
            <p className="mt-4 max-w-[620px] text-[13.5px] leading-[2] text-white/85">
              في ترحال أوتو، نحن لا نبيع سيارات فحسب، بل نرسم مسارات. نؤمن بأن الطريق المفتوح يمثل الحرية المطلقة
              والفرص اللامحدودة. استلهمنا هويتنا من اتساع الأفق، لتقديم تجربة اقتناء سيارات ترتقي لمستوى تطلعاتك.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="sec bg-white">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-1">
            <img
              src={bannerImage('about-interior')}
              alt="مقصورة القيادة في إحدى سيارات ترحال"
              loading="lazy"
              className="w-full rounded-card object-cover"
            />
          </div>

          <div className="lg:order-2 lg:text-start">
            <Eyebrow withTick={false}>{aboutStory.eyebrow}</Eyebrow>

            <h2 className="mt-5 font-display text-[30px] font-light leading-[1.4] text-charcoal sm:text-[36px]">
              {aboutStory.titleLead}
              <br />
              {aboutStory.titleRest} <span className="text-cyan">{aboutStory.titleAccent}</span>
            </h2>

            <div className="mt-6 flex flex-col gap-2.5 text-[13.5px] leading-[2.1] text-muted">
              {aboutStory.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="sec bg-sky">
        <div className="wrap">
          <SectionHeading
            align="center"
            title="نقاط الالتقاء"
            description="اكتشف فروعنا المصممة لتكون محطات انطلاق نحو رحلتك القادمة."
          />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec bg-paper">
        <div className="wrap">
          <SectionHeading align="center" eyebrow="الأسئلة الشائعة" title="استفسارات الرحلة" />
          <Faq />
        </div>
      </section>
    </>
  );
}
