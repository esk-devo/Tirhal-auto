import { Link } from 'react-router-dom';

/**
 * Breadcrumbs, as the details page draws them: a right-to-left trail separated by a
 * slash, with the current page in a darker weight.
 */
export function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav aria-label="مسار التنقل" className={className}>
      <ol className="flex flex-wrap items-center justify-start gap-x-2.5 gap-y-1 text-[13px] text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2.5">
              {isLast || !item.to ? (
                <span aria-current={isLast ? 'page' : undefined} className="text-charcoal">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="transition-colors duration-250 ease-tirhal hover:text-cyan">
                  {item.label}
                </Link>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-hairline">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
