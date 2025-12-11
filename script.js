// ==========================
// DATI
// ==========================
let partners = [];
let passes = [];
let citiesData = [];
let cities = [];
let currentCity = null;

// traccia schermata corrente per refresh lingua
let currentScreen = "home";
let currentScreenPayload = null;

// ==========================
// i18n (LINGUE)
// ==========================
const LANG_KEY = "beerpass_lang_v1";

const LANGS = {
  it: { label: "Italiano 🇮🇹" },
  en: { label: "English 🇬🇧" },
  fr: { label: "Français 🇫🇷" },
  es: { label: "Español 🇪🇸" },
  de: { label: "Deutsch 🇩🇪" }
};

const I18N = {
  it: {
    greeting: "Ciao {name} 👋",
    back_home: "← Torna alla Home",
    back_partners: "← Partner",
    back_cities: "← Città",
    back_passes: "← Pass",
    no_results: "Nessun risultato con questi filtri. Prova a cambiare città o tipo 🍺",

    home_title: "La tua Beer Dashboard",
    home_sub: "Pass, progressi e scorciatoie per esplorare.",
    home_no_pass: "Nessun pass attivo. Sblocca esperienze in città!",
    home_cta_pass: "Scopri i Pass",
    home_cta_partners: "Vedi tutti i Partner",
    home_cta_cities: "Esplora le Città",
    home_progress: "Progressi Beer Explorer",
    home_idea_title: "💬 Idee dalla community",
    home_kpi_redeems: "Riscatti totali",
    home_kpi_badges: "Badge",
    home_kpi_rewards: "Reward attive",

    coins_label: "Coin disponibili",
    coins_shop_title: "Negozio Coin",
    coins_shop_sub: "Trasforma euro in coin da usare per i pass (demo).",
    coins_pack_small: "Starter • 10€ → 1.200 coin",
    coins_pack_medium: "Traveller • 40€ → 5.300 coin",
    coins_pack_big: "Explorer • 80€ → 11.000 coin + bonus",
    coins_buy_btn: "Aggiungi coin",
    coins_balance: "Saldo attuale",

    passes_why_title: "Perché un pass?",
    passes_why_text:
      "Beer Pass non è solo sconto o degustazione: è una scusa felice per entrare in posti che contano. " +
      "Ti guida tra locali selezionati, ti dà obiettivi semplici, e fa nascere amicizie per caso. " +
      "È una micro-community itinerante, città per città.",

    choose_city: "Scegli una città",
    enter: "Entra",
    discover: "Scopri",
    city_detail_title: "Benvenuto a",
    city_detail_sub: "Qui trovi partner, pass locali e vibes del quartiere.",
    city_detail_live: "Città live",
    city_detail_soon: "Coming soon",
    city_detail_passes: "Pass disponibili in città",
    city_detail_partners: "Partner in città",
    city_detail_cta_partners: "Vedi partner",
    city_detail_cta_passes: "Vedi pass",
    city_detail_cta_back: "← Città",

    partners_title: "Tutti i partner aderenti",
    partners_in: "Partner a",
    see_details: "Vedi dettagli",
    publican_tip_label: "Publican tip",
    offer_pass: "Offerta Pass",
    city_label: "Città",
    area_label: "Zona",
    offer_label: "Offerta",
    open_maps: "Apri su Maps",
    map_preview: "📍 Anteprima mappa: posizione di",
    need_pass: "Per riscattare serve un pass attivo.",
    go_pass: "Vai ai Pass",
    premium_title: "🌍 Qui Premium ti sblocca subito",
    premium_cta: "Passa a Premium",
    premium_benefit1: "✅ Riscatti ovunque",
    premium_benefit2: "✅ Reward globali",
    premium_benefit3: "✅ Missione Europa Explorer",

    passes_title: "Pass disponibili",
    passes_sub: "Sblocca esperienze, risparmia e scopri la città dal lato giusto.",
    passes_premium_tag: "Premium Europe",
    passes_regular_tag: "Pass di città",
    passes_city_live: "LIVE",
    passes_city_soon: "SOON",
    passes_buy: "Acquista",
    passes_buy_premium: "Acquista Premium",
    passes_deactivate: "Disattiva",
    passes_choose_city: "Scegli città",
    all_cities: "Tutte",

    redeem: "Riscatta esperienza",
    use_reward_redeem: "Usa ricompensa + riscatta",
    reward_active: "🎁 Ricompensa attiva!",
    validation_title: "Convalida Pass",
    validation_hint: "Mostra questo QR o codice allo staff di",
    cancel: "Annulla",
    expires_in: "Scade tra {sec}s",
    expired_short: "Codice scaduto.",
    code_used: "Codice già usato.",
    redeemed_ok: "🎉 Riscatto riuscito!",
    redeemed_from: "Hai appena riscattato da",
    bonus_ok: "Bonus reward applicato ✅",
    standard_ok: "Riscatto standard ✅",
    keep_exploring: "Continua ad esplorare",
    go_profile: "Vai alla home",
    leave_review: "Lascia una recensione",
    success_missing: "Ti manca ancora {n} riscatto per il badge Beer Explorer 🏅",
    success_unlocked: "Badge Beer Explorer già sbloccato! Continua ad esplorare 🍺",

    review_title: "Com’è andata da",
    review_sub: "Aiuta la community: lascia una micro-recensione.",
    review_placeholder: "Scrivi due righe sul locale, sul servizio, sulle birre...",
    review_send: "Invia recensione",
    review_thanks: "Grazie! Recensione salvata 👑",

    checkout_title: "Checkout",
    you_buying: "Stai acquistando:",
    confirm_purchase: "Conferma acquisto",
    cancel_purchase: "Annulla",

    profile_title: "Profilo",
    name: "Nome",
    email: "Email",
    active_pass: "Pass attivo",
    none: "Nessuno",
    history: "Storico riscatti",
    badges: "Badge",
    rewards: "Ricompense",
    switch_account: "Cambia account",
    staff_mode: "Entra in Staff (demo)",

    login_welcome: "Benvenuto in Beer Pass 🍺",
    login_sub: "Scegli un profilo o creane uno nuovo.",
    login_new: "Crea nuovo profilo",
    login_create: "Crea profilo",
    login_saved: "I profili restano sul dispositivo.",
    login_name_ph: "Mario Rossi",
    login_email_ph: "mario@email.com",
    alert_invalid_profile: "Inserisci nome ed email validi.",

    staff_title: "Modalità Staff (demo)",
    staff_step: "1) scegli partner  2) inserisci codice  3) convalida",
    staff_filter_city: "Filtra per città",
    staff_partner: "Partner",
    staff_search_ph: "Cerca partner per nome o città...",
    staff_code: "Codice cliente",
    staff_code_ph: "Es. ABC123",
    staff_validate: "Convalida",
    staff_exit: "Esci Staff",
    staff_select_partner_first: "Seleziona prima un partner dalla lista.",
    staff_no_pending: "Nessuna convalida in attesa.",
    staff_wrong_partner: "Partner non corrisponde.",
    staff_wrong_code: "Codice errato.",
    staff_expired: "Codice scaduto.",
    staff_waiting_code: "Codice in attesa:",

    filter_label: "Filtra",
    search_partner_zone_ph: "Cerca per nome, zona...",
    all_types: "Tutti",
    fav_title: "Preferito",

    pass_active_pill: "Pass attivo: {pass} • {city}",
    premium_kpi_active: "attivo",
    premium_kpi_available: "disponibile"
  },

  en: {
    greeting: "Hi {name} 👋",
    back_home: "← Back to Home",
    back_partners: "← Partners",
    back_cities: "← Cities",
    back_passes: "← Passes",
    no_results: "No results with these filters. Try another city or type 🍺",

    home_title: "Your Beer Dashboard",
    home_sub: "Passes, progress, and shortcuts to explore.",
    home_no_pass: "No active pass yet. Unlock experiences in town!",
    home_cta_pass: "Discover Passes",
    home_cta_partners: "See All Partners",
    home_cta_cities: "Explore Cities",
    home_progress: "Beer Explorer Progress",
    home_idea_title: "💬 Community ideas",
    home_kpi_redeems: "Total redemptions",
    home_kpi_badges: "Badges",
    home_kpi_rewards: "Active rewards",

    coins_label: "Available coins",
    coins_shop_title: "Coin Shop",
    coins_shop_sub: "Convert euros into coins to use for passes (demo).",
    coins_pack_small: "Starter • €10 → 1,200 coins",
    coins_pack_medium: "Traveller • €40 → 5,300 coins",
    coins_pack_big: "Explorer • €80 → 11,000 coins + bonus",
    coins_buy_btn: "Add coins",
    coins_balance: "Current balance",

    passes_why_title: "Why a pass?",
    passes_why_text:
      "Beer Pass is not just a discount or tasting: it’s a happy excuse to enter places worth knowing. " +
      "It guides you through selected venues, gives you simple goals, and sparks friendships by chance. " +
      "A tiny traveling community, city by city.",

    choose_city: "Choose a city",
    enter: "Enter",
    discover: "Discover",
    city_detail_title: "Welcome to",
    city_detail_sub: "Here you’ll find partners, local passes and neighborhood vibes.",
    city_detail_live: "City live",
    city_detail_soon: "Coming soon",
    city_detail_passes: "Passes available in this city",
    city_detail_partners: "Partners in this city",
    city_detail_cta_partners: "See partners",
    city_detail_cta_passes: "See passes",
    city_detail_cta_back: "← Cities",

    partners_title: "All participating partners",
    partners_in: "Partners in",
    see_details: "See details",
    publican_tip_label: "Publican tip",
    offer_pass: "Pass offer",
    city_label: "City",
    area_label: "Area",
    offer_label: "Offer",
    open_maps: "Open in Maps",
    map_preview: "📍 Map preview: location of",
    need_pass: "You need an active pass to redeem.",
    go_pass: "Go to Passes",
    premium_title: "🌍 Premium unlocks this right away",
    premium_cta: "Upgrade to Premium",
    premium_benefit1: "✅ Redeem anywhere",
    premium_benefit2: "✅ Global rewards",
    premium_benefit3: "✅ Europe Explorer mission",

    passes_title: "Available passes",
    passes_sub: "Unlock experiences, save money, and enjoy the city the right way.",
    passes_premium_tag: "Premium Europe",
    passes_regular_tag: "City passes",
    passes_city_live: "LIVE",
    passes_city_soon: "SOON",
    passes_buy: "Buy",
    passes_buy_premium: "Buy Premium",
    passes_deactivate: "Deactivate",
    passes_choose_city: "Choose city",
    all_cities: "All",

    redeem: "Redeem experience",
    use_reward_redeem: "Use reward + redeem",
    reward_active: "🎁 Active reward!",
    validation_title: "Pass Validation",
    validation_hint: "Show this QR or code to the staff of",
    cancel: "Cancel",
    expires_in: "Expires in {sec}s",
    expired_short: "Code expired.",
    code_used: "Code already used.",
    redeemed_ok: "🎉 Redemption successful!",
    redeemed_from: "You just redeemed at",
    bonus_ok: "Reward bonus applied ✅",
    standard_ok: "Standard redemption ✅",
    keep_exploring: "Keep exploring",
    go_profile: "Go to home",
    leave_review: "Leave a review",
    success_missing: "You still need {n} redemption for the Beer Explorer badge 🏅",
    success_unlocked: "Beer Explorer badge already unlocked! Keep exploring 🍺",

    review_title: "How was it at",
    review_sub: "Help the community: leave a short review.",
    review_placeholder: "Write a couple of lines about the place, service, beers...",
    review_send: "Send review",
    review_thanks: "Thanks! Review saved 👑",

    checkout_title: "Checkout",
    you_buying: "You are buying:",
    confirm_purchase: "Confirm purchase",
    cancel_purchase: "Cancel",

    profile_title: "Profile",
    name: "Name",
    email: "Email",
    active_pass: "Active pass",
    none: "None",
    history: "Redemption history",
    badges: "Badges",
    rewards: "Rewards",
    switch_account: "Switch account",
    staff_mode: "Enter Staff (demo)",

    login_welcome: "Welcome to Beer Pass 🍺",
    login_sub: "Choose a profile or create a new one.",
    login_new: "Create new profile",
    login_create: "Create profile",
    login_saved: "Profiles stay on this device.",
    login_name_ph: "John Doe",
    login_email_ph: "john@email.com",
    alert_invalid_profile: "Enter a valid name and email.",

    staff_title: "Staff Mode (demo)",
    staff_step: "1) pick partner  2) enter code  3) validate",
    staff_filter_city: "Filter by city",
    staff_partner: "Partner",
    staff_search_ph: "Search partner by name or city...",
    staff_code: "Customer code",
    staff_code_ph: "E.g. ABC123",
    staff_validate: "Validate",
    staff_exit: "Exit Staff",
    staff_select_partner_first: "Select a partner first.",
    staff_no_pending: "No pending validation.",
    staff_wrong_partner: "Partner doesn't match.",
    staff_wrong_code: "Wrong code.",
    staff_expired: "Code expired.",
    staff_waiting_code: "Waiting code:",

    filter_label: "Filter",
    search_partner_zone_ph: "Search by name, area...",
    all_types: "All",
    fav_title: "Favorite",

    pass_active_pill: "Active pass: {pass} • {city}",
    premium_kpi_active: "active",
    premium_kpi_available: "available"
  },

  fr: { /* invariato */ },
  es: { /* invariato */ },
  de: { /* invariato */ }
};

