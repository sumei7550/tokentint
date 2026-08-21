import { NextRequest, NextResponse } from 'next/server';
import { createCreemCheckout, CreemApiError } from '@/lib/creem';

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const checkout = await createCreemCheckout(email, locale === 'zh-CN' ? 'zh-CN' : 'en');
    const checkoutUrl = checkout.checkout_url || checkout.url;

    if (!checkoutUrl) {
      console.error('Creem returned no checkout_url', checkout);
      return NextResponse.json(
        {
          error: 'Checkout URL missing in Creem response',
          details: checkout,
        },
        { status: 502 }
      );
    }

    // Preserve the complete Creem response for callers that need checkout metadata.
    return NextResponse.json(checkout);
  } catch (error) {
    if (error instanceof CreemApiError) {
      console.error('Checkout creation failed (Creem API):', {
        status: error.status,
        requestId: error.requestId,
        body: error.body,
      });
      return NextResponse.json(
        {
          error: 'Failed to create checkout session',
          creem_status: error.status,
          creem_request_id: error.requestId,
          creem_body: error.body,
        },
        { status: 502 }
      );
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Checkout creation failed:', message);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: message },
      { status: 500 }
    );
  }
}
