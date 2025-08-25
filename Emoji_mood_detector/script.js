// Mood definitions: label, message, and optional sound (not used by default)
const MOODS = {
  joy:   { label: "Joy",   msg: "You’re glowing! Keep spreading the sunshine. 🌞" },
  calm:  { label: "Calm",  msg: "Steady breath. Peace mode: ON. 🧘‍♀️" },
  love:  { label: "Love",  msg: "Heart full, world bright. ❤️" },
  cool:  { label: "Cool",  msg: "Chillin’ like a pro. 😎" },
  focus: { label: "Focus", msg: "Deep work… distractions who? 🧠" },
  party: { label: "Party", msg: "Confetti in the soul! 🎉" },
  meh:   { label: "Meh",   msg: "It’s okay to be ‘just okay’. 💁" },
  sad:   { label: "Sad",   msg: "Cloudy feels. Be gentle with yourself. ☁️" },
  angry: { label: "Angry", msg: "Channel it. Move. Breathe. You got this. 🔥" },
  tired: { label: "Tired", msg: "Rest is productive. Nap > everything. 😴" }
};


const app = document.getElementById("app");
const moodTag = document.getElementById("moodTag");
const moodMsg = document.getElementById("moodMsg");
const historyEl = document.getElementById("history");
const clearBtn = document.getElementById("clearBtn");
const buttons = Array.from(document.querySelectorAll(".emoji"));

let changes = 0;

// Initialize: restore last mood if available
const lastMood = localStorage.getItem("lastMood");
if (lastMood && MOODS[lastMood]) {
  applyMood(lastMood, false);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    applyMood(mood, true);
  });

  // Space/Enter support for accessibility
  btn.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      btn.click();
    }
  });
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("lastMood");
  setPressed(null);
  app.setAttribute("data-bg", "");
  moodTag.textContent = "How are you feeling?";
  moodMsg.textContent = "Pick one below to set your mood.";
  changes = 0;
  updateHistory();
});

function applyMood(mood, countChange = true) {
  const info = MOODS[mood];
  if (!info) return;

   // Toggle pressed states
  setPressed(mood);

  // Update UI
  app.setAttribute("data-bg", mood);
  moodTag.textContent = info.label;
  moodMsg.textContent = info.msg;

  // Persist
  localStorage.setItem("lastMood", mood);

  if (countChange) {
    changes++;
    updateHistory();
    ripple(mood);
  }
}

function setPressed(activeMood) {
  buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mood === activeMood)));
}

function updateHistory() {
  historyEl.textContent = `${changes} ${changes === 1 ? "change" : "changes"}`;
}

// Nice little ripple animation on the pressed button
function ripple(mood) {
  const btn = buttons.find(b => b.dataset.mood === mood);
  if (!btn) return;

  btn.animate(
    [
      { transform: "translateY(-1px) scale(1.00)" },
      { transform: "translateY(-3px) scale(1.06)" },
      { transform: "translateY(-1px) scale(1.02)" }
    ],
    { duration: 260, easing: "ease-out" }
  );
}