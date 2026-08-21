'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage, localizedPath } from '@/components/LanguageProvider';

export default function SuccessPage() {
  const { locale } = useLanguage();
  const zh = locale === 'zh-CN';
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const issueToken = async () => {
      const response = await fetch(`/api/license/issue${window.location.search}`);
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
      } else {
        setError(data.error || (zh ? '无法验证这笔付款。' : 'We could not verify this payment.'));
      }
    };

    void issueToken();
  }, []);

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      alert(zh ? '激活令牌已复制！' : 'Activation token copied!');
    }
  };

  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>&#10003;</div>
            <h2>{zh ? '付款成功！' : 'Payment Successful!'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', marginBottom: '32px' }}>
              {zh ? '感谢你升级到 TokenTint Pro！' : 'Thank you for upgrading to TokenTint Pro!'}
            </p>

            {token ? (
              <>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '24px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '14px' }}>
                  {token}
                </div>
                <button onClick={copyToken} className="btn" style={{ marginBottom: '24px' }}>
                  {zh ? '复制激活令牌' : 'Copy Activation Token'}
                </button>
                <div style={{ textAlign: 'left', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '8px' }}>
                  <h3 style={{ marginBottom: '16px' }}>{zh ? '如何激活：' : 'How to activate:'}</h3>
                  <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                    <li style={{ marginBottom: '12px' }}>{zh ? '在 Chrome 中打开 TokenTint 扩展' : 'Open the TokenTint extension in Chrome'}</li>
                    <li style={{ marginBottom: '12px' }}>{zh ? '将令牌粘贴到激活 Pro 区域' : 'Paste the token into the Activate Pro section'}</li>
                    <li style={{ marginBottom: '12px' }}>{zh ? '点击激活令牌' : 'Select Activate Token'}</li>
                  </ol>
                </div>
              </>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>
                {error ? `${error} ${zh ? '请提供 Creem 订单号联系支持。' : 'Please contact support with your Creem order ID.'}` : (zh ? '正在验证付款并生成激活令牌……' : 'Verifying your payment and generating your activation token...')}
              </p>
            )}
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '32px' }}>
              {zh ? '需要帮助？' : 'Need help?'} <a href={localizedPath('/support', locale)} style={{ color: 'var(--primary)' }}>{zh ? '联系支持' : 'Contact support'}</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
