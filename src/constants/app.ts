// Application
export const DEV_MODE = process.env.NODE_ENV !== 'production';

// URL Application
export const API_URL_DEV = 'http://localhost:8082/query';
export const API_URL_PROD = 'https://api-beta.chemin-du-local.bzh/query';

// SECRETS
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
