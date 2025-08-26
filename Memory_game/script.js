const gameContainer = document.getElementById("game");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart");

const emojis = ["🍎","🍌","🍓","🍍","🥝","🍉","🍑","🍒"];
let cards = [...emojis, ...emojis]; // pairs

let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matched = 0;
let time = 0, timer;