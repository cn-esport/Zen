// ==========================================
// ZEN CINEMA ENGINE V12 — GSAP 3.12 MASTER TIMELINE + 14-SFX LIBRARY
// ==========================================
const $ = s => document.querySelector(s);
const stage = $('#stage'), caps = $('#caps'), fade = $('#fade');
const playBtn = $('#play'), soundBtn = $('#sound'), ccBtn = $('#cc');
const ratioBtn = $('#ratio'), studioLabel = $('#studio-label');
const scrub = $('#scrub'), timeEl = $('#time'), fsBtn = $('#fs'), replayBtn = $('#replay');

let DUR = 45, soundOn = false, ccOn = true, isVertical = false;
let isDragging = false, wasPlayingBeforeDrag = false;
let lastTickSec = -1, firedSfx = new Set();
let actx = null, masterGain = null, compressor = null;

// Global GSAP Camera Rig (any scene can tween window.CAM properties)
window.CAM = { shake: 0, flash: 0, zoomMul: 1, offsetX: 0, offsetY: 0 };

if (fade) {
  fade.style.animation = 'none';
  fade.style.opacity = '0';
  fade.style.pointerEvents = 'none';
}

const canvas = document.createElement('canvas');
canvas.id = 'cinema-canvas';
canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;z-index:2;background:#050811;';
if (stage) {
  const cam = $('#camera');
  if (cam) cam.style.display = 'none';
  const dust = $('#dust');
  if (dust) dust.style.display = 'none';
  stage.insertBefore(canvas, stage.firstChild);
}
const ctx = canvas.getContext('2d', { alpha: false });

