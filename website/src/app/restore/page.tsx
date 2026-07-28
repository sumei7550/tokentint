'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RestorePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/license/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setMessage('License found! Check your email for the activation token.');
      } else {
        setError(data.error || 'No license found for this email address.');
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
            <h2>Restore Purchase</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Enter the email address you used to purchase TokenTint Pro and we'll resend your activation token.
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
              {message && <p className="success">{message}</p>}

              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Searching...' : 'Restore License'}
              </button>
            </form>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '24px', textAlign: 'center' }}>
              Need help? <a href="/support" style={{ color: 'var(--primary)' }}>Contact support</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
