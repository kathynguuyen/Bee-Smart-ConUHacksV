const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
    
  })

}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Play Again'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
}

const questions = [
  {
    
    question: 'True or False: mixing red and blue gives purple',
    answers: [
      { text: 'true', correct: true },
      { text: 'false', correct: false }
    ]
  },
  {
    question: 'What are the primary colors?',
    answers: [
      { text: 'Green, yellow and red', correct: false },
      { text: 'Purple, pink and blue', correct: false },
      { text: 'Red, blue and green', correct: false },
      { text: 'Red, blue and yellow', correct: true }
    ]
  },
  {
    question: 'Which animal has the longest neck?',
    answers: [
      { text: 'Alpaca', correct: false },
      { text: 'Flamingo', correct: false },
      { text: 'Giraffe', correct: true },
      { text: 'Ostrich', correct: false }
    ]
  },
  {
    question: 'Which animal has black and white stripes?',
    answers: [
        { text: 'Zebra', correct: true },
        { text: 'Cow', correct: false },
        { text: 'Panda', correct: false },
        { text: 'Raccoon', correct: false }
    ]
  },
  {
    question: 'Which animal is the stinkiest?',
    answers: [
        { text: 'Pig', correct: false },
        { text: 'Cows', correct: false },
        { text: 'Skunk', correct: true },
        { text: 'Bear', correct: false }
    ]
  }
]


