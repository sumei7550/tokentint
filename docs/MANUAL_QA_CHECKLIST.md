# Manual QA Checklist

## Test Environment Setup

- [ ] Chrome version 95+ (for EyeDropper API)
- [ ] Load extension unpacked from `dist/`
- [ ] Test in both light and dark mode
- [ ] Test with different locales (en, zh_CN)

## Free Features Testing

### Pick Color

**Test: Basic Color Picking**
- [ ] Click "Pick Color" button
- [ ] Cursor changes to eyedropper
- [ ] Select a color from screen
- [ ] Color appears in history
- [ ] Color value is correct hex format (#RRGGBB)
- [ ] Timestamp is recorded

**Test: Cancellation**
- [ ] Click "Pick Color"
- [ ] Press ESC
- [ ] No color added to history
- [ ] No error message shown

**Test: Keyboard Shortcut**
- [ ] Press Ctrl+P (or Cmd+P on Mac)
- [ ] Color picker opens
- [ ] Works same as button click

### Color Formats

**Test: Format Switching**
- [ ] Pick a color
- [ ] Change format to RGB
- [ ] Value displays as `rgb(r, g, b)`
- [ ] Change format to HSL
- [ ] Value displays as `hsl(h, s%, l%)`
- [ ] Change back to HEX
- [ ] Value displays as `#RRGGBB`
- [ ] All conversions are accurate

**Test: Format Persistence**
- [ ] Select RGB format
- [ ] Close popup
- [ ] Reopen popup
- [ ] RGB format is still selected

### Copy to Clipboard

**Test: Copy Color**
- [ ] Click copy button on color card
- [ ] Toast shows "Copied to clipboard"
- [ ] Paste into text editor
- [ ] Correct color value is pasted

**Test: Copy Different Formats**
- [ ] Switch to RGB format
- [ ] Copy color
- [ ] RGB value is copied
- [ ] Switch to HSL
- [ ] Copy color
- [ ] HSL value is copied

### Color History

**Test: History Limit**
- [ ] Pick 25 colors
- [ ] Only last 20 are shown
- [ ] Oldest colors removed automatically

**Test: Duplicate Colors**
- [ ] Pick same color twice
- [ ] Second pick moves color to top
- [ ] No duplicate entries

**Test: Clear History**
- [ ] Pick several colors
- [ ] Click "Clear History"
- [ ] Confirmation dialog appears
- [ ] Click OK
- [ ] All colors removed
- [ ] "No history yet" message shown

**Test: Cancel Clear**
- [ ] Click "Clear History"
- [ ] Click Cancel
- [ ] Colors remain

### Single Project

**Test: Add to Project**
- [ ] Pick a color
- [ ] Click "+" button in history
- [ ] Color appears in project section
- [ ] Color persists after closing popup

**Test: Remove from Project**
- [ ] Add color to project
- [ ] Click trash icon
- [ ] Color removed from project
- [ ] History unaffected

**Test: Duplicate Prevention**
- [ ] Add color to project
- [ ] Try adding same color again
- [ ] No duplicate created

**Test: Project Persistence**
- [ ] Add several colors to project
- [ ] Close popup
- [ ] Reopen popup
- [ ] All colors still in project

### CSS Variables Export

**Test: Export Empty Project**
- [ ] Empty project
- [ ] Click "CSS Variables"
- [ ] File downloads
- [ ] Contains only `:root {}`

**Test: Export with Colors**
- [ ] Add 3 colors to project
- [ ] Click "CSS Variables"
- [ ] File downloads as `.css`
- [ ] Open file
- [ ] Contains `:root { --color-1: #...; }`
- [ ] All colors present
- [ ] Valid CSS syntax

**Test: Color Names in Export**
- [ ] Add color named "Primary Blue"
- [ ] Export CSS
- [ ] Variable is `--primary-blue`
- [ ] Spaces converted to hyphens
- [ ] Lowercase

### Theme Switching

**Test: Theme Toggle**
- [ ] Click theme icon
- [ ] Theme switches light ↔ dark
- [ ] All colors readable
- [ ] Icons visible
- [ ] No contrast issues

**Test: Theme Persistence**
- [ ] Switch to dark mode
- [ ] Close popup
- [ ] Reopen popup
- [ ] Still in dark mode

**Test: System Theme**
- [ ] Set system to dark mode
- [ ] Open extension (first time)
- [ ] Extension uses dark mode
- [ ] Change system to light
- [ ] Extension updates (after toggle to "system")

### Keyboard Navigation

**Test: Tab Order**
- [ ] Press Tab repeatedly
- [ ] Focus moves through all interactive elements
- [ ] Focus indicator visible
- [ ] Order is logical (top to bottom)

**Test: Enter/Space Activation**
- [ ] Tab to button
- [ ] Press Enter
- [ ] Button activates
- [ ] Tab to button
- [ ] Press Space
- [ ] Button activates

**Test: Escape Key**
- [ ] Open extension
- [ ] Press ESC
- [ ] Popup closes

## Pro Features Testing

### License Activation

**Test: Upgrade Prompt (Free User)**
- [ ] Click "Extract Colors" (not activated)
- [ ] Redirects to upgrade page
- [ ] URL is correct (tokentint.com/upgrade)

**Test: Token Activation**
- [ ] Get test activation token
- [ ] Open settings
- [ ] Paste token
- [ ] Click "Activate"
- [ ] Success message shown
- [ ] Pro features unlocked

**Test: Invalid Token**
- [ ] Paste invalid token
- [ ] Click "Activate"
- [ ] Error message shown
- [ ] Pro features still locked

**Test: Offline Pro**
- [ ] Activate Pro
- [ ] Disconnect internet
- [ ] Close and reopen extension
- [ ] Pro features still work

### Extract Page Colors

**Test: Basic Extraction**
- [ ] Navigate to colorful website (e.g., Stripe.com)
- [ ] Click "Extract Page Colors"
- [ ] Loading indicator shows
- [ ] Colors appear in history
- [ ] 1-20 colors extracted
- [ ] Colors are from the page

**Test: Permission Prompt**
- [ ] First extraction on a page
- [ ] ActiveTab permission may prompt
- [ ] Accept permission
- [ ] Extraction completes

**Test: Color Deduplication**
- [ ] Extract from page with repeated colors
- [ ] Similar colors merged
- [ ] No exact duplicates

**Test: Empty Page**
- [ ] Navigate to blank page (about:blank)
- [ ] Click "Extract Colors"
- [ ] Minimal colors extracted (black, white)
- [ ] No errors

### Multiple Projects

**Test: Create Project**
- [ ] Open project dropdown
- [ ] Click "New Project"
- [ ] Enter name
- [ ] Project created
- [ ] Appears in dropdown

**Test: Switch Projects**
- [ ] Create two projects
- [ ] Add colors to first
- [ ] Switch to second project
- [ ] Empty project shown
- [ ] Add colors to second
- [ ] Switch back to first
- [ ] Original colors shown

**Test: Delete Project**
- [ ] Create project
- [ ] Click delete
- [ ] Confirmation dialog
- [ ] Confirm
- [ ] Project removed

**Test: Last Project Protection**
- [ ] Delete all projects except one
- [ ] Try to delete last project
- [ ] Not allowed (or creates default project)

### Tailwind Export

**Test: Export Format**
- [ ] Add colors to project
- [ ] Click "Tailwind Config"
- [ ] File downloads as `tailwind.config.js`
- [ ] Open file
- [ ] Valid JavaScript syntax
- [ ] Contains `theme.extend.colors`
- [ ] All colors present

**Test: Color Key Naming**
- [ ] Add "Primary Color"
- [ ] Export Tailwind
- [ ] Key is `primaryColor` (camelCase)

### W3C Tokens Export

**Test: W3C Format**
- [ ] Add colors to project
- [ ] Click "W3C Tokens"
- [ ] File downloads as `.tokens.json`
- [ ] Open file
- [ ] Valid JSON
- [ ] Has `color` object
- [ ] Each color has `$value` and `$type`
- [ ] `$type` is `"color"`

**Test: Spec Compliance**
- [ ] Check format matches W3C spec
- [ ] Uses `$value` (not `value`)
- [ ] Uses `$type` (not `type`)
- [ ] No custom fields at token level

### WCAG Contrast Checker

**Test: Contrast Calculation**
- [ ] Select two colors
- [ ] View contrast ratio
- [ ] Ratio is numeric (e.g., 4.5:1)
- [ ] Calculation is accurate

**Test: WCAG Pass/Fail**
- [ ] Check high contrast pair (white on black)
- [ ] Shows "AA" and "AAA" passes
- [ ] Check low contrast pair
- [ ] Shows fails
- [ ] Check medium contrast
- [ ] Accurate AA/AAA determination

**Test: Text Size Consideration**
- [ ] Toggle "Large text"
- [ ] Thresholds adjust (AA: 3:1 for large)
- [ ] Toggle back to normal
- [ ] Thresholds return (AA: 4.5:1)

### Backup Import/Export

**Test: Export Data**
- [ ] Add colors, projects, settings
- [ ] Click "Export Data"
- [ ] JSON file downloads
- [ ] Open file
- [ ] Contains `version`, `projects`, `colorHistory`, `settings`, `entitlement`
- [ ] Data is readable JSON

**Test: Import Data**
- [ ] Export data to file
- [ ] Clear all data
- [ ] Click "Import Data"
- [ ] Select exported file
- [ ] All data restored
- [ ] Projects match
- [ ] History matches
- [ ] Settings match

**Test: Import Invalid File**
- [ ] Click "Import"
- [ ] Select non-JSON file
- [ ] Error message shown
- [ ] No data corrupted

**Test: Import Old Version**
- [ ] Manually create v0 JSON
- [ ] Import
- [ ] Migration runs
- [ ] Data upgraded to current version

## Cross-Browser Testing

### Chrome Versions

- [ ] Chrome 95 (minimum for EyeDropper)
- [ ] Chrome latest stable
- [ ] Chrome Beta (optional)

### Edge (Chromium)

- [ ] Install on Edge
- [ ] Basic functionality works
- [ ] EyeDropper API available

### Brave

- [ ] Install on Brave
- [ ] Check for compatibility issues
- [ ] EyeDropper may need flag

## Localization Testing

### English (en)

- [ ] All text in English
- [ ] No missing translations
- [ ] No typos

### Chinese Simplified (zh_CN)

- [ ] Set Chrome language to Chinese
- [ ] Restart Chrome
- [ ] Extension displays Chinese
- [ ] All UI text translated
- [ ] Layout doesn't break

### Partial Locales

- [ ] Set Chrome to Japanese
- [ ] Extension name/description in Japanese
- [ ] UI falls back to English

## Performance Testing

**Test: Extension Load Time**
- [ ] Open extension (first time)
- [ ] Loads < 100ms
- [ ] No visible lag

**Test: Color Pick Latency**
- [ ] Click "Pick Color"
- [ ] EyeDropper opens < 50ms
- [ ] Feels instant

**Test: Extract Colors Duration**
- [ ] Navigate to heavy page
- [ ] Click "Extract Colors"
- [ ] Completes < 2s
- [ ] Shows loading indicator

**Test: Large History**
- [ ] Add 20 colors to history
- [ ] Scroll through history
- [ ] No lag
- [ ] Smooth scrolling

**Test: Memory Usage**
- [ ] Open Chrome Task Manager
- [ ] Find extension process
- [ ] Check memory usage
- [ ] Should be < 50MB

## Error Handling

**Test: Network Offline (Free)**
- [ ] Disconnect internet
- [ ] Use all free features
- [ ] Everything works (local-first)

**Test: Network Offline (Pro Activation)**
- [ ] Disconnect internet
- [ ] Try to activate license
- [ ] Error message shown
- [ ] Clear explanation

**Test: API Error**
- [ ] Invalid activation token
- [ ] Server error response
- [ ] User sees friendly error
- [ ] Extension doesn't crash

**Test: Storage Full**
- [ ] Fill chrome.storage.local (difficult)
- [ ] Try to save color
- [ ] Error handled gracefully

**Test: Permission Denied**
- [ ] Deny activeTab permission
- [ ] Try to extract colors
- [ ] Error message explains
- [ ] Can retry

## Security Testing

**Test: XSS Prevention**
- [ ] Add project named `<script>alert('xss')</script>`
- [ ] View project
- [ ] Script doesn't execute
- [ ] Name shown as text

**Test: Token Storage**
- [ ] Activate Pro
- [ ] Open Chrome DevTools
- [ ] Check localStorage
- [ ] Token is in chrome.storage.local (not accessible from pages)

**Test: HTTPS Only (Website)**
- [ ] Visit http://tokentint.com
- [ ] Redirects to https://
- [ ] Or shows https:// by default

**Test: CSP Compliance**
- [ ] Open console
- [ ] No CSP violations
- [ ] No inline scripts
- [ ] No unsafe-eval

## Edge Cases

**Test: Very Long Color Names**
- [ ] Create project with 100-character name
- [ ] UI handles gracefully
- [ ] Text truncates or wraps
- [ ] No layout break

**Test: Special Characters**
- [ ] Project name with emoji: "🎨 Colors"
- [ ] Saves correctly
- [ ] Displays correctly
- [ ] Exports correctly

**Test: Rapid Clicking**
- [ ] Click "Pick Color" repeatedly
- [ ] No crashes
- [ ] Multiple pickers don't open
- [ ] Handles gracefully

**Test: Simultaneous Actions**
- [ ] Pick color while extracting
- [ ] Export while picking
- [ ] No race conditions
- [ ] No crashes

## Regression Testing

After any code change, re-test:

- [ ] Pick color (core feature)
- [ ] Add to project
- [ ] Export CSS
- [ ] Extract colors (Pro)
- [ ] Theme switching
- [ ] Data persistence

## Device Testing

**Resolutions:**
- [ ] 1920x1080 (standard)
- [ ] 1366x768 (laptop)
- [ ] 3840x2160 (4K)
- [ ] 2560x1440 (2K)

**DPI Scaling:**
- [ ] 100% scale
- [ ] 125% scale
- [ ] 150% scale
- [ ] Popup dimensions correct
- [ ] Icons sharp

## Final Checklist

Before release:

- [ ] All critical bugs fixed
- [ ] All tests pass
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Documentation updated
- [ ] Version number incremented
- [ ] Changelog written

## Bug Report Template

When issues found:

```
**Issue:** [Brief description]
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected:** [What should happen]
**Actual:** [What actually happened]
**Environment:**
- Chrome version:
- Extension version:
- OS:
- Locale:

**Screenshots:** [If applicable]
**Console Errors:** [If any]
```

## Test Data

**Test Colors:**
- `#635BFF` (primary)
- `#22D3C5` (teal)
- `#FF6B9D` (pink)
- `#10131A` (dark bg)
- `#FFFFFF` (white)
- `#000000` (black)

**Test Websites for Extraction:**
- https://stripe.com (colorful, modern)
- https://github.com (minimal colors)
- https://www.google.com (simple)
- https://tailwindcss.com (design system)

**Test Activation Token:**
(Generate via Creem sandbox or test endpoint)
