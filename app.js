// app.js

await loadData();
ensureDoodles();

document.getElementById("langBtn")?.addEventListener("click", toggleLangBar);
renderLangBar();
renderUserGreeting();
updateCoinDisplay();

const coinBtn = document.getElementById("coinBtn");
if (coinBtn) coinBtn.addEventListener("click", () => navigateTo("shop"));

if (userState) {
  mostraHome();
} else {
  showLoginScreen();
}

start();
