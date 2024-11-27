const msg = new SpeechSynthesisUtterance();
msg.text = document.querySelector('[name="text"]').value;
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.getElementById('speak');
const stopButton = document.getElementById('stop');

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(
            voice =>
                `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`
        )
        .join('');
}

const setVoice = e => {
    msg.voice = voices.find(voice => voice.name === e.target.value);
    restartSpeech();
};

const restartSpeech = ({ startOver = true } = {}) => {
    speechSynthesis.cancel();
    console.log(startOver);
    if (startOver) {
        speechSynthesis.speak(msg);
    }
};

populateVoices();

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
