import { SectionHeading } from '@/components/common/SectionHeading';
import { whyPoints } from '@/data/mock/company';
import { decorImage } from '@/utils/assets';

/**
 * "ليش ترحال؟" — six callouts arranged around the top-down car illustration.
 *
 * Each column's marker faces inward, toward the artwork, and a hairline leader runs from
 * it to the centre. The top and bottom rows angle their leader lines inward toward the
 * car (matching the Figma comp), while the middle row stays flat. Below 1024px the artwork
 * moves to the top and the callouts become a plain stacked list, because leader lines drawn
 * to an off-axis image read as noise.
 */

// Degrees the top/bottom leader lines tilt toward the artwork. Middle row stays at 0.
const LEADER_TILT_DEG = 13;

function Point({ point, side, rowTilt }) {
  // The marker and its leader always face the artwork, so the end column reverses the row.
  const onStartSide = side === 'start';

  // Bright end of the line is pinned next to the dot; the faded end swings toward the
  // artwork. Sign flips between columns because the "near" edge sits on opposite sides.
  const rotation = (onStartSide ? 1 : -1) * rowTilt * LEADER_TILT_DEG;

  return (
    <li className={onStartSide ? 'lg:text-start' : 'lg:text-end'}>
      <div className={`flex items-center gap-2.5 ${onStartSide ? '' : 'lg:flex-row-reverse'}`}>
        <h3 className="font-display text-[15px] font-bold text-charcoal">{point.title}</h3>
        <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-cyan" />
        <span
          aria-hidden="true"
          className={`hidden h-px flex-1 lg:block ${onStartSide ? 'origin-right' : 'origin-left'} ${
            onStartSide ? 'bg-gradient-to-l from-cyan/35 to-transparent' : 'bg-gradient-to-r from-cyan/35 to-transparent'
          }`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      {point.body ? <p className="mt-2 text-[12.5px] leading-[1.9] text-muted">{point.body}</p> : null}
    </li>
  );
}

// Position of a row relative to the vertically-centred artwork: top row tilts its far
// end down toward the car, bottom row tilts its far end up, middle row stays flat.
function tiltForIndex(index, length) {
  if (index === 0) return -1;
  if (index === length - 1) return 1;
  return 0;
}

export function WhyTirhal() {
  return (
    <section className="sec bg-paper">
      <div className="wrap">
        <SectionHeading
          align="center"
          weight="bold"
          eyebrow="مميزاتنا"
          title={
            <>
              ليش <span className="text-cyan">ترحال</span>؟
            </>
          }
          description="نلتزم بتقديم تجربة استثنائية من لحظة الاختيار وحتى ما بعد البيع."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Start column — the right, in RTL. */}
          <ul className="order-2 flex flex-col gap-20 lg:order-1">
            {whyPoints.start.map((point, i) => (
              <Point
                key={point.id}
                point={point}
                side="start"
                rowTilt={tiltForIndex(i, whyPoints.start.length)}
              />
            ))}
          </ul>

          <div className="order-1 flex justify-center lg:order-2">
            <img
              src={decorImage('why-car-topdown')}
              alt=""
              aria-hidden="true"
              className="h-auto w-[170px] max-w-full select-none lg:w-[202px]"
            />
          </div>

          {/* End column — the left, in RTL. */}
          <ul className="order-3 flex flex-col gap-20">
            {whyPoints.end.map((point, i) => (
              <Point
                key={point.id}
                point={point}
                side="end"
                rowTilt={tiltForIndex(i, whyPoints.end.length)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}