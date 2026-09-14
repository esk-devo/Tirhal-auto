import { useMemo, useState } from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/buttons/Button';
import { RangeInput } from '@/components/forms/Field';
import { financing } from '@/data/mock/taxonomy';
import { estimateMonthly, formatSar } from '@/utils/format';

/**
 * "حاسبة التمويل" — the down-payment and term controls on the start (right) side and the
 * estimated instalment on the end side, on a pale blue panel.
 *
 * The figure recalculates live; the disclaimer under the button says it is indicative,
 * because the real number depends on the financier's approval.
 */
export function FinanceCalculator({ car }) {
  const maxDown = Math.round(car.price * 0.5);
  const [downPayment, setDownPayment] = useState(Math.round(car.price * financing.downPaymentRate));
  const [term, setTerm] = useState(financing.defaultTerm);

  const monthly = useMemo(
    () => estimateMonthly(car.price, { months: term, downPayment, apr: financing.apr }),
    [car.price, term, downPayment],
  );

  return (
    <section
      className="rounded-card border border-cyan/15 p-8 lg:p-10"
      style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #EFF7FE 100%)' }}
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="lg:order-1">
          <h3 className="text-start font-display text-[22px] font-bold text-charcoal">حاسبة التمويل</h3>
          <p className="mt-2 text-start text-[13.5px] text-muted">خصص شروطك لتناسب رحلتك.</p>

          <RangeInput
            className="mt-8"
            label="الدفعة الأولى"
            valueLabel={formatSar(downPayment)}
            min={0}
            max={maxDown}
            step={1000}
            value={downPayment}
            onChange={(event) => setDownPayment(Number(event.target.value))}
          />

          <div className="mt-8">
            <p id="finance-term" className="mb-3 text-start text-[13px] text-muted">
              مدة التقسيط
            </p>
            <div role="group" aria-labelledby="finance-term" className="flex justify-start gap-3">
              {financing.terms.map((months) => (
                <button
                  key={months}
                  type="button"
                  aria-pressed={term === months}
                  onClick={() => setTerm(months)}
                  className={cn(
                    'h-11 min-w-[92px] rounded-[10px] border text-[13.5px] transition-[background-color,border-color,color] duration-250 ease-tirhal',
                    term === months
                      ? 'border-cyan bg-white font-medium text-cyan'
                      : 'border-hairline bg-white text-muted hover:border-cyan/50',
                  )}
                >
                  <span className="ltr-run">{months}</span> شهر
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-card bg-white/85 p-7 text-center lg:order-2">
          <p className="text-[13.5px] font-medium text-cyan">القسط الشهري المقدر</p>
          <p className="mt-3 font-sans text-[38px] font-light leading-none text-charcoal ltr-run">
            <span className="text-[22px] text-muted">SAR</span> {formatSar(monthly).replace('SAR ', '')}
          </p>

          <Button
            to="/reservation"
            size="md"
            block
            className="mt-7 border-0 shadow-none"
            style={{ background: 'linear-gradient(90deg, #0C6FA8 0%, #17A3F4 100%)' }}
          >
            قدم طلب تمويل
          </Button>

          <p className="mt-4 text-[11.5px] leading-[1.7] text-muted">
            الضرائب والرسوم غير مشمولة. خاضع لموافقة الائتمان.
          </p>
        </div>
      </div>
    </section>
  );
}
