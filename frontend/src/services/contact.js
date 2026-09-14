import { mockRequest } from '@/services/http';

/** Contact form submissions. Mocked until POST /contact exists. */
export const sendContactMessage = (payload) =>
  mockRequest(
    () => ({
      id: `MSG-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      ...payload,
      receivedAt: new Date().toISOString(),
    }),
    { latency: 700 },
  );
