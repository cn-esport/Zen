(function () {
  if (typeof SCENE_DATA === "undefined") return;

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

  const dur = SCENE_DATA.duration || 15;
  document.documentElement.style.setProperty("--dur", `${dur}s`);

  document.getElementById("L-bg").innerHTML = SCENE_DATA.layers.bg || "";
  document.getElementById("L-mid").innerHTML = SCENE_DATA.layers.mid || "";
  document.getElementById("L-char").innerHTML = SCENE_DATA.layers.char || "";
  document.getElementById("L-fg").innerHTML = SCENE_DATA.layers.fg || "";

  const capsBox = document.getElementById("caps");
  (SCENE_DATA.captions || []).forEach(c => {
    const p = document.createElement("p");
    p.className = "cap";
    p.style.setProperty("--s", `${c.start}s`);
    p.style.setProperty("--l", `${c.length}s`);
    p.textContent = c.text;
    capsBox.appendChild(p);
  });

  const dustBox = document.getElementById("dust");
  let seed = 11;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 46; i++) {
    const p = document.createElement("i");
    const z = 1.5 + rand() * 3.5;
    p.style.cssText = `left:${rand() * 100}%;top:${rand() * 100}%;width:${z}px;height:${z}px;` +
      `--dx:${(rand() * 8 - 2).toFixed(1)}vw;--dy:${(-2 - rand() * 10).toFixed(1)}vh;` +
      `animation-duration:${(9 + rand() * 14).toFixed(1)}s;animation-delay:-${(rand() * 20).toFixed(1)}s`;
    dustBox.appendChild(p);
  }

  let elapsed = 0;
  let lastTick = performance.now();
  let isPaused = false;
  let isMuted = false;
  let audioCtx = null;
  let masterGain = null;
  let lastStep = 0;
  let noiseBuffer = null;

  function formatTime(sec) {
    const s = Math.min(Math.floor(sec), dur);
    return `00:${String(s).padStart(2, "0")}`;
  }

  function createNoiseBuffer(ctx) {
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function initAudio() {
    if (audioCtx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioCtx = new AudioCtx();
    noiseBuffer = createNoiseBuffer(audioCtx);

    masterGain = audioCtx.createGain();
    masterGain.gain.value = isMuted ? 0 : 1;
    masterGain.connect(audioCtx.destination);

    const drone = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();
    drone.type = "sine";
    drone.frequency.value = 58.27;
    droneGain.gain.value = 0.045;
    drone.connect(droneGain);
    droneGain.connect(masterGain);
    drone.start();

    if (SCENE_DATA.sound === "rain" || SCENE_DATA.sound === "wind") {
      const noise = audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      const filter = audioCtx.createBiquadFilter();
      filter.type = SCENE_DATA.sound === "rain" ? "bandpass" : "lowpass";
      filter.frequency.value = SCENE_DATA.sound === "rain" ? 1400 : 320;
      const nGain = audioCtx.createGain();
      nGain.gain.value = SCENE_DATA.sound === "rain" ? 0.04 : 0.07;
      noise.connect(filter);
      filter.connect(nGain);
      nGain.connect(masterGain);
      noise.start();
    }
  }

  function triggerStepSound(stepIndex) {
    if (!audioCtx || isMuted || isPaused) return;
    const now = audioCtx.currentTime;
    const mode = SCENE_DATA.sound || "clock";

    if (mode === "footsteps") {
      const noise = audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(stepIndex % 2 === 0 ? 480 : 420, now);
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0.09, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      noise.connect(filter);
      filter.connect(g);
      g.connect(masterGain);
      noise.start(now);
      noise.stop(now + 0.15);
    } else if (mode === "heartbeat") {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(60, now);
      g.gain.setValueAtTime(0.18, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(stepIndex % 2 === 0 ? 920 : 780, now);
      g.gain.setValueAtTime(0.025, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  }

  function loop(now) {
    const dt = (now - lastTick) / 1000;
    lastTick = now;

    if (!isPaused && elapsed <= dur) {
      elapsed += dt;
      const pct = Math.min((elapsed / dur) * 100, 100);
      progressBar.style.width = `${pct}%`;
      timerEl.textContent = `${formatTime(elapsed)} / ${formatTime(dur)}`;

      const interval = SCENE_DATA.sound === "footsteps" ? 0.75 : 1.0;
      const currentStep = Math.floor(elapsed / interval);
      if (currentStep > lastStep && elapsed < dur - 0.5) {
        lastStep = currentStep;
        triggerStepSound(currentStep);
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
})();
