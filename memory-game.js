"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
const FOUND_MATCH_WAIT_MSECS = 1000;
const cardArray = [
  {
    name: 'tulip',
    img: 'images/tulip.png' 
  },
  {
    name: 'tulip',
    img: 'images/tulip.png' 
  },
  {
    name: 'apples',
    img: 'images/apples.png' 
  },
  {
    name: 'apples',
    img: 'images/apples.png' 
  },
  {
    name: 'lego',
    img: 'images/lego.png' 
  },
  {
    name: 'lego',
    img: 'images/lego.png' 
  },
  {
    name: 'shoes',
    img: 'images/shoes.png' 
  },{
    name: 'shoes',
    img: 'images/shoes.png' 
  },{
    name: 'art',
    img: 'images/art.png' 
  },
  {
    name: 'art',
    img: 'images/art.png' 
  }
]
const shuffledColors = shuffle(cardArray);
const grid = document.querySelector('.grid');
var cardsChosen = []; 
var cardsChosenId = []; 
var cardsWon = []; 

//Shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Create game board
function createBoard() {
  for (let i = 0; i< cardArray.length; i++) {
    var card = document.createElement('img'); 
    card.setAttribute('src', 'images/blank.png'); 
    card.setAttribute('data-id', i); 
    card.addEventListener('click', flipCard)
    grid.appendChild(card); 
  }
}

createBoard(shuffledColors);

//Flip your card
function flipCard() {
  var cardId = this.getAttribute('data-id'); 
  cardsChosen.push(cardArray[cardId].name); 
  cardsChosenId.push(cardId); 
  this.setAttribute('src', cardArray[cardId].img)
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, FOUND_MATCH_WAIT_MSECS)
  }
}

//Check for matches
function checkForMatch() {
  var cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]
  if (cardsChosen[0] === cardsChosen[1]) {
    cardsWon.push(cardsChosen)
  } else {
    cards[optionOneId].setAttribute('src', 'images/blank.png')
    cards[optionTwoId].setAttribute('src', 'images/blank.png')
  }
  cardsChosen = []; 
  cardsChosenId = []; 
  if (cardsWon.length === cardArray.length/2) {
    alert("You won!")
  }
}



