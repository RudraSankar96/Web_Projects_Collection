// Create all 24 spokes dynamically
const svg = document.querySelector('.chakra');
const line = svg.querySelector('#spokes line');
for (let i = 1; i < 24; i++) {
  const clone = line.cloneNode();
  const angle = (360 / 24) * i;
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', `rotate(${angle} 50 50)`);
  g.appendChild(clone);
  svg.appendChild(g);
}
svg.querySelector('#spokes').remove();

// Function to create a falling flower
function dropFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');

  // Flower emoji or petal
  const flowers = ["🌸", "🌺", "🌼", "💮", "🌻"];
  flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

  // Random horizontal position
  flower.style.left = Math.random() * window.innerWidth + 'px';
  // Random size
  flower.style.fontSize = Math.random() * 20 + 20 + 'px';
  // Random animation duration
  flower.style.animationDuration = (Math.random() * 3 + 3) + 's';

  document.body.appendChild(flower);

  // Remove after animation ends
  setTimeout(() => {
    flower.remove();
  }, 6000);
}

// Click event on flag
document.querySelector('.flag').addEventListener('click', () => {
  // Drop multiple flowers on each click
  for (let i = 0; i < 15; i++) {
    setTimeout(dropFlower, i * 200);
  }
});
