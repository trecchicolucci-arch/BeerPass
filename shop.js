// shop.js

// ==========================
// COIN SHOP
// ==========================
function showCoinShop(){
  if (!userState) { showLoginScreen(); return; }
  mostraHome();
  setTimeout(() => {
    const sec = document.getElementById("coinShopSection");
    if(sec) sec.scrollIntoView({ behavior:"smooth", block:"start" });
  }, 0);
}

function mostraCoinShop_DEPRECATED(){
  

  if(!userState.coins) userState.coins = 0;

  app.innerHTML = `
    <div class="card">
      <h2>💰 Coin Shop</h2>
      <p class="small">Saldo attuale: <strong>${userState.coins} coin</strong></p>
      <hr class="hr"/>
      <button class="primary" onclick="acquistaCoinPack(1200)">+1200 coin • 9,90 €</button>
      <button class="primary" onclick="acquistaCoinPack(5300)">+5300 coin • 39,90 €</button>
      <button class="primary" onclick="acquistaCoinPack(11000)">+11.000 coin • 79,90 €</button>
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
  showCoinShop();
}

// ==========================
// CHECKOUT
// ==========================
function coinsForPass(pass){
  if(!pass) return 0;
  return Math.round(pass.price * 120); // ~120 coin per €
}

function mostraCheckout(passId){
 

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
      <p class="small">Saldo attuale: <strong>${balance} coin</strong></p>
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
  if(!pass){ userState.pendingPurchaseId=null; mostraPaginaPassGlobale(); return; }

  const coinsNeeded = coinsForPass(pass);

  if(typeof userState.coins!=="number" || userState.coins<0) userState.coins=0;

  if(userState.coins < coinsNeeded){
    alert("Saldo coin insufficiente.\nServono ~" + coinsNeeded + " coin, ne hai " + userState.coins + ".");
    showCoinShop(); 
    return;
  }

  userState.coins -= coinsNeeded;
  if(userState.coins < 0) userState.coins = 0;

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
