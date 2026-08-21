'use client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { localizedPath, useLanguage } from '@/components/LanguageProvider';

const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm';

export default function PricingPage() {
  const { locale } = useLanguage();
  const copy = locale === 'zh-CN'
    ? {
      title: 'TokenTint 定价', lead: '永久免费。一次购买即可解锁全部 Pro 功能——无订阅、无续费。',
      free: ['使用 EyeDropper 取色', 'HEX/RGB/HSL 格式', '20 个颜色历史记录', '单个项目调色板', 'CSS Variables 导出', '深色/浅色模式'],
      pro: ['包含免费版全部功能', '从任意页面提取主要颜色', '多个项目调色板', 'Tailwind 配置导出', 'W3C 设计令牌导出', '优先支持'],
      add: '免费添加到 Chrome', upgrade: '一次购买解锁 Pro', oneTime: '一次购买，无订阅。', note: '付款由 Creem 处理；付款成功后会生成激活令牌。免费功能可离线使用。', billing: '一次性付费',
    }
    : {
      title: 'TokenTint Pricing', lead: 'Free forever. Unlock Pro features with a one-time purchase — no subscription, no renewals.',
      free: ['Pick colors from webpages', 'HEX, RGB, and HSL formats', '20-color history', 'Single project palette', 'CSS Variables export', 'Dark/light mode'],
      pro: ['Everything in Free', 'Extract key colors from webpages', 'Multiple project palettes', 'Tailwind Config export', 'W3C Design Tokens export', 'Lifetime Pro access'],
      add: 'Add to Chrome — Free', upgrade: 'Get lifetime Pro for $15', oneTime: 'One-time purchase. No subscription.', note: 'Payment is handled by Creem. After checkout, you receive an activation token; free features work offline.', billing: 'one-time',
    };

  return (
    <>
      <Navigation />

      <main>
        <section className="pricing">
          <div className="container">
            <div className="pricing-header">
              <h1>{copy.title}</h1>
              <p className="section-lead">{copy.lead}</p>
            </div>
            <div className="pricing-cards">
              <PricingCard title="Free" price="$0" features={copy.free} cta={copy.add} href={chromeStoreUrl} />
              <PricingCard title="Pro" price="$15" billing={copy.billing} features={copy.pro} cta={copy.upgrade} href={localizedPath('/upgrade', locale)} featured />
            </div>

            <div className="pricing-comparison">
              <h2>{locale === 'zh-CN' ? '功能对比' : 'Compare features'}</h2>
              <div className="comparison-table-wrap"><table><thead><tr><th>{locale === 'zh-CN' ? '功能' : 'Feature'}</th><th>Free</th><th>Pro</th></tr></thead><tbody>
                {(locale === 'zh-CN' ? [['手动网页取色','✓','✓'],['颜色历史记录','20 个','20 个'],['项目调色板','1 个','无限'],['页面颜色提取','—','✓'],['CSS Variables 导出','✓','✓'],['Tailwind Config 导出','—','✓'],['W3C Design Tokens 导出','—','✓']] : [['Manual webpage picking','✓','✓'],['Color history','20 colors','20 colors'],['Project palettes','1','Unlimited'],['Page color extraction','—','✓'],['CSS Variables export','✓','✓'],['Tailwind Config export','—','✓'],['W3C Design Tokens export','—','✓']]).map(([feature, free, pro]) => <tr key={feature}><th scope="row">{feature}</th><td>{free}</td><td className="comparison-pro">{pro}</td></tr>)}
              </tbody></table></div>
            </div>

            <div className="pricing-details">
              <h2>{locale === 'zh-CN' ? '购买前需要知道的事' : 'What happens after you buy?'}</h2>
              <div className="pricing-detail-grid">
                <div><h3>{locale === 'zh-CN' ? '付款与激活' : 'Payment & activation'}</h3><p>{locale === 'zh-CN' ? '点击升级后输入邮箱，前往 Creem 完成一次性付款。付款成功页会生成激活令牌，将令牌粘贴到扩展的 Activate Pro 区域即可。' : 'Enter your email, complete the one-time payment through Creem, then copy the activation token from the success page into the extension’s Activate Pro section.'}</p></div>
                <div><h3>{locale === 'zh-CN' ? '离线与数据' : 'Offline & data'}</h3><p>{locale === 'zh-CN' ? '免费功能可离线使用。颜色、项目和设置保存在 Chrome 本地存储中；页面颜色只有在你主动提取时才会读取。' : 'Free features work offline. Colors, projects, and settings stay in Chrome local storage; page colors are read only when you explicitly use extraction.'}</p></div>
                <div><h3>{locale === 'zh-CN' ? '退款' : 'Refunds'}</h3><p>{locale === 'zh-CN' ? '购买后 30 天内可通过 support@tokentint.xyz 申请全额退款，无需说明理由。' : 'Request a full refund within 30 days by emailing support@tokentint.xyz. No reason is required.'}</p></div>
                <div><h3>{locale === 'zh-CN' ? '丢失令牌' : 'Lost your token?'}</h3><p>{locale === 'zh-CN' ? '请通过 support@tokentint.xyz 联系我们，并提供购买邮箱和 Creem 订单号，由支持团队协助恢复。' : 'Email support@tokentint.xyz with the purchase email and Creem order ID. Support will help recover access.'}</p></div>
              </div>
            </div>

            <div style={{ marginTop: '64px', textAlign: 'center' }}>
              <h3>{copy.oneTime}</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>{copy.note}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
