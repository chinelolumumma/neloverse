(function () {
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    var DOT_COUNT = 12;
    var FOLLOW = 0.35;
    var HOVER_TARGETS = "a, button, label, .menu-toggle, .chat-window__contact-trigger";

    var root = document.documentElement;
    var mouse = { x: -100, y: -100 };
    var dots = [];
    var running = false;

    for (var i = 0; i < DOT_COUNT; i++) {
        var el = document.createElement("div");
        var size = 10 - i * 0.6;
        el.className = i === 0 ? "cursor-dot cursor-dot--head" : "cursor-dot";
        el.style.width = size + "px";
        el.style.height = size + "px";
        el.style.opacity = 1 - i / DOT_COUNT;
        document.body.appendChild(el);
        dots.push({ el: el, x: -100, y: -100 });
    }

    root.classList.add("has-trail");

    function animate() {
        var targetX = mouse.x;
        var targetY = mouse.y;
        var moving = false;

        dots.forEach(function (dot, i) {
        var ease = i === 0 ? 1 : FOLLOW;
        var dx = targetX - dot.x;
        var dy = targetY - dot.y;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) moving = true;

        dot.x += dx * ease;
        dot.y += dy * ease;
        dot.el.style.transform = "translate(" + dot.x + "px, " + dot.y + "px) translate(-50%, -50%)";

        targetX = dot.x;
        targetY = dot.y;
        });

        if (moving) {
        requestAnimationFrame(animate);
        } else {
        running = false;
        }
    }

    document.addEventListener("mousemove", function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        root.classList.remove("trail-hidden");

        if (!running) {
        running = true;
        requestAnimationFrame(animate);
        }
    });

    document.addEventListener("mouseover", function (e) {
        root.classList.toggle("trail-hover", !!e.target.closest(HOVER_TARGETS));
    });

    document.addEventListener("mouseout", function (e) {
        if (!e.relatedTarget) root.classList.add("trail-hidden");
    });
})();