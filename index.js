document.addEventListener('DOMContentLoaded', function() {

const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");



// The random joke API
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single"

// Random Joke Function
let getJoke = () =>{
    jokeContainer.classList.remove("fade");
    // fetching random jokes from the API and parsing it into JavaScript object.
    fetch(url)
    .then(res => res.json())
    .then(data => {
        jokeContainer.innerText = `${data.joke}`;
        jokeContainer.classList.add("fade");
    });
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      getJoke();
    }
  });
  
soundBtn.addEventListener("click", () => {
    // Check if the SpeechSynthesis object is available
    if ('speechSynthesis' in window) {
        // The SpeechSynthesisUtterance is a web speech api that represents a speech request.
        let utterance = new SpeechSynthesisUtterance(`${jokeContainer.innerText}`);
        speechSynthesis.speak(utterance); // speak method of speechSynthesis speaks the utterance
    } else {
        console.log("SpeechSynthesis is not available");
    }
});

copyBtn.addEventListener("click", ()=>{
    // copying the joke text on copyBtn 
    // writeText() property writes the specified text string to the system clipboard.

    navigator.clipboard.writeText(jokeContainer.innerText);
});

twitterBtn .addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${jokeContainer.innerText}`
    window.open(tweetUrl, "_blank"); // opening a new twitter tab with passing quote in the url
});

btn.addEventListener("click", getJoke);

})