let currentLang = localStorage.getItem(LANG_KEY) || "it";
function t(key){
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.it[key] || key;
}
function fmt(key, vars = {}){
  let s = t(key);
  Object.keys(vars).forEach(k => s = s.replaceAll(`{${k}}`, vars[k]));
  return s;
}
function setLang(lang){
  if(!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  renderLangBar();
  refreshCurrentScreen();
  renderUserGreeting();
  afterRender();
}
function renderLangBar(){
  const bar = document.getElementById("langBar");
  if(!bar) return;
  bar.innerHTML = Object.keys(LANGS).map(code => `
    <div class="lang-chip ${code===currentLang?"active":""}" data-lang="${code}">
      ${LANGS[code].label}
    </div>
  `).join("");
  bar.querySelectorAll(".lang-chip").forEach(chip=>{
    chip.addEventListener("click", ()=> setLang(chip.dataset.lang));
  });
}
function toggleLangBar(){
  const bar = document.getElementById("langBar");
  if(!bar) return;
  bar.classList.toggle("hidden");
}

function refreshCurrentScreen(){
  const p = currentScreenPayload;
  if(currentScreen==="home") mostraHome();
  else if(currentScreen==="cities") mostraCitta();
  else if(currentScreen==="city_detail") mostraCityDetail(p?.city || currentCity);
  else if(currentScreen==="passes") mostraPaginaPassGlobale();
  else if(currentScreen==="partners_global") mostraListaPartnerGlobale();
  else if(currentScreen==="partners_local") mostraListaPartnerLocale();
  else if(currentScreen==="partner_detail") apriSchedaPartner(p?.partnerId);
  else if(currentScreen==="checkout") mostraCheckout(p?.passId);
  else if(currentScreen==="validation") refreshValidation(p?.partnerId);
  else if(currentScreen==="review") showReviewScreen(p?.partnerId);
  else if(currentScreen==="staff") showStaffPage();
  else if(currentScreen==="coin_shop") showCoinShop();
  else mostraHome();

}


// ==========================
// CUSTOM DROPDOWN HELPER
// ==========================
function setupDropdown(containerEl, options, initialValue, onChange){
  containerEl.innerHTML = `
    <div class="dd">
      <button class="dd-btn" type="button">
        <span class="dd-label"></span>
        <span class="chev">▾</span>
      </button>
      <div class="dd-list hidden"></div>
    </div>
  `;
  const dd = containerEl.querySelector(".dd");
  const btn = containerEl.querySelector(".dd-btn");
  const label = containerEl.querySelector(".dd-label");
  const list = containerEl.querySelector(".dd-list");

  let value = initialValue ?? options[0];

  function renderList(){
    list.innerHTML = options.map(opt=>{
      const active = opt===value ? "active" : "";
      return `<div class="dd-item ${active}" data-v="${opt}">${opt}</div>`;
    }).join("");
    list.querySelectorAll(".dd-item").forEach(item=>{
      item.addEventListener("click", ()=>{
        value = item.dataset.v;
        label.textContent = value;
        dd.classList.remove("open");
        list.classList.add("hidden");
        renderList();
        onChange(value);
      });
    });
  }

  label.textContent = value;
  renderList();

  btn.addEventListener("click", ()=>{
    dd.classList.toggle("open");
    list.classList.toggle("hidden");
  });

  document.addEventListener("click", (e)=>{
    if(!dd.contains(e.target)){
      dd.classList.remove("open");
      list.classList.add("hidden");
    }
  });

  return {
    getValue: ()=>value,
    setValue: (v)=>{
      if(options.includes(v)){
        value=v; label.textContent=v; renderList(); onChange(v);
      }
    }
  };
}

// ==========================
// MULTI-UTENTE LOCALE
// ==========================
const PROFILES_KEY = "beerpass_profiles_v1";
const ACTIVE_KEY = "beerpass_active_profile_v1";

function safeUUID(){
  if(window.crypto && typeof crypto.randomUUID==="function") return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c=>{
    const r = (Math.random()*16)|0;
    const v = c==="x" ? r : (r&0x3)|0x8;
    return v.toString(16);
  });
}

function makeEmptyProfile(name, email){
  return {
    id: safeUUID(),
    name, email,
    coins: 0, // saldo coin iniziale
    activePassId:null,
    redemptions:[],
    badges:[],
    rewards:[],
    reviews:[],
    pendingPurchaseId:null,
    pendingValidation:null,
    staffFavs:[],
    missionsClaimed:[] // id missioni già riscattate
  };
}

let profiles = loadProfiles();
let activeProfileId = localStorage.getItem(ACTIVE_KEY);
let userState = getActiveProfile();

