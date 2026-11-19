/* ==========================================================================
   LAST SOUL STUDIO — 60FPS CINEMATIC DIRECTOR & SYNTHESIZED FOLEY ENGINE
   ========================================================================== */

(() => {
  const canvas = document.getElementById("studioCanvas");
  const ctx = canvas.getContext("2d");

  // UI Elements
  const stageFrame = document.getElementById("stageFrame");
  const sceneSelect = document.getElementById("sceneSelect");
  const ratio916Btn = document.getElementById("ratio916");
  const ratio169Btn = document.getElementById("ratio169");
  const btnPlayPause = document.getElementById("btnPlayPause");
  const btnRestart = document.getElementById("btnRestart");
  const btnSubtitles = document.getElementById("btnSubtitles");
  const btnSound = document.getElementById("btnSound");
  const btnLetterbox = document.getElementById("btnLetterbox");
  const btnSafeZone = document.getElementById("btnSafeZone");
  const btnRecord = document.getElementById("btnRecord");
  const exitRecordBtn = document.getElementById("exitRecordBtn");

  const timelineTrack = document.getElementById("timelineTrack");
  const timelineProgress = document.getElementById("timelineProgress");
  const beatMarkers = document.getElementById("beatMarkers");
  const timeCurrent = document.getElementById("timeCurrent");
  const timeTotal = document.getElementById("timeTotal");

  const hudLens = document.getElementById("hudLens");
  const hudSceneBeat = document.getElementById("hudSceneBeat");
  const subtitleBox = document.getElementById("subtitleBox");
  const subtitleText = document.getElementById("subtitleText");
  const safeZoneOverlay = document.getElementById("safeZoneOverlay");
  const letterboxTop = document.getElementById("letterboxTop");
  const letterboxBottom = document.getElementById("letterboxBottom");
  const countdownOverlay = document.getElementById("countdownOverlay");
  const countdownNumber = document.getElementById("countdownNumber");

  // Studio State
  let currentSceneIndex = 0;
  let isPlaying = false;
  let currentTime = 0;
  let lastFrameTimestamp = null;
  let soundEnabled = true;
  let wakeLock = null;
  let triggeredSoundIds = new Set();

  // Camera Rig State (Smoothed interpolation)
  const cam = {
    x: 0,
    y: 0,
    zoom: 1,
    tilt: 0
  };

  /* ------------------------------------------------------------------------
     1. WEB AUDIO SYNTHESIZED FOLEY & AMBIENCE ENGINE (Zero External Audio Files)
     ------------------------------------------------------------------------ */
  class FoleySynth {
    constructor() {
      this.ctx = null;
      this.ambientNode = null;
      this.ambientGain = null;
    }

    unlock() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    startAmbience(type = "night") {
      if (!soundEnabled) return;
      this.unlock();
      this.stopAmbience();

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = type === "rain" ? 950 : 180;

      const gain = this.ctx.createGain();
      gain.gain.value = type === "rain" ? 0.055 : 0.028;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      this.ambientNode = noise;
      this.ambientGain = gain;
    }

    stopAmbience() {
      if (this.ambientNode) {
        try { this.ambientNode.stop(); } catch (_) {}
        this.ambientNode.disconnect();
        this.ambientNode = null;
      }
    }

    trigger(type) {
      if (!soundEnabled) return;
      this.unlock();
      const now = this.ctx.currentTime;

      if (type === "tick") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1150, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.035);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.045);
      }

      if (type === "footstep") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(125, now);
        osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);
        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }

      if (type === "heartbeat") {
        [0, 0.18].forEach((offset, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(idx === 0 ? 78 : 64, now + offset);
          osc.frequency.exponentialRampToValueAtTime(30, now + offset + 0.14);
          gain.gain.setValueAtTime(idx === 0 ? 0.32 : 0.22, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.16);
        });
      }

      if (type === "buzz") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(145, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }

      if (type === "chime") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.46);
      }
    }
  }

  const foley = new FoleySynth();

  /* ------------------------------------------------------------------------
     2. SCENE MANAGEMENT & CANVAS RESIZING
     ------------------------------------------------------------------------ */
  function getActiveScene() {
    return window.LAST_SOUL_SCENES[currentSceneIndex];
  }

  function resizeCanvas() {
    const rect = stageFrame.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function populateScenes() {
    sceneSelect.innerHTML = "";
    window.LAST_SOUL_SCENES.forEach((scene, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = `${String(idx + 1).padStart(2, "0")} · ${scene.title}`;
      sceneSelect.appendChild(opt);
    });
    loadScene(0);
  }

  function loadScene(index) {
    currentSceneIndex = index;
    currentTime = 0;
    triggeredSoundIds.clear();
    isPlaying = false;
    foley.stopAmbience();
    btnPlayPause.textContent = "▶ PLAY";

    const scene = getActiveScene();
    timeTotal.textContent = formatTime(scene.duration);

    // Build Beat Markers on Timeline
    beatMarkers.innerHTML = "";
    scene.beats.forEach((beat) => {
      const dot = document.createElement("span");
      dot.className = "beat-dot";
      dot.style.left = `${(beat.start / scene.duration) * 100}%`;
      dot.title = beat.label || beat.lens;
      beatMarkers.appendChild(dot);
    });

    // Snap camera to initial beat
    const firstBeat = scene.beats[0];
    if (firstBeat && firstBeat.camera) {
      cam.x = firstBeat.camera.x || 0;
      cam.y = firstBeat.camera.y || 0;
      cam.zoom = firstBeat.camera.zoom || 1;
      cam.tilt = firstBeat.camera.tilt || 0;
    }

    updateUIState();
    renderFrame(0);
  }

  function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, "0")}:${rem.toFixed(1).padStart(4, "0")}`;
  }

  /* ------------------------------------------------------------------------
     3. DIRECTOR CAMERA RIG & RENDER PIPELINE
     ------------------------------------------------------------------------ */
  function getCurrentBeat(scene, t) {
    let active = scene.beats[0];
    for (let i = 0; i < scene.beats.length; i++) {
      if (t >= scene.beats[i].start) {
        active = scene.beats[i];
      } else {
        break;
      }
    }
    return active;
  }

  function updateUIState() {
    const scene = getActiveScene();
    const beat = getCurrentBeat(scene, currentTime);

    timeCurrent.textContent = formatTime(currentTime);
    const pct = Math.min(100, (currentTime / scene.duration) * 100);
    timelineProgress.style.width = `${pct}%`;

    hudLens.textContent = beat.lens || "WIDE · 24MM";
    hudSceneBeat.textContent = beat.label || "BEAT";
    subtitleText.textContent = beat.subtitle || "";
  }

  function renderFrame(dt) {
    const scene = getActiveScene();
    const rect = stageFrame.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const beat = getCurrentBeat(scene, currentTime);
    const targetCam = beat.camera || { x: 0, y: 0, zoom: 1, tilt: 0 };

    // Smooth cinematic damping + organic handheld micro-breathing
    const lerpSpeed = Math.min(1, dt * 2.8 || 0.08);
    cam.x += (targetCam.x - cam.x) * lerpSpeed;
    cam.y += (targetCam.y - cam.y) * lerpSpeed;
    cam.zoom += (targetCam.zoom - cam.zoom) * lerpSpeed;
    cam.tilt += ((targetCam.tilt || 0) - cam.tilt) * lerpSpeed;

    const breatheX = Math.sin(currentTime * 1.1) * 2.2;
    const breatheY = Math.cos(currentTime * 0.85) * 2.5;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Apply Director Camera Transform
    ctx.translate(w / 2 + breatheX, h / 2 + breatheY);
    ctx.rotate((cam.tilt * Math.PI) / 180);
    ctx.scale(cam.zoom, cam.zoom);
    ctx.translate(-w / 2 - cam.x * w, -h / 2 - cam.y * h);

    // Delegate Scene Artwork & Character Animation
    scene.render(ctx, w, h, currentTime, beat);

    ctx.restore();
  }

  function processSounds(scene, t) {
    if (!scene.sounds) return;
    scene.sounds.forEach((snd, idx) => {
      const key = `${currentSceneIndex}-${idx}`;
      if (t >= snd.at && !triggeredSoundIds.has(key)) {
        triggeredSoundIds.add(key);
        foley.trigger(snd.type);
      }
    });
  }

  function loop(timestamp) {
    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
    const dt = Math.min(0.05, (timestamp - lastFrameTimestamp) / 1000);
    lastFrameTimestamp = timestamp;

    const scene = getActiveScene();

    if (isPlaying) {
      currentTime += dt;
      processSounds(scene, currentTime);

      if (currentTime >= scene.duration) {
        currentTime = scene.duration;
        isPlaying = false;
        foley.stopAmbience();
        btnPlayPause.textContent = "▶ PLAY";

        // Hold final dramatic frame 1.5s before exiting Record Mode
        if (document.body.classList.contains("recording-mode")) {
          setTimeout(() => exitRecordMode(), 1500);
        }
      }
      updateUIState();
    }

    renderFrame(dt);
    requestAnimationFrame(loop);
  }

  /* ------------------------------------------------------------------------
     4. SCREEN WAKE-LOCK & CLEAN RECORD MODE
     ------------------------------------------------------------------------ */
  async function requestWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
      }
    } catch (_) {}
  }

  function releaseWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(() => {});
      wakeLock = null;
    }
  }

  function enterRecordMode() {
    foley.unlock();
    isPlaying = false;
    currentTime = 0;
    triggeredSoundIds.clear();
    updateUIState();
    renderFrame(0);

    document.body.classList.add("recording-mode");
    exitRecordBtn.classList.remove("hidden");
    safeZoneOverlay.classList.add("hidden");
    btnSafeZone.classList.remove("active");
    resizeCanvas();
    requestWakeLock();

    // 3-2-1 Countdown before playback starts
    let count = 3;
    countdownNumber.textContent = count;
    countdownOverlay.classList.remove("hidden");

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        countdownNumber.textContent = count;
      } else {
        clearInterval(timer);
        countdownOverlay.classList.add("hidden");
        startPlayback();
      }
    }, 1000);
  }

  function exitRecordMode() {
    document.body.classList.remove("recording-mode");
    exitRecordBtn.classList.add("hidden");
    countdownOverlay.classList.add("hidden");
    releaseWakeLock();
    resizeCanvas();
  }

  function startPlayback() {
    const scene = getActiveScene();
    if (currentTime >= scene.duration) {
      currentTime = 0;
      triggeredSoundIds.clear();
    }
    foley.unlock();
    foley.startAmbience(scene.ambience || "night");
    isPlaying = true;
    btnPlayPause.textContent = "❚❚ PAUSE";
  }

  function pausePlayback() {
    isPlaying = false;
    foley.stopAmbience();
    btnPlayPause.textContent = "▶ PLAY";
  }

  /* ------------------------------------------------------------------------
     5. EVENT LISTENERS
     ------------------------------------------------------------------------ */
  btnPlayPause.addEventListener("click", () => {
    if (isPlaying) pausePlayback();
    else startPlayback();
  });

  btnRestart.addEventListener("click", () => {
    currentTime = 0;
    triggeredSoundIds.clear();
    updateUIState();
    renderFrame(0);
    if (isPlaying) {
      foley.startAmbience(getActiveScene().ambience || "night");
    }
  });

  sceneSelect.addEventListener("change", (e) => {
    loadScene(Number(e.target.value));
  });

  ratio916Btn.addEventListener("click", () => {
    ratio916Btn.classList.add("active");
    ratio169Btn.classList.remove("active");
    stageFrame.classList.replace("ratio-16-9", "ratio-9-16");
    setTimeout(resizeCanvas, 310);
  });

  ratio169Btn.addEventListener("click", () => {
    ratio169Btn.classList.add("active");
    ratio916Btn.classList.remove("active");
    stageFrame.classList.replace("ratio-9-16", "ratio-16-9");
    setTimeout(resizeCanvas, 310);
  });

  btnSubtitles.addEventListener("click", () => {
    btnSubtitles.classList.toggle("active");
    subtitleBox.classList.toggle("hidden");
  });

  btnSound.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    btnSound.classList.toggle("active", soundEnabled);
    if (!soundEnabled) foley.stopAmbience();
    else if (isPlaying) foley.startAmbience(getActiveScene().ambience || "night");
  });

  btnLetterbox.addEventListener("click", () => {
    btnLetterbox.classList.toggle("active");
    letterboxTop.classList.toggle("hidden-bar");
    letterboxBottom.classList.toggle("hidden-bar");
  });

  btnSafeZone.addEventListener("click", () => {
    btnSafeZone.classList.toggle("active");
    safeZoneOverlay.classList.toggle("hidden");
  });

  btnRecord.addEventListener("click", enterRecordMode);
  exitRecordBtn.addEventListener("click", () => {
    pausePlayback();
    exitRecordMode();
  });

  timelineTrack.addEventListener("click", (e) => {
    const rect = timelineTrack.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const scene = getActiveScene();
    currentTime = ratio * scene.duration;
    triggeredSoundIds.clear();
    updateUIState();
    renderFrame(0);
  });

  window.addEventListener("resize", resizeCanvas);

  // Boot Studio
  populateScenes();
  resizeCanvas();
  requestAnimationFrame(loop);
})();
