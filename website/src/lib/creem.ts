import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET || '';

export interface CreemCheckoutResponse {
  id?: string;
  checkout_url?: string;
  url?: string;
  [key: string]: unknown;
}

export class CreemApiError extends Error {
  status: number;
  body: unknown;
  requestId?: string;

  constructor(message: string, status: number, body: unknown, requestId?: string) {
    super(message);
    this.name = 'CreemApiError';
    this.status = status;
    this.body = body;
    this.requestId = requestId;
  }
}

export function assertCreemEnv() {
  const missing: string[] = [];
  if (!process.env.CREEM_API_KEY) missing.push('CREEM_API_KEY');
  if (!process.env.CREEM_PRODUCT_ID) missing.push('CREEM_PRODUCT_ID');
  if (!process.env.CREEM_API_BASE_URL) missing.push('CREEM_API_BASE_URL');
  if (!process.env.LICENSE_SECRET) missing.push('LICENSE_SECRET');
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn('CREEM_WEBHOOK_SECRET not set');
    return false;
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest('hex');

  const sigBuf = Buffer.from(signature);
  const digBuf = Buffer.from(digest);
  if (sigBuf.length !== digBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, digBuf);
}

export function verifyRedirectSignature(searchParams: URLSearchParams): boolean {
  const apiKey = process.env.CREEM_API_KEY;
  const signature = searchParams.get('signature');

  if (!apiKey || !signature) return false;

  const parts: string[] = [];
  for (const [key, value] of searchParams.entries()) {
    if (key === 'signature' || !value || value === 'null') continue;
    parts.push(`${key}=${value}`);
  }
  parts.sort();

  const expected = crypto
    .createHmac('sha256', apiKey)
    .update(parts.join('&'))
    .digest('hex');
  const expectedBuffer = Buffer.from(expected, 'utf8');
  const signatureBuffer = Buffer.from(signature, 'utf8');
  return expectedBuffer.length === signatureBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function createCreemCheckout(email: string): Promise<CreemCheckoutResponse> {
  assertCreemEnv();

  const CREEM_API_KEY = process.env.CREEM_API_KEY as string;
  const CREEM_PRODUCT_ID = process.env.CREEM_PRODUCT_ID as string;
  const CREEM_API_BASE_URL = (process.env.CREEM_API_BASE_URL as string).replace(/\/$/, '');
  const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tokentint.xyz').replace(/\/$/, '');

  const endpoint = `${CREEM_API_BASE_URL}/v1/checkouts`;

  const body = {
    product_id: CREEM_PRODUCT_ID,
    customer: { email },
    success_url: `${SITE_URL}/success`,
    metadata: { product: 'tokentint-pro' },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'x-api-key': CREEM_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const requestId =
    response.headers.get('x-request-id') ||
    response.headers.get('request-id') ||
    undefined;

  const rawText = await response.text();
  let parsed: unknown = rawText;
  try {
    parsed = rawText ? JSON.parse(rawText) : null;
  } catch {
    // keep as raw text
  }

  if (!response.ok) {
    const errorBody = {
      status: response.status,
      body: parsed,
      requestId,
    };
    console.error('Creem API Error', response.status, errorBody);
    throw new CreemApiError(
      `Creem checkout failed (${response.status})`,
      response.status,
      parsed,
      requestId
    );
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Creem returned an invalid checkout response');
  }

  return parsed as CreemCheckoutResponse;
}
