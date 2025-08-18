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
