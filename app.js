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
const minLength = 3;

const list = [
  "alb",
  "all",
  "bal",
  "ban",
  "boa",
  "boo",
  "lab",
  "lob",
  "loo",
  "nab",
  "nob",
  "noo",
  "oba",
  "ono",
  "ball",
  "bola",
  "boll",
  "bolo",
  "boon",
  "loan",
  "lobo",
  "loon",
  "nolo",
  "obol",
  "olla",
  "aboon",
  "llano",
  "ballon",
  "balloon",
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

const letterDisable = () => {
  if (totalWordsFound === list.length) {
    div.innerHTML = "";
    letterDisplay(true);
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

const addLetters = () => {
  for (let words of list) {
    for (let i = 0; i < words.length; i++) {
      if (!letterArray.includes(words[i])) {
        letterArray.push(words[i]);
      }
    }
  }
};

const letterShuffle = () => {
  div.innerHTML = "";
  letterArray.sort(() => Math.floor(Math.random() * 2) - 1);
};

const letterDisplay = (hide) => {
  letterArray.forEach((element) => {
    const button = document.createElement("button");
    div.append(button);
    button.innerText = element;
    button.addEventListener("click", () => {
      letters = letters + element;
      letterDiv.innerText = letters[0].toUpperCase() + letters.substring(1);
    });
    button.disabled = hide;
  });
};

const addLi = () => {
  foundWords.push(letterDiv.innerText);
  const li = document.createElement("li");
  li.innerText = letterDiv.innerText;
  ul.appendChild(li);
};

const isValidWord = () => {
  if (letterDiv.innerText.length === 0) {
    letterDiv.innerText = "";
  } else if (letterDiv.innerText.length < minLength) {
    err(short);
    clearDelay(1000);
  } else if (!list.includes(letters)) {
    err(notWord);
    clearDelay(1000);
  } else if (foundWords.includes(letterDiv.innerText) !== true) {
    score();
    addLi();
    clearDelay(0000);
  } else {
    err(double);
    clearDelay(1000);
  }
};

enter.addEventListener("click", () => {
  isValidWord();
  disable();
  letterDisable();
});

shuffleBtn.addEventListener("click", () => {
  letterShuffle();
  letterDisplay(false);
});

deleteButton.addEventListener("click", () => {
  letters = letters.slice(0, -1);
  letterDiv.innerText = letterDiv.innerText.slice(0, -1);
});

clear.addEventListener("click", () => {
  clearDelay();
});

addLetters();
letterShuffle();
letterDisplay(false);