function resizeCanvas() {
  if (!stage) return;
  const r = stage.getBoundingClientRect();
  if (r.width < 10 || r.height < 10) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const nw = Math.floor(r.width * dpr);
  const nh = Math.floor(r.height * dpr);
  if (canvas.width !== nw || canvas.height !== nh) {
    canvas.width = nw;
    canvas.height = nh;
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }
function fmt(s) { return `${pad(s / 60)}:${pad(s % 60)}`; }

// ==========================================
// MASTER GSAP TIMELINE SETUP
// ==========================================
const hasGSAP = typeof gsap !== 'undefined';
const playhead = { t: 0 };
let masterTL = null;

function buildMasterTimeline() {
  if (typeof SCENE_DATA !== 'undefined' && SCENE_DATA.duration) {
    DUR = SCENE_DATA.duration;
  }
  document.documentElement.style.setProperty('--dur', DUR + 's');
  if (timeEl) timeEl.textContent = `00:00 / ${fmt(DUR)}`;

  // Build Captions DOM
  if (caps && typeof SCENE_DATA !== 'undefined') {
    caps.innerHTML = '';
    (SCENE_DATA.captions || []).forEach(c => {
      const d = document.createElement('div');
      d.className = 'cap';
      d.dataset.start = c.start;
      d.dataset.end = c.start + c.length;
      d.textContent = c.text;
      d.style.cssText = 'opacity:0;transform:translate(-50%,8px);transition:opacity .25s ease,transform .25s ease;';
      caps.appendChild(d);
    });
  }

  if (!hasGSAP) return;
  if (masterTL) masterTL.kill();

  masterTL = gsap.timeline({
    paused: false,
    onUpdate: () => {
      const t = masterTL.time();
      playhead.t = t;
      processFrameAudio(t);
      updateCaptions(t);
      if (!isDragging && scrub) {
        scrub.value = String(Math.round((t / DUR) * 1000));
      }
      if (timeEl) timeEl.textContent = `${fmt(t)} / ${fmt(DUR)}`;
    },
    onComplete: () => {
      updatePlayButtonUI(false);
      updateAmbientGain(false);
    }
  });

  // Base linear time driver across full duration
  masterTL.to(playhead, { t: DUR, duration: DUR, ease: 'none' }, 0);

  // Automatic GSAP Camera Impact Shakes & Flashes synced to 'boom' & 'spark' SFX
  if (typeof SCENE_DATA !== 'undefined' && SCENE_DATA.sfx) {
    SCENE_DATA.sfx.forEach(item => {
      if (item.type === 'boom') {
        masterTL.fromTo(window.CAM,
          { shake: 9, flash: 0.14 },
          { shake: 0, flash: 0, duration: 0.55, ease: 'power3.out' },
          item.at
        );
      } else if (item.type === 'spark' || item.type === 'sun_swell') {
        masterTL.fromTo(window.CAM,
          { flash: 0.18 },
          { flash: 0, duration: 0.7, ease: 'power2.out' },
          item.at
        );
      }
    });
  }

  // Allow individual scenes to register custom GSAP tweens via SCENE_DATA.setupGSAP(masterTL, CAM)
  if (typeof SCENE_DATA !== 'undefined' && typeof SCENE_DATA.setupGSAP === 'function') {
    SCENE_DATA.setupGSAP(masterTL, window.CAM);
  }
}

function isPlaying() {
  return masterTL ? !masterTL.paused() && masterTL.progress() < 1 : false;
}

function updatePlayButtonUI(running = isPlaying()) {
  if (!playBtn) return;
  playBtn.classList.toggle('on', running);
  playBtn.innerHTML = running ? '<span>❚❚</span>Pause' : '<span>▶</span>Play';
}

function updateCaptions(t) {
  if (caps) {
    caps.style.display = ccOn ? 'block' : 'none';
    if (ccOn) {
      caps.querySelectorAll('.cap').forEach(el => {
        const s = parseFloat(el.dataset.start), e = parseFloat(el.dataset.end);
        const active = t >= s && t <= e;
        el.style.opacity = active ? '1' : '0';
        el.style.transform = active ? 'translate(-50%, 0px)' : 'translate(-50%, 8px)';
      });
    }
  }
  if (fade) {
    if (t < 0.5) fade.style.opacity = String(Math.max(0, 1 - t / 0.5));
    else if (t > DUR - 0.6) fade.style.opacity = String(Math.min(1, (t - (DUR - 0.6)) / 0.6));
    else fade.style.opacity = '0';
  }
}

function toggleRatio() {
  isVertical = !isVertical;
  document.body.classList.toggle('v', isVertical);
  if (ratioBtn) {
    ratioBtn.innerHTML = isVertical ? '<span>📱</span>9:16' : '<span>🖥</span>16:9';
  }
  if (studioLabel) {
    studioLabel.textContent = isVertical ? 'ZEN // GSAP 9:16' : 'ZEN // GSAP 16:9';
  }
  resizeCanvas();
  setTimeout(resizeCanvas, 80);
  setTimeout(resizeCanvas, 260);
}

// ==========================================
// 14-SFX CINEMA WEB AUDIO ENGINE
// ==========================================
function ensureAudio() {
  if (actx) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  actx = new AudioCtx();

  compressor = actx.createDynamicsCompressor();
  compressor.threshold.value = -14;
  compressor.knee.value = 16;
  compressor.ratio.value = 5;
  compressor.attack.value = 0.004;
  compressor.release.value = 0.22;

  masterGain = actx.createGain();
  masterGain.gain.value = 0.0001;
  masterGain.connect(compressor);
  compressor.connect(actx.destination);

  const padNotes = [
    { f: 73.42, type: 'sine',     vol: 0.22, cut: 180 },
    { f: 110.0, type: 'triangle', vol: 0.13, cut: 280 },
    { f: 164.8, type: 'sine',     vol: 0.09, cut: 360 }
  ];
  padNotes.forEach(n => {
    const osc = actx.createOscillator();
    const lp = actx.createBiquadFilter();
    const g = actx.createGain();
    osc.type = n.type;
    osc.frequency.value = n.f;
    lp.type = 'lowpass';
    lp.frequency.value = n.cut;
    g.gain.value = n.vol;
    osc.connect(lp); lp.connect(g); g.connect(masterGain);
    osc.start();
  });
}

function updateAmbientGain(running = isPlaying()) {
  if (!actx || !masterGain) return;
  const shouldPlayPad = soundOn && running && !isDragging;
  masterGain.gain.cancelScheduledValues(actx.currentTime);
  masterGain.gain.setTargetAtTime(shouldPlayPad ? 1.0 : 0.0001, actx.currentTime, 0.08);
}

function playClockTick() {
  if (!actx || !soundOn || !isPlaying() || isDragging) return;
  const t = actx.currentTime;
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = 'triangle';
  o.frequency.setValueAtTime(920, t);
  o.frequency.exponentialRampToValueAtTime(260, t + 0.024);
  g.gain.setValueAtTime(0.001, t);
  g.gain.exponentialRampToValueAtTime(0.14, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0008, t + 0.042);
  o.connect(g); g.connect(masterGain);
  o.start(t); o.stop(t + 0.05);
}

function triggerSFX(type) {
  if (!actx || !soundOn) return;
  const now = actx.currentTime;

  if (type === 'notification') {
    [1318.5, 1661.2, 1975.5].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.085);
      g.gain.setValueAtTime(0.001, now + idx * 0.085);
      g.gain.exponentialRampToValueAtTime(0.34, now + idx * 0.085 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.085 + 0.5);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.085); o.stop(now + idx * 0.085 + 0.54);
    });
  } else if (type === 'alarm') {
    [0, 0.14, 0.28, 0.42].forEach(off => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(2040, now + off);
      g.gain.setValueAtTime(0.001, now + off);
      g.gain.exponentialRampToValueAtTime(0.22, now + off + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0008, now + off + 0.09);
      o.connect(g); g.connect(masterGain);
      o.start(now + off); o.stop(now + off + 0.1);
    });
  } else if (type === 'birds') {
    [0, 0.22, 0.55].forEach((off, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      const base = idx % 2 === 0 ? 2400 : 2900;
      o.frequency.setValueAtTime(base, now + off);
      o.frequency.exponentialRampToValueAtTime(base * 1.35, now + off + 0.07);
      o.frequency.exponentialRampToValueAtTime(base * 0.9, now + off + 0.14);
      g.gain.setValueAtTime(0.001, now + off);
      g.gain.exponentialRampToValueAtTime(0.18, now + off + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0008, now + off + 0.15);
      o.connect(g); g.connect(masterGain);
      o.start(now + off); o.stop(now + off + 0.16);
    });
  } else if (type === 'sun_swell') {
    [293.66, 369.99, 440.0, 587.33].forEach(freq => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.001, now);
      g.gain.exponentialRampToValueAtTime(0.16, now + 0.35);
      g.gain.exponentialRampToValueAtTime(0.0008, now + 1.6);
      o.connect(g); g.connect(masterGain);
      o.start(now); o.stop(now + 1.65);
    });
  } else if (type === 'wind' || type === 'waves') {
    const dur = type === 'waves' ? 1.8 : 1.3;
    const buf = actx.createBuffer(1, actx.sampleRate * dur, actx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    src.buffer = buf;
    f.type = 'lowpass';
    f.frequency.setValueAtTime(type === 'waves' ? 420 : 620, now);
    f.frequency.exponentialRampToValueAtTime(180, now + dur);
    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.32, now + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    src.connect(f); f.connect(g); g.connect(masterGain);
    src.start(now);
  } else if (type === 'footsteps') {
    [0, 0.32, 0.64].forEach(off => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(140, now + off);
      o.frequency.exponentialRampToValueAtTime(48, now + off + 0.08);
      g.gain.setValueAtTime(0.001, now + off);
      g.gain.exponentialRampToValueAtTime(0.28, now + off + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, now + off + 0.09);
      o.connect(g); g.connect(masterGain);
      o.start(now + off); o.stop(now + off + 0.1);
    });
  } else if (type === 'door_open') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(520, now);
    o.frequency.exponentialRampToValueAtTime(140, now + 0.12);
    g.gain.setValueAtTime(0.28, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.15);
  } else if (type === 'spark') {
    [1567.98, 2093.0, 2637.02, 3135.96].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.045);
      g.gain.setValueAtTime(0.001, now + idx * 0.045);
      g.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.045 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.045 + 0.35);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.045); o.stop(now + idx * 0.045 + 0.38);
    });
  } else if (type === 'heartbeat') {
    [0, 0.22].forEach((offset, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(idx === 0 ? 78 : 64, now + offset);
      o.frequency.exponentialRampToValueAtTime(28, now + offset + 0.16);
      g.gain.setValueAtTime(0.001, now + offset);
      g.gain.exponentialRampToValueAtTime(idx === 0 ? 0.32 : 0.22, now + offset + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0008, now + offset + 0.18);
      o.connect(g); g.connect(masterGain);
      o.start(now + offset); o.stop(now + offset + 0.2);
    });
  } else if (type === 'swipe' || type === 'whoosh') {
    const buf = actx.createBuffer(1, actx.sampleRate * 0.3, actx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    src.buffer = buf;
    f.type = 'bandpass';
    f.Q.value = 1.4;
    f.frequency.setValueAtTime(320, now);
    f.frequency.exponentialRampToValueAtTime(1750, now + 0.22);
    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.38, now + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    src.connect(f); f.connect(g); g.connect(masterGain);
    src.start(now);
  } else if (type === 'chime') {
    [587.33, 880, 1318.5].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.07);
      g.gain.setValueAtTime(0.001, now + idx * 0.07);
      g.gain.exponentialRampToValueAtTime(0.24, now + idx * 0.07 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.07 + 0.85);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.07); o.stop(now + idx * 0.07 + 0.9);
    });
  } else if (type === 'boom') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(125, now);
    o.frequency.exponentialRampToValueAtTime(32, now + 0.8);
    g.gain.setValueAtTime(0.52, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.88);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.9);
  } else if (type === 'lock') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(1150, now);
    o.frequency.exponentialRampToValueAtTime(160, now + 0.045);
    g.gain.setValueAtTime(0.42, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.07);
  }
}

