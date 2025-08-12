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