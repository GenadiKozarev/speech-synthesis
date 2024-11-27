const msg = new SpeechSynthesisUtterance();
msg.text = document.querySelector('[name="text"]').value;
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');

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
};

populateVoices();

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
