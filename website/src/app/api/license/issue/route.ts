import { NextRequest, NextResponse } from 'next/server';
import { verifyRedirectSignature } from '@/lib/creem';
import { generateActivationToken } from '@/lib/license';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const orderId = params.get('order_id');
  const customerId = params.get('customer_id');
  const productId = params.get('product_id');

  if (!verifyRedirectSignature(params)) {
    return NextResponse.json({ error: 'Invalid Creem payment signature' }, { status: 401 });
  }

  if (!orderId || !customerId || productId !== process.env.CREEM_PRODUCT_ID) {
    return NextResponse.json({ error: 'Invalid payment details' }, { status: 400 });
  }

  return NextResponse.json({ token: generateActivationToken(customerId, orderId) });
}
