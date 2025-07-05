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
    document.getElementById("question").textContent = "Quiz completed!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("score").textContent = `Your score: ${score}/${questions.length}`;
    document.getElementById("next").style.display = "none";
  }
});

showQuestion();
