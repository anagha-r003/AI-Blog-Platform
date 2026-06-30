import axios from 'axios';

/**
 * Pre-configured Axios instance.
 * - baseURL points at the Django dev server.
 * - withCredentials: true  →  browser will send the HttpOnly refresh_token
 *   cookie on every request (required for the token refresh endpoint).
 */
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
});

// ── Request interceptor ────────────────────────────────────────
// Attach the access token from localStorage on every outgoing request.
api.interceptors.request.use((config) => {
  const access = localStorage.getItem('access');
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// ── Response interceptor ───────────────────────────────────────
// On 401: silently call /refresh/ (cookie is sent automatically),
// store the new access token, then retry the original request.
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject })
        )
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          })
          .catch((err) => Promise.reject(err));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        // No body needed — the HttpOnly cookie is sent automatically
        const { data } = await axios.post(
          'http://127.0.0.1:8000/api/refresh/',
          {},
          { withCredentials: true }
        );
        localStorage.setItem('access', data.access);
        processQueue(null, data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('access');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
