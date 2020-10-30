  // Selectors
const addButton = document.querySelector('.addButton');
const inputTicker = document.querySelector('.inputTicker')
const checkBoxLong = document.querySelector('#long');
const checkBoxShort = document.querySelector('#short');
const textArea = document.querySelector('.poznamka');
const addButtonInside = document.querySelector('.addButtonInside');
const ideaWindowDiv = document.querySelector('.addNewIdea');
const ideasArea = document.querySelector('.ideas');
const ideas = document.querySelector('.ideas');
const clearLocalStorageButton = document.querySelector('.clearLocalStorageButton');

//variables, arrays
let ideasStored;
let id;

 // Event Listeners

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('ideasStored') === null) {
        ideasStored = [];
        id = 0;
    }
    else{
        data = localStorage.getItem('ideasStored');
        ideasStored = JSON.parse(data);
        id = ideasStored.length;
        ideasStored.forEach(function(e) {
            if(e.trash === false) {
                createNewIdea(e.ticker, e.id, e.direction, e.textArea);
            }         
        })    
    }
});

 addButton.addEventListener('click', newIdeaWindow);
 addButtonInside.addEventListener('click', function() {
    if(inputTicker.value != "" && textArea.value != "") {
        let long;
        if(checkBoxLong.checked == true) {
            long = true;
        }
        else long = false;
    
        const DIRECTION = long ? 'LONG' : 'SHORT';
    
        createNewIdea(inputTicker.value, id, DIRECTION, textArea.value,);
        ideasStored.push(
            {
                ticker: inputTicker.value,
                id: id,
                direction: DIRECTION,
                textArea: textArea.value,
                trash: false
            }
        )
        id++;
        localStorage.setItem('ideasStored', JSON.stringify(ideasStored));
        ideaWindowDiv.classList.toggle('hidden');
        inputTicker.value = "";
        checkBoxLong.checked = false;
        checkBoxShort.checked = false;
        textArea.value = "";
    }   
});

clearLocalStorageButton.addEventListener('click', function() {
    let question = prompt(`aktuálně je v Local Storage ${ideasStored.length} objektů. 
    Pro potvrzení smazání napište ANO`);
    if(question === 'ANO') {
        localStorage.clear();
        location.reload();
    }
});

ideas.addEventListener('click', removeIdea);

  // functions
  function newIdeaWindow() {
      if(ideaWindowDiv.classList[1] === 'hidden') {
          ideaWindowDiv.classList.toggle('hidden');
      }
      else ideaWindowDiv.classList.toggle('hidden');
  }

  function createNewIdea(ticker, id, direction, poznamka) {
      let text = `<div class="idea ${direction}" id="${id}">
      <h1 class="ideaTickerName">${ticker}</h1>
      <h3 class="ideaDirection">${direction}</h3>
      <p class="ideaTextArea">${poznamka}</p>
      <button class="removeIdea"><i class="fas fa-times"></i></button>
  </div>`;
  ideasArea.insertAdjacentHTML('beforeend', text);
  }

  function removeIdea(e) {
      const item = e.target;
      if(item.classList[1] == 'fa-times') {
          item.parentElement.parentElement.remove();
         const itemId = item.parentElement.parentElement.id;
         ideasStored[itemId].trash = true;      
         localStorage.setItem('ideasStored', JSON.stringify(ideasStored));
      }
  }
