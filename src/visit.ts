// Private visitor count: one beacon per page load to /api/hit, which nginx
// answers with 204 and writes to its own log (deploy/nginx-portfolio-site.conf).
// deploy/visitor-stats.py turns that log into counts for Mission Control
// and TARS. Clicks on the Blog link are sent the same way (recordClick).
// Nothing is shown on the site, no cookies, and nothing runs in dev builds.
//
// Open the site once with ?notrack to stop counting this browser
// (?track turns it back on).
const OPT_OUT_KEY = 'pf-notrack';

function tracking(): boolean {
  if (!import.meta.env.PROD || navigator.webdriver) return false;
  try {
    const params = new URLSearchParams(location.search);
    if (params.has('notrack')) localStorage.setItem(OPT_OUT_KEY, '1');
    if (params.has('track')) localStorage.removeItem(OPT_OUT_KEY);
    return !localStorage.getItem(OPT_OUT_KEY);
  } catch {
    return true; // storage blocked: count anyway
  }
}

function send(url: string) {
  if (!navigator.sendBeacon?.(url)) {
    fetch(url, { method: 'POST', keepalive: true }).catch(() => {});
  }
}

export function recordVisit() {
  if (!tracking()) return;

  let referrer = '';
  try {
    const ref = new URL(document.referrer);
    if (ref.host !== location.host) referrer = ref.host;
  } catch {
    // no referrer (typed URL, bookmark, app link)
  }

  send(`/api/hit?r=${encodeURIComponent(referrer)}`);
}

// A click on an outbound link (currently only the Blog link). Same endpoint,
// so it's tied to the same daily visitor; it is not counted as a pageview.
// sendBeacon survives the page opening the blog in a new tab.
export function recordClick(target: 'blog') {
  if (tracking()) send(`/api/hit?e=${target}`);
}
