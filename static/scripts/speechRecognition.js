//  ========= Speech recognition ================
// From: https://github.com/mdn/dom-examples/blob/main/web-speech-api/speech-color-changer/script.js
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

console.log("hello");
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('#hints');

console.log(hints.innerHTML)


hints.onclick = function() {
    recognition.start();
    console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    var result = event.results[0][0].transcript;
    console.log(result)
    diagnostic.value =  result;
    // bg.style.backgroundColor = color;
    // console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
    recognition.stop();
}

// recognition.onnomatch = function(event) {
// diagnostic.textContent = "I didn't recognise that color.";
// }

recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

const form = document.getElementById('user-form');
const outputDiv = document.getElementById('text-output');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputText = form.draft.value;

    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input_text: inputText
        })
    });

    const data = await response.json();
    outputDiv.innerHTML = `<h3>Generated Output:</h3><p>${data.output_text}</p>`;
});