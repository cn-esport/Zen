/* ==========================================================================
   LAST SOUL STUDIO — HYBRID CANVAS + 4-LAYER SVG RENDER & AUDIO ENGINE
   ========================================================================== */

(() => {
  const scenes = window.LAST_SOUL_SCENES || [];
  if (!scenes.length) return;

  // DOM References
  const stageFrame = document.getElementById("stageFrame");
  const canvas = document.getElementById("studioCanvas");
  const svgStage = document.getElementById("svgStage");
  const ctx = canvas.getContext("2d");

  const sceneSelect = document.getElementById("sceneSelect");
  const ratio916Btn = document.getElementById("ratio916");
  const ratio169Btn = document.getElementById("ratio169");

  const timeCurrentEl = document.getElementById("timeCurrent");
  const timeTotalEl = document.getElementById("timeTotal");
  const timelineTrack = document.getElementById("timelineTrack");
  const timelineProgress = document.getElementById("timelineProgress");
  const beatMarkers = document.getElementById("beatMarkers");

  const btnRestart = document.getElementById("btnRestart");
  const btnPlayPause = document.getElementById("btnPlayPause");
  const btnSubtitles = document.getElementById("btnSubtitles");
  const btnSound = document.getElementById("btnSound");
  const btnLetterbox = document.getElementById("btnLetterbox");
  const btnSafeZone = document.getElementById("btnSafeZone");
  const btnRecord = document.getElementById("btnRecord");
  const exitRecordBtn = document.getElementById("exitRecordBtn");

  const letterboxTop = document.getElementById("letterboxTop");
  const letterboxBottom = document.getElementById("letterboxBottom");
  const safeZoneOverlay = document.getElementById("safeZoneOverlay");
  const hudLens = document.getElementById("hudLens");
  const hudSceneBeat = document.getElementById("hudSceneBeat");
  const subtitleBox = document.getElementById("subtitleBox");
  const subtitleText = document.getElementById("subtitleText");
  const countdownOverlay = document.getElementById("countdownOverlay");
  const countdownNumber = document.getElementById("countdownNumber");

  // Studio State
  let currentSceneIdx = 0;
  let aspectRatio = "9:16";
  let isPlaying = false;
  let elapsed = 0;
  let lastFrameTime = null;
  let subtitlesEnabled = true;
  let soundEnabled = true;
  let letterboxEnabled = true;
  let safeZoneEnabled = false;
  let triggeredSounds = new Set();

  // Camera Smoothing State (Canvas mode)
  const cam = { x: 0, y: 0, zoom: 1, tilt: 0 };

  // Web Audio API Synthesized Foley Engine
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playFoley(type) {
    if (!soundEnabled) return;
    ensureAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === "tick") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.045);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.055);
    } else if (type === "buzz") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(115, now);
      osc.frequency.linearRampToValueAtTime(98, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "chime") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === "heartbeat") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(68, now);
      osc.frequency.exponentialRampToValueAtTime(36, now + 0.28);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.32);
    } else if (type === "footstep") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(135, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.11);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    }
  }

  function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const tenths = Math.floor((sec % 1) * 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${tenths}`;
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
    scenes.forEach((sc, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = sc.title;
      sceneSelect.appendChild(opt);
    });
  }

  function buildBeatMarkers(scene) {
    beatMarkers.innerHTML = "";
    scene.beats.forEach((b) => {
      const dot = document.createElement("span");
      dot.className = "beat-dot";
      dot.style.left = `${(b.start / scene.duration) * 100}%`;
      beatMarkers.appendChild(dot);
    });
  }

  // Mount & Synchronize SVG Scene Animations
  function mountSvgScene(scene) {
    if (!svgStage || typeof scene.renderSvg !== "function") return;
    svgStage.style.setProperty("--dur", `${scene.duration}s`);
    svgStage.innerHTML = scene.renderSvg(aspectRatio);
    syncSvgTimeline();
  }

  function syncSvgTimeline() {
    if (!svgStage || svgStage.classList.contains("hidden")) return;
    svgStage.classList.toggle("paused", !isPlaying);
    const anims = svgStage.getAnimations ? svgStage.getAnimations({ subtree: true }) : [];
    anims.forEach((anim) => {
      try {
        anim.currentTime = elapsed * 1000;
        if (isPlaying) anim.play();
        else anim.pause();
      } catch (_) {}
    });
  }

  function loadScene(idx) {
    currentSceneIdx = idx;
    const scene = scenes[currentSceneIdx];
    elapsed = 0;
    triggeredSounds.clear();
    cam.x = 0;
    cam.y = 0;
    cam.zoom = 1;
    cam.tilt = 0;
    timeTotalEl.textContent = formatTime(scene.duration);
    buildBeatMarkers(scene);

    const isSvg = scene.type === "svg";
    canvas.classList.toggle("hidden", isSvg);
    if (svgStage) {
      svgStage.classList.toggle("hidden", !isSvg);
      if (isSvg) mountSvgScene(scene);
    }

    renderFrame(0);
  }

  function setAspectRatio(ratio) {
    aspectRatio = ratio;
    stageFrame.classList.remove("ratio-9-16", "ratio-16-9");
    stageFrame.classList.add(ratio === "9:16" ? "ratio-9-16" : "ratio-16-9");
    ratio916Btn.classList.toggle("active", ratio === "9:16");
    ratio169Btn.classList.toggle("active", ratio === "16:9");

    const scene = scenes[currentSceneIdx];
    if (scene && scene.type === "svg") {
      mountSvgScene(scene);
    }
    setTimeout(() => {
      resizeCanvas();
      renderFrame(elapsed);
    }, 30);
  }

  function getActiveBeat(scene, t) {
    let active = scene.beats[0];
    for (let i = 0; i < scene.beats.length; i++) {
      if (t >= scene.beats[i].start) active = scene.beats[i];
    }
    return active;
  }

  function renderFrame(t) {
    const scene = scenes[currentSceneIdx];
    const rect = stageFrame.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const beat = getActiveBeat(scene, t);
    hudLens.textContent = beat.lens || "WIDE · 24MM";
    hudSceneBeat.textContent = beat.label || "BEAT 01";

    if (subtitlesEnabled && beat.subtitle) {
      subtitleBox.classList.remove("hidden");
      subtitleText.textContent = beat.subtitle;
    } else {
      subtitleBox.classList.add("hidden");
    }

    if (scene.type === "svg") {
      syncSvgTimeline();
    } else {
      const target = beat.camera || { x: 0, y: 0, zoom: 1, tilt: 0 };
      cam.x += (target.x - cam.x) * 0.06;
      cam.y += (target.y - cam.y) * 0.06;
      cam.zoom += (target.zoom - cam.zoom) * 0.05;
      cam.tilt += ((target.tilt || 0) - cam.tilt) * 0.05;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      ctx.translate(w / 2, h / 2);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.rotate((cam.tilt * Math.PI) / 180);
      ctx.translate(-w / 2 - cam.x * w, -h / 2 - cam.y * h);

      scene.render(ctx, w, h, t);
      ctx.restore();
    }

    // Update Timeline UI
    timeCurrentEl.textContent = formatTime(t);
    const pct = Math.min(100, (t / scene.duration) * 100);
    timelineProgress.style.width = `${pct}%`;
  }

  function loop(now) {
    if (lastFrameTime === null) lastFrameTime = now;
    const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
    lastFrameTime = now;

    if (isPlaying) {
      const scene = scenes[currentSceneIdx];
      elapsed += dt;

      if (scene.sounds) {
        scene.sounds.forEach((snd, idx) => {
          if (elapsed >= snd.at && !triggeredSounds.has(idx)) {
            triggeredSounds.add(idx);
            playFoley(snd.type);
          }
        });
      }

      if (elapsed >= scene.duration) {
        elapsed = scene.duration;
        isPlaying = false;
        btnPlayPause.textContent = "▶ PLAY";
      }
      renderFrame(elapsed);
    }

    requestAnimationFrame(loop);
  }

  function togglePlay() {
    ensureAudio();
    const scene = scenes[currentSceneIdx];
    if (elapsed >= scene.duration) {
      elapsed = 0;
      triggeredSounds.clear();
      if (scene.type === "svg") mountSvgScene(scene);
    }
    isPlaying = !isPlaying;
    btnPlayPause.textContent = isPlaying ? "❚❚ PAUSE" : "▶ PLAY";
    if (scene.type === "svg") syncSvgTimeline();
  }

  function restartScene() {
    ensureAudio();
    elapsed = 0;
    triggeredSounds.clear();
    isPlaying = true;
    btnPlayPause.textContent = "❚❚ PAUSE";
    const scene = scenes[currentSceneIdx];
    if (scene.type === "svg") mountSvgScene(scene);
    renderFrame(0);
  }

  function startCleanRecordMode() {
    ensureAudio();
    document.body.classList.add("recording-mode");
    exitRecordBtn.classList.remove("hidden");
    isPlaying = false;
    elapsed = 0;
    triggeredSounds.clear();
    const scene = scenes[currentSceneIdx];
    if (scene.type === "svg") mountSvgScene(scene);
    renderFrame(0);

    let count = 3;
    countdownNumber.textContent = count;
    countdownOverlay.classList.remove("hidden");

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        countdownNumber.textContent = count;
        playFoley("tick");
      } else {
        clearInterval(timer);
        countdownOverlay.classList.add("hidden");
        isPlaying = true;
        btnPlayPause.textContent = "❚❚ PAUSE";
        if (scene.type === "svg") syncSvgTimeline();
      }
    }, 850);
  }

  function exitCleanRecordMode() {
    document.body.classList.remove("recording-mode");
    exitRecordBtn.classList.add("hidden");
    countdownOverlay.classList.add("hidden");
  }

  // Event Listeners
  sceneSelect.addEventListener("change", (e) => {
    isPlaying = false;
    btnPlayPause.textContent = "▶ PLAY";
    loadScene(Number(e.target.value));
  });

  ratio916Btn.addEventListener("click", () => setAspectRatio("9:16"));
  ratio169Btn.addEventListener("click", () => setAspectRatio("16:9"));
  btnPlayPause.addEventListener("click", togglePlay);
  btnRestart.addEventListener("click", restartScene);

  btnSubtitles.addEventListener("click", () => {
    subtitlesEnabled = !subtitlesEnabled;
    btnSubtitles.classList.toggle("active", subtitlesEnabled);
    renderFrame(elapsed);
  });

  btnSound.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    btnSound.classList.toggle("active", soundEnabled);
    if (soundEnabled) ensureAudio();
  });

  btnLetterbox.addEventListener("click", () => {
    letterboxEnabled = !letterboxEnabled;
    btnLetterbox.classList.toggle("active", letterboxEnabled);
    letterboxTop.classList.toggle("hidden", !letterboxEnabled);
    letterboxBottom.classList.toggle("hidden", !letterboxEnabled);
  });

  btnSafeZone.addEventListener("click", () => {
    safeZoneEnabled = !safeZoneEnabled;
    btnSafeZone.classList.toggle("active", safeZoneEnabled);
    safeZoneOverlay.classList.toggle("hidden", !safeZoneEnabled);
  });

  btnRecord.addEventListener("click", startCleanRecordMode);
  exitRecordBtn.addEventListener("click", exitCleanRecordMode);

  timelineTrack.addEventListener("click", (e) => {
    const rect = timelineTrack.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const scene = scenes[currentSceneIdx];
    elapsed = ratio * scene.duration;
    triggeredSounds.clear();
    renderFrame(elapsed);
  });

  window.addEventListener("resize", () => {
    resizeCanvas();
    renderFrame(elapsed);
  });

  // Boot Studio
  populateScenes();
  resizeCanvas();
  loadScene(0);
  requestAnimationFrame(loop);
})();
