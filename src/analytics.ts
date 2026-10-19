type AnalyticsEvent = 'page_view' | 'view_kits' | 'select_kit' | 'begin_checkout';

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }

function campaignParameters() {
  const params = new URLSearchParams(window.location.search);
  const campaign: Record<string, string> = {};
  let stored: Record<string, unknown> = {};
  try { stored = JSON.parse(sessionStorage.getItem('npp-campaign') || '{}') || {}; } catch { /* Storage is optional. */ }
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = params.get(key) || stored[key];
    if (typeof value === 'string' && value) campaign[key] = value;
  }
  return campaign;
}

export function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  const campaign = campaignParameters();
  try {
    if (Object.keys(campaign).length) sessionStorage.setItem('npp-campaign', JSON.stringify(campaign));
  } catch { /* The page remains usable if browser storage is unavailable. */ }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...campaign, ...properties });
}

export function checkoutLink(url: string) {
  const destination = new URL(url, window.location.origin);
  if (!['https:', 'http:'].includes(destination.protocol)) throw new Error('Checkout inválido.');
  try {
    const campaign = campaignParameters();
    Object.entries(campaign).forEach(([key, value]) => destination.searchParams.set(key, String(value)));
  } catch { /* Campaign storage is optional. */ }
  return destination.href;
}
