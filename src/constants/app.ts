// Application
export const DEV_MODE = process.env.NODE_ENV !== 'production';

// URL Application
export const BACKEND_URL_DEV = 'http://localhost:8082';
// export const BACKEND_URL_DEV = 'https://api-beta.chemin-du-local.bzh';
export const BACKEND_URL_PROD = 'https://api-beta.chemin-du-local.bzh';

export const APP_URL_DEV = 'http://localhost:3000';
// export const APP_URL_DEV = 'https://app.chemin-du-local.bzh';
export const APP_URL_PROD = 'https://app.chemin-du-local.bzh';

// SECRETS
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const MAP_API_KEY = process.env.MAP_API_KEY;
export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
