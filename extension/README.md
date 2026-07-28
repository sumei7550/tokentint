# Extension

## Development

```bash
npm install
npm run dev
```

Load unpacked extension from `dist/` directory.

## Build

```bash
npm run build
```

## Package for Chrome Web Store

```bash
cd dist
zip -r ../tokentint-v1.0.0.zip .
```

## Structure

```
src/
├── background/    # Service worker
├── popup/         # Main UI
├── content/       # Content script
├── utils/         # Shared utilities
└── types/         # TypeScript types
```
