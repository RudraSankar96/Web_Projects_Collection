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
  })});
