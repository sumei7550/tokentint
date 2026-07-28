import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/creem';
import { generateActivationToken } from '@/lib/license';

const processedOrders = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-creem-signature');
    const payload = await request.text();

    if (!signature || !verifyWebhookSignature(payload, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(payload);

    if (event.type === 'checkout.completed') {
      const { order_id, customer_email } = event.data;

      if (processedOrders.has(order_id)) {
        return NextResponse.json({ received: true });
      }

      processedOrders.add(order_id);

      const activationToken = generateActivationToken(customer_email, order_id);

      await sendActivationEmail(customer_email, activationToken);

      setTimeout(() => processedOrders.delete(order_id), 3600000);

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function sendActivationEmail(email: string, token: string): Promise<void> {
  console.log(`Activation token for ${email}: ${token}`);
  console.log(`Activation URL: ${process.env.NEXT_PUBLIC_SITE_URL}/success?token=${token}`);
}
