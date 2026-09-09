import type { Metadata } from 'next';
import ToolsDirectory from '@/components/ToolsDirectory';

export const metadata: Metadata = {
  title: 'Color Picker & Design Token Tools',
  description: 'Choose a TokenTint workflow for picking website colors, building palettes, and exporting CSS Variables, Tailwind Config, or W3C Design Tokens.',
  alternates: {
    canonical: '/tools',
    languages: { en: '/tools', 'zh-CN': '/zh-CN/tools', 'x-default': '/tools' },
  },
};

export default function Page() {
  return <ToolsDirectory />;
}
