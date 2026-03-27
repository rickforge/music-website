/* ======================================================
                     HAMBURGER MENU
   ====================================================== */
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".menu-overlay");

hamburger.addEventListener("click", () => {
  if (window.innerWidth < 1025) {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  if (hamburger.textContent === "☰") {
    hamburger.textContent = "✕";
  } else {
    hamburger.textContent = "☰";
  }
});

// Resets classes when resizing to desktop width (1024px)
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1025) {
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.textContent = "☰";
  }
});

/* ======================================================
                       MUSIC PLAYER 
   ====================================================== */
const audio = document.getElementById("audio");
const cover = document.querySelector(".cover");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const muteBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// Playlist
const playlist = [
  {
    title: "Sahara rhytm",
    artist: "Rickard Engström",
    cover: "/images/desert.jpg",
    src: "/music/sahara-rhytm.mp3",
  },
  {
    title: "The Crow is near",
    artist: "Rickard Engström",
    cover: "/images/crow.jpg",
    src: "/music/crow-is-near.mp3",
  },
];

let currentIndex = 0;

// Load track
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  cover.src = track.cover;
  title.textContent = track.title;
  artist.textContent = track.artist;
  audio.load();

  // Reset play button to "play" icon
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  updateVolumeIcon();
}

// Initial track
loadTrack(currentIndex);

// Play/Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

// Prev/Next
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

// Volume / Mute
function updateVolumeIcon() {
  if (audio.muted || audio.volume === 0) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else if (audio.volume < 0.5) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
}

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  updateVolumeIcon();
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  audio.muted = audio.volume === 0;
  updateVolumeIcon();
});

// Progressbar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Uppdatera bar när låten spelas
audio.addEventListener("timeupdate", () => {
  const value = (audio.currentTime / audio.duration) * 100;
  progress.value = value;
  updateProgressBackground(value);
});

// Uppdatera när användaren drar
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
  updateProgressBackground(progress.value);
});

// Funktion för att fylla baren med färg
function updateProgressBackground(value) {
  progress.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${value}%, #444 ${value}%, #444 100%)`;
}