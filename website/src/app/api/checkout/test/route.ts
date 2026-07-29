import { NextRequest, NextResponse } from 'next/server';
import { createCreemCheckout, CreemApiError, assertCreemEnv } from '@/lib/creem';

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  const url = new URL(request.url);
  const email = url.searchParams.get('email') || 'test@example.com';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, email, error: 'Invalid email address' },
      { status: 400 }
    );
  }

  const checks: Record<string, unknown> = {
    email,
    env: {
      CREEM_API_BASE_URL: process.env.CREEM_API_BASE_URL || null,
      CREEM_API_KEY_present: Boolean(process.env.CREEM_API_KEY),
      CREEM_PRODUCT_ID: process.env.CREEM_PRODUCT_ID || null,
      LICENSE_SECRET_present: Boolean(process.env.LICENSE_SECRET),
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    },
  };

  try {
    assertCreemEnv();
  } catch (e) {
    checks.env_ok = false;
    checks.env_error = e instanceof Error ? e.message : String(e);
    return NextResponse.json(checks, { status: 500 });
  }
  checks.env_ok = true;

  try {
    const checkout = await createCreemCheckout(email);
    const checkoutUrl = checkout.checkout_url || checkout.url;
    checks.api_key_valid = true;
    checks.product_id_valid = true;
    checks.checkout_url = checkoutUrl || null;
    checks.checkout_id = checkout.id || null;
    checks.raw = checkout;

    return NextResponse.json({
      ok: Boolean(checkoutUrl),
      ...checks,
    });
  } catch (e) {
    if (e instanceof CreemApiError) {
      checks.api_key_valid = e.status !== 401 && e.status !== 403;
      checks.product_id_valid = e.status !== 404;
      checks.creem_status = e.status;
      checks.creem_request_id = e.requestId;
      checks.creem_body = e.body;
      return NextResponse.json({ ok: false, ...checks }, { status: 502 });
    }
    checks.error = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, ...checks }, { status: 500 });
  }
}
