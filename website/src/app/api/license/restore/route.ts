import { NextRequest, NextResponse } from 'next/server';

const emailToTokenMap = new Map<string, string>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    const token = emailToTokenMap.get(email.toLowerCase());

    if (!token) {
      return NextResponse.json(
        { error: 'No license found for this email' },
        { status: 404 }
      );
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error('License restore failed:', error);
    return NextResponse.json(
      { error: 'Restore failed' },
      { status: 500 }
    );
  }
}

export function storeLicenseForRestore(email: string, token: string): void {
  emailToTokenMap.set(email.toLowerCase(), token);
}
