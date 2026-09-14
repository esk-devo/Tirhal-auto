import { ApiError, mockRequest } from '@/services/http';

/** Reservation requests. Persisted locally only — no server-side record exists yet. */
const STORE_KEY = 'tirhal.reservations';

const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const writeStore = (items) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — the confirmation still renders for this session */
  }
};

/** Human-readable reference the confirmation screen shows back to the customer. */
const reference = () => `TR-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export const createReservation = (payload) =>
  mockRequest(
    () => {
      if (!payload.carId) {
        throw new ApiError('اختر السيارة التي تريد حجزها.', { code: 'car_required' });
      }
      const reservation = {
        ...payload,
        id: reference(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      writeStore([reservation, ...readStore()]);
      return reservation;
    },
    { latency: 700 },
  );

export const listReservations = () => mockRequest(() => readStore());
