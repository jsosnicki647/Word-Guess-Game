var solutions = ["EUGENE KRABS","SANDY CHEEKS","PATRICK STAR","LARRY THE LOBSTER","SQUIDWARD TENTACLES","SQUILLIAM FANCYSON","SPONGEBOB SQUAREPANTS","THE FLYING DUTCHMAN","KING NEPTUNE"]
var currentSolution = []
var answerPlaceholder = []
var numUnsolved = currentSolution.length
var guessesRemaining = 5
var correctGuess = []
var isContinue
var lastChance = ["He created the Krabby Patty.","She is a karate master.","He is Spongebob's best friend.","He is Bikini Bottom's lifeguard","He loves to play clarinet","He is Squidward's high-class cousin", "He lives in a pineapple under the sea.","He is the captian of a ghostly pirate ship.","He is the king of the sea."]

function pickWord(){
    currentSolution = solutions[Math.floor(Math.random()*solutions.length)]
    
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

$(document).on("keyup", function(e){
    
    for(var i = 0; i < currentSolution.length; i++){
        
        if(String.fromCharCode(e.which).toUpperCase() == currentSolution[i]){
            answerPlaceholder[i] = String.fromCharCode(e.which)
            numUnsolved--
            correctGuess.push(true)
        }
        else{
            correctGuess.push(false)
        }
    }

    document.getElementById("answer").innerHTML = answerPlaceholder.join("")

    if(correctGuess.indexOf(true) == -1){
        guessesRemaining--
        document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining
        
        if(guessesRemaining == 0){
            document.getElementById("ans-img").src = "assets/images/spongebob.png"
            setTimeout(function(){
                isContinue = confirm("Play again?")

                if(isContinue){
                    guessesRemaining = 5
                    document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining
                    document.getElementById("hint").innerHTML = ""
                    document.getElementById("ans-img").src = ""
                    pickWord()
                }
                else{
                    alert("bye );")
                    window.close()
                }
            }, 100)
        }

        if(guessesRemaining == 1){
            document.getElementById("hint").innerHTML = "hint: " + lastChance[solutions.indexOf(currentSolution)]
        }
    }

    

    function delayAlert(){alert("yo")}
    correctGuess = []
})



