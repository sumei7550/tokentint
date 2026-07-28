# TokenTint Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Chrome Extension (MV3)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │   Popup     │  │ Background  │  │  Content Script  │   │
│  │  (UI/UX)    │←→│   (Logic)   │←→│   (Injection)    │   │
│  └─────────────┘  └─────────────┘  └──────────────────┘   │
│         ↓                ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         chrome.storage.local (Browser Storage)       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTPS (activation only)
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Website (Vercel)                  │
│  ┌──────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │   Frontend   │  │   API Routes    │  │   Webhooks   │  │
│  │   (Pages)    │←→│  (Serverless)   │←→│   (Creem)    │  │
│  └──────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                     Creem (Payment)                          │
│  ┌──────────────┐  ┌─────────────────┐                     │
│  │   Checkout   │  │     Webhook     │                     │
│  └──────────────┘  └─────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

## Extension Architecture

### Manifest V3 Structure

**Service Worker (background.js):**
- Handles messages from popup
- Manages EyeDropper API calls
- Executes color extraction scripts
- Processes license activation

**Popup (popup.html/js/css):**
- Main UI
- Color history display
- Project management
- Export controls
- Settings

**Content Script (content.js):**
- Minimal presence
- Only used for injected color extraction
- Runs in page context when triggered

### Permission Model

**Granted permissions:**
```json
{
  "permissions": [
    "storage",    // chrome.storage.local
    "activeTab",  // Current tab only when popup open
    "scripting"   // chrome.scripting.executeScript
  ]
}
```

**Why these are safe:**
- `storage` - Local only, no network
- `activeTab` - User-initiated, current tab only
- `scripting` - Only executes when user clicks "Extract"

**Permissions NOT requested:**
- `tabs` - Would allow reading all tab URLs
- `<all_urls>` - Would allow accessing all websites
- `webRequest` - Would allow intercepting network traffic
- `cookies` - Not needed

### Data Flow

**Pick Color:**
```
User clicks "Pick" 
  → Popup sends message to background
  → Background creates EyeDropper
  → User picks color
  → Background returns hex value
  → Popup adds to history
  → Saves to chrome.storage.local
```

**Extract Colors (Pro):**
```
User clicks "Extract"
  → Check if Pro (local entitlement)
  → If not Pro, redirect to upgrade
  → If Pro, send message to background
  → Background executes script in active tab
  → Script extracts colors from DOM/CSS
  → Returns array of hex colors
  → Popup adds all to history
```

**License Activation:**
```
User pastes token
  → POST to tokentint.com/api/license/verify
  → Server verifies token signature
  → Returns { valid: true }
  → Extension saves entitlement locally
  → No further network calls needed
```

## Website Architecture

### Next.js App Router Structure

```
src/app/
├── layout.tsx           # Root layout
├── page.tsx             # Landing page
├── pricing/page.tsx     # Pricing table
├── upgrade/page.tsx     # Checkout form
├── success/page.tsx     # Post-purchase
├── restore/page.tsx     # License restore
├── privacy/page.tsx     # Privacy policy
├── terms/page.tsx       # Terms
├── refunds/page.tsx     # Refund policy
├── support/page.tsx     # Support docs
└── api/
    ├── checkout/route.ts       # Create Creem session
    ├── webhook/route.ts        # Creem webhook handler
    └── license/
        ├── verify/route.ts     # Verify token
        └── restore/route.ts    # Restore purchase
```

### API Endpoints

**POST /api/checkout**
```typescript
Request: { email: string }
Response: { url: string } // Creem checkout URL
```

**POST /api/webhook**
```typescript
Headers: { 'x-creem-signature': string }
Body: CreemWebhookEvent
Response: { received: true }
```

**POST /api/license/verify**
```typescript
Request: { token: string }
Response: { valid: boolean }
```

**POST /api/license/restore**
```typescript
Request: { email: string }
Response: { token: string } | { error: string }
```

## Payment Flow

### Purchase Flow

```
1. User visits /upgrade
   ↓
2. Enters email
   ↓
3. POST /api/checkout { email }
   ↓
4. Server calls Creem API
   ↓
5. Creem returns checkout URL
   ↓
6. Redirect to Creem checkout
   ↓
7. User completes payment
   ↓
8. Creem sends webhook to /api/webhook
   ↓
9. Verify webhook signature (HMAC-SHA256)
   ↓
10. Generate activation token (AES-256-GCM)
    ↓
11. Email token to user
    ↓
12. Redirect to /success?token=...
```

### Activation Flow

```
1. User receives token
   ↓
2. Opens extension
   ↓
3. Pastes token in settings
   ↓
4. Extension POSTs to /api/license/verify
   ↓
5. Server verifies token signature
   ↓
6. Returns { valid: true }
   ↓
7. Extension saves to chrome.storage.local:
   {
     entitlement: {
       isPro: true,
       activationToken: "...",
       activatedAt: 1234567890
     }
   }
   ↓
8. Pro features unlocked (offline)
```

### Restore Flow

```
1. User visits /restore
   ↓
2. Enters email
   ↓
3. POST /api/license/restore { email }
   ↓
4. Server looks up token by email
   ↓
5. Returns existing token
   ↓
6. User activates as normal
```

