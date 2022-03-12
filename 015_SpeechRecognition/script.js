const msgEl = document.getElementById('msg');
const randomNumber = getRandomNumber();


var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.lang ='en-US';

console.log(recognition)


recognition.start()

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  
  writeMessage(msg);
  checkNumber(msg);
  
}

function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg;

  if(Number.isNaN(num)){
    msgEl.innerHTML = `<div>That is not a valid number</div>`
    return;
  }

  if(num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`
    return;
  }

  if(num === randomNumber) {
    document.body.innerHTML = `
    <h2>You have guessed the number! <br><br>
    It was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `
  } else if(num > randomNumber) {
    msgEl.innerHTML += `<div>Go lower</div>`
  } else {
    msgEl.innerHTML += `<div>Go higher</div>`
  }
  
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener('result', onSpeak)

recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', () => {
  if(e.target.id == 'play-again'){
    window.location.reload();
  }
})
