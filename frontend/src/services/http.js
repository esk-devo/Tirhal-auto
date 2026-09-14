/**
 * The single seam between the UI and its data source.
 *
 * Today every service resolves from src/data/mock through `mockRequest`. When the
 * Node/Express API lands, each service swaps its `mockRequest(...)` call for
 * `request('/cars', ...)` — the return shape is identical, so no page, component or
 * hook changes. Nothing above this file knows where data comes from.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

/** Error type every service rejects with, so the UI can render one Arabic message. */
export class ApiError extends Error {
  constructor(message, { status = 0, code = 'unknown', details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const MOCK_LATENCY_MS = 240;

/** Resolves data on a short delay so loading and empty states are real, not theoretical. */
export const mockRequest = (resolver, { latency = MOCK_LATENCY_MS } = {}) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(typeof resolver === 'function' ? resolver() : resolver);
      } catch (error) {
        reject(
          error instanceof ApiError
            ? error
            : new ApiError('تعذّر إتمام العملية. حاول مرة أخرى.', { code: 'mock_failure' }),
        );
      }
    }, latency);
  });

/**
 * Real transport — unused until the backend exists, kept here so the swap is a
 * one-line change per service rather than an architectural change.
 */
export const request = async (path, { method = 'GET', body, signal, headers } = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      signal,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('تعذّر الاتصال بالخادم. تحقّق من اتصالك بالإنترنت.', { code: 'network' });
  }

  const payload = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(payload?.message ?? 'حدث خطأ غير متوقع.', {
      status: response.status,
      code: payload?.code ?? 'http_error',
      details: payload?.details ?? null,
    });
  }

  return payload;
};
