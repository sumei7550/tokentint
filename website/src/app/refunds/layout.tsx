import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokenTint Refund Policy',
  description: 'Read the TokenTint refund policy for Pro purchases.',
  alternates: {
    canonical: '/refunds',
    languages: { en: '/refunds', 'zh-CN': '/zh-CN/refunds', 'x-default': '/refunds' },
  },
  openGraph: { url: 'https://www.tokentint.xyz/refunds', locale: 'en_US' },
};

export default function RefundsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
