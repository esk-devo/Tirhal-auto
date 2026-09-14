/**
 * Manufacturer list.
 *
 * `logo` is the asset key resolved by utils/assets.js against src/assets/images/brands/.
 * The marks currently there were lifted out of the delivered Figma export so the strip
 * renders exactly as designed; swap in licensed SVGs when they are available and nothing
 * else changes.
 */
export const brands = [
  { id: 'cupra', name: 'كوبرا', latin: 'Cupra', logo: 'cupra' },
  { id: 'chevrolet', name: 'شيفروليه', latin: 'Chevrolet', logo: 'chevrolet' },
  { id: 'audi', name: 'أودي', latin: 'Audi', logo: 'audi' },
  { id: 'mercedes', name: 'مرسيدس بنز', latin: 'Mercedes-Benz', logo: 'mercedes' },
  { id: 'bmw', name: 'بي إم دبليو', latin: 'BMW', logo: 'bmw' },
  { id: 'nissan', name: 'نيسان', latin: 'Nissan', logo: 'nissan' },
  { id: 'kia', name: 'كيا', latin: 'Kia', logo: 'kia' },
  { id: 'jetour', name: 'جيتور', latin: 'Jetour', logo: 'jetour' },
  { id: 'hyundai', name: 'هيونداي', latin: 'Hyundai', logo: 'hyundai' },
  { id: 'toyota', name: 'تويوتا', latin: 'Toyota', logo: 'toyota' },
  { id: 'mg', name: 'إم جي', latin: 'MG', logo: 'mg' },
  { id: 'ford', name: 'فورد', latin: 'Ford', logo: 'ford' },
  { id: 'peugeot', name: 'بيجو', latin: 'Peugeot', logo: 'peugeot' },
  { id: 'jeep', name: 'جيب', latin: 'Jeep', logo: 'jeep' },
  { id: 'lexus', name: 'لكزس', latin: 'Lexus', logo: 'lexus' },
  { id: 'baic', name: 'بايك', latin: 'Baic', logo: null },
  { id: 'porsche', name: 'بورش', latin: 'Porsche', logo: null },
];

/** The four brands the Figma filter panel exposes as tiles, in its order. */
export const filterBrandIds = ['toyota', 'mercedes', 'bmw', 'audi'];

export const getBrand = (id) => brands.find((brand) => brand.id === id) ?? null;
