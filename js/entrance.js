(function () {
    var gate = document.getElementById("gate");
    var enterBtn = document.getElementById("gateEnter");
    var questionField = document.getElementById("gateQuestion");
    var passwordField = document.getElementById("gatePassword");
    var errorField = document.getElementById("gateError");

    if (!gate || !enterBtn) return;

    var STORAGE_KEY = "neloverseGateSeen";

  // Already seen this session — skip the gate entirely, no animation
    if (sessionStorage.getItem(STORAGE_KEY)) {
        gate.classList.add("is-hidden");
        return;
    }

  // Random playful question — any non-empty answer is accepted, nothing is validated
    var QUESTIONS = [
        "What's your favorite drink?",
        "What's your comfort food?",
        "Name a song stuck in your head.",
        "What's your favorite color?",
        "Coffee or tea?",
        "What's the last thing you ate?"
    ];

    if (questionField) {
        questionField.textContent = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    }

    document.body.classList.add("gate-locked");

    function openSite() {
        gate.classList.add("is-hidden");
        document.body.classList.remove("gate-locked");
        sessionStorage.setItem(STORAGE_KEY, "true");
    }

    function attemptEnter() {
        var value = passwordField ? passwordField.value.trim() : "";

        if (!value) {
        if (errorField) errorField.classList.remove("is-hidden");
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