const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const captionInput = document.getElementById("captionInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

async function fetchRandomMeme() {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();
  const memes = data.data.memes;
  const randomMeme = memes[Math.floor(Math.random() * memes.length)];
  return randomMeme.url;
}

async function generateMeme() {
  const memeUrl = await fetchRandomMeme();
  const img = new Image();
  img.crossOrigin = "anonymous"; // fix CORS issue
  img.src = memeUrl;

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Resize image to fit canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Add caption
    const caption = captionInput.value.toUpperCase();
    ctx.font = "bold 28px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.lineWidth = 3;

    // Place caption at bottom
    ctx.fillText(caption, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(caption, canvas.width / 2, canvas.height - 20);
  };
}

function downloadMeme() {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
}

generateBtn.addEventListener("click", generateMeme);
downloadBtn.addEventListener("click", downloadMeme);
