import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upgrade to Pro',
  description: 'Upgrade to TokenTint Pro. One-time $15 payment for lifetime access.',
  alternates: { canonical: '/upgrade' },
  robots: { index: false, follow: true },
};

export default function UpgradeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
