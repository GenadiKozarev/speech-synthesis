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
    toggleSpeech();
};

const toggleSpeech = ({ startOver = true } = {}) => {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
};

const setOption = e => {
    msg[e.target.name] = e.target.value;
    toggleSpeech();
};

populateVoices();

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', () => toggleSpeech({ startOver: false }));
