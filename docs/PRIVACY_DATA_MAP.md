# Privacy Data Map

## Overview

This document maps all data collection, storage, and transmission in TokenTint for privacy compliance (GDPR, CCPA, Chrome Web Store requirements).

## Data Collection Summary

| Category | Data Collected | Purpose | Storage | Transmission |
|----------|----------------|---------|---------|--------------|
| User Content | Colors, project names | Feature functionality | Local browser | None |
| Purchase Data | Email address | License delivery | Server (transient) | Creem (payment processor) |
| License Data | Activation token | Pro feature unlock | Local browser | Server (verify only) |

## Detailed Data Inventory

### Extension Data (Local Storage)

**Location:** `chrome.storage.local` (browser profile directory)

**Data Collected:**

1. **Color History**
   - What: Hex color values, timestamps
   - Why: Show recent picks
   - Retention: Last 20 colors, user can clear
   - Access: Extension only

2. **Project Palettes**
   - What: Project names, color values, IDs, timestamps
   - Why: Organize colors
   - Retention: Until user deletes
   - Access: Extension only

3. **Settings**
   - What: Theme preference, default format, locale
   - Why: User preferences
   - Retention: Until user clears data
   - Access: Extension only

4. **Entitlement**
   - What: Pro status, activation token, activation timestamp
   - Why: Unlock Pro features
   - Retention: Until user clears data
   - Access: Extension only

**User Control:**
- Clear all data: Settings → Clear Data
- Delete projects: Project management UI
- Clear history: History → Clear
- Export backup: Settings → Export
- Import backup: Settings → Import

**No sync:** Data is NOT synced to Chrome account

### Website Data (Server-Side)

**Location:** Next.js API routes (Vercel serverless)

**Data Collected:**

1. **Purchase Email**
   - What: Email address provided at checkout
   - Why: Send activation token
   - Retention: Transient (not stored in database)
   - Access: API route, Creem webhook
   - Transmission: To Creem (payment processor)

2. **Order ID**
   - What: Creem order identifier
   - Why: Generate activation token
   - Retention: Transient (in-memory dedup cache, 1 hour)
   - Access: Webhook handler
   - Transmission: Received from Creem

**No database:** We do NOT store:
- User accounts
- Email addresses (long-term)
- Payment details (handled by Creem)
- Usage analytics
- Tracking cookies

### Network Requests

**From Extension:**

1. **License Activation**
   - Endpoint: `POST /api/license/verify`
   - Data sent: Activation token
   - Data received: Verification result
   - Frequency: Once per activation
   - Required: Pro features

2. **License Restore**
   - Endpoint: `POST /api/license/restore`
   - Data sent: Email address
   - Data received: Activation token (if found)
   - Frequency: User-initiated only
   - Required: Restore purchase

**From Website:**

1. **Checkout**
   - Endpoint: `POST /api/checkout`
   - Data sent: Email address
   - Data received: Creem checkout URL
   - Frequency: Once per purchase
   - Required: Purchase Pro

2. **Webhook** (Server-to-Server)
   - Endpoint: `POST /api/webhook`
   - Data sent: Order event (from Creem)
   - Data received: None
   - Frequency: Once per order
   - Required: License generation

## Third-Party Services

### Creem (Payment Processor)

**Purpose:** Payment processing  
**Data Shared:** Email, payment information  
**Privacy Policy:** https://creem.io/privacy  
**Our Control:** Minimal (payment processor)

**User Agreement:**
- User enters payment info on Creem's domain
- Creem handles PCI compliance
- We receive webhook notification only

### Vercel (Hosting)

**Purpose:** Website hosting  
**Data Shared:** HTTP requests (IP, user agent)  
**Privacy Policy:** https://vercel.com/legal/privacy-policy  
**Our Control:** Infrastructure only

**No Analytics:**
- Vercel Analytics: NOT enabled
- Vercel Speed Insights: NOT enabled

### Chrome Web Store

**Purpose:** Extension distribution  
**Data Shared:** Installation count (aggregate)  
**Privacy Policy:** https://policies.google.com/privacy  
**Our Control:** Distribution platform

## No Analytics or Tracking

TokenTint does NOT use:
- Google Analytics
- Mixpanel
- Segment
- Amplitude
- Hotjar
- Any tracking pixels
- Any cookies (website is stateless)

## Permissions Justification

### chrome.storage
**Why:** Store colors, projects, settings locally  
**Data Access:** Extension data only (isolated)  
**User Benefit:** Offline functionality, fast access

### activeTab
**Why:** Extract colors from current page (Pro)  
**Data Access:** Only when user clicks "Extract" button  
**User Benefit:** Page color extraction

### scripting
**Why:** Execute color extraction script  
**Data Access:** Only on user-initiated action  
**User Benefit:** Access computed styles

## Data Retention

| Data Type | Retention |
|-----------|-----------|
| Colors/Projects | Until user deletes |
| Settings | Until user clears |
| Entitlement | Until user clears |
| Purchase email | Not stored (transient) |
| Order ID | 1 hour (in-memory) |
| Webhook events | Not stored |

## User Rights (GDPR/CCPA)

### Right to Access
User can export all data:
- Settings → Export Data
- Downloads JSON with all colors, projects, settings

### Right to Deletion
User can delete all data:
- Settings → Clear All Data
- Removes everything from chrome.storage.local

### Right to Portability
Export format is JSON (machine-readable)

### Right to Erasure
No account = no data on servers to erase

## Chrome Web Store Privacy Disclosure

**Required fields:**

1. **Do you collect personal or sensitive user data?**
   - NO (for Free features)
   - YES (email for Pro purchase only)

2. **What data do you collect?**
   - Email address (Pro purchase only)

3. **How is this data used?**
   - Send license activation token
   - License restoration

4. **Is this data shared with third parties?**
   - YES (Creem for payment processing)

5. **Is data collected for advertising?**
   - NO

6. **Is data sold?**
   - NO

## Security Measures

### Extension
- No secrets in code
- License stored encrypted in token
- Local storage only (no sync)
- No eval() or unsafe practices

### Website
- HTTPS only
- Webhook signature verification
- Token encryption (AES-256-GCM)
- Environment variables for secrets
- No SQL (stateless, no SQL injection)

## Compliance Summary

### GDPR Compliance
- ✅ Minimal data collection
- ✅ Clear purpose for each data point
- ✅ User control (export, delete)
- ✅ No tracking without consent
- ✅ Data portability (JSON export)
- ✅ Privacy policy available

### CCPA Compliance
- ✅ No sale of personal information
- ✅ Transparency about data collection
- ✅ User can delete data
- ✅ Opt-in for data collection (purchase is opt-in)

### Chrome Web Store Compliance
- ✅ Single purpose extension
- ✅ Minimal permissions
- ✅ Permissions justified
- ✅ Privacy policy linked
- ✅ No obfuscated code
- ✅ No remote code loading

## Contact for Privacy

**Privacy questions:** privacy@tokentint.com  
**Data deletion requests:** support@tokentint.com  
**Privacy policy:** https://tokentint.com/privacy

## Changes to Data Practices

We will update this document and notify users if:
- New data types collected
- New third-party services added
- Data retention policies change
- New permissions required

Changes will be communicated via:
1. Extension update notes
2. Website privacy policy update
3. Email (for Pro users only)
