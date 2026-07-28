import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            TokenTint
          </Link>
          <ul className="nav-links">
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
