import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>Terms of Service</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section style={{ marginBottom: '32px' }}>
              <h2>License Grant</h2>
              <p>TokenTint grants you a non-exclusive, non-transferable license to use the software.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Pro Purchase</h2>
              <p>Pro features are sold as a one-time purchase. Your license is valid indefinitely for the version purchased.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Acceptable Use</h2>
              <p>You may not:</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>Reverse engineer the software</li>
                <li>Share your Pro activation token</li>
                <li>Use the software for illegal purposes</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Warranty Disclaimer</h2>
              <p>TokenTint is provided "as is" without warranty of any kind. We are not liable for any damages arising from use of the software.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Changes to Terms</h2>
              <p>We may update these terms at any time. Continued use of TokenTint constitutes acceptance of updated terms.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Contact</h2>
              <p>For questions about these terms, contact: legal@tokentint.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
