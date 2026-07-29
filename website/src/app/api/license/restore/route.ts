import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Automatic purchase restoration is not available. Contact support with your Creem order ID.' },
    { status: 410 }
  );
}
