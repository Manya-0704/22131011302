const URLS_KEY = 'url_shortener_urls';

export function getUrls() {
  return JSON.parse(localStorage.getItem(URLS_KEY) || '[]');
}

export function saveUrl(urlObj) {
  const urls = getUrls();
  urls.push(urlObj);
  localStorage.setItem(URLS_KEY, JSON.stringify(urls));
}

export function updateUrl(shortcode, updateFn) {
  const urls = getUrls();
  const idx = urls.findIndex(u => u.shortcode === shortcode);
  if (idx !== -1) {
    urls[idx] = updateFn(urls[idx]);
    localStorage.setItem(URLS_KEY, JSON.stringify(urls));
  }
}

export function getClicks(shortcode) {
  const urls = getUrls();
  const url = urls.find(u => u.shortcode === shortcode);
  return url ? url.clicks || [] : [];
}

export function addClick(shortcode, click) {
  updateUrl(shortcode, url => {
    url.clicks = url.clicks || [];
    url.clicks.push(click);
    return url;
  });
}

export function getUniqueShortcode(candidate) {
  const urls = getUrls();
  let code = candidate;
  let i = 1;
  while (urls.some(u => u.shortcode === code)) {
    code = candidate + i;
    i++;
  }
  return code;
} 