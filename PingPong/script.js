const playerScore1 = document.querySelector("#playerScore1");
const playerScore2 = document.querySelector("#playerScore2");

const playerOneBtn = document.querySelector("#playerOneBtn");
const playerTwoBtn = document.querySelector("#playerTwoBtn");
const resetBtn = document.querySelector("#resetBtn");

const winScore = document.querySelector("#winScore");
const winnerField = document.querySelector("#winnerField");

let gameEnded = false;

function getPlayerScore(playerElement) {
  return Number(playerElement.innerHTML);
}

function playerWin(player) {
  winnerField.innerHTML = `${player} won!`;
  gameEnded = true;
  // Disabilita i pulsanti quando qualcuno vince
  playerOneBtn.disabled = true;
  playerTwoBtn.disabled = true;
}

function updatePlayerScore(playerElement) {
  if (gameEnded) return; // Non aggiornare se il gioco è finito

  const currentScore = getPlayerScore(playerElement);
  const updatedScore = currentScore + 1;
  playerElement.innerHTML = updatedScore.toString();
  console.log(`Score aggiornato: ${updatedScore}`);
  return updatedScore;
}

function resetPlayerScore() {
  playerScore1.innerHTML = "0";
  playerScore2.innerHTML = "0";
  winnerField.innerHTML = "Use the button below to keep score";
  gameEnded = false;
  // Riabilita i pulsanti
  playerOneBtn.disabled = false;
  playerTwoBtn.disabled = false;
}

playerOneBtn.addEventListener("click", () => {
  console.log("clicked");
  const newScore = updatePlayerScore(playerScore1);
  const winScoreValue = Number(winScore.value);

  if (newScore >= winScoreValue && !gameEnded) {
    playerWin("Player 1");
  }
});

playerTwoBtn.addEventListener("click", () => {
  const newScore = updatePlayerScore(playerScore2);
  const winScoreValue = Number(winScore.value);

  if (newScore >= winScoreValue && !gameEnded) {
    playerWin("Player 2");
  }
});

resetBtn.addEventListener("click", () => {
  resetPlayerScore();
});

// Optional: Reset automatico quando si cambia il punteggio di vittoria
winScore.addEventListener("change", () => {
  resetPlayerScore();
});
