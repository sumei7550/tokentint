import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-links">
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
          <li><Link href="/refunds">Refunds</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
        <p>&copy; {new Date().getFullYear()} TokenTint. All rights reserved.</p>
      </div>
    </footer>
  );
}