## Security Architecture

### Token Generation

```typescript
// Payload
{
  email: "user@example.com",
  orderId: "ord_abc123",
  createdAt: 1234567890
}

// Encryption: AES-256-GCM
// Key: 32-byte random (LICENSE_SECRET env var)
// IV: 16-byte random (unique per token)
// Auth tag: 16-byte GCM tag

// Output: base64url(JSON.stringify({iv, data, tag}))
```

### Webhook Security

```typescript
// Creem sends:
// Header: x-creem-signature
// Body: JSON event

// Verification:
const hmac = crypto.createHmac('sha256', CREEM_WEBHOOK_SECRET);
const digest = hmac.update(body).digest('hex');
const valid = crypto.timingSafeEqual(signature, digest);
```

### Idempotency

```typescript
const processedOrders = new Set<string>();

// In webhook handler:
if (processedOrders.has(order_id)) {
  return { received: true }; // Already processed
}

processedOrders.add(order_id);
// ... process order

// Cleanup after 1 hour
setTimeout(() => processedOrders.delete(order_id), 3600000);
```

## Storage Architecture

### Extension Storage

**Technology:** `chrome.storage.local`  
**Capacity:** ~10MB (browser-dependent)  
**Location:** Browser profile directory  
**Sync:** None (local only)

**Schema version:** Allows migration
```typescript
{
  version: 1, // Increment when schema changes
  projects: [...],
  colorHistory: [...],
  settings: {...},
  entitlement: {...}
}
```

**Migration function:**
```typescript
async function migrateStorage(fromVersion: number) {
  if (fromVersion < 2) {
    // Migrate v1 → v2
  }
  if (fromVersion < 3) {
    // Migrate v2 → v3
  }
}
```

### Website Storage

**Database:** None (stateless)  
**Session:** None (no auth)  
**Cache:** In-memory Map for webhook deduplication

**Why stateless:**
- No user accounts
- No login sessions
- License stored client-side
- Webhook dedup uses in-memory cache (1-hour TTL)

## Color Extraction Algorithm

```typescript
function extractColorsFromPage(): string[] {
  const colorMap = new Map<string, number>();
  
  // 1. Extract from DOM
  document.querySelectorAll('*').forEach(el => {
    const computed = getComputedStyle(el);
    
    ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
      const value = computed.getPropertyValue(prop);
      if (isValidColor(value)) {
        const normalized = normalizeToHex(value);
        colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1);
      }
    });
  });
  
  // 2. Extract CSS variables
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSStyleRule) {
          const vars = rule.style.cssText.match(/--[\w-]+:\s*([#\w(),\s]+)/g);
          // ... extract colors from vars
        }
      }
    } catch (e) {
      // Skip cross-origin stylesheets
    }
  }
  
  // 3. Sort by frequency
  const sorted = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color);
  
  // 4. Deduplicate similar colors
  const deduplicated = deduplicateSimilarColors(sorted, threshold=15);
  
  // 5. Return top 20
  return deduplicated.slice(0, 20);
}
```

**Similarity threshold:** 15 (Euclidean distance in RGB space)

## Build System

### Extension Build

```bash
# Development
webpack --watch --mode development

# Production
webpack --mode production
```

**Output:** `dist/` directory (load as unpacked extension)

**Webpack config:**
- TypeScript → JavaScript
- CSS bundling
- Copy static files (manifest, HTML, icons, locales)

### Website Build

```bash
# Development
next dev

# Production
next build
next start
```

**Output:** `.next/` directory  
**Deployment:** Vercel (zero-config)

## Environment Variables

### Extension (build-time)
None needed (no secrets in extension code)

### Website (runtime)

```bash
# Required
CREEM_API_KEY=sk_test_...
CREEM_WEBHOOK_SECRET=whsec_...
CREEM_PRODUCT_ID=prod_...
LICENSE_SECRET=<32-byte hex>

# Optional
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://tokentint.com
```

## Deployment Architecture

### Extension
- Manually uploaded to Chrome Web Store
- Review process: 1-3 days
- Auto-updates to users via Chrome

### Website
- Deployed on Vercel
- Git push → auto-deploy
- Edge network (CDN)
- Automatic HTTPS

### DNS
- `tokentint.com` → Vercel
- No subdomain needed (simple setup)

## Performance Targets

| Metric | Target |
|--------|--------|
| Extension load time | < 100ms |
| Popup render | < 50ms |
| Color pick | < 50ms |
| Extract colors | < 2s |
| Page load (website) | < 1s |
| API response | < 200ms |

## Error Handling

### Extension
- Try/catch around all async operations
- User-friendly error messages
- Console.error for debugging
- No silent failures

### Website
- API error responses (4xx, 5xx)
- User-facing error messages
- Server-side logging
- Webhook retry (Creem handles)

## Monitoring

**Extension:**
- Chrome Web Store dashboard
- User reviews
- Support emails

**Website:**
- Vercel analytics (basic)
- Server logs
- Webhook success rate

**No third-party analytics** (privacy principle)
