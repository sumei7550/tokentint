# TokenTint Product Specification

## Overview

**Product Name:** TokenTint  
**Tagline:** Pick colors. Ship tokens.  
**Type:** Chrome Extension + Website  
**Business Model:** One-time Pro purchase ($15)

## Core Principles

1. **Local-first** - All data stored in browser
2. **Privacy-focused** - Extension data remains local; website analytics is limited to explicit `web_` events
3. **Offline-capable** - Free features require no network
4. **No subscriptions** - One-time purchase only
5. **Developer tool** - Clean, functional design
6. **Accessibility** - Full keyboard navigation

## Target Users

- Web designers
- Frontend developers
- Design system maintainers
- UI/UX professionals

## Feature Matrix

### Current implementation boundary (2026-07-30)

The feature tables below include roadmap items. The shipping popup has local
project palettes (one free default palette; multiple palettes for Pro),
page-color extraction, CSS/Tailwind/W3C exports, history, color picking, and
token activation. It does not expose a WCAG checker UI or backup import/export
controls. Chrome i18n applies to the popup only; several runtime prompts still
need localization. The website navigation, footer, and upgrade page provide an
English/Simplified Chinese toggle; its other public content pages are currently
English-only.

### Free Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Pick Color | Use EyeDropper API to pick any color | `EyeDropper` API |
| Color Formats | HEX, RGB, HSL conversion | Client-side conversion |
| Copy to Clipboard | One-click copy | `navigator.clipboard` |
| Color History | Last 20 colors | `chrome.storage.local` |
| Single Project | One project palette | `chrome.storage.local` |
| CSS Variables Export | Export as CSS custom properties | Client-side generation |
| Clear Data | Reset all data | `chrome.storage.local.clear()` |
| Dark/Light Mode | Theme switching | CSS variables |
| Keyboard Navigation | Full keyboard support | ARIA + focus management |

### Pro Features ($15 one-time)

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Extract Page Colors | Extract key colors from current page | `chrome.scripting.executeScript` |
| Multiple Projects | Unlimited project palettes | `chrome.storage.local` |
| Tailwind Export | Export as Tailwind config | Client-side generation |
| W3C Tokens Export | Export as W3C Design Tokens | W3C spec compliance |
| WCAG Contrast | Contrast ratio checker | Color luminance calculation |
| Backup Import/Export | Full data backup | JSON export/import |

## Technical Architecture

### Chrome Extension (Manifest V3)

**Permissions (strict limit):**
- `storage` - Local data storage
- `activeTab` - Current tab access
- `scripting` - Execute color extraction

**No permissions for:**
- `tabs` - Not needed
- `<all_urls>` - Too broad

**Structure:**
```
extension/
├── manifest.json (MV3)
├── background.js (service worker)
├── popup.html/js/css
├── content.js (minimal)
└── _locales/ (i18n)
```

### Website (Next.js)

**Pages:**
- `/` - Landing page
- `/pricing` - Pricing table
- `/upgrade` - Checkout form
- `/success` - Post-purchase
- `/restore` - License restore
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/refunds` - Refund policy
- `/support` - Support docs

**API Routes:**
- `/api/checkout` - Create Creem session
- `/api/webhook` - Handle Creem webhooks
- `/api/license/verify` - Verify activation token
- `/api/license/restore` - Restore purchase

### Payment Flow (Creem)

1. User enters email on `/upgrade`
2. POST to `/api/checkout` creates Creem session
3. User completes payment on Creem
4. Creem webhook to `/api/webhook`
5. Generate activation token
6. Email token to user
7. User pastes token in extension
8. Extension calls `/api/license/verify`
9. Store entitlement locally

**Security:**
- Webhook signature verification
- Order idempotency (prevent duplicate processing)
- Token encryption (AES-256-GCM)
- No secrets in extension code

## Data Storage Schema

```typescript
interface StorageData {
  version: number;
  projects: Project[];
  colorHistory: Color[];
  settings: Settings;
  entitlement: Entitlement;
}

interface Project {
  id: string;
  name: string;
  colors: Color[];
  createdAt: number;
  updatedAt: number;
}

interface Color {
  id: string;
  name: string;
  value: string; // hex format
  type: 'color';
  timestamp?: number;
}

interface Settings {
  theme: 'light' | 'dark' | 'system';
  defaultFormat: 'hex' | 'rgb' | 'hsl';
  locale: string;
}

interface Entitlement {
  isPro: boolean;
  activationToken?: string;
  activatedAt?: number;
}
```

## Extract Colors Implementation

**Scope (intentionally limited):**
- Computed styles on visible elements
- CSS variables from stylesheets
- Color properties: `color`, `backgroundColor`, `borderColor`

**Exclusions (complexity/security):**
- iframes (cross-origin issues)
- Shadow DOM (complexity)
- SVG (different color model)
- Gradients (complex parsing)

**Process:**
1. Query all elements
2. Get computed styles
3. Extract color values
4. Normalize to hex
5. Count occurrences
6. Deduplicate similar colors (threshold: 15)
7. Sort by frequency
8. Return top 20

**UI Copy:**
- "Extract key colors from this page"
- NOT "Extract all colors"

This manages user expectations.

## W3C Design Tokens Format

**Strict compliance:**
```json
{
  "color": {
    "primary": {
      "$value": "#635BFF",
      "$type": "color"
    }
  }
}
```

**Must use:**
- `$value` (not `value`)
- `$type` (not `type`)

## Export Formats

### CSS Variables
```css
:root {
  --primary: #635BFF;
  --secondary: #22D3C5;
}
```

### Tailwind Config
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#635BFF',
        secondary: '#22D3C5'
      }
    }
  }
}
```

### W3C Tokens
```json
{
  "color": {
    "primary": {
      "$value": "#635BFF",
      "$type": "color"
    }
  }
}
```

## Internationalization

**Supported languages:**
- Full: English, Chinese (Simplified)
- Basic: Japanese, Korean, Spanish, French, German

**Implementation:**
- Use `chrome.i18n` API
- All UI text in `_locales/{lang}/messages.json`
- No hardcoded strings

## Design System

**Colors:**
- Primary: `#635BFF`
- Teal: `#22D3C5`
- Pink: `#FF6B9D`
- Background: `#10131A` (dark)

**Style:**
- Clean, functional
- Developer-focused
- No emoji (except in specific UI contexts)
- No glassmorphism
- No rainbow gradients

## Quality Assurance

See separate documents:
- `CHROME_WEB_STORE_CHECKLIST.md`
- `MANUAL_QA_CHECKLIST.md`

## Future Considerations

**Out of scope for v1.0:**
- User accounts
- Cloud sync
- Team features
- AI features
- Subscription model
- Mobile app
- Desktop app

## Success Metrics

**Technical:**
- Extension loads < 100ms
- Color pick latency < 50ms
- Extract colors < 2s (typical page)
- Zero console errors

**Business:**
- Chrome Web Store approval
- Payment flow completion rate
- Support request volume
- Refund rate
