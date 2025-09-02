const songs = [
  { title: "Song 1", file: "songs/song1.mp3" },
  { title: "Song 2", file: "songs/song2.mp3" },
  { title: "Song 3", file: "songs/song3.mp3" }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("song-title");

document.getElementById("play").addEventListener("click", () => {
  audio.play();
});

document.getElementById("pause").addEventListener("click", () => {
  audio.pause();
});

document.getElementById("prev").addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong();
  audio.play();
});

document.getElementById("next").addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong();
  audio.play();
});

function loadSong() {
  audio.src = songs[currentSong].file;
  title.textContent = "🎵 Now Playing: " + songs[currentSong].title;
}

// Load first song at start
loadSong();
