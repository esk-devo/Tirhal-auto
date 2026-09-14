import { ApiError, mockRequest } from '@/services/http';

/**
 * Frontend-only authentication.
 *
 * The session is held in localStorage under one key. When the Express API arrives,
 * these four functions become httpOnly-cookie calls to /auth/* and AuthContext is
 * untouched — that is the entire point of routing auth through a service.
 */
const SESSION_KEY = 'tirhal.session';

const readStore = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStore = (session) => {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable (private mode) — the session simply stays in memory */
  }
};

const toUser = ({ name, email, phone }) => ({
  id: `user-${email.toLowerCase()}`,
  name,
  email: email.toLowerCase(),
  phone: phone ?? null,
});

export const getSession = () => mockRequest(() => readStore(), { latency: 0 });

export const signIn = ({ email, password }) =>
  mockRequest(() => {
    if (!email || !password) {
      throw new ApiError('أدخل البريد الإلكتروني وكلمة المرور.', { code: 'missing_credentials' });
    }
    if (password.length < 8) {
      throw new ApiError('البريد الإلكتروني أو كلمة المرور غير صحيحة.', { code: 'invalid_credentials' });
    }
    const session = { user: toUser({ name: email.split('@')[0], email }), issuedAt: Date.now() };
    writeStore(session);
    return session;
  });

export const signUp = ({ name, email, phone, password }) =>
  mockRequest(() => {
    if (password.length < 8) {
      throw new ApiError('كلمة المرور يجب أن تكون 8 أحرف على الأقل.', { code: 'weak_password' });
    }
    const session = { user: toUser({ name, email, phone }), issuedAt: Date.now() };
    writeStore(session);
    return session;
  });
export const requestSignUpOtp = ({ name, email, phone, password, accountType }) =>
  mockRequest(() => {
    if (password.length < 8) {
      throw new ApiError('كلمة المرور يجب أن تكون 8 أحرف على الأقل.', { code: 'weak_password' });
    }

    return {
      otpToken: `signup-otp-${Date.now()}`,
      email,
      payload: { name, email, phone, password, accountType },
    };
  });

export const verifySignUpOtp = ({ otp, otpToken, payload }) =>
  mockRequest(() => {
    if (!otp || otp.length !== 6) {
      throw new ApiError('أدخل رمز التحقق المكون من 6 أرقام.', { code: 'invalid_otp' });
    }

    const session = {
      user: toUser({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
      }),
      issuedAt: Date.now(),
    };

    writeStore(session);
    return session;
  });

export const signOut = () =>
  mockRequest(() => {
    writeStore(null);
    return null;
  }, { latency: 0 });
