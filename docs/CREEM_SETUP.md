# Creem Setup Guide

## Overview

TokenTint uses [Creem](https://creem.io) for payment processing. This guide covers setup for sandbox (testing) and production.

## Prerequisites

1. Creem account: [Sign up](https://creem.io/signup)
2. Product created in Creem dashboard
3. Webhook endpoint configured

## Step 1: Create Product

1. Log into Creem dashboard
2. Go to **Products** → **Create Product**
3. Fill in:
   - **Name:** TokenTint Pro
   - **Price:** $15 USD
   - **Type:** One-time purchase
   - **Description:** Lifetime access to TokenTint Pro features

4. Save and note the **Product ID** (starts with `prod_`)

## Step 2: Get API Keys

### Sandbox (Testing)

1. Go to **Developers** → **API Keys**
2. Copy **Sandbox API Key** (starts with `sk_test_`)
3. Copy **Sandbox Webhook Secret** (starts with `whsec_test_`)

### Production

1. Switch to **Production** mode
2. Copy **Production API Key** (starts with `sk_live_`)
3. Copy **Production Webhook Secret** (starts with `whsec_live_`)

## Step 3: Generate License Secret

The license secret is used to encrypt activation tokens. Generate a secure random key:

```bash
# Using OpenSSL
openssl rand -hex 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output (64 hex characters).

## Step 4: Configure Environment Variables

Create `.env.local` in the `website/` directory:

```bash
# Creem credentials
CREEM_API_KEY=sk_test_your_sandbox_key_here
CREEM_WEBHOOK_SECRET=whsec_test_your_webhook_secret_here
CREEM_PRODUCT_ID=prod_your_product_id_here

# License encryption
LICENSE_SECRET=your_64_char_hex_secret_from_step_3

# Environment
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**For production:**
```bash
CREEM_API_KEY=sk_live_your_production_key_here
CREEM_WEBHOOK_SECRET=whsec_live_your_production_secret_here
CREEM_PRODUCT_ID=prod_your_product_id_here
LICENSE_SECRET=your_64_char_hex_secret
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://tokentint.com
```

## Step 5: Configure Webhook

1. In Creem dashboard, go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. Fill in:
   - **URL:** `https://tokentint.com/api/webhook` (or your domain)
   - **Events:** Select `checkout.completed`
   - **Version:** Latest
4. Save

**For local testing:**
- Use [ngrok](https://ngrok.com) to expose localhost:
  ```bash
  ngrok http 3000
  ```
- Add webhook URL: `https://your-ngrok-url.ngrok.io/api/webhook`

## Step 6: Test Sandbox Payment

1. Start website locally:
   ```bash
   cd website
   npm run dev
   ```

2. Visit `http://localhost:3000/upgrade`

3. Enter test email: `test@example.com`

4. Use Creem test card:
   - **Card:** `4242 4242 4242 4242`
   - **Expiry:** Any future date
   - **CVC:** Any 3 digits

5. Complete checkout

6. Check terminal logs for:
   ```
   Activation token for test@example.com: eyJp...
   ```

7. Copy token and test in extension

## Step 7: Verify Webhook

After test purchase, verify webhook was received:

1. Check terminal for:
   ```
   Webhook received: checkout.completed
   Activation token generated: eyJp...
   ```

2. If not received:
   - Check webhook URL is accessible
   - Check signature verification passes
   - Check Creem dashboard webhook logs

## Step 8: Test Token Verification

```bash
# Test verify endpoint
curl -X POST http://localhost:3000/api/license/verify \
  -H "Content-Type: application/json" \
  -d '{"token":"YOUR_TOKEN_HERE"}'

# Expected response
{"valid":true}
```

## Step 9: Test Restore Flow

1. Visit `http://localhost:3000/restore`
2. Enter email used for test purchase
3. Should receive existing token
4. Verify token works in extension

## Production Deployment

### Vercel Deployment

1. Push code to GitHub

2. Connect repository to Vercel

3. Add environment variables in Vercel dashboard:
   - `CREEM_API_KEY`
   - `CREEM_WEBHOOK_SECRET`
   - `CREEM_PRODUCT_ID`
   - `LICENSE_SECRET`
   - `NEXT_PUBLIC_SITE_URL`

4. Deploy

5. Update webhook URL in Creem:
   - Change to production URL
   - Use production webhook secret

### DNS Setup

1. Add domain in Vercel
2. Point DNS to Vercel:
   - **Type:** A
   - **Name:** @
   - **Value:** `76.76.21.21`
3. Wait for DNS propagation (up to 48 hours)

## Security Checklist

- [ ] Webhook signature verification enabled
- [ ] LICENSE_SECRET is random 32 bytes
- [ ] Environment variables not committed to git
- [ ] HTTPS enabled in production
- [ ] Webhook URL only accepts POST
- [ ] Order ID deduplication implemented
- [ ] Rate limiting on public endpoints (optional)

## Troubleshooting

### Webhook not receiving events

**Check:**
1. Webhook URL is publicly accessible
2. Webhook secret matches environment variable
3. Event type `checkout.completed` is selected
4. Creem dashboard shows webhook attempts

**Debug:**
```typescript
// In webhook route.ts, add logging:
console.log('Webhook headers:', request.headers);
console.log('Webhook body:', payload);
console.log('Signature match:', verified);
```

### Token verification fails

**Check:**
1. LICENSE_SECRET matches between generation and verification
2. Token hasn't been truncated (copy/paste issue)
3. Token is base64url encoded (not base64)

**Debug:**
```typescript
// In license.ts verifyActivationToken:
console.log('Token:', token);
console.log('Decoded:', decoded);
console.log('Payload:', payload);
```

### Creem checkout fails

**Check:**
1. CREEM_API_KEY is correct
2. CREEM_PRODUCT_ID exists
3. Product is active in Creem dashboard
4. Network connectivity to Creem API

**Debug:**
```typescript
// In creem.ts:
console.log('API Key:', CREEM_API_KEY?.substring(0, 10) + '...');
console.log('Product ID:', CREEM_PRODUCT_ID);
console.log('Response:', response.status, await response.text());
```

## Testing Checklist

- [ ] Sandbox payment completes
- [ ] Webhook receives event
- [ ] Activation token generated
- [ ] Token verifies successfully
- [ ] Extension activates Pro features
- [ ] Restore flow retrieves existing token
- [ ] Multiple devices can use same token
- [ ] Offline activation works after first verify

## Production Launch

1. Switch Creem to **Production** mode
2. Update environment variables to production keys
3. Test with real payment (small amount)
4. Verify end-to-end flow
5. Monitor webhook success rate
6. Check for error logs

## Support

**Creem Documentation:** https://docs.creem.io  
**Creem Support:** support@creem.io  
**TokenTint Issues:** (Your support channel)

## Cost Estimate

**Creem Fees:**
- Transaction fee: 5% + $0.30 per transaction
- No monthly fees
- No setup fees

**Example:**
- Sale price: $15.00
- Creem fee: $1.25
- Net revenue: $17.75

## Alternatives to Creem

If Creem doesn't work for your region:

1. **Stripe** - Global, more complex setup
2. **Paddle** - Merchant of record, handles VAT
3. **Gumroad** - Simple, higher fees
4. **Lemon Squeezy** - Stripe alternative

TokenTint's payment integration is designed to be provider-agnostic. You'll need to:
1. Update `website/src/lib/creem.ts` to new provider
2. Update webhook handler
3. Keep token generation/verification logic
