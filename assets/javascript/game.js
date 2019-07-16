var game = {
    currentSolution: "", //the word that needs to be solved
    numUnsolved: 1, //number of letters that are still unsolved
    guessesRemaining: 5, //number of guesses user has remaining until game over
    incorrectKeyStrokes: [], //stores chars that are not in currentSolution
    correctKeyStrokes: [], //stores chars that are in currentSolution
    wins: 0, 
    losses: 0,
    started: false, //flag if game has started
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
        // determines the number of characters in the currentSolution minus any spaces //
        this.numUnsolved = this.currentSolution.length - (this.currentSolution.split(" ").length - 1)
        // creates placeholder dashes and underscores for letters in currentSolution //
        for (i = 0; i < this.currentSolution.length; i++){
            var letter = $("<span>")
            if(this.currentSolution.charAt(i) == " "){
                $(letter).text(" - ")    
            }
            else{
                $(letter).text(" _ ")
            }
            $(letter).attr("correct-letter", this.currentSolution.charAt(i))
            $("#answer").append(letter)
        }
    },
    play: function(){
        $("#ans-img").css("display","none")
        this.guessesRemaining = 5
        document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + this.guessesRemaining
        document.getElementById("answer").innerHTML = ""
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
        // makes sure key was not already pressed //
        if(this.correctKeyStrokes.indexOf(k) == -1 && this.incorrectKeyStrokes.indexOf(k) == -1){
            for(i = 0; i < this.currentSolution.length; i++){
                if(k == this.currentSolution.charAt(i)){
                    if(this.correctKeyStrokes.indexOf(k) == -1){
                        this.correctKeyStrokes.push(k)
                        var letterCount = 0 // counts how many times letter appears so numUnsolved is correctly updated
                        letterCount++
                    }
                    this.numUnsolved = this.numUnsolved - letterCount
                    $("[correct-letter='" + k + "']").text(k)
                }
                else{
                    // makes sure that this is the last time through the loop indicating that the keystroke is not in currentSolution //
                    // guessesRemaining > 0 added to prevent updating once all guesses have been used //
                    if(i == this.currentSolution.length - 1 && this.correctKeyStrokes.indexOf(k) == -1 && this.guessesRemaining > 0){
                        this.incorrectKeyStrokes.push(k)
                        this.guessesRemaining--
                        document.getElementById("guesses-remaining").innerText = "Guesses Remaining: " + this.guessesRemaining
                        document.getElementById("key-strokes").innerText = "Wrong Guesses: " + this.incorrectKeyStrokes.join(", ")
                        
                    }
                }
            }
        }
    },
    giveHint: function(){
        document.getElementById("hint").innerText = "hint: " + this.solutions[this.findWithAttr(this.solutions, "name", this.currentSolution)].hint
    },
    // returns the element of an array with a certain attribute value //
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
                alert("You won! :]")
                game.replay()
            },4000)
        }
    },
    updateScore: function(){
        document.getElementById("wins-losses").innerHTML = "Wins: " + this.wins + (" | Losses: ") + this.losses
    }
}

$(document).keypress(function(k){
    // prevents updating if game is already over //
    if(game.guessesRemaining != 0 && game.numUnsolved != 0){
        // checks if this is the first time playing since load //
        if(game.started == false){
            document.getElementById("hi").play()
            game.started = true
            game.updateScore()
            game.play()
        }
        else{
            // prevents spacebar from executing block //
            if(k.keyCode != 32){
                game.storeKeyStroke(String.fromCharCode(k.which).toUpperCase())
                if(game.guessesRemaining == 1){
                    game.giveHint()
                }
                // game is over once either there are no guesses remaining or no unsolved letters remaining //
                if(game.guessesRemaining == 0 || game.numUnsolved == 0){
                    document.getElementById("hint").innerHTML = ""
                    document.getElementById("ans-img").src = game.solutions[game.findWithAttr(game.solutions, "name", game.currentSolution)].pic
                    setTimeout(function(){
                        document.getElementById("answer").innerHTML = "Answer: " + game.currentSolution
                    },2000)
                    $("#ans-img").fadeIn(3000)
                    game.gameEnd()
                }
            }
        }
    }
})