// Initialize and shuffle a deck of 15 cards
function initializeDeck() {
  const characters = [
    "Duke",
    "Assassin",
    "Contessa",
    "Captain",
    "Ambassador",
    "Inquisitor"
  ];
  let deck = [];
  characters.forEach((char) => {
    for (let i = 0; i < 3; i++) {
      deck.push(char);
    }
  });
  return shuffle(deck);
}

// Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = { initializeDeck, shuffle };