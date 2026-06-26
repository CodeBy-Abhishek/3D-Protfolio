export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag('event', name, params || {});
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.info('[analytics]', name, params || {});
  }
}

export function trackProjectView(projectId: string) {
  trackEvent('project_view', { project_id: projectId });
}

export function trackContactSubmit() {
  trackEvent('contact_submit');
}