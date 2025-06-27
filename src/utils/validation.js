// URL validation utility
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{4,16}$/.test(code);
}

export function isValidValidity(val) {
  return Number.isInteger(val) && val > 0 && val <= 1440; // up to 24 hours
} 