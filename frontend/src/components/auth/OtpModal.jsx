import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/forms/Field';
import { Spinner } from '@/components/common/States';

export function OtpModal({
  open,
  title,
  description,
  identifier,
  submitting = false,
  error,
  onVerify,
  onClose,
}) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerify?.(otp);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {identifier ? (
          <p className="rounded-[10px] bg-sky px-4 py-3 text-center text-[13px] text-muted">
            تم إرسال رمز التحقق إلى <span className="ltr-run font-bold text-charcoal">{identifier}</span>
          </p>
        ) : null}

        <Input
          name="otp"
          label="رمز التحقق"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="••••••"
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
          error={error}
        />

        {error ? (
          <p role="alert" className="rounded-[10px] bg-sky px-4 py-3 text-start text-[13px] text-cyan">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" block disabled={submitting || otp.length < 6}>
          {submitting ? <Spinner size={16} /> : null}
          {submitting ? 'جاري التحقق...' : 'تأكيد الرمز'}
        </Button>
      </form>
    </Modal>
  );
}