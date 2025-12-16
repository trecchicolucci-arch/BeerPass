// app.js - Versione completa

// ==================== GLOBAL DATA ====================
let partners = [];
let passes = [];
let cities = [];
let TRANSLATIONS = {};
let currentLang = "it";
let currentScreen = "home";
let currentScreenPayload = null;
let userState = loadProfiles();

const AI_REVIEW_HINTS = [
  "Ottima atmosfera e birre di qualità!",
  "Personale cordiale e servizio veloce.",
  "Ampia selezione di birre artigianali.",
  "Locale accogliente, perfetto per una serata tra amici."
];

// ==================== DATA LOADING ====================
async function loadData() {
  try {
    // Carica partners
    const partnersRes = await fetch('partners.json');
    if (partnersRes.ok) partners = await partnersRes.json();
    else partners = getDemoPartners();

    // Carica passes
    const passesRes = await fetch('passes.json');
    if (passesRes.ok) passes = await passesRes.json();
    else passes = getDemoPasses();

    // Carica cities
    const citiesRes = await fetch('cities.json');
    if (citiesRes.ok) cities = await citiesRes.json();
    else cities = getDemoCities();

    // Carica traduzioni
    TRANSLATIONS = {
      checkout_title: "Conferma Acquisto",
      you_buying: "Stai acquistando:",
      confirm_purchase: "Conferma",
      cancel_purchase: "Annulla",
      review_title: "Recensisci",
      review_sub: "Come è stata la tua esperienza?",
      review_placeholder: "Scrivi la tua recensione...",
      review_send: "Invia Recensione",
      back_home: "← Torna alla Home",
      review_thanks: "Grazie per la recensione!",
      fav_title: "Aggiungi ai preferiti",
      area_label: "Centro",
      staff_select_partner_first: "Seleziona prima un locale",
      staff_no_pending: "Nessuna validazione in sospeso",
      code_used: "Codice già utilizzato",
      staff_wrong_partner: "Codice non valido per questo locale",
      staff_wrong_code: "Codice errato",
      staff_expired: "Codice scaduto",
      redeemed_ok: "✅ Riscatto Completato!",
      redeemed_from: "Hai riscattato da",
      bonus_ok: "Bonus Beer Explorer utilizzato!",
      standard_ok: "Hai guadagnato 50 coin!",
      success_missing: "Ti mancano {n} riscatti per sbloccare il badge Beer Explorer!",
      success_unlocked: "🎉 Badge Beer Explorer sbloccato!",
      go_profile: "Vai al Profilo",
      keep_exploring: "Continua a Esplorare",
      leave_review: "Lascia una Recensione"
    };

  } catch (err) {
    console.error("Errore caricamento dati:", err);
    partners = getDemoPartners();
    passes = getDemoPasses();
    cities = getDemoCities();
  }
}

// ==================== DEMO DATA ====================
function getDemoPartners() {
  return [
    { id: 1, name: "Birrificio Milano Centro", city: "Milano", area: "Centro", address: "Via Dante 12", type: "Pub", offer: "1 birra media gratis" },
    { id: 2, name: "The Dublin Pub", city: "Milano", area: "Navigli", address: "Naviglio Grande 45", type: "Pub", offer: "1 pinta gratis" },
    { id: 3, name: "Craft Beer House", city: "Roma", area: "Trastevere", address: "Via della Lungaretta 23", type: "Birreria", offer: "1 birra artigianale" },
    { id: 4, name: "Hoppy Corner", city: "Firenze", area: "Centro Storico", address: "Piazza Santa Croce 8", type: "Pub", offer: "1 birra media" },
    { id: 5, name: "Belgian Beer Café", city: "Bologna", area: "Universitaria", address: "Via Zamboni 16", type: "Caffè", offer: "1 birra belga" }
  ];
}

function getDemoPasses() {
  return [
    { id: "pass_basic", name: "Beer Pass Basic", price: 19.9, duration: "30 giorni", beers: 10, cities: ["Milano"] },
    { id: "pass_premium", name: "Beer Pass Premium", price: 39.9, duration: "30 giorni", beers: 25, cities: ["Milano", "Roma", "Firenze"] },
    { id: "pass_explorer", name: "Beer Pass Explorer", price: 59.9, duration: "60 giorni", beers: 50, cities: ["Tutte"] }
  ];
}

