// ==========================================
// SCENE DATA (Edit only this section for new videos)
// ==========================================
const SCENE_DATA = {
  duration: 15,
  captions: [
    { start: 1.8, length: 4.1, text: "Sometimes you walk alone… not because nobody cares." },
    { start: 6.3, length: 4.3, text: "You walk alone because nobody truly understands." },
    { start: 11.0, length: 2.6, text: "And in that silence, you finally hear yourself." }
  ],
  layers: {
    bg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a111f"/>
          <stop offset=".55" stop-color="#16243d"/>
          <stop offset="1" stop-color="#26354d"/>
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0" stop-color="#ffb454" stop-opacity=".65"/>
          <stop offset=".45" stop-color="#ffb454" stop-opacity=".18"/>
          <stop offset="1" stop-color="#ffb454" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="lampCone" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stop-color="#ffb454" stop-opacity=".32"/>
          <stop offset="1" stop-color="#ffb454" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffb454" stop-opacity="0"/>
          <stop offset=".6" stop-color="#ffb454" stop-opacity=".2"/>
          <stop offset="1" stop-color="#ffb454" stop-opacity=".8"/>
        </linearGradient>
        <filter id="eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="8" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="soft"><feGaussianBlur stdDeviation="35"/></filter>
      </defs>

      <rect width="1080" height="1920" fill="url(#sky)"/>
      <circle cx="240" cy="310" r="42" fill="#dce7fa" opacity=".8"/>
      <circle cx="258" cy="298" r="38" fill="#101b30"/>
      <path d="M0 1280 L0 1090 L110 1090 L110 1020 L220 1020 L220 1120 L340 1120 L340 980 L470 980 L470 1140 L630 1140 L630 1050 L770 1050 L770 1110 L920 1110 L920 1010 L1080 1010 L1080 1280 Z" fill="#0e1729"/>
    `,
    mid: `
      <rect x="0" y="1260" width="1080" height="660" fill="#090d16"/>
      <ellipse cx="770" cy="1470" rx="260" ry="34" fill="#ffb454" opacity=".16" filter="url(#soft)"/>
      <circle cx="770" cy="590" r="240" fill="url(#lampGlow)"/>
      <polygon points="735,595 805,595 1030,1480 510,1480" fill="url(#lampCone)"/>
      <path d="M840 1480 L840 560 Q840 520 795 520 L755 520" fill="none" stroke="#050505" stroke-width="16" stroke-linecap="round"/>
      <rect x="735" y="520" width="55" height="18" rx="6" fill="#050505"/>
      <ellipse cx="762" cy="542" rx="22" ry="8" fill="#ffe2b0"/>
      <ellipse cx="540" cy="1330" rx="750" ry="70" fill="#8fa6c8" opacity=".10" filter="url(#soft)"/>
    `,
    char: `
      <g transform="translate(460 1485)">
        <ellipse cx="-15" cy="8" rx="170" ry="20" fill="#000" opacity=".7"/>
        <g class="breathe">
          <path class="sil" d="M-95 0 L-82 -310 Q-74 -415 -34 -445 L34 -445 Q74 -415 82 -310 L95 0 Z"/>
          <g class="head">
            <circle class="sil" cx="0" cy="-530" r="68"/>
            <g class="eyes widen" style="--t:6.3s">
              <g class="eye-wrap L"><ellipse class="eye" cx="-10" cy="-532" rx="11" ry="16"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="32" cy="-532" rx="11" ry="16"/></g>
            </g>
          </g>
        </g>
      </g>
    `,
    fg: `
      <path d="M-30 1920 L-30 1660 Q45 1610 75 1710 Q145 1580 215 1770 Q290 1640 370 1920 Z" fill="#050505"/>
      <path d="M760 1920 Q835 1660 895 1750 Q960 1600 1025 1710 L1110 1640 L1110 1920 Z" fill="#050505"/>
      <ellipse cx="540" cy="1840" rx="750" ry="95" fill="#050505" opacity=".9" filter="url(#soft)"/>
    `
  }
};

// ==========================================
// SELF-HEALING STUDIO ENGINE
// ==========================================
(function () {
  const stage = document.getElementById("stage");
  const camera = document.getElementById("camera");
  const timerEl = document.getElementById("timer");
  const progressBar = document.getElementById("progress-bar");
  const fsHint = document.getElementById("fs-hint");

  const muteBtn = document.getElementById("muteBtn");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const playText = document.getElementById("playText");
  const replayBtn = document.getElementById("replayBtn");
  const fullBtn = document.getElementById("fullBtn");

  document.documentElement.style.setProperty("--dur", `${SCENE_DATA.duration}s`);

  // Auto-create the 4 SVG layers inside #camera if missing
  if (camera) {
    ["L-bg", "L-mid", "L-char", "L-fg"].forEach(id => {
      if (!document.getElementById(id)) {
        const old = document.getElementById("scene-svg");
        if (old) old.remove();
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = id;
        svg.setAttribute("class", "layer");
        svg.setAttribute("viewBox", "0 0 1080 1920");
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        camera.prepend(svg);
      }
    });
  }

  const setLayer = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  setLayer("L-bg", SCENE_DATA.layers.bg);
  setLayer("L-mid", SCENE_DATA.layers.mid);
  setLayer("L-char", SCENE_DATA.layers.char);
  setLayer("L-fg", SCENE_DATA.layers.fg);

  // Build Captions safely (works with either #caps or #caption-box)
  let capsBox = document.getElementById("caps") || document.getElementById("caption-box");
  if (capsBox) {
    capsBox.id = "caps";
    capsBox.innerHTML = "";
    SCENE_DATA.captions.forEach(c => {
      const p = document.createElement("p");
      p.className = "cap";
      p.style.setProperty("--s", `${c.start}s`);
      p.style.setProperty("--l", `${c.length}s`);
      p.textContent = c.text;
      capsBox.appendChild(p);
    });
  }

  // Ensure #fade exists and fades in smoothly
  const fadeEl = document.getElementById("fade");
  if (fadeEl) {
    fadeEl.style.animation = `fadeIn 2s ease-out both, fadeOut .8s ease-in ${SCENE_DATA.duration - 0.8}s forwards`;
  }

  // 46 Warm Dust Motes
  let dustBox = document.getElementById("dust");
  if (!dustBox && camera) {
    dustBox = document.createElement("div");
    dustBox.id = "dust";
    camera.appendChild(dustBox);
  }
  if (dustBox) {
    dustBox.innerHTML = "";
    let s = 11;
    const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    for (let i = 0; i < 46; i++) {
      const p = document.createElement("i");
      const z = 1.5 + r() * 3.5;
      p.style.cssText = `left:${r() * 100}%;top:${r() * 100}%;width:${z}px;height:${z}px;` +
        `--dx:${(r() * 8 - 2).toFixed(1)}vw;--dy:${(-2 - r() * 10).toFixed(1)}vh;` +
        `animation-duration:${(9 + r() * 14).toFixed(1)}s;animation-delay:-${(r() * 20).toFixed(1)}s`;
      dustBox.appendChild(p);
    }
  }

  // Timer, Progress Bar & Audio Engine
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
    if (!AudioCtx) return;
    audioCtx = new AudioCtx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = isMuted ? 0 : 1;
    masterGain.connect(audioCtx.destination);

    const drone = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();
    drone.type = "sine";
    drone.frequency.value = 58.27;
    droneGain.gain.value = 0.055;
    drone.connect(droneGain);
    droneGain.connect(masterGain);
    drone.start();
  }

  function playAmbientPulse(even) {
    if (!audioCtx || isMuted || isPaused) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(even ? 110 : 98, now);
    g.gain.setValueAtTime(0.018, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  function loop(now) {
    const dt = (now - lastTick) / 1000;
    lastTick = now;

    if (!isPaused && elapsed <= SCENE_DATA.duration) {
      elapsed += dt;
      const pct = Math.min((elapsed / SCENE_DATA.duration) * 100, 100);
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (timerEl) timerEl.textContent = `${formatTime(elapsed)} / ${formatTime(SCENE_DATA.duration)}`;

      const sec = Math.floor(elapsed);
      if (sec > lastSecondTick && sec < SCENE_DATA.duration) {
        lastSecondTick = sec;
        playAmbientPulse(sec % 2 === 0);
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener("pointerdown", () => {
    initAudio();
    if (audioCtx && audioCtx.state === "suspended" && !isPaused) audioCtx.resume();
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      initAudio();
      isPaused = !isPaused;
      if (stage) stage.classList.toggle("paused", isPaused);
      if (playIcon) playIcon.textContent = isPaused ? "▶" : "⏸";
      if (playText) playText.textContent = isPaused ? "Play" : "Pause";
      if (audioCtx) isPaused ? audioCtx.suspend() : audioCtx.resume();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", () => location.reload());
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      initAudio();
      isMuted = !isMuted;
      const icon = muteBtn.querySelector(".icon");
      const label = muteBtn.querySelector("span:last-child");
      if (icon) icon.textContent = isMuted ? "🔇" : "🔊";
      if (label) label.textContent = isMuted ? "Muted" : "Sound";
      if (masterGain) masterGain.gain.value = isMuted ? 0 : 1;
    });
  }

  if (fullBtn) {
    fullBtn.addEventListener("click", async () => {
      initAudio();
      document.body.classList.add("is-fullscreen");
      if (fsHint) {
        fsHint.classList.add("show");
        setTimeout(() => fsHint.classList.remove("show"), 1800);
      }
      if (document.documentElement.requestFullscreen) {
        try { await document.documentElement.requestFullscreen(); } catch (_) {}
      }
    });
  }

  if (stage) {
    stage.addEventListener("click", async () => {
      if (document.body.classList.contains("is-fullscreen")) {
        document.body.classList.remove("is-fullscreen");
        if (document.fullscreenElement) {
          try { await document.exitFullscreen(); } catch (_) {}
        }
      }
    });
  }
})();
