import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <section className="hero">
          <div className="container">
            <h1>Pick colors. Ship tokens.</h1>
            <p className="tagline">
              A Chrome Extension for color picking and design token management
            </p>
            <Link href="/pricing" className="cta-button">
              Get TokenTint
            </Link>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature">
                <h3>🎨 EyeDropper API</h3>
                <p>Pick any color from your screen with native browser support</p>
              </div>
              <div className="feature">
                <h3>📋 Multiple Formats</h3>
                <p>Copy colors in HEX, RGB, or HSL format</p>
              </div>
              <div className="feature">
                <h3>📜 Color History</h3>
                <p>Keep track of your last 20 picked colors</p>
              </div>
              <div className="feature">
                <h3>🎯 Project Palettes</h3>
                <p>Organize colors into projects (Pro)</p>
              </div>
              <div className="feature">
                <h3>🔍 Page Extraction</h3>
                <p>Extract key colors from any webpage (Pro)</p>
              </div>
              <div className="feature">
                <h3>📤 Token Export</h3>
                <p>Export as CSS Variables, Tailwind, or W3C Tokens (Pro)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing">
          <div className="container">
            <h2>Simple Pricing</h2>
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
                  <li>Extract page colors</li>
                  <li>Multiple projects</li>
                  <li>Tailwind config export</li>
                  <li>W3C Design Tokens export</li>
                  <li>WCAG contrast checker</li>
                  <li>Backup import/export</li>
                </ul>
                <Link href="/upgrade" className="btn">
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
