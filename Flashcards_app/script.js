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

// ====== Render ======
function render() {
  grid.innerHTML = "";
  const list = filtered.length ? filtered : [];

  if (!list.length) {
    grid.append(emptyTemplate.content.cloneNode(true));
    return;
  }

  for (const item of list) {
    const node = cardTemplate.content.cloneNode(true);
    const art = node.querySelector(".card");
    const front = node.querySelector(".card-front");
    const back = node.querySelector(".card-back");
    const btnDel = node.querySelector(".delete");
    const btnEdit = node.querySelector(".edit");

    art.dataset.id = item.id;
    front.textContent = item.q;
    back.textContent = item.a;

    // Flip on click / Enter
    const toggleFlip = () => art.classList.toggle("is-flipped");
    art.addEventListener("click", (e) => {
      // Prevent flip when action buttons clicked
      if (e.target.closest(".card-actions")) return;
      toggleFlip();
    });
    art.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip();
      }
    });

    // Delete
    btnDel.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = art.dataset.id;
      cards = cards.filter(c => c.id !== id);
      saveCards(cards);
      applyFilter();
    });

    // Edit (inline prompts for simplicity)
    btnEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = art.dataset.id;
      const current = cards.find(c => c.id === id);
      if (!current) return;
      const q = prompt("Edit question:", current.q);
      if (q === null) return;
      const a = prompt("Edit answer:", current.a);
      if (a === null) return;
      current.q = q.trim();
      current.a = a.trim();
      saveCards(cards);
      applyFilter();
    });

    grid.append(node);
  }
}

// ====== Actions ======
function addCard() {
  const q = questionInput.value.trim();
  const a = answerInput.value.trim();
  if (!q || !a) {
    shake(questionInput);
    shake(answerInput);
    return;
  }
  const newCard = { id: crypto.randomUUID(), q, a };
  cards.unshift(newCard);
  saveCards(cards);
  questionInput.value = "";
  answerInput.value = "";
  applyFilter();
}
function shake(el) {
  el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }], { duration: 200 });
}

function shuffle() {
  // Fisher–Yates
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  saveCards(cards);
  applyFilter();
}

function clearAll() {
  if (!confirm("Delete all flashcards?")) return;
  cards = [];
  saveCards(cards);
  applyFilter();
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(cards, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "flashcards.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const arr = JSON.parse(reader.result);
      if (!Array.isArray(arr)) throw new Error("Invalid JSON");
      // Basic sanitization
      cards = arr
        .filter(x => x && typeof x.q === "string" && typeof x.a === "string")
        .map(x => ({ id: x.id || crypto.randomUUID(), q: x.q.trim(), a: x.a.trim() }));
      saveCards(cards);
      applyFilter();
    } catch (e) {
      alert("Import failed: " + e.message);
    }
  };
  reader.readAsText(file);
}

function applyFilter() {
  const term = (searchInput.value || "").toLowerCase();
  filtered = !term
    ? [...cards]
    : cards.filter(c => c.q.toLowerCase().includes(term) || c.a.toLowerCase().includes(term));
  render();
}

// ====== Events ======
btnAdd.addEventListener("click", addCard);
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addCard();
});
btnShuffle.addEventListener("click", shuffle);
btnClear.addEventListener("click", clearAll);
btnExport.addEventListener("click", exportJSON);
fileImport.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (file) importJSON(file);
  e.target.value = ""; // allow re-import same file
});
searchInput.addEventListener("input", applyFilter);

// Initial render
applyFilter();