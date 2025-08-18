(() => {
  const scene = document.getElementById('scene');
  const character = document.getElementById('character');
  const btnToggle = document.getElementById('btn-toggle');
  const btnFlip = document.getElementById('btn-flip');
  const btnWave = document.getElementById('btn-wave');
  const btnDance = document.getElementById('btn-dance');
  const btnRun = document.getElementById('btn-run');
  const btnFly = document.getElementById('btn-fly');
  const btnStop = document.getElementById('btn-stop');
  const speedInput = document.getElementById('speed');
  const jetpack = document.getElementById('jetpack');

  let running = false;
  let flying = false;
  let idleTimer = null;
  let dir = 1;              
  let x = scene.clientWidth * 0.1;  
  let speed = Number(speedInput.value); 
  let last = null;
  let dancing = false;

  // --- Place character ---
  function place() {
    character.style.left = `${x}px`;
    character.style.transform = `scaleX(${dir})`;
  }

  // --- Idle sleep system ---
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    character.classList.remove("is-sleeping");
    idleTimer = setTimeout(() => {
      if (!running && !flying && !dancing) {
        character.classList.add("is-sleeping");
      }
    }, 5000); // 5 sec idle
  }

  // --- Walking toggle ---
  function setWalking(state){
    running = state;
    character.classList.toggle('is-walking', running && !dancing);
    btnToggle.textContent = running ? '⏸️ Pause' : '▶️ Start';
    resetIdleTimer();
  }

  // --- Run mode ---
  function run(){
    running = true;
    character.classList.add("is-running");
    speed = Number(speedInput.value) * 2;
    resetIdleTimer();
  }

  // --- Fly mode ---
  function fly(){
    flying = !flying;
    character.classList.toggle("is-flying", flying);
    jetpack.style.display = flying ? "block" : "none";
    resetIdleTimer();
  }

  // --- Stop everything ---
  function stopAll(){
    running = false;
    flying = false;
    dancing = false;
    character.classList.remove("is-running","is-flying","is-walking","is-dancing");
    jetpack.style.display = "none";
    btnDance.textContent = '🕺 Dance';
    btnToggle.textContent = '▶️ Start';
    resetIdleTimer();
  }

  // --- Wave ---
  function wave(){
    character.classList.add('is-waving');
    setTimeout(()=> character.classList.remove('is-waving'), 1000);
    resetIdleTimer();
  }

  // --- Dance ---
  function toggleDance(){
    dancing = !dancing;
    character.classList.toggle('is-dancing', dancing);
    character.classList.toggle('is-walking', running && !dancing);
    btnDance.textContent = dancing ? '🛑 Stop Dance' : '🕺 Dance';
    resetIdleTimer();
  }

  // --- Jump ---
  function jump(){
    if (character.classList.contains('is-jumping')) return;
    character.classList.add('is-jumping');
    setTimeout(()=> character.classList.remove('is-jumping'), 700);
    resetIdleTimer();
  }

  // --- Main loop ---
  function tick(ts){
    if(last == null) last = ts;
    const dt = (ts - last) / 1000; 
    last = ts;

    if(running){
      x += dir * speed * dt;
      const minX = 12;
      const maxX = scene.clientWidth - 120; 
      if(x < minX){ x = minX; dir = 1; place(); }
      if(x > maxX){ x = maxX; dir = -1; place(); }
      place();
    }

    if(flying){
      character.style.bottom = "200px"; // float in air
    } else {
      character.style.bottom = "0px";
    }

    requestAnimationFrame(tick);
  }

  // --- Events ---
  btnToggle.addEventListener('click', () => setWalking(!running));
  btnFlip.addEventListener('click', () => { dir *= -1; place(); });
  btnWave.addEventListener('click', wave);
  btnDance.addEventListener('click', toggleDance);
  btnRun.addEventListener('click', run);
  btnFly.addEventListener('click', fly);
  btnStop.addEventListener('click', stopAll);
  speedInput.addEventListener('input', () => { speed = Number(speedInput.value); resetIdleTimer(); });

  character.addEventListener('click', wave);

  window.addEventListener('keydown', (e) => {
    if(e.code === 'Space'){ e.preventDefault(); jump(); }
    if(e.key.toLowerCase() === 'd'){ toggleDance(); }
    if(e.key === 'ArrowLeft'){ dir = -1; setWalking(true); }
    if(e.key === 'ArrowRight'){ dir = 1; setWalking(true); }
  });

  window.addEventListener('resize', () => place());

  // Init
  place();
  requestAnimationFrame(tick);
  resetIdleTimer();
})();
