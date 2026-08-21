import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = { title: 'Tailwind-ready Palette Generator from Website Colors', description: 'Organize colors sampled from a website into a Tailwind-ready palette and export a config-ready result with TokenTint Pro.', alternates: { canonical: '/tailwind-color-generator', languages: { en: '/tailwind-color-generator', 'zh-CN': '/zh-CN/tailwind-color-generator', 'x-default': '/tailwind-color-generator' } } };

export default function Page() { return <SeoLandingPage
  h1="Tailwind-ready Palette Generator"
  intro="Collect colors from a webpage, organize them into a practical project palette, and export a Tailwind Config starting point—without inventing automatic 50–950 shades."
  problem="Tailwind projects often start from colors found in a browser mockup, a competitor site, or an existing product. Copying disconnected HEX values into a config makes it hard to compare the palette and easy to lose the source context."
  solution="TokenTint helps you collect and organize the colors that already exist in the interface. Pro then exports those project colors as a Tailwind Config starting point; you can add semantic names, shades, and project conventions in your own codebase."
  workflowTitle="From webpage colors to a Tailwind-ready palette."
  workflowKickers={['COLLECT', 'ORGANIZE', 'EXPORT']}
  workflow={['Collect. Pick the brand, surface, text, border, and accent colors you need from a webpage.', 'Organize. Keep the values together in a TokenTint project palette and verify the formats before exporting.', 'Export. Download a Tailwind Config starting point and continue the naming and scale decisions in your codebase.']}
  free={['Pick colors from webpages', 'HEX, RGB, and HSL formats', '20-color history', 'Single project palette', 'CSS Variables export']}
  pro={['Everything in Free', 'Key page color extraction', 'Multiple project palettes', 'Tailwind Config export', 'W3C Design Tokens export']}
  why="it preserves the relationship between your reference webpage and the colors you bring into Tailwind, while leaving semantic naming and shade design decisions under your control."
  related={[{ href: '/website-color-picker', label: 'Collect colors from a website' }, { href: '/design-token-generator', label: 'Export color design tokens' }, { href: '/pricing', label: 'Compare Free and Pro' }]}
  faqs={[{ question: 'What does the Tailwind-ready palette generator do?', answer: 'It helps you collect webpage colors, organize them in a project palette, and export a Tailwind Config starting point. It is focused on existing interface colors, not automatic shade-scale generation.' }, { question: 'Does TokenTint generate 50–950 color shades?', answer: 'No. TokenTint does not promise automatic 50–950 shade generation. The export reflects the colors you collected, and you can define shades and semantic names in your project.' }, { question: 'Is Tailwind Config export free?', answer: 'Tailwind Config export is a Pro feature. Free users can still pick colors, organize one project palette, and export CSS Variables.' }]}
  visual={{ heroSrc: '/images/screenshots/export-tailwind-pro.png', heroAlt: 'TokenTint Tailwind Config export from a project color palette', showcaseTitle: 'A practical bridge from reference colors to Tailwind.', heroSize: 'compact', showcaseSize: 'tall' }}
  outputExample={{ label: 'TAILWIND CONFIG', title: 'Export the palette you collected—not a made-up scale.', description: 'The export gives your codebase a config-ready starting point. You remain in control of semantic names, shade scales, and how the palette fits your project.', code: `theme: {
  extend: {
    colors: {
      brand: '#635BFF',
      surface: '#F7F8FB',
      ink: '#10131A'
    }
  }
}`, footer: 'Pro: Tailwind Config export' }}
  hideShowcase
  proVisual={{ title: 'Tailwind workflow: Open → Extract → Organize → Export', description: 'Reuse the reference colors, organize them in a project, and carry the selected palette into a Tailwind Config starting point.', steps: [{ title: 'Open the reference page', description: 'Start with a real interface whose colors you want to bring into a Tailwind project.', src: '/images/screenshots/website-color-picker/pro-reference-detail.png', alt: 'Reference project page opened before collecting Tailwind colors' }, { title: 'Extract webpage colors', description: 'Scan the active page for a broader starting palette instead of picking every color one by one.', src: '/images/screenshots/website-color-picker/pro-extracted.png', alt: 'TokenTint Pro showing 20 colors extracted from a webpage' }, { title: 'Organize the project palette', description: 'Keep colors together in the selected project and choose the values that belong in the Tailwind theme.', src: '/images/screenshots/website-color-picker/pro-tokens.png', alt: 'TokenTint project showing multiple organized color tokens' }, { title: 'Export Tailwind Config', description: 'Download a config-ready color object and refine names, shades, and conventions in your codebase.', src: '/images/screenshots/export-tailwind-pro.png', alt: 'TokenTint Tailwind Config export' }] }}
/>; }
