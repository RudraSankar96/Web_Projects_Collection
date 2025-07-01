let count = 0;

const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const resetBtn = document.getElementById('reset');

incrementBtn.addEventListener('click', () => {
  count++;
  countElement.textContent = count;
});

resetBtn.addEventListener('click', () => {
  count = 0;
  countElement.textContent = count;
});
