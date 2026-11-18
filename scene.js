// ==========================================
// SCENE SCRIPT (Edit only this section for new scenes)
// ==========================================
const SCENE_DATA = {
  duration: 15, // seconds (12 to 18s per SKILL.md)
  captions: [
    { start: 1.8, length: 4.2, text: "You slept eight full hours… yet woke up exhausted." },
    { start: 6.4, length: 4.3, text: "Because your body rested, while your mind kept running." },
    { start: 11.0, length: 2.6, text: "Overthinking drains more than work ever will." }
  ],
  layers: {
    // LAYER 1: Sky, Moon, Window, Light Shaft, Clock
    bg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1426"/>
          <stop offset=".55" stop-color="#1b2c4a"/>
          <stop offset="1" stop-color="#223552"/>
        </linearGradient>
        <radialGradient id="moonGlow">
          <stop offset="0" stop-color="#cfe0ff" stop-opacity=".5"/>
          <stop offset="1" stop-color="#cfe0ff" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="moonBeam" x1="0.8" y1="0" x2="0.2" y2="1">
          <stop offset="0" stop-color="#9fb8d9" stop-opacity=".28"/>
          <stop offset="1" stop-color="#9fb8d9" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#9fb8d9" stop-opacity="0"/>
          <stop offset=".65" stop-color="#9fb8d9" stop-opacity=".25"/>
          <stop offset="1" stop-color="#9fb8d9" stop-opacity=".75"/>
        </linearGradient>
        <filter id="eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="8" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="soft"><feGaussianBlur stdDeviation="35"/></filter>
      </defs>

      <rect width="1080" height="1920" fill="url(#sky)"/>

      <!-- Window Frame & Moon -->
      <rect x="610" y="210" width="350" height="520" rx="6" fill="#233759" stroke="#080c14" stroke-width="14"/>
      <circle cx="855" cy="360" r="140" fill="url(#moonGlow)"/>
      <circle cx="855" cy="360" r="46" fill="#dce7fa" opacity=".85"/>
      <line x1="785" y1="210" x2="785" y2="730" stroke="#080c14" stroke-width="12"/>
      <line x1="610" y1="470" x2="960" y2="470" stroke="#080c14" stroke-width="12"/>

      <!-- Diagonal Moonlight Shaft -->
      <polygon points="610,730 960,730 560,1520 140,1520" fill="url(#moonBeam)"/>

      <!-- Minimalist Wall Clock -->
      <g transform="translate(230 430)">
        <circle cx="0" cy="0" r="125" fill="#131e33" stroke="#070a12" stroke-width="10"/>
        <line x1="0" y1="-102" x2="0" y2="-88" stroke="#9fb8d9" stroke-width="4" opacity=".6"/>
        <line x1="102" y1="0" x2="88" y2="0" stroke="#9fb8d9" stroke-width="4" opacity=".6"/>
        <line x1="0" y1="102" x2="0" y2="88" stroke="#9fb8d9" stroke-width="4" opacity=".6"/>
        <line x1="-102" y1="0" x2="-88" y2="0" stroke="#9fb8d9" stroke-width="4" opacity=".6"/>
        <line x1="0" y1="0" x2="0" y2="-75" stroke="#dce7fa" stroke-width="6" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="62" y2="14" stroke="#dce7fa" stroke-width="6" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="72" y2="-45" stroke="#ffb454" stroke-width="3" stroke-linecap="round"/>
      </g>
    `,

    // LAYER 2: Mid-ground Room Shadow, Bed & Nightstand
    mid: `
      <rect x="0" y="1320" width="1080" height="600" fill="#0d1424"/>
      <rect x="0" y="1140" width="290" height="240" rx="8" fill="#111a2e"/>
      <!-- Glowing Phone on Nightstand -->
      <g transform="translate(115 1045) rotate(-8)">
        <rect x="-12" y="-12" width="94" height="164" rx="14" fill="#9fb8d9" opacity=".22" filter="url(#soft)"/>
        <rect x="0" y="0" width="70" height="140" rx="10" fill="#b8cce8" stroke="#050505" stroke-width="7"/>
      </g>
      <ellipse cx="540" cy="1440" rx="650" ry="90" fill="#8fa6c8" opacity=".08" filter="url(#soft)"/>
    `,

    // LAYER 3: Silhouette Character (Floating Round Head + Bell Body + Thought Squiggle)
    char: `
      <!-- Subtle Overthinking Squiggle Line -->
      <path d="M350 760 Q390 660 470 700 T610 670 Q690 660 660 730" fill="none" stroke="#9fb8d9" stroke-width="4" opacity=".32" stroke-linecap="round"/>

      <g transform="translate(540 1440)">
        <!-- Blanket / Bed Base -->
        <path class="sil" d="M-380 0 Q-380 -145 0 -145 Q380 -145 380 0 Z"/>

        <g class="breathe">
          <!-- Bell-Shaped Torso -->
          <path class="sil" d="M-155 -130 L-135 -360 Q-125 -470 -55 -490 L55 -490 Q125 -470 135 -360 L155 -130 Z"/>

          <!-- Floating Circular Head with Glowing Eyes -->
          <g class="head">
            <circle class="sil" cx="0" cy="-585" r="76"/>
            <g class="eyes squint" style="--t:6.4s; --rot:-8deg">
              <g class="eye-wrap L"><ellipse class="eye" cx="-24" cy="-585" rx="13" ry="18"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="24" cy="-585" rx="13" ry="18"/></g>
            </g>
          </g>
        </g>
      </g>
    `,

    // LAYER 4: Foreground Framing & Fog
    fg: `
      <path d="M0 0 L85 0 Q35 960 95 1920 L0 1920 Z" fill="#050505"/>
      <ellipse cx="540" cy="1760" rx="700" ry="110" fill="#050505" opacity=".85" filter="url(#soft)"/>
    `
  }
};

// ==========================================
// STUDIO ENGINE (Runs SKILL.md Rules + Controls)
// ==========================================
const stage = document.getElementById("stage");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const fsHint = document.getElementById("fs-hint");

const muteBtn = document.getElementById("muteBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");
const replayBtn = document.getElementById("replayBtn");
const fullBtn = document.getElementById("fullBtn");

// Set Duration & Inject 4 SVG Layers
document.documentElement.style.setProperty("--dur", `${SCENE_DATA.duration}s`);
document.getElementById("L-bg").innerHTML = SCENE_DATA.layers.bg;
document.getElementById("L-mid").innerHTML = SCENE_DATA.layers.mid;
document.getElementById("L-char").innerHTML = SCENE_DATA.layers.char;
document.getElementById("L-fg").innerHTML = SCENE_DATA.layers.fg;

// Inject Timed Captions (--s and --l)
const capsBox = document.getElementById("caps");
SCENE_DATA.captions.forEach(c => {
  const p = document.createElement("p");
  p.className = "cap";
  p.style.setProperty("--s", `${c.start}s`);
  p.style.setProperty("--l", `${c.length}s`);
  p.textContent = c.text;
  capsBox.appendChild(p);
});

// Deterministic 46 Warm Dust Motes (from SKILL.md)
(function() {
  let s = 7;
  const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const box = document.getElementById("dust");
  for (let i = 0; i < 46; i++) {
    const p = document.createElement("i");
    const z = 1.5 + r() * 3.5;
    p.style.cssText = `left:${r() * 100}%;top:${r() * 100}%;width:${z}px;height:${z}px;` +
      `--dx:${(r() * 8 - 2).toFixed(1)}vw;--dy:${(-2 - r() * 10).toFixed(1)}vh;` +
      `animation-duration:${(9 + r() * 14).toFixed(1)}s;animation-delay:-${(r() * 20).toFixed(1)}s`;
    box.appendChild(p);
  }
})();

// Built-in Web Audio SFX + Progress Timer
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
  droneGain.gain.value = 0.05;
  drone.connect(droneGain);
  droneGain.connect(masterGain);
  drone.start();
}

function playClockTick(even) {
  if (!audioCtx || isMuted || isPaused) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(even ? 920 : 780, now);
  g.gain.setValueAtTime(0.028, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  osc.connect(g);
  g.connect(masterGain);
  osc.start(now);
  osc.stop(now + 0.06);
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
      playClockTick(sec % 2 === 0);
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

fullBtn.addEventListener("click", async () => {
  initAudio();
  document.body.classList.add("is-fullscreen");
  fsHint.classList.add("show");
  setTimeout(() => fsHint.classList.remove("show"), 1800);
  if (document.documentElement.requestFullscreen) {
    try { await document.documentElement.requestFullscreen(); } catch (_) {}
  }
});

stage.addEventListener("click", async () => {
  if (document.body.classList.contains("is-fullscreen")) {
    document.body.classList.remove("is-fullscreen");
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch (_) {}
    }
  }
});
