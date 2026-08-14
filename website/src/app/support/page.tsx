import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with TokenTint. Activation, license recovery, EyeDropper troubleshooting, and how to contact support.',
  alternates: { canonical: '/support' },
};

export default function SupportPage() {
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>Support</h1>

            <section style={{ marginBottom: '32px', marginTop: '32px' }}>
              <h2>Need Help?</h2>
              <p>We're here to help! Contact us at: <a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a></p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Common Questions</h2>

              <div style={{ marginTop: '24px' }}>
                <h3>How do I activate Pro?</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  After purchase, you'll receive an activation token. Open the extension, click settings, and paste your token.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>I lost my activation token</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Your activation token is shown on the payment-success page. If you lost it, contact support with your Creem order ID.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>Does Pro require internet?</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  No. After activating once, all Pro features work offline.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>Can I use Pro on multiple devices?</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Yes! Use the same activation token on all your devices.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>EyeDropper not working?</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  The EyeDropper API requires a recent version of Chrome (95+). Make sure your browser is up to date.
                </p>
              </div>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Feature Requests</h2>
              <p>Have an idea? <a href="https://github.com/sumei7550/tokentint/issues/new/choose">Open a feature request on GitHub</a>.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Bug Reports</h2>
              <p>Found a bug? <a href="https://github.com/sumei7550/tokentint/issues/new/choose">Report it on GitHub</a>.</p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Include your Chrome version and steps to reproduce the issue.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
