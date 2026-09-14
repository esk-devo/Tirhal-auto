import { cn } from '@/utils/cn';
import { carImage } from '@/utils/assets';
import { Icon } from '@/components/common/Icon';

/**
 * Car photography.
 *
 * The photography that ships with the project was lifted from the delivered Figma export,
 * so the framing already matches the design. If a key does not resolve we render a
 * branded placeholder rather than a stock substitute — real Tirhal imagery or nothing.
 */
export function CarImage({
  imageKey,
  alt,
  ratio = 'aspect-[16/10]',
  zoomOnHover = false,
  priority = false,
  className = '',
}) {
  const src = carImage(imageKey);

  return (
    <div className={cn('relative overflow-hidden bg-sky', ratio, className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'h-full w-full object-cover transition-transform duration-600 ease-tirhal',
            zoomOnHover && 'group-hover:scale-[1.04]',
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center bg-cyan/[.07] text-cyan/45"
        >
          <Icon name="body-sedan" size={44} />
        </div>
      )}
    </div>
  );
}
