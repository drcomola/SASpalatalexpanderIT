let compensazioneSemplice = 0;
let decompensazioneSemplice = 0;
let compensazioneAvanzata = 0;
let decompensazioneAvanzata = 0;
let espansioneDentale = 0;
let ipercorrezione = 0;

function calculateResult() {
  const arcataSuperiore = parseFloat(document.getElementById("arcata-superiore").value) || 0;
  const arcataInferiore = parseFloat(document.getElementById("arcata-inferiore").value) || 0;

  // Calcolo del risultato base
  let risultato = arcataInferiore - arcataSuperiore;

  // Somma delle compensazioni, decompensazioni e espansione
  risultato += compensazioneSemplice + decompensazioneSemplice;
  risultato += compensazioneAvanzata + decompensazioneAvanzata;
  risultato += espansioneDentale;

  // Aggiunta della ipercorrezione
  risultato += ipercorrezione;

  // Mostra il risultato
  document.getElementById("risultato").textContent = `Risultato: ${risultato.toFixed(2)}`;
}

document.getElementById("calcola-valore").addEventListener("click", calculateResult);

function showPopup(title, content, onSave) {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  const popupContent = `
    <div class="popup-header">
      <h2>${title}</h2>
      <button class="close-popup">&times;</button>
    </div>
    <div class="popup-body">
      ${content}
    </div>
    <div class="popup-footer">
      <button id="save-popup">Guardar</button>
    </div>
  `;
  popup.innerHTML = popupContent;

  document.body.appendChild(popup);

  popup.querySelector(".close-popup").addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  popup.querySelector("#save-popup").addEventListener("click", () => {
    onSave();
    document.body.removeChild(popup);
  });
}

document.getElementById("calcolatore-semplicato").addEventListener("click", function () {
  const content = `
    <label>Compensazione arcata superiore, Torque - (Semplificato):</label>
    <select id="compensazione-semplice">
      <option value="0">Nessuna</option>
      <option value="1">Moderata 10°-15°</option>
      <option value="2.2">Grave 20°-25°</option>
    </select>
    <label>Decompensazione arcata superiore, Torque + (Semplificato):</label>
    <select id="decompensazione-semplice">
      <option value="0">Nessuna</option>
      <option value="1">Moderata 10°-15°</option>
      <option value="2.2">Grave 20°-25°</option>
    </select>
  `;
  showPopup("Calcolatrice Rapida", content, () => {
    compensazioneSemplice = parseFloat(document.getElementById("compensazione-semplice").value);
    decompensazioneSemplice = parseFloat(document.getElementById("decompensazione-semplice").value);
  });
});

document.getElementById("calcolatore-avanzato").addEventListener("click", function () {
    const content = `
    <label>Aggiungere valore di torque dei Molari</label>
    <label>1.6:</label><input type="number" class="small-input" id="valore-16">
    <label>2.6:</label><input type="number" class="small-input" id="valore-26">
    <label>3.6:</label><input type="number" class="small-input" id="valore-36">
    <label>4.6:</label><input type="number" class="small-input" id="valore-46">
    <div class="popup-footer">
      <button id="consider-expansion">Aggiungere espansione e compressione dentale</button>
    </div>
  `;
  showPopup("Calcolatrice avanzata", content, () => {
    const valore16 = parseFloat(document.getElementById("valore-16").value) || 0;
    const valore26 = parseFloat(document.getElementById("valore-26").value) || 0;
    const valore36 = parseFloat(document.getElementById("valore-36").value) || 0;
    const valore46 = parseFloat(document.getElementById("valore-46").value) || 0;

    // Algoritmo coerente con il programma Python
    compensazioneAvanzata = (valore16 + valore26) * 0.05;
    decompensazioneAvanzata = (valore36 + valore46) * 0.05;
  });

  document.getElementById("consider-expansion").addEventListener("click", function () {
    const expansionContent = `
      <p>Insertar valores de expansión y compresión dental:</p>
      <label>1.6:</label><input type="number" class="small-input" id="espansione-16">
      <label>2.6:</label><input type="number" class="small-input" id="espansione-26">
      <label>3.6:</label><input type="number" class="small-input" id="espansione-36">
      <label>4.6:</label><input type="number" class="small-input" id="espansione-46">
    `;
    showPopup("Espansione e compressione dentale", expansionContent, () => {
      const esp16 = parseFloat(document.getElementById("espansione-16").value) || 0;
      const esp26 = parseFloat(document.getElementById("espansione-26").value) || 0;
      const esp36 = parseFloat(document.getElementById("espansione-36").value) || 0;
      const esp46 = parseFloat(document.getElementById("espansione-46").value) || 0;

      // Calcolo dell'espansione dentale coerente con Python
      espansioneDentale = (esp36 + esp46) - (esp16 + esp26);
    });
  });
});

// Aggiunta del comportamento per i tasti dell'ipercorrezione
document.querySelectorAll(".ipercorrezione").forEach(button => {
  button.addEventListener("click", function () {
    ipercorrezione = parseFloat(this.dataset.valore) || 0;
    calculateResult();
  });
});
