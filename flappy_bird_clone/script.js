const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

// Bird
let birdX = 50;
let birdY = 150;
let birdSize = 20;
let gravity = 1.5;
let lift = -20;
let velocity = 0;

// Pipes
let pipes = [];
let pipeWidth = 50;
let pipeGap = 120;
let pipeSpeed = 2;

// Score
let score = 0;
let gameOver = false;

document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        velocity = lift;
    }
});

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(birdX, birdY, birdSize, 0, Math.PI * 2);
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = "green";
    for (let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.fillRect(p.x, p.top + pipeGap, pipeWidth, canvas.height - p.top - pipeGap);
    }
}

function updatePipes() {
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        let top = Math.random() * (canvas.height - pipeGap - 50) + 20;
        pipes.push({ x: canvas.width, top: top });
    }
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeSpeed;
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }
}

function checkCollision() {
    if (birdY + birdSize > canvas.height || birdY - birdSize < 0) {
        gameOver = true;
    }
    for (let p of pipes) {
        if (
            birdX + birdSize > p.x &&
            birdX - birdSize < p.x + pipeWidth &&
            (birdY - birdSize < p.top || birdY + birdSize > p.top + pipeGap)
        ) {
            gameOver = true;
        }
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}
