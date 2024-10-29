// Clock class is looking for a table row element called systemClock

class Clock {
    constructor(document) {
        this.time = Date.now();
        this.clockType = "System";
        
        const date = new Date(this.time);
        const offset = date.getTimezoneOffset() / 60;
        
        this._clockElement = document.getElementById("systemClock");
        this._clockElement.cells[0].innerText = `${this.clockType} Clock (UTC${
            (offset < 0 ? "" : "+") + offset
        })`;
        this.timeElement = this._clockElement.cells[1];
        this.draw();
    }

    draw() {
        const date = new Date(this.time);
        const text = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: false,
            minute: "numeric",
            second: "numeric",
        });
        // + "." + (this._time % 1000).toString().padStart(3, "0");
        // Intl.DateTimeFormat().resolvedOptions().timeZone; // eg. America/Denver
        this.timeElement.innerText = text;
    }
}
