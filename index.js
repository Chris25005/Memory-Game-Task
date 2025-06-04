let notes = [];
let notesDiv = document.querySelector('.notes');

async function fetchNotes() {
    console.log('Fetching notes...');

    try {
        // call the api
        const response = await fetch('https://683bdc3428a0b0f2fdc593ef.mockapi.io/notes');
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
}

async function populate(notes) {
    // create an unordered list element (ul)
    const ul = document.createElement('ul');

    // loop over the notes array
    notes.forEach((note) => {
        // and for each of the notes object
        // create an li item
        const li = document.createElement('li');

        // create an anchor tag
        const a = document.createElement('a');

        // set the content of the anchor tag to note.title
        a.textContent = note.title;

        // set the href attribute of the anchor tag
        a.setAttribute('href', `/note.html?id=${note.id}`);

        // append the anchor tags to the li item
        li.append(a);

        // append the li item to the ul list
        ul.append(li);
    })

    // after coming out of the loop, append the ul list to the notesDiv
    notesDiv.append(ul);
}

(async () => {
    notes = await fetchNotes();
    await populate(notes);
})();

// script.js
const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

const symbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍍', '🥝', '🍓'];
let cardSymbols = [...symbols, ...symbols]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  gameBoard.innerHTML = '';
  shuffle(cardSymbols);
  cardSymbols.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.symbol;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cardSymbols.length) {
      setTimeout(() => alert('🎉 You won!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

restartBtn.addEventListener('click', () => {
  cardSymbols = [...symbols, ...symbols];
  flippedCards = [];
  matchedCards = [];
  createBoard();
});

window.onload = createBoard;