 'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';

export default function RestorePage() {
  const { locale } = useLanguage();
  const zh = locale === 'zh-CN';
  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <div className="card">
            <h2>{zh ? '恢复购买' : 'Restore Purchase'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
              {zh ? '激活令牌会显示在付款成功页面，我们不会将其存储在服务器上。' : 'Activation tokens are shown on the payment-success page and are not stored on our servers.'}
            </p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
              {zh ? '如果你丢失了令牌，请将购买邮箱和 Creem 订单号发送至 ' : 'If you lost your token, email '}<a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a>{zh ? '，支持团队会验证购买记录并协助恢复访问。' : ' with your purchase email and Creem order ID. Support will verify the purchase and help you recover access.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
