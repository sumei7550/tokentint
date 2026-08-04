import { initStorage } from '../utils/storage';
import { activateLicense } from '../utils/license';
import type { Message, MessageResponse } from '../types';

chrome.runtime.onInstalled.addListener(async () => {
  await initStorage();
});

chrome.runtime.onMessage.addListener((
  message: Message,
  sender,
  sendResponse: (response: MessageResponse) => void
) => {
  handleMessage(message, sender).then(sendResponse);
  return true;
});

async function handleMessage(message: Message, sender: chrome.runtime.MessageSender): Promise<MessageResponse> {
  try {
    switch (message.type) {
      case 'EXTRACT_COLORS':
        return await handleExtractColors(message.payload?.tabId);

      case 'ACTIVATE_LICENSE':
        const activated = await activateLicense(message.payload?.token ?? '');
        return { success: activated, data: { isPro: activated } };

      default:
        return { success: false, error: 'Unknown message type' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

async function handleExtractColors(tabId?: number): Promise<MessageResponse> {
  if (tabId === undefined) {
    return { success: false, error: 'No active webpage is available. Open a webpage and try again.' };
  }

  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: extractColorsFromPage
    });

    if (results && results[0]?.result) {
      return { success: true, data: results[0].result };
    }

    return { success: false, error: 'Failed to extract colors' };
  } catch (error) {
    const message = (error as Error).message;
    if (/Cannot access contents of url|extensions gallery|chrome:\/\//i.test(message)) {
      return {
        success: false,
        error: 'pageExtractionNotSupported'
      };
    }
    return { success: false, error: message };
  }
}

function extractColorsFromPage(): string[] {
  // executeScript serializes only this function into the page context.
  function normalizeColor(color: string): string | null {
    color = color.trim().toLowerCase();
    if (color.startsWith('#')) {
      if (color.length === 4) return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
      if (color.length === 7) return color;
    }
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return rgbMatch ? rgbToHex(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])) : null;
  }

  function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  }

  function areSimilar(hex1: string, hex2: string): boolean {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return false;
    const distance = Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2)
    );
    return distance < 15;
  }

  function deduplicateSimilarColors(colors: string[]): string[] {
    const result: string[] = [];
    for (const color of colors) {
      if (!result.some(existing => areSimilar(color, existing))) result.push(color);
    }
    return result;
  }
  const colorMap = new Map<string, number>();
  const elements = document.querySelectorAll('*');

  elements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const computed = window.getComputedStyle(el);

      const properties = [
        'color',
        'backgroundColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor'
      ];

      properties.forEach(prop => {
        const value = computed.getPropertyValue(prop);
        if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
          const normalized = normalizeColor(value);
          if (normalized) {
            colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
          }
        }
      });
    }
  });

  const styleSheets = document.styleSheets;
  for (let i = 0; i < styleSheets.length; i++) {
    try {
      const sheet = styleSheets[i];
      if (sheet.cssRules) {
        for (let j = 0; j < sheet.cssRules.length; j++) {
          const rule = sheet.cssRules[j];
          if (rule instanceof CSSStyleRule) {
            const style = rule.style;
            const varMatch = style.cssText.match(/--[\w-]+:\s*([#\w(),\s]+)/g);
            if (varMatch) {
              varMatch.forEach(v => {
                const color = v.split(':')[1]?.trim();
                if (color) {
                  const normalized = normalizeColor(color);
                  if (normalized) {
                    colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
                  }
                }
              });
            }
          }
        }
      }
    } catch (e) {
      // Skip inaccessible stylesheets
    }
  }

  const sorted = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color);

  const deduplicated = deduplicateSimilarColors(sorted);

  return deduplicated.slice(0, 20);
}

