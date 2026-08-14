import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — Free and Lifetime Pro',
  description:
    'TokenTint is free forever. Unlock Pro features — page color extraction, multiple palettes, Tailwind and W3C design token exports — with a one-time $15 purchase.',
  alternates: { canonical: '/pricing' },
};

const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm';

export default function PricingPage() {
  return (
    <>
      <Navigation />

      <main>
        <section className="pricing">
          <div className="container">
            <h1>TokenTint Pricing</h1>
            <p className="section-lead">
              Free forever. Unlock every Pro feature with a one-time purchase — no
              subscription, no renewals.
            </p>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h2>Free</h2>
                <div className="price">$0</div>
                <ul className="features-list">
                  <li>Pick colors with EyeDropper</li>
                  <li>HEX/RGB/HSL formats</li>
                  <li>20-color history</li>
                  <li>Single project palette</li>
                  <li>CSS Variables export</li>
                  <li>Dark/light mode</li>
                </ul>
                <Link href={chromeStoreUrl} className="btn">
                  Add to Chrome
                </Link>
              </div>

              <div className="pricing-card featured">
                <h2>Pro</h2>
                <div className="price">
                  $15 <span>one-time</span>
                </div>
                <ul className="features-list">
                  <li>Everything in Free</li>
                  <li>Extract key colors from any page</li>
                  <li>Unlimited project palettes</li>
                  <li>Tailwind config export</li>
                  <li>W3C Design Tokens export</li>
                  <li>Priority support</li>
                </ul>
                <Link href="/upgrade" className="btn">
                  Upgrade to Pro
                </Link>
              </div>
            </div>

            <div style={{ marginTop: '64px', textAlign: 'center' }}>
              <h3>One-time purchase. No subscription.</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
                Buy once, own forever. Works offline after activation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
