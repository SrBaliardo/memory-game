const inputName = document.querySelector(".login-input");
const btnSubmit = document.querySelector(".login-btn-submit");
const btnScore = document.querySelector(".btn-score");
const btnBack = document.querySelector(".btn-return");

const form = document.querySelector(".login-form");

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    btnSubmit.removeAttribute("disabled");
  } else {
    btnSubmit.setAttribute("disabled", "");
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem("player", inputName.value);
  window.location = "src/pages/game.html";
};

const handleGoScore = (event) => {
  event.preventDefault();

  window.location = "src/pages/score.html";
};

const handleGoBack = (event) => {
  event.preventDefault();

  window.history.back();
};

if (inputName) inputName.addEventListener("input", validateInput);
if (form) form.addEventListener("submit", handleSubmit);
if (btnScore) btnScore.addEventListener("click", handleGoScore);
if (btnBack) btnBack.addEventListener("click", handleGoBack);
