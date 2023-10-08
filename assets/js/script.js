// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
var timer = document.querySelector("#timer")
var startButton = document.querySelector("#start")
var startBtnContainer = document.querySelector("#buttonContainer")
var buttonBody = document.querySelector("#answerButtons")
var questionEl = document.querySelector("#question")
var highscores = document.querySelector("#highscores")
var userInput = document.querySelector("#input")
var userSubmitButton = document.querySelector("#submit")
var quizTaken = false
var seconds = 60
var currentQuestionIndex = 0
var timerInterval;
var answeredCorrectly = 0
var questions = [
    
    {
        question: "What does HTML stand for?",
        choices: [ 
            "Hippos Tigers Monkeys and Lemurs",
            "Hyperspeed Textile Marking Lateral",
            "Heavy Tactile Medical Lining",
            "Hyper Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    }, 
    {
        question: "What is the first thing you should do when debugging something?",
        choices: [
            "Freak out and start screaming",
            "Open the devtools", 
            "Open a Javascript file",
            "Use a debugging extension"
        ],
        answer: "Open the devtools"
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: [
            "var",
            "let", 
            "const",
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: [
            "getElementbyId()",
            "getElementbyHTML()", 
            "getElementbyClass()",
            "None of the above"
        ],
        answer: "getElementbyId()"
    },
    {
        question: "Which one of these would you want to use when debugging your code?",
        choices: [
            "window.alert()",
            "devtool.debug()", 
            "console.log()",
            "document.write()"
        ],
        answer: "console.log()"
    },
    {
        question: "Which one of these is the strict equality operator?",
        choices: [
            "=",
            "==",
            "===",
            "None of the above"
        ],
        answer: "==="
    },
    {
        question: "How do you select a class element in CSS?",
        choices: [
            "With the # selector",
            "With the % selector",
            "With the . selector",
            "With the element class selector"
        ],
        answer: "With the # selector"
    },
    {
        question: "Which one of these is the modulus operator?",
        choices: [
            "*",
            "@",
            "/",
            "%"
        ],
        answer: "%"
    },
    {
        question: "Which one of these is a proper way to write a function?",
        choices: [
            ":function{}-html",
            "function functionName{}[]",
            "find-function-name(//https)",
            "function functionName(){}"
        ],
        answer: "function functionName(){}"
    },
    {
        question: "How many elements can you have in you HTML?",
        choices: [
            "3",
            "1025",
            "As many as you want",
            "None of the above"
        ],
        answer: "As many as you want"
    }
    
]

highscores.addEventListener("click", displayHighscores)
startButton.addEventListener("click", start)

function start() {
    startButton.style.display ="none"
    highscores.style.pointerEvents = "none"
    buttonBody.style.display = "block"
    currentQuestionIndex = 0
    seconds = 60
    startTimer()
    displayQuestions(currentQuestionIndex)
}

function startTimer() {
    clearInterval(timerInterval)
    timerInterval = setInterval(function() {
        seconds--
        timer.textContent = seconds 
        if (seconds <= 0) {
            clearInterval(timerInterval)
            endQuiz()
        }
    },1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}

function displayQuestions(index) {
    questionEl.innerHTML = questions[index].question
    buttonBody.innerHTML = ""
    console.log(index)
    for (i = 0; i < questions[index].choices.length; i++) {
        var button = document.createElement("button")
        button.innerHTML = questions[index].choices[i]
        buttonBody.appendChild(button)
    }
}

document.querySelector("#answerButtons").addEventListener("click", function(event) {
    if (event.target.innerHTML === questions[currentQuestionIndex].answer) {
        console.log("correct")
        answeredCorrectly ++
    }
    else {
        console.log("incorrect")
        if(seconds > 10) {
            seconds -= 10
        }
    }
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        displayQuestions(currentQuestionIndex)
    }
    else {
        endQuiz()
    }
})

function endQuiz() {
    console.log("quiz ended")
    quizTaken = true
    buttonBody.style.display = "none"
    var score = document.createElement("p")
    stopTimer()
    if (seconds == 0) {
        questionEl.innerHTML = "You Ran out of time!"
    }
    else {
        questionEl.innerHTML =  "You completed the quiz with " + seconds + " seconds left"
    }
    score.innerHTML = "You answered " + answeredCorrectly + " out of " + questions.length + " correct"
    questionEl.appendChild(score)
    var userInputField = document.createElement("input")
    userInputField.type = "text"
    userInputField.placeholder = "Please enter your initials"
    userInput.appendChild(userInputField)
    var submitBtn = document.createElement("button")
    submitBtn.innerHTML = "Submit"
    userSubmitButton.appendChild(submitBtn)
    submitBtn.addEventListener("click", function() {
        var initials = userInputField.value
        if (!initials) {
            return
        }
        highscores.style.pointerEvents= "auto"
        var highScoresList = JSON.parse(localStorage.getItem("highscores")) || []
        highScoresList.push({
            initials: initials,
            score: seconds,
            correctAnswers: answeredCorrectly
        })
        localStorage.setItem("highscores", JSON.stringify(highScoresList))
        displayHighscores()
        userInputField.style.display= "none"
        submitBtn.style.display = "none"
    })
}

function displayHighscores() {
    var savedScores = JSON.parse(localStorage.getItem("highscores")) || []
    questionEl.innerHTML = "Highscores:"
    var scoreList = document.createElement("ul")
    for (var i = 0; i < savedScores.length; i++) {
        var listItem = document.createElement("li")
        listItem.textContent = savedScores[i].initials + " | Time left: " + savedScores[i].score + " seconds" +" | Answered Correctly: " + savedScores[i].correctAnswers + " of " + questions.length
        scoreList.appendChild(listItem)
        questionEl.appendChild(scoreList)
    }
    if (quizTaken) {
        startButton.innerHTML = "Retake Quiz?"
        startButton.style.display = "block"
        startButton.addEventListener("click", function() {
            currentQuestionIndex = 0
            start()
        })
    }
}
