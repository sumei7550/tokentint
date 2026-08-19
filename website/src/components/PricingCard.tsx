import Link from 'next/link';

type PricingCardProps = {
  title: string;
  price: string;
  billing?: string;
  features: readonly string[];
  cta: string;
  href: string;
  featured?: boolean;
  headingLevel?: 'h2' | 'h3';
};

export default function PricingCard({
  title,
  price,
  billing,
  features,
  cta,
  href,
  featured = false,
  headingLevel = 'h2',
}: PricingCardProps) {
  const heading = headingLevel === 'h3' ? <h3>{title}</h3> : <h2>{title}</h2>;

  return (
    <div className={`pricing-card${featured ? ' featured' : ''}`}>
      {heading}
      <div className="price">
        {price} {billing && <span>{billing}</span>}
      </div>
      <ul className="features-list">
        {features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
      <Link href={href} className="btn">
        {cta}
      </Link>
    </div>
  );
}
