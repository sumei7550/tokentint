'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';

export default function SupportPage() {
  const { locale } = useLanguage();
  const zh = locale === 'zh-CN';
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>{zh ? '支持' : 'Support'}</h1>

            <section style={{ marginBottom: '32px', marginTop: '32px' }}>
              <h2>{zh ? '需要帮助？' : 'Need Help?'}</h2>
              <p>{zh ? '我们很乐意帮助你！请联系：' : "We're here to help! Contact us at: "} <a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a></p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '常见问题' : 'Common Questions'}</h2>

              <div style={{ marginTop: '24px' }}>
                <h3>{zh ? '如何激活 Pro？' : 'How do I activate Pro?'}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {zh ? '购买后你会收到激活令牌。打开扩展，点击设置，然后粘贴令牌。' : "After purchase, you'll receive an activation token. Open the extension, click settings, and paste your token."}
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>{zh ? '我丢失了激活令牌' : 'I lost my activation token'}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {zh ? '激活令牌会显示在支付成功页面。如果丢失，请提供 Creem 订单号并联系支持。' : 'Your activation token is shown on the payment-success page. If you lost it, contact support with your Creem order ID.'}
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>{zh ? 'Pro 需要联网吗？' : 'Does Pro require internet?'}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {zh ? '不需要。完成一次激活后，所有 Pro 功能都可以离线使用。' : 'No. After activating once, all Pro features work offline.'}
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>{zh ? '可以在多台设备上使用 Pro 吗？' : 'Can I use Pro on multiple devices?'}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {zh ? '可以！你可以在所有设备上使用同一个激活令牌。' : 'Yes! Use the same activation token on all your devices.'}
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>{zh ? 'EyeDropper 无法使用？' : 'EyeDropper not working?'}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {zh ? 'EyeDropper API 需要较新版本的 Chrome（95 及以上）。请确认浏览器已更新。' : 'The EyeDropper API requires a recent version of Chrome (95+). Make sure your browser is up to date.'}
                </p>
              </div>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '功能建议' : 'Feature Requests'}</h2>
              <p>{zh ? '有新的想法？' : 'Have an idea? '}<a href="https://github.com/sumei7550/tokentint/issues/new/choose">{zh ? '在 GitHub 提交功能建议' : 'Open a feature request on GitHub'}</a>。</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '问题反馈' : 'Bug Reports'}</h2>
              <p>{zh ? '发现问题？' : 'Found a bug? '}<a href="https://github.com/sumei7550/tokentint/issues/new/choose">{zh ? '在 GitHub 提交报告' : 'Report it on GitHub'}</a>。</p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                {zh ? '请附上 Chrome 版本和复现问题的步骤。' : 'Include your Chrome version and steps to reproduce the issue.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
