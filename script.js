/* ------------------------
OPERAZIONI PRELIMINARI
--------------------------- */

// Raccogliamo tutti gli elementi di interesse
const calendar = document.querySelector('.calendar');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('.modal-content');
const modalButton = document.querySelector('.modal-button');

// PRepariamo un elenco con gli indici delle finestrelle aperte
let openedIndexes = [];
console.log(openedIndexes);


/* ------------------------
OPERAZIONI DI AVVIO (MAIN)
-------------------------*/
// ! COntrolliamo subito se c'erano degli indici salvati! 
const previouslyOpenedIndexes = localStorage.getItem('my-list');

// Se c'è....
if (previouslyOpenedIndexes) {
  openedIndexes = JSON.parse(previouslyOpenedIndexes);
  console.log(openedIndexes);
}


// Renderizzare le finestrelle

// per ognuno degli elementi della sorgente...
for (let i = 0; i < source.length; i++) {
  // 1. creiamo una finestrella
  const box = createBox(i);

  // 2. agganciarla al calendario in pagina
  calendar.innerHTML += box;
}


/* --------------------------
EVENTI DINAMICI
---------------------------- */

// Rendere cliccabili le finestrelle
const boxes = document.querySelectorAll('.box');
for (let i = 0; i < boxes.length; i++) {
  // Prendo ad ogni giro il box corrente
  const box = boxes[i];

  // Rendo cliccabile il box
  box.addEventListener('click', function () {
    // 1. fai apparire questo box come se fosse aperto
    box.classList.add('box-opened');

    // 2. riempire la modale
    insertModalContent(i)

    // 3. apri la modale
    openModal();

    // 4. Aggiungi l'id alla lista delle finestrelle aperte
    addToOpenedIndexes(i);
  });
}

// Rendiamo il bottone Cliccabile
modalButton.addEventListener('click', function () {
  closeModal();
});


/* -----------------------
FUNZIONI
---------------------- */

// Funzione per creare il codice di un box
function createBox(i) {
  // Raccogliamo le parti dinamiche
  const date = i + 1;
  const icon = source[i].icon;
  let classes = "box"

  // !controlla se sono state aperte
  if (openedIndexes.includes(i)) {
    classes += " box-opened";
  }

  // Creiamo il codice per il box
  return `
    <div class="${classes}">
      <img class="box-icon" src="images/icons/${icon}.png" alt="icon">
      <div class="box-date">${date}</div>
    </div>`;
}

// Funzione per aprire la modale
function openModal() {
  modal.classList.remove('modal-hidden')
}

// Funzione per chiudere la modale
function closeModal() {
  modal.classList.add('modal-hidden')
}

// Funzione per riempire la modale
function insertModalContent(i) {
  // Recuperiamo la sorpresa corretta
  const surprise = source[i];

  // Decidiamo come riempire la modale
  if (surprise.type == "image") {
    modalContent.innerHTML = `<img src="${surprise.url}" alt="${surprise.title}">`;
  } else if (surprise.type == "text") {
    modalContent.innerHTML = `<p>${surprise.text}</p>`;

  }
}
// Funzione per aggiungere l'indice alla lista
function addToOpenedIndexes(i) {
  // Se dentro opnedIndexes NON c'è già la i
  if (!openedIndexes.includes(i)) {
    // La aggiungiamo alla lista
    openedIndexes.push(i);

    // La aggiungiamo nel localStorage
    localStorage.setItem('my-list', JSON.stringify(openedIndexes));
  }
  console.log(openedIndexes);
}