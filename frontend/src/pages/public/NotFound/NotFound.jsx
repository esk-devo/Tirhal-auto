import { Button } from '@/components/buttons/Button';

export function NotFound() {
  return (
    <div className="sec bg-paper">
      <div className="wrap flex min-h-[46vh] flex-col items-center justify-center text-center">
        <p className="font-sans text-[64px] font-light leading-none text-cyan ltr-run">404</p>
        <h1 className="mt-6 font-display text-[28px] font-light text-charcoal sm:text-[34px]">الصفحة غير موجودة</h1>
        <p className="mt-3 max-w-[420px] text-[14px] text-muted">
          ربما تغيّر الرابط أو حُذفت الصفحة. ابدأ من المعروض الحالي.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/cars" size="lg">
            تصفّح السيارات
          </Button>
          <Button to="/" variant="outline" size="lg">
            العودة للرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
}
