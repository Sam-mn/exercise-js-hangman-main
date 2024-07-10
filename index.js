const svgGround = document.querySelector("#ground");
const svgHead = document.querySelector("#head");
const svgBody = document.querySelector("#body");
const svgArms = document.querySelector("#arms");
const svgLegs = document.querySelector("#legs");
const svgScaffold = document.querySelector("#scaffold");
const inputsDiv = document.querySelector(".inputs");
const tryAgainDiv = document.querySelector(".TryAgainDiv");

let gameActive;
let theRandomWord;
let numberOfGuesses;
let theHiddenLetter;
let randomLetterIndex;
const svgParts = ["#head", "#body", "#arms", "#legs", "#scaffold", "#ground"];

const secretsWords = [
  "javascript",
  "hangman",
  "coding",
  "developer",
  "programming",
];

const resetGame = () => {
  inputsDiv.innerHTML = "";
  tryAgainDiv.innerHTML = "";
  gameActive = true;
  inputsDiv.innerHTML = `<button type="submit" style="display: none">submit</button>`;
  tryAgainDiv.innerHTML = `<button onclick="resetGame()">Try again</button>`;

  tryAgainDiv.classList.add("hidden");

  theRandomWord = secretsWords[Math.floor(Math.random() * secretsWords.length)];
  numberOfGuesses = 0;
  randomLetterIndex = Math.floor(Math.random() * theRandomWord.length);
  theHiddenLetter = theRandomWord[randomLetterIndex];

  for (let i = 0; i < theRandomWord.length; i++) {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "1");

    if (i != randomLetterIndex) {
      input.value = theRandomWord[i].toLocaleUpperCase();
      input.setAttribute("readOnly", true);
    } else {
      input.classList.add("missingLetter");
    }

    inputsDiv.appendChild(input);
  }

  svgParts.forEach((part) => {
    document.querySelector(part).style.opacity = 0;
  });
};

inputsDiv.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!gameActive) return;

  const p = document.createElement("p");

  const missingLetterInput = document.querySelector(".missingLetter");

  if (theHiddenLetter === missingLetterInput.value) {
    gameActive = false;
    tryAgainDiv.classList.remove("hidden");
    missingLetterInput.setAttribute("readOnly", true);
    p.classList.add("right");
    p.innerText = `You got the word in ${numberOfGuesses + 1} guesses!`;
    tryAgainDiv.insertBefore(p, tryAgainDiv.firstChild);
  } else {
    document.querySelector(svgParts[numberOfGuesses]).style.opacity = 1;
    numberOfGuesses += 1;

    if (numberOfGuesses === 6) {
      gameActive = false;
      tryAgainDiv.classList.remove("hidden");
      missingLetterInput.setAttribute("readOnly", true);
      p.classList.add("wrong");
      p.innerText = `You have made 6 wrong guesses. The word was "${theRandomWord}".`;
      tryAgainDiv.insertBefore(p, tryAgainDiv.firstChild);
    }
  }
});

resetGame();