function getDemoCities() {
  return [
    { id: "milano", name: "Milano", status: "live", partners: 45, beers: 120 },
    { id: "roma", name: "Roma", status: "live", partners: 38, beers: 95 },
    { id: "firenze", name: "Firenze", status: "soon", partners: 0, beers: 0 },
    { id: "bologna", name: "Bologna", status: "soon", partners: 0, beers: 0 }
  ];
}

// ==================== NAVIGATION ====================
function navigateTo(page, payload = null) {
  const currentScreenLocal = page;
  const currentScreenPayloadLocal = payload;
  
  switch(page) {
    case "home": mostraHome(); break;
    case "partners": mostraListaPartnerGlobale(); break;
    case "qr": mostraQrCode(); break;
    case "passes": mostraPaginaPassGlobale(); break;
    case "shop": showCoinShop(); break;
    case "redemption": mostraStoricoRiscatti(); break;
    case "reviews": mostraRecensioniUtente(); break;
    case "cities": mostraCitta(); break;
    case "profile": mostraProfilo(); break;
    default: mostraHome();
  }
}

// ==================== HOME ====================
function mostraHome() {
  const app = document.getElementById("app");
  if (!app) return;

  const redemptionsCount = userState.redemptions?.length || 0;
  const reviewsCount = userState.reviews?.length || 0;
  const passesCount = userState.activePassId ? 1 : 0;

  app.innerHTML = `
    <div class="home-hero foam-window">
      <h1 class="home-title">Benvenuto in Beer Pass Europe! 🍻</h1>
      <p class="home-sub">Scopri i migliori locali, accumula monete e goditi la tua birra preferita</p>
      
      <div class="home-kpi">
        <div class="kpi-pill">🎫 ${passesCount} Pass Attivi</div>
        <div class="kpi-pill">🍺 ${redemptionsCount} Birre Riscattate</div>
        <div class="kpi-pill">⭐ ${reviewsCount} Recensioni</div>
      </div>

      <div class="home-actions">
        <button class="primary" onclick="navigateTo('partners')">🏪 Esplora Locali</button>
        <button class="primary" onclick="navigateTo('qr')">📱 Mostra QR</button>
      </div>
    </div>

    ${userState.activePassId ? renderActivePassSection() : renderNoPassCTA()}

    <div class="section-title" style="margin-top: 30px;">Accesso Rapido</div>
    <div class="grid">
      <div class="card foam-window" onclick="navigateTo('passes')" style="cursor: pointer;">
        <div style="font-size: 32px; margin-bottom: 8px;">🎫</div>
        <h3 style="margin: 0 0 4px 0; font-size: 16px;">I Miei Pass</h3>
        <p class="meta">Gestisci i tuoi abbonamenti</p>
      </div>

      <div class="card foam-window" onclick="navigateTo('redemption')" style="cursor: pointer;">
        <div style="font-size: 32px; margin-bottom: 8px;">✅</div>
        <h3 style="margin: 0 0 4px 0; font-size: 16px;">Riscatti</h3>
        <p class="meta">Storico delle tue birre</p>
      </div>

      <div class="card foam-window" onclick="navigateTo('reviews')" style="cursor: pointer;">
        <div style="font-size: 32px; margin-bottom: 8px;">⭐</div>
        <h3 style="margin: 0 0 4px 0; font-size: 16px;">Recensioni</h3>
        <p class="meta">Valuta i locali visitati</p>
      </div>

      <div class="card foam-window" onclick="navigateTo('cities')" style="cursor: pointer;">
        <div style="font-size: 32px; margin-bottom: 8px;">🌍</div>
        <h3 style="margin: 0 0 4px 0; font-size: 16px;">Città</h3>
        <p class="meta">Dove siamo presenti</p>
      </div>
    </div>

    <div id="coinShopSection" style="margin-top: 30px;">
      ${renderCoinShopSection()}
    </div>
  `;

  afterRender();
}

