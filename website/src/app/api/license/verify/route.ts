import { NextRequest, NextResponse } from 'next/server';
import { verifyActivationToken } from '@/lib/license';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const verified = verifyActivationToken(token);

    if (!verified) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401, headers: corsHeaders }
      );
    }

    return NextResponse.json({ valid: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('License verification failed:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}
