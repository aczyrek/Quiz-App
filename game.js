const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Who is the best basketball player?",
    choice1: "Lebron James",
    choice2: "Michael Jordan",
    choice3: "Kobe Bryant",
    choice4: "Kevin Durant",
    answer: 1,
    
  },
  {
    question: "What is the most popular food in Italy?",
    choice1: "Pizza",
    choice2: "Pasta",
    choice3: "Spaghetti",
    choice4: "Lasagna",
    answer: 2,
    
  },
  {
    question: "What is the biggest country in Europe?",
    choice1: "Germany",
    choice2: "Russia",
    choice3: "France",
    choice4: "Italy",
    answer: 2,
    
  },
];

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // Go to the end page
    return window.location.assign("/end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    getNewQuestion();
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
