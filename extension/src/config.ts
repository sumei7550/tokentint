declare const __TOKENTINT_APP_BASE_URL__: string;

/** Website origin injected by webpack at build time. */
export const APP_BASE_URL = __TOKENTINT_APP_BASE_URL__.replace(/\/$/, '');

export const APP_URLS = {
  upgrade: `${APP_BASE_URL}/upgrade`,
  verifyLicense: `${APP_BASE_URL}/api/license/verify`
};