function processFrameAudio(t) {
  if (!soundOn || !isPlaying() || isDragging) return;

  if (typeof SCENE_DATA !== 'undefined' && SCENE_DATA.sfx) {
    SCENE_DATA.sfx.forEach((item, i) => {
      if (!firedSfx.has(i) && t >= item.at && t < item.at + 0.3) {
        firedSfx.add(i);
        triggerSFX(item.type);
      }
    });
  }

  const secInt = Math.floor(t);
  if (t < DUR - 3.6 && secInt !== lastTickSec) {
    lastTickSec = secInt;
    playClockTick();
  }
}

function toggleSound() {
  ensureAudio();
  if (actx.state === 'suspended') actx.resume();
  soundOn = !soundOn;
  if (soundBtn) {
    soundBtn.classList.toggle('on', soundOn);
    soundBtn.innerHTML = soundOn ? '<span>🔊</span>Sound' : '<span>🔇</span>Sound';
  }
  updateAmbientGain();
  if (soundOn) triggerSFX('chime');
}

function toggleCC() {
  ccOn = !ccOn;
  if (ccBtn) ccBtn.classList.toggle('on', ccOn);
  updateCaptions(playhead.t);
}

function seekTo(sec) {
  const clamped = Math.max(0, Math.min(DUR, sec));
  lastTickSec = Math.floor(clamped);
  firedSfx.clear();
  if (typeof SCENE_DATA !== 'undefined' && SCENE_DATA.sfx) {
    SCENE_DATA.sfx.forEach((item, i) => {
      if (item.at < clamped) firedSfx.add(i);
    });
  }
  if (masterTL) masterTL.time(clamped, true);
  playhead.t = clamped;
  updateCaptions(clamped);
  if (timeEl) timeEl.textContent = `${fmt(clamped)} / ${fmt(DUR)}`;
  if (!isDragging && scrub) {
    scrub.value = String(Math.round((clamped / DUR) * 1000));
  }
}

