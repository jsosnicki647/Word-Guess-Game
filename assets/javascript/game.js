// var solutions = ["EUGENE KRABS","SANDY CHEEKS","PATRICK STAR","LARRY THE LOBSTER","SQUIDWARD TENTACLES","SQUILLIAM FANCYSON","SPONGEBOB SQUAREPANTS","THE FLYING DUTCHMAN","KING NEPTUNE"]

var answerPlaceholder = []
var numUnsolved 
var guessesRemaining = 5
var isGuessCorrect= []
var incorrectKeyStrokes = []
var correctKeyStrokes = []
var isContinue
var currentSolution


var solutions = [
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
]

// selects word for the game //
function pickWord(){
    document.getElementById("answer").innerHTML =  ""
    currentSolution = solutions[Math.floor(Math.random()*solutions.length)].name
    numUnsolved = currentSolution.length - (currentSolution.split(" ").length - 1)
   
    console.log(numUnsolved)
    console.log(currentSolution.length)
    console.log(currentSolution)

    
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
    answerPlaceholder = []
    document.getElementById("ans-img").src = solutions[findWithAttr(solutions, "name", currentSolution)].pic
    document.getElementById("answer").innerText = "Answer: " + currentSolution
    document.getElementById("hint").innerText = ""
    setTimeout(function(){
        isContinue = confirm("Play again?")
        // checks if user has chosen to continue //
        if(isContinue){
            guessesRemaining = 5
            document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining
            document.getElementById("answer").innerText = ""
            document.getElementById("ans-img").src = ""
            document.getElementById("key-strokes").innerHTML = ""
            incorrectKeyStrokes = []
            correctKeyStrokes = []
            
            $(document).ready(function(){pickWord()})
        }
        else{
            alert("bye );")
            window.close()
        }
    }, 1000)
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

$(document).keypress(function(e){
    var selectedKey = String.fromCharCode(e.which).toUpperCase()
    console.log(selectedKey)
    if(incorrectKeyStrokes.indexOf(selectedKey) == -1 && correctKeyStrokes.indexOf(selectedKey) == -1 && selectedKey != " "){    
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
                
                alert("You lost. :(")
                replay()
            }
            // checks if there is one guess remaining and provides hint //
            if(guessesRemaining == 1){
                document.getElementById("hint").innerHTML = "hint: " + solutions[findWithAttr(solutions, "name", currentSolution)].hint
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



