const game = document.getElementById('game');

const symbols = ["★","▲","●","✿","𓆙","𓅼","𓆏","𓆧"];
let gameCards = randomizeArray();

dealCards();

function randomizeArray() {
 let gameBoard = symbols.concat(symbols);
 
  // randomize using Schwartzian transform
  return gameBoard = gameBoard
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

}

function dealCards(){
  gameCards.forEach(c => buildCard(c) )
}

function buildCard(sym){
  const card = document.createElement('div');

  const cardText = document.createElement('p');
  cardText.innerText = sym;

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  
  card.appendChild(cardText);
  card.appendChild(cardBack);
  card.classList.add('card');
  card.dataset.selected = 0;
  // temp
  game.appendChild(card);
}

function isMatch(x,y){
return x == y;
}

