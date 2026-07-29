import './popup.css';
import { formatColor, getContrastRatio, meetsWCAG } from '../utils/color';
import {
  getColorHistory,
  addColorToHistory,
  clearColorHistory,
  getProjects,
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
    this.currentProject = projects[0];
    this.renderProjectSelector(projects);
    this.renderCurrentProject();
  }

  private renderProjectSelector(projects: Project[]) {
    const selector = document.getElementById('project-selector') as HTMLSelectElement;
    if (!selector) return;

    selector.innerHTML = '';
    projects.forEach(project => {
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
      container.innerHTML = `<div class="empty-state">${chrome.i18n.getMessage('noColors')}</div>`;
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
            <span>📋</span>
          </button>
          ${showRemove ? `
            <button class="icon-btn" data-action="remove" aria-label="${chrome.i18n.getMessage('remove')}">
              <span>🗑️</span>
            </button>
          ` : `
            <button class="icon-btn" data-action="add" aria-label="${chrome.i18n.getMessage('addToProject')}">
              <span>➕</span>
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
    // Pick color button
    document.getElementById('pick-color-btn')?.addEventListener('click', () => {
      this.pickColor();
    });

    // Extract colors button (Pro)
    document.getElementById('extract-colors-btn')?.addEventListener('click', () => {
      this.extractColors();
    });

    // Format selector
    document.getElementById('format-selector')?.addEventListener('change', (e) => {
      this.currentFormat = (e.target as HTMLSelectElement).value as ColorFormat;
      this.renderHistory();
      this.renderCurrentProject();
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

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Settings/upgrade
    document.getElementById('upgrade-btn')?.addEventListener('click', () => {
      chrome.tabs.create({ url: 'https://tokentint.com/upgrade' });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.pickColor();
      }
    });
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
      chrome.tabs.create({ url: 'https://tokentint.com/upgrade' });
      return;
    }

    try {
      this.showToast(chrome.i18n.getMessage('extracting'));

      const response = await chrome.runtime.sendMessage({ type: 'EXTRACT_COLORS' });

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
        this.showToast(response.error, 'error');
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
      chrome.tabs.create({ url: 'https://tokentint.com/upgrade' });
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
    document.body.appendChild(toast);

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
  }
}

// Initialize app
const app = new PopupApp();
app.init();
