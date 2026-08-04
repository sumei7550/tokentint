# TokenTint Chrome Web Store submission package

Checked: 2026-08-03

## Build status

- `extension`: `npm run type-check` passed.
- `extension`: `npm run build` passed.
- Upload package: `extension/tokentint-v1.0.0.zip`.
- The ZIP contains the contents of `dist`, not the `dist` parent folder.
- Website build could not be verified in this workspace because `website/node_modules` is not installed (`next` was not found). Deploy the website and verify the URLs before submission.

## Store listing

Name: TokenTint – Color Picker & Design Tokens

Short description:

> Pick colors from webpages, save palettes, copy HEX/RGB/HSL, and export CSS, Tailwind, or W3C design tokens.

Long description:

> TokenTint is a focused color tool for designers and developers working in Chrome.
>
> Pick a color from your screen with the EyeDropper API, copy HEX, RGB, or HSL values, and keep a local history of up to 20 colors. Add colors to a project palette and export CSS Variables.
>
> Pro adds multiple project palettes, Tailwind Config and W3C Design Tokens exports, and on-demand extraction of key computed colors from the active webpage.
>
> Your color history, palettes, and settings stay in Chrome local storage. TokenTint has no analytics or advertising. The extension only reads the active page when you explicitly use Extract Page Colors.
>
> Some Pro features require a one-time purchase. Payment is handled on the TokenTint website by Creem. See the privacy policy, terms, and refund policy before purchasing.

Suggested category: Productivity

Language: English

Website: https://www.tokentint.xyz
Support URL: https://www.tokentint.xyz/support
Privacy URL: https://www.tokentint.xyz/privacy

## Privacy tab values

- Single purpose: Color picking, palette organization, and design-token export.
- User data: Yes. Disclose local color/palette/settings data and purchase/license data.
- Personal data: Email address, only for Pro purchase, license activation, or purchase restoration.
- Website content: Computed style colors from the active tab, only after the user clicks Extract Page Colors; not uploaded to our server.
- Purpose: Core extension functionality and license delivery/restoration.
- Sharing: Purchase information is handled by Creem, the payment processor; no sale, advertising, or analytics.
- Authentication information: Activation token is sent only to verify a Pro license and is stored locally for entitlement state.
- Data deletion: Users can clear extension data in Chrome; purchase/license requests are transient and not retained as a user account.
- Limited Use certification: certify only after confirming the dashboard answers match the live privacy policy and deployed behavior.

## Permissions explanations

- `storage`: saves color history, palettes, settings, and local entitlement.
- `activeTab`: temporary access to the selected tab for the user-requested extraction action.
- `scripting`: runs the extraction function only after the user clicks Extract Page Colors.

## Graphics

- Store icon: `extension/public/icons/icon128.png`
- Small promotional tile: `extension/store-assets/promotional-tile-440x280.png`
- Marquee image: `extension/store-assets/promotional-marquee-1400x560.png`
- Screenshots: capture from the built extension at 1280x800 or 640x400. Do not use generated artwork as a screenshot. Recommended real screenshots: popup/history, picker on a webpage, project palette, CSS export, and Pro extraction.

## Final blockers before submission

1. Deploy the website and verify privacy, support, terms, and refunds URLs return 200 over HTTPS.
2. Capture and review at least one real extension screenshot; ideally upload 3–5 current screenshots.
3. Manually load `extension/dist` in Chrome and test picker, history, palette, CSS export, extraction error on restricted pages, English/Chinese UI, and light/dark themes.
4. Confirm the live Creem account, webhook, production URL, refund terms, and license activation flow.
5. Enable 2-Step Verification on the Chrome Web Store developer account.

References: Chrome Web Store publishing, listing, privacy, and policy documentation: https://developer.chrome.com/docs/webstore/publish, https://developer.chrome.com/docs/webstore/cws-dashboard-listing/, https://developer.chrome.com/docs/webstore/user_data, https://developer.chrome.com/docs/webstore/program-policies/policies
