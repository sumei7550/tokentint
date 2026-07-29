import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RefundsPage() {
  return (
    <>
      <Navigation />

      <main>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h1>Refund Policy</h1>

            <section style={{ marginBottom: '32px', marginTop: '32px' }}>
              <h2>30-Day Money-Back Guarantee</h2>
              <p>We offer a full refund within 30 days of purchase, no questions asked.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>How to Request a Refund</h2>
              <p>Email <a href="mailto:sumei7550@outlook.com">sumei7550@outlook.com</a> with:</p>
              <ul style={{ marginLeft: '24px', marginTop: '16px' }}>
                <li>Your email address used for purchase</li>
                <li>Order ID (if available)</li>
              </ul>
              <p style={{ marginTop: '16px' }}>We'll process your refund within 5 business days.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>After 30 Days</h2>
              <p>Refunds are not available after 30 days from purchase date.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2>Questions?</h2>
              <p>Contact <a href="mailto:sumei7550@outlook.com">sumei7550@outlook.com</a> for any refund questions.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
