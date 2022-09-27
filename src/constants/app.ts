// Application
export const DEV_MODE = process.env.NODE_ENV !== 'production';

// URL Application
export const BACKEND_URL_DEV = 'http://localhost:8082';
export const BACKEND_URL_PROD = 'https://api-beta.chemin-du-local.bzh';

// SECRETS
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const MAP_API_KEY = process.env.MAP_API_KEY;
