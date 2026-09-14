import { Hero } from '@/pages/public/Home/sections/Hero';
import { BrandStrip } from '@/pages/public/Home/sections/BrandStrip';
import { NewReleases } from '@/pages/public/Home/sections/NewReleases';
import { WhyTirhal } from '@/pages/public/Home/sections/WhyTirhal';
import { Fleet } from '@/pages/public/Home/sections/Fleet';
import { Financing } from '@/pages/public/Home/sections/Financing';
import { Branches } from '@/pages/public/Home/sections/Branches';
import { CtaBand } from '@/components/layout/CtaBand';

/** Home — the section order is the Figma's, top to bottom. */
export function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <NewReleases />
      <WhyTirhal />
      <Fleet />
      <Financing />
      <Branches />
      <CtaBand />
    </>
  );
}
