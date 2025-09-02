let workTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60; // 5 minutes
let timeLeft = workTime;
let isRunning = false;
let isWork = true;
let timer;

const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        if (isWork) {
          alert("Work session complete! Time for a break ☕");
          timeLeft = breakTime;
          statusDisplay.textContent = "Break Time!";
        } else {
          alert("Break over! Back to work 💪");
          timeLeft = workTime;
          statusDisplay.textContent = "Work Time!";
        }
        isWork = !isWork;
        updateDisplay();
        startTimer();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWork = true;
  timeLeft = workTime;
  statusDisplay.textContent = "Work Time!";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
