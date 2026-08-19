import './popup.css';
import './settings-overrides.css';
import { APP_URLS } from '../config';
import { formatColor, getContrastRatio, meetsWCAG } from '../utils/color';
import {
  getColorHistory,
  addColorToHistory,
  clearColorHistory,
  getProjects,
  createProject,
  saveProject,
  deleteProject,
  getSettings,
  updateSettings,
  getEntitlement,
  exportData,
  importData,
  clearAllData,
  generateId
} from '../utils/storage';
import {
  exportCSSVariables,
  exportTailwindConfig,
  exportW3CTokens,
  downloadFile
} from '../utils/export';
import type { Color, Project, ColorFormat } from '../types';

interface EyeDropperInstance {
  open(): Promise<{ sRGBHex: string }>;
}

interface EyeDropperConstructor {
  new(): EyeDropperInstance;
}

declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor;
  }
}

class PopupApp {
  private currentProject: Project | null = null;
  private currentFormat: ColorFormat = 'hex';
  private isPro: boolean = false;

  async init() {
    await this.loadSettings();
    await this.loadEntitlement();
    await this.loadProjects();
    await this.renderHistory();
    this.setupEventListeners();
    this.applyI18n();
  }

  private async loadSettings() {
    const settings = await getSettings();
    this.currentFormat = settings.defaultFormat;
    const formatSelector = document.getElementById('format-selector') as HTMLSelectElement | null;
    if (formatSelector) formatSelector.value = this.currentFormat;

    const theme = settings.theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : settings.theme;

    document.body.setAttribute('data-theme', theme);
  }

  private async loadEntitlement() {
    const entitlement = await getEntitlement();
    this.isPro = entitlement.isPro;
    this.updateProUI();
  }

  private updateProUI() {
    document.body.setAttribute('data-entitlement', this.isPro ? 'pro' : 'free');

    const proHeaderButton = document.getElementById('pro-header-btn');
    if (proHeaderButton) {
      proHeaderButton.textContent = this.isPro ? 'Pro' : 'Upgrade';
      proHeaderButton.setAttribute('aria-label', this.isPro ? 'TokenTint Pro' : 'Upgrade to TokenTint Pro');
    }

    const proElements = document.querySelectorAll('[data-pro]');
    proElements.forEach(el => {
      if (this.isPro) {
        el.removeAttribute('data-pro-locked');
      } else {
        el.setAttribute('data-pro-locked', 'true');
      }
    });
  }

  private async loadProjects() {
    const projects = await getProjects();
    const settings = await getSettings();
    this.currentProject = projects.find(project => project.id === settings.activeProjectId) || projects[0];
    this.renderProjectSelector(projects);
    this.renderCurrentProject();
  }

  private renderProjectSelector(projects: Project[]) {
    const selector = document.getElementById('project-selector') as HTMLSelectElement;
    if (!selector) return;

    selector.innerHTML = '';
    const visibleProjects = this.isPro ? projects : projects.slice(0, 1);
    visibleProjects.forEach(project => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.name;
      selector.appendChild(option);
    });

