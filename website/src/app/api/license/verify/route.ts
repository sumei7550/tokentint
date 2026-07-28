import { NextRequest, NextResponse } from 'next/server';
import { verifyActivationToken } from '@/lib/license';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token required' },
        { status: 400 }
      );
    }

    const verified = verifyActivationToken(token);

    if (!verified) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('License verification failed:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
