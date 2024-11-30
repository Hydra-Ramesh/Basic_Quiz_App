const questions = [
    {
        question: 'Which element is used for styling HTML5 layout?',
        answers: [
            { text: 'CSS', correct: true },
            { text: 'JQuery', correct: false },
            { text: 'JavaScript', correct: false },
            { text: 'PHP', correct: false },
        ],
        explanation: 'CSS (Cascading Style Sheets) is used to style HTML layouts.'
    },
    {
        question: 'Among the following, which is the HTML paragraph tag?',
        answers: [
            { text: 'p', correct: true },
            { text: 'pre', correct: false },
            { text: 'hr', correct: false },
            { text: 'a', correct: false },
        ],
        explanation: 'The <p> tag is used to define a paragraph in HTML.'
    },
    {
        question: 'The full form of CSS is:',
        answers: [
            { text: 'Colored Special Sheets', correct: false },
            { text: 'Color Sheet Styles', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'None', correct: false },
        ],
        explanation: 'CSS stands for Cascading Style Sheets.'
    },
    {
        question: 'Which tag is used to create a numbered list in HTML?',
        answers: [
            { text: 'ul', correct: false },
            { text: 'ol', correct: true },
            { text: 'li', correct: false },
            { text: 'None of these', correct: false },
        ],
        explanation: 'The <ol> tag is used to create ordered (numbered) lists.'
    },
    {
        question: 'What is the default display property for a div element in CSS?',
        answers: [
            { text: 'block', correct: true },
            { text: 'inline-block', correct: false },
            { text: 'inline', correct: false },
            { text: 'flex', correct: false },
        ],
        explanation: 'The default display property for a <div> is block.'
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const explanationElement = document.getElementById('explanation');
const progressBar = document.getElementById('progress-bar');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    progressBar.style.width = '0%';
    nextButton.textContent = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) button.dataset.correct = true;
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function resetState() {
    nextButton.style.display = 'none';
    explanationElement.classList.add('hidden');
    explanationElement.textContent = '';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    explanationElement.textContent = questions[currentQuestionIndex].explanation;
    explanationElement.classList.remove('hidden');
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!!`;
    nextButton.textContent = 'Want to Play Again?';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
