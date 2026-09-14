import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon, DirectionalIcon } from '@/components/common/Icon';
import { Button } from '@/components/buttons/Button';
import { Input, Select, RadioGroup, RangeInput } from '@/components/forms/Field';
import { CarImage } from '@/components/car/CarImage';
import { Spinner } from '@/components/common/States';
import { useForm } from '@/hooks/useForm';
import { useAsync } from '@/hooks/useAsync';
import { required, saudiPhone, minLength } from '@/utils/validation';
import { createReservation } from '@/services/reservations';
import { listCars, getCarById } from '@/services/cars';
import { branchesRiyadhFirst, contactTimes, customerTypes, paymentMethods } from '@/data/mock/company';
import { financing } from '@/data/mock/taxonomy';
import { formatSar, percent } from '@/utils/format';

/** Section heading inside the form card — cyan, right-aligned, as the design draws it. */
function FormSection({ title, children, className = '' }) {
  return (
    <section className={className}>
      <h2 className="mb-6 text-start font-display text-[19px] font-bold text-cyan-deep">{title}</h2>
      {children}
    </section>
  );
}

/** Selectable branch tile: cyan border and a check on the end corner when chosen. */
function BranchTile({ branch, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(branch.id)}
      aria-pressed={selected}
      className={cn(
        'relative flex h-full flex-col justify-start overflow-hidden rounded-[14px] border p-5 text-start',
        'transition-[background-color,border-color] duration-250 ease-tirhal',
        selected ? 'border-cyan bg-sky' : 'border-hairline bg-white hover:border-cyan/50',
      )}
    >
      {selected ? (
        <Icon name="check-circle" size={20} className="absolute end-4 top-4 text-cyan-deep" strokeWidth={2} />
      ) : null}

      <Icon name="pin" size={26} className="absolute bottom-3 end-3 text-charcoal/[.06]" />

      <span className="font-display text-[15px] font-bold text-charcoal">{branch.shortName}</span>
      <span className="mt-1.5 text-[12.5px] leading-[1.7] text-muted">{branch.checkoutAddress}</span>
    </button>
  );
}

/** Payment method tile. */
function PaymentTile({ method, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      aria-pressed={selected}
      className={cn(
        'flex h-[76px] flex-col items-center justify-center gap-2 rounded-[12px] border text-[13.5px]',
        'transition-[background-color,border-color,color] duration-250 ease-tirhal',
        selected ? 'border-cyan bg-sky text-charcoal' : 'border-hairline bg-white text-muted hover:border-cyan/50',
      )}
    >
      <Icon name={method.icon} size={20} className={selected ? 'text-cyan' : 'text-muted'} />
      {method.label}
    </button>
  );
}

