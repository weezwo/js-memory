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
  const delay = 750;
  card.dataset.selected = 1;
  const selectedCards = cardsSelected();
  setTimeout( () =>{
  if(selectedCards.length == 2) {
    checkMatch(selectedCards, e);
    resetSelected();
  }}, delay);
}

function cardsSelected() {
  return  cards.filter(c => c.dataset.selected == 1);
}

function isMatch(x,y){
return x == y;
}

function checkMatch(selectedCards, e) {
  const firstCardContent = selectedCards[0].querySelector('.card-face').innerHTML;
  const secondCardContent = selectedCards[1].querySelector('.card-face').innerHTML;

  if(isMatch(firstCardContent, secondCardContent)) {
    selectedCards.forEach(c => c.dataset.matched = 1);  
    spawnFeedback(e, 'celebration');
  } else { spawnFeedback(e, 'mockery'); }
}

function spawnFeedback(e, type){
  const celebrations = ['yay', 'woop', 'yahoo']
  const mockeries = ['nope', 'nah', 'lol']
  const rand = Math.floor(Math.random()*3);

  let feedback = document.createElement('div');

  feedback.classList.add('feedback');
  feedback.style.top = `${e.pageY}px`;
  feedback.style.left = `${e.pageX + 10}px`;
  feedback.style.opacity = '100%';

  if (type == 'celebration') {
    feedback.innerText = celebrations[rand];
    feedback.classList.add('celebration');
  }else if (type == 'mockery'){
    feedback.innerText = mockeries[rand];
    feedback.classList.add('mockery');
  }else feedback.innerText = '';
  
  document.body.appendChild(feedback);
  console.log(feedback)
  const animateFeedback = setInterval(()=>{
    feedback.style.top = `${feedback.style.top.split('px')[0] - 2}px`;
    feedback.style.opacity = feedback.style.opacity - .1;
  },35)
  
  setTimeout(()=>{
    feedback.remove();
    clearInterval(animateFeedback);},500)
}


function resetSelected(){
    cards.forEach(c => c.dataset.selected = 0);
}
