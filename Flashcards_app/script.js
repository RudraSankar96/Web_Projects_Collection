// ====== Local Storage Helpers ======
const STORAGE_KEY = "flashcards_v1";

function loadCards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getStarterCards();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : getStarterCards();
  } catch {
    return getStarterCards();
  }
}
function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}
function getStarterCards() {
  return [
    { id: crypto.randomUUID(), q: "What is HTML?", a: "HyperText Markup Language" },
    { id: crypto.randomUUID(), q: "What is CSS used for?", a: "Styling and layout" },
    { id: crypto.randomUUID(), q: "What is a Promise in JS?", a: "An object for async result" }
  ];
}

// ====== State ======
let cards = loadCards();
let filtered = [...cards];
