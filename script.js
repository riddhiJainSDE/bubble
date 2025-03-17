var timer, score, hitrn, clickedVal;
var timerInt;
var gameRunning = false;

function resetGame() {
  timer = 60;
  score = 0;
}

document.querySelector(".elem #highVal").innerHTML = localStorage.getItem("high") || 0;

function makeBubble() {
  var clutter = "";
  for (var i = 1; i <= 108; i++) {
    clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
  }
  document.querySelector("#pbtm").innerHTML = clutter;
}

function runTimer() {
  timerInt = setInterval(function () {
    if (timer >= 0 && gameRunning) {
      document.querySelector('#timerValue').innerHTML = timer;
      timer--;
    } else {
      clearInterval(timerInt);
      endGame();
    }
  }, 1000);
}

function getNewHit() {
  hitrn = `${Math.floor(Math.random() * 10)}`;
  document.querySelector('#hitVal').innerHTML = hitrn;
}

function updateScore() {
  document.querySelector('#scoreVal').textContent = score;
  score += 10;
}

function endGame() {
  gameRunning = false;
  document.querySelector("#pbtm").innerHTML = `<h2>Score = ${score - 10}</h2>`;
  if (Number(localStorage.getItem("high") || 0) < (score - 10)) {
    localStorage.setItem("high", score - 10);
  }
  document.querySelector(".elem #highVal").innerHTML = localStorage.getItem("high");
}

document.querySelector('#pbtm').addEventListener('click', function (event) {
  if (!gameRunning) return;
  clickedVal = Number(event.target.textContent);
  if (clickedVal == hitrn) {
    updateScore();
    makeBubble();
    getNewHit();
  }
});

document.getElementById("startBtn").addEventListener("click", function () {
  if (!gameRunning) {
    gameRunning = true;
    resetGame();
    updateScore(); 
    runTimer();
    makeBubble();
    getNewHit();
  }
});

document.getElementById("stopBtn").addEventListener("click", function () {
  if (gameRunning) {
    clearInterval(timerInt);
    endGame();
  }
});
