import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const SECRET = process.env.LICENSE_SECRET || '';

if (!SECRET) {
  console.warn('LICENSE_SECRET not set - using default (insecure for production)');
}

export function generateActivationToken(email: string, orderId: string): string {
  const payload = JSON.stringify({
    customerId: email,
    orderId
  });

  // Derive a stable IV from the purchase identifiers so a verified payment
  // always receives the same token without requiring a database.
  const iv = crypto
    .createHmac('sha256', Buffer.from(SECRET, 'hex'))
    .update(`tokentint-license:${email}:${orderId}`)
    .digest()
    .subarray(0, 16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET, 'hex'), iv);

  let encrypted = cipher.update(payload, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return Buffer.from(
    JSON.stringify({
      iv: iv.toString('hex'),
      data: encrypted,
      tag: authTag.toString('hex')
    })
  ).toString('base64url');
}

export function verifyActivationToken(token: string): { customerId: string; orderId: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const { iv, data, tag } = JSON.parse(decoded);

    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(SECRET, 'hex'),
      Buffer.from(iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    const payload = JSON.parse(decrypted);

    return {
      customerId: payload.customerId,
      orderId: payload.orderId
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
