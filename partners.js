// partners.js
let selectedPartnerId = null;

function renderList(filterText="") {
  const ft = filterText.toLowerCase();
  const favSet = new Set(userState.staffFavs || []);
  const filtered = orderedPartners().filter(p => (p.name + " " + p.city).toLowerCase().includes(ft));

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
      const id = Number(btn.dataset.star);
      toggleFav(id);
      renderList(searchEl.value);
    });
  });
}

function toggleFav(id){
  if(!userState.staffFavs) userState.staffFavs=[];
  const idx=userState.staffFavs.indexOf(id);
  if(idx>=0) userState.staffFavs.splice(idx,1);
  else userState.staffFavs.push(id);
  saveProfiles();
}
