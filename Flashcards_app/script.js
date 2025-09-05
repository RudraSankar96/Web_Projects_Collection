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

// ====== Elements ======
const grid = document.getElementById("grid");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const btnAdd = document.getElementById("btnAdd");
const btnShuffle = document.getElementById("btnShuffle");
const btnClear = document.getElementById("btnClear");
const btnExport = document.getElementById("btnExport");
const fileImport = document.getElementById("fileImport");
const searchInput = document.getElementById("searchInput");
const cardTemplate = document.getElementById("cardTemplate");
const emptyTemplate = document.getElementById("emptyTemplate");