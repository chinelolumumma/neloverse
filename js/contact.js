(function () {
    
    var FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjnzopz";

    var form = document.getElementById("chatForm");
    var transcript = document.getElementById("chatTranscript");
    var confirmation = document.getElementById("chatConfirmation");
    var errorMsg = document.getElementById("chatError");

    if (!form) return;

    var steps = Array.prototype.slice.call(form.querySelectorAll(".chat-step"));

    function appendSentBubble(text) {
        var bubble = document.createElement("div");
        bubble.className = "chat-bubble chat-bubble--sent";
        bubble.textContent = text;
        transcript.appendChild(bubble);
    }

    function goToStep(index) {
        steps.forEach(function (step, i) {
            step.classList.toggle("is-hidden", i !== index);
        });
        var nextInput = steps[index].querySelector("input, textarea");
        if (nextInput) nextInput.focus();
    }

    // "Continue" buttons — validate, log the answer as a sent bubble, advance
    form.querySelectorAll("[data-next]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var step = btn.closest(".chat-step");
            var field = step.querySelector("input, textarea");

            if (!field.value.trim()) {
                field.focus();
                return;
            }

            appendSentBubble(field.value.trim());

            var currentIndex = steps.indexOf(step);
            goToStep(currentIndex + 1);
        });
    });

    
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var messageField = document.getElementById("chatMessage");
        if (!messageField.value.trim()) {
            messageField.focus();
            return;
        }

        appendSentBubble(messageField.value.trim());
        errorMsg.classList.add("is-hidden");

        var formData = new FormData(form);

        fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" }
        })
            .then(function (response) {
                if (response.ok) {
                    form.classList.add("is-hidden");
                    confirmation.classList.remove("is-hidden");
                } else {
                    errorMsg.classList.remove("is-hidden");
                }
            })
            .catch(function () {
                errorMsg.classList.remove("is-hidden");
            });
    });
})();