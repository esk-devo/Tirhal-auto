import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon, DirectionalIcon } from '@/components/common/Icon';

/**
 * Branch card — white, with the pin in a pale blue tile on the start (right) corner,
 * the branch name and short address beneath it, and a map link on the end.
 * Shared by the home page and the about page, which use it identically.
 */
export function BranchCard({ branch, className = '' }) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-card border border-hairline bg-white p-7 text-start',
        'transition-[transform,border-color,box-shadow] duration-300 ease-tirhal hover:-translate-y-[4px] hover:shadow-lift',
        className,
      )}
    >
      <span className="mb-6 inline-flex h-11 w-11 items-center justify-center self-start rounded-[10px] bg-sky text-cyan">
        <Icon name="pin" size={20} />
      </span>

      <h3 className="font-display text-[19px] font-medium text-charcoal">{branch.shortName}</h3>
      <p className="mt-2 text-[13.5px] text-muted">{branch.shortAddress}</p>

      <Link
        to="/contact"
        className="mt-5 inline-flex items-center justify-start gap-2 text-[13.5px] font-medium text-cyan transition-colors duration-250 ease-tirhal hover:text-cyan-deep"
      >
        <DirectionalIcon direction="forward" name="arrow" size={15} />
        عرض الخريطة
      </Link>
    </article>
  );
}
