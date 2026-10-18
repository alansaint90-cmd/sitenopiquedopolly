type AnalyticsEvent = 'page_view' | 'view_kits' | 'select_kit' | 'begin_checkout';

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }

export function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  const params = new URLSearchParams(window.location.search);
  const campaign: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = params.get(key);
    if (value) campaign[key] = value;
  }
  try {
    if (Object.keys(campaign).length) sessionStorage.setItem('npp-campaign', JSON.stringify(campaign));
    Object.assign(campaign, JSON.parse(sessionStorage.getItem('npp-campaign') || '{}'));
  } catch { /* The page remains usable if browser storage is unavailable. */ }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...campaign, ...properties });
}

export function checkoutLink(url: string) {
  const destination = new URL(url, window.location.origin);
  if (!['https:', 'http:'].includes(destination.protocol)) throw new Error('Checkout inválido.');
  try {
    const campaign = JSON.parse(sessionStorage.getItem('npp-campaign') || '{}');
    Object.entries(campaign).forEach(([key, value]) => destination.searchParams.set(key, String(value)));
  } catch { /* Campaign storage is optional. */ }
  return destination.href;
}
