const button = document.querySelectorAll(".btns");
const clear = document.querySelector("#clear");
const words = document.querySelector("#words");
const enter = document.querySelector("#enter");
const backspace = document.querySelector("#backspace");
const ul = document.querySelector("ul");
const pScore = document.querySelector("p");
const newGame = document.createElement("button");

const totalWords = 22;

let wordsFound = 0;
let letters = "";

pScore.innerText = `Words Found: ${wordsFound}/${totalWords}`;

const list = [
  "hydrant",
  "daddy",
  "dandy",
  "darn",
  "dart",
  "data",
  "drat",
  "dray",
  "dryad",
  "dyad",
  "hand",
  "handy",
  "hard",
  "hardhat",
  "hardy",
  "hydra",
  "nada",
  "radar",
  "rand",
  "randy",
  "tardy",
  "yard",
];
const array = [];

for (let btn of button) {
  btn.addEventListener("click", () => {
    // console.log("clicked", btn.innerText);
    letters = letters + btn.innerText;
    words.innerText = letters[0].toUpperCase() + letters.substring(1);
  });
}

clear.addEventListener("click", () => {
  words.innerText = "";
  letters = "";
});

backspace.addEventListener("click", () => {
  letters = letters.slice(0, -1);
  words.innerText = words.innerText.slice(0, -1);
});

newGame.addEventListener("click", () => {
  wordsFound = 0;
  pScore.innerText = `Words Found: ${wordsFound}/${totalWords}`;
  for (let btn of button) {
    btn.disabled = false;
  }
  enter.disabled = false;
  clear.disabled = false;
  backspace.disabled = false;
  words.innerText = "";
  letters = "";
  ul.innerHTML = "";
  newGame.style.display = "none";
});

enter.addEventListener("click", () => {
  const newLi = document.createElement("li");
  if (letters.includes("d") === false) {
    words.innerText = "Missing main letter!";
    letters = "";
    setTimeout(() => {
      words.innerText = "";
    }, 1000);
  } else if (letters.length < 4) {
    words.innerText = "Too short!";
    letters = "";
    setTimeout(() => {
      words.innerText = "";
    }, 1000);
  } else if (list.includes(letters) === false) {
    words.innerText = "Not in list!";
    letters = "";
    setTimeout(() => {
      words.innerText = "";
    }, 1000);
  } else if (array.includes(words.innerText) === false) {
    wordsFound += 1;
    pScore.innerText = `Words Found: ${wordsFound}/${totalWords}`;
    array.push(words.innerText);
    newLi.innerText = words.innerText;
    ul.append(newLi);
    words.innerText = "";
    letters = "";
    console.log(array);
    if (wordsFound === totalWords) {
      words.innerText = "All Words Found!";
      for (let btn of button) {
        btn.disabled = true;
      }
      enter.disabled = true;
      clear.disabled = true;
      backspace.disabled = true;
      newGame.innerText = "New Game";
      newGame.classList.add("newGame");
      pScore.append(newGame);
    }
  } else if (array.includes(words.innerText) === true) {
    words.innerText = "Already Found!";
    setTimeout(() => {
      words.innerText = "";
    }, 1000);
    letters = "";
  }
});
