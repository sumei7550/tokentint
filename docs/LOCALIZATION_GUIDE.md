# Localization Guide

## Overview

TokenTint uses Chrome's built-in i18n system (`chrome.i18n` API) for internationalization.

## Supported Languages

### Full Support
- **English** (`en`) - Complete translations
- **Chinese Simplified** (`zh_CN`) - Complete translations

### Basic Support (extension name + description only)
- Japanese (`ja`)
- Korean (`ko`)
- Spanish (`es`)
- French (`fr`)
- German (`de`)

## File Structure

```
extension/_locales/
├── en/
│   └── messages.json
├── zh_CN/
│   └── messages.json
├── ja/
│   └── messages.json
├── ko/
│   └── messages.json
├── es/
│   └── messages.json
├── fr/
│   └── messages.json
└── de/
    └── messages.json
```

## Message Format

```json
{
  "keyName": {
    "message": "Translated text",
    "description": "Context for translator"
  }
}
```

### Example

```json
{
  "pickColor": {
    "message": "Pick Color",
    "description": "Button text for color picker"
  },
  "colorsExtracted": {
    "message": "$1 colors extracted",
    "description": "Success message showing count. $1 is replaced with number."
  }
}
```

## Required Keys

Every locale must have:

```json
{
  "extension_name": {
    "message": "TokenTint"
  },
  "extension_description": {
    "message": "Pick colors. Ship tokens."
  }
}
```

## Full Translations (en, zh_CN)

These locales need all keys:

- `pickColor` - Pick Color button
- `extractColors` - Extract Colors button
- `history` - History section
- `project` - Project section
- `export` - Export
- `copy` - Copy action
- `remove` - Remove action
- `addToProject` - Add to project
- `noColors` - Empty state
- `noHistory` - Empty history state
- `colorPicked` - Success message
- `pickColorError` - Error message
- `extracting` - Loading state
- `colorsExtracted` - Success with count ($1)
- `extractError` - Extraction error
- `copied` - Copied confirmation
- `addedToProject` - Added confirmation
- `exported` - Export success
- `historyCleared` - Clear confirmation
- `confirmClearHistory` - Clear confirmation dialog
- `exportCSS` - CSS Variables
- `exportTailwind` - Tailwind Config
- `exportW3C` - W3C Tokens
- `clearHistory` - Clear button
- `upgrade` - Upgrade button
- `settings` - Settings button

## Usage in Code

### TypeScript/JavaScript

```typescript
// Simple message
const text = chrome.i18n.getMessage('pickColor');

// Message with substitution
const count = 5;
const text = chrome.i18n.getMessage('colorsExtracted', [count.toString()]);
```

### HTML (via TypeScript)

```typescript
// Apply i18n to elements
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (key) {
    el.textContent = chrome.i18n.getMessage(key);
  }
});
```

### Manifest

```json
{
  "name": "__MSG_extension_name__",
  "description": "__MSG_extension_description__"
}
```

## Adding a New Language

### 1. Create Locale Directory

```bash
mkdir extension/_locales/NEW_LOCALE
```

Use ISO 639-1 codes:
- `pt` - Portuguese
- `it` - Italian
- `ru` - Russian
- `ar` - Arabic

For regional variants:
- `pt_BR` - Brazilian Portuguese
- `zh_TW` - Traditional Chinese

### 2. Copy Template

```bash
cp extension/_locales/en/messages.json extension/_locales/NEW_LOCALE/
```

### 3. Translate

Open `extension/_locales/NEW_LOCALE/messages.json` and translate all `message` values.

**Rules:**
- Keep `$1`, `$2`, etc. placeholders
- Preserve HTML entities
- Maintain similar length (UI space)
- Keep key names unchanged

### 4. Test

1. Build extension
2. Set Chrome language to new locale
3. Verify all text displays correctly
4. Check for:
   - Missing translations (shows `__MSG_key__`)
   - Truncated text
   - Layout issues

## Translation Guidelines

### Tone
- Professional but friendly
- Developer-focused
- Concise

### Technical Terms

**Do NOT translate:**
- TokenTint (brand name)
- Pro (tier name)
- HEX, RGB, HSL (color formats)
- CSS, Tailwind, W3C (tech names)
- WCAG (accessibility standard)

**Translate:**
- Button labels
- Feature names
- Error messages
- Success messages

### Examples

**English:**
```json
{
  "exportTailwind": {
    "message": "Tailwind Config"
  }
}
```

**Chinese:**
```json
{
  "exportTailwind": {
    "message": "Tailwind 配置"
  }
}
```

