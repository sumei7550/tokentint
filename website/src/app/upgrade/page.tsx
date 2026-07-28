'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function UpgradePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Failed to create checkout session');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div className="card">
            <h2>Upgrade to Pro</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Get lifetime access to all Pro features for a one-time payment of $15.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>

              {error && <p className="error">{error}</p>}

              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '24px', textAlign: 'center' }}>
              Secure payment powered by Creem
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
