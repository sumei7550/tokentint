import { NextRequest, NextResponse } from 'next/server';
import { createCreemCheckout } from '@/lib/creem';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const checkout = await createCreemCheckout(email);

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error('Checkout creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
