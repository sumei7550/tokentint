export const webEvents = {
  pageView: 'web_page_view',
  ctaClick: 'web_cta_click',
  storeClick: 'web_store_click',
  languageSwitch: 'web_language_switch',
  externalClick: 'web_external_click',
  faqExpand: 'web_faq_expand',
} as const;

export type WebEventName = (typeof webEvents)[keyof typeof webEvents];

