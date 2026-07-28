import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
                <li>Restore your purchase</li>
              </ul>
              <p style={{ marginTop: '16px' }}>Free features work completely offline.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Contact</h2>
              <p>For privacy questions, contact us at: privacy@tokentint.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
