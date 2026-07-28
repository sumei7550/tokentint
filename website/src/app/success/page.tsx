'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      alert('Activation token copied!');
    }
  };

  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
            <h2>Payment Successful!</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', marginBottom: '32px' }}>
              Thank you for upgrading to TokenTint Pro!
            </p>

            {token ? (
              <>
                <div style={{
                  background: 'var(--bg-secondary)',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}>
                  {token}
                </div>

                <button onClick={copyToken} className="btn" style={{ marginBottom: '24px' }}>
                  Copy Activation Token
                </button>

                <div style={{ textAlign: 'left', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '8px' }}>
                  <h3 style={{ marginBottom: '16px' }}>How to activate:</h3>
                  <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                    <li style={{ marginBottom: '12px' }}>Open the TokenTint extension in Chrome</li>
                    <li style={{ marginBottom: '12px' }}>Click the settings icon</li>
                    <li style={{ marginBottom: '12px' }}>Paste your activation token</li>
                    <li style={{ marginBottom: '12px' }}>Enjoy all Pro features!</li>
                  </ol>
                </div>
              </>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>
                Your activation token has been sent to your email address.
                Check your inbox and follow the instructions to activate Pro.
              </p>
            )}

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '32px' }}>
              Need help? <a href="/support" style={{ color: 'var(--primary)' }}>Contact support</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
