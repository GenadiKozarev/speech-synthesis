const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(
            voice =>
                `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`
        )
        .join('');
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
