import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CompareTray } from '@/components/comparison/CompareTray';
import { ToastViewport } from '@/components/common/ToastViewport';
import { BackToTop, ScrollRestoration } from '@/components/common/ScrollToTop';
import { Spinner } from '@/components/common/States';
import { useCompareTrayVisible } from '@/hooks/useCompareTray';
import { cn } from '@/utils/cn';

/** Shell for every public page: skip link, chrome, route outlet, global overlays. */
export function MainLayout() {
  const trayVisible = useCompareTrayVisible();

  return (
    <div className={cn('flex min-h-screen flex-col bg-paper', trayVisible && 'pb-[96px]')}>
      <ScrollRestoration />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-pill focus:bg-cyan focus:px-5 focus:py-3 focus:text-[14px] focus:font-bold focus:text-ink"
      >
        تخطَّ إلى المحتوى
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center text-cyan-deep">
              <Spinner size={26} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />

      {/* Global overlays — the tray adds bottom padding of its own on the pages it covers. */}
      <CompareTray />
      <ToastViewport />
      <BackToTop />
    </div>
  );
}
