import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'TokenTint privacy policy. Local-only storage, no analytics, no tracking. Details on what is collected and how.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>Privacy Policy</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section style={{ marginBottom: '32px' }}>
              <h2>Data Collection</h2>
              <p>TokenTint is designed with privacy in mind. We collect minimal data:</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>Email address (only for Pro purchases)</li>
                <li>Payment information (processed by Creem, not stored by us)</li>
                <li>Activation token or purchase email only when you activate or restore a Pro license</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Local Data Storage</h2>
              <p>All your colors, projects, and settings are stored locally in your browser using Chrome's storage API. We do not have access to this data.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>No Analytics</h2>
              <p>We do not use any analytics or tracking tools. Your usage of TokenTint is completely private.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Third-Party Services</h2>
              <p>We use Creem for payment processing. When you make a purchase, your payment information is handled by Creem according to their privacy policy.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Network Requests</h2>
              <p>The extension only makes network requests when you:</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>Activate your Pro license</li>
                <li>Verify an activation token</li>
                <li>Restore a purchase using the email address you provide</li>
              </ul>
              <p style={{ marginTop: '16px' }}>Free features work completely offline.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Active Page Color Extraction</h2>
              <p>When you explicitly click Extract Page Colors, TokenTint temporarily reads computed style colors from the selected active tab. The extracted colors are used only to provide the feature and are saved locally in your browser. Page content, URLs, and browsing history are not sent to our servers.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Data Storage and Sharing</h2>
              <p>Color history, project palettes, settings, and the local Pro entitlement are stored in Chrome local extension storage and are not synced to your Google account. Purchase and license requests are handled by our server and Creem, our payment processor. We do not sell data, use it for advertising, or use analytics or tracking tools.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Contact</h2>
              <p>For privacy questions, contact us at: <a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a></p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
