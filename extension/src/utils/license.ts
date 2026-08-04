import type { Entitlement } from '../types';
import { setEntitlement, getEntitlement } from './storage';
import { APP_URLS } from '../config';


export async function activateLicense(activationToken: string): Promise<boolean> {
  try {
    const response = await fetch(APP_URLS.verifyLicense, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: activationToken })
    });

    if (!response.ok) {
      throw new Error('License verification failed');
    }

    const data = await response.json();

    if (data.valid) {
      const entitlement: Entitlement = {
        isPro: true,
        activationToken,
        activatedAt: Date.now()
      };

      await setEntitlement(entitlement);
      return true;
    }

    return false;
  } catch (error) {
    console.error('License activation error:', error);
    return false;
  }
}

export async function checkProStatus(): Promise<boolean> {
  const entitlement = await getEntitlement();
  return entitlement.isPro;
}

export async function requirePro(): Promise<boolean> {
  const isPro = await checkProStatus();

  if (!isPro) {
    chrome.tabs.create({ url: APP_URLS.upgrade });
    return false;
  }

  return true;
}
