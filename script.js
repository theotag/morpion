const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "❌";
const PLAYER_O = "⭕";
let scorePlayer = 0
let scoreBot = 0
let turn = PLAYER_O;
let yourName = ""
let choice = ""


const boardState = Array(tiles.length);
boardState.fill(null);

const song = () => {
   if (yourName === "REGINE") {
    regineSound.load()
    regineSound.play()
  }
  else if (yourName === "MARC") {
    marcSound.load()
    marcSound.play()
  }
  else if (yourName === "KANTIN") {
    kentinSound.load()
    kentinSound.play()
  }
  else if (yourName === "ENZO") {
    enzoSound.load()
    enzoSound.play()
  }else if (yourName === "ROMAIN") {
    romainSound.load()
    romainSound.play()
  }else if (yourName === "THEO") {
    theoSound.load()
    theoSound.play()
  }else if (yourName === "QUENTIN") {
    quentinSound.load()
    quentinSound.play()
      
  }else if (yourName === "LUCA") {
    lucaSound.load()
    lucaSound.play()
    
  }else if (yourName === "BAPTISTE") {
    baptisteSound.load()
    baptisteSound.play()
  
  }else{
    chillSound.load()
    chillSound.play()
  }
}
  
//Elements
playerChoice = document.getElementById("choice")
const you = document.getElementById("you")
const bot = document.getElementById("bot")
const tabScore = document.querySelector("#tabScore")
const h1 = document.querySelector("h1")
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);
const board = document.querySelector("#board")
const flex = document.querySelector(".flex")
const playerName = document.getElementById("name");
const invisible = document.getElementById("invisible")

const playGame = () => {
  invisible.style.display = "none"
  yourName = playerName.value.toUpperCase()
  choice = you.innerText
  flex.style.display = "none"
  tabScore.style.display = "block"
  board.style.display = "grid"
  if (yourName.length > 5 && yourName.length < 9) {
    h1.style.fontSize = "2.5em"
    h1.style.marginTop = "90px"
  }else if (yourName.length > 8) {
    h1.style.fontSize = "2.3em"
    h1.style.marginTop = "93px"
  }
  song()
  h1.innerText = `${yourName} : ${scorePlayer} | bot : ${scoreBot}`
    
}

const choosePlayer = () => {
  if (playerName.value.length === 0) {
    playerName.placeholder = "you didn't give a name"
  }else{
    playGame()

  }
}

const playerYou = () => {
  choosePlayer()
  
}

const playerBot = () => {
  choosePlayer()
  turnBot()
}









//Sounds
const chillSound = new Audio("./assets/chillMusic.mp3");
const regineSound = new Audio("./assets/regine.mp3")
const marcSound = new Audio("./assets/marc.mp3");
const kentinSound = new Audio("./assets/kantin.mp3")
const enzoSound = new Audio("./assets/enzo.mp3");
const romainSound = new Audio("./assets/romain.mp3")
const theoSound = new Audio("./assets/theo.mp3")
const quentinSound = new Audio("./assets/quentin.mp3")
const lucaSound = new Audio("./assets/lucas.mp4")
const baptisteSound = new Audio("./assets/baptiste.mp3")



you.addEventListener("click",playerYou)
bot.addEventListener("click",playerBot)

function randomNumber(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}


tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function turnBot() {

  if (gameOverArea.classList.contains("visible")) {
    return;
  }

    let random = randomNumber(0,8)
    while (tiles[random].innerText !== "") {
      random = randomNumber(0,8)
    }
    const tileNumber = random
    tiles[random].innerText = PLAYER_O;
    boardState[tileNumber ] = PLAYER_O;
    turn = PLAYER_X;




}


function tileClick(event) {

  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText !== "") {
    if (yourName !== "LUCA") {
      return;
    }
    
  }

 
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
    
    checkWinner();
    turnBot()
    checkWinner();

  
}

function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      
      strike.classList.add(strikeClass);
      if (tileValue1 === "❌") {
        gameOverScreen(playerName.value);
        scorePlayer += 0.5
      }else {
        gameOverScreen("COMPUTER");
        scoreBot += 1
      }
      h1.innerText = `${yourName} : ${scorePlayer} | bot : ${scoreBot}`
      
      return;
    }
  }

  //Check for a draw
  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `WINNER IS ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

function startNewGame() {
  board.style.display = "none"
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X;
  flex.style.display = "block"
  
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];