function loadProfiles(){
  const raw = localStorage.getItem(PROFILES_KEY);
  if(!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}
function saveProfiles(){
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  if(activeProfileId) localStorage.setItem(ACTIVE_KEY, activeProfileId);
}
function getActiveProfile(){
  if(!activeProfileId) return null;
  return profiles.find(p=>p.id===activeProfileId) || null;
}
function setActiveProfile(id){
    if (userState) {
    if (typeof userState.coins !== "number") userState.coins = 0;
    if (!Array.isArray(userState.missionsClaimed)) userState.missionsClaimed = [];
  }
  activeProfileId = id;
  userState = getActiveProfile();
  saveProfiles();
  renderUserGreeting();
  mostraHome();
}
function logoutToSwitch(){
  activeProfileId=null; userState=null;
  localStorage.removeItem(ACTIVE_KEY);
  renderUserGreeting();
  showLoginScreen();
}

function toggleVip(){
  if(!userState) return;
  userState.isVip = !userState.isVip;
  saveProfiles();
  mostraHome();
}

// ==========================
// APP CORE
// ==========================
const app = document.getElementById("app");
const passStatusEl = document.getElementById("passStatus");
const userGreetingEl = document.getElementById("userGreeting");

// doodles layer injection
function ensureDoodles(){
  if(document.querySelector(".beer-doodles")) return;
  const doodles = document.createElement("div");
  doodles.className="beer-doodles";
  doodles.innerHTML = `
    <div class="glass" style="left:4%; top:18%;"></div>
    <div class="glass" style="right:6%; top:52%; transform:rotate(8deg) scale(.9);"></div>
    <div class="drop" style="left:14%; top:62%;"></div>
    <div class="drop" style="right:18%; top:28%; animation-delay:1.2s;"></div>
    <div class="drop" style="left:50%; top:80%; width:14px; height:20px; animation-delay:.6s;"></div>
  `;
  document.body.appendChild(doodles);
}

// ==========================
// BEER FOAM WINDOW (vanilla runtime)
// ==========================
function decorateFoamWindows(){
  const targets = document.querySelectorAll(".card, .pass-card, .home-hero");
  targets.forEach(el=>{
    if(el.classList.contains("foam-window")) return;
    el.classList.add("foam-window");

    const dropsWrap = document.createElement("div");
    dropsWrap.className = "foam-drops";
    const dropCount = 7;
    for(let i=0;i<dropCount;i++){
      const d = document.createElement("div");
      d.className = "foam-drop";
      const left = Math.random()*90 + 5;
      const delay = Math.random()*2.5;
      const duration = 2 + Math.random()*1.6;
      d.style.left = left + "%";
      d.style.animationDuration = duration + "s";
      d.style.animationDelay = delay + "s";
      dropsWrap.appendChild(d);
    }
    el.appendChild(dropsWrap);

    const bubblesWrap = document.createElement("div");
    bubblesWrap.className = "foam-bubbles";
    const bubbleXs = [8, 22, 36, 50, 64, 78, 92];
    bubbleXs.forEach((x,i)=>{
      const b = document.createElement("div");
      b.className="foam-bubble";
      b.style.left = x + "%";
      b.style.bottom = (8 + Math.random()*8) + "px";
      b.style.animationDelay = (i*0.45) + "s";
      bubblesWrap.appendChild(b);
    });
    el.appendChild(bubblesWrap);
  });
}

function afterRender(){
  renderPassStatus();
  decorateFoamWindows();
  updateCoinDisplay();   // 🔥 aggiungi questa riga
}

// ==========================
// HELPERS contenuti “vivi”
// ==========================
const HOME_IDEAS = {
  it: [
    "🍺 “Beer Walk del sabato”: scegli 3 locali e fate foto-brindisi. Poi postate nel gruppo città.",
    "🤝 “Meet a Local”: ogni pass ti spinge a sederti al bancone e chiedere la birra preferita di chi è lì.",
    "🎯 “Missione quartiere”: prova 2 zone diverse nella stessa città. Cambia tutto.",
    "🧩 “Anello di schiuma”: chi finisce i riscatti regala il bonus a un amico in viaggio.",
    "🏅 “Badge hunting”: non è gamification, è un modo per trovare gente come te."
  ],
  en: [
    "🍺 Saturday Beer Walk: pick 3 venues, toast-photo mission, then share it.",
    "🤝 Meet a Local: every pass nudges you to ask someone’s favorite beer.",
    "🎯 Neighborhood quest: try 2 different areas in a city.",
    "🧩 Foam ring: when you finish redemptions, gift your bonus.",
    "🏅 Badge hunting: an excuse to meet your beer-people."
  ],
  fr: [
    "🍺 Beer Walk du samedi : 3 spots, photos-brindis, puis partage.",
    "🤝 Meet a Local : assieds-toi au comptoir et demande la bière préférée d’un habitué.",
    "🎯 Mission quartier : teste deux zones dans la même ville.",
    "🧩 Anneau de mousse : offre ton bonus à un ami voyageur.",
    "🏅 Chasse aux badges : une excuse parfaite pour rencontrer du monde."
  ],
  es: [
    "🍺 Beer Walk del sábado: 3 locales, foto-brindis y comparte.",
    "🤝 Meet a Local: pregunta la cerveza favorita de alguien en la barra.",
    "🎯 Misión barrio: prueba dos zonas en la misma ciudad.",
    "🧩 Anillo de espuma: regala tu bonus al terminar.",
    "🏅 Caza de badges: excusa ideal para conocer gente cervecera."
  ],
  de: [
    "🍺 Samstags-Beer-Walk: 3 Spots, Anstoß-Fotos, dann teilen.",
    "🤝 Meet a Local: frag an der Theke nach dem Lieblingsbier.",
    "🎯 Viertel-Mission: zwei Bezirke in derselben Stadt testen.",
    "🧩 Schaumring: Bonus am Ende verschenken.",
    "🏅 Badge-Hunt: Ausrede, Biermenschen zu treffen."
  ]
};
const PUBLICAN_TIPS = {
  it: [
    "Inizia con una lager pulita, poi sali di intensità.",
    "La birra migliore è quella che bevi parlando con qualcuno al bancone.",
    "Chiedi la birra “fuori menu”: spesso è una cotta sperimentale.",
    "Se sei indeciso: vai di flight, capisci il locale subito.",
    "Siediti vicino alle spine: è lì che nasce la lore delle serate."
  ],
  en: [
    "Start with a clean lager, then climb in intensity.",
    "Best beer is the one you drink chatting at the bar.",
    "Ask for the off-menu beer—often a fresh experiment.",
    "Not sure? Get a flight.",
    "Sit near the taps: stories are brewed there."
  ],
  fr: [
    "Commence par une lager légère, puis monte en intensité.",
    "La meilleure bière se boit au comptoir en parlant.",
    "Demande la bière hors-menu : souvent une expérimentation.",
    "Indécis ? Prends un flight.",
    "Près des becs, les histoires naissent."
  ],
  es: [
    "Empieza con una lager limpia y sube la intensidad.",
    "La mejor cerveza es la que bebes charlando en la barra.",
    "Pide la cerveza fuera de carta: suele ser experimental.",
    "¿Dudas? Pide un flight.",
    "Cerca de los grifos nacen las historias."
  ],
  de: [
    "Starte mit einer klaren Lager, dann steigere dich.",
    "Bestes Bier: im Gespräch an der Theke.",
    "Frag nach Off-Menu-Bier – oft experimentell.",
    "Unentschlossen? Nimm ein Flight.",
    "Nahe an den Zapfhähnen entstehen Geschichten."
  ]
};
function homeIdeas(){ return HOME_IDEAS[currentLang] || HOME_IDEAS.it; }
function publicanTips(){ return PUBLICAN_TIPS[currentLang] || PUBLICAN_TIPS.it; }

const AI_REVIEW_HINTS = [
  "Atmosfera calda, staff gentile e ottima selezione di birre artigianali.",
  "Locale perfetto per chiacchierare con calma e provare qualcosa di diverso dal solito.",
  "Servizio veloce, spiegazioni chiare sulle birre e prezzi onesti.",
  "Tanta scelta alla spina: fatti consigliare una birra che non prenderesti da solo.",
  "Ottimo posto per iniziare o chiudere la serata con qualcosa di ben spillato."
];

function getPartnerImage(p){
  if(p.photo) return p.photo;
  const text = encodeURIComponent(p.name);
  return `https://placehold.co/800x500/111827/fbbf24?text=${text}`;
}
function getPartnerTip(p){
  if(p.tip) return p.tip;
  const tips = publicanTips();
  return tips[p.id % tips.length];
}

// ==========================
// Greeting + Pass pill
// ==========================
function renderUserGreeting(){
  if(!userState){ userGreetingEl.textContent=""; return; }
  userGreetingEl.textContent = fmt("greeting",{name:userState.name});
}

function updateCoinDisplay(){
  const el = document.getElementById("coinHeaderValue");
  if(!el) return;
  const coins = userState && typeof userState.coins === "number" ? userState.coins : 0;
  el.textContent = coins;
  // piccolo effetto pop quando cambia
  el.classList.remove("coin-pop");
  void el.offsetWidth; // forza reflow
  el.classList.add("coin-pop");
}

function getActivePass(){
  if(!userState?.activePassId) return null;
  return passes.find(p=>p.id===userState.activePassId) || null;
}

function isPremiumActive(){
  const pass = getActivePass();
  return pass && pass.tier==="premium";
}

function renderPassStatus(){
  passStatusEl.innerHTML="";
  const pass = getActivePass();
  if(!pass) { updateCoinDisplay(); return; }
  const pill = document.createElement("div");
  pill.className="pass-pill";
  pill.textContent = fmt("pass_active_pill",{pass:pass.name, city:pass.city});
  passStatusEl.appendChild(pill);
  updateCoinDisplay();
}
// ==========================
// Load JSON
// ==========================
async function loadData(){
  partners = await (await fetch("partners.json")).json();
  passes = await (await fetch("passes.json")).json();
  citiesData = await (await fetch("cities.json")).json();

  cities = citiesData.map(c=>c.name);
  if(!currentCity) currentCity = cities[0] || "Torino";
}
function getCityStatus(name){
  const c = citiesData.find(x=>x.name===name);
  return c ? c.status : "live";
}

// ==========================
// LOGIN SCREEN
// ==========================
function showLoginScreen(){
  currentScreen="login";
  currentScreenPayload=null;

  app.innerHTML = `
    <div class="card login-wrap">
      <div>
        <div class="login-title">${t("login_welcome")}</div>
        <div class="login-sub">${t("login_sub")}</div>
      </div>

      <div id="existingUsers"></div>

      <hr class="hr"/>

      <div class="small">${t("login_new")}</div>
      <div>
        <label class="small">${t("name")}</label>
        <input id="loginName" type="text" placeholder="${t("login_name_ph")}" />
      </div>
      <div>
        <label class="small">Nickname</label>
        <input id="loginNick" type="text" placeholder="beerlover_92" />
      </div>
      <div>
        <label class="small">${t("email")}</label>
        <input id="loginEmail" type="email" placeholder="${t("login_email_ph")}" />
      </div>

      <button class="primary" id="loginBtn">${t("login_create")}</button>
      <div class="small">${t("login_saved")}</div>
    </div>
  `;
  renderExistingUsers();
  document.getElementById("loginBtn").addEventListener("click", doCreateProfile);
  afterRender();
}

function renderExistingUsers(){
  const wrap = document.getElementById("existingUsers");
  if(!wrap) return;
  if(profiles.length===0){ wrap.innerHTML=`<div class="small">—</div>`; return; }

  wrap.innerHTML = profiles.map(p=>{
    const initials = p.name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
    return `
      <div class="user-row">
        <div class="user-chip">
          <div class="avatar">${initials}</div>
          <div>
            <div><strong>${p.name}</strong></div>
            <div class="small">${p.email}</div>
          </div>
        </div>
        <button class="secondary" onclick="setActiveProfile('${p.id}')">${t("enter")}</button>
      </div>
    `;
  }).join("");
}

function doCreateProfile(){
  const name = document.getElementById("loginName").value.trim();
  const email = document.getElementById("loginEmail").value.trim();
  const nickname = document.getElementById("loginNick").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(name==="" || !emailOk){
    alert(t("alert_invalid_profile"));
    return;
  }
  const profile = makeEmptyProfile(name,email,nickname);
  profiles.push(profile);
  setActiveProfile(profile.id);
}

// ==========================
// HOME
// ==========================
function mostraHome(){
  currentScreen="home";
  currentScreenPayload=null;

  const pass = getActivePass();
  const totalRedeems = userState.redemptions.length;
  const progress = Math.min(100, (totalRedeems/2)*100);
  const lastTwo = userState.redemptions.slice(0,2);

  const ideas = homeIdeas();
  const randomIdea = ideas[Math.floor(Math.random()*ideas.length)];

  const coins = typeof userState.coins === "number" ? userState.coins : 0;

  // pacchetti "alla Clash Royale"
  const packs = [
    {
      id:"pack_small",
      label:"Piccolo Brindisi",
      amount: 500,
      priceLabel:"€4,99",
      tag:"starter"
    },
    {
      id:"pack_best",
      label:"Giro Offerto",
      amount: 1500,
      priceLabel:"€9,99",
      tag:"best value",
      best:true
    },
    {
      id:"pack_whale",
      label:"Weekend Epico",
      amount: 4000,
      priceLabel:"€24,99",
      tag:"per veri nerd della birra"
    }
  ];

  // missioni che danno coin (sample)
  const missions = [
    { id:"m1", label:"Visita 1 partner nuovo", reward:120, tag:"daily" },
    { id:"m2", label:"Scrivi una recensione", reward:200, tag:"daily" },
    { id:"m3", label:"Completa 2 riscatti in 7 giorni", reward:600, tag:"challenge" }
  ];
  const claimed = new Set(userState.missionsClaimed || []);

  app.innerHTML = `
    <div class="home-hero">
      <div class="home-title">${t("home_title")}</div>
      <div class="home-sub">${t("home_sub")}</div>

      <div class="home-kpi">
        <div class="kpi-pill">🍺 ${t("home_kpi_redeems")}: <strong>${totalRedeems}</strong></div>
        <div class="kpi-pill">🏅 ${t("home_kpi_badges")}: <strong>${userState.badges.length}</strong></div>
        <div class="kpi-pill">🎁 ${t("home_kpi_rewards")}: <strong>${userState.rewards.filter(r=>!r.used).length}</strong></div>
      </div>

      ${
        pass
        ? `<div class="kpi-pill" style="margin-top:6px;">🎟️ ${fmt("pass_active_pill",{pass:pass.name, city:pass.city})}</div>`
        : `<div class="small" style="margin-top:6px;">${t("home_no_pass")}</div>`
      }

      <div class="home-actions">
        <button class="primary" onclick="mostraPaginaPassGlobale()">${t("home_cta_pass")}</button>
        <button class="secondary" onclick="mostraListaPartnerGlobale()">${t("home_cta_partners")}</button>
        <button class="secondary" onclick="mostraCitta()">${t("home_cta_cities")}</button>
        ${
          pass
            ? `<button class="secondary" onclick="mostraListaPartnerLocale()">Usa il mio pass</button>`
            : ""
        }
      </div>
    </div>

    <div class="home-split">
      <div class="card">
        <div class="small">${t("home_progress")}</div>
        <div class="progress-bar" style="margin-top:6px;">
          <div class="progress-fill" style="width:${progress}%"></div>
        </div>
        <div class="small" style="margin-top:6px;">
          ${
            progress < 100
              ? fmt("success_missing",{n:(2-totalRedeems)})
              : t("success_unlocked")
          }
        </div>

        <hr class="hr"/>

        <h4>${t("history")}</h4>
        ${
          lastTwo.length===0
            ? `<p class="small">—</p>`
            : lastTwo.map(r=>`
              <div class="list-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <div>
                  <strong>${r.partnerName}</strong>
                  <div class="small">${r.offer} • ${r.city}${r.bonus ? " • 🎁 BONUS" : ""}</div>
                </div>
                <div class="small">${r.date}</div>
              </div>
            `).join("")
        }
      </div>

      <div class="card">
        <h3>${t("passes_why_title")}</h3>
        <p class="small" style="font-size:13px; color:var(--foam);">
          ${t("passes_why_text")}
        </p>

        <hr class="hr"/>

        <div class="small">${t("home_idea_title")}</div>
        <div class="kpi-pill" style="margin-top:6px; font-size:13px;">
          ${randomIdea}
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:10px;">
      <h3>${t("profile_title")}</h3>
      <p><strong>${t("name")}:</strong> ${userState.name}</p>
      <p><strong>${t("email")}:</strong> ${userState.email}</p>
      <p><strong>${t("active_pass")}:</strong> ${pass ? pass.name+" • "+pass.city : t("none")}</p>

      <hr class="hr"/>

      <h4>${t("badges")}</h4>
      ${
        userState.badges.length===0
          ? `<p class="small">—</p>`
          : userState.badges.map(b=>`<div class="list-item"><strong>🏅 ${b}</strong></div>`).join("")
      }

      <hr class="hr"/>

      <h4>${t("rewards")}</h4>
      ${
        userState.rewards.length===0
          ? `<p class="small">—</p>`
          : userState.rewards.map(r=>`
            <div class="list-item reward-item">
              <div>
                <strong>🎁 ${r.title}</strong>
                <div class="small">${r.text}</div>
                <div class="small">${r.used ? "✅" : "🟡"} • ${r.scope}</div>
              </div>
              <div class="small">${r.date}</div>
            </div>
          `).join("")
      }

      <hr class="hr"/>
      <button class="secondary" onclick="logoutToSwitch()">${t("switch_account")}</button>
      <button class="secondary" onclick="showStaffPage()">${t("staff_mode")}</button>
    </div>

    <!-- COIN SHOP DENTRO LA HOME -->
    <div id="coinShopSection" class="coin-shop-wrap" style="margin-top:14px;">
      <div class="coin-shop-hero">
        <div class="coin-shop-title">Coin Shop</div>
        <div class="coin-shop-sub">
          Qui trasformi i coin in movimento reale: pacchetti, missioni e ricompense
          che riportano le persone dentro i locali, non solo dentro l'app.
        </div>
        <div style="margin-top:10px;" class="kpi-pill">
          Saldo attuale: <strong id="coinShopBalance">${coins}</strong> 💰
        </div>
      </div>

      <div class="card">
        <div class="small">Pacchetti coin (demo, nessun pagamento reale)</div>
        <div class="coin-shop-packs">
          ${packs.map(p => `
            <div class="coin-pack-card" data-pack="${p.id}">
              ${p.best ? `<div class="coin-pack-ribbon">BEST VALUE</div>` : ""}
              <div class="coin-pack-main">
                <div class="coin-pack-amount">
                  <span>${p.amount} 💰</span>
                  <span>${p.label}</span>
                </div>
                <div class="coin-pack-icon">🍺</div>
              </div>
              <div class="coin-pack-price">${p.priceLabel}</div>
              <div class="coin-pack-note">
                Sample di UX: quando ci sarà il backend qui vivranno davvero i pagamenti.
              </div>
              <button class="primary coin-pack-btn" data-buy="${p.id}">
                Ottieni ${p.amount} coin
              </button>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="coin-shop-missions">
        <div class="small">Missioni che regalano coin</div>
        ${missions.map(m => {
          const isClaimed = claimed.has(m.id);
          return `
            <div class="coin-mission-row">
              <div>
                <div class="coin-mission-label">${m.label}</div>
                <div class="coin-mission-reward">Ricompensa: ${m.reward} 💰</div>
                <span class="coin-tag">${m.tag}</span>
              </div>
              <button
                class="secondary"
                data-mission="${m.id}"
                ${isClaimed ? "disabled" : ""}
              >
                ${isClaimed ? "Già riscattata" : "Riscatta"}
              </button>
            </div>
          `;
        }).join("")}
      </div>

      <div class="card coin-shop-footer">
        Tutto questo è un prototipo locale: l’obiettivo è capire flussi, incentivi
        e sensazioni prima di parlare di soldi veri e di legale.
      </div>
    </div>
  `;

  // wiring COIN SHOP (dentro home)
  document.querySelectorAll("[data-buy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.buy;
      const p = packs.find(x => x.id === id);
      if(!p) return;

      if (typeof userState.coins !== "number") userState.coins = 0;
      userState.coins += p.amount;
      saveProfiles();
      updateCoinDisplay();

      const bal = document.getElementById("coinShopBalance");
      if(bal) bal.textContent = userState.coins;

      btn.classList.add("coin-pop");
      setTimeout(() => btn.classList.remove("coin-pop"), 400);
    });
  });

  document.querySelectorAll("[data-mission]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.mission;
      const m = missions.find(x => x.id === id);
      if(!m) return;

      if (!Array.isArray(userState.missionsClaimed)) userState.missionsClaimed = [];
      if (userState.missionsClaimed.includes(id)) return;

      if (typeof userState.coins !== "number") userState.coins = 0;
      userState.coins += m.reward;
      userState.missionsClaimed.push(id);
      saveProfiles();
      updateCoinDisplay();

      const bal = document.getElementById("coinShopBalance");
      if(bal) bal.textContent = userState.coins;

      btn.disabled = true;
      btn.textContent = "Già riscattata";
    });
  });

  afterRender();
}


// ==========================
// CITTÀ LIST
// ==========================
function mostraCitta(){
  currentScreen="cities";
  currentScreenPayload=null;

  app.innerHTML = `<h2 class="section-title">${t("choose_city")}</h2>
    <div class="grid">
      ${cities.map(cityName=>{
        const status = getCityStatus(cityName);
        const partnerCount = partners.filter(p=>p.city===cityName).length;
        const passCount = passes.filter(p=>p.city===cityName).length;

        return `
          <div class="card">
            <div class="city-header">
              <h3>${cityName}</h3>
              <div class="city-status ${status==="live"?"live":"soon"}">
                ${status==="live"?t("passes_city_live"):t("passes_city_soon")}
              </div>
            </div>

            <div class="city-counts">
              <div>🍺 Partner: <strong>${partnerCount}</strong></div>
              <div>🎟️ Pass: <strong>${passCount}</strong></div>
            </div>

            <button class="${status==="live"?"primary":"secondary"}"
              onclick="mostraCityDetail('${cityName}')">
              ${status==="live"?t("enter"):t("discover")}
            </button>
          </div>
        `;
      }).join("")}
    </div>

    <div style="margin-top:10px;">
      <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
    </div>
  `;

  afterRender();
}

// ==========================
// DETTAGLIO CITTÀ
// ==========================
function mostraCityDetail(cityName){
  currentCity=cityName;
  currentScreen="city_detail";
  currentScreenPayload={city:cityName};

  const status = getCityStatus(cityName);
  const partnersHere = partners.filter(p=>p.city===cityName);
  const passesHere = passes.filter(p=>p.city===cityName && p.tier==="base");
  const premiumActive = isPremiumActive();

  const vibeByCity = {
    Torino: { it:"Portici, piazze e birra di quartiere.", en:"Arcades, squares and neighborhood beer.", fr:"Arcades, places et bière de quartier.", es:"Pórticos, plazas y cerveza de barrio.", de:"Arkaden, Plätze und Viertel-Beer." },
    Milano: { it:"Taproom moderne e ritmo veloce.", en:"Modern taprooms and fast pace.", fr:"Taprooms modernes et rythme rapide.", es:"Taprooms modernas y ritmo rápido.", de:"Moderne Taprooms und Tempo." },
    Praga: { it:"Lager perfette e tavoli social.", en:"Perfect lagers and social tables.", fr:"Lagers parfaites et tables sociales.", es:"Lagers perfectas y mesas largas.", de:"Perfekte Lager und lange Tische." },
    Berlino:{ it:"Sperimentazione e vibrazioni underground.", en:"Experimentation and underground vibes.", fr:"Expérimentation et vibes underground.", es:"Experimentación y vibra underground.", de:"Experiment & Underground-Vibes." }
  };
  const vibe = vibeByCity[cityName]?.[currentLang] || vibeByCity[cityName]?.it || t("city_detail_soon");

  app.innerHTML = `
    <div class="card">
      <h2>${t("city_detail_title")} <span style="color:var(--beer-gold)">${cityName}</span> 🍺</h2>
      <p class="small">${t("city_detail_sub")}</p>

      <div class="city-status ${status==="live"?"live":"soon"}" style="display:inline-block; margin-top:6px;">
        ${status==="live"?t("city_detail_live"):t("city_detail_soon")}
      </div>

      <p style="margin-top:8px; font-size:14px;">${vibe}</p>

      <hr class="hr"/>

      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <div class="kpi-pill">🍺 Partner: <strong>${partnersHere.length}</strong></div>
        <div class="kpi-pill">🎟️ ${t("passes_regular_tag")}: <strong>${passesHere.length}</strong></div>
        <div class="kpi-pill">🌍 Premium: <strong>${premiumActive ? t("premium_kpi_active") : t("premium_kpi_available")}</strong></div>
      </div>

      <hr class="hr"/>

      ${
        status!=="live"
        ? `<p class="small">${t("city_detail_soon")}</p>`
        : `
          <h4>${t("city_detail_partners")}</h4>
          <div class="small">${partnersHere.slice(0,3).map(p=>"• "+p.name).join("<br/>") || "—"}</div>

          <h4 style="margin-top:10px;">${t("city_detail_passes")}</h4>
          <div class="small">${passesHere.map(p=>`• ${p.name} ${p.price.toFixed(2)}€ (${p.duration})`).join("<br/>") || "—"}</div>

          <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
            <button class="primary" onclick="mostraListaPartnerLocale()">${t("city_detail_cta_partners")}</button>
            <button class="secondary" onclick="mostraPaginaPassGlobale()">${t("city_detail_cta_passes")}</button>
          </div>
        `
      }

      <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
        <button class="secondary" onclick="mostraCitta()">${t("back_cities")}</button>
        <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
      </div>
    </div>
  `;
  afterRender();
}

// ==========================
// PARTNER LOCALE
// ==========================
function mostraListaPartnerLocale(){
  currentScreen="partners_local";
  currentScreenPayload={city:currentCity};

  const list = partners.filter(p=>p.city===currentCity);

  app.innerHTML = `
    <h2 class="section-title">${t("partners_in")} ${currentCity}</h2>
    <div class="grid">
      ${list.map(p=>{
        const img = getPartnerImage(p);
        const tip = getPartnerTip(p);
        return `
          <div class="card">
            <div class="partner-img"><img src="${img}" alt="${p.name}" loading="lazy"/></div>
            <div class="badge">${p.type}</div>
            <div class="area-chip">${p.area || t("area_label")}</div>
            <h3>${p.name}</h3>
            <p><strong>${t("offer_pass")}:</strong> ${p.offer}</p>

            <div class="publican-tip">🧑‍🍳 <strong>${t("publican_tip_label")}:</strong><br/>${tip}</div>

            <p class="meta">${p.address}</p>
            <button class="primary" onclick="apriSchedaPartner(${p.id})">${t("see_details")}</button>
          </div>
        `;
      }).join("")}
    </div>

    ${
      list.length===0
        ? `<div class="empty-state" style="margin-top:10px;">${t("no_results")}</div>`
        : ""
    }

    <div style="margin-top:10px;">
      <button class="secondary" onclick="mostraCityDetail('${currentCity}')">${t("back_cities")}</button>
      <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
    </div>
  `;
  afterRender();
}

// ==========================
// PARTNER GLOBALI + FILTRI
// ==========================
function mostraListaPartnerGlobale(){
  currentScreen="partners_global";
  currentScreenPayload=null;

  const citiesAll = [t("all_cities"), ...new Set(partners.map(p=>p.city))].sort();
  const typesAll  = [t("all_types"), ...new Set(partners.map(p=>p.type))].sort();

  app.innerHTML = `
    <h2 class="section-title">${t("partners_title")}</h2>

    <div class="card" style="margin-bottom:10px;">
      <div class="small">${t("filter_label")}</div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:6px;">
        <div id="ddCity" class="dd"></div>
        <div id="ddType" class="dd"></div>
        <input id="fText" class="staff-search" placeholder="${t("search_partner_zone_ph")}" />
      </div>
    </div>

    <div id="partnersGrid" class="grid"></div>
    <div id="partnersEmpty" class="empty-state hidden" style="margin-top:10px;">${t("no_results")}</div>

    <div style="margin-top:10px;">
      <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
    </div>
  `;

  const grid = document.getElementById("partnersGrid");
  const empty = document.getElementById("partnersEmpty");
  const fText = document.getElementById("fText");

  let cityVal = citiesAll[0];
  let typeVal = typesAll[0];

  setupDropdown(
    document.getElementById("ddCity"),
    citiesAll,
    cityVal,
    (v)=>{ cityVal=v; render(); }
  );
  setupDropdown(
    document.getElementById("ddType"),
    typesAll,
    typeVal,
    (v)=>{ typeVal=v; render(); }
  );

  function render(){
    const textVal = fText.value.toLowerCase();

    const filtered = partners.filter(p=>{
      if(cityVal!==t("all_cities") && p.city!==cityVal) return false;
      if(typeVal!==t("all_types") && p.type!==typeVal) return false;
      const hay = (p.name+" "+(p.area||"")+" "+p.city).toLowerCase();
      if(textVal && !hay.includes(textVal)) return false;
      return true;
    });

    if(filtered.length===0){
      grid.innerHTML="";
      empty.classList.remove("hidden");
      afterRender();
      return;
    }
    empty.classList.add("hidden");

    grid.innerHTML = filtered.map(p=>{
      const img = getPartnerImage(p);
      const tip = getPartnerTip(p);
      return `
        <div class="card">
          <div class="partner-img"><img src="${img}" alt="${p.name}" loading="lazy"/></div>
          <div class="badge">${p.type}</div>
          <div class="area-chip">${p.city} • ${p.area || t("area_label")}</div>
          <h3>${p.name}</h3>
          <p><strong>${t("offer_pass")}:</strong> ${p.offer}</p>

          <div class="publican-tip">🧑‍🍳 <strong>${t("publican_tip_label")}:</strong><br/>${tip}</div>

          <p class="small" style="margin-top:6px;">${p.story || ""}</p>
          <p class="meta">${p.address}</p>

          <button class="primary" onclick="apriSchedaPartner(${p.id})">${t("see_details")}</button>
        </div>
      `;
    }).join("");

    afterRender();
  }

  fText.addEventListener("input",render);
  render();
}

// ==========================
// PASS PAGE GLOBALE
// ==========================
function mostraPaginaPassGlobale(){
  currentScreen="passes";
  currentScreenPayload=null;

  const premiumPasses = passes.filter(p=>p.tier==="premium");
  const regularPasses = passes.filter(p=>p.tier==="base");
  const cityFilterList = [t("all_cities"), ...new Set(regularPasses.map(p=>p.city))].sort();

  app.innerHTML = `
    <h2 class="section-title">${t("passes_title")}</h2>
    <p class="small" style="margin-bottom:8px;">${t("passes_sub")}</p>

    <div class="grid" style="margin-bottom:10px;">
            ${premiumPasses.map(p=>{
        const active = userState.activePassId===p.id;
        return `
          <div class="card">
            <div class="badge">${t("passes_premium_tag")}</div>
            <h3 style="margin-top:6px;">🌍 ${p.name}</h3>
            <p class="meta">${p.duration} • EUROPA</p>
            <ul class="small" style="line-height:1.5; margin-top:6px;">
              ${p.includes.map(x=>`<li>${x}</li>`).join("")}
            </ul>
            <div class="pass-price">
              ${p.price.toFixed(2)} € • ~${coinsForPass(p)} coin
            </div>

            ${
              active
                ? `<button class="secondary" onclick="disattivaPass()">${t("passes_deactivate")}</button>`
                : `<button class="primary" onclick="mostraCheckout('${p.id}')">${t("passes_buy_premium")}</button>`
            }
          </div>
        `;
      }).join("")}
    </div>

    <div class="card" style="margin-bottom:10px;">
      <div class="small">${t("passes_regular_tag")}</div>
      <div style="margin-top:6px;">
        <div id="ddPassCity" class="dd"></div>
      </div>
    </div>

    <div id="regularPassGrid" class="pass-grid"></div>

    <div class="card" style="margin-top:10px;">
      <h3>${t("passes_why_title")}</h3>
      <p class="small" style="font-size:13px; color:var(--foam);">
        ${t("passes_why_text")}
      </p>
    </div>

    <div style="margin-top:10px;">
      <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
    </div>
  `;

  const grid = document.getElementById("regularPassGrid");
  let cval = cityFilterList[0];

  setupDropdown(
    document.getElementById("ddPassCity"),
    cityFilterList,
    cval,
    (v)=>{ cval=v; renderRegular(); }
  );

  function renderRegular(){
    let list = regularPasses;
    if(cval!==t("all_cities")) list = list.filter(p=>p.city===cval);

    grid.innerHTML = list.map(p=>{
      const active = userState.activePassId===p.id;
      const status = getCityStatus(p.city);
      return `
        <div class="pass-card">
          <div class="badge">${p.city}</div>
          <h3 style="margin-top:6px;">${p.name}</h3>
          <p class="meta">${p.duration} • ${status==="live"?t("passes_city_live"):t("passes_city_soon")}</p>
          <ul class="small" style="line-height:1.5; margin-top:6px;">
            ${p.includes.map(x=>`<li>${x}</li>`).join("")}
          </ul>
          <div class="pass-price">
            ${p.price.toFixed(2)} € • ~${coinsForPass(p)} coin
          </div>
          ${
            active
              ? `<button class="secondary" onclick="disattivaPass()">${t("passes_deactivate")}</button>`
              : `<button class="primary" onclick="mostraCheckout('${p.id}')">${t("passes_buy")}</button>`
          }
        </div>
      `;
    }).join("");

    if(list.length===0){
      grid.innerHTML = `<div class="empty-state">${t("no_results")}</div>`;
    }
    afterRender();
  }

  renderRegular();
}



// ==========================
// Scheda partner + azioni
// ==========================
function apriSchedaPartner(id){
  currentScreen="partner_detail";
  currentScreenPayload={partnerId:id};

  const partner = partners.find(p=>p.id===id);
  const pass = getActivePass();
  const passAttivo = !!pass;
  const premiumAttivo = isPremiumActive();
  const passCittaOk = passAttivo && (premiumAttivo || pass.city===partner.city);
  const alreadyRedeemedHere = userState.redemptions.some(r=>r.partnerId===partner.id);

  const reward = getActiveExplorerRewardForPartner(partner.city);
  const mapsQuery = encodeURIComponent(`${partner.name}, ${partner.address}, ${partner.city}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const img = getPartnerImage(partner);
  const tip = getPartnerTip(partner);

  const partnerIbanDemo = "IT60X0542811101000000" + String(partner.id).padStart(4,"0");

  let actionBlock="";
  if(!passAttivo){
    actionBlock=`
      <p class="small">${t("need_pass")}</p>
      <button class="secondary" onclick="mostraPaginaPassGlobale()">${t("go_pass")}</button>
    `;
  } else if(!passCittaOk && !premiumAttivo){
    actionBlock=`
      <div class="premium-paywall">
        <h3>${t("premium_title")}</h3>
        <ul class="small">
          <li>${t("premium_benefit1")}</li>
          <li>${t("premium_benefit2")}</li>
          <li>${t("premium_benefit3")}</li>
        </ul>
        <button class="primary" onclick="mostraPaginaPassGlobale()">${t("premium_cta")}</button>
      </div>
    `;
  } else if(alreadyRedeemedHere){
    actionBlock=`<p class="small">✅</p>`;
  } else {
    actionBlock=`
      <button class="primary" onclick="startValidation(${partner.id}, false)">
        ${t("redeem")}
      </button>
      ${
        reward ? `
          <div class="small" style="margin-top:6px;">${t("reward_active")}</div>
          <button class="secondary" onclick="startValidation(${partner.id}, true)">
            ${t("use_reward_redeem")}
          </button>
        ` : ""
      }
    `;
  }

  app.innerHTML=`
    <div class="card">
      <div class="partner-img big"><img src="${img}" alt="${partner.name}" loading="lazy"/></div>
      <div class="badge">${partner.type}</div>
      <h2>${partner.name}</h2>
      <p><strong>${t("city_label")}:</strong> ${partner.city}</p>
      <p><strong>${t("area_label")}:</strong> ${partner.area || t("area_label")}</p>
      <p><strong>${t("offer_label")}:</strong> ${partner.offer}</p>
      <p class="small">IBAN partner (demo): ${partnerIbanDemo}</p>
      <p class="small">${partner.story || ""}</p>

      <div class="publican-tip">🧑‍🍳 <strong>${t("publican_tip_label")}:</strong><br/>${tip}</div>

      <div class="map-preview">
        ${t("map_preview")} ${partner.name}<br/>${partner.city}
      </div>
      <button class="secondary" onclick="window.open('${mapsUrl}', '_blank')">
        ${t("open_maps")}
      </button>

      <hr class="hr"/>
      ${actionBlock}

      <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
        <button class="secondary" onclick="mostraListaPartnerGlobale()">${t("back_partners")}</button>
        <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
      </div>
    </div>
  `;
  afterRender();
}

function getActiveExplorerRewardForPartner(partnerCity){
  const reward = userState.rewards.find(r=>r.id==="reward_explorer" && !r.used);
  if(!reward) return null;
  if(reward.scope==="global") return reward;
  const pass = getActivePass();
  if(!pass) return null;
  return pass.city===partnerCity ? reward : null;
}

// ==========================
// VALIDAZIONE PASS (QR)
// ==========================
function startValidation(partnerId, useReward){
  const partner = partners.find(p=>p.id===partnerId);
  const code = generateCode();
  const expiresAt = Date.now() + 2*60*1000;

  userState.pendingValidation = {
    code, partnerId, useReward, expiresAt, used:false
  };
  saveProfiles();
  showValidationScreen(partner);
}

function generateCode(){
  return Math.random().toString(36).substring(2,8).toUpperCase();
}

function showValidationScreen(partner){
  currentScreen="validation";
  currentScreenPayload={partnerId:partner.id};

  const pv = userState.pendingValidation;
  const tokenUrl = `https://beerpass.demo/accesso?token=${pv.code}&scope=redeem_pass`;

  app.innerHTML=`
    <div class="card">
      <h2>${t("validation_title")}</h2>
      <p class="small">${t("validation_hint")} <strong>${partner.name}</strong>.</p>

      <div class="qr-wrap"><div id="qrBox"></div></div>
      <div class="code-box">${pv.code}</div>
      <div class="timer" id="timerText"></div>
      <div class="small" style="margin-top:6px; word-break:break-all;">
        URL codificato nel QR (demo):<br/>
        ${tokenUrl}
      </div>

      <button class="secondary" onclick="apriSchedaPartner(${partner.id})">${t("cancel")}</button>
      <button class="secondary" onclick="showQrHelp(${partner.id})">Come usare questo QR</button>

      <hr class="hr"/>
      <div class="small">${t("staff_mode")}</div>
      <button class="secondary" onclick="showStaffPage()">${t("staff_title")}</button>
    </div>
  `;

  const qrBox = document.getElementById("qrBox");
  qrBox.innerHTML="";
  new QRCode(qrBox, { text: tokenUrl, width:160, height:160 });

  startTimer();
  afterRender();
}

function refreshValidation(partnerId){
  const partner = partners.find(p=>p.id===partnerId);
  if(!partner || !userState.pendingValidation){ mostraHome(); return; }
  showValidationScreen(partner);
}

function startTimer(){
  const timerEl = document.getElementById("timerText");
  const interval = setInterval(()=>{
    const pv = userState.pendingValidation;
    if(!pv){ clearInterval(interval); return; }

    const msLeft = pv.expiresAt - Date.now();
    if(msLeft<=0){
      timerEl.textContent = t("expired_short");
      clearInterval(interval);
      return;
    }
    const sec = Math.floor(msLeft/1000);
    timerEl.textContent = fmt("expires_in",{sec});
  }, 500);
}

// ==========================
// STAFF DEMO
// ==========================
function showStaffPage(){
  currentScreen="staff";
  currentScreenPayload=null;

  const pending = userState.pendingValidation;
  const allCities = Array.from(new Set(partners.map(p=>p.city))).sort();
  let selectedCity = t("all_cities");

  app.innerHTML=`
    <div class="card staff-card">
      <h2>${t("staff_title")}</h2>
      <p class="small">${t("staff_step")}</p>

      <label class="small">${t("staff_filter_city")}</label>
      <div id="cityChips" class="city-chips" style="display:flex; gap:6px; flex-wrap:wrap;"></div>

      <div class="staff-picker">
        <label class="small">${t("staff_partner")}</label>

        <input id="partnerSearch" class="staff-search" type="text"
               placeholder="${t("staff_search_ph")}" />

        <div id="partnerList" class="partner-list"></div>
      </div>

      <label class="small">${t("staff_code")}</label>
      <input id="staffCode" class="staff-search" placeholder="${t("staff_code_ph")}" />

      <button class="primary" id="staffValidateBtn">${t("staff_validate")}</button>
      <button class="secondary" onclick="mostraHome()">${t("staff_exit")}</button>

      <div id="staffResult"></div>

      ${
        pending ? `
          <hr class="hr"/>
          <div class="small">${t("staff_waiting_code")} <strong>${pending.code}</strong></div>
        ` : ""
      }
    </div>
  `;

  const chipsEl = document.getElementById("cityChips");
  let selectedPartnerId=null;
  const listEl = document.getElementById("partnerList");
  const searchEl = document.getElementById("partnerSearch");

  function renderChips(){
    chipsEl.innerHTML = `
      <div class="kpi-pill ${selectedCity===t("all_cities")?"active":""}" data-city="${t("all_cities")}">${t("all_cities")}</div>
      ${allCities.map(c=>`
        <div class="kpi-pill ${selectedCity===c?"active":""}" data-city="${c}">${c}</div>
      `).join("")}
    `;
    chipsEl.querySelectorAll("[data-city]").forEach(chip=>{
      chip.addEventListener("click", ()=>{
        selectedCity = chip.dataset.city;
        selectedPartnerId=null;
        renderChips(); renderList(searchEl.value);
      });
    });
  }

  function orderedPartners(){
    const favSet = new Set(userState.staffFavs);
    let arr=[...partners];
    if(selectedCity!==t("all_cities")) arr=arr.filter(p=>p.city===selectedCity);

    arr.sort((a,b)=>{
      const af=favSet.has(a.id), bf=favSet.has(b.id);
      if(af!==bf) return af?-1:1;
      if(a.city!==b.city) return a.city.localeCompare(b.city);
      return a.name.localeCompare(b.name);
    });
    return arr;
  }

  function renderList(filterText=""){
    const ft=filterText.toLowerCase();
    const favSet=new Set(userState.staffFavs);
    const filtered=orderedPartners().filter(p=>(p.name+" "+p.city).toLowerCase().includes(ft));

    listEl.innerHTML = filtered.map(p=>`
      <div class="partner-item ${selectedPartnerId===p.id?"selected":""}" data-id="${p.id}">
        <div class="partner-left">
          <div class="partner-name">${p.name}</div>
          <div class="partner-meta">${p.city} • ${p.area||t("area_label")} • ${p.address}</div>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <button class="star-btn ${favSet.has(p.id)?"fav":""}" data-star="${p.id}" title="${t("fav_title")}">
            ${favSet.has(p.id)?"⭐":"☆"}
          </button>
          <div class="partner-tag">${p.type}</div>
        </div>
      </div>
    `).join("");

    listEl.querySelectorAll(".partner-item").forEach(item=>{
      item.addEventListener("click",(e)=>{
        if(e.target.dataset.star) return;
        selectedPartnerId = Number(item.dataset.id);
        renderList(searchEl.value);
      });
    });

    listEl.querySelectorAll(".star-btn").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        e.stopPropagation();
        const id=Number(btn.dataset.star);
        toggleFav(id);
        renderList(searchEl.value);
      });
    });
  }

  function toggleFav(id){
    const idx=userState.staffFavs.indexOf(id);
    if(idx>=0) userState.staffFavs.splice(idx,1);
    else userState.staffFavs.push(id);
    saveProfiles();
  }

  renderChips(); renderList("");
  searchEl.addEventListener("input", ()=>renderList(searchEl.value));

  document.getElementById("staffValidateBtn").addEventListener("click",
    ()=>confirmStaffValidation(selectedPartnerId)
  );

  afterRender();
}

