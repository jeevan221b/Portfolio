// Private visitor count: one beacon per page load to /api/hit, which nginx
// answers with 204 and writes to its own log (deploy/nginx-portfolio-site.conf).
// deploy/visitor-stats.py turns that log into counts for Mission Control.
// Nothing is shown on the site, no cookies, and nothing runs in dev builds.
//
// Open the site once with ?notrack to stop counting this browser
// (?track turns it back on).
const OPT_OUT_KEY = 'pf-notrack';

export function recordVisit() {
  if (!import.meta.env.PROD || navigator.webdriver) return;

  try {
    const params = new URLSearchParams(location.search);
    if (params.has('notrack')) localStorage.setItem(OPT_OUT_KEY, '1');
    if (params.has('track')) localStorage.removeItem(OPT_OUT_KEY);
    if (localStorage.getItem(OPT_OUT_KEY)) return;
  } catch {
    // storage blocked: count the visit anyway
  }

  let referrer = '';
  try {
    const ref = new URL(document.referrer);
    if (ref.host !== location.host) referrer = ref.host;
  } catch {
    // no referrer (typed URL, bookmark, app link)
  }

  const url = `/api/hit?r=${encodeURIComponent(referrer)}`;
  if (!navigator.sendBeacon?.(url)) {
    fetch(url, { method: 'POST', keepalive: true }).catch(() => {});
  }
}