export function Reservation() {
  const [searchParams] = useSearchParams();
  const selectedCarId = searchParams.get('car');

  const { data: fallback } = useAsync(useCallback(() => listCars({ sort: 'newest' }), []), [], {
    initialData: { items: [] },
  });
  const { data: chosen } = useAsync(
    useCallback(() => (selectedCarId ? getCarById(selectedCarId) : Promise.resolve(null)), [selectedCarId]),
    [selectedCarId],
  );

  const car = chosen ?? fallback?.items?.find((item) => item.id === 'lexus-es-uv') ?? fallback?.items?.[0] ?? null;

  const [branchId, setBranchId] = useState(branchesRiyadhFirst[0].id);
  const [payment, setPayment] = useState('financing');
  const [customerType, setCustomerType] = useState('individual');
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState(60);

  const price = car?.price ?? 0;
  const maxDown = Math.round(price * 0.5);
  const down = downPayment || Math.round(price * financing.downPaymentRate);

  const rules = useMemo(
    () => ({
      name: [required('أدخل اسمك الكامل'), minLength(3, 'الاسم قصير جدًا')],
      phone: [required('أدخل رقم جوالك'), saudiPhone()],
    }),
    [],
  );

  const form = useForm({ name: '', phone: '', contactTime: 'morning' }, rules, (values) =>
    createReservation({
      ...values,
      carId: car?.id,
      branchId,
      payment,
      customerType,
      downPayment: payment === 'financing' ? down : null,
      term: payment === 'financing' ? term : null,
    }),
  );

  return (
    <div className="bg-sky py-14 lg:py-[72px]">
      <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        {/* Summary */}
        <aside className="lg:order-1">
          <div className="relative mb-8">
            <Icon
              name="pin"
              size={90}
              strokeWidth={1}
              className="absolute -top-6 start-6 text-cyan/10"
              aria-hidden="true"
            />
            <h1 className="relative text-start font-display text-[34px] font-light text-cyan-deep sm:text-[40px]">
              إتمام الطلب
            </h1>
          </div>

          {car ? (
            <article className="overflow-hidden rounded-card bg-white shadow-card">
              <CarImage imageKey={car.image} alt={car.name} ratio="aspect-[16/9]" priority />
              <div className="flex items-start justify-between gap-5 p-6">
                <div className="text-start">
                  <h2 className="font-display text-[20px] font-bold leading-[1.4] text-cyan-deep">
                    <span className="ltr-run">{car.year}</span> {car.name}
                  </h2>
                  {car.edition ? <p className="mt-1 text-[12.5px] text-muted ltr-run">{car.edition}</p> : null}
                </div>

                <div className="text-start">
                  <p className="text-[11.5px] text-muted">السعر الإجمالي</p>
                  <p className="mt-1 font-sans text-[24px] font-light leading-[1.25] text-cyan">
                    <span className="block text-[18px]">SAR</span>
                    <span className="ltr-run">{formatSar(car.price).replace('SAR ', '')}</span>
                  </p>
                </div>
              </div>
            </article>
          ) : null}
        </aside>

        {/* Form */}
        <div className="lg:order-2">
          {form.result ? (
            <div className="rounded-card border-s-2 border-cyan bg-white p-8 text-start shadow-card lg:p-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky text-cyan">
                <Icon name="check-circle" size={24} />
              </span>
              <h2 className="mt-5 font-display text-[22px] font-bold text-charcoal">استلمنا طلبك</h2>
              <p className="mt-2.5 text-[14px] text-muted">
                رقم الطلب <span className="font-medium text-charcoal ltr-run">{form.result.id}</span> — سيتواصل معك أحد
                مستشارينا خلال ساعتي عمل.
              </p>
              <Button to="/cars" className="mt-7">
                تصفّح سيارات أخرى
              </Button>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit}
              noValidate
              className="rounded-card border-s-2 border-cyan bg-white p-7 shadow-card lg:p-9"
            >
              <FormSection title="بيانات التواصل">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    name="name"
                    variant="underline"
                    label="الاسم الكامل"
                    required
                    autoComplete="name"
                    placeholder="أدخل اسمك الكريم"
                    value={form.values.name}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.fieldError('name')}
                    containerClassName="sm:order-1"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    variant="underline"
                    label="رقم الجوال"
                    required
                    autoComplete="tel"
                    placeholder="+966 5X XXX XXXX"
                    value={form.values.phone}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.fieldError('phone')}
                    containerClassName="sm:order-2"
                  />

                  <Select
                    name="contactTime"
                    variant="underline"
                    label="وقت التواصل المفضل"
                    options={contactTimes}
                    value={form.values.contactTime}
                    onChange={form.handleChange}
                    containerClassName="sm:order-3"
                  />
                  <RadioGroup
                    name="customerType"
                    options={customerTypes}
                    value={customerType}
                    onChange={setCustomerType}
                    className="self-start sm:order-4"
                  />
                </div>
              </FormSection>

              <FormSection title="الفرع المفضل" className="mt-9 border-t border-hairline pt-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {branchesRiyadhFirst.map((branch) => (
                    <BranchTile
                      key={branch.id}
                      branch={branch}
                      selected={branchId === branch.id}
                      onSelect={setBranchId}
                    />
                  ))}
                </div>
              </FormSection>

              <FormSection title="طريقة الدفع المفضلة" className="mt-9 border-t border-hairline pt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {paymentMethods.map((method) => (
                    <PaymentTile
                      key={method.id}
                      method={method}
                      selected={payment === method.id}
                      onSelect={setPayment}
                    />
                  ))}
                </div>

                {payment === 'financing' ? (
                  <div className="mt-8 flex flex-col gap-7">
                    <RangeInput
                      label="الدفعة الأولى"
                      valueLabel={`${formatSar(down)} (${percent(down, price)}%)`}
                      min={0}
                      max={maxDown}
                      step={1000}
                      value={down}
                      onChange={(event) => setDownPayment(Number(event.target.value))}
                    />
                    <RangeInput
                      label="مدة التمويل"
                      valueLabel={`${term} Months`}
                      min={12}
                      max={72}
                      step={12}
                      value={term}
                      onChange={(event) => setTerm(Number(event.target.value))}
                    />
                  </div>
                ) : null}
              </FormSection>

              {form.submitError ? (
                <p role="alert" className="mt-6 rounded-[10px] bg-sky px-4 py-3 text-start text-[13px] text-cyan">
                  {form.submitError}
                </p>
              ) : null}

              <Button
                type="submit"
                size="lg"
                block
                disabled={form.submitting}
                className="mt-9 border-0 shadow-none"
                style={{ background: 'linear-gradient(90deg, #0C6FA8 0%, #1A8FD1 100%)' }}
              >
                {form.submitting ? <Spinner size={16} /> : null}
                {form.submitting ? 'جارٍ الإرسال…' : 'إرسال الطلب'}
                {form.submitting ? null : <DirectionalIcon direction="forward" name="arrow" size={17} />}
              </Button>

              <p className="mt-4 flex items-center justify-center gap-2 text-[12.5px] text-muted">
                سيتواصل معك أحد مستشارينا خلال ساعتي عمل.
                <Icon name="clock" size={14} />
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
