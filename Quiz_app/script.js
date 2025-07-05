const questions = [
  {
    question: "What is the capital of India?",
    answers: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    correct: 0
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "Who is the CEO of Tesla?",
    answers: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Sundar Pichai"],
    correct: 1
  },
  {
    question: "HTML stands for?",
    answers: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperloop Machine Language", "Home Tool Markup Language"],
    correct: 0
  },
  {
    question: "Which tag is used to style in CSS?",
    answers: ["<css>", "<style>", "<design>", "<script>"],
    correct: 1
  },
  {
    question: "Largest planet in the Solar System?",
    answers: ["Earth", "Venus", "Jupiter", "Mars"],
    correct: 2
  },
  {
    question: "Which is a JavaScript framework?",
    answers: ["Laravel", "Django", "React", "Flask"],
    correct: 2
  },
  {
    question: "Who founded Microsoft?",
    answers: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Sundar Pichai"],
    correct: 1
  },
  {
    question: "What is 5 + 7?",
    answers: ["10", "11", "12", "13"],
    correct: 2
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: ["China", "Korea", "Japan", "Thailand"],
    correct: 2
  }
];

let current = 0;
let score = 0;

function showQuestion() {
  document.getElementById("question").textContent = questions[current].question;
  
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  
  questions[current].answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[current].correct) {
    score++;
  }
  document.getElementById("next").style.display = "block";
}

document.getElementById("next").addEventListener("click", () => {
  current++;
  if (current < questions.length) {
    showQuestion();
    document.getElementById("next").style.display = "none";
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("question").textContent = "Quiz completed!";
  document.getElementById("answers").innerHTML = "";
  document.getElementById("score").textContent = `Your score: ${score}/${questions.length}`;
  document.getElementById("next").style.display = "none";

  // Show restart button
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.style.marginTop = "10px";
  restartBtn.onclick = restartQuiz;
  document.getElementById("answers").appendChild(restartBtn);
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.getElementById("score").textContent = "";
  document.getElementById("next").style.display = "none";
  showQuestion();
}

showQuestion();