Note: "Tailwind" is NOT translated.

### Pluralization

Chrome i18n doesn't have built-in pluralization. Use neutral language:

**Instead of:**
- "1 color extracted" / "2 colors extracted"

**Use:**
- "$1 colors extracted" (works for singular and plural)

**Or provide conditional:**
```typescript
const count = 5;
const key = count === 1 ? 'oneColorExtracted' : 'colorsExtracted';
const message = chrome.i18n.getMessage(key, [count.toString()]);
```

## Website Localization

The website uses a lightweight client-side language provider. Navigation, footer,
and the upgrade page support English and Simplified Chinese; the initial locale
uses the saved selection or the browser language. The remaining public content
pages are English-only and should be translated before they are described as
fully localized.

To extend this coverage:

### 1. Next.js i18n

Update `next.config.js`:

```javascript
module.exports = {
  i18n: {
    locales: ['en', 'zh-CN', 'ja'],
    defaultLocale: 'en'
  }
}
```

### 2. Create Translation Files

```
website/locales/
├── en.json
├── zh-CN.json
└── ja.json
```

### 3. Use i18n Library

```typescript
import { useTranslation } from 'next-i18next';

export default function Page() {
  const { t } = useTranslation();
  return <h1>{t('title')}</h1>;
}
```

## Testing Translations

### Manual Testing

1. **Change Chrome Language:**
   - Settings → Languages
   - Add language
   - Move to top
   - Restart Chrome

2. **Reload Extension:**
   - chrome://extensions
   - Click reload icon

3. **Test All Screens:**
   - Popup
   - History
   - Projects
   - Settings
   - Error states
   - Success messages

### Automated Testing

Check for missing keys:

```javascript
// test-i18n.js
const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '_locales');
const enMessages = JSON.parse(
  fs.readFileSync(path.join(localesDir, 'en', 'messages.json'))
);

const locales = fs.readdirSync(localesDir);

locales.forEach(locale => {
  if (locale === 'en') return;
  
  const messagesPath = path.join(localesDir, locale, 'messages.json');
  const messages = JSON.parse(fs.readFileSync(messagesPath));
  
  const enKeys = Object.keys(enMessages);
  const localeKeys = Object.keys(messages);
  
  const missing = enKeys.filter(key => !localeKeys.includes(key));
  
  if (missing.length > 0) {
    console.error(`${locale}: Missing keys:`, missing);
  } else {
    console.log(`${locale}: OK`);
  }
});
```

Run with:
```bash
node test-i18n.js
```

## Chrome Web Store Localization

Update store listing for each language:

1. Go to Developer Dashboard
2. Select extension
3. Click "Store listing"
4. Select language from dropdown
5. Translate:
   - Extension name (usually keep "TokenTint")
   - Short description
   - Detailed description
   - Screenshot captions (optional)

## Common Issues

### Key Not Found

**Symptom:** Text shows `__MSG_keyName__`

**Cause:** Key missing in messages.json

**Fix:** Add key to locale file

### Wrong Language Displayed

**Symptom:** Shows wrong locale

**Cause:** Chrome language setting

**Fix:**
1. Check `chrome://settings/languages`
2. Ensure desired language is #1
3. Restart Chrome

### Default Locale Error

**Symptom:** Extension won't load

**Cause:** `default_locale` in manifest doesn't match `_locales/` directory

**Fix:**
```json
{
  "default_locale": "en"
}
```

Ensure `_locales/en/messages.json` exists.

## Translation Services

### Free
- Google Translate (for initial draft)
- DeepL (better quality)
- Community contributions

### Paid
- Professional translation services
- Gengo
- One Hour Translation

### Crowdsourcing
- Crowdin
- Lokalise
- POEditor

## Contribution Guidelines

If accepting community translations:

1. **Provide context:**
   - Screenshots
   - Feature descriptions
   - Character limits

2. **Review process:**
   - Native speaker review
   - Test in actual extension
   - Check for UI issues

3. **Credits:**
   - List translators in README
   - Or in extension about page

## Maintenance

When adding new features:

1. Add keys to `en/messages.json`
2. Update `zh_CN/messages.json`
3. Update partial locales (extension_name, extension_description only)
4. Test in both languages
5. Document changes

## Resources

**Chrome i18n API:**
https://developer.chrome.com/docs/extensions/reference/i18n/

**Message formats:**
https://developer.chrome.com/docs/extensions/mv3/i18n-messages/

**ISO language codes:**
https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

**Chrome supported locales:**
https://developer.chrome.com/docs/webstore/i18n/
