const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "¿Cuanto es 2+2?",
        choice1: '4',
        choice2: '5',
        choice3: '21',
        choice4: '17',
        answer: 1,
    },
    {
        question:
        "¿Cuanto es 2+3?",
        choice1: "5",
        choice2: "x",
        choice3: "6",
        choice4: "67",
        answer: 1,
    },
    {
        question: "¿Cuanto es 2+4?",
        choice1: "6",
        choice2: "18",
        choice3: "7",
        choice4: "3",
        answer: 1,
    },
    {
        question: "Lorem Ipsum is simply dummy text of the printing and since the 1500s",
        choice1: "Respuesta a",
        choice2: "Respuesta b",
        choice3: "Respuesta c",
        choice4: "Respuesta d",
        answer: 1,
    },
    {
        question: "¿Cuanto es 3+3?",
        choice1: "9",
        choice2: "18",
        choice3: "7",
        choice4: "3",
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        const div =  document.getElementById('divi')
            div.classList.remove('container3')
            div.innerHTML=""
            document.getElementById('ending').style.display = 'flex'
        document.getElementById('finalScore').innerHTML = score 
    }

    questionCounter++
    progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

 