'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';

export default function UpgradePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { locale } = useLanguage();
  const copy = locale === 'zh-CN' ? {
    title: '升级到 Pro',
    description: '一次性支付 15 美元，即可永久使用全部 Pro 功能。',
    email: '电子邮箱',
    processing: '正在跳转支付…',
    continue: '继续支付',
    secure: '由 Creem 提供安全支付服务',
    genericError: '发生错误，请重试。',
    checkoutError: '无法创建支付会话',
    emailRequired: '请输入电子邮箱地址。',
    emailInvalid: '请输入有效的电子邮箱地址。',
    emailPlaceholder: '请输入电子邮箱地址'
  } : {
    title: 'Upgrade to Pro',
    description: 'Get lifetime access to all Pro features for a one-time payment of $15.',
    email: 'Email Address',
    processing: 'Processing...',
    continue: 'Continue to Payment',
    secure: 'Secure payment powered by Creem',
    genericError: 'Something went wrong. Please try again.',
    checkoutError: 'Failed to create checkout session',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    emailPlaceholder: 'your@email.com'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(copy.emailRequired);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.emailInvalid);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale })
      });

      const data = await response.json();
      const checkoutUrl = data.checkout_url || data.url;

      if (response.ok && checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        const detail =
          (data && (data.error as string)) ||
          copy.checkoutError;
        setError(detail);
        console.error('Checkout response error:', data);
      }
    } catch (err) {
      setError(copy.genericError);
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
            <h2>{copy.title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              {copy.description}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">{copy.email}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.emailPlaceholder}
                  required
                  disabled={loading}
                />
              </div>

              {error && <p className="error">{error}</p>}

              <button type="submit" className="btn" disabled={loading}>
                {loading ? copy.processing : copy.continue}
              </button>
            </form>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '24px', textAlign: 'center' }}>
              {copy.secure}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