function confirmStaffValidation(selectedPartnerId){
  const code = document.getElementById("staffCode").value.trim().toUpperCase();
  const resEl = document.getElementById("staffResult");

  if(!selectedPartnerId){
    resEl.innerHTML=`<div class="staff-bad">${t("staff_select_partner_first")}</div>`;
    return;
  }

  const pv = userState.pendingValidation;
  if(!pv){
    resEl.innerHTML=`<div class="staff-bad">${t("staff_no_pending")}</div>`;
    return;
  }
  if(pv.used){
    resEl.innerHTML=`<div class="staff-bad">${t("code_used")}</div>`;
    return;
  }
  if(pv.partnerId!==selectedPartnerId){
    resEl.innerHTML=`<div class="staff-bad">${t("staff_wrong_partner")}</div>`;
    return;
  }
  if(pv.code!==code){
    resEl.innerHTML=`<div class="staff-bad">${t("staff_wrong_code")}</div>`;
    return;
  }
  if(Date.now()>pv.expiresAt){
    resEl.innerHTML=`<div class="staff-bad">${t("staff_expired")}</div>`;
    return;
  }

  finalizeRedemption(selectedPartnerId, pv.useReward);
  pv.used=true;
  userState.pendingValidation=null;
  saveProfiles();
  showRedemptionSuccess(selectedPartnerId, pv.useReward);
}