    if (this.currentProject) {
      selector.value = this.currentProject.id;
    }
  }

  private renderCurrentProject() {
    if (!this.currentProject) return;

    const container = document.getElementById('project-colors');
    if (!container) return;

    if (this.currentProject.colors.length === 0) {
      container.innerHTML = '<div class="empty-state"><span class="empty-state-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 0 0 16h1.5a2 2 0 0 0 0-4H12a2 2 0 1 1 0-4h5.5A2.5 2.5 0 0 0 20 9.5 5.5 5.5 0 0 0 14.5 4H12Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14" cy="7" r="1"/></svg></span><span class="empty-state-copy"><strong>No tokens yet</strong><span>Pick a color and add it to your project.</span></span></div>';
      return;
    }

    container.innerHTML = this.currentProject.colors.map(color =>
      this.createColorCard(color, true)
    ).join('');

    this.attachColorCardListeners(container);
  }

  private async renderHistory() {
    const history = await getColorHistory();
    const container = document.getElementById('color-history');
    if (!container) return;

    if (history.length === 0) {
      container.innerHTML = `<div class="empty-state">${chrome.i18n.getMessage('noHistory')}</div>`;
      return;
    }

    container.innerHTML = history.map(color =>
      this.createColorCard(color, false)
    ).join('');

    this.attachColorCardListeners(container);
  }

  private createColorCard(color: Color, showRemove: boolean): string {
    const formattedValue = formatColor(color.value, this.currentFormat);

    return `
      <div class="color-card" data-color-id="${color.id}">
        <div class="color-preview" style="background: ${color.value}"></div>
        <div class="color-info">
          <div class="color-name">${color.name}</div>
          <div class="color-value">${formattedValue}</div>
        </div>
        <div class="color-actions">
          <button class="icon-btn" data-action="copy" aria-label="${chrome.i18n.getMessage('copy')}">
            <span class="history-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="8" y="7" width="10" height="12" rx="1.5"/><path d="M6 16V5.5A1.5 1.5 0 0 1 7.5 4H15"/></svg></span>
          </button>
          ${showRemove ? `
            <button class="icon-btn" data-action="remove" aria-label="${chrome.i18n.getMessage('remove')}">
              <span class="history-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></span>
            </button>
          ` : `
            <button class="icon-btn" data-action="add" aria-label="${chrome.i18n.getMessage('addToProject')}">
              <span class="history-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span>
            </button>
          `}
        </div>
      </div>
    `;
  }

  private attachColorCardListeners(container: HTMLElement) {
    container.querySelectorAll('[data-action="copy"]').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleCopyColor(e));
    });

    container.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleRemoveColor(e));
    });

    container.querySelectorAll('[data-action="add"]').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAddToProject(e));
    });
  }

  private setupEventListeners() {
    document.getElementById('pro-header-btn')?.addEventListener('click', () => {
      if (this.isPro) {
        this.showSettingsView();
      } else {
        chrome.tabs.create({ url: APP_URLS.upgrade });
      }
    });

    // Pick color button
    document.getElementById('pick-color-btn')?.addEventListener('click', () => {
      this.pickColor();
    });

    // Extract colors button (Pro)
    document.getElementById('extract-colors-btn')?.addEventListener('click', () => {
      this.extractColors();
    });

    // Export buttons
    document.getElementById('export-css')?.addEventListener('click', () => {
      this.exportAs('css');
    });

    document.getElementById('export-tailwind')?.addEventListener('click', () => {
      this.exportAs('tailwind');
    });

    document.getElementById('export-w3c')?.addEventListener('click', () => {
      this.exportAs('w3c');
    });

    // Clear history
    document.getElementById('clear-history')?.addEventListener('click', () => {
      this.clearHistory();
    });

    document.getElementById('settings-footer-btn')?.addEventListener('click', () => {
      this.showSettingsView();
    });
    document.getElementById('settings-back-btn')?.addEventListener('click', () => this.hideSettingsView());
    document.getElementById('format-selector')?.addEventListener('change', async (event) => {
      this.currentFormat = (event.target as HTMLSelectElement).value as ColorFormat;
      await updateSettings({ defaultFormat: this.currentFormat });
      await this.renderCurrentProject();
      await this.renderHistory();
    });
    document.getElementById('settings-format-selector')?.addEventListener('change', async (event) => {
      this.currentFormat = (event.target as HTMLSelectElement).value as ColorFormat;
      await updateSettings({ defaultFormat: this.currentFormat });
      const homeFormat = document.getElementById('format-selector') as HTMLSelectElement | null;
      if (homeFormat) homeFormat.value = this.currentFormat;
      await this.renderCurrentProject();
      await this.renderHistory();
    });
    document.getElementById('activate-license-btn')?.addEventListener('click', () => void this.activateLicense());
    document.querySelectorAll<HTMLElement>('[data-open-url]').forEach((element) => {
      element.addEventListener('click', () => chrome.tabs.create({ url: APP_URLS.upgrade }));
    });
    document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', () => {
      document.getElementById('upgrade-modal')?.setAttribute('hidden', '');
    }));
    document.getElementById('modal-upgrade-btn')?.addEventListener('click', () => {
      chrome.tabs.create({ url: APP_URLS.upgrade });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.pickColor();
      }
    });

    document.getElementById('project-selector')?.addEventListener('change', async (e) => {
      const projectId = (e.target as HTMLSelectElement).value;
      const projects = await getProjects();
      this.currentProject = projects.find(project => project.id === projectId) || projects[0];
      await updateSettings({ activeProjectId: this.currentProject?.id });
      this.renderCurrentProject();
    });

    document.getElementById('new-project-btn')?.addEventListener('click', () => {
      void this.createProject();
    });

    document.getElementById('rename-project-btn')?.addEventListener('click', () => {
      void this.renameProject();
    });

    document.getElementById('delete-project-btn')?.addEventListener('click', () => {
      void this.deleteCurrentProject();
    });

  }

  private showSettingsView() {
    const settings = document.getElementById('settings-view');
    const format = document.getElementById('format-selector') as HTMLSelectElement | null;
    if (format) format.value = this.currentFormat;
    const settingsFormat = document.getElementById('settings-format-selector') as HTMLSelectElement | null;
    if (settingsFormat) settingsFormat.value = this.currentFormat;
    document.getElementById('main-view')?.setAttribute('hidden', 'true');
    document.getElementById('main-header')?.setAttribute('hidden', 'true');
    document.getElementById('settings-footer-btn')?.setAttribute('hidden', 'true');
    settings?.removeAttribute('hidden');
  }

  private hideSettingsView() {
    document.getElementById('settings-view')?.setAttribute('hidden', '');
    document.getElementById('main-view')?.removeAttribute('hidden');
    document.getElementById('main-header')?.removeAttribute('hidden');
    document.getElementById('settings-footer-btn')?.removeAttribute('hidden');
  }

  private async activateLicense() {
    const input = document.getElementById('activation-token') as HTMLInputElement | null;
    const token = input?.value.trim();
    if (!token) {
      this.showToast('Paste your activation token first.', 'error');
      return;
    }

    const response = await chrome.runtime.sendMessage({
      type: 'ACTIVATE_LICENSE',
      payload: { token }
    });

    if (response.success) {
      this.isPro = true;
      this.updateProUI();
      this.showToast('TokenTint Pro activated.');
      if (input) input.value = '';
    } else {
      this.showToast(response.error || 'Activation failed.', 'error');
    }
  }

  private async requireProjectPro(): Promise<boolean> {
    if (this.isPro) return true;
    document.getElementById('upgrade-modal')?.removeAttribute('hidden');
    return false;
  }

  private async createProject() {
    if (!await this.requireProjectPro()) return;

    const name = window.prompt(this.message('projectNamePrompt', 'Project name'));
    if (!name?.trim()) return;

    this.currentProject = await createProject(name.trim());
    await updateSettings({ activeProjectId: this.currentProject.id });
    await this.loadProjects();
  }

  private async renameProject() {
    if (!this.currentProject || !await this.requireProjectPro()) return;

    const name = window.prompt(this.message('projectNamePrompt', 'Project name'), this.currentProject.name);
    if (!name?.trim()) return;

    this.currentProject.name = name.trim();
    await saveProject(this.currentProject);
    await this.loadProjects();
  }

  private async deleteCurrentProject() {
    if (!this.currentProject || !await this.requireProjectPro()) return;

    const projects = await getProjects();
    if (projects.length === 1) {
      this.showToast(this.message('keepOneProject', 'Keep at least one project.'), 'error');
      return;
    }

    if (!window.confirm(this.message('deleteProjectConfirm', 'Delete project “$1”?').replace('$1', this.currentProject.name))) return;
    await deleteProject(this.currentProject.id);
    const remainingProjects = await getProjects();
    this.currentProject = remainingProjects[0];
    await updateSettings({ activeProjectId: this.currentProject.id });
    await this.loadProjects();
  }

  private async pickColor() {
    if (!window.EyeDropper) {
      this.showToast('EyeDropper API is not supported in this browser.', 'error');
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      const color: Color = {
        id: generateId(),
        name: result.sRGBHex,
        value: result.sRGBHex,
        type: 'color',
        timestamp: Date.now()
      };

      await addColorToHistory(color);
      await this.renderHistory();
      this.showToast(chrome.i18n.getMessage('colorPicked'));
    } catch (error) {
      const pickError = error as Error;
      if (pickError.name === 'NotAllowedError' || pickError.name === 'AbortError') {
        this.showToast('Color picking was cancelled.', 'error');
      } else {
        this.showToast(pickError.message || chrome.i18n.getMessage('pickColorError'), 'error');
      }
    }
  }

  private async extractColors() {
    if (!this.isPro) {
      document.getElementById('upgrade-modal')?.removeAttribute('hidden');
      return;
    }

    try {
      this.showToast(chrome.i18n.getMessage('extracting'));

      // Popup messages do not have a sender.tab. Resolve the active page here and
      // pass its id to the service worker explicitly.
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (!tab?.id) {
        this.showToast('Open a webpage, then try extracting colors again.', 'error');
        return;
      }

      const response = await chrome.runtime.sendMessage({
        type: 'EXTRACT_COLORS',
        payload: { tabId: tab.id }
      });

      if (response.success) {
        const colors: Color[] = response.data.map((value: string) => ({
          id: generateId(),
          name: value,
          value,
          type: 'color' as const,
          timestamp: Date.now()
        }));

        for (const color of colors) {
          await addColorToHistory(color);
        }

        await this.renderHistory();
        this.showToast(chrome.i18n.getMessage('colorsExtracted', [colors.length.toString()]));
      } else {
        const errorMessage = response.error === 'pageExtractionNotSupported'
          ? chrome.i18n.getMessage('pageExtractionNotSupported')
          : response.error;
        this.showToast(errorMessage || chrome.i18n.getMessage('extractError'), 'error');
      }
    } catch (error) {
      this.showToast(chrome.i18n.getMessage('extractError'), 'error');
    }
  }

  private async handleCopyColor(e: Event) {
    const btn = e.currentTarget as HTMLElement;
    const card = btn.closest('.color-card') as HTMLElement;
    const colorId = card.dataset.colorId;

    const valueEl = card.querySelector('.color-value');
    if (valueEl) {
      const value = valueEl.textContent || '';
      await navigator.clipboard.writeText(value);
      this.showToast(chrome.i18n.getMessage('copied'));
    }
  }

  private async handleRemoveColor(e: Event) {
    const btn = e.currentTarget as HTMLElement;
    const card = btn.closest('.color-card') as HTMLElement;
    const colorId = card.dataset.colorId;

    if (this.currentProject) {
      this.currentProject.colors = this.currentProject.colors.filter(c => c.id !== colorId);
      await saveProject(this.currentProject);
      this.renderCurrentProject();
    }
  }

  private async handleAddToProject(e: Event) {
    const btn = e.currentTarget as HTMLElement;
    const card = btn.closest('.color-card') as HTMLElement;
    const colorId = card.dataset.colorId;

    const history = await getColorHistory();
    const color = history.find(c => c.id === colorId);

    if (color && this.currentProject) {
      const exists = this.currentProject.colors.some(c => c.value === color.value);

      if (!exists) {
        this.currentProject.colors.push(color);
        await saveProject(this.currentProject);
        this.renderCurrentProject();
        this.showToast(chrome.i18n.getMessage('addedToProject'));
      }
    }
  }

  private async exportAs(format: 'css' | 'tailwind' | 'w3c') {
    if (!this.currentProject) return;

    if ((format === 'tailwind' || format === 'w3c') && !this.isPro) {
      document.getElementById('upgrade-modal')?.removeAttribute('hidden');
      return;
    }

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'css':
        content = exportCSSVariables(this.currentProject);
        filename = `${this.currentProject.name}.css`;
        mimeType = 'text/css';
        break;
      case 'tailwind':
        content = exportTailwindConfig(this.currentProject);
        filename = 'tailwind.config.js';
        mimeType = 'text/javascript';
        break;
      case 'w3c':
        content = exportW3CTokens(this.currentProject);
        filename = `${this.currentProject.name}.tokens.json`;
        mimeType = 'application/json';
        break;
    }

    downloadFile(content, filename, mimeType);
    this.showToast(chrome.i18n.getMessage('exported'));
  }

  private async clearHistory() {
    if (confirm(chrome.i18n.getMessage('confirmClearHistory'))) {
      await clearColorHistory();
      await this.renderHistory();
      this.showToast(chrome.i18n.getMessage('historyCleared'));
    }
  }

  private async toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);

    const settings = await getSettings();
    await updateSettings({ ...settings, theme: next });
  }

  private showToast(message: string, type: 'success' | 'error' = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    const popupRoot = document.getElementById('app') || document.body;
    popupRoot.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  private applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = chrome.i18n.getMessage(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        (el as HTMLInputElement).placeholder = chrome.i18n.getMessage(key);
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) {
        el.setAttribute('aria-label', this.message(key, el.getAttribute('aria-label') || ''));
      }
    });
  }

  private message(key: string, fallback: string): string {
    return chrome.i18n.getMessage(key) || fallback;
  }
}

// Initialize app
const app = new PopupApp();
app.init();
