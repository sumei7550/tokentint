import Link from 'next/link';

export const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/tokentint-%E2%80%93-color-picker/ifcilnndiaddmoppdpnhboaofffnjmbm';

export type SeoLandingPageProps = {
  h1: string;
  intro: string;
  problem: string;
  solution: string;
  workflow: string[];
  free: string[];
  pro: string[];
  why: string;
  related: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

export default function SeoLandingPage(props: SeoLandingPageProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <main className="seo-page">
        <section className="seo-hero">
          <div className="container">
            <p className="eyebrow">TokenTint for frontend workflows</p>
            <h1>{props.h1}</h1>
            <p className="seo-intro">{props.intro}</p>
            <div className="hero-ctas">
              <a href={chromeStoreUrl} className="cta-button">Add to Chrome — Free</a>
              <Link href="/pricing" className="cta-secondary">Compare plans</Link>
            </div>
          </div>
        </section>

        <section className="seo-section"><div className="container seo-copy">
          <h2>The problem</h2><p>{props.problem}</p>
          <h2>How TokenTint solves it</h2><p>{props.solution}</p>
        </div></section>

        <section className="seo-section seo-muted"><div className="container">
          <h2>How the workflow works</h2>
          <ol className="workflow-list">{props.workflow.map((step) => <li key={step}>{step}</li>)}</ol>
        </div></section>

        <section className="seo-section"><div className="container">
          <h2>Free vs Pro</h2>
          <div className="seo-columns"><div className="seo-card"><h3>Free</h3><ul>{props.free.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="seo-card seo-card-pro"><h3>Pro</h3><ul>{props.pro.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
          <p className="seo-copy"><strong>Why TokenTint instead of a basic color picker?</strong> {props.why}</p>
        </div></section>

        <section className="seo-section seo-muted"><div className="container faq-section">
          <h2>Frequently asked questions</h2>
          {props.faqs.map((faq) => <div className="faq-item" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
        </div></section>

        <section className="seo-section"><div className="container seo-related"><h2>Explore TokenTint</h2><div className="related-links">{props.related.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div></div></section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
