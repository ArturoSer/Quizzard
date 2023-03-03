var questions = [
    {
        question: "What makes the page interactive?",
        answerA: "html",
        answerB: "CSS",
        answerC: "Javascript",
        answer: "CSS"
    },
    {
        question: "What makes a display message pop up when something bad happens?",
        answerA: "Prompt()",
        answerB: "Alert()",
        answerC: "Message()",
        answer: "Alert()"
    },
    {
        question: "what holds user information in the DevTools?",
        answerA: "Local storage",
        answerB: "data attributes",
        answerC: "DOM",
        answer: "local storage"
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
var answerAEle = document.querySelector('.answer1')
var answerBEle = document.querySelector('.answer2')
var answerCEle = document.querySelector('.answer3')
var answerOptions = document.querySelector('.answerOptions')

var index = 0

questionEle.textContent = randomArray[0].question
answerAEle.textContent = randomArray[0].answerA
answerBEle.textContent = randomArray[0].answerB
answerCEle.textContent = randomArray[0].answerC

var score = 0

function button1(){
    if(answerAEle.textContent === questions[index].answer){
        score += 1
    } else {
    }
    addIndexNumber()
}

function button2(){
    if(answerBEle.textContent === questions[index].answer){
        score += 1
    } else {
    }
    addIndexNumber()
}

function button3(){
    if(answerCEle.textContent === questions[index].answer){
        score += 1
    } else {
    }
    addIndexNumber()
}

answerOptions.addEventListener('click', function(event) {
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
    document.getElementById('answerContainer').style.display = 'none';
    document.getElementById('userScore').style.display = 'flex';
    scoreEle.textContent = score
}

function displayQuestions() {
    if (index <= randomArray.length -1) {
        questionEle.textContent = randomArray[index].question
        answerAEle.textContent = randomArray[index].answerA
        answerBEle.textContent = randomArray[index].answerB
        answerCEle.textContent = randomArray[index].answerC
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