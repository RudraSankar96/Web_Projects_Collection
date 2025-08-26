const gameContainer = document.getElementById("game");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart");

const emojis = ["🍎","🍌","🍓","🍍","🥝","🍉","🍑","🍒"];
let cards = [...emojis, ...emojis]; // pairs

let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matched = 0;
let time = 0, timer;

function shuffle(array){
  for(let i=array.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [array[i],array[j]] = [array[j],array[i]];
  }
  return array;
}

function startGame(){
  // reset
  gameContainer.innerHTML = "";
  moves = 0; matched = 0; time = 0;
  movesEl.textContent = "0";
  timeEl.textContent = "0";
  clearInterval(timer);
  timer = setInterval(()=>{ time++; timeEl.textContent = time; },1000);

  shuffle(cards).forEach(emoji=>{
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${emoji}</div>
      </div>`;
    card.addEventListener("click", ()=>flipCard(card, emoji));
    gameContainer.appendChild(card);
  });
}

function flipCard(card, emoji){
  if(lockBoard || card===firstCard || card.classList.contains("matched")) return;
  card.classList.add("flipped");

  if(!firstCard){
    firstCard = card;
    return;
  }
  secondCard = card;
  moves++;
  movesEl.textContent = moves;
  checkMatch();
}

function checkMatch(){
  const isMatch = firstCard.querySelector(".card-back").textContent === 
                  secondCard.querySelector(".card-back").textContent;
  if(isMatch){
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matched += 2;
    resetTurn();
    if(matched === cards.length){
      clearInterval(timer);
      setTimeout(()=>alert(`🎉 You won in ${moves} moves & ${time}s!`),300);
    }
  }else{
    lockBoard = true;
    setTimeout(()=>{
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    },1000);
  }
}

function resetTurn(){
  [firstCard, secondCard] = [null,null];
  lockBoard = false;
}

restartBtn.addEventListener("click", startGame);

startGame();