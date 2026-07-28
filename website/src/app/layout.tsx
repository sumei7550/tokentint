import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokenTint - Pick colors. Ship tokens.',
  description: 'A Chrome Extension for color picking and design token management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
