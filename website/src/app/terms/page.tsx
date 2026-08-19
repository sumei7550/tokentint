'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';

export default function TermsPage() {
  const { locale } = useLanguage();
  const zh = locale === 'zh-CN';
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>{zh ? '服务条款' : 'Terms of Service'}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              {zh ? '最后更新：' : 'Last updated: '} {new Date().toLocaleDateString()}
            </p>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '许可授予' : 'License Grant'}</h2>
              <p>{zh ? 'TokenTint 授予你一项非独占、不可转让的软件使用许可。' : 'TokenTint grants you a non-exclusive, non-transferable license to use the software.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? 'Pro 购买' : 'Pro Purchase'}</h2>
              <p>{zh ? 'Pro 功能以一次性购买方式出售。你购买版本的许可长期有效。' : 'Pro features are sold as a one-time purchase. Your license is valid indefinitely for the version purchased.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '可接受的使用方式' : 'Acceptable Use'}</h2>
              <p>{zh ? '你不得：' : 'You may not:'}</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>{zh ? '对软件进行逆向工程' : 'Reverse engineer the software'}</li>
                <li>{zh ? '分享你的 Pro 激活令牌' : 'Share your Pro activation token'}</li>
                <li>{zh ? '将软件用于非法目的' : 'Use the software for illegal purposes'}</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '免责声明' : 'Warranty Disclaimer'}</h2>
              <p>{zh ? 'TokenTint 按“现状”提供，不作任何形式的保证。对于使用软件产生的任何损害，我们不承担责任。' : 'TokenTint is provided "as is" without warranty of any kind. We are not liable for any damages arising from use of the software.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '条款变更' : 'Changes to Terms'}</h2>
              <p>{zh ? '我们可能随时更新这些条款。继续使用 TokenTint 即表示接受更新后的条款。' : 'We may update these terms at any time. Continued use of TokenTint constitutes acceptance of updated terms.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '联系' : 'Contact'}</h2>
              <p>{zh ? '如有条款相关问题，请联系：' : 'For questions about these terms, contact: '}<a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a></p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
