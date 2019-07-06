// var solutions = ["EUGENE KRABS","SANDY CHEEKS","PATRICK STAR","LARRY THE LOBSTER","SQUIDWARD TENTACLES","SQUILLIAM FANCYSON","SPONGEBOB SQUAREPANTS","THE FLYING DUTCHMAN","KING NEPTUNE"]

var answerPlaceholder = []
var numUnsolved 
var guessesRemaining = 5
var isGuessCorrect= []
var incorrectKeyStrokes = []
var correctKeyStrokes = []
var isContinue
var lastChance = ["He created the Krabby Patty.","She is a karate master.","He is Spongebob's best friend.","He is Bikini Bottom's lifeguard","He loves to play clarinet","He is Squidward's high-class cousin", "He lives in a pineapple under the sea.","He is the captian of a ghostly pirate ship.","He is the king of the sea."]

var solutions = [
    {
        name: "EUGENE KRABS",
        hint: "He is the creator of the Krabby Patty."
    }
]

// selects word for the game //
function pickWord(){
    currentSolution = solutions[Math.floor(Math.random()*solutions.length)].name
    numUnsolved = currentSolution.length - 1
    console.log(numUnsolved)
    
    for (i = 0; i < currentSolution.length; i++){
        
        if(currentSolution.charAt(i) == " "){
            answerPlaceholder[i] = "-"
        }
        else{
            answerPlaceholder[i] = " _ "
        }

        document.getElementById("answer").innerHTML = answerPlaceholder.join("")
    }
}

pickWord()

function replay(){
    isContinue = confirm("Play again?")
    // checks if user has chosen to continue //
    if(isContinue){
        guessesRemaining = 5
        document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining
        document.getElementById("hint").innerHTML = ""
        document.getElementById("ans-img").src = ""
        document.getElementById("key-strokes").innerHTML = ""
        incorrectKeyStrokes = []
        correctKeyStrokes = []
        pickWord()
    }
    else{
        alert("bye );")
        window.close()
    }
}

$(document).on("keyup", function(e){
    var selectedKey = String.fromCharCode(e.which).toUpperCase()
    if(incorrectKeyStrokes.indexOf(selectedKey) == -1 && correctKeyStrokes.indexOf(selectedKey) == -1){    
        for(var i = 0; i < currentSolution.length; i++){
        // checks if the selected key is part of the solution //
            
            if(selectedKey == currentSolution[i]){
                answerPlaceholder[i] = selectedKey
                numUnsolved--
                console.log(numUnsolved)
                isGuessCorrect.push(true)
                correctKeyStrokes.push(selectedKey)
            }
            else{
                isGuessCorrect.push(false)
            }
        }

        document.getElementById("answer").innerHTML = answerPlaceholder.join("")
        // checks if the selected key does not match with any letters in the solution //
        if(isGuessCorrect.indexOf(true) == -1){
            incorrectKeyStrokes.push(selectedKey)
            document.getElementById("key-strokes").innerHTML = "Already Guessed: " + incorrectKeyStrokes.join(", ")
            guessesRemaining--
            document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining
            // checks if no guesses are remaining to ask user to play again //
            if(guessesRemaining == 0){
                document.getElementById("ans-img").src = "assets/images/spongebob.png"
                $(document).ready(function(){replay()})
            }
            // checks if there is one guess remaining and provides hint //
            if(guessesRemaining == 1){
                document.getElementById("hint").innerHTML = "hint: " + lastChance[solutions.indexOf(currentSolution)]
            }
        }
        else{
            if(numUnsolved == 0){
                $(document).ready(function(){
                    alert("Nice!")
                    replay()
                })
            }
        }    
    
        
        isGuessCorrect = []
    }

})



