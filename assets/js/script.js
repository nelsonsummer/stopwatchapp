let timer;
let isRunning = false;
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const ResetBtn = document.getElementById("Reset");
const themeToggle = document.getElementById("themeToggle");
const laps = document.getElementById("laps");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "00" + milliseconds : 
           milliseconds < 100 ? "0" + milliseconds : milliseconds;

  display.textContent = `${h}:${m}:${s}:${ms}`;
}

function timerCycle() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    timer = setInterval(timerCycle, 10); // update every 10ms
    startStopBtn.textContent = "Stop";
    isRunning = true;
  } else {
    clearInterval(timer);
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    let lapTime = display.textContent;
    let li = document.createElement("li");
    li.textContent = `lap:${lapTime}`;
    laps.appendChild(li);
  }
});
ResetBtn.addEventListener("click", () => {
  clearInterval(timer);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  startStopBtn.textContent = "Start";
  laps.innerHTML = "";
  isRunning = false;
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initialize
updateDisplay();