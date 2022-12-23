const button = document.querySelectorAll(".btns");
const clear = document.querySelector("#clear");
const words = document.querySelector("#words");
const enter = document.querySelector("#enter");
const backspace = document.querySelector("#backspace");
const span = document.querySelector("span");
const ul = document.querySelector("ul");
const pScore = document.querySelector("p");
const newGame = document.createElement("button");
let score = 0;
let letters = "";
let list = [
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

enter.addEventListener("click", () => {
  if (letters.includes("d") === false) {
    words.innerText = "Missing main letter!";
    letters = "";
    setTimeout(() => {
      words.innerText = "";
    }, 1000);
  } else if (letters.length < 4) {
    words.innerText = "Not long enough!";
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
  } else {
    const newLi = document.createElement("li");
    score = score + letters.length;
    pScore.innerText = `Score: ${score}`;
    newLi.innerText = letters[0].toUpperCase() + letters.substring(1);
    ul.append(newLi);
    words.innerText = "";
    letters = "";
    if (score === 103) {
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
  }
});

newGame.addEventListener("click", () => {
  score = 0;
  pScore.innerText = `Score: ${score}`;
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