function togglePlay() {
  if (!masterTL) return;
  if (masterTL.paused()) {
    if (masterTL.progress() >= 0.999) {
      replay();
      return;
    }
    masterTL.play();
    updatePlayButtonUI(true);
    updateAmbientGain(true);
  } else {
    masterTL.pause();
    updatePlayButtonUI(false);
    updateAmbientGain(false);
  }
}

function replay() {
  isDragging = false;
  resizeCanvas();
  window.CAM.shake = 0;
  window.CAM.flash = 0;
  seekTo(0);
  if (scrub) scrub.value = '0';
  if (masterTL) masterTL.play(0);
  updatePlayButtonUI(true);
  updateAmbientGain(true);
}

// Smooth Touch Drag Scrubber
if (scrub) {
  const startDrag = () => {
    if (!isDragging) {
      isDragging = true;
      wasPlayingBeforeDrag = isPlaying();
      if (masterTL) masterTL.pause();
      updateAmbientGain(false);
    }
  };
  const endDrag = () => {
    if (isDragging) {
      isDragging = false;
      if (masterTL && wasPlayingBeforeDrag && playhead.t < DUR - 0.05) {
        masterTL.play();
        updatePlayButtonUI(true);
        updateAmbientGain(true);
      } else {
        updatePlayButtonUI(false);
        updateAmbientGain(false);
      }
    }
  };

  scrub.addEventListener('pointerdown', startDrag);
  scrub.addEventListener('touchstart', startDrag, { passive: true });
  scrub.addEventListener('input', () => {
    const targetSec = (Number(scrub.value) / 1000) * DUR;
    seekTo(targetSec);
  });
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('pointercancel', endDrag);
}

