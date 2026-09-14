import { SectionHeading } from '@/components/common/SectionHeading';
import { BranchCard } from '@/components/cards/BranchCard';
import { branches } from '@/data/mock/company';

/**
 * "فروعنا حولك" — a centred heading over three branch cards.
 * `title`/`description` are the section's own; the about page reuses the same cards under
 * a different heading ("نقاط الالتقاء"), so only the heading is passed in.
 */
export function Branches({
  title = 'فروعنا حولك',
  description = 'شبكة واسعة لخدمتك أينما كنت على المسار.',
  className = 'bg-paper',
}) {
  return (
    <section className={`sec ${className}`}>
      <div className="wrap">
        <SectionHeading align="center" title={title} description={description} />

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    </section>
  );
}
