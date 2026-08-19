'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';

export default function RefundsPage() {
  const { locale } = useLanguage();
  const zh = locale === 'zh-CN';
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>{zh ? '退款政策' : 'Refund Policy'}</h1>

            <section style={{ marginBottom: '32px', marginTop: '32px' }}>
              <h2>{zh ? '30 天退款保证' : '30-Day Money-Back Guarantee'}</h2>
              <p>{zh ? '购买后 30 天内可申请全额退款，无需说明理由。' : 'We offer a full refund within 30 days of purchase, no questions asked.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '如何申请退款' : 'How to Request a Refund'}</h2>
              <p>{zh ? '发送邮件至 ' : 'Email '}<a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a>{zh ? '，并提供：' : ' with:'}</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>{zh ? '购买时使用的邮箱地址' : 'Your email address used for purchase'}</li>
                <li>{zh ? '订单号（如有）' : 'Order ID (if available)'}</li>
              </ul>
              <p style={{ marginTop: '16px' }}>{zh ? '我们会在 5 个工作日内处理退款。' : "We'll process your refund within 5 business days."}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '30 天之后' : 'After 30 Days'}</h2>
              <p>{zh ? '购买日期超过 30 天后不再提供退款。' : 'Refunds are not available after 30 days from purchase date.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '有疑问？' : 'Questions?'}</h2>
              <p>{zh ? '如有退款问题，请联系 ' : 'Contact '}<a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a>。</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
