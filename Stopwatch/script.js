let startTime, updatedTime, difference, tInterval;
let isRunning = false;
let laps = [];

const secondHand = document.getElementById("second");
const digitalDisplay = document.getElementById("digital-display");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsContainer = document.getElementById("laps");

function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000 / 60);
        startBtn.innerHTML = "Pause";
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(tInterval);
        startBtn.innerHTML = "Start";
        isRunning = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    digitalDisplay.innerHTML = "00:00:00";
    updateAnalogClock(0);
    startBtn.innerHTML = "Start";
    laps = [];
    renderLaps();
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    isRunning = false;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const time = new Date(difference);
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = time.getUTCMilliseconds();

    digitalDisplay.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0').slice(0, 2)}`;
    updateAnalogClock(seconds);
}

function updateAnalogClock(seconds) {
    secondHand.style.transform = `rotate(${90 + (seconds * 6)}deg)`;
}

function addLap() {
    const time = digitalDisplay.innerHTML;
    laps.push(time);
    renderLaps();
}

function renderLaps() {
    lapsContainer.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("div");
        lapItem.className = "lap-item";
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapItem);

        lapsContainer.scrollTop = lapsContainer.scrollHeight;
    });
}

startBtn.addEventListener("click", startPause);
lapBtn.addEventListener("click", addLap);
resetBtn.addEventListener("click", reset);

window.addEventListener('DOMContentLoaded', (event) => {
    const clockNumbersContainer = document.querySelector('.clock-numbers');
    const clockNumbersHTML = Array.from({length: 12}).map((_, i) => {
        const second = (i + 1) * 5;
        return `<div class="clock-number" style="transform: rotate(${second * 6}deg) translate(135px) rotate(${(-second * 6)+90}deg);">${second}</div>`;
    }).join('');
  
    clockNumbersContainer.innerHTML = clockNumbersHTML;
  });