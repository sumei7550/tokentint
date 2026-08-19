import '../popup/popup.css';
import './settings.css';
import { APP_URLS } from '../config';
import { getSettings, updateSettings, getEntitlement } from '../utils/storage';
import type { ColorFormat } from '../types';

class SettingsPage {
  async init() {
    const settings = await getSettings();
    const format = document.getElementById('format-selector') as HTMLSelectElement | null;
    if (format) format.value = settings.defaultFormat;
    const theme = settings.theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : settings.theme;
    document.body.setAttribute('data-theme', theme);

    const entitlement = await getEntitlement();
    document.body.setAttribute('data-entitlement', entitlement.isPro ? 'pro' : 'free');
    this.setupListeners();
  }

  private setupListeners() {
    document.getElementById('format-selector')?.addEventListener('change', async (event) => {
      await updateSettings({ defaultFormat: (event.target as HTMLSelectElement).value as ColorFormat });
    });
    document.getElementById('activate-license-btn')?.addEventListener('click', () => void this.activateLicense());
    document.querySelectorAll<HTMLElement>('[data-open-url]').forEach((element) => {
      element.addEventListener('click', () => chrome.tabs.create({ url: element.dataset.openUrl === '__UPGRADE__' ? APP_URLS.upgrade : (element.dataset.openUrl || APP_URLS.upgrade) }));
    });
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = chrome.i18n.getMessage(key);
    });
  }

  private async activateLicense() {
    const input = document.getElementById('activation-token') as HTMLInputElement;
    const token = input.value.trim();
    if (!token) return;
    const response = await chrome.runtime.sendMessage({ type: 'ACTIVATE_LICENSE', payload: { token } });
    if (response.success) {
      document.body.setAttribute('data-entitlement', 'pro');
      input.value = '';
    }
  }
}

void new SettingsPage().init();
