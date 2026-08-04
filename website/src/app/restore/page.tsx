import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RestorePage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <div className="card">
            <h2>Restore Purchase</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
              Activation tokens are shown on the payment-success page and are not stored on our servers.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
              If you lost your token, email <a href="mailto:support@tokentint.xyz">support@tokentint.xyz</a> with your Creem order ID. We will verify the purchase and help you recover access.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