function renderActivePassSection() {
  const pass = passes.find(p => p.id === userState.activePassId);
  if (!pass) return "";

  return `
    <div class="card foam-window" style="margin-top: 20px; background: linear-gradient(135deg, rgba(56,189,248,0.25), rgba(167,139,250,0.25)); border: 2px solid rgba(56,189,248,0.5);">
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div>
          <div style="font-size: 32px; margin-bottom: 8px;">🎫</div>
          <h2 style="margin: 0 0 8px 0; color: var(--foam);">Pass Attivo</h2>
          <p style="margin: 0; font-size: 18px; font-weight: 900;">${pass.name}</p>
          <p class="meta" style="margin-top: 4px;">Valido per ${pass.duration} • ${pass.beers} birre</p>
        </div>
        <button class="secondary" onclick="disattivaPass()" style="margin-top: 0;">Disattiva</button>
      </div>
    </div>
  `;
}

function renderNoPassCTA() {
  return `
    <div class="card foam-window" style="margin-top: 20px; background: linear-gradient(135deg, rgba(245,158,11,0.20), rgba(251,191,36,0.15)); border: 2px dashed rgba(245,158,11,0.5); text-align: center;">
      <div style="font-size: 48px; margin-bottom: 12px;">🎫</div>
      <h3 style="margin: 0 0 8px 0; color: var(--beer-gold);">Non hai ancora un pass!</h3>
      <p class="meta" style="margin-bottom: 16px;">Acquista un pass per iniziare a riscattare birre nei migliori locali</p>
      <button class="primary" onclick="navigateTo('passes')">Scopri i Pass Disponibili</button>
    </div>
  `;
}

function renderCoinShopSection() {
  if (!userState.coins) userState.coins = 0;
  
  return `
    <div class="coin-shop-wrap">
      <div class="coin-shop-hero foam-window">
        <div style="font-size: 48px; margin-bottom: 10px;">💰</div>
        <h2 class="coin-shop-title">Coin Shop</h2>
        <p class="coin-shop-sub" style="margin-bottom: 12px;">Saldo attuale: <strong style="color: var(--beer-gold); font-size: 20px;">${userState.coins} coin</strong></p>
      </div>

      <div class="coin-shop-packs">
        <div class="coin-pack-card foam-window" onclick="acquistaCoinPack(1200)">
          <div class="coin-pack-ribbon">POPOLARE</div>
          <div class="coin-pack-main">
            <div class="coin-pack-amount">
              <span>+1.200</span>
              <span>coin</span>
            </div>
            <div class="coin-pack-icon">💰</div>
          </div>
          <div class="coin-pack-price">9,90 €</div>
          <button class="primary coin-pack-btn">Acquista</button>
        </div>

        <div class="coin-pack-card foam-window" onclick="acquistaCoinPack(5300)">
          <div class="coin-pack-ribbon">BEST VALUE</div>
          <div class="coin-pack-main">
            <div class="coin-pack-amount">
              <span>+5.300</span>
              <span>coin</span>
            </div>
            <div class="coin-pack-icon">💎</div>
          </div>
          <div class="coin-pack-price">39,90 €</div>
          <button class="primary coin-pack-btn">Acquista</button>
        </div>

        <div class="coin-pack-card foam-window" onclick="acquistaCoinPack(11000)">
          <div class="coin-pack-ribbon">MEGA PACK</div>
          <div class="coin-pack-main">
            <div class="coin-pack-amount">
              <span>+11.000</span>
              <span>coin</span>
            </div>
            <div class="coin-pack-icon">🏆</div>
          </div>
          <div class="coin-pack-price">79,90 €</div>
          <button class="primary coin-pack-btn">Acquista</button>
        </div>
      </div>

      <div class="coin-shop-missions">
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">🎯 Guadagna Coin Gratis</h3>
        <div class="coin-mission-row">
          <span class="coin-mission-label">Lascia una recensione</span>
          <span class="coin-mission-reward">+10 coin</span>
        </div>
        <div class="coin-mission-row">
          <span class="coin-mission-label">Riscatta una birra</span>
          <span class="coin-mission-reward">+50 coin</span>
        </div>
        <div class="coin-mission-row">
          <span class="coin-mission-label">Sblocca un badge</span>
          <span class="coin-mission-reward">+100 coin</span>
        </div>
      </div>
    </div>
  `;
}

