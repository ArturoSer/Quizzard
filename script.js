var questions = [
    {
        question: "What makes the page interactive?",
        answersA: "html",
        answersB: "CSS",
        answersC: "Javascript"
    },
    {
        question: "What makes a display message pop up when something bad happens?",
        answersA: "Prompt()",
        answersB: "Alert()",
        answersC: "Message()"
    },
    {
        question: "what holds user information in the DevTools?",
        answersA: "Local storage",
        answersB: "data attributes",
        answersC: "DOM"
    }
]

var highScores = []
function random(array) {
    let userIndex = array.length, randomIndex;
    while (userIndex != 0) {
        randomIndex = Math.floor(Math.random() * userIndex);
        userIndex--;
        [array[userIndex], array[randomIndex]] = [array[randomIndex], array[userIndex]];
    }

    return array;
}

var randomArray = random(questions)

var questionEle = document.querySelector('.questionContainer')
var answersAEle = document.querySelector('.answers1')
var answersBEle = document.querySelector('.answers2')
var answersCEle = document.querySelector('.answers3')
var answersOptions = document.querySelector('.answersOptions')

var index = 0

questionEle.textContent = randomArray[0].question
answersAEle.textContent = randomArray[0].answersA
answersBEle.textContent = randomArray[0].answersB
answersCEle.textContent = randomArray[0].answersC

var score = 0

function button1(){
    if(answersAEle.textContent === questions[index].answers){
        score += 1
    } else {
    }
    addIndexNumber()
}

function button2(){
    if(answersBEle.textContent === questions[index].answers){
        score += 1
    } else {
    }
    addIndexNumber()
}

function button3(){
    if(answersCEle.textContent === questions[index].answers){
        score += 1
    } else {
    }
    addIndexNumber()
}

answersOptions.addEventListener('click', function(event) {
    var element =  event.target;
    if(element.matches('button')) {
        if(element.textContent === questions[index].answer){
            score += 1
        }
        console.log(score);
        console.log(element.textContent, questions[index].answer);
        index += 1
        displayQuestions();
    }
});

var scoreEle = document.querySelector('.score')

function showQuizFinalScreen(){
    document.getElementById('answersContainer').style.display = 'none';
    document.getElementById('userScore').style.display = 'flex';
    scoreEle.textContent = score
}

function displayQuestions() {
    if (index <= randomArray.length -1) {
        questionEle.textContent = randomArray[index].question
        answersAEle.textContent = randomArray[index].answersA
        answersBEle.textContent = randomArray[index].answersB
        answersCEle.textContent = randomArray[index].answersC
    } else {
        showQuizFinalScreen()
    }
}

var timerEl = document.querySelector('.timer');

var secondsLeft = 60;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + 'seconds remaining';

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
            showQuizFinalScreen();
        }
    }, 1000);
}

setTime();