const welcomeText = document.querySelector('textarea[name="text"]');
welcomeText.textContent = `Your Personal Voice Playground! 🎙️ \n
Unleash the power of text-to-speech magic! Drop in any text—a favorite quote, a funny story, or random thoughts—and transform it with different voices and speech styles. Want to hear your message whisper-soft or race like an auctioneer? Slide the speed and pitch controls and discover hilarious vocal experiments. Choose from a variety of voices, and let technology turn your words into an audio adventure!`;

const msg = new SpeechSynthesisUtterance();
msg.text = document.querySelector('[name="text"]').value;
msg.rate = document.querySelector('input[name="rate"]').value;
msg.pitch = document.querySelector('input[name="pitch"]').value;
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.getElementById('speak');
const stopButton = document.getElementById('stop');

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
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
