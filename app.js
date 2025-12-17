console.clear();
console.log("✅ APP.JS CARICATO – VERSIONE TEST 17/12 16:30");
document.body.style.border = "5px solid red";

/* ===========================
   BEER PASS – FULL DEMO APP
   =========================== */

let currentScreen = "home";
let currentLang = "it";
let TRANSLATIONS = {};
let qrInstance = null;

/* ===== USER STATE ===== */
let userState = loadUserState();

/* ===== DEMO DATA ===== */
const CITIES = ["Milano", "Roma", "Torino"];

const PARTNERS = [
  { id: 1, name: "Birrificio Milano Centro", city: "Milano", offer: "1 birra media" },
  { id: 2, name: "The Dublin Pub", city: "Milano", offer: "1 pinta" },
  { id: 3, name: "Craft Beer House", city: "Roma", offer: "1 artigianale" },
  { id: 4, name: "Hoppy Corner", city: "Torino", offer: "1 media" }
];

const PASSES = [
  { id: "basic", name: "Beer Pass Basic", beers: 10, price: 19.9, cities: ["Milano"] },
  { id: "premium", name: "Beer Pass Premium", beers: 25, price: 39.9, cities: ["Milano", "Roma"] },
  { id: "explorer", name: "Beer Pass Explorer", beers: 50, price: 59.9, cities: ["Tutte"] }
];

const COIN_PACKS = [
  { amount: 1200, price: "9,90 €" },
  { amount: 5300, price: "39,90 €" },
  { amount: 11000, price: "79,90 €" }
];

/* ===== TRANSLATIONS ===== */
const TRANSLATION_PACKS = {
  it: {
    home_title: "Benvenuto in Beer Pass Europe",
    home_sub: "Scopri locali, accumula coin e goditi la tua birra",
    explore: "Esplora Locali",
    use_pass: "Usa il Pass",
    shop: "Shop",
    profile: "Profilo",
    community: "Una community di beer lovers",
    community_copy: "Beer Pass è un modo per esplorare la città e sostenere i pub indipendenti.",
    partners: "Locali Partner",
    select_city: "Seleziona città",
    select_partner: "Seleziona locale",
    shop_title: "Beer Pass Shop",
    buy: "Acquista",
    confirm: "Conferma Acquisto",
    cancel: "Annulla",
    coins_needed: "Costo",
    coin_shop: "Coin Shop",
    back: "← Torna alla Home",
    no_pass: "Non hai ancora un pass",
    qr_title: "Il tuo QR Code",
    simulate: "Simula riscatto",
    profile_title: "Il mio Profilo"
  }
};

/* ===== UTILS ===== */
function t(k){ return TRANSLATIONS[k] || k; }
function coinsForPass(p){ return Math.round(p.price * 120); }

/* ===== NAVIGATION ===== */
function navigateTo(screen){
  currentScreen = screen;
  if(screen === "home") showHome();
  if(screen === "partners") showPartners();
  if(screen === "shop") showShop();
  if(screen === "qr") showUsePass();
  if(screen === "profile") showProfile();
  updateNav();
}

/* ===== HOME ===== */
function showHome(){
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1>${t("home_title")}</h1>
      <p class="small">${t("home_sub")}</p>

      <div class="home-actions-grid">
        <button class="primary" onclick="navigateTo('partners')">${t("explore")}</button>
        <button class="primary" onclick="navigateTo('qr')">${t("use_pass")}</button>
        <button class="primary" onclick="navigateTo('shop')">${t("shop")}</button>
        <button class="secondary" onclick="navigateTo('profile')">${t("profile")}</button>
      </div>
    </div>

    <div class="community-box">
      <strong>${t("community")}</strong>
      <p class="small">${t("community_copy")}</p>
    </div>
  `;
}

/* ===== PARTNERS ===== */
function showPartners(){
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="card">
      <h2>🏪 Locali Partner</h2>
      <p class="small">
        Scopri i locali della community Beer Pass nella tua città.
      </p>

      <input id="partnerSearch"
             class="select-dark"
             placeholder="Cerca locale o città..." />

      <div id="partnerList" style="margin-top:12px; display:grid; gap:10px;"></div>

      <button class="secondary" onclick="navigateTo('home')">
        ← Torna alla Home
      </button>
    </div>
  `;

  const list = document.getElementById("partnerList");
  const search = document.getElementById("partnerSearch");

  function render(){
    const q = (search.value || "").toLowerCase();
    const filtered = PARTNERS.filter(p =>
      (p.name + p.city).toLowerCase().includes(q)
    );

    list.innerHTML = filtered.map(p=>`
      <div class="shop-card">
        <strong>${p.name}</strong>
        <div class="small">${p.city}</div>
        <div class="small">🎁 ${p.offer}</div>
        <button class="primary" onclick="navigateTo('qr')">
          Usa il pass qui
        </button>
      </div>
    `).join("");
  }

  search.oninput = render;
  render();
}


