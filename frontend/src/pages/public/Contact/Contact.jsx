import { useMemo } from 'react';
import { Input, Textarea, Select } from '@/components/forms/Field';
import { Button } from '@/components/buttons/Button';
import { Icon } from '@/components/common/Icon';
import { Diamond } from '@/components/common/SectionHeading';
import { Spinner } from '@/components/common/States';
import { useForm } from '@/hooks/useForm';
import { required, saudiPhone, minLength } from '@/utils/validation';
import { sendContactMessage } from '@/services/contact';
import { branchesRiyadhFirst, contactInfo, contactSubjects } from '@/data/mock/company';
import { mapImage } from '@/utils/assets';

/** Section label with the pennant tick on its start (right) edge. */
function Label({ children, as: As = 'h2', className = '' }) {
  return (
    <As className={`flex items-center justify-start gap-3 font-display text-[19px] font-bold text-charcoal ${className}`}>
      <Diamond />
      <span>{children}</span>
    </As>
  );
}

export function Contact() {
  const rules = useMemo(
    () => ({
      name: [required('أدخل اسمك'), minLength(3, 'الاسم قصير جدًا')],
      phone: [required('أدخل رقم جوالك'), saudiPhone()],
      subject: [required('اختر موضوع الرسالة')],
      message: [required('اكتب رسالتك'), minLength(10, 'اكتب 10 أحرف على الأقل')],
    }),
    [],
  );

  const form = useForm({ name: '', phone: '', subject: '', message: '' }, rules, (values) =>
    sendContactMessage(values),
  );

  return (
    <div className="sec bg-paper">
      <div className="wrap">
        <header className="text-start">
          <h1 className="font-display text-[34px] font-light text-charcoal sm:text-[42px]">تواصل معنا</h1>
          <p className="mt-3 text-[14.5px] text-muted">
            نحن هنا للإجابة على استفساراتك وتقديم الدعم اللازم. اختر الطريقة الأنسب لك للتواصل معنا.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_385px]">
          {/* Form card */}
          <section className="rounded-card border border-hairline bg-white p-7 shadow-card lg:order-1 lg:p-9">
            {form.result ? (
              <div className="flex flex-col items-start py-6 text-start">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky text-cyan">
                  <Icon name="check-circle" size={24} />
                </span>
                <h2 className="mt-5 font-display text-[21px] font-bold text-charcoal">وصلتنا رسالتك</h2>
                <p className="mt-2.5 text-[14px] text-muted">
                  رقم الرسالة <span className="font-medium text-charcoal ltr-run">{form.result.id}</span> — نرد عليك
                  خلال يوم عمل واحد.
                </p>
                <Button variant="outline" onClick={form.reset} className="mt-7">
                  أرسل رسالة أخرى
                </Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    name="name"
                    label="الاسم"
                    required
                    autoComplete="name"
                    placeholder="أدخل اسمك الكريم"
                    value={form.values.name}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.fieldError('name')}
                    containerClassName="sm:order-2"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="رقم الجوال"
                    required
                    autoComplete="tel"
                    placeholder="05X XXX XXXX"
                    value={form.values.phone}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.fieldError('phone')}
                    containerClassName="sm:order-1"
                  />
                </div>

                <Select
                  name="subject"
                  label="الموضوع"
                  required
                  placeholder="استفسار عام"
                  options={contactSubjects}
                  value={form.values.subject}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.fieldError('subject')}
                />

                <Textarea
                  name="message"
                  label="الرسالة"
                  required
                  rows={5}
                  placeholder="اكتب رسالتك هنا..."
                  value={form.values.message}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.fieldError('message')}
                />

                {form.submitError ? (
                  <p role="alert" className="rounded-[10px] bg-sky px-4 py-3 text-start text-[13px] text-cyan">
                    {form.submitError}
                  </p>
                ) : null}

                <Button type="submit" disabled={form.submitting} className="self-start px-9">
                  {form.submitting ? <Spinner size={15} /> : null}
                  {form.submitting ? 'جارٍ الإرسال…' : 'إرسال'}
                </Button>
              </form>
            )}
          </section>

          {/* Contact details card */}
          <aside className="flex flex-col rounded-card border border-hairline bg-white p-7 shadow-card lg:order-2">
            <Label>معلومات الاتصال</Label>

            <ul className="mt-8 flex flex-col gap-6">
              <li className="flex items-start justify-start gap-3.5">
                <Icon name="phone" size={19} className="mt-1 text-muted" />
                <div className="text-start">
                  <p className="text-[13px] text-muted">الهاتف الموحد</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="mt-1 block font-sans text-[19px] font-bold text-charcoal transition-colors duration-250 ease-tirhal hover:text-cyan ltr-run"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start justify-start gap-3.5">
                <Icon name="mail" size={19} className="mt-1 text-muted" />
                <div className="text-start">
                  <p className="text-[13px] text-muted">البريد الإلكتروني</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-1 block font-sans text-[15px] text-charcoal transition-colors duration-250 ease-tirhal hover:text-cyan ltr-run"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>
            </ul>

            <Button href={contactInfo.whatsapp} target="_blank" rel="noreferrer noopener" block className="mt-auto pt-0">
              <Icon name="chat" size={17} />
              تواصل عبر واتساب
            </Button>
          </aside>
        </div>

        {/* Branches */}
        <section className="mt-16">
          <Label>فروعنا</Label>

          <ul className="mt-8 flex flex-col gap-5">
            {branchesRiyadhFirst.map((branch) => (
              <li
                key={branch.id}
                className="grid overflow-hidden rounded-card border border-hairline bg-white shadow-card sm:grid-cols-[1fr_1.1fr]"
              >
                <div className="sm:order-2">
                  <img
                    src={mapImage(branch.map)}
                    alt={`خريطة موقع فرع ${branch.city}`}
                    loading="lazy"
                    className="h-[190px] w-full object-cover sm:h-full"
                  />
                </div>

                <div className="p-7 text-start sm:order-1">
                  <h3 className="flex items-center justify-start gap-2.5 font-display text-[18px] font-bold text-charcoal">
                    <Diamond />
                    {branch.contactName}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.9] text-muted">
                    {branch.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="mt-4 flex items-center justify-start gap-2 text-[12.5px] text-muted">
                    <Icon name="clock" size={14} />
                    {branch.hours}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
