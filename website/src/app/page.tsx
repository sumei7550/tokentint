import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm';

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TokenTint',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome',
  url: 'https://www.tokentint.xyz/',
  description:
    'Pick colors from any website, save palettes, and export CSS variables, Tailwind config, or W3C design tokens. Chrome extension for developers and designers.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      url: chromeStoreUrl,
    },
    {
      '@type': 'Offer',
      name: 'Pro (Lifetime)',
      price: '15',
      priceCurrency: 'USD',
      url: 'https://www.tokentint.xyz/pricing',
    },
  ],
  publisher: {
    '@type': 'Organization',
    name: 'TokenTint',
    url: 'https://www.tokentint.xyz/',
  },
};

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <section className="hero">
          <div className="container">
            <h1>Color Picker Chrome Extension for Design Tokens</h1>
            <p className="tagline">Pick colors. Ship tokens.</p>
            <p className="hero-sub">
              Pick colors from any website, save palettes, and export CSS variables,
              Tailwind config, or W3C design tokens.
            </p>
            <div className="hero-ctas">
              <Link href={chromeStoreUrl} className="cta-button">
                Add to Chrome — Free
              </Link>
              <Link href="/pricing" className="cta-secondary">
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature">
                <h3>EyeDropper API</h3>
                <p>Pick any color from your screen with native browser support.</p>
              </div>
              <div className="feature">
                <h3>Multiple Formats</h3>
                <p>Copy colors in HEX, RGB, or HSL format.</p>
              </div>
              <div className="feature">
                <h3>Color History</h3>
                <p>Keep track of your last 20 picked colors.</p>
              </div>
              <div className="feature">
                <h3>Project Palettes</h3>
                <p>Organize colors into projects (Pro).</p>
              </div>
              <div className="feature">
                <h3>Page Extraction</h3>
                <p>Extract key colors from any webpage (Pro).</p>
              </div>
              <div className="feature">
                <h3>Token Export</h3>
                <p>Export as CSS Variables, Tailwind config, or W3C Design Tokens (Pro).</p>
              </div>
            </div>
          </div>
        </section>

        <section className="built-for">
          <div className="container">
            <h2>Built for developers and designers</h2>
            <p className="section-lead">
              TokenTint fits into the everyday workflow of the people who ship real
              interfaces — not a generic color tool.
            </p>
            <div className="audience-grid">
              <div className="audience">
                <h3>Frontend developers</h3>
                <p>
                  Sample colors while you build, then export straight to CSS variables so
                  they land in your stylesheet without manual copy-paste.
                </p>
              </div>
              <div className="audience">
                <h3>UI designers</h3>
                <p>
                  Capture inspiration from live sites, organize palettes per project, and
                  share a consistent set of colors across screens.
                </p>
              </div>
              <div className="audience">
                <h3>Design system engineers</h3>
                <p>
                  Export W3C Design Tokens to sync colors between design source and code,
                  keeping the token layer as the single source of truth.
                </p>
              </div>
              <div className="audience">
                <h3>Tailwind users</h3>
                <p>
                  Generate a Tailwind config snippet from your palette so a picked color
                  is one paste away from being a utility class.
                </p>
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
                <Link href={chromeStoreUrl} className="btn">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
    </>
  );
}
