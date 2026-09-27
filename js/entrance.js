(function () {
  var gate = document.getElementById("gate");
  var enterBtn = document.getElementById("gateEnter");
  var questionField = document.getElementById("gateQuestion");
  var passwordField = document.getElementById("gatePassword");
  var errorField = document.getElementById("gateError");

  if (!gate || !enterBtn) return;

  var STORAGE_KEY = "neloverseGateSeen";

  var SHEET_URL = "https://script.google.com/macros/s/AKfycbwVwm1gYeUh9n4m9sc-1PHyO4UQ1T6pHXluUe7kh1WTpBo7H6fQwmSe2r-71VUnVmCH/exec";

  var QUESTION = "Best season: summer or winter?";
  var ACCEPTED_ANSWERS = ["summer", "winter"];

  
  if (sessionStorage.getItem(STORAGE_KEY)) {
    gate.classList.add("is-hidden");
    return;
  }

  if (questionField) {
    questionField.textContent = QUESTION;
  }

  document.body.classList.add("gate-locked");

  function openSite() {
    gate.classList.add("is-hidden");
    document.body.classList.remove("gate-locked");
    sessionStorage.setItem(STORAGE_KEY, "true");
  }

  function logAnswer(answer, isCorrect) {
    fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        question: QUESTION,
        answer: answer,
        correct: isCorrect
      })
    }).catch(function () {
    });
  }

  function attemptEnter() {
    var rawValue = passwordField ? passwordField.value.trim() : "";
    var normalized = rawValue.toLowerCase();
    var isCorrect = ACCEPTED_ANSWERS.indexOf(normalized) !== -1;

    if (!rawValue) {
      if (errorField) {
        errorField.textContent = "Type something to continue.";
        errorField.classList.remove("is-hidden");
      }
      if (passwordField) passwordField.focus();
      return;
    }

    logAnswer(rawValue, isCorrect);

    if (!isCorrect) {
      if (errorField) {
        errorField.textContent = "Not quite — try summer or winter.";
        errorField.classList.remove("is-hidden");
      }
      if (passwordField) passwordField.focus();
      return;
    }

    if (errorField) errorField.classList.add("is-hidden");
    openSite();
  }

  enterBtn.addEventListener("click", attemptEnter);

  if (passwordField) {
    passwordField.addEventListener("keyup", function (e) {
      if (e.key === "Enter") attemptEnter();
    });

    // Clear the error as soon as they start typing
    passwordField.addEventListener("input", function () {
      if (errorField && !errorField.classList.contains("is-hidden")) {
        errorField.classList.add("is-hidden");
      }
    });
  }
})();