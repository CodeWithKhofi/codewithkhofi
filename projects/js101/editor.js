//  CodeMirror Init + Run Button 
// Initialize CodeMirror
     const runBtn = document.getElementById("run-btn");
      const output = document.getElementById("outputBox");
      const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"),{
      mode: "javascript",
      theme: "dracula",
      lineNumbers: true,
      placeholder: "// Write your JavaScript code here...",
      autocorrect: true,
      autoCloseBrackets: true,

    });

    runBtn.addEventListener("click", () =>{
      let result = "";
      let oldLog = console.log;
      console.log = function (...args){
        result += args.join("") + "\n";
      };
      try{
        let returnedValue = eval(editor.getValue());
        if(returnedValue !== undefined){
          result += returnedValue;
        }
        output.textContent = result || "No output ";
      }
      catch(error){
        output.textContent = "Error: " + error.message;
      }
      finally{
        console.log = oldLog;
      }
    });
    
    // Fetching From challenges.json

    let jsonChallenges = [];
    let category,challengeTitle,challengeDescription,challengeExampleCode,
    challengeExpectedOutput,startingCode,hintText,hintBtn;
    let hintVisible = false;
    fetch("./data/challenges.json")
    .then(response =>response.json())
    .then(data =>{
      // console.log(data[5]);
      
      
      jsonChallenges = data.challenges;
      
       category = document.querySelector(".category");
       challengeTitle = document.querySelector(".title");
       challengeDescription = document.querySelector(".description");
       challengeExampleCode = document.querySelector(".example-code");
       challengeExpectedOutput = document.querySelector(".expected-output");
       startingCode = document.querySelector(".starter-code");
       hintText = document.querySelector(".hint-text");
       hintBtn = document.querySelector(".hint-btn");
      const nextChallengeButton = document.querySelector(".next");
      nextChallengeButton.addEventListener("click",nextChallenge);
      
      
      hintBtn.addEventListener("click", () =>{
        const currentChallenge = jsonChallenges[currentIndex];
        hintVisible = !hintVisible;
        hintText.textContent = hintVisible ? currentChallenge.hint : "";
        if(hintVisible){
          hintText.style.display = "flex";
        }else{
          hintText.style.display = "none";
        }
      })
      loadChallenge(currentIndex);
  

    });

    let currentIndex = 0;

    function loadChallenge(index){
      const challenge = jsonChallenges[index];
      category.textContent = challenge.category;
      challengeTitle.textContent = challenge.title;
      challengeDescription.textContent = challenge.description;
      challengeExampleCode.textContent = challenge.exampleCode.replace(/\\n/g, "\n");
      challengeExpectedOutput.textContent = challenge.expectedOutput;
      startingCode.textContent = challenge.starterCode;
      hintText.textContent = challenge.hint;
      Prism.highlightElement(challengeExampleCode);

      // editor.setValue("");
      // output.textContent = "";
      if(editor){editor.setValue("");}
      if(output){output.textContent = "";}
      
    }

    function nextChallenge(){
      currentIndex ++;
      if(currentIndex >= jsonChallenges.length){
        currentIndex = 0;
      }
      hintVisible = false;
      hintText.textContent = "";
      hintText.style.display = "none";
      loadChallenge(currentIndex);
      Prism.highlightElement(challengeExampleCode);
    }

      let episodeBtn = document.querySelectorAll(".episode-btn");
      // console.log(episodeBtn);

      episodeBtn.forEach((button, index )=>{
        button.addEventListener("click", () =>{
          currentIndex = index;

          episodeBtn.forEach(btn =>{
            btn.classList.remove("active");
            button.classList.add("active");
          })
          loadChallenge(currentIndex);

        })
      })