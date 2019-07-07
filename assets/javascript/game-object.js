var game = {
    answerPlaceholder: [],
    currentSolution: "",
    numUnsolved: 0,
    guessesRemaining: 5,
    isGuessCorrect: [],
    incorrectKeyStrokes: [],
    correctKeyStrokes: [],
    isContinue: true,
    wins: 0,
    losses: 0,
    started: false,
    solutions: [
        {
        name: "EUGENE KRABS",
        hint: "He is the creator of the Krabby Patty.",
        pic: "assets/images/mrkrabs.png"
    },
    {
        name: "SANDY CHEEKS",
        hint: "She is a karate master.",
        pic: "assets/images/sandycheeks.png"
    },
    {
        name: "PATRICK STAR",
        hint: "He is Spongbob's best friend.",
        pic: "assets/images/patrick.png"
    },
    {
        name: "LARRY THE LOBSTER",
        hint: "He is Bikini Bottom's lifeguard.",
        pic: "assets/images/larry.jpg"
    },
    {
        name: "SQUIDWARD TENTACLES",
        hint: "He loves to play the clarinet.",
        pic: "assets/images/squidward.png"
    },
    {
        name: "SQUILLIAM FANCYSON",
        hint: "He is Squidward's high-class cousin",
        pic: "assets/images/squilliam.jpg"
    },
    {
        name: "SPONGEBOB SQUAREPANTS",
        hint: "He lives in a pineapple under the sea.",
        pic: "assets/images/spongebob.png"
    },
    {
        name: "THE FLYING DUTCHMAN",
        hint: "He is the captain of a ghostly pirate ship.",
        pic: "assets/images/flyingdutchman.jpg"
    },
    {
        name: "KING NEPTUNE",
        hint: "He is the king of the sea.",
        pic: "assets/images/kingneptune.jpg"
    }
    ],
    pickWord: function(){
        this.currentSolution = this.solutions[Math.floor(Math.random()*this.solutions.length)].name
        console.log(this.currentSolution)
        this.numUnsolved = this.currentSolution.length - (this.currentSolution.split(" ").length - 1)
        for (i = 0; i < this.currentSolution.length; i++){
            if(this.currentSolution.charAt(i) == " "){
                this.answerPlaceholder[i] = "-"
            }
            else{
                this.answerPlaceholder[i] = " _ "
            }
            document.getElementById("answer").innerHTML = this.answerPlaceholder.join("")
        }
    },
    play: function(){
        this.guessesRemaining = 5
        document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + this.guessesRemaining
        document.getElementById("answer").innerText = ""
        document.getElementById("ans-img").src = ""
        document.getElementById("key-strokes").innerHTML = ""
        this.incorrectKeyStrokes = []
        this.correctKeyStrokes = []
        $(document).ready(this.pickWord())
    },
    replay: function(){
        if(confirm("Play again?")){
            this.play()
        }
        else{
            alert("bye );")
            window.close()
        }
    },
    storeKeyStroke: function(k){
        if(this.correctKeyStrokes.indexOf(k) == -1 && this.incorrectKeyStrokes.indexOf(k) == -1){
            for(i = 0; i < this.currentSolution.length; i++){
                if(k == this.currentSolution.charAt(i)){
                    if(this.correctKeyStrokes.indexOf(k) == -1){
                        this.correctKeyStrokes.push(k)
                    }
                    this.answerPlaceholder[i] = k
                    document.getElementById("answer").innerText = this.answerPlaceholder.join(" ")
                }
                else{
                    if(i == this.currentSolution.length - 1 && this.correctKeyStrokes.indexOf(k) == -1){
                        this.incorrectKeyStrokes.push(k)
                        this.guessesRemaining--
                        document.getElementById("guesses-remaining").innerText = "Guesses Remaining: " + this.guessesRemaining
                    }
                }
            }
        }
        console.log("correct: " + game.correctKeyStrokes)
        console.log("incorrect: " + game.incorrectKeyStrokes)
    },
    giveHint: function(){
        document.getElementById("hint").innerText = this.solutions[this.findWithAttr(this.solutions, "name", this.currentSolution)].hint
    },
    findWithAttr: function(array, attr, value){
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
}

$(document).keypress(function(k){
    if(game.started == false){
        game.started = true
        game.play()
    }
    else{
        var selectedKey = String.fromCharCode(k.which).toUpperCase()
        game.storeKeyStroke(selectedKey)
    }
    if(game.guessesRemaining == 1){
        game.giveHint()
    }
})

// // returns index of element based on attribute value //
// function findWithAttr(array, attr, value) {
//     for(var i = 0; i < array.length; i += 1) {
//         if(array[i][attr] === value) {
//             return i;
//         }
//     }
//     return -1;
// }

// $(document).keypress(function(e){
//     pickWord()
// })

// function startGame(){

// $(document).keypress(function(e){
//     var selectedKey = String.fromCharCode(e.which).toUpperCase()

//     // checks if key was already selected or if the space bar was selected //
//     if(incorrectKeyStrokes.indexOf(selectedKey) == -1 && correctKeyStrokes.indexOf(selectedKey) == -1 && selectedKey != " "){    
//         for(var i = 0; i < currentSolution.length; i++){

//             // checks if the selected key is part of the solution //
//             if(selectedKey == currentSolution[i]){
//                 answerPlaceholder[i] = selectedKey
//                 numUnsolved--
//                 console.log(numUnsolved)
//                 isGuessCorrect.push(true)
//                 correctKeyStrokes.push(selectedKey)
//             }
//             else{
//                 isGuessCorrect.push(false)
//             }
//         }

//         document.getElementById("answer").innerHTML = answerPlaceholder.join("")
        
//         // checks if the selected key does not match with any letters in the solution //
//         if(isGuessCorrect.indexOf(true) == -1){
//             incorrectKeyStrokes.push(selectedKey)
//             document.getElementById("key-strokes").innerHTML = "Already Guessed: " + incorrectKeyStrokes.join(", ")
//             guessesRemaining--
//             document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining
            
//             // checks if no guesses are remaining to ask user to play again //
//             if(guessesRemaining == 0){
//                 $(document).ready(function(){
//                 alert("You lost. :(")
//                 replay()
//                 })
//             }

//             // checks if there is one guess remaining and provides hint //
//             if(guessesRemaining == 1){
//                 document.getElementById("hint").innerHTML = "hint: " + solutions[findWithAttr(solutions, "name", currentSolution)].hint
//             }
//         }
//         else{
//             // checks if the answer has been solved //
//             if(numUnsolved == 0){
//                 $(document).ready(function(){
//                     alert("Nice!")
//                     replay()
//                 })
//             }
//         }    

//         isGuessCorrect = []
//     }

// })

// }