if (playBtn) playBtn.addEventListener('click', togglePlay);
if (replayBtn) replayBtn.addEventListener('click', replay);
if (soundBtn) soundBtn.addEventListener('click', toggleSound);
if (ccBtn) ccBtn.addEventListener('click', toggleCC);
if (ratioBtn) ratioBtn.addEventListener('click', toggleRatio);
if (fsBtn) {
  fsBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) stage.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  });
}
document.addEventListener('fullscreenchange', () => {
  document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement);
  setTimeout(resizeCanvas, 60);
});

buildMasterTimeline();

// GSAP Ticker Driven 60FPS Render Loop With Automatic Camera Shake & Exposure Flash
function renderCanvasFrame() {
  if (canvas.width > 0 && canvas.height > 0 && typeof SCENE_DATA !== 'undefined' && typeof SCENE_DATA.render === 'function') {
    try {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (window.CAM.shake > 0.05) {
        const sx = (Math.random() - 0.5) * window.CAM.shake;
        const sy = (Math.random() - 0.5) * window.CAM.shake;
        ctx.translate(sx, sy);
      }
      SCENE_DATA.render(ctx, canvas.width, canvas.height, playhead.t);

      // Subtle GSAP Cinema Exposure Flash on Key Transitions
      if (window.CAM.flash > 0.005) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = `rgba(235, 245, 255, ${window.CAM.flash})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    } catch (err) {
      console.error('Render frame error:', err);
    }
  }
}

if (hasGSAP) {
  gsap.ticker.add(renderCanvasFrame);
} else {
  requestAnimationFrame(function fallbackLoop() {
    renderCanvasFrame();
    requestAnimationFrame(fallbackLoop);
  });
}