/* ===== SHOP ===== */
function showShop(){
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h2>${t("shop_title")}</h2>
      <div class="shop-grid">
        ${PASSES.map(p=>`
          <div class="shop-card">
            <strong>${p.name}</strong>
            <p class="small">${p.beers} 🍺</p>
            <p class="small">${t("coins_needed")}: ${coinsForPass(p)} coin</p>
            <button class="primary" onclick="checkout('${p.id}')">${t("buy")}</button>
          </div>
        `).join("")}
      </div>

      <h3>${t("coin_shop")}</h3>
      <div class="shop-grid">
        ${COIN_PACKS.map(c=>`
          <div class="shop-card">
            <strong>+${c.amount} coin</strong>
            <p class="small">${c.price}</p>
            <button class="primary" onclick="buyCoins(${c.amount})">${t("buy")}</button>
          </div>
        `).join("")}
      </div>

      <button class="secondary" onclick="navigateTo('home')">${t("back")}</button>
    </div>
  `;
}

function buyCoins(amount){
  userState.coins += amount;
  saveUserState(userState);
  navigateTo("shop");
}

/* ===== CHECKOUT ===== */
function checkout(id){
  const p = PASSES.find(x=>x.id===id);
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h2>${p.name}</h2>
      <p class="small">${t("coins_needed")}: ${coinsForPass(p)} coin</p>
      <button class="primary" onclick="confirmPurchase('${id}')">${t("confirm")}</button>
      <button class="secondary" onclick="navigateTo('shop')">${t("cancel")}</button>
    </div>
  `;
}

function confirmPurchase(id){
  userState.activePassId = id;
  saveUserState(userState);
  navigateTo("qr");
}

/* ===== USE PASS / QR ===== */
function showUsePass(){
 if(!userState.activePassId){
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h2>🎫 Non hai ancora un Beer Pass</h2>

      <p class="small">
        Acquista un Beer Pass per iniziare a riscattare birre
        nei migliori locali partner della tua città.
      </p>

      <div class="community-box">
        <strong>Perché conviene?</strong>
        <ul class="small">
          <li>🍺 Birre incluse nel prezzo</li>
          <li>🏪 Supporti i pub indipendenti</li>
          <li>⭐ Sblocchi badge e bonus</li>
        </ul>
      </div>

      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
        <button class="primary" onclick="navigateTo('shop')">
          Vai allo Shop
        </button>
        <button class="secondary" onclick="navigateTo('home')">
          Torna alla Home
        </button>
      </div>
    </div>
  `;
  return;
}


  const code = `BP-${Math.random().toString(36).substring(2,8).toUpperCase()}`;
  document.getElementById("app").innerHTML = `
    <div class="card" style="text-align:center">
      <h2>${t("qr_title")}</h2>
      <div class="qr-wrap"><div id="qrcode"></div></div>
      <div class="code-box">${code}</div>
      <button class="primary" onclick="navigateTo('home')">${t("simulate")}</button>
    </div>
  `;
  const el = document.getElementById("qrcode");
  qrInstance = new QRCode(el,{text:code,width:200,height:200});
}

/* ===== PROFILE ===== */
function showProfile(){
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h2>👤 Il mio Profilo</h2>

      <div class="profile-grid">
        <div class="profile-stat">
          <div class="small">🍺 Birre riscattate</div>
          <strong>${userState.redemptions.length}</strong>
        </div>

        <div class="profile-stat">
          <div class="small">💰 Coin</div>
          <strong>${userState.coins}</strong>
        </div>

        <div class="profile-stat">
          <div class="small">🎫 Pass attivo</div>
          <strong>${userState.activePassId || "—"}</strong>
        </div>
      </div>

      <div class="community-box" style="margin-top:14px;">
        <strong>Community Explorer</strong>
        <p class="small">
          Continua a visitare locali per sbloccare badge e premi esclusivi.
        </p>
      </div>

      <button class="secondary" onclick="navigateTo('home')">
        ← Torna alla Home
      </button>
    </div>
  `;
}


/* ===== NAV UI ===== */
function updateNav(){
  const map={
    home:"🏠 Home",
    partners:"🏪 Locali",
    qr:"📱 QR",
    profile:"👤 Profilo"
  };
  document.querySelectorAll(".nav-btn").forEach(b=>{
    b.textContent = map[b.dataset.page];
    b.classList.toggle("active", b.dataset.page===currentScreen);
  });
  document.getElementById("coinHeaderValue").textContent = userState.coins;
}

function toggleLangBar(){
  const bar = document.getElementById("langBar");
  if(bar) bar.classList.toggle("hidden");
}

function toggleLangBar(){
  const bar = document.getElementById("langBar");
  if(bar) bar.classList.toggle("hidden");
}

function renderLangBar(){
  const bar = document.getElementById("langBar");
  if(!bar) return;

  const langs = [
    ["it","🇮🇹 Italiano"],
    ["en","🇬🇧 English"],
    ["fr","🇫🇷 Français"],
    ["de","🇩🇪 Deutsch"],
    ["es","🇪🇸 Español"]
  ];

  bar.innerHTML = langs.map(([code,label])=>`
    <button class="lang-chip ${currentLang===code?"active":""}"
            onclick="setLang('${code}')">
      ${label}
    </button>
  `).join("");
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded",()=>{
  TRANSLATIONS = TRANSLATION_PACKS.it;
  document.getElementById("brandSub").textContent = "Bevi • Scopri • Ripeti";
  document.getElementById("shopBtn").onclick = ()=>navigateTo("shop");
  document.getElementById("langBtn").onclick = ()=>document.getElementById("langBar").classList.toggle("hidden");
  document.getElementById("langBtn").onclick = toggleLangBar;
  document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>navigateTo(b.dataset.page));
  navigateTo("home");
});
