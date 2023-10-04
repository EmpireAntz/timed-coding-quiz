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
var seconds = 60;
function startQuiz() {
    var timerInterval = setInterval(function() {
        seconds--
        timer.textContent = seconds 
        if (seconds === 0) {
            clearInterval(timerInterval)
        }
    },1000)
    startButton.disabled = true 
    quizContent()
}

startButton.addEventListener("click", startQuiz)

function quizContent() {
    var button1 = document.createElement("button")
    var button2 = document.createElement("button")
    var button3 = document.createElement("button")
    var button4 = document.createElement("button")
    var buttonBody = document.querySelector("#answerButtons")
    var question = document.querySelector("#question")

    question.innerHTML ="What does HTML stand for?"
    button1.innerHTML = "Hippos Tigers Monkeys and Lemurs"
    button2.innerHTML = "Hyperspeed Textile Marking Lateral"
    button3.innerHTML = "Heavy Tactile Molding Lining"
    button4.innerHTML = "Hyper Text Markup Language"

    button1.dataset.answer = false
    button2.dataset.answer = false
    button3.dataset.answer = false
    button4.dataset.answer = true
    
    buttonBody.appendChild(button1)
    buttonBody.appendChild(button2)
    buttonBody.appendChild(button3)
    buttonBody.appendChild(button4)

    buttonBody.addEventListener("click", function(event) {
        console.log(event)
        var buttonClicked = event.target
        console.log(event.target)
    
    })
}



