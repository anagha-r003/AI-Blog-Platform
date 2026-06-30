import api from './axios';

/**
 * POST /api/register/
 * Payload: { username, first_name, last_name, email, password, confirm_password }
 * Returns 201 with the created user data on success.
 */
export const registerUser = (data) => api.post('register/', data);

/**
 * POST /api/login/
 * Payload: { username, password }
 * Returns { access, user } — backend also sets the refresh_token HttpOnly cookie.
 */
export const loginUser = (data) => api.post('login/', data);

/**
 * POST /api/logout/
 * No body needed — refresh_token is read from the HttpOnly cookie.
 */
export const logoutUser = () => api.post('logout/');
