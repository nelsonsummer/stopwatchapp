let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timer = null, isRunning = false;

const display = document.getElementById("timer-display");
const laps = document.getElementById("laps");
const body = document.body; // for theme toggle

// Update timer display
function updateTimerDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds.toString().padStart(3, "0"); // always 3 digits
  display.textContent = `${h}:${m}:${s}.${ms}`
}

// Start
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      milliseconds += 10;
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateTimerDisplay();
    }, 10); // update every 10ms
  }
}

// Stop
function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

// Reset
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  hours = minutes = seconds = milliseconds = 0;
  updateTimerDisplay();
  laps.innerHTML = ""; // clear laps
}

// Lap
function recordLap() {
  if (isRunning) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = lapTime;
    laps.appendChild(li);
  }
}

// Theme toggle
function toggleTheme() {
  body.classList.toggle("light");
}

// Attach events
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('theme').addEventListener('click', toggleTheme);

// Initialize display
updateTimerDisplay();