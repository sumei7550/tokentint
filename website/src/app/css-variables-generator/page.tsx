import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = {
  title: 'CSS Variables Generator from Website Colors',
  description: 'Pick colors from a website, organize a project palette, and export reusable CSS custom properties for free with TokenTint for Chrome.',
  alternates: {
    canonical: '/css-variables-generator',
    languages: {
      en: '/css-variables-generator',
      'zh-CN': '/zh-CN/css-variables-generator',
      'x-default': '/css-variables-generator',
    },
  },
};

export default function Page() {
  return <SeoLandingPage
    h1="CSS Variables Generator from Website Colors"
    intro="Pick colors from a live webpage, keep them together in a project palette, and export reusable CSS custom properties without retyping every HEX value."
    problem="Copying colors from a browser into a stylesheet one at a time breaks the connection between the reference page and the code. Values end up scattered across notes, duplicate declarations, and inconsistent variable names."
    solution="TokenTint keeps the workflow in one place: collect webpage colors, review them as a palette, and export CSS Variables for free. The export is a clean starting point that you can rename and organize around your own component or design-system conventions."
    workflowTitle="From webpage colors to reusable CSS custom properties."
    workflowKickers={['COLLECT', 'ORGANIZE', 'EXPORT']}
    workflow={['Collect. Pick the brand, surface, text, border, and accent colors you need from the active webpage.', 'Organize. Review the values together and save the useful colors in one project palette.', 'Export. Download CSS Variables, then refine the names and semantic roles in your codebase.']}
    free={['Pick colors from webpages', 'HEX, RGB, and HSL formats', '20-color history', 'Single project palette', 'CSS Variables export']}
    pro={['Everything in Free', 'Extract key page colors', 'Multiple project palettes', 'Tailwind Config export', 'W3C Design Tokens export']}
    why="it connects the source webpage, the palette you selected, and the CSS output. A basic converter only changes formats; TokenTint preserves the color-collection workflow that comes before implementation."
    related={[{ href: '/website-color-picker', label: 'Extract colors from a website' }, { href: '/design-token-generator', label: 'Turn colors into design tokens' }, { href: '/tailwind-color-generator', label: 'Export a Tailwind-ready palette' }]}
    faqs={[{ question: 'How do I create CSS variables from website colors?', answer: 'Open the website in Chrome, pick the colors you need with TokenTint, save them to a project palette, and export the palette as CSS Variables.' }, { question: 'Is CSS Variables export free?', answer: 'Yes. The free version includes one project palette and CSS Variables export. Pro adds page color extraction, multiple projects, Tailwind Config, and W3C Design Tokens.' }, { question: 'Does TokenTint automatically choose semantic variable names?', answer: 'The export provides a practical starting structure. You remain in control of names such as brand, surface, text, and border so they match your codebase.' }, { question: 'Are my saved colors uploaded?', answer: 'No. Colors and projects are stored locally with Chrome storage rather than synced to a TokenTint account.' }]}
    visual={{ heroSrc: '/images/screenshots/project-add-token-free.png', heroAlt: 'TokenTint project palette used to export website colors as CSS Variables', showcaseTitle: 'A direct path from webpage color to CSS.', heroSize: 'compact', showcaseSize: 'tall' }}
    outputExample={{ label: 'CSS CUSTOM PROPERTIES', title: 'Export a palette your stylesheet can use.', description: 'Start with the colors you collected from a real interface, then refine the variable names to match your project conventions.', code: `:root {
  --color-brand: #635BFF;
  --color-surface: #F7F8FB;
  --color-text: #10131A;
}`, footer: 'Free: CSS Variables export' }}
    hideShowcase
  />;
}
