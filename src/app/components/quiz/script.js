const questions = [
  {
    question: "Quel est le noyau du système Linux ?",
    answers: ["Linux", "Windows", "MacOS", "Android"],
    correct: "Linux"
  },
  {
    question: "Quel est le créateur de Linux ?",
    answers: ["Linus Torvalds", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
    correct: "Linus Torvalds"
  },
  {
    question: "Quel est le gestionnaire de paquets de Debian ?",
    answers: ["apt", "yum", "pacman", "brew"],
    correct: "apt"
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').textContent = question.question;
  const answersContainer = document.getElementById('answers-container');
  answersContainer.innerHTML = '';
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.onclick = () => checkAnswer(answer);
    answersContainer.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correct;
  if (selectedAnswer === correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById('quiz-container').style.display = 'none';
  const scoreContainer = document.getElementById('score-container');
  scoreContainer.style.display = 'block';
  document.getElementById('score').textContent = `${score} / ${questions.length}`;
}

document.getElementById('next-button').onclick = loadQuestion;
document.getElementById('restart-button').onclick = () => {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('score-container').style.display = 'none';
  loadQuestion();
};

loadQuestion();