// ==================== PARTNERS ====================
let listEl, searchEl;

function mostraListaPartnerGlobale() {
  const app = document.getElementById("app");
  
  app.innerHTML = `
    <div class="card">
      <h2>🏪 Locali Partner</h2>
      <input type="text" id="searchPartners" class="staff-search" placeholder="Cerca locale o città..." />
      <div id="partnersList" style="margin-top: 15px;"></div>
      <button class="secondary" onclick="navigateTo('home')" style="margin-top: 15px;">← Torna alla Home</button>
    </div>
  `;

  listEl = document.getElementById("partnersList");
  searchEl = document.getElementById("searchPartners");
  
  searchEl.addEventListener("input", () => renderList(searchEl.value));
  renderList();
  afterRender();
}

function orderedPartners() {
  const favSet = new Set(userState.staffFavs || []);
  return [...partners].sort((a, b) => {
    const aFav = favSet.has(a.id) ? 1 : 0;
    const bFav = favSet.has(b.id) ? 1 : 0;
    return bFav - aFav;
  });
}

// ==================== QR CODE ====================
function mostraQrCode() {
  const app = document.getElementById("app");
  
  if (!userState.activePassId) {
    app.innerHTML = `
      <div class="card">
        <h2>📱 Il Mio QR Code</h2>
        <p>Non hai un pass attivo. Acquistane uno per generare il tuo QR code!</p>
        <button class="primary" onclick="navigateTo('passes')">Acquista Pass</button>
        <button class="secondary" onclick="navigateTo('home')">← Torna alla Home</button>
      </div>
    `;
    afterRender();
    return;
  }

  const qrCode = generateQrCode();
  
  app.innerHTML = `
    <div class="card" style="text-align: center;">
      <h2>📱 Il Tuo QR Code</h2>
      <p class="small">Mostra questo codice al locale per riscattare la tua birra</p>
      <div id="qrcode" style="display: flex; justify-content: center; margin: 20px 0;"></div>
      <div style="background: #f3f4f6; padding: 10px; border-radius: 8px; margin: 15px 0;">
        <strong>Codice: ${qrCode}</strong>
      </div>
      <p class="small">Valido per: 10 minuti</p>
      <button class="primary" onclick="refreshQrCode()">🔄 Genera Nuovo Codice</button>
      <button class="secondary" onclick="navigateTo('home')">← Torna alla Home</button>
    </div>
  `;

  // Genera QR visivo
  const qrCodeElement = new QRCode(document.getElementById("qrcode"), {
    text: qrCode,
    width: 200,
    height: 200
  });
  console.log("QR Code generato:", qrCodeElement);

  afterRender();
}

