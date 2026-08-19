'use client';

import { useState } from 'react';

type FAQAccordionProps = {
  items: readonly (readonly [question: string, answer: string])[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="faq-list">
      {items.map(([question, answer]) => {
        const isOpen = openQuestion === question;

        return (
          <details className="faq-item" key={question} open={isOpen}>
            <summary
              onClick={(event) => {
                event.preventDefault();
                setOpenQuestion(isOpen ? null : question);
              }}
            >
              {question}<span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        );
      })}
    </div>
  );
}
