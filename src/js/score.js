const scoreContainer = document.querySelector(".container-score");
const btnReturn = document.querySelector(".btn-return");

const loadScores = () => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  scoreContainer.innerHTML = "";

  scores.forEach((score, index) => {
    const scoreRow = document.createElement("div");
    scoreRow.classList.add("score-row");

    const scoreIndex = document.createElement("p");
    scoreIndex.classList.add("score-index");
    scoreIndex.textContent = index + 1;

    const scoreName = document.createElement("p");
    scoreName.classList.add("score-name");
    scoreName.textContent = score.player;

    const scoreTime = document.createElement("p");
    scoreTime.classList.add("score-time");
    scoreTime.textContent = score.time;

    scoreRow.appendChild(scoreIndex);
    scoreRow.appendChild(scoreName);
    scoreRow.appendChild(scoreTime);

    scoreContainer.appendChild(scoreRow);
  });
};

btnReturn.addEventListener("click", () => {
  window.history.back();
});

window.onload = loadScores;
