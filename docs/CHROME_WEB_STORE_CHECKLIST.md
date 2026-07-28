# Chrome Web Store Submission Checklist

## Pre-Submission Requirements

### 1. Build Extension

```bash
cd extension
npm install
npm run build
```

Verify `dist/` directory contains:
- [ ] manifest.json
- [ ] popup.html
- [ ] popup.js
- [ ] background.js
- [ ] content.js
- [ ] icons/ (16, 48, 128 PNG)
- [ ] _locales/ (en, zh_CN minimum)

### 2. Create Distribution Package

```bash
cd extension/dist
zip -r tokentint-v1.0.0.zip .
```

**Or on Windows:**
```powershell
Compress-Archive -Path dist\* -DestinationPath tokentint-v1.0.0.zip
```

### 3. Test Extension Locally

1. Open Chrome: `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `extension/dist` directory
5. Verify:
   - [ ] Extension loads without errors
   - [ ] Popup opens correctly
   - [ ] Pick color works
   - [ ] History saves
   - [ ] Projects work
   - [ ] Export functions
   - [ ] Dark/light mode
   - [ ] All i18n strings display

### 4. Prepare Store Assets

#### Icons (Required)

- [ ] 16x16 PNG (toolbar icon)
- [ ] 48x48 PNG (extension management)
- [ ] 128x128 PNG (Chrome Web Store)

**Design requirements:**
- Transparent background
- Consistent style
- Recognizable at small sizes
- Match brand colors

#### Screenshots (Required: 1-5)

**Dimensions:** 1280x800 or 640x400

Required screenshots:
1. [ ] Main popup interface
2. [ ] Color picking in action
3. [ ] Project palette management
4. [ ] Export options
5. [ ] Settings/Pro features

**Tips:**
- Use clean, real examples
- Show actual functionality
- Annotate if helpful
- Light theme for consistency

#### Promotional Images (Optional)

- [ ] Small tile: 440x280 PNG
- [ ] Marquee: 1400x560 PNG

#### Video (Optional)
- [ ] YouTube demo video

### 5. Legal Documents

Required URLs:
- [ ] Privacy policy: `https://tokentint.com/privacy`
- [ ] Terms of service: `https://tokentint.com/terms` (optional)
- [ ] Support: `https://tokentint.com/support`

Verify privacy policy includes:
- [ ] Data collection (minimal)
- [ ] Permission justifications
- [ ] No analytics statement
- [ ] User control over data
- [ ] Contact information

## Chrome Web Store Developer Account

### 1. Create Developer Account

1. Visit: https://chrome.google.com/webstore/devconsole
2. Pay one-time fee: $5 USD
3. Verify email

### 2. Store Listing Information

#### Basic Info

**Name:** TokenTint

**Summary (132 chars max):**
```
Pick colors. Ship tokens. Color picker with design token export.
```

**Description:**

```markdown
TokenTint is a clean, developer-focused color picker for Chrome.

FREE FEATURES:
• Pick any color with EyeDropper API
• Copy in HEX, RGB, or HSL format
• 20-color history
• Project palette
• CSS Variables export
• Dark/light mode
• Full keyboard navigation

PRO FEATURES ($15 one-time):
• Extract key colors from any page
• Multiple project palettes
• Tailwind config export
• W3C Design Tokens export
• WCAG contrast checker
• Backup import/export

PRIVACY:
• All data stored locally
• No analytics or tracking
• Minimal permissions
• Offline-capable

ONE-TIME PURCHASE:
• No subscription
• Buy once, own forever
• Works offline after activation
```

**Category:** Developer Tools

**Language:** English (primary)

#### Privacy

**Single Purpose Description:**
```
TokenTint is a color picker and design token management tool for web developers and designers.
```

**Permission Justifications:**

**storage:**
```
Store colors, projects, and user preferences locally in the browser.
```

**activeTab:**
```
Extract colors from the current page when user clicks "Extract Colors" button (Pro feature).
```

**scripting:**
```
Execute color extraction script in the active tab to analyze page colors (Pro feature).
```

**Host Permissions:**
```
None requested.
```

**Remote Code:**
```
No remote code is used.
```

#### Privacy Practices

**Data Usage:**

