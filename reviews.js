// reviews.js
function showReviewScreen(partnerId){
 

  const partner = partners.find(p=>p.id===partnerId);
  if(!partner){ mostraHome(); return; }

  app.innerHTML = `
    <div class="card">
      <h2>${t("review_title")} <strong>${partner.name}</strong>?</h2>
      <p class="small">${t("review_sub")}</p>
      <div class="stars" id="stars">
        ${[1,2,3,4,5].map(i=>`<span class="star" data-v="${i}">★</span>`).join("")}
      </div>
      <textarea id="reviewText" class="staff-search" rows="4" placeholder="${t("review_placeholder")}"></textarea>
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
    s.addEventListener("click", ()=>{ rating=Number(s.dataset.v); paintStars(); });
  });

  const aiBtn = document.getElementById("aiSuggestBtn");
  if(aiBtn){
    aiBtn.addEventListener("click", ()=>{
      const textarea = document.getElementById("reviewText");
      const hint = AI_REVIEW_HINTS[Math.floor(Math.random()*AI_REVIEW_HINTS.length)];
      if(textarea.value.trim()) textarea.value += "\n\n" + hint;
      else textarea.value = hint;
    });
  }

  document.getElementById("sendReviewBtn").addEventListener("click", ()=>{
    const text=document.getElementById("reviewText").value.trim();
    if(rating===0 && text===""){ document.getElementById("reviewMsg").textContent="—"; return; }
    if(!userState.reviews) userState.reviews=[];
    userState.reviews.unshift({
      partnerId, partnerName:partner.name, rating, text, date:new Date().toLocaleString()
    });
    userState.coins = (userState.coins || 0) + 10;
    saveProfiles();
    document.getElementById("reviewMsg").textContent=t("review_thanks") + " (+10 coin demo)";
  });

  afterRender();
}
