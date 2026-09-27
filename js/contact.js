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

    function appendQuestionBubble(step) {
        var question = step.querySelector(".chat-bubble--agent");
        if (!question) return;
        var clone = question.cloneNode(true);
        transcript.appendChild(clone);
    }

    function showTyping() {
        var typing = document.createElement("div");
        typing.className = "chat-bubble chat-bubble--agent chat-bubble--typing";
        typing.id = "typingIndicator";
        typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        transcript.appendChild(typing);
    }

    function removeTyping() {
        var typing = document.getElementById("typingIndicator");
        if (typing) typing.remove();
    }

    function goToStep(index) {
        steps.forEach(function (step, i) {
            step.classList.toggle("is-hidden", i !== index);
        });
        var nextInput = steps[index].querySelector("input, textarea");
        if (nextInput) nextInput.focus();
    }

    // "Continue" buttons — move the question and the answer into the
    // scrolling transcript together, show a brief typing indicator,
    // then advance to the next question
    form.querySelectorAll("[data-next]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var step = btn.closest(".chat-step");
            var field = step.querySelector("input, textarea");

            if (!field.value.trim()) {
                field.focus();
                return;
            }

            appendQuestionBubble(step);
            appendSentBubble(field.value.trim());
            step.classList.add("is-hidden");

            var currentIndex = steps.indexOf(step);

            showTyping();
            setTimeout(function () {
                removeTyping();
                goToStep(currentIndex + 1);
            }, 1100);
        });
    });

    // Final submit — send to Formspree, show confirmation on success
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var messageField = document.getElementById("chatMessage");
        if (!messageField.value.trim()) {
            messageField.focus();
            return;
        }

        var lastStep = steps[steps.length - 1];
        appendQuestionBubble(lastStep);
        appendSentBubble(messageField.value.trim());
        errorMsg.classList.add("is-hidden");
        showTyping();

        var formData = new FormData(form);

        fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" }
        })
            .then(function (response) {
                removeTyping();
                if (response.ok) {
                    form.classList.add("is-hidden");
                    confirmation.classList.remove("is-hidden");
                } else {
                    errorMsg.classList.remove("is-hidden");
                }
            })
            .catch(function () {
                removeTyping();
                errorMsg.classList.remove("is-hidden");
            });
    });
})();


(function () {
    var trigger = document.getElementById("contactTrigger");
    var dropdown = document.getElementById("contactDropdown");

    if (!trigger || !dropdown) return;

    trigger.addEventListener("click", function (e) {
        // Let actual links inside the dropdown navigate normally
        if (e.target.closest("a")) return;

        e.stopPropagation();
        dropdown.classList.toggle("is-open");
    });

    document.addEventListener("click", function (e) {
        if (!trigger.contains(e.target)) {
            dropdown.classList.remove("is-open");
        }
    });
})();