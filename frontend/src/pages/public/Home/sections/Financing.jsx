import { Eyebrow } from "@/components/common/SectionHeading";
import { Diamond } from "@/components/common/SectionHeading";
import { financingHighlights, financingPartners } from "@/data/mock/company";

/**
 * "حلول التمويل" — a dark band with the copy on the start (right) side and two offset
 * stat cards on the end side.
 *
 * The cards overlap deliberately in the design; below 1024px they sit side by side
 * instead, since an overlap at that width just clips them.
 */
export function Financing() {
  const [flat, blue] = financingHighlights;

  return (
    <section className="relative overflow-hidden bg-charcoal py-16 text-white lg:py-[104px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(23, 163, 244, 0.10) 0%, rgba(23, 163, 244, 0.10) 42%, rgba(48, 47, 50, 0) 68%)",
        }}
      />

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
        <div className="lg:order-1 lg:text-start">
          <p className="flex items-center gap-3.5 text-[17px] font-medium text-white/85 lg:justify-start">
            <Diamond size="lg" />
            <span>حلول التمويل</span>
          </p>

          <h2 className="mt-5 font-display text-[32px] font-extrabold leading-[1.3] sm:text-[40px]">
            امتلك سيارتك
            <br />
            <span className="text-cyan">بسهولة ومرونة.</span>
          </h2>

          <p className="mt-6 text-[15px] leading-[1.95] text-white/60 lg:ms-auto lg:max-w-[520px]">
            شراكاتنا الاستراتيجية مع أبرز البنوك وجهات التمويل تضمن لك الحصول
            على أفضل العروض والنسب التي تناسب ميزانيتك.
          </p>

          <ul className="mt-9 flex flex-wrap gap-4 lg:justify-start">
            {financingPartners.map((partner) => (
              <li
                key={partner.id}
                className="flex h-[52px] w-[150px] items-center justify-center rounded-[10px] bg-white/[.07] text-[13px] font-medium tracking-[.12em] text-white/70"
              >
                {partner.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-center gap-5 lg:order-2 lg:block lg:h-[420px]">
          <div className="w-1/2 rounded-[26px] bg-[#141316]/[0.3] p-1 text-center lg:absolute lg:start-[14%] lg:top-0 lg:w-[285px] lg:p-10">
            <p className="font-sans text-[42px] font-light leading-none text-cyan ltr-run">
              {flat.value}
            </p>
            <p className="mt-4 font-display text-[15px] font-bold text-white">
              {flat.title}
            </p>
            <p className="mt-1.5 text-[12.5px] text-white/45">{flat.body}</p>
          </div>

          <div
            className="w-1/2 rounded-[26px] px-7 py-9 text-center shadow-panel lg:absolute lg:end-[8%] lg:top-[160px] lg:w-[285px] lg:px-8 lg:py-14"
            style={{
  background:
    'radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0) 42%), linear-gradient(150deg, #1E4E70 0%, #14384F 100%)',
}}
          >
            <p className="font-sans text-[42px] font-light leading-none text-white ltr-run">
              {blue.value}
            </p>
            <p className="mt-4 font-display text-[15px] font-bold text-white">
              {blue.title}
            </p>
            <p className="mt-1.5 text-[12.5px] text-white/50">{blue.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
