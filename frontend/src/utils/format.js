/**
 * Formatting helpers.
 *
 * Numerals are rendered with Latin digits: the design sets every number in Barlow, which
 * has no Arabic-Indic set, and all but one screen shows Latin digits. `ar-SA-u-nu-latn`
 * keeps Arabic grouping conventions while staying inside the type system.
 */
const LOCALE = 'ar-SA-u-nu-latn';

const grouped = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });

/** 390000 → "390,000 ر.س", or the bare number when the caller renders the unit itself. */
export const formatPrice = (value, { withCurrency = true } = {}) => {
  if (value === null || value === undefined) return 'السعر عند الطلب';
  return withCurrency ? `${grouped.format(value)} ر.س` : grouped.format(value);
};

/** 285000 → "SAR 285,000", the form the checkout summary and calculator use. */
export const formatSar = (value) => `SAR ${grouped.format(value)}`;

export const formatNumber = (value) => grouped.format(value);

/**
 * Monthly instalment estimate. Indicative only — the UI says so alongside it.
 */
export const estimateMonthly = (price, { months = 36, downPayment = 0, apr = 0.049 } = {}) => {
  const principal = Math.max(price - downPayment, 0);
  if (principal === 0 || months === 0) return 0;
  const monthlyRate = apr / 12;
  const payment = (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
  return Math.round(payment);
};

export const percent = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);
