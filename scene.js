// ==========================================
// SCENE SCRIPT (Edit only this section for new videos)
// ==========================================
const SCENE_DATA = {
  duration: 15,
  soundMode: "clock-night", // "clock-night" | "heartbeat"
  captions: [
    { start: 0.6, end: 4.9, text: "It’s 2:14 AM… and your mind still refuses to shut off." },
    { start: 5.2, end: 9.9, text: "You aren’t tired because you worked too hard today." },
    { start: 10.2, end: 14.4, text: "You’re exhausted from living ten years ahead in your head." }
  ],
  svgArtwork: `
    <defs>
      <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2c436b" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#0b111e" stop-opacity="0.05" />
      </linearGradient>
      <radialGradient id="phoneLight" cx="50%" cy="62%" r="45%">
        <stop offset="0%" stop-color="#7ab8ff" stop-opacity="0.38" />
        <stop offset="60%" stop-color="#3b6ea8" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#050505" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="rimLight" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stop-color="#6088c7" stop-opacity="0.55" />
        <stop offset="18%" stop-color="#050505" stop-opacity="1" />
        <stop offset="100%" stop-color="#050505" stop-opacity="1" />
      </linearGradient>
    </defs>

    <rect x="42" y="65" width="135" height="230" rx="4" fill="url(#windowGlow)" />
    <line x1="109" y1="65" x2="109" y2="295" stroke="#070a10" stroke-width="4" />
    <line x1="42" y1="180" x2="177" y2="180" stroke="#070a10" stroke-width="4" />
    <circle cx="82" cy="115" r="14" fill="#d9e6ff" opacity="0.22" />

    <circle class="dust" cx="95" cy="260" r="1.4" style="animation-duration: 9s;" />
    <circle class="dust" cx="145" cy="310" r="1.1" style="animation-duration: 11s; animation-delay: 2s;" />
    <circle class="dust" cx="220" cy="280" r="1.6" style="animation-duration: 10s; animation-delay: 1s;" />
    <circle class="dust" cx="170" cy="380" r="1.2" style="animation-duration: 8s; animation-delay: 3s;" />

    <circle id="phone-glow" cx="185" cy="405" r="150" fill="url(#phoneLight)" />
    <path d="M0 510 Q180 495 360 515 L360 640 L0 640 Z" fill="#030304" />

    <g id="character-torso">
      <path d="M88 530 C92 435, 130 395, 180 395 C230 395, 268 435, 272 530 Z" fill="url(#rimLight)" />
      <g id="character-head">
        <ellipse cx="180" cy="332" rx="44" ry="50" fill="url(#rimLight)" />
        <path d="M142 305 Q155 274 185 278 Q212 280 220 306 Q190 294 142 305 Z" fill="#050505" />
        <ellipse class="eye" cx="163" cy="336" rx="6.2" ry="3.8" />
        <ellipse class="eye" cx="197" cy="336" rx="6.2" ry="3.8" />
      </g>
      <path d="M138 455 Q162 425 182 422 Q202 425 224 455 L212 485 L150 485 Z" fill="#050505" />
      <rect x="176" y="396" width="8" height="32" rx="2" fill="#b8dcff" opacity="0.85" />
    </g>
  `
};

// ==========================================
// STUDIO ENGINE
// ==========================================
const stage = document.getElementById("stage");
const sceneSvg = document.getElementById("scene-svg");
const captionEl = document.getElementById("caption");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const fsHint = document.getElementById("fs-hint");

const muteBtn = document.getElementById("muteBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");
const replayBtn = document.getElementById("replayBtn");
const fullBtn = document.getElementById("fullBtn");

fetch("skill.json")
  .then(res => res.json())
  .then(skill => {
    const r = document.documentElement.style;
    r.setProperty("--silhouette", skill.style.silhouetteColor);
    r.setProperty("--eye-color", skill.style.eyeColor);
    r.setProperty("--eye-glow", skill.style.eyeGlow);
    r.setProperty("--bg-top", skill.style.backgroundTop);
    r.setProperty("--bg-mid", skill.style.backgroundMid);
    r.setProperty("--bg-bottom", skill.style.backgroundBottom);
    r.setProperty("--caption-color", skill.style.captionColor);
  })
  .catch(() => {});

