'use client';

import { useState } from 'react';
import { useAnalytics } from './AnalyticsProvider';
import { webEvents } from '@/lib/analytics-events';

type FAQAccordionProps = {
  items: readonly (readonly [question: string, answer: string])[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const { track } = useAnalytics();

  return (
    <div className="faq-list">
      {items.map(([question, answer]) => {
        const isOpen = openQuestion === question;

        return (
          <details className="faq-item" key={question} open={isOpen}>
            <summary
              onClick={(event) => {
                event.preventDefault();
                if (!isOpen) {
                  track(webEvents.faqExpand, {
                    faq_id: question,
                    faq_section: 'faq',
                  });
                }
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
