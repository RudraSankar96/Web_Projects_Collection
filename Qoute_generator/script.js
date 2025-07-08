// script.js
const quotes = [
  "Believe in yourself.",
  "Never give up.",
  "Be kind. Work hard.",
  "Consistency beats talent.",
  "You are stronger than you think."
];
function generateQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote').innerText = quote;
}
