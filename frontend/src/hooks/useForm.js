import { useCallback, useState } from 'react';
import { validate } from '@/utils/validation';

/**
 * Minimal form state: values, per-field Arabic errors, touched tracking and an
 * async submit that surfaces a service ApiError as a form-level message.
 *
 * @param {object} initialValues
 * @param {object} rules   { field: [validator, ...] } from utils/validation
 * @param {Function} onSubmit  async (values) => any
 */
export function useForm(initialValues, rules = {}, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [result, setResult] = useState(null);

  const setValue = useCallback(
    (field, value) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    },
    [],
  );

  const handleChange = useCallback(
    (event) => {
      const { name, type, value, checked } = event.target;
      setValue(name, type === 'checkbox' ? checked : value);
    },
    [setValue],
  );

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;
      setTouched((current) => ({ ...current, [name]: true }));
      const fieldErrors = validate(values, { [name]: rules[name] ?? [] });
      setErrors((current) => ({ ...current, [name]: fieldErrors[name] }));
    },
    [values, rules],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError(null);
    setResult(null);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      const nextErrors = validate(values, rules);
      setErrors(nextErrors);
      setTouched(Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

      if (Object.keys(nextErrors).length > 0) return null;

      setSubmitting(true);
      setSubmitError(null);
      try {
        const submission = await onSubmit(values);
        setResult(submission);
        return submission;
      } catch (error) {
        setSubmitError(error?.message ?? 'تعذّر إرسال النموذج. حاول مرة أخرى.');
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [values, rules, onSubmit],
  );

  const fieldError = (name) => (touched[name] ? errors[name] : undefined);

  return {
    values,
    errors,
    touched,
    submitting,
    submitError,
    result,
    setValue,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    fieldError,
    reset,
  };
}
