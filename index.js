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
  const cardText = document.createTextNode(sym);
  card.appendChild(cardText);
  card.classList.add('card');
  // temp
  game.appendChild(card);
}

function isMatch(x,y){
return x == y;
}

