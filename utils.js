function t(key) {
  return TRANSLATIONS?.[key] || key;
}

function fmt(key, data = {}) {
  let str = t(key);
  for (const k in data) str = str.replace(`{${k}}`, data[k]);
  return str;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