function generateQrCode() {
  const code = `BP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  userState.pendingValidation = {
    code: code,
    partnerId: null,
    expiresAt: Date.now() + 10 * 60 * 1000,
    used: false,
    useReward: false
  };
  saveProfiles();
  return code;
}

function refreshQrCode() {
  mostraQrCode();
}

// ==================== PASSES ====================
function mostraPaginaPassGlobale() {
  const app = document.getElementById("app");
  
  app.innerHTML = `
    <div class="card">
      <h2>🎫 Pass Disponibili</h2>
      ${userState.activePassId ? `
        <div style="background: #d1fae5; padding: 12px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #6ee7b7;">
          <strong>✅ Hai un pass attivo!</strong>
          <button class="secondary" onclick="disattivaPass()" style="margin-top: 8px;">Disattiva Pass</button>
        </div>
      ` : ""}
      
      <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
        ${passes.map(pass => `
          <div class="card" style="background: #f9fafb; border: 2px solid #e5e7eb;">
            <h3>${pass.name}</h3>
            <p><strong>${pass.price.toFixed(2)} €</strong> • ${pass.duration}</p>
            <p class="small">${pass.beers} birre • Città: ${Array.isArray(pass.cities) ? pass.cities.join(", ") : pass.cities}</p>
            <button class="primary" onclick="mostraCheckout('${pass.id}')" ${userState.activePassId ? 'disabled' : ''}>
              ${userState.activePassId ? 'Hai già un pass' : 'Acquista'}
            </button>
          </div>
        `).join("")}
      </div>
      
      <button class="secondary" onclick="navigateTo('home')" style="margin-top: 15px;">← Torna alla Home</button>
    </div>
  `;
  
  afterRender();
}

// ==================== REDEMPTION HISTORY ====================
function mostraStoricoRiscatti() {
  const app = document.getElementById("app");
  const redemptions = userState.redemptions || [];
  
  app.innerHTML = `
    <div class="card">
      <h2>✅ Storico Riscatti</h2>
      ${redemptions.length === 0 ? `
        <p class="small">Non hai ancora riscattato nessuna birra. Inizia a esplorare i locali partner!</p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
          ${redemptions.map(r => `
            <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <strong>${r.partnerName}</strong>
              <div class="small">${r.city} • ${r.date}</div>
              <div class="small">${r.offer}${r.bonus ? ' • 🎁 Bonus' : ''}</div>
            </div>
          `).join("")}
        </div>
      `}
      <button class="secondary" onclick="navigateTo('home')" style="margin-top: 15px;">← Torna alla Home</button>
    </div>
  `;
  
  afterRender();
}

// ==================== REVIEWS ====================
function mostraRecensioniUtente() {
  const app = document.getElementById("app");
  const reviews = userState.reviews || [];
  
  app.innerHTML = `
    <div class="card">
      <h2>⭐ Le Mie Recensioni</h2>
      ${reviews.length === 0 ? `
        <p class="small">Non hai ancora lasciato recensioni. Visita un locale e condividi la tua esperienza!</p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
          ${reviews.map(r => `
            <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <strong>${r.partnerName}</strong>
              <div class="stars" style="color: #fbbf24; margin: 5px 0;">
                ${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}
              </div>
              <div class="small">${r.text}</div>
              <div class="small" style="color: #6b7280; margin-top: 5px;">${r.date}</div>
            </div>
          `).join("")}
        </div>
      `}
      <button class="secondary" onclick="navigateTo('home')" style="margin-top: 15px;">← Torna alla Home</button>
    </div>
  `;
  
  afterRender();
}

// ==================== CITIES ====================
function mostraCitta() {
  const app = document.getElementById("app");
  
  app.innerHTML = `
    <div class="card">
      <h2>🌍 Città Disponibili</h2>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 15px;">
        ${cities.map(city => `
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${city.name}</strong>
              <span class="city-status ${city.status}">${city.status === 'live' ? '🟢 Attiva' : '🟡 Prossimamente'}</span>
            </div>
            ${city.status === 'live' ? `
              <div class="city-counts">
                <span>${city.partners} locali</span>
                <span>${city.beers} birre disponibili</span>
              </div>
            ` : ''}
          </div>
        `).join("")}
      </div>
      <button class="secondary" onclick="navigateTo('home')" style="margin-top: 15px;">← Torna alla Home</button>
    </div>
  `;
  
  afterRender();
}

// ==================== PROFILE ====================
function mostraProfilo() {
  const app = document.getElementById("app");
  const badges = userState.badges || [];
  const rewards = userState.rewards || [];
  
  app.innerHTML = `
    <div class="card">
      <h2>👤 Il Mio Profilo</h2>
      
      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <strong>Statistiche</strong>
        <div style="margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <div class="small">Birre Riscattate</div>
            <strong style="font-size: 24px;">${userState.redemptions?.length || 0}</strong>
          </div>
          <div>
            <div class="small">Monete</div>
            <strong style="font-size: 24px; color: #f59e0b;">${userState.coins || 0}</strong>
          </div>
          <div>
            <div class="small">Recensioni</div>
            <strong style="font-size: 24px;">${userState.reviews?.length || 0}</strong>
          </div>
          <div>
            <div class="small">Badge</div>
            <strong style="font-size: 24px;">${badges.length}</strong>
          </div>
        </div>
      </div>

      ${badges.length > 0 ? `
        <div style="margin: 20px 0;">
          <strong>🏆 I Tuoi Badge</strong>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
            ${badges.map(b => `<span class="badge">${b}</span>`).join("")}
          </div>
        </div>
      ` : ""}

      ${rewards.length > 0 ? `
        <div style="margin: 20px 0;">
          <strong>🎁 Ricompense</strong>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
            ${rewards.map(r => `
              <div style="background: ${r.used ? '#f3f4f6' : '#d1fae5'}; padding: 12px; border-radius: 8px; border: 1px solid ${r.used ? '#e5e7eb' : '#6ee7b7'};">
                <strong>${r.title}</strong>
                <div class="small">${r.text}</div>
                ${r.used ? '<div class="small" style="color: #6b7280;">✓ Utilizzata</div>' : '<div class="small" style="color: #059669;">✨ Disponibile</div>'}
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <button class="primary" onclick="logout()" style="margin-top: 20px; background: #ef4444;">Logout</button>
      <button class="secondary" onclick="navigateTo('home')" style="margin-top: 10px;">← Torna alla Home</button>
    </div>
  `;
  
  afterRender();
}

// ==================== REWARDS ====================
function getActiveExplorerRewardForPartner(city) {
  if (!userState.rewards) return null;
  return userState.rewards.find(r => 
    r.id === "reward_explorer" && 
    !r.used && 
    (r.scope === "global" || r.scope === "local")
  );
}

// ==================== UI HELPERS ====================
function afterRender() {
  updateCoinDisplay();
  updateNavBar();
}

function updateCoinDisplay() {
  const coinValue = document.getElementById("coinHeaderValue");
  if (coinValue) {
    coinValue.textContent = userState.coins || 0;
  }
}

function updateNavBar() {
  const navBar = document.getElementById("navBar");
  if (navBar) {
    navBar.classList.remove("hidden");
    
    const navBtns = navBar.querySelectorAll(".nav-btn");
    navBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === currentScreen);
    });
  }
}

function renderUserGreeting() {
  const greetingEl = document.getElementById("userGreeting");
  if (greetingEl && userState) {
    greetingEl.textContent = `Ciao! 👋`;
  }
}

function renderLangBar() {
  const langBar = document.getElementById("langBar");
  if (langBar) {
    langBar.innerHTML = `
      <button onclick="changeLang('it')">🇮🇹 Italiano</button>
      <button onclick="changeLang('en')">🇬🇧 English</button>
      <button onclick="changeLang('de')">🇩🇪 Deutsch</button>
    `;
  }
}

function toggleLangBar() {
  const langBar = document.getElementById("langBar");
  if (langBar) {
    langBar.classList.toggle("hidden");
  }
}

function changeLang(lang) {
  currentLang = lang;
  toggleLangBar();
  alert(`Lingua cambiata in: ${lang.toUpperCase()} (demo)`);
}

// ==================== AUTH ====================
function showLoginScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="card" style="max-width: 400px; margin: 50px auto;">
      <h2>🍺 Benvenuto!</h2>
      <p>Accedi per iniziare a usare Beer Pass</p>
      <button class="primary" onclick="login()">Accedi / Registrati</button>
    </div>
  `;
}

function login() {
  let localUserState = userState;
  if (!localUserState || Object.keys(localUserState).length === 0) {
    localUserState = {
      coins: 100,
      redemptions: [],
      reviews: [],
      badges: [],
      rewards: [],
      staffFavs: []
    };
    userState = localUserState;
    saveProfiles();
  }
  mostraHome();
}

function logout() {
  if (confirm("Sei sicuro di voler uscire?")) {
    userState = null;
    localStorage.removeItem("userState");
    showLoginScreen();
  }
}

// ==================== STARTUP ====================
function start() {
  console.log("🍺 Beer Pass Europe avviato!");
  updateNavBar();
}

// ==================== INIT ====================
await loadData();
ensureDoodles();

document.getElementById("langBtn")?.addEventListener("click", toggleLangBar);
renderLangBar();
renderUserGreeting();
updateCoinDisplay();

const coinBtn = document.getElementById("coinBtn");
if (coinBtn) coinBtn.addEventListener("click", () => navigateTo("shop"));

// Setup nav bar
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => navigateTo(btn.dataset.page));
});

if (userState && Object.keys(userState).length > 0) {
  mostraHome();
} else {
  showLoginScreen();
}

start();