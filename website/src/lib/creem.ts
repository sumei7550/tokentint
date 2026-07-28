import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET || '';

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn('CREEM_WEBHOOK_SECRET not set');
    return false;
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

export async function createCreemCheckout(email: string) {
  const CREEM_API_KEY = process.env.CREEM_API_KEY;
  const CREEM_PRODUCT_ID = process.env.CREEM_PRODUCT_ID;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tokentint.com';

  if (!CREEM_API_KEY || !CREEM_PRODUCT_ID) {
    throw new Error('Creem configuration missing');
  }

  const response = await fetch('https://api.creem.io/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CREEM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product_id: CREEM_PRODUCT_ID,
      customer_email: email,
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/pricing`
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const data = await response.json();
  return data;
}
