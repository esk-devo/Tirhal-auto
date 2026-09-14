/** Shared vocabularies: filter facets, spec labels and sort options, per the Figma. */

/** "نوع المركبة" — the seven tiles, in the order the design lays them out (right to left). */
export const vehicleTypes = [
  { id: 'sedan', label: 'Sedan', icon: 'body-sedan' },
  { id: 'suv', label: 'SUV', icon: 'body-suv' },
  { id: 'coupe', label: 'Coupe', icon: 'body-coupe' },
  { id: 'van', label: 'Van', icon: 'body-van' },
  { id: 'electric', label: 'Electric', icon: 'body-electric' },
  { id: 'hatchback', label: 'Hatchback', icon: 'body-hatchback' },
  { id: '4x4', label: '4x4', icon: 'body-4x4' },
];

/** "نوع القير" */
export const gearTypes = [
  { id: 'manual', label: 'عادي', icon: 'sliders' },
  { id: 'automatic', label: 'أوتوماتيك', icon: 'cog' },
];

export const priceBounds = { min: 50000, max: 250000, step: 5000 };

export const sortOptions = [
  { id: 'newest', label: 'الأحدث' },
  { id: 'price-asc', label: 'السعر: من الأقل' },
  { id: 'price-desc', label: 'السعر: من الأعلى' },
];

/** The three specs shown inline on a car card, right to left. */
export const cardSpecFields = ['mileage', 'fuel', 'transmission'];

/** The five-item strip under the gallery on the details page, right to left. */
export const detailStrip = [
  { key: 'engine', label: 'المحرك', icon: 'gauge' },
  { key: 'power', label: 'القوة', icon: 'gauge' },
  { key: 'gearbox', label: 'ناقل الحركة', icon: 'cog' },
  { key: 'seats', label: 'المقاعد', icon: 'seat' },
  { key: 'consumption', label: 'كم/لتر', icon: 'fuel' },
];

/** "المواصفات التقنية" — two labelled groups. */
export const techGroups = [
  {
    id: 'performance',
    title: 'الأداء',
    rows: [
      { key: 'cylinders', label: 'نوع المحرك' },
      { key: 'drivetrain', label: 'نظام الدفع' },
      { key: 'torque', label: 'عزم الدوران' },
    ],
  },
  {
    id: 'dimensions',
    title: 'الأبعاد',
    rows: [
      { key: 'length', label: 'الطول' },
      { key: 'width', label: 'العرض' },
      { key: 'trunk', label: 'سعة الصندوق' },
    ],
  },
];

/** Comparison table groups. `better` says which direction wins, for the highlight. */
export const compareGroups = [
  {
    id: 'performance',
    title: 'المحرك والأداء',
    rows: [
      { key: 'battery', label: 'سعة المحرك' },
      { key: 'powerHp', label: 'القوة (حصان)', better: 'high', numeric: true },
      { key: 'acceleration', label: 'التسارع 0-100', better: 'low', numeric: true, suffix: 'ثانية' },
    ],
  },
  {
    id: 'space',
    title: 'الأبعاد والمساحة',
    rows: [
      { key: 'trunkLitres', label: 'سعة الصندوق (لتر)', better: 'high', numeric: true, suffix: 'لتر' },
      { key: 'wheelbase', label: 'قاعدة العجلات (ملم)', numeric: true, suffix: 'ملم' },
    ],
  },
];

export const MAX_COMPARE = 3;

/** Financing calculator defaults, taken from the details page. */
export const financing = {
  downPaymentRate: 0.2,
  terms: [36, 48, 60],
  defaultTerm: 36,
  apr: 0.049,
};
