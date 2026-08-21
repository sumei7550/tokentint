import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/creem';
import { generateActivationToken } from '@/lib/license';

type CheckoutCompletedEvent = {
  eventType?: string;
  object?: {
    customer?: { id?: string; email?: string };
    order?: { id?: string };
    product?: { id?: string };
  };
};

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('creem-signature');

  if (!signature || !verifyWebhookSignature(payload, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  try {
    const event = JSON.parse(payload) as CheckoutCompletedEvent;
    if (event.eventType !== 'checkout.completed') {
      return NextResponse.json({ received: true });
    }

    const customerId = event.object?.customer?.id;
    const orderId = event.object?.order?.id;
    const productId = event.object?.product?.id;

    if (!customerId || !orderId || productId !== process.env.CREEM_PRODUCT_ID) {
      console.error('Invalid checkout.completed webhook event');
      return NextResponse.json({ error: 'Invalid checkout payload' }, { status: 400 });
    }

    const token = generateActivationToken(customerId, orderId);
    console.log('TokenTint activation token issued');

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
