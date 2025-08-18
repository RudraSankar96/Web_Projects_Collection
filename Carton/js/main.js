(() => {
  const scene = document.getElementById('scene');
  const character = document.getElementById('character');
  const btnToggle = document.getElementById('btn-toggle');
  const btnFlip = document.getElementById('btn-flip');
  const btnWave = document.getElementById('btn-wave');
  const btnDance = document.getElementById('btn-dance');
  const speedInput = document.getElementById('speed');

  let running = false;
  let dir = 1;              // 1 = right, -1 = left
  let x = scene.clientWidth * 0.1;  // start at 10%
  let speed = Number(speedInput.value); // px/sec
  let last = null;
  let dancing = false;

  // Apply transform from x position
  function place() {
    character.style.left = `${x}px`;
    character.style.transform = `translateX(0) scale(1) scaleX(${dir})`;
  }

  // Start/stop walking
  function setWalking(state){
    running = state;
    character.classList.toggle('is-walking', running && !dancing);
    btnToggle.textContent = running ? '⏸️ Pause' : '▶️ Start';
  }

  // Wave action
  function wave(){
    character.classList.add('is-waving');
    setTimeout(()=> character.classList.remove('is-waving'), 1000);
  }

  // Dance toggle
  function toggleDance(){
    dancing = !dancing;
    character.classList.toggle('is-dancing', dancing);
    // If dancing, stop walk anim legs but keep moving if running
    character.classList.toggle('is-walking', running && !dancing);
    btnDance.textContent = dancing ? '🛑 Stop Dance' : '🕺 Dance';
  }

  // Jump action
  function jump(){
    // Prevent stacking
    if (character.classList.contains('is-jumping')) return;
    character.classList.add('is-jumping');
    setTimeout(()=> character.classList.remove('is-jumping'), 700);
  }
// --- Shirt color controls ---
const btnShirtCycle  = document.getElementById('btn-shirt-cycle');
const btnShirtRandom = document.getElementById('btn-shirt-random');

// Fixed cycle colors (blue → red → green)
const shirtColors = [
  {name: 'Blue',  value: '#5b6cff'},
  {name: 'Red',   value: '#ff4d4f'},
  {name: 'Green', value: '#25c06d'}
];
let shirtIndex = 0;

// Apply a shirt color by CSS variable (your CSS already uses --char-shirt)
function setShirtColor(colorHex) {
  document.documentElement.style.setProperty('--char-shirt', colorHex);
  // (optional) persist
  try { localStorage.setItem('shirtColor', colorHex); } catch {}
}

// Cycle button
btnShirtCycle.addEventListener('click', () => {
  shirtIndex = (shirtIndex + 1) % shirtColors.length;
  const c = shirtColors[shirtIndex];
  setShirtColor(c.value);
  btnShirtCycle.textContent = `👕 Shirt: ${c.name}`;
});

// Random button (HSL → HEX)
btnShirtRandom.addEventListener('click', () => {
  const h = Math.floor(Math.random() * 360);
  const s = 70 + Math.floor(Math.random() * 20); // 70–90%
  const l = 55 + Math.floor(Math.random() * 10); // 55–65%
  const c = hslToHex(h, s, l);
  setShirtColor(c);
  btnShirtCycle.textContent = '👕 Shirt: Custom';
});

// On load: restore previous color if saved
(function initShirtFromStorage(){
  try {
    const saved = localStorage.getItem('shirtColor');
    if(saved){ setShirtColor(saved); btnShirtCycle.textContent = '👕 Shirt: Custom'; }
  } catch {}
})();

// Helper: HSL to HEX (compact)
function hslToHex(h, s, l){
  s/=100; l/=100;
  const k = n => (n + h/30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)));
  const toHex = x => Math.round(255 * x).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

  // Main loop
  function tick(ts){
    if(last == null) last = ts;
    const dt = (ts - last) / 1000; // seconds
    last = ts;

    if(running){
      x += dir * speed * dt;

      // Bounce at edges
      const minX = 12;
      const maxX = scene.clientWidth - 120; // character width approx
      if(x < minX){ x = minX; dir = 1; place(); }
      if(x > maxX){ x = maxX; dir = -1; place(); }
      place();
    }
    requestAnimationFrame(tick);
  }

  // Events
  btnToggle.addEventListener('click', () => setWalking(!running));
  btnFlip.addEventListener('click', () => { dir *= -1; place(); });
  btnWave.addEventListener('click', wave);
  btnDance.addEventListener('click', toggleDance);
  speedInput.addEventListener('input', () => { speed = Number(speedInput.value); });

  character.addEventListener('click', wave);

  window.addEventListener('keydown', (e) => {
    if(e.code === 'Space'){ e.preventDefault(); jump(); }
    if(e.key.toLowerCase() === 'd'){ toggleDance(); }
    if(e.key === 'ArrowLeft'){ dir = -1; setWalking(true); }
    if(e.key === 'ArrowRight'){ dir = 1; setWalking(true); }
  });

  // Handle resize for edge calculation
  window.addEventListener('resize', () => place());

  // Initial place + start loop
  place();
  requestAnimationFrame(tick);
})();
const btnDayNight = document.getElementById("btn-daynight");
const starsContainer = document.getElementById("stars");

// Stars create karna
for (let i = 0; i < 80; i++) {
  let star = document.createElement("span");
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";
  star.style.animationDelay = (Math.random() * 3) + "s";
  starsContainer.appendChild(star);
}

let night = false;
btnDayNight.addEventListener("click", () => {
  night = !night;
  document.body.classList.toggle("night", night);
  document.body.classList.toggle("day", !night);
  btnDayNight.textContent = night ? "🌞 Day Mode" : "🌙 Night Mode";
});
