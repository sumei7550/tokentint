'use client';

import type { Mixpanel } from 'mixpanel-browser';
import { webEvents, type WebEventName } from './analytics-events';

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false';

let client: Mixpanel | null = null;
let initializing: Promise<void> | null = null;

export function isAnalyticsAvailable() {
  return Boolean(token && enabled);
}

export async function initAnalytics() {
  if (client || initializing || !isAnalyticsAvailable()) return;

  initializing = import('mixpanel-browser').then(({ default: mixpanel }) => {
    mixpanel.init(token as string, {
      autocapture: false,
      track_pageview: false,
      persistence: 'localStorage',
      stop_utm_persistence: true,
      debug: process.env.NODE_ENV !== 'production',
    });
    client = mixpanel;
  }).catch(() => {
    client = null;
  }).finally(() => {
    initializing = null;
  });

  await initializing;
}

export function trackWebEvent(event: WebEventName, properties: Record<string, unknown> = {}) {
  if (!client) return;
  client.track(event, {
    platform: 'website',
    product: 'tokentint',
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    ...properties,
  });
}

export function optOutAnalytics() {
  client?.opt_out_tracking();
  client?.reset();
  client = null;
}

export function getPageName(pathname: string | null | undefined) {
  const path = (pathname || '/').replace(/^\/zh-CN(?=\/|$)/, '') || '/';
  const firstSegment = path.split('/').filter(Boolean)[0];
  return firstSegment || 'home';
}

export { webEvents };
