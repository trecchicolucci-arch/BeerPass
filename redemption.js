// redemption.js
function confirmStaffValidation(selectedPartnerId){
  const code = document.getElementById("staffCode").value.trim().toUpperCase();
  const resEl = document.getElementById("staffResult");

  if(!selectedPartnerId){ resEl.innerHTML=`<div class="staff-bad">${t("staff_select_partner_first")}</div>`; return; }

  const pv = userState.pendingValidation;
  if(!pv){ resEl.innerHTML=`<div class="staff-bad">${t("staff_no_pending")}</div>`; return; }
  if(pv.used){ resEl.innerHTML=`<div class="staff-bad">${t("code_used")}</div>`; return; }
  if(pv.partnerId!==selectedPartnerId){ resEl.innerHTML=`<div class="staff-bad">${t("staff_wrong_partner")}</div>`; return; }
  if(pv.code!==code){ resEl.innerHTML=`<div class="staff-bad">${t("staff_wrong_code")}</div>`; return; }
  if(Date.now()>pv.expiresAt){ resEl.innerHTML=`<div class="staff-bad">${t("staff_expired")}</div>`; return; }

  finalizeRedemption(selectedPartnerId, pv.useReward);
  pv.used=true;
  userState.pendingValidation=null;
  saveProfiles();
  showRedemptionSuccess(selectedPartnerId, pv.useReward);
}

function finalizeRedemption(partnerId, useReward){
  const partner = partners.find(p=>p.id===partnerId);
  if(!partner) return;

  if(useReward){
    const reward = getActiveExplorerRewardForPartner(partner.city);
    if(reward) reward.used = true;
  }

  if(!userState.redemptions) userState.redemptions=[];
  userState.redemptions.unshift({
    partnerId: partner.id,
    partnerName: partner.name,
    offer: partner.offer,
    city: partner.city,
    date: new Date().toLocaleString(),
    bonus: useReward
  });

  userState.coins = (userState.coins || 0) + 50;

  if(userState.redemptions.length>=2 && !userState.badges?.includes("Beer Explorer")){
    if(!userState.badges) userState.badges=[];
    userState.badges.push("Beer Explorer");
    if(!userState.rewards) userState.rewards=[];
    userState.rewards.push({
      id:"reward_explorer",
      title:"Ricompensa Beer Explorer",
      text: isPremiumActive() ? "1 riscatto extra valido ovunque!" : "1 riscatto extra nella città del pass!",
      scope: isPremiumActive() ? "global" : "local",
      used:false,
      date:new Date().toLocaleString()
    });
  }
}

function showRedemptionSuccess(partnerId, usedReward){
  const partner = partners.find(p=>p.id===partnerId);
  const redCount = userState.redemptions.length;
  const missingForBadge = Math.max(0, 2-redCount);

 

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
