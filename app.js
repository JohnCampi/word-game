const div = document.querySelector("#letterButtonDiv");
const shuffleBtn = document.querySelector("#shuffle");
const enter = document.querySelector("#enter");
const deleteButton = document.querySelector("#deleteButton");
const clear = document.querySelector("#clear");
const letterDiv = document.querySelector("#letterDiv");
const ul = document.querySelector("ul");
const pScore = document.querySelector("p");

const double = "Already Found";
const short = "Too Short";
const notWord = "Not in List";
const noMainLetter = "Missing main letter";

const letterArray = [];
const foundWords = [];
const mainLetter = "d";

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
let letters = "";
let totalWordsFound = 0;
let totalWords = 0;
for (let i = 0; i <= list.length; i++) {
  totalWords = i;
}
pScore.innerText = `Words Found: ${totalWordsFound}/${totalWords}`;

const score = () => {
  totalWordsFound += 1;
  pScore.innerText = `Words Found: ${totalWordsFound}/${totalWords}`;
};

const disable = () => {
  if (totalWordsFound === totalWords) {
    enter.disabled = true;
    clear.disabled = true;
    deleteButton.disabled = true;
    shuffleBtn.disabled = true;
  }
};

const err = (e) => {
  letterDiv.innerText = `${e}`;
};

const clearDelay = (delay) => {
  setTimeout(() => {
    letterDiv.innerText = "";
    letters = "";
  }, delay);
};

const letterShuffle = () => {
  for (let words of list) {
    for (let i = 0; i < words.length; i++) {
      if (!letterArray.includes(words[i])) {
        letterArray.push(words[i]);
      }
    }
    letterArray.sort(() => Math.floor(Math.random() * 2) - 1);
  }
};

const letterDisplay = (hide) => {
  letterArray.forEach((element) => {
    const idOfMainLetter = letterArray.indexOf(mainLetter);
    const indexOfMain = letterArray.at(idOfMainLetter);
    const button = document.createElement("button");
    // console.log(indexOfMain);
    div.append(button);
    button.innerText = element;
    button.addEventListener("click", () => {
      letters = letters + element;
      letterDiv.innerText = letters[0].toUpperCase() + letters.substring(1);
    });
    button.disabled = hide;
  });
};

if (totalWordsFound === totalWords) {
  console.log(totalWords);
}

const isValidWord = () => {
  if (letterDiv.innerText.length === 0) {
    letterDiv.innerText = "";
  } else if (letterDiv.innerText.length < 4) {
    err(short);
    clearDelay(1000);
  } else if (letterDiv.innerText.includes(mainLetter) === false) {
    err(noMainLetter);
    clearDelay(1000);
  } else if (!list.includes(letters)) {
    err(notWord);
    clearDelay(1000);
  } else if (foundWords.includes(letterDiv.innerText) !== true) {
    score();
    foundWords.push(letterDiv.innerText);
    const newLi = document.createElement("li");
    newLi.innerText = letterDiv.innerText;
    ul.append(newLi);
    letterDiv.innerText = "";
  } else {
    err(double);
    clearDelay(1000);
  }
};

enter.addEventListener("click", () => {
  clearDelay(1000);
  isValidWord();
  disable();
  if (totalWordsFound === list.length) {
    div.innerHTML = "";
    letterDisplay(true);
  }
  console.log(totalWords);
  console.log(totalWordsFound);
});

shuffleBtn.addEventListener("click", () => {
  div.innerHTML = "";
  letterShuffle();
  letterDisplay(false, "blue");
});

deleteButton.addEventListener("click", () => {
  letters = letters.slice(0, -1);
  letterDiv.innerText = letterDiv.innerText.slice(0, -1);
});

clear.addEventListener("click", () => {
  clearDelay();
});

letterShuffle();
letterDisplay(false, "mainLetterColor");
