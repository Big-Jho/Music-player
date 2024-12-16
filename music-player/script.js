const audio = document.querySelector("audio");
const play = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const musicContainer = document.getElementById("music-container");
const musicTitle = musicContainer.querySelector("#title");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const imageCover = document.getElementById("cover");
const musicInfo = document.getElementById("music-info");

const songs = ["hey", "summer", "ukulele"];

let songIndex;

function loadSong() {
  songIndex = songIndex === undefined || songIndex === null ? 0 : songIndex;

  const song = songs[songIndex];
  audio.src = `./music/${song}.mp3`;
  imageCover.src = `./images/${song}.jpg`;
  musicTitle.textContent = `${
    song.slice(0, 1).toLocaleUpperCase() + song.slice(1)
  }`;
  requestAnimationFrame(displayProgress);
}

function displayProgress() {
  const progressPercentage = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercentage}%`;

  if (progressPercentage === 100) {
    nextSong();
  }

  requestAnimationFrame(displayProgress);
}

function displayPlayMode(e) {
  const target = e.target;
  if (target.classList.contains("fa-play")) {
    if (audio.src === null || audio.src === undefined) {
      loadSong();
      audio.play();
    } else {
      audio.play();
    }

    musicContainer.classList.add("play");
    target.classList.remove("fa-play");
    target.classList.add("fa-pause");
  } else if (target.classList.contains("fa-pause")) {
    audio.pause();
    musicContainer.classList.remove("play");
    target.classList.add("fa-play");
    target.classList.remove("fa-pause");
  }
}

function restartSong() {
  audio.currentTime = 0;
  // audio.pause();
}

function nextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }
  loadSong();
  audio.play();
}

function prevSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  loadSong();
  audio.play();
}

function seek(e) {
  const newProgress = (e.offsetX / 216.25) * 100;
  progress.style.width = `${newProgress}%`;
  audio.currentTime = (newProgress / 100) * audio.duration;
}

function initializePlayer() {
  document.addEventListener("DOMContentLoaded", loadSong);
  play.addEventListener("click", displayPlayMode);
  prev.addEventListener("dblclick", restartSong);
  prev.addEventListener("click", prevSong);
  next.addEventListener("click", nextSong);
  progressContainer.addEventListener("click", seek);
}

initializePlayer();
