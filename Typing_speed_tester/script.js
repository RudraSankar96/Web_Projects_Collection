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