import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PricingPage() {
  return (
    <>
      <Navigation />

      <main>
        <section className="pricing">
          <div className="container">
            <h2>Choose Your Plan</h2>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h3>Free</h3>
                <div className="price">$0</div>
                <ul className="features-list">
                  <li>Pick colors with EyeDropper</li>
                  <li>HEX/RGB/HSL formats</li>
                  <li>20-color history</li>
                  <li>Single project palette</li>
                  <li>CSS Variables export</li>
                  <li>Dark/light mode</li>
                  <li>Full keyboard navigation</li>
                </ul>
                <Link href="https://chrome.google.com/webstore" className="btn">
                  Add to Chrome
                </Link>
              </div>

              <div className="pricing-card featured">
                <h3>Pro</h3>
                <div className="price">
                  $15 <span>one-time</span>
                </div>
                <ul className="features-list">
                  <li>Everything in Free</li>
                  <li>Extract key colors from any page</li>
                  <li>Unlimited project palettes</li>
                  <li>Tailwind config export</li>
                  <li>W3C Design Tokens export</li>
                  <li>WCAG contrast checker</li>
                  <li>Backup import/export</li>
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
