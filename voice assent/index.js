let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    window.speechSynthesis.speak(text_speak)
}

function wiseMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("good morning sir")
    }
    else if(hours>=12 && hours<16){
        speak("good afternoon sir")
    }
    else if(hours>=16 && hours<21){
        speak("good evening sir")
    }
    else{
        speak("good night sir")
    }
}
window.addEventListener('load',()=>{
    wiseMe()
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());

    
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});



function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none"; // Assuming you want to toggle to "flex" and "none" between btn and voice

    if (message.includes("hello")) {
        speak("Hello sir, what can I help you with?");
    }
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created for you.");
    }
    else if (message.includes("open youtube")) {
        window.open("https://www.youtube.com/", "_blank");
    }
    else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com/", "_blank");
    }
    else {
        let finalText = "This is what I found on the internet regarding " + message.replace(/ankit|anker/gi, "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message.replace(/ankit|anker/gi, ""))}`, "_blank");
    }
}
