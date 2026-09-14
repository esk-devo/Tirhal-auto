import { useState } from 'react';
import { cn } from '@/utils/cn';
import { CarImage } from '@/components/car/CarImage';

/**
 * Details-page gallery: a large primary image with a thumbnail strip beneath it, the
 * treatment the audit asked for on car detail pages. The active thumbnail carries a cyan
 * ring, and the strip scrolls rather than wrapping on narrow viewports.
 */
export function CarGallery({ car }) {
  const images = car.gallery?.length ? car.gallery : [car.image];
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-card">
        <CarImage
          imageKey={images[index]}
          alt={`${car.name} — صورة ${index + 1} من ${images.length}`}
          ratio="aspect-[16/11]"
          priority
        />
      </div>

      {images.length > 1 ? (
        <ul className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((image, thumbIndex) => (
            <li key={`${image}-${thumbIndex}`}>
              <button
                type="button"
                onClick={() => setIndex(thumbIndex)}
                aria-label={`عرض الصورة ${thumbIndex + 1}`}
                aria-current={thumbIndex === index}
                className={cn(
                  'block w-[118px] shrink-0 overflow-hidden rounded-[10px] border-2 transition-colors duration-250 ease-tirhal',
                  thumbIndex === index ? 'border-cyan' : 'border-transparent hover:border-hairline',
                )}
              >
                <CarImage imageKey={image} alt="" ratio="aspect-[16/10]" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
