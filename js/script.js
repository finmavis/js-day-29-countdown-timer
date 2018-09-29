let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const endTime = document.querySelector('.display-end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // Clear any existing interval
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000; // Turn into miliseconds
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // Turn into seconds
    // Check if should stop it
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // Display it
    displayTimeLeft(secondsLeft);
  }, 1000)
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  const display = `${minutes}:${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
};

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const minute = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minute < 10 ? '0' : ''}${minute}`;
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60)
  this.reset();
});