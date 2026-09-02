'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import {
  getPageName,
  initAnalytics,
  isAnalyticsAvailable,
  trackWebEvent,
} from '@/lib/analytics';
import { webEvents, type WebEventName } from '@/lib/analytics-events';

type AnalyticsContextValue = {
  available: boolean;
  track: (event: WebEventName, properties?: Record<string, unknown>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

function isChromeStoreUrl(url: string) {
  return url.startsWith('https://chromewebstore.google.com/detail/tokentint-');
}

function getExternalDestination(url: string) {
  if (url.startsWith('mailto:')) return { destination: 'email', linkType: 'contact' };
  if (url.includes('github.com')) return { destination: 'github', linkType: 'support' };
  return { destination: 'other', linkType: 'external' };
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const available = isAnalyticsAvailable();

  useEffect(() => {
    void initAnalytics();
  }, []);

  useEffect(() => {
    void initAnalytics().then(() => {
      trackWebEvent(webEvents.pageView, {
        page_name: getPageName(pathname),
        page_path: pathname || '/',
        locale: pathname?.startsWith('/zh-CN') ? 'zh-CN' : 'en',
      });
    });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;

      const url = link.href;
      const pageName = getPageName(pathname);
      const locale = pathname?.startsWith('/zh-CN') ? 'zh-CN' : 'en';

      if (isChromeStoreUrl(url)) {
        trackWebEvent(webEvents.storeClick, {
          store: 'chrome_web_store',
          location: link.dataset.analyticsLocation || 'unknown',
          page_name: pageName,
          locale,
        });
        return;
      }

      if (url.startsWith('mailto:') || new URL(url).origin !== window.location.origin) {
        const { destination, linkType } = getExternalDestination(url);
        trackWebEvent(webEvents.externalClick, {
          destination,
          link_type: linkType,
          page_name: pageName,
          locale,
        });
        return;
      }

      const isCta = link.className.split(' ').some((className) =>
        ['cta-button', 'cta-secondary', 'cta', 'btn', 'nav-cta', 'mobile-nav-cta'].includes(className),
      );
      if (isCta) {
        trackWebEvent(webEvents.ctaClick, {
          cta_id: link.dataset.analyticsId || link.textContent?.trim().toLowerCase().replace(/\s+/g, '_') || 'unknown',
          location: link.dataset.analyticsLocation || 'unknown',
          target_type: 'internal',
          page_name: pageName,
          locale,
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  const value = useMemo<AnalyticsContextValue>(() => ({
    available,
    track: trackWebEvent,
  }), [available]);

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
}
