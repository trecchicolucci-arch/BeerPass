// qr.js
function showQrHelp(partnerId){


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
