// utils.js
function t(key) {
  return TRANSLATIONS?.[key] || key;
}

function fmt(key, data) {
  let str = t(key);
  for (const k in data) str = str.replace(`{${k}}`, data[k]);
  return str;
}

function saveProfiles() {
  localStorage.setItem("userState", JSON.stringify(userState));
}

function loadProfiles() {
  return JSON.parse(localStorage.getItem("userState")) || {};
}

function isPremiumActive() {
  return userState?.premiumActive || false;
}
