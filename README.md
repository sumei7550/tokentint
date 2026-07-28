# TokenTint

**Pick colors. Ship tokens.**

A Chrome Extension for color picking and design token management.

## Features

### Free
- 🎨 Pick colors with EyeDropper API
- 📋 Copy in HEX/RGB/HSL formats
- 📜 20-color history
- 🎯 Single project palette
- 📤 CSS Variables export
- 🌓 Dark/light mode
- ♿ Full keyboard navigation

### Pro (one-time purchase)
- 🔍 Extract key colors from any page
- 📁 Multiple project palettes
- 🎨 Tailwind config export
- 📐 W3C Design Tokens export
- ✅ WCAG contrast checker
- 💾 Backup import/export

## Development

### Extension

```bash
cd extension
npm install
npm run dev      # Development build with watch
npm run build    # Production build
```

Load `extension/dist` in Chrome as unpacked extension.

### Website

```bash
cd website
npm install
npm run dev      # Local development
npm run build    # Production build
```

## Project Structure

```
tokentint/
├── extension/          # Chrome Extension (MV3)
├── website/           # Next.js payment site
└── docs/              # Documentation
```

## Environment Setup

See [CREEM_SETUP.md](docs/CREEM_SETUP.md) for payment integration.

## Documentation

- [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) - Product specification
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical architecture
- [PRIVACY_DATA_MAP.md](docs/PRIVACY_DATA_MAP.md) - Privacy compliance
- [CHROME_WEB_STORE_CHECKLIST.md](docs/CHROME_WEB_STORE_CHECKLIST.md) - Store submission guide
- [LOCALIZATION_GUIDE.md](docs/LOCALIZATION_GUIDE.md) - i18n guide
- [MANUAL_QA_CHECKLIST.md](docs/MANUAL_QA_CHECKLIST.md) - QA checklist

## License

Proprietary - One-time Pro purchase available

## Support

Visit https://tokentint.com/support for help.
