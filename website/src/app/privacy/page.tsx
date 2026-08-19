'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';

export default function PrivacyPage() {
  const { locale } = useLanguage();
  const zh = locale === 'zh-CN';
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>{zh ? '隐私政策' : 'Privacy Policy'}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              {zh ? '最后更新：' : 'Last updated: '} {new Date().toLocaleDateString()}
            </p>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '数据收集' : 'Data Collection'}</h2>
              <p>{zh ? 'TokenTint 重视隐私，我们只收集最少的数据：' : 'TokenTint is designed with privacy in mind. We collect minimal data:'}</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>{zh ? '邮箱地址（仅用于 Pro 购买）' : 'Email address (only for Pro purchases)'}</li>
                <li>{zh ? '支付信息（由 Creem 处理，我们不保存）' : 'Payment information (processed by Creem, not stored by us)'}</li>
                <li>{zh ? '仅在激活或恢复 Pro 许可时提供的激活令牌或购买邮箱' : 'Activation token or purchase email only when you activate or restore a Pro license'}</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '本地数据存储' : 'Local Data Storage'}</h2>
              <p>{zh ? '你的颜色、项目和设置都通过 Chrome storage API 保存在浏览器本地，我们无法访问这些数据。' : "All your colors, projects, and settings are stored locally in your browser using Chrome's storage API. We do not have access to this data."}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '不使用分析工具' : 'No Analytics'}</h2>
              <p>{zh ? '我们不使用分析或追踪工具，你对 TokenTint 的使用完全私密。' : 'We do not use any analytics or tracking tools. Your usage of TokenTint is completely private.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '第三方服务' : 'Third-Party Services'}</h2>
              <p>{zh ? '我们使用 Creem 处理支付。购买时，你的支付信息会由 Creem 按照其隐私政策处理。' : 'We use Creem for payment processing. When you make a purchase, your payment information is handled by Creem according to their privacy policy.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '网络请求' : 'Network Requests'}</h2>
              <p>{zh ? '扩展仅在以下情况下发起网络请求：' : 'The extension only makes network requests when you:'}</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>{zh ? '激活 Pro 许可' : 'Activate your Pro license'}</li>
                <li>{zh ? '验证激活令牌' : 'Verify an activation token'}</li>
                <li>{zh ? '使用你提供的邮箱恢复购买' : 'Restore a purchase using the email address you provide'}</li>
              </ul>
              <p style={{ marginTop: '16px' }}>{zh ? '免费功能完全支持离线使用。' : 'Free features work completely offline.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '当前页面颜色提取' : 'Active Page Color Extraction'}</h2>
              <p>{zh ? '当你主动点击“提取页面颜色”时，TokenTint 会临时读取当前标签页的计算样式颜色。提取结果仅用于提供该功能，并保存在浏览器本地。页面内容、网址和浏览历史不会发送到我们的服务器。' : 'When you explicitly click Extract Page Colors, TokenTint temporarily reads computed style colors from the selected active tab. The extracted colors are used only to provide the feature and are saved locally in your browser. Page content, URLs, and browsing history are not sent to our servers.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '数据存储与共享' : 'Data Storage and Sharing'}</h2>
              <p>{zh ? '颜色历史、项目调色板、设置和本地 Pro 权益都保存在 Chrome 扩展的本地存储中，不会同步到你的 Google 账号。购买和许可请求由我们的服务器及支付处理商 Creem 处理。我们不出售数据、不将其用于广告，也不使用分析或追踪工具。' : 'Color history, project palettes, settings, and the local Pro entitlement are stored in Chrome local extension storage and are not synced to your Google account. Purchase and license requests are handled by our server and Creem, our payment processor. We do not sell data, use it for advertising, or use analytics or tracking tools.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>{zh ? '联系' : 'Contact'}</h2>
              <p>{zh ? '如有隐私问题，请联系：' : 'For privacy questions, contact us at: '}<a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a></p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
