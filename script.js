const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn   = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let lapCount = 0;

// Format milliseconds to HH:MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsed = now - startTime;
  display.textContent = formatTime(elapsed);
}

startBtn.addEventListener('click', () => {
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(updateDisplay, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled   = false;
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsed = 0;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
  lapCount = 0;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled   = true;
});

lapBtn.addEventListener('click', () => {
  lapCount += 1;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${formatTime(elapsed)}`;
  lapsList.prepend(li);
});