document.documentElement.style.setProperty("--duration", `${SCENE_DATA.duration}s`);
sceneSvg.innerHTML = SCENE_DATA.svgArtwork;

let elapsed = 0;
let lastTick = performance.now();
let isPaused = false;
let isMuted = false;
let audioCtx = null;
let masterGain = null;
let lastSecondTick = 0;

function formatTime(sec) {
  const s = Math.min(Math.floor(sec), SCENE_DATA.duration);
  return `00:${String(s).padStart(2, "0")}`;
}

function initAudio() {
  if (audioCtx) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioCtx();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = isMuted ? 0 : 1;
  masterGain.connect(audioCtx.destination);

  const drone = audioCtx.createOscillator();
  const droneGain = audioCtx.createGain();
  drone.type = "sine";
  drone.frequency.value = 65.41;
  droneGain.gain.value = 0.06;
  drone.connect(droneGain);
  droneGain.connect(masterGain);
  drone.start();
}

function playBeat(sec) {
  if (!audioCtx || isMuted || isPaused) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();

  if (SCENE_DATA.soundMode === "heartbeat") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(62, now);
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  } else {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(sec % 2 === 0 ? 920 : 780, now);
    g.gain.setValueAtTime(0.03, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  }

  osc.connect(g);
  g.connect(masterGain);
  osc.start(now);
  osc.stop(now + 0.16);
}

function loop(now) {
  const dt = (now - lastTick) / 1000;
  lastTick = now;

  if (!isPaused && elapsed <= SCENE_DATA.duration) {
    elapsed += dt;
    const pct = Math.min((elapsed / SCENE_DATA.duration) * 100, 100);
    progressBar.style.width = `${pct}%`;
    timerEl.textContent = `${formatTime(elapsed)} / ${formatTime(SCENE_DATA.duration)}`;

    const sec = Math.floor(elapsed);
    if (sec > lastSecondTick && sec < SCENE_DATA.duration) {
      lastSecondTick = sec;
      playBeat(sec);
    }

    const active = SCENE_DATA.captions.find(c => elapsed >= c.start && elapsed <= c.end);
    if (active) {
      if (captionEl.textContent !== active.text) captionEl.textContent = active.text;
      captionEl.classList.add("visible");
    } else {
      captionEl.classList.remove("visible");
    }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

window.addEventListener("pointerdown", () => {
  initAudio();
  if (audioCtx && audioCtx.state === "suspended" && !isPaused) audioCtx.resume();
});

playPauseBtn.addEventListener("click", () => {
  initAudio();
  isPaused = !isPaused;
  stage.classList.toggle("paused", isPaused);
  playIcon.textContent = isPaused ? "▶" : "⏸";
  playText.textContent = isPaused ? "Play" : "Pause";
  if (audioCtx) isPaused ? audioCtx.suspend() : audioCtx.resume();
});

replayBtn.addEventListener("click", () => location.reload());

muteBtn.addEventListener("click", () => {
  initAudio();
  isMuted = !isMuted;
  muteBtn.querySelector(".icon").textContent = isMuted ? "🔇" : "🔊";
  muteBtn.querySelector("span:last-child").textContent = isMuted ? "Muted" : "Sound";
  if (masterGain) masterGain.gain.value = isMuted ? 0 : 1;
});

// Enter True Full Screen
fullBtn.addEventListener("click", async () => {
  initAudio();
  document.body.classList.add("is-fullscreen");
  fsHint.classList.add("show");
  setTimeout(() => fsHint.classList.remove("show"), 1800);

  if (document.documentElement.requestFullscreen) {
    try { await document.documentElement.requestFullscreen(); } catch (_) {}
  }
});

// Exit Full Screen when tapping the stage
stage.addEventListener("click", async () => {
  if (document.body.classList.contains("is-fullscreen")) {
    document.body.classList.remove("is-fullscreen");
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch (_) {}
    }
  }
});
