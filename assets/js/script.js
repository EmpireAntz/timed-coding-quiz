//Global Variables
//Selects the timer element from the DOM which corresponds to a starting number of 120
var timer = document.querySelector("#timer")
//Selects the start button in the DOM
var startButton = document.querySelector("#start")
//Selects the area where the answer buttons will be displayed
var buttonBody = document.querySelector("#answerButtons")
//Selects the area where the question elements will be displayed
var questionEl = document.querySelector("#question")
//Selects the link for highscores 
var highscores = document.querySelector("#highscores")
//Starting value for the quiz being taken
var quizTaken = false
//Starting value for the timer in seconds
var seconds = 120
//The current value indicates what question we are on
var currentQuestionIndex = 0
//Empty variable to use later for stopping the timer
var timerInterval;
//Number of questions that have been answered correct
var answeredCorrectly = 0
//Array of questions containing the questions, the choices, and the answer
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
        answer: "With the . selector"
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
//Event listener added on the highscore link. When clicked it will call the displayHighscores function
highscores.addEventListener("click", displayHighscores)
//event listenter added on the start button that when clicked will call the start function
startButton.addEventListener("click", start)
//The start function is called when the start button is clicked. 
function start() {
    //Changes the start button to not be displayed while the test is being taken
    startButton.style.display ="none"
    //Changes the highscore link to no be clickable while the test is being taken
    highscores.style.pointerEvents = "none"
    //Changes the answer buttons back to display block because we hide the display when the quiz is over
    buttonBody.style.display = "block"
    //Makes sure the current question index always starts at 0 whenever the quiz is started
    currentQuestionIndex = 0
    //Makes sure the questions answered correctly always starts at 0 whenever the quiz has started
    answeredCorrectly = 0
    //Makes sure the time always starts at 120 when the quiz has started
    seconds = 120
    //Calls the startTImer function 
    startTimer()
    //Calls the displayQuestions function which has an argument of the currentQuestionIndex which will change whenever we answer a question
    displayQuestions(currentQuestionIndex)
}
//Function that starts the timer
function startTimer() {
    //Makes sure the timer is reset before the time is started again
    clearInterval(timerInterval)
    //Timer start
    timerInterval = setInterval(function() {
        //Seconds will subtact by 1 every second
        seconds--
        //The text of the timer element will be updated with the value in seconds
        timer.textContent = seconds 
        //if the time reaces 0 the timer will stop and the quiz will end
        if (seconds <= 0) {
            clearInterval(timerInterval)
            //The end quiz function is then called
            endQuiz()
        }
    },1000)
}
//Function to stop the timer when the quiz has ended
function stopTimer() {
    clearInterval(timerInterval)
}
//Function that displays the questions and answers on the page
function displayQuestions(index) {
    //Creates a variable for the question array inex
    var currentQuestion = questions[index]
    //Changes the text to be whatever the current question is from the questions array
    questionEl.textContent = currentQuestion.question
    //Makes sure the buttons text context clears each time to prevent multiple texts displaying in the buttons
    buttonBody.textContent = ""
    //Logs in the console the current question index number
    console.log(index)
    //Loops over the questions array 
    for (i = 0; i < currentQuestion.choices.length; i++) {
        //Creats a button for each choice in the current array and appends it to the answerbuttons element
        var button = document.createElement("button")
        button.textContent = currentQuestion.choices[i]
        buttonBody.appendChild(button)
    }
}
//Adds an event listener to the answer buttons container and calls the answerButtonHandler function when clicked
buttonBody.addEventListener("click", answerButtonHandler)
//Function that handles the question and answer logic
function answerButtonHandler (event) {
    //If the area clicked is not a button nothing will happen
    if (event.target.tagName !== "BUTTON") {
        console.log("not a button")
        return 
    }
    //The right answer is determined if the button clicked is the same text as the answer string in the questions array 
    if (event.target.textContent === questions[currentQuestionIndex].answer) {
        console.log("correct")
        //Score increases by 1
        answeredCorrectly ++
    }
    //Handles what happends when the answer clicked is incorrect
    else {
        console.log("incorrect")
        //Subtracts 10 seconds when you answer incorrectly unless there are 10 or less seconds left
        if(seconds > 10) {
            seconds -= 10
        }
    }
    //Once the answer is clicked the question index is increased by 1
    currentQuestionIndex++
    //Displays the next question in the array
    if (currentQuestionIndex < questions.length) {
        displayQuestions(currentQuestionIndex)
    }
    //If there are no more questions left in the array then the quiz is ended
    else {
        endQuiz()
    }
}
//End quiz function that handles all the logic at then end of the quiz
function endQuiz() {
    //Lets you know in the console that the quiz has ended
    console.log("quiz ended")
    //Quiz taken will be set to true unless the webpage is refreshed
    quizTaken = true
    //Sets the answer buttons display to be hidden
    buttonBody.style.display = "none"
    //Calls the stopTimer function which stops the timer
    stopTimer()
    //Variables for user input as and a score display
    var score = document.createElement("p")
    var userInput = document.querySelector("#input")
    var userSubmitButton = document.querySelector("#submit")
    //Handles when the timer reaches 0 the quiz will end and let you know you ran out of time
    if (seconds == 0) {
        questionEl.textContent = "You Ran out of time!"
    }
    //Otherwixe the text will tell you youve completed the quiz with the amount of seconds you had left
    else {
        questionEl.textContent =  "You completed the quiz with " + seconds + " seconds left"
    }
    //Makes the text show the number of questions answered correctly
    score.textContent = "You answered " + answeredCorrectly + " out of " + questions.length + " correct"
    questionEl.appendChild(score)
    //Creates an input field with a type of text and a placeholder
    var userInputField = document.createElement("input")
    userInputField.type = "text"
    userInputField.placeholder = "Please enter your initials"
    userInput.appendChild(userInputField)
    //Creates a button to submit the user input
    var submitBtn = document.createElement("button")
    submitBtn.textContent = "Submit"
    userSubmitButton.appendChild(submitBtn)
    //Event listener added to the submit button so that when clicked it will save score and initials
    submitBtn.addEventListener("click", function() {
        //Makes the userinput uppercase when entered
        var initials = userInputField.value.toUpperCase()
        //If nothing is entered in the input field then nothing will happen
        if (!initials) {
            return
        }
        //Changes the highscores button to be clickable again since the quiz is over
        highscores.style.pointerEvents= "auto"
        //Gets the highscores from local storage
        var highScoresList = JSON.parse(localStorage.getItem("highscores")) || []
        //Pushes the values of initials, seconds, and answeredCorrectly into the highScoresList array
        highScoresList.push({
            initials: initials,
            score: seconds,
            correctAnswers: answeredCorrectly
        })
        //Puts the highscores into Local storage
        localStorage.setItem("highscores", JSON.stringify(highScoresList))
        //DisplayHighscores function is then called
        displayHighscores()
        //Changes the input and submit button to display none after it is submitted
        userInputField.style.display= "none"
        submitBtn.style.display = "none"
    })
}
//Function that is used to display the highscores
function displayHighscores() {
    //Gets the highscores from local storage
    var savedScores = JSON.parse(localStorage.getItem("highscores")) || []
    //Displays the high scores and the information associated with them 
    questionEl.textContent = "Highscores:"
    //Creates a container for the list elements we are creating beneath
    var scoreList = document.createElement("ul")
    //Iterates over the saved scores and provides a list element for each one
    for (var i = 0; i < savedScores.length; i++) {
        var listItem = document.createElement("li")
        //Listed score which will show Initials then the time left in secons and then the amount answered correctly
        listItem.textContent = savedScores[i].initials + " | Time left: " + savedScores[i].score + " seconds" +" | Answered Correctly: " + savedScores[i].correctAnswers + " of " + questions.length
        scoreList.appendChild(listItem)
        questionEl.appendChild(scoreList)
    }
    //Logic that handles whether the quiz was taken or not
    if (quizTaken) {
        //Changes the start quiz button to say retake quiz
        startButton.textContent = "Retake Quiz?"
        //changes the startbutton from display none to display block 
        startButton.style.display = "block"
        //Removes original event listner from the start button to prevent multiple event listeners building up on one element
        startButton.removeEventListener("click", start)
        //Added new event listener to restart the quiz when the button is clicked
        startButton.addEventListener("click", function() {
            start()
        })
    }
}
