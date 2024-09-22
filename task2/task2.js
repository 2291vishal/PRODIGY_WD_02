// Get elements from the DOM
const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const lapButton = document.getElementById("lap-btn");
const lapTimesList = document.getElementById("lap-times");

let intervalId;  // To store the timer interval
let elapsedTime = 0;  // Elapsed time in milliseconds
let running = false;  // Track if stopwatch is running
let startTime;  // When the stopwatch started

// Function to update the display
function updateTimeDisplay() {
    let totalMilliseconds = elapsedTime;
    let hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    let minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);
    
    timeDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start the stopwatch
startButton.addEventListener("click", function() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateTimeDisplay();
        }, 1000);  // Update every second
    }
});

// Pause the stopwatch
pauseButton.addEventListener("click", function() {
    if (running) {
        running = false;
        clearInterval(intervalId);
    }
});

// Reset the stopwatch
resetButton.addEventListener("click", function() {
    running = false;
    clearInterval(intervalId);
    elapsedTime = 0;
    updateTimeDisplay();
    lapTimesList.innerHTML = '';  // Clear lap times
});

// Record lap time
lapButton.addEventListener("click", function() {
    if (running) {
        const lapTime = document.createElement("li");
        lapTime.textContent = timeDisplay.textContent;
        lapTimesList.appendChild(lapTime);
    }
});
