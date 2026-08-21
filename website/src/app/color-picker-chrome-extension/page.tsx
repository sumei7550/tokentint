import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = { title: 'Chrome Color Picker Extension', description: 'Pick webpage colors in Chrome, copy HEX RGB HSL values, review color history, and save colors to a project palette with TokenTint.', alternates: { canonical: '/color-picker-chrome-extension', languages: { en: '/color-picker-chrome-extension', 'zh-CN': '/zh-CN/color-picker-chrome-extension', 'x-default': '/color-picker-chrome-extension' } } };

export default function Page() { return <SeoLandingPage
  h1="Chrome Color Picker Extension"
  intro="A focused Chrome color picker for sampling webpage colors, copying HEX, RGB, or HSL values, and keeping the colors you need in one project palette."
  problem="Browser color work often means picking the same area more than once, losing a copied value in a notes file, or switching between formats manually. A basic eyedropper gives you one color, but not a useful place to review the colors around it."
  solution="TokenTint keeps the browser picking step simple: choose a color, switch between HEX, RGB, and HSL, review your recent history, and save the useful values to a project palette. It is designed for quick frontend and UI work before you need a full design-system process."
  workflowKickers={['PICK', 'REVIEW', 'SAVE']}
  workflow={['Pick Color. Use the Chrome extension to sample a color directly from the active webpage.', 'Review History. Keep the last 20 picked colors together and copy the format you need.', 'Save to Project. Move the useful colors into one reusable project palette for the current task.']}
  free={['Pick colors from webpages', 'HEX, RGB, and HSL values', '20-color history', 'Single project palette', 'CSS Variables export']}
  pro={['Everything in Free', 'Key page color extraction', 'Multiple project palettes', 'Tailwind Config export', 'W3C Design Tokens export']}
  why="a basic eyedropper answers what color is under the cursor; TokenTint also keeps the recent colors, formats, and project context you need while building the interface."
  related={[{ href: '/website-color-picker', label: 'Build a palette from a website' }, { href: '/pricing', label: 'Compare Free and Pro' }, { href: '/support', label: 'Get setup help' }]}
  faqs={[{ question: 'What is a Chrome color picker extension?', answer: 'It is a browser extension that lets you sample colors from webpages and copy their values. TokenTint supports HEX, RGB, and HSL.' }, { question: 'How many colors can I keep in history?', answer: 'The free workflow keeps the 20 most recent picked colors so you can review and reuse them during a task.' }, { question: 'Can I save picked colors for a project?', answer: 'Yes. You can move useful colors from history into a project palette and export that palette as CSS Variables.' }]}
  visual={{ heroSrc: '/images/screenshots/pick-color-free.png', heroAlt: 'TokenTint Chrome color picker showing a picked webpage color', showcaseTitle: 'A practical browser color picker for everyday UI work.' }}
  valueCards={[{ title: 'Pick in the browser', description: 'Sample a color without leaving the webpage you are studying or building.' }, { title: 'Keep the context', description: 'Review recent colors and preserve the small palette around a page or component.' }, { title: 'Copy the right format', description: 'Switch between HEX, RGB, and HSL before moving a color into your project.' }]}
/>; }
