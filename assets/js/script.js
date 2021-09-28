// input variables 
var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;
var alert = document.getElementById("alert");
var info = document.getElementById("info");
var scoresBtn = document.querySelector("#highscore");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));
// created questions variable for the quiz
var questions = [
    {
        title: "Commonly used data type Do Not include:_____",
        choices: ["1. Strings", "2. Booleance", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within:_____",
        choices: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
        answer: "4. Parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store:_____",
        choices: ["1. Numbers and strings", "2. Others Arrays", "3. Booleances", "4. All of the above"],
        answer: "4. All of the above"
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables ",
        choices: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parentheses"],
        answer: "4. Quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:_____",
        choices: ["1. JavaScript", "2. Terminal/Bash", "3. Alerts", "4. Console.log"],
        answer: "4. Console.log"
    },
]
// start the quiz set
btnStart.addEventListener("click", starQuiz);
function starQuiz() {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions = questions[currentindex]
    console.log(nextQuestions.title)
    displayQuestion(nextQuestions)
    gametime()
}
scoresBtn.addEventListener("click", function () {
    location.href = "score.html";
});
btnScore.addEventListener("click", function () {
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});
// time set
function gametime() {

    var timeinterval = setInterval(function () {
        timer.innerText = count
        count--;
    }, 1000);
}
// score page
function scorePage(a, b) {
    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}
// function input to questions and answers 
function displayQuestion(question) {
    titleitem.innerText = question.title
    question.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-primary btn-block text-left"
        button.innerText = element
        // questionanswers.innerHTML=""
        questionanswers.appendChild(button)
        button.addEventListener("click", displaynextQuestion)
    });
}
function displaynextQuestion(e) {
    currentindex++
    if (currentindex < questions.length) {
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML = ""
        if (currentindex < questions.length) {
            nextQuestions = questions[currentindex]
            displayQuestion(nextQuestions)
        } else {
            currentindex = 0
            displayQuestion(nextQuestions)
        }
    } else {
        console.log("endgame")
        endgame()
    }
}
// function to count tine and alert for the picked answers
function correction(response) {
    if (response) {
        alert.innerText = "Good"
        console.log("Good")
    } else {
        alert.innerText = "Wrong"
        count = count - 15
        timer.innerHTML = count
        console.log("Wrong")

    }
    setTimeout(function () {
        alert.innerText = ""

    }, 1000);
}
// end game page
function endgame() {
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")
}