1. **What data is collected?**
   - Email address (only for Pro purchase)
   
2. **How is it used?**
   - Send license activation token
   
3. **Is it shared?**
   - Yes, with Creem (payment processor)
   
4. **Is it sold?**
   - No

**Certifications:**
- [ ] I certify that my product complies with Google's policies

### 3. Distribution

**Visibility:** Public

**Regions:** All countries

**Pricing:** Free (with in-extension purchase link)

⚠️ **Important:** Chrome Web Store doesn't support paid extensions anymore. Pro purchase happens on external website.

## Submission Checklist

### Technical Review

- [ ] Manifest V3 compliant
- [ ] No console errors
- [ ] All permissions justified
- [ ] No external scripts loaded
- [ ] No eval() or unsafe code
- [ ] No obfuscation
- [ ] Icons load correctly
- [ ] All i18n keys have translations

### Content Review

- [ ] Description is accurate
- [ ] Screenshots show real functionality
- [ ] No misleading claims
- [ ] No trademark violations
- [ ] Support URL works
- [ ] Privacy policy accessible

### Policy Compliance

- [ ] Single purpose
- [ ] Minimal permissions
- [ ] User data protection
- [ ] No spam or deception
- [ ] No malware
- [ ] No prohibited content

## Submission Process

1. Go to: https://chrome.google.com/webstore/devconsole
2. Click "New Item"
3. Upload `tokentint-v1.0.0.zip`
4. Fill in store listing
5. Upload assets
6. Submit for review

**Review time:** 1-3 business days (typically)

## After Approval

### 1. Update Website

Add Chrome Web Store badge:
```html
<a href="https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID">
  <img src="chrome-web-store-badge.png" alt="Available in Chrome Web Store">
</a>
```

### 2. Update Extension Links

In `manifest.json`, add:
```json
{
  "homepage_url": "https://tokentint.com"
}
```

### 3. Monitor

- [ ] User reviews
- [ ] Crash reports
- [ ] Support requests
- [ ] Installation stats

## Updates

### Publishing Update

1. Increment version in `manifest.json`
2. Build new package
3. Upload to Chrome Web Store
4. Update "What's new" section
5. Submit for review

**Auto-updates:**
- Chrome checks for updates every few hours
- Users get updates automatically

## Common Rejection Reasons

### 1. Permissions Too Broad

**Issue:** Requesting unnecessary permissions

**Fix:**
- Only request: storage, activeTab, scripting
- Remove tabs, webRequest, cookies, etc.

### 2. External Code

**Issue:** Loading scripts from CDN

**Fix:**
- Bundle all code
- No remote script loading
- Check webpack config

### 3. Privacy Policy

**Issue:** Missing or inadequate privacy policy

**Fix:**
- Must be publicly accessible
- Must explain data collection
- Must justify permissions

### 4. Misleading Functionality

**Issue:** Description doesn't match features

**Fix:**
- Accurate description
- Real screenshots
- Clear Pro vs Free distinction

### 5. Keyword Stuffing

**Issue:** Too many keywords in description

**Fix:**
- Natural language
- Focus on features
- Avoid repetition

## Troubleshooting

### Build Fails

```bash
cd extension
rm -rf node_modules dist
npm install
npm run build
```

### Manifest Errors

Validate at: https://developer.chrome.com/docs/extensions/mv3/manifest/

Common issues:
- Missing required fields
- Invalid permission names
- Incorrect version format

### Icons Not Loading

- Verify PNG format (not JPG)
- Check dimensions (exact pixels)
- Ensure correct paths in manifest

### i18n Errors

- All keys must exist in all locales
- Check JSON syntax
- Verify default_locale in manifest

## Post-Launch Checklist

- [ ] Monitor first 24 hours for crashes
- [ ] Respond to early reviews
- [ ] Fix critical bugs quickly
- [ ] Update documentation if needed
- [ ] Announce launch (Twitter, etc.)

## Support Resources

**Chrome Web Store:**
- Developer console: https://chrome.google.com/webstore/devconsole
- Documentation: https://developer.chrome.com/docs/webstore
- Support: https://support.google.com/chrome_webstore

**TokenTint:**
- Support email: support@tokentint.com
- Issues: (Your GitHub if public)
