//pobranie elementów HTML za pomoca querySelector
const playerPointsSpan = document.querySelector(".player-points");
const compPointsSpan = document.querySelector(".comp-points");
const optionBtns = document.querySelectorAll(".options button");
const choicesSection = document.querySelector(".choices");
const playerChoiceSpan = document.querySelector(".player-choice");
const compChoiceSpan = document.querySelector(".comp-choice");
const resultText = document.querySelector(".result-text");
const resetGameButton = document.querySelector(".reset-game");

//ustawienie zmiennych punktów i wyborów
let playerPoints = 0;
let playerChoice = "";
let compPoints = 0;
let compChoice = "";

//funkcja rozpoczynająca grę przy załadowaniu strony
function startGame() {
  playerPointsSpan.innerHTML = playerPoints;
  compPointsSpan.innerHTML = compPoints;
  resultText.innerHTML = "Choose your option!";
  resetGameButton.classList.remove("active");
}

window.onload = startGame();

// Funkcja wyboru przez gracza
function playerSelect(e) {
  optionBtns.forEach((button) => button.classList.remove("active"));
  playerChoice = e.target.dataset.option;
  e.target.classList.add("active");
  compSelect();
}

const availableCompChoices = ["ROCK", "PAPER", "SCISSORS"];

// Funkcja wyboru przez komputer
function compSelect() {
  const randomIndex = Math.floor(Math.random() * availableCompChoices.length);
  compChoice = availableCompChoices[randomIndex];

  checkResultGame();
}

//Funkcja sprawdzająca wynik
function checkResultGame() {
  let winner = "";

  if (
    (playerChoice === "ROCK" && compChoice === "SCISSORS") ||
    (playerChoice === "PAPER" && compChoice === "ROCK") ||
    (playerChoice === "SCISSORS" && compChoice === "PAPER")
  ) {
    winner = "You won!!";
    playerPoints++;
    playerPointsSpan.innerHTML = playerPoints;
  } else if (playerChoice === compChoice) {
    winner = "DRAW!";
  } else {
    winner = "You lost! :c";
    compPoints++;
    compPointsSpan.innerHTML = compPoints;
  }

  choicesSection.classList.add("active");
  playerChoiceSpan.innerHTML = playerChoice;
  compChoiceSpan.innerHTML = compChoice;
  resultText.innerHTML = winner;
}

//funkcja resetująca grę
function resetGame() {
  choicesSection.classList.remove("active");
  optionBtns.forEach((button) => button.classList.remove("active"));
  playerPoints = 0;
  compPoints = 0;
  startGame();
}

//dodanie do każdego przycisku optionBtns eventu click
optionBtns.forEach((button) => button.addEventListener("click", playerSelect));

//dodanie do przycisku eventu click wywołujący funkcję resetGame
resetGameButton.addEventListener("click", resetGame);
