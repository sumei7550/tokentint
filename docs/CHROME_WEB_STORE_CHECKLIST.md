# Chrome Web Store Submission Checklist

> Implementation status reviewed 2026-07-30. This document is the release
> source of truth. Do not advertise roadmap features until they are usable in
> the popup and represented by a real screenshot.

## 1. Build the extension

```powershell
cd extension
npm run type-check
npm run build
```

Verify `extension/dist/` contains:

- [ ] `manifest.json`, `popup.html`, `popup.js`, and `background.js`
- [ ] `icons/` with 16, 32, 48, and 128 px PNG files
- [ ] `_locales/`
- [ ] No persistent `content.js` or `<all_urls>` host permission

Package the *contents* of `dist`, not its parent directory:

```powershell
Compress-Archive -Path extension\dist\* -DestinationPath tokentint-v1.1.0.zip
```

## 2. Manual QA

1. Go to `chrome://extensions`, enable Developer mode, then load `extension/dist`.
2. After every build, use Reload before retesting.
3. Confirm the following:

- [ ] The extension loads without errors.
- [ ] Pick Color works and adds an item to the 20-color history.
- [ ] A history color can be added to and removed from a project palette.
- [ ] Pro users can create, switch, rename, and delete project palettes; the active project is remembered.
- [ ] CSS Variables export works.
- [ ] A Pro activation token is verified successfully.
- [ ] Extract Page Colors succeeds on a normal webpage.
- [ ] Extract Page Colors shows a clear error on Chrome-internal/restricted pages.
- [ ] English and Simplified Chinese render without missing strings; hard-coded runtime prompts are either localized or accepted as English.
- [ ] Light and dark themes render correctly.

## 3. Store assets

### Icons

- [x] 16 px, 48 px, and 128 px icons are present in `website/public/images/icons/`.
- [x] Transparent logo master: `website/public/images/brand/tokentint-logo.png`.
- [ ] Visually approve the 16 px toolbar icon in Chrome.

### Screenshots

Chrome Web Store accepts 1–5 screenshots. Capture at 1280×800 or 640×400 from
the actual built extension:

1. [ ] Main popup and history.
2. [ ] Color picker being used on a real webpage.
3. [ ] Creating a project and adding a color to its palette.
4. [ ] CSS Variables export.
5. [ ] Page-color extraction or Pro activation.

Do not use generated artwork as a screenshot.

### Optional promotional artwork

- [x] 440×280 tile: `store-assets/promotional-tile-440x280.png`
- [x] 1400×560 marquee: `store-assets/promotional-marquee-1400x560.png`

## 4. Accurate listing copy

**Name:** TokenTint

**Short description:**

```text
Pick colors, save a palette, and export design tokens from Chrome.
```

**Feature claims currently supported by the popup:**

- Pick colors with the EyeDropper API.
- Copy HEX, RGB, and HSL values.
- Keep a local history of up to 20 colors.
- Maintain one local default project palette; Pro unlocks multiple project palettes.
- Export CSS Variables; Pro unlocks Tailwind and W3C token exports.
- Pro can extract key computed CSS colors from the active webpage.
- Use a light or dark theme and the color-picker keyboard shortcut.

**Do not claim yet:** a WCAG contrast-checker UI, backup import/export UI, or
full keyboard navigation.

The extension popup has complete English and Simplified Chinese message catalogs,
but a few runtime error and activation prompts are still hard-coded in English.
The website navigation, footer, and upgrade page offer English and Simplified
Chinese; remaining public content pages are English-only. Other packaged
extension locales contain only the name and description and must not be
advertised as full UI translations.

## 5. Privacy and permissions

**Permissions:**

- `storage`: stores color history, palette, settings, and local entitlement.
- `activeTab`: provides temporary access to the user-selected page after an
  extension action.
- `scripting`: runs page-color extraction only after the user clicks Extract.
- No host permissions and no persistent content script.

**Disclosure checklist:**

- [ ] State that page-color extraction reads computed style colors from the active page only when the user requests it.
- [ ] State that colors, palette data, settings, and activation entitlement are stored locally.
- [ ] Link the live privacy policy, terms/refund policy, and support page.
- [ ] If external checkout is used, clearly identify the seller, price, refund terms, and payment processor.
- [ ] Confirm the Store dashboard privacy fields match the actual data handling.

## 6. Submission gate

- [ ] Manifest V3 and all permissions are justified by implemented features.
- [ ] No external code, `eval`, obfuscation, or unused broad permissions.
- [ ] No console errors in popup, service worker, or a tested webpage.
- [ ] Store description and screenshots describe only implemented functionality.
- [ ] The public privacy, support, terms, and refund URLs work in production.
- [ ] Verify the current Chrome Web Store payment and policy requirements before submitting.
