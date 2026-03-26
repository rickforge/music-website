// Hamburger menu
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

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const glow = document.querySelector(".video-glow");

function getAverageColor() {
  const width = (canvas.width = 160); // liten canvas = bättre performance
  const height = (canvas.height = 90);

  ctx.drawImage(video, 0, 0, width, height);

  const data = ctx.getImageData(0, 0, width, height).data;

  let r = 0,
    g = 0,
    b = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return `rgb(${r}, ${g}, ${b})`;
}

function updateGlow() {
  if (video.paused || video.ended) return;

  const color = getAverageColor();

  glow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;

  requestAnimationFrame(updateGlow);
}

video.addEventListener("play", () => {
  updateGlow();
});