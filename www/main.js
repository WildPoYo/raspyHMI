const socket = new ReconnectingWebSocket('ws://localhost:8765');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Client Connected');
    connectionOn = true;

});


// Listen for messages
socket.addEventListener('message', function (event) {
    
    
});

var disconnected = function(){
  var mainDiv = document.getElementById('main');
  var firstLoadDiv = document.getElementById('firstLoad');
  var replaceDiv = document.getElementById('replaceDiv');
  mainDiv.classList.add('isHidden');
  firstLoadDiv.classList.add('isHidden');
  replaceDiv.classList.remove('isHidden');
};

var connected = function(){
    var mainDiv = document.getElementById('main');
    var replaceDiv = document.getElementById('replaceDiv');
    var firstLoadDiv = document.getElementById('firstLoad');
    firstLoadDiv.classList.add('isHidden');
    mainDiv.classList.remove('isHidden');
    replaceDiv.classList.add('isHidden');
};


function updateSlider(slideAmount) {
    var sliderDiv = document.getElementById("setSpeedValue");
    sliderDiv.classList.remove("isHidden");
    sliderDiv.innerHTML = slideAmount;
};

var started = false;
var rotatingDirection = 'Forward';

document.addEventListener('click', function (event) {

    var setSpeedValue = document.getElementById("setSpeedValue").innerHTML;
    var currentSpeed = document.getElementById("currentSpeed");
    var startStopButton = document.getElementById("startStopButton");
    var forwardButton = document.getElementById("forwardButton");
    var reverseButton = document.getElementById("reverseButton");
    var sliderDiv = document.getElementById("setSpeedValue");
    if (event.target.matches('#setSpeed')) {
        currentSpeed.innerHTML = setSpeedValue;
        sliderDiv.classList.add("isHidden");
    }


    switch (event.target.id) {
        case 'setSpeed':
            socket.send('Speed set to ' + setSpeedValue + ' RPM')
            console.log("Speed set");
            break;
        case 'startStopButton':

            if (startStopButton.value == 'Start') {
                started = true;
                socket.send(startStopButton.value + rotatingDirection);
                startStopButton.value = 'Stop';
                startStopButton.classList.add('toStop');
                startStopButton.classList.remove('toStart');
                console.log("Started Rotating : " + rotatingDirection);

            } else if (startStopButton.value == 'Stop') {
                started = false;
                socket.send(startStopButton.value);
                startStopButton.value = 'Start';
                startStopButton.classList.remove('toStop');
                startStopButton.classList.add('toStart');
                console.log("Stopped");

            }
            break;
        case 'forwardButton':
            if (rotatingDirection == 'Reverse' && startStopButton.value == 'Start' ) {
                rotatingDirection = 'Forward';
                
                forwardButton.classList.add('isEnabled');
                forwardButton.classList.remove('isDisabled');

                reverseButton.classList.add('isDisabled');
                reverseButton.classList.remove('isEnabled');
                console.log("Direction Changed : Forward");

            }

            break;
        case 'reverseButton':
            if (rotatingDirection == 'Forward' && startStopButton.value == 'Start' ) {
                rotatingDirection = 'Reverse';

                reverseButton.classList.add('isEnabled');
                reverseButton.classList.remove('isDisabled');   

                forwardButton.classList.add('isDisabled');
                forwardButton.classList.remove('isEnabled');

                console.log("Direction Changed : Reverse");
            }
            break;
    }

}, false);

//socket.close();