// ==========================
// SUCCESS + REVIEW
// ==========================
function showRedemptionSuccess(partnerId, usedReward){
  const partner = partners.find(p=>p.id===partnerId);
  const redCount = userState.redemptions.length;
  const missingForBadge = Math.max(0, 2-redCount);

  currentScreen="success";
  currentScreenPayload={partnerId};

  app.innerHTML = `
    <div class="card reward-card">
      <div class="success-hero">${t("redeemed_ok")}</div>
      <p>${t("redeemed_from")} <strong>${partner.name}</strong>.</p>
      <p class="small">${usedReward ? t("bonus_ok") : t("standard_ok")}</p>

      ${
        missingForBadge>0
          ? `<div class="progress-hint">${fmt("success_missing",{n:missingForBadge})}</div>`
          : `<div class="progress-hint">${t("success_unlocked")}</div>`
      }

      <button class="primary" onclick="mostraHome()">${t("go_profile")}</button>
      <button class="secondary" onclick="mostraListaPartnerGlobale()">${t("keep_exploring")}</button>
      <button class="secondary" onclick="showReviewScreen(${partner.id})">${t("leave_review")}</button>
    </div>
  `;

  afterRender();
}

// ==========================
// COIN SHOP "ALLA CLASH ROYALE"
// ==========================
function showCoinShop(){
  if (!userState) {
    showLoginScreen();
    return;
  }

  // Ritorna alla home…
  mostraHome();

  // …e poi scrolla dolcemente alla sezione Coin Shop
  setTimeout(() => {
    const sec = document.getElementById("coinShopSection");
    if(sec){
      sec.scrollIntoView({ behavior:"smooth", block:"start" });
    }
  }, 0);
}


  currentScreen = "coin_shop";
  currentScreenPayload = null;

  const coins = typeof userState.coins === "number" ? userState.coins : 0;

  // pacchetti demo (nessun pagamento reale, solo sample)
  const packs = [
    {
      id:"pack_small",
      label:"Piccolo Brindisi",
      amount: 500,
      priceLabel:"€4,99",
      tag:"starter"
    },
    {
      id:"pack_best",
      label:"Giro Offerto",
      amount: 1500,
      priceLabel:"€9,99",
      tag:"best value",
      best:true
    },
    {
      id:"pack_whale",
      label:"Weekend Epico",
      amount: 4000,
      priceLabel:"€24,99",
      tag:"per veri nerd della birra"
    }
  ];

  // missioni demo
  const missions = [
    { id:"m1", label:"Visita 1 partner nuovo", reward:120, tag:"daily" },
    { id:"m2", label:"Scrivi una recensione", reward:200, tag:"daily" },
    { id:"m3", label:"Completa 2 riscatti in 7 giorni", reward:600, tag:"challenge" }
  ];

  const claimed = new Set(userState.missionsClaimed || []);

  app.innerHTML = `
    <div class="coin-shop-wrap">
      <div class="coin-shop-hero">
        <div class="coin-shop-title">Coin Shop</div>
        <div class="coin-shop-sub">
          Trasforma l'idea in gioco: pacchetti coin, missioni giornaliere e ricompense
          che spingono il cliente a tornare in giro per birrerie.
        </div>
        <div style="margin-top:10px;" class="kpi-pill">
          Saldo attuale: <strong>${coins}</strong> 💰
        </div>
      </div>

      <div class="card">
        <div class="small">Pacchetti coin</div>
        <div class="coin-shop-packs">
          ${packs.map(p => `
            <div class="coin-pack-card" data-pack="${p.id}">
              ${p.best ? `<div class="coin-pack-ribbon">BEST VALUE</div>` : ""}
              <div class="coin-pack-main">
                <div class="coin-pack-amount">
                  <span>${p.amount} 💰</span>
                  <span>${p.label}</span>
                </div>
                <div class="coin-pack-icon">🍺</div>
              </div>
              <div class="coin-pack-price">${p.priceLabel}</div>
              <div class="coin-pack-note">
                Sample: nessuna carta reale, nessun pagamento.<br/>
                Serve solo a vedere come funzionerebbe la UX.
              </div>
              <button class="primary coin-pack-btn" data-buy="${p.id}">
                Ottieni ${p.amount} coin
              </button>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="coin-shop-missions">
        <div class="small">Missioni che danno coin</div>
        ${missions.map(m => {
          const isClaimed = claimed.has(m.id);
          return `
            <div class="coin-mission-row">
              <div>
                <div class="coin-mission-label">${m.label}</div>
                <div class="coin-mission-reward">Ricompensa: ${m.reward} 💰</div>
                <span class="coin-tag">${m.tag}</span>
              </div>
              <button
                class="secondary"
                data-mission="${m.id}"
                ${isClaimed ? "disabled" : ""}
              >
                ${isClaimed ? "Già riscattata" : "Riscatta"}
              </button>
            </div>
          `;
        }).join("")}
      </div>

      <div class="card coin-shop-footer">
        Tutto questo è in modalità demo: il comportamento vero poi vivrà nel back-end
        con pagamenti, sicurezza e controlli reali.
      </div>

      <div>
        <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
      </div>
    </div>
  `;

  // logica click pacchetti
  document.querySelectorAll("[data-buy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.buy;
      const p = packs.find(x => x.id === id);
      if(!p) return;

      if (typeof userState.coins !== "number") userState.coins = 0;
      userState.coins += p.amount;
      saveProfiles();
      updateCoinDisplay();

      // piccolo "cha-ching" visivo
      btn.classList.add("coin-pop");
      setTimeout(() => btn.classList.remove("coin-pop"), 400);
    });
  });

  // logica missioni
  document.querySelectorAll("[data-mission]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.mission;
      const m = missions.find(x => x.id === id);
      if(!m) return;

      if (!Array.isArray(userState.missionsClaimed)) userState.missionsClaimed = [];
      if (userState.missionsClaimed.includes(id)) return;

      if (typeof userState.coins !== "number") userState.coins = 0;
      userState.coins += m.reward;
      userState.missionsClaimed.push(id);
      saveProfiles();
      updateCoinDisplay();
      showCoinShop(); // rerender per aggiornare pulsante "Già riscattata"
    });
  });

  afterRender();

function showReviewScreen(partnerId){
  currentScreen="review";
  currentScreenPayload={partnerId};

  const partner = partners.find(p=>p.id===partnerId);
  if(!partner){ mostraHome(); return; }

  app.innerHTML = `
    <div class="card">
      <h2>${t("review_title")} <strong>${partner.name}</strong>?</h2>
      <p class="small">${t("review_sub")}</p>

      <div class="stars" id="stars">
        ${[1,2,3,4,5].map(i=>`<span class="star" data-v="${i}">★</span>`).join("")}
      </div>

      <textarea id="reviewText" class="staff-search" rows="4"
        placeholder="${t("review_placeholder")}"></textarea>

      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
        <button class="primary" id="sendReviewBtn">${t("review_send")}</button>
        <button class="secondary" id="aiSuggestBtn">Suggerimento AI (demo)</button>
        <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
      </div>

      <div id="reviewMsg" class="small" style="margin-top:8px;"></div>
    </div>
  `;

  let rating=0;
  const starsEl=document.getElementById("stars");
  function paintStars(){
    starsEl.querySelectorAll(".star").forEach(s=>{
      const v=Number(s.dataset.v);
      s.classList.toggle("active", v<=rating);
    });
  }
  starsEl.querySelectorAll(".star").forEach(s=>{
    s.addEventListener("click", ()=>{
      rating=Number(s.dataset.v);
      paintStars();
    });
  });

  const aiBtn = document.getElementById("aiSuggestBtn");
  if(aiBtn){
    aiBtn.addEventListener("click", ()=>{
      const textarea = document.getElementById("reviewText");
      const hint = AI_REVIEW_HINTS[Math.floor(Math.random()*AI_REVIEW_HINTS.length)];
      if(textarea.value.trim()){
        textarea.value += "\n\n" + hint;
      } else {
        textarea.value = hint;
      }
    });
  }

  document.getElementById("sendReviewBtn").addEventListener("click", ()=>{
    const text=document.getElementById("reviewText").value.trim();
    if(rating===0 && text===""){
      document.getElementById("reviewMsg").textContent="—";
      return;
    }
    userState.reviews.unshift({
      partnerId, partnerName:partner.name,
      rating, text, date:new Date().toLocaleString()
    });
    userState.coins = (userState.coins || 0) + 10;
    saveProfiles();
    document.getElementById("reviewMsg").textContent=t("review_thanks") + " (+10 coin demo)";
  });

  afterRender();
}

function finalizeRedemption(partnerId, useReward){
  const partner = partners.find(p=>p.id===partnerId);
  if(!partner) return;

  if(useReward){
    const reward=getActiveExplorerRewardForPartner(partner.city);
    if(reward) reward.used=true;
  }

  userState.redemptions.unshift({
    partnerId: partner.id,
    partnerName: partner.name,
    offer: partner.offer,
    city: partner.city,
    date: new Date().toLocaleString(),
    bonus: useReward
  });

  // coin per riscatto (demo)
  userState.coins = (userState.coins || 0) + 50;

  if(userState.redemptions.length>=2 && !userState.badges.includes("Beer Explorer")){
    userState.badges.push("Beer Explorer");
    userState.rewards.push({
      id:"reward_explorer",
      title:"Ricompensa Beer Explorer",
      text: isPremiumActive()
        ? "1 riscatto extra valido ovunque!"
        : "1 riscatto extra nella città del pass!",
      scope: isPremiumActive() ? "global" : "local",
      used:false,
      date:new Date().toLocaleString()
    });
  }
}
// ==========================
// COIN LOGIC: prezzare i pass in coin
// ==========================
function coinsForPass(pass){
  if(!pass) return 0;
  // conversione semplice: ~120 coin per 1 €
  return Math.round(pass.price * 120);
}

// ==========================
// COIN SHOP
// ==========================
function mostraCoinShop(){
  currentScreen="coinshop";
  currentScreenPayload=null;

  if(!userState.coins) userState.coins = 0;

  app.innerHTML = `
    <div class="card">
      <h2>💰 Coin Shop</h2>
      <p class="small">Saldo attuale: <strong>${userState.coins} coin</strong></p>

      <hr class="hr"/>

      <button class="primary" onclick="acquistaCoinPack(1200)">
        +1200 coin • 9,90 €
      </button>

      <button class="primary" onclick="acquistaCoinPack(5300)">
        +5300 coin • 39,90 €
      </button>

      <button class="primary" onclick="acquistaCoinPack(11000)">
        +11.000 coin • 79,90 €
      </button>

      <hr class="hr"/>

      <button class="secondary" onclick="mostraHome()">← Torna alla Home</button>
    </div>
  `;

  afterRender();
}

function acquistaCoinPack(amount){
  if(!userState.coins) userState.coins = 0;
  userState.coins += amount;
  saveProfiles();
  alert("✔️ Acquisto completato! Hai ricevuto " + amount + " coin.");
  mostraCoinShop();
}

// ==========================
// CHECKOUT / DISATTIVA
// ==========================
function mostraCheckout(passId){
  currentScreen="checkout";
  currentScreenPayload={passId};

  const pass = passes.find(p=>p.id===passId);
  if(!pass){ mostraPaginaPassGlobale(); return; }

  userState.pendingPurchaseId = passId;

  const coinsNeeded = coinsForPass(pass);
  const balance = userState.coins || 0;

  app.innerHTML=`
    <div class="card">
      <h2>${t("checkout_title")}</h2>
      <p>${t("you_buying")} <strong>${pass.name}</strong></p>

      <p class="small" style="margin-top:6px;">
        Costo stimato: <strong>${pass.price.toFixed(2)} €</strong> •
        <strong>${coinsNeeded} coin</strong>
      </p>
      <p class="small">
        Saldo attuale: <strong>${balance} coin</strong>
      </p>

      <button class="primary" onclick="confermaAcquisto()">${t("confirm_purchase")}</button>
      <button class="secondary" onclick="mostraPaginaPassGlobale()">${t("cancel_purchase")}</button>
    </div>
  `;
  afterRender();
}


function confermaAcquisto(){
  const id = userState.pendingPurchaseId;
  if(!id){ mostraPaginaPassGlobale(); return; }

  const pass = passes.find(p=>p.id===id);
  if(!pass){
    userState.pendingPurchaseId = null;
    mostraPaginaPassGlobale();
    return;
  }

  const coinsNeeded = coinsForPass(pass);
  if(!userState.coins) userState.coins = 0;

  // Non hai abbastanza coin: niente pass, vai al negozio
  if(userState.coins < coinsNeeded){
    alert(
      "Saldo coin insufficiente.\n" +
      "Servono ~" + coinsNeeded + " coin, ne hai " + userState.coins + "."
    );
    mostraCoinShop();
    return;
  }

  // Ok, scala i coin e attiva il pass
  userState.coins -= coinsNeeded;
  if(userState.coins < 0) userState.coins = 0; // sicurezza

  userState.activePassId = id;
  userState.pendingPurchaseId = null;
  saveProfiles();
  afterRender();
  mostraPaginaPassGlobale();
}

function disattivaPass(){
  userState.activePassId=null;
  saveProfiles();
  afterRender();
  mostraPaginaPassGlobale();
}

// ==========================
// SCHERMATA AIUTO QR (spiega il flowchart)
// ==========================
function showQrHelp(partnerId){
  currentScreen = "qr_help";
  currentScreenPayload = { partnerId };

  const partner = partners.find(p=>p.id===partnerId);
  const name = partner ? partner.name : "il locale partner";

  app.innerHTML = `
    <div class="card">
      <h2>Come usare questo QR (demo)</h2>
      <p class="small">Questa schermata traduce in interfaccia il flow che hai scritto:</p>
      <ol class="small" style="padding-left:18px; line-height:1.5;">
        <li>Il cliente scansiona il QR con il telefono.</li>
        <li>Nel mondo reale verrebbe aperta una URL tipo:
          <br/><code>/accesso?token=XYZ-123&amp;scope=redeem_pass</code>.
        </li>
        <li>Il sistema chiede il login: lo staff del locale accede con il proprio account.</li>
        <li>Backend controlla che:
          <ul>
            <li>il token esiste ed è ancora “Attivo”;</li>
            <li>chi è loggato ha ruolo “Venditore/Staff”;</li>
            <li>il token è destinato proprio a ${name}.</li>
          </ul>
        </li>
        <li>Dopo la conferma il token viene marcato come “Invalidato/Completato” e lo stesso QR non è più valido.</li>
      </ol>
      <p class="small">
        In questa demo tutto gira sul browser e in locale, ma il comportamento visibile
        (QR univoco, scadenza, convalida una sola volta) è pensato come se ci fosse già il backend dietro.
      </p>
      <button class="secondary" onclick="mostraHome()">${t("back_home")}</button>
    </div>
  `;
  afterRender();
}

// ==========================
// NAV init + start
// ==========================
async function start(){
  await loadData();
  ensureDoodles();

  document.getElementById("langBtn")?.addEventListener("click", toggleLangBar);
  renderLangBar();
  renderUserGreeting();
  updateCoinDisplay();

  const coinBtn = document.getElementById("coinBtn");
  if (coinBtn) {
    coinBtn.addEventListener("click", showCoinShop);
  }

  if(!userState) showLoginScreen();
  else mostraHome();
}
start();

