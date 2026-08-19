'use client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { useLanguage } from '@/components/LanguageProvider';

const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm';

export default function PricingPage() {
  const { locale } = useLanguage();
  const copy = locale === 'zh-CN'
    ? {
      title: 'TokenTint 定价', lead: '永久免费。一次购买即可解锁全部 Pro 功能——无订阅、无续费。',
      free: ['使用 EyeDropper 取色', 'HEX/RGB/HSL 格式', '20 个颜色历史记录', '单个项目调色板', 'CSS Variables 导出', '深色/浅色模式'],
      pro: ['包含免费版全部功能', '从任意页面提取主要颜色', '无限项目调色板', 'Tailwind 配置导出', 'W3C 设计令牌导出', '优先支持'],
      add: '添加到 Chrome', upgrade: '升级到 Pro', oneTime: '一次购买，无订阅。', note: '一次购买，永久拥有。激活后可离线使用。', billing: '一次性付费',
    }
    : {
      title: 'TokenTint Pricing', lead: 'Free forever. Unlock every Pro feature with a one-time purchase — no subscription, no renewals.',
      free: ['Pick colors with EyeDropper', 'HEX/RGB/HSL formats', '20-color history', 'Single project palette', 'CSS Variables export', 'Dark/light mode'],
      pro: ['Everything in Free', 'Extract key colors from any page', 'Unlimited project palettes', 'Tailwind config export', 'W3C Design Tokens export', 'Priority support'],
      add: 'Add to Chrome', upgrade: 'Upgrade to Pro', oneTime: 'One-time purchase. No subscription.', note: 'Buy once, own forever. Works offline after activation.', billing: 'one-time',
    };

  return (
    <>
      <Navigation />

      <main>
        <section className="pricing">
          <div className="container">
            <h1>{copy.title}</h1>
            <p className="section-lead">{copy.lead}</p>
            <div className="pricing-cards">
              <PricingCard title="Free" price="$0" features={copy.free} cta={copy.add} href={chromeStoreUrl} />
              <PricingCard title="Pro" price="$15" billing={copy.billing} features={copy.pro} cta={copy.upgrade} href="/upgrade" featured />
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
