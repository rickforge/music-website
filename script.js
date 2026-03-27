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
const volumeFill = document.getElementById("volume-fill");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");

// Playlist
const playlist = [
  {
    title: "Sahara Rhytm",
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
let rafId; // requestAnimationFrame ID

// -------------------------
// Format time (mm:ss)
// -------------------------
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" + secs : secs);
}

// -------------------------
// Load track
// -------------------------
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  cover.src = track.cover;
  title.textContent = track.title;
  artist.textContent = track.artist;
  audio.load();

  // Reset play button
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

  // Reset progress bar
  progress.value = 0;
  progressFill.style.width = "0%";
}

// -------------------------
// Play / Pause
// -------------------------
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    requestAnimationFrame(updateProgress);
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    cancelAnimationFrame(rafId);
  }
});

// -------------------------
// Previous / Next track
// -------------------------
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  requestAnimationFrame(updateProgress);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  requestAnimationFrame(updateProgress);
});

// -------------------------
// Volume / Mute
// -------------------------
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
  audio.volume = parseFloat(volumeSlider.value);
  audio.muted = audio.volume === 0;
  updateVolumeIcon();
});

function updateVolumeFill() {
  volumeFill.style.width = volumeSlider.value * 100 + "%";
}

// Init
updateVolumeFill();

// Event
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  updateVolumeFill();
});

// -------------------------
// Progress bar update
// -------------------------
function updateProgress() {
  if (audio.duration) {
    const value = (audio.currentTime / audio.duration) * 100;
    progress.value = value;
    progressFill.style.width = value + "%";
  }
  if (!audio.paused) rafId = requestAnimationFrame(updateProgress);
}

// Drag / seek
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
    progressFill.style.width = progress.value + "%";
  }
});

// -------------------------
// Auto next track
// -------------------------
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  requestAnimationFrame(updateProgress);
});

// -------------------------
// Initial load
// -------------------------
loadTrack(currentIndex);
updateVolumeIcon();