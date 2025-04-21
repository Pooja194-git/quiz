const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Marketing Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Marked Language", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "font-style", correct: false },
            { text: "font-size", correct: true },
            { text: "text-size", correct: false },
            { text: "text-style", correct: false }
        ]
    },
    {
        question: "What is the correct place to insert a JavaScript file?",
        answers: [
            { text: "The <head> section", correct: false },
            { text: "The <body> section", correct: false },
            { text: "Both the <head> and <body> are correct", correct: true },
            { text: "The <footer> section", correct: false }
        ]
    },
     {
        question: "What does 'API' stand for?",
        answers: [
            { text: "Application Programming Interface", correct: true },
            { text: "Applied Program Interaction", correct: false },
            { text: "Application Process Integration", correct: false },
            { text: "Automated Programming Input", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex;
let score;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.style.display = 'block';
    document.getElementById('controls').style.display = 'flex'; // Show controls area
    nextButton.style.display = 'none'; // Hide next button initially
    resultsContainer.style.display = 'none';
    feedbackElement.textContent = ''; // Clear feedback
    totalQuestionsElement.textContent = questions.length;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Add data attribute for correct answer
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none'; // Hide next button until answer selected
    feedbackElement.textContent = ''; // Clear feedback
    feedbackElement.className = ''; // Clear feedback styling
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true"; // Check if the data attribute is 'true'

    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        // Optionally highlight the correct answer
        if (button.dataset.correct === "true") {
             setStatusClass(button, true);
        }
    });

    if (correct) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.className = 'correct'; // Add class for styling
        setStatusClass(selectedButton, true);
    } else {
        feedbackElement.textContent = "Wrong!";
        feedbackElement.className = 'wrong'; // Add class for styling
        setStatusClass(selectedButton, false);
    }

    // Show next button or results button
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.style.display = 'block'; // Show next button
    } else {
        // Last question - show results after a short delay or immediately
        showResults();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResults() {
     // Hide question and controls, show results
     questionContainer.style.display = 'none';
     document.getElementById('controls').style.display = 'none';
     resultsContainer.style.display = 'block';
     scoreElement.textContent = score;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', startQuiz);

// Start the quiz when the page loads
startQuiz();