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
