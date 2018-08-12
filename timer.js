var pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    distracted_opacity: 0.0,
    init: function () {
        var self = this;
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.interval = setInterval(function () {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector('#work').onclick = function () {
            self.startWork.apply(self);
        };
        document.querySelector('#shortBreak').onclick = function () {
            self.startShortBreak.apply(self);
        };
        document.querySelector('#longBreak').onclick = function () {
            self.startLongBreak.apply(self);
        };
        document.querySelector('#stop').onclick = function () {
            self.stopTimer.apply(self);
        };
        document.querySelector('#distracted').onclick = function () {
            self.distracted.apply(self);
        };
    },
    resetVariables: function (mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;

    },
    startWork: function () {
        this.resetVariables(25, 0, true);
    },
    startShortBreak: function () {
        this.resetVariables(5, 0, true);
    },
    startLongBreak: function () {
        this.resetVariables(15, 0, true);
    },
    stopTimer: function () {
        this.resetVariables(25, 0, false);
        this.updateDom();
    },
    distracted: function () {
        if (this.distracted_opacity < 1) {
            this.distracted_opacity += 0.2;
            if(this.distracted_opacity > 1){
                this.distracted_opacity = 1;
            }
        }
        document.getElementById("distracted_circle").style.border
            = "2px solid rgba(255,0,0," + String(this.distracted_opacity) + ")";

        var new_div = document.createElement("div");
        console.log(new_div);
        new_div.className = "circle-counter counter-rotating centered";
        var app_container = document.querySelector('#app-container');
        new_div.style.border
            = "2px solid rgba(255,0,0," + String(this.distracted_opacity) + ")";

        app_container.appendChild(new_div);
        console.log(app_container);
    },
    toDoubleDigit: function (num) {
        if (num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },
    updateDom: function () {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    },
    intervalCallback: function () {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    },
    timerComplete: function () {
        this.started = false;
        this.fillerHeight = 0;
    }
};
window.onload = function () {
    pomodoro.init();
};