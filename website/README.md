# Website

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in required values (see [CREEM_SETUP.md](../docs/CREEM_SETUP.md))

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

```bash
vercel
```

Or push to GitHub and connect repository to Vercel dashboard.

## Pages

- `/` - Landing
- `/pricing` - Pricing table
- `/upgrade` - Checkout
- `/success` - Post-purchase
- `/restore` - License restore
- `/privacy` - Privacy policy
- `/terms` - Terms
- `/refunds` - Refund policy
- `/support` - Support

## API Routes

- `/api/checkout` - Create Creem session
- `/api/webhook` - Creem webhook handler
- `/api/license/verify` - Verify token
- `/api/license/restore` - Restore purchase
