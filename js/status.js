(function () {
    var TIMEZONE = "America/Chicago";
    var AWAKE_START_HOUR = 8;   // 8am
    var AWAKE_END_HOUR = 16;    // 4pm

    function updateStatusWidget() {
        var icon = document.getElementById("statusIcon");
        var state = document.getElementById("statusState");
        if (!icon || !state) return;

        var now = new Date();
        var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: TIMEZONE,
        weekday: "short",
        hour: "numeric",
        hour12: false
        }).formatToParts(now);

        var weekday = parts.find(function (p) { return p.type === "weekday"; }).value;
        var hour = parseInt(parts.find(function (p) { return p.type === "hour"; }).value, 10);

        var isWeekend = ["Sat", "Sun"].indexOf(weekday) !== -1;
        var isAwakeHours = hour >= AWAKE_START_HOUR && hour < AWAKE_END_HOUR;

        icon.classList.remove("fa-moon", "fa-sun", "fa-leaf", "is-awake");

        if (isWeekend) {
            icon.classList.add("fa-leaf", "is-awake");
            state.textContent = "I'm touching grass";
        } else if (isAwakeHours) {
            icon.classList.add("fa-sun", "is-awake");
            state.textContent = "I'm up";
        } else {
            icon.classList.add("fa-moon");
            state.textContent = "I'm asleep";
        }
    }

    updateStatusWidget();
    setInterval(updateStatusWidget, 60000);
})();