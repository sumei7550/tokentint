import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = { title: 'Color Design Token Generator', description: 'Collect interface colors and export reusable color tokens as CSS Variables or W3C Design Tokens with TokenTint.', alternates: { canonical: '/design-token-generator', languages: { en: '/design-token-generator', 'zh-CN': '/zh-CN/design-token-generator', 'x-default': '/design-token-generator' } } };

export default function Page() { return <SeoLandingPage
  h1="Color Design Token Generator"
  intro="Turn colors from real interfaces into reusable color tokens for your codebase—without pretending to be a full design-system management platform."
  problem="Color tokens become tedious when values are copied from a browser, renamed in a spreadsheet, and later re-entered into code. The handoff loses the source context and makes small inconsistencies easy to introduce."
  solution="TokenTint focuses on the color-token part of the workflow: collect interface colors, group them in a project palette, and export CSS Variables or W3C Design Tokens. Naming, semantic decisions, and documentation stay in the tools your team already uses."
  workflowTitle="From interface color to reusable color token."
  workflowKickers={['COLLECT', 'GROUP', 'EXPORT']}
  workflow={['Collect. Pick colors from a live interface or use page extraction to create a starting color set.', 'Group. Review related colors and keep them together in a project palette before deciding how they should be used.', 'Export. Download CSS Variables or W3C Design Tokens as a practical starting point for development.']}
  free={['Pick colors and copy formats', '20-color history', 'Single project palette', 'CSS Variables export']}
  pro={['Everything in Free', 'Key page color extraction', 'Multiple project palettes', 'Tailwind Config export', 'W3C Design Tokens export']}
  why="TokenTint is a color-token generator, not a full design-system platform: it helps you move from sampled interface colors to usable exports, while your team keeps ownership of naming and design decisions."
  related={[{ href: '/website-color-picker', label: 'Collect colors from a website' }, { href: '/tailwind-color-generator', label: 'Export a Tailwind-ready palette' }, { href: '/pricing', label: 'Compare Free and Pro' }]}
  faqs={[{ question: 'What kind of design tokens does TokenTint generate?', answer: 'TokenTint focuses on color tokens. Free exports CSS Variables, while Pro also exports W3C Design Tokens from project color palettes.' }, { question: 'Is this a full design-system management platform?', answer: 'No. TokenTint focuses on collecting, grouping, and exporting colors. Naming conventions, semantic roles, and documentation remain in your existing workflow.' }, { question: 'Can I generate tokens from a live website?', answer: 'Yes. Pick colors from the active webpage, or use Pro page extraction to create a broader starting palette before exporting.' }]}
  visual={{ heroSrc: '/images/screenshots/project-add-token-free.png', heroAlt: 'TokenTint project palette for organizing color tokens', showcaseTitle: 'A clear handoff from sampled color to token export.', heroSize: 'compact', showcaseSize: 'tall' }}
  outputExample={{ label: 'REAL OUTPUT', title: 'See the color token shape before you export.', description: 'TokenTint gives you a project color palette first, then turns it into a code-ready starting point. You can refine names and semantics in your own repository.', code: `{
  "color": {
    "brand": {
      "$value": "#635BFF",
      "$type": "color"
    }
  }
}`, footer: 'Pro: W3C Design Tokens export' }}
  hideShowcase
  proVisual={{ title: 'Color token workflow: Open → Extract → Group → Export', description: 'Start from a real interface, build a focused color token set, and hand the result to your codebase.', steps: [{ title: 'Open the reference page', description: 'Start with a real interface whose colors you want to turn into reusable color tokens.', src: '/images/screenshots/website-color-picker/pro-reference-detail.png', alt: 'Reference project page opened before collecting color tokens' }, { title: 'Extract interface colors', description: 'Scan the active page for a broader starting set of colors instead of collecting every value one by one.', src: '/images/screenshots/website-color-picker/pro-extracted.png', alt: 'TokenTint Pro showing 20 colors extracted from an interface' }, { title: 'Group a project token set', description: 'Keep related colors together in the selected project before deciding on semantic names and roles.', src: '/images/screenshots/website-color-picker/pro-tokens.png', alt: 'TokenTint project showing multiple organized color tokens' }, { title: 'Export CSS or W3C Tokens', description: 'Export CSS Variables or W3C Design Tokens as a development starting point.', src: '/images/screenshots/website-color-picker/pro-exported.png', alt: 'TokenTint W3C Design Tokens export completed successfully' }] }}
/>; }
