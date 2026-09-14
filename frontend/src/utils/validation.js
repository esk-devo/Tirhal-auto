/**
 * Field-level validators. Each returns an Arabic error string, or null when valid.
 * Used by useForm; kept framework-free so the same rules can be reused server-side.
 */

const SAUDI_PHONE = /^(?:\+?966|0)?5\d{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const required = (message = 'هذا الحقل مطلوب') => (value) =>
  value === null || value === undefined || String(value).trim() === '' ? message : null;

export const minLength = (length, message) => (value) =>
  String(value ?? '').trim().length < length ? (message ?? `أدخل ${length} أحرف على الأقل`) : null;

export const email = (message = 'أدخل بريدًا إلكترونيًا صحيحًا') => (value) =>
  value && !EMAIL.test(String(value).trim()) ? message : null;

export const saudiPhone = (message = 'أدخل رقم جوال سعودي يبدأ بـ 05') => (value) =>
  value && !SAUDI_PHONE.test(String(value).replace(/[\s-]/g, '')) ? message : null;

export const matches = (field, message = 'الحقلان غير متطابقين') => (value, values) =>
  value !== values[field] ? message : null;

export const accepted = (message = 'يلزم الموافقة للمتابعة') => (value) => (value ? null : message);

/** Runs a rule map against a values object and returns { field: message } for failures. */
export const validate = (values, rules) =>
  Object.entries(rules).reduce((errors, [field, fieldRules]) => {
    for (const rule of fieldRules) {
      const message = rule(values[field], values);
      if (message) {
        errors[field] = message;
        break;
      }
    }
    return errors;
  }, {});
