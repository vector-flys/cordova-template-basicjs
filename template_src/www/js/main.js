// This is the main function

// Interval function to update the clock
let systemClock = undefined;
function updateClock() {
    systemClock.time = Date.now();
    systemClock.draw();
}

define(function (require) {
    require("./clock");
    systemClock = new Clock(document);
    setInterval(updateClock, 1000);
});