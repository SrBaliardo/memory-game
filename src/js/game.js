const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".time");

const characters = [
  "beth",
  "cerebro",
  "jerry",
  "jessica",
  "meeseeks",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "scroopy",
  "squanchy",
  "summer",
];

const MAX_SCORES = 5;

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");
  const main = document.querySelector(".container-buttons");

  if (disabledCards.length === 24) {
    clearInterval(this.loop);

    const playerName = spanPlayer.innerHTML;
    const playerTime = +timer.innerHTML;

    saveScore(playerName, playerTime);

    alert(`É isso aí ${playerName}! Seu tempo foi de: ${playerTime}`);

    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Reiniciar";
    resetButton.classList.add("btn-reset");
    resetButton.onclick = () => window.location.reload();
    main.appendChild(resetButton);

    const rankingButton = document.createElement("button");
    rankingButton.innerHTML = "Ranking";
    rankingButton.classList.add("btn-score");
    rankingButton.onclick = () => (window.location = "../pages/score.html");
    main.appendChild(rankingButton);

    const changeUserButton = document.createElement("button");
    changeUserButton.innerHTML = "Trocar Usuário";
    changeUserButton.classList.add("btn-change");
    changeUserButton.onclick = () => (window.location = "/index.html");
    main.appendChild(changeUserButton);
  }
};

const saveScore = (playerName, playerTime) => {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.push({ player: playerName, time: playerTime });

  scores.sort((a, b) => a.time - b.time);

  if (scores.length > MAX_SCORES) {
    scores = scores.slice(0, MAX_SCORES);
  }

  localStorage.setItem("scores", JSON.stringify(scores));
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";
    setTimeout(() => {
      checkEndGame();
    }, 300);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.add("reveal-card"));

  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("reveal-card"));
  }, 2500);
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
