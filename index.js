const game = document.getElementById('game');

const symbols = ["★","▲","●","✿","𓆙","𓅼","𓆏","𓆧"];
let gameCards = randomizeArray();

dealCards();
const cards = Array.from(document.getElementsByClassName('card'));

function randomizeArray() {
 let gameBoard = symbols.concat(symbols);
 
  // randomize using Schwartzian transform
  return gameBoard = gameBoard
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

}

function dealCards(){
  gameCards.forEach(c => {
    const card = buildCard(c);
    game.appendChild(card);
  })
}

function buildCard(sym){
  const card = document.createElement('div');

  const cardText = document.createElement('div');
  cardText.innerText = sym;
  cardText.classList.add('card-face');

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  
  card.appendChild(cardText);
  card.appendChild(cardBack);
  card.classList.add('card');
  card.dataset.selected = 0;
  card.onclick = (e) => (cardClickHandler(card, e));
  return card;
}

function cardClickHandler (card, e) {
  card.dataset.selected = 1;
  console.log(card)
  console.log(e)
  const selectedCards = cardsSelected();
  setTimeout( () =>{
  if(selectedCards.length == 2) {
    checkMatch(selectedCards);
    resetSelected();
  }}, 1000)
}

function cardsSelected() {
  return  cards.filter(c => c.dataset.selected == 1);
}

function isMatch(x,y){
return x == y;
}

function checkMatch(selectedCards) {
  const firstCardContent = selectedCards[0].querySelector('.card-face').innerHTML;
  const secondCardContent = selectedCards[1].querySelector('.card-face').innerHTML;

  if(isMatch(firstCardContent, secondCardContent)) {
    selectedCards.forEach(c => c.dataset.matched = 1);  
  }
}

function resetSelected(){
    cards.forEach(c => c.dataset.selected = 0);
}
