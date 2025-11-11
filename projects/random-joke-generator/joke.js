// <!-- Template for a Joke Card (you can clone this in JS) -->
//   <!-- 
//   <div class="joke-card">
//     <p class="setup">Why don’t scientists trust atoms?</p>
//     <p class="punchline hidden">Because they make up everything!</p>
//     <div class="buttons">
//       <button class="reveal-btn">Reveal Punchline</button>
//       <button class="share-btn">Share on Twitter</button>
//     </div>
//   </div>
//   -->



let jokesContainer = document.getElementById("jokes-container");
let jokeCard = document.createElement("div");
jokeCard.className = "joke-card";
let setUp = document.createElement("p");
setUp.className = "setup";

let punchLine = document.createElement("p");
punchLine.classList.add("hidden");

jokesContainer.appendChild(jokeCard);
jokeCard.appendChild(setUp);
jokeCard.appendChild(punchLine);

function fetchJoke(){
    fetch("https://official-joke-api.appspot.com/random_joke")
.then(response => response.json())
.then(data =>{
    setUp.textContent = data.setup
    punchLine.textContent = data.punchline
    // if(punchLine){
    //     punchLine.hidden = true;
    // }
})

.catch(error =>{
    console.log("Error from fetching",error);
});
}
fetchJoke();

// Step 3 Breakdown (concept only)

// Create a new <div> inside each card — call it .buttons.

// Inside .buttons, create a <button> element → give it the class "reveal-btn".
// The text should say "Reveal Punchline".

// Add the .hidden class to the punchline paragraph when you create it.
// (So it starts hidden.)

// Use addEventListener("click", ...) on the button:

// When the button is clicked → toggle the .hidden class on the punchline.

// Optionally, change the button text to "Hide Punchline" when visible.
let buttonDiv = document.createElement("div");
buttonDiv.className = "buttons";
let revealButton = document.createElement("button");
revealButton.className = "reveal-btn";
revealButton.textContent = "Reveal Punchline";
let shareButton = document.createElement("button");
shareButton.className = "share-btn";
shareButton.innerHTML = `<i class="fa-solid fa-share-nodes"></i>share`;
buttonDiv.appendChild(revealButton);
buttonDiv.appendChild(shareButton);
jokeCard.appendChild(buttonDiv);

revealButton.addEventListener("click",() =>{
    let isHidden = punchLine.classList.toggle("hidden");
   
    if(isHidden){
        revealButton.textContent = "Reveal Punchline";
    }else{
         revealButton.textContent = "Hide Punchline";
    }
});
// let twitterLink = encodeURIComponent(`${setUp} - ${punchLine}`);
// let fullLink = "https://twitter.com/intent/tweet?text=" + twitterLink;
// window.open(fullLink, "_blank");
let shareJoke = "";

let shareModalContainer = document.getElementById("share-modal");
shareButton.addEventListener("click",() =>{
    shareJoke = `${setUp.textContent} 😂- ${punchLine.textContent}`;
    console.log(shareJoke);
    
    shareModalContainer.classList.remove("hidden");
});
const closeModal = document.querySelector("#close-modal");
closeModal.addEventListener("click", () =>{
    shareModalContainer.classList.add("hidden");
});

// sharing Logic

const whatsappBtn = document.querySelector(".whatsapp");
// console.log(whatsappBtn);
const twitterBtn = document.querySelector(".twitter");
const copyBtn = document.querySelector(".copy");

whatsappBtn.addEventListener("click", ()=>{
    if(!shareJoke) return;
        const encoded = encodeURIComponent(shareJoke);
        const url = `https://api.whatsapp.com/send?text=${encoded}`;
        window.open(url,"_blank");
        shareModalContainer.classList.add("hidden");
    
});

twitterBtn.addEventListener("click", () =>{
    if(!shareJoke) return;
    const encoded = encodeURIComponent(shareJoke);
    const url = `https://twitter.com/intent/tweet?text=${encoded}`;
    window.open(url,"_blank");
    shareModalContainer.classList.add("hidden");
});

// copyBtn.addEventListener("click", () =>{
//     const copiedNotification = document.querySelector(".copy-toast");
//     const shareJokeText = `${setUp.textContent} 😂- ${punchLine.textContent}`;
//     if(!shareJokeText) return;
//     navigator.clipboard.writeText(shareJokeText)
//     .then(() =>{
//         copyBtn.textContent = "Copied ✅";
//         copiedNotification.classList.add("show");
//         setTimeout(() =>(copiedNotification.classList.remove("show")),2000)
//         setTimeout(() => (copyBtn.textContent = "Copy"),2000);
    
//     })
//     .catch(error =>alert("Error Occurred"));

 
// });


copyBtn.addEventListener("click", () => {
    const copiedNotification = document.querySelector(".copy-toast");
    const shareJokeText = `${setUp.textContent} 😂 - ${punchLine.textContent}`;
    if (!shareJokeText) return;

    // ✅ Fallback function for older browsers
    function fallbackCopyText(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        // Trigger the same notification
        copiedNotification.classList.add("show");
        setTimeout(() => copiedNotification.classList.remove("show"), 2000);
        copyBtn.textContent = "Copied ✅";
        setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
    }

    // ✅ Try modern API first, fallback if unsupported
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareJokeText)
            .then(() => {
                copyBtn.textContent = "Copied ✅";
                copiedNotification.classList.add("show");
                setTimeout(() => copiedNotification.classList.remove("show"), 2000);
                setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
            })
            .catch(() => {
                fallbackCopyText(shareJokeText);
            });
    } else {
        fallbackCopyText(shareJokeText);
    }
});


// document.getElementById("next-joke-btn").addEventListener("click", () => {
//   jokeCard.style.opacity = 0; // fade out old joke
//   setTimeout(() => {
//     fetchJoke(); // fetch new one
//     jokeCard.style.opacity = 1; // fade in
//   }, 300);
// });
// const loader = document.getElementById("loader");
// document.getElementById("next-joke-btn").addEventListener("click", () => {
//     loader.classList.remove("hidden-loader");
//   // fade out the current joke
//   jokeCard.style.opacity = 0;

//   // wait 300ms (same as CSS transition) before changing text
//   setTimeout(() => {
//     fetch("https://official-joke-api.appspot.com/random_joke")
//       .then(response => response.json())
//       .then(data => {
//         setUp.textContent = data.setup;
//         punchLine.textContent = data.punchline;
//         punchLine.classList.add("hidden");
//         revealButton.textContent = "Reveal Punchline";

//         // now fade back in
//         jokeCard.style.opacity = 1;
//       })
//       .catch(error => {
//         console.log("Error fetching joke:", error);
//       });
//   }, 100);
// });

const loader = document.getElementById("loader");

document.getElementById("next-joke-btn").addEventListener("click", () => {
  loader.classList.remove("hidden-loader"); // show loader
  jokeCard.style.opacity = 0;

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      setUp.textContent = data.setup;
      punchLine.textContent = data.punchline;
      punchLine.classList.add("hidden");
      revealButton.textContent = "Reveal Punchline";
    })
    .finally(() => {
      setTimeout(() => {
        loader.classList.add("hidden-loader"); // hide loader
        jokeCard.style.opacity = 1;
      }, 300);
    });
});
