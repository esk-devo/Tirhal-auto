import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/pages/public/Auth/AuthLayout';
import { Input, PasswordInput } from '@/components/forms/Field';
import { Button } from '@/components/buttons/Button';
import { Spinner } from '@/components/common/States';
import { useForm } from '@/hooks/useForm';
import { required, minLength } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';

/** The artwork panel sits on the end (left) edge here, mirroring the sign-up screen. */
export function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from ?? '/';

  const rules = useMemo(
    () => ({
      identifier: [required('أدخل بريدك الإلكتروني أو رقم جوالك')],
      password: [required('أدخل كلمة المرور'), minLength(8, 'كلمة المرور 8 أحرف على الأقل')],
    }),
    [],
  );

  const form = useForm({ identifier: '', password: '' }, rules, async (values) => {
    const user = await signIn({ email: values.identifier, password: values.password });
    navigate(redirectTo, { replace: true });
    return user;
  });

  return (
    <AuthLayout
      side="end"
      title="تسجيل الدخول"
      description="أدخل بياناتك للمتابعة"
      caption={{
        eyebrow: 'مرحبا بك في ترحال',
        title: 'احفظ سياراتك المفضلة وقارن بسهولة',
      }}
      footer={
        <>
          ليس لديك حساب؟{' '}
          <Link to="/signup" className="font-bold text-cyan underline-offset-4 hover:underline">
            إنشاء حساب
          </Link>
        </>
      }
    >
      <form onSubmit={form.handleSubmit} noValidate className="flex flex-col gap-5">
        <Input
          name="identifier"
          label="البريد الإلكتروني أو رقم الجوال"
          required
          autoComplete="username"
          placeholder="ادخل بريدك او رقمك"
          value={form.values.identifier}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.fieldError('identifier')}
        />

        <PasswordInput
          name="password"
          label="كلمة المرور"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.fieldError('password')}
          labelExtra={
            <Link to="/contact" className="text-[12.5px] text-cyan underline-offset-4 hover:underline">
              نسيت كلمة المرور؟
            </Link>
          }
        />

        {form.submitError ? (
          <p role="alert" className="rounded-[10px] bg-sky px-4 py-3 text-start text-[13px] text-cyan">
            {form.submitError}
          </p>
        ) : null}

        <Button type="submit" size="lg" block disabled={form.submitting} className="mt-2">
          {form.submitting ? <Spinner size={16} /> : null}
          {form.submitting ? 'جارٍ الدخول…' : 'تسجيل الدخول'}
        </Button>
      </form>
    </AuthLayout>
  );
}
