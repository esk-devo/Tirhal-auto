import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { AuthLayout } from '@/pages/public/Auth/AuthLayout';
import { Input, PasswordInput } from '@/components/forms/Field';
import { Button } from '@/components/buttons/Button';
import { Icon } from '@/components/common/Icon';
import { Spinner } from '@/components/common/States';
import { useForm } from '@/hooks/useForm';
import { required, minLength } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';
import markCyan from '@/assets/logos/tirhal-mark-cyan.png';

/** The account-type switch above the fields: individual or company. */
const accountTypes = [
  { id: 'individual', label: 'فرد', icon: 'user' },
  { id: 'business', label: 'شركة', icon: 'building' },
];

function OtpStep({ email, submitting, error, onVerify, onBack }) {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const otp = digits.join('');

  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    setDigits(nextDigits);

    if (digit && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    if (!pastedDigits.length) return;

    const nextDigits = Array(6).fill('');
    pastedDigits.forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    setDigits(nextDigits);
    inputsRef.current[Math.min(pastedDigits.length, 6) - 1]?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerify(otp);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center text-center">
      <img src={markCyan} alt="" className="h-14 w-14 shrink-0" />

      <h1 className="mt-5 font-display text-[25px] font-black text-charcoal">رمز التحقق</h1>
      <p className="mt-2 max-w-[280px] text-[13px] leading-[1.8] text-muted">
        أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني.
      </p>

      <p className="mt-5 rounded-full bg-sky px-4 py-2 text-[12.5px] font-medium text-charcoal">
        <span className="ltr-run">{email}</span>
      </p>

      <div dir="ltr" className="mt-6 flex w-full items-center justify-center gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              inputsRef.current[index] = node;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            aria-label={`OTP digit ${index + 1}`}
            maxLength={1}
            value={digit}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className={cn(
              'h-12 w-10 rounded-[10px] border bg-paper text-center font-sans text-[18px] font-semibold text-charcoal outline-none',
              'transition-[border-color,background-color,box-shadow] duration-250 ease-tirhal focus:border-cyan focus:bg-white focus:ring-2 focus:ring-cyan/20',
              error ? 'border-[#E4463C]' : 'border-hairline',
            )}
          />
        ))}
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-[12px] text-[#E4463C]">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-[12px] text-muted">يمكنك لصق الرمز مباشرة داخل الخانات.</p>
      )}

      <Button type="submit" size="lg" block disabled={submitting || otp.length < 6} className="mt-6">
        {submitting ? <Spinner size={16} /> : null}
        {submitting ? 'جاري التحقق...' : 'تأكيد ومتابعة'}
      </Button>

      <button
        type="button"
        onClick={onBack}
        className="mt-5 text-[13px] font-bold text-cyan underline-offset-4 hover:underline"
      >
        تعديل البريد الإلكتروني
      </button>
    </form>
  );
}

export function SignUp() {
  const { requestSignUpOtp, verifySignUpOtp } = useAuth();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('individual');
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpRequest, setOtpRequest] = useState(null);
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpError, setOtpError] = useState(null);

  const rules = useMemo(
    () => ({
      name: [required('أدخل اسمك الكامل'), minLength(3, 'الاسم قصير جدًا')],
      identifier: [required('أدخل بريدك الإلكتروني أو رقم جوالك')],
      password: [required('اختر كلمة مرور'), minLength(8, 'كلمة المرور 8 أحرف على الأقل')],
    }),
    [],
  );

  const form = useForm({ name: '', identifier: '', password: '' }, rules, async (values) => {
    const request = await requestSignUpOtp({
      name: values.name,
      email: values.identifier,
      password: values.password,
      accountType,
    });

    setOtpRequest(request);
    setOtpError(null);
    setOtpOpen(true);
    return request;
  });

  const handleVerifyOtp = async (otp) => {
    if (!otpRequest) return;

    setOtpSubmitting(true);
    setOtpError(null);

    try {
      await verifySignUpOtp({
        otp,
        otpToken: otpRequest.otpToken,
        payload: otpRequest.payload,
      });

      setOtpOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      setOtpError(error?.message ?? 'تعذر التحقق من الرمز. حاول مرة أخرى.');
    } finally {
      setOtpSubmitting(false);
    }
  };

  return (
    <AuthLayout
      side="start"
      title={otpOpen ? null : 'إنشاء حساب'}
      description={otpOpen ? null : 'أنشئ حسابك للمتابعة'}
      caption={{
        eyebrow: 'احفظ سياراتك المفضلة وقارن بسهولة',
        title: 'رحلتك لاختيار سيارتك تبدأ من هنا.',
        body: 'مسار واضح وموثوق.',
      }}
      footer={
        otpOpen ? null : (
          <>
            لديك حساب بالفعل؟{' '}
            <Link to="/signin" className="font-bold text-cyan underline-offset-4 hover:underline">
              تسجيل الدخول
            </Link>
          </>
        )
      }
    >
      {otpOpen ? (
        <OtpStep
          email={otpRequest?.email}
          submitting={otpSubmitting}
          error={otpError}
          onVerify={handleVerifyOtp}
          onBack={() => {
            setOtpOpen(false);
            setOtpError(null);
          }}
        />
      ) : (
        <>
          <div role="group" aria-label="نوع الحساب" className="mb-7 grid grid-cols-2 gap-3.5">
            {accountTypes.map((type) => {
              const active = accountType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setAccountType(type.id)}
                  className={cn(
                    'flex h-[78px] flex-col items-center justify-center gap-2 rounded-[12px] border text-[13.5px]',
                    'transition-[background-color,border-color,color] duration-250 ease-tirhal',
                    active ? 'border-cyan bg-sky text-charcoal' : 'border-hairline bg-white text-muted hover:border-cyan/50',
                  )}
                >
                  <Icon name={type.icon} size={20} className={active ? 'text-cyan' : 'text-muted'} />
                  {type.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={form.handleSubmit} noValidate className="flex flex-col gap-5">
            <Input
              name="name"
              label="الاسم الكامل"
              required
              autoComplete="name"
              placeholder="أدخل اسمك الكامل"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.fieldError('name')}
            />

            <Input
              name="identifier"
              label="البريد الإلكتروني أو رقم الجوال"
              required
              autoComplete="username"
              placeholder="مثال: name@domain.com"
              value={form.values.identifier}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.fieldError('identifier')}
            />

            <PasswordInput
              name="password"
              label="كلمة المرور"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.fieldError('password')}
            />

            {form.submitError ? (
              <p role="alert" className="rounded-[10px] bg-sky px-4 py-3 text-start text-[13px] text-cyan">
                {form.submitError}
              </p>
            ) : null}

            <Button type="submit" size="lg" block disabled={form.submitting} className="mt-2">
              {form.submitting ? <Spinner size={16} /> : null}
              {form.submitting ? 'جاري الإنشاء...' : 'إنشاء حساب'}
            </Button>
          </form>
        </>
      )}
    </AuthLayout>
  );
}
