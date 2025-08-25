const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast is not as important as typing accurately.",
  "JavaScript makes the web alive with interactivity.",
  "Stay consistent and success will follow.",
  "Coding is like humor. If you have to explain it, it’s bad."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");
const mistakesEl = document.getElementById("mistakes");
const restartBtn = document.getElementById("restart");

let timer = null;
let time = 0;
let mistakes = 0;
let isStarted = false;
let currentQuote = "";

function loadQuote(){
  currentQuote = quotes[Math.floor(Math.random()*quotes.length)];
  quoteEl.innerHTML = "";
  currentQuote.split("").forEach(ch=>{
    const span = document.createElement("span");
    span.textContent = ch;
    quoteEl.appendChild(span);
  });
}

function startTimer(){
  timer = setInterval(()=>{
    time++;
    timeEl.textContent = time;
    calculateWPM();
  },1000);
}

function stopTimer(){
  clearInterval(timer);
}

function calculateWPM(){
  const words = inputEl.value.trim().split(/\s+/).length;
  const wpm = Math.round((words / time) * 60);
  wpmEl.textContent = wpm > 0 && isFinite(wpm) ? wpm : 0;
}

inputEl.addEventListener("input", ()=>{
  const inputChars = inputEl.value.split("");
  const quoteChars = quoteEl.querySelectorAll("span");

  if(!isStarted){
    isStarted = true;
    startTimer();
  }

  mistakes = 0;
  quoteChars.forEach((charSpan, index)=>{
    const char = inputChars[index];
    if(char == null){
      charSpan.classList.remove("correct","incorrect");
    }else if(char === charSpan.textContent){
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    }else{
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      mistakes++;
    }
  });

  mistakesEl.textContent = mistakes;
  const accuracy = Math.max(0, Math.round(((inputChars.length - mistakes) / inputChars.length) * 100));
  accEl.textContent = accuracy + "%";

  if(inputChars.length === currentQuote.length){
    stopTimer();
    inputEl.disabled = true;
  }
});

restartBtn.addEventListener("click", ()=>{
  stopTimer();
  time = 0;
  mistakes = 0;
  isStarted = false;
  timeEl.textContent = "0";
  wpmEl.textContent = "0";
  accEl.textContent = "0%";
  mistakesEl.textContent = "0";
  inputEl.value = "";
  inputEl.disabled = false;
  loadQuote();
});

// load initial quote
loadQuote();