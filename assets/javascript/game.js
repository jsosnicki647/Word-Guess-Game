var game = {
    answerPlaceholder: [],
    currentSolution: "",
    numUnsolved: 0,
    guessesRemaining: 5,
    incorrectKeyStrokes: [],
    correctKeyStrokes: [],
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
        document.getElementById("answer").innerHTML = ""
        document.getElementById("ans-img").src = ""
        document.getElementById("key-strokes").innerHTML = ""
        this.incorrectKeyStrokes = []
        this.correctKeyStrokes = []
        this.answerPlaceholder = []
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
                        var letterCount = 0
                        letterCount++
                    }
                    this.numUnsolved = this.numUnsolved - letterCount
                    this.answerPlaceholder[i] = k
                    document.getElementById("answer").innerText = this.answerPlaceholder.join(" ")
                }
                else{
                    if(i == this.currentSolution.length - 1 && this.correctKeyStrokes.indexOf(k) == -1){
                        this.incorrectKeyStrokes.push(k)
                        this.guessesRemaining--
                        document.getElementById("guesses-remaining").innerText = "Guesses Remaining: " + this.guessesRemaining
                        document.getElementById("key-strokes").innerText = "Wrong Guesses: " + this.incorrectKeyStrokes.join(", ")
                    }
                }
            }
        }
        console.log("correct: " + game.correctKeyStrokes)
        console.log("incorrect: " + game.incorrectKeyStrokes)
    },
    giveHint: function(){
        document.getElementById("hint").innerText = "hint: " + this.solutions[this.findWithAttr(this.solutions, "name", this.currentSolution)].hint
    },
    findWithAttr: function(array, attr, value){
        for(var i = 0; i < array.length; i++) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    },
    gameEnd: function(){
        if(this.guessesRemaining == 0){
            document.getElementById("loss").play()
            this.losses++
            this.updateScore()
            setTimeout(function(){
                alert("You lost. :(")
                game.replay()
            }, 3000)
        }
        else if(this.numUnsolved == 0){
            document.getElementById("win").play()
            this.wins++
            this.updateScore()
            setTimeout(function(){
                alert("You Won! :)")
                game.replay()
            },7000)
        }
    },
    updateScore: function(){
        document.getElementById("wins-losses").innerHTML = "Wins: " + this.wins + (" | Losses: ") + this.losses
    }
}

$(document).keypress(function(k){
    if(game.started == false){
        document.getElementById("hi").play();
        game.started = true
        game.updateScore()
        game.play()
    }
    else{
        game.storeKeyStroke(String.fromCharCode(k.which).toUpperCase())
        if(game.guessesRemaining == 1){
            game.giveHint()
        }
        console.log("numUnsolved: " + game.numUnsolved)
        if(game.guessesRemaining == 0 || game.numUnsolved == 0){
            document.getElementById("hint").innerHTML = ""
            document.getElementById("answer").innerHTML = "Answer: " + game.currentSolution
            document.getElementById("ans-img").src = game.solutions[game.findWithAttr(game.solutions, "name", game.currentSolution)].pic
            game.gameEnd()
        }
        
    }
})

