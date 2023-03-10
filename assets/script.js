var listQuestions = [
    {
        question: "What makes the page interactive?",
        answerone: "html",
        answertwo: "CSS",
        answerthree: "Javascript",
        correctAnswer: "answer-two"
    },
    {
        question: "What makes a display message pop up when something bad happens?",
        answerone: "Prompt()",
        answertwo: "Alert()",
        answerthree: "Message()",
        correctAnswer: "answer-one"
    },
    {
        question: "what holds user information in the DevTools?",
        answerone: "Local storage",
        answertwo: "data attributes",
        answerthree: "DOM",
        correctAnswer: "answer-one"
    },
];

var containerEl = document.querySelectorAll('.container');
var startQuizEl = document.querySelector('#startQuiz');
var restartQuizEl = document.querySelector('#restartQuiz');
var answerButtonsEl = document.querySelector('.answerButtons');
var questionTextEl = document.querySelector('#questionText');
var answerOneEl = document.querySelector('#answer-one');
var answerTwoEl = document.querySelector('#answer-two');
var answerThreeEl = document.querySelector('#answer-three');
var scoreTextEl = document.querySelector('#scoreText');
var leaderboardListEl = document.querySelector('#leaderboard-list');
var finishedMessageEl = document.querySelector('#finishedMessage');
var scoreMessageEl = document.querySelector('#scoreMessage');
var introTextEl = document.querySelector('#introText');
var timerEl = document.querySelector('#timer');
var initialsInputEl = document.querySelector("#initials-input");
var initialsFormEl = document.querySelector("#initials-form");

var quizProgress = 0;
var selectedAnswer = '';
var scoreValue = 0;
var secondsLeft = 60;
var leaderboard = [];

function hideQuiz() {
    answerButtonsEl.style.display = 'none';
    timerEl.style.display = 'none';
    restartQuizEl.style.display = 'none';
}

function hideInitialsForm() {
    initialsFormEl.style.display = 'none';
    questionTextEl.textContent = '';
    scoreTextEl.textContent = '';
}

function renderInitialsForm() {
    initialsFormEl.style.display = 'block';
    questionTextEl.textContent = '';
    finishedMessageEl.textContent = 'All done!';
    scoreValue = secondsLeft;
    scoreTextEl.textContent = 'Final score is ' + scoreValue + '!';
}

function renderQuiz() {
    if(quizProgress < listQuestions.length && secondsLeft > 0) {
        startQuizEl.style.display = 'none';
        restartQuizEl.style.display = 'none';
        answerButtonsEl.style.display = 'block';
        timerEl.style.display = 'block';
        questionTextEl.textContent = listQuestions[quizProgress].question;
        answerOneEl.textContent = listQuestions[quizProgress].answerone;
        answerTwoEl.textContent = listQuestions[quizProgress].answertwo;
        answerThreeEl.textContent = listQuestions[quizProgress].answerthree;
    } else {
        hideQuiz();
        renderInitialsForm();
    }
}

function validateAnswer() {
    if(selectedAnswer == listQuestions[quizProgress].correctAnswer) {
} else {
    secondsLeft = secondsLeft - 10;
}
quizProgress++;
}

function timer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        if(secondsLeft > 0 && quizProgress < listQuestions.length) {
            timerEl.style.display = 'block';
            timerEl.textContent = 'Time Left: ' + secondsLeft;
        } else if(secondsLeft < 1) {
            hideQuiz();
            clearInterval(timerInterval);
            renderInitialsForm();
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function storeLeaderboardEntry() {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function retrieveLeaderboard() {
    var storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if(storedLeaderboard !== null) {
        leaderboard = storedLeaderboard;
        leaderboard.sort(function (a, b) {
            return b.score - a.score;
        });
    }
}

function renderLeaderboard() {
    leaderboardListEl.style.display = 'block';
    finishedMessageEl.textContent = 'Leaderboard';
    leaderboardListEl.innerHTML = '';
    for(var i = 0; i < leaderboard.length; i++) {
        var entry = leaderboard[i].initials + '-' + leaderboard[i].score;
        var li = document.createElement('li');
        li.textContent = entry;
        leaderboardListEl.appendChild(li);
    }
    restartQuizEl.style.display = 'block';
}

function init() {
    hideQuiz();
    hideInitialsForm();
    retrieveLeaderboard();
}

startQuizEl.addEventListener('click', function() {
    introTextEl.textContent = '';
    timerEl.textContent = 'Starting Quiz!';
    timer();
    renderQuiz();
});

answerButtonsEl.addEventListener('click', function(event) {
    var buttonClicked = event.target;
    if(buttonClicked.matches('button')) {
        selectedAnswer = buttonClicked.id;
        validateAnswer();
        renderQuiz();
    }
});

initialsFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var initialsText = initialsInputEl.value.trim();
    if(initialsText === '') {
        return;
    }
    var leaderboardEntry = { initials: initialsText, score: scoreValue };
    leaderboard.push(leaderboardEntry);
    storeLeaderboardEntry();
    retrieveLeaderboard();
    hideInitialsForm();
    renderLeaderboard();
});

restartQuizEl.addEventListener('click', function() {
    quizProgress = 0;
    secondsLeft = 60;
    leaderboardListEl.style.display = 'none';
    finishedMessageEl.textContent = '';
    timerEl.textContent = 'Starting Now!';
    timer();
    renderQuiz();
});

init();