import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/pages/public/Home/Home';

/**
 * Route table.
 *
 * Home ships in the main bundle; every other page is code-split, so the first paint
 * carries only what the landing page needs. The /admin branch is reserved and
 * intentionally empty — the dashboard's UI is not designed yet (see pages/admin/README.md).
 */
const Cars = lazy(() => import('@/pages/public/Cars/Cars').then((m) => ({ default: m.Cars })));
const CarDetails = lazy(() =>
  import('@/pages/public/CarDetails/CarDetails').then((m) => ({ default: m.CarDetails })),
);
const About = lazy(() => import('@/pages/public/About/About').then((m) => ({ default: m.About })));
const Reservation = lazy(() =>
  import('@/pages/public/Reservation/Reservation').then((m) => ({ default: m.Reservation })),
);
const Compare = lazy(() => import('@/pages/public/Compare/Compare').then((m) => ({ default: m.Compare })));
const Favorites = lazy(() =>
  import('@/pages/public/Favorites/Favorites').then((m) => ({ default: m.Favorites })),
);
const Contact = lazy(() => import('@/pages/public/Contact/Contact').then((m) => ({ default: m.Contact })));
const SignIn = lazy(() => import('@/pages/public/Auth/SignIn').then((m) => ({ default: m.SignIn })));
const SignUp = lazy(() => import('@/pages/public/Auth/SignUp').then((m) => ({ default: m.SignUp })));
const NotFound = lazy(() => import('@/pages/public/NotFound/NotFound').then((m) => ({ default: m.NotFound })));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cars" element={<Cars />} />
        <Route path="cars/:carId" element={<CarDetails />} />
        <Route path="about" element={<About />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="compare" element={<Compare />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
