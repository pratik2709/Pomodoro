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
        displayNotification('Let\'s get started!');
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
        // document.getElementById("distracted_circle").style.border
        //     = "2px solid rgba(255,0,0," + String(this.distracted_opacity) + ")";

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
        displayNotification('Time up!');
    }
};
window.onload = function () {
    installServiceWorkerAsync();
    installOnUserMachine();
    pomodoro.init();
};

async function installServiceWorkerAsync() {
    if ('serviceWorker' in navigator) {
        try {
            let serviceWorker = await navigator.serviceWorker.register('sw.js')
            console.log(`Service worker registered ${serviceWorker}`)
        } catch (err) {
            console.error(`Failed to register service worker: ${err}`)
        }
    }
}

//Notification.requestPermission(function(status) {
//    console.log('Notification permission status:', status);
//});

function displayNotification(displayText) {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification(displayText);
    });
  }
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log("triggered");
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

});

function installOnUserMachine(){
    (document.querySelector('#addButton')).addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      (document.querySelector('#addButton')).style.class = 'not-active';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            (document.querySelector('#addButton')).style.class = '';
            console.log('User dismissed the A2HS prompt');
          }
        });
    });
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
