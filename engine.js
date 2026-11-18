// ==========================================
// ZEN CINEMA ENGINE V9 — DUAL RATIO (16:9 / 9:16) + DEEP AUDIO + CONTROLS
// ==========================================
const $ = s => document.querySelector(s);
const stage = $('#stage'), caps = $('#caps'), fade = $('#fade');
const playBtn = $('#play'), soundBtn = $('#sound'), ccBtn = $('#cc');
const ratioBtn = $('#ratio'), studioLabel = $('#studio-label');
const scrub = $('#scrub'), timeEl = $('#time'), fsBtn = $('#fs'), replayBtn = $('#replay');

let DUR = 50, playing = true, soundOn = false, ccOn = true, isVertical = false;
let currentTime = 0, lastFrame = performance.now();
let actx = null, masterGain = null, compressor = null, tickTimer = null, heartbeatTimer = null, firedSfx = new Set();

const canvas = document.createElement('canvas');
canvas.id = 'cinema-canvas';
canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;z-index:2;';
if (stage) {
  const cam = $('#camera');
  if (cam) cam.style.display = 'none';
  const dust = $('#dust');
  if (dust) dust.style.display = 'none';
  stage.insertBefore(canvas, stage.firstChild);
}
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  if (!stage) return;
  const r = stage.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(r.width * dpr));
  canvas.height = Math.max(1, Math.floor(r.height * dpr));
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }
function fmt(s) { return `${pad(s / 60)}:${pad(s % 60)}`; }

function setupCaptions() {
  if (typeof SCENE_DATA !== 'undefined' && SCENE_DATA.duration) {
    DUR = SCENE_DATA.duration;
  }
  document.documentElement.style.setProperty('--dur', DUR + 's');
  if (timeEl) timeEl.textContent = `00:00 / ${fmt(DUR)}`;

  if (!caps || typeof SCENE_DATA === 'undefined') return;
  caps.innerHTML = '';
  (SCENE_DATA.captions || []).forEach(c => {
    const d = document.createElement('div');
    d.className = 'cap';
    d.dataset.start = c.start;
    d.dataset.end = c.start + c.length;
    d.textContent = c.text;
    d.style.cssText = 'opacity:0;transform:translate(-50%,8px);transition:opacity .32s ease,transform .32s ease;';
    caps.appendChild(d);
  });
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
    if (t < 0.8) fade.style.opacity = String(1 - t / 0.8);
    else if (t > DUR - 0.8) fade.style.opacity = String((t - (DUR - 0.8)) / 0.8);
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
    studioLabel.textContent = isVertical ? 'ZEN // 9:16 SHORTS' : 'ZEN // 16:9 YOUTUBE';
  }
  setTimeout(resizeCanvas, 50);
  setTimeout(resizeCanvas, 280);
}

// ==========================================
// CINEMA-GRADE WEB AUDIO ENGINE
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
    { f: 73.42, type: 'sine',     vol: 0.26, cut: 180 },
    { f: 110.0, type: 'triangle', vol: 0.16, cut: 280 },
    { f: 164.8, type: 'sine',     vol: 0.11, cut: 360 },
    { f: 174.6, type: 'sine',     vol: 0.10, cut: 360 }
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

function playHeartbeat() {
  if (!actx || !soundOn || !playing) return;
  const now = actx.currentTime;
  [0, 0.22].forEach((offset, idx) => {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(idx === 0 ? 78 : 64, now + offset);
    o.frequency.exponentialRampToValueAtTime(28, now + offset + 0.16);
    g.gain.setValueAtTime(0.001, now + offset);
    g.gain.exponentialRampToValueAtTime(idx === 0 ? 0.34 : 0.24, now + offset + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, now + offset + 0.18);
    o.connect(g); g.connect(masterGain);
    o.start(now + offset);
    o.stop(now + offset + 0.2);
  });
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
      g.gain.exponentialRampToValueAtTime(0.36, now + idx * 0.085 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.085 + 0.55);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.085);
      o.stop(now + idx * 0.085 + 0.58);
    });
  } else if (type === 'swipe' || type === 'whoosh') {
    const buf = actx.createBuffer(1, actx.sampleRate * 0.34, actx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    src.buffer = buf;
    f.type = 'bandpass';
    f.Q.value = 1.4;
    f.frequency.setValueAtTime(320, now);
    f.frequency.exponentialRampToValueAtTime(1750, now + 0.24);
    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.42, now + 0.06);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    src.connect(f); f.connect(g); g.connect(masterGain);
    src.start(now);
  } else if (type === 'chime') {
    [587.33, 880, 1318.5].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.07);
      g.gain.setValueAtTime(0.001, now + idx * 0.07);
      g.gain.exponentialRampToValueAtTime(0.26, now + idx * 0.07 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.07 + 0.95);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.07);
      o.stop(now + idx * 0.07 + 1.0);
    });
  } else if (type === 'boom') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(125, now);
    o.frequency.exponentialRampToValueAtTime(32, now + 0.85);
    g.gain.setValueAtTime(0.58, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.92);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.95);
  } else if (type === 'lock') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(1150, now);
    o.frequency.exponentialRampToValueAtTime(160, now + 0.045);
    g.gain.setValueAtTime(0.45, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.07);
  }
}

function checkTimelineSFX(t) {
  if (!soundOn || typeof SCENE_DATA === 'undefined' || !SCENE_DATA.sfx) return;
  SCENE_DATA.sfx.forEach((item, i) => {
    if (!firedSfx.has(i) && t >= item.at && t < item.at + 0.25) {
      firedSfx.add(i);
      triggerSFX(item.type);
    }
  });
}

function enableSoundNow() {
  ensureAudio();
  if (actx.state === 'suspended') actx.resume();
  soundOn = true;
  masterGain.gain.setTargetAtTime(1.0, actx.currentTime, 0.15);
  if (soundBtn) soundBtn.classList.add('on');
  clearInterval(tickTimer);
  clearInterval(heartbeatTimer);

  tickTimer = setInterval(() => {
    if (!playing || !soundOn || !actx || currentTime >= (DUR - 3.6)) return;
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
    o.type = 'triangle';
    o.frequency.setValueAtTime(940, t);
    o.frequency.exponentialRampToValueAtTime(260, t + 0.025);
    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.045);
    o.connect(g); g.connect(masterGain);
    o.start(t); o.stop(t + 0.05);
  }, 1000);

  heartbeatTimer = setInterval(() => {
    if (currentTime >= 14.3 && currentTime < 25.0) playHeartbeat();
  }, 1150);
}

function toggleSound() {
  if (!soundOn) {
    enableSoundNow();
    triggerSFX('chime');
  } else {
    soundOn = false;
    if (masterGain && actx) masterGain.gain.setTargetAtTime(0.0001, actx.currentTime, 0.15);
    if (soundBtn) soundBtn.classList.remove('on');
    clearInterval(tickTimer);
    clearInterval(heartbeatTimer);
  }
}

if (stage) {
  stage.addEventListener('click', () => {
    if (!soundOn) enableSoundNow();
  }, { once: true });
}

function toggleCC() {
  ccOn = !ccOn;
  if (ccBtn) ccBtn.classList.toggle('on', ccOn);
  updateCaptions(currentTime);
}

function seekTo(sec) {
  currentTime = Math.max(0, Math.min(DUR, sec));
  firedSfx.clear();
  if (typeof SCENE_DATA !== 'undefined' && SCENE_DATA.sfx) {
    SCENE_DATA.sfx.forEach((item, i) => { if (item.at < currentTime) firedSfx.add(i); });
  }
  updateCaptions(currentTime);
  if (scrub) scrub.value = (currentTime / DUR) * 1000;
  if (timeEl) timeEl.textContent = `${fmt(currentTime)} / ${fmt(DUR)}`;
}

function togglePlay() {
  if (!playing && currentTime >= DUR - 0.05) seekTo(0);
  playing = !playing;
  if (playBtn) {
    playBtn.classList.toggle('on', playing);
    playBtn.innerHTML = playing ? '<span>❚❚</span>Pause' : '<span>▶</span>Play';
  }
}

function replay() {
  seekTo(0);
  playing = true;
  if (playBtn) {
    playBtn.classList.add('on');
    playBtn.innerHTML = '<span>❚❚</span>Pause';
  }
}

if (fsBtn) {
  fsBtn.onclick = () => {
    if (!document.fullscreenElement) stage.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  };
}
document.addEventListener('fullscreenchange', () => {
  document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement);
  setTimeout(resizeCanvas, 60);
});

if (playBtn) playBtn.onclick = togglePlay;
if (replayBtn) replayBtn.onclick = replay;
if (soundBtn) soundBtn.onclick = toggleSound;
if (ccBtn) ccBtn.onclick = toggleCC;
if (ratioBtn) ratioBtn.onclick = toggleRatio;
if (scrub) {
  scrub.oninput = () => {
    playing = false;
    if (playBtn) {
      playBtn.classList.remove('on');
      playBtn.innerHTML = '<span>▶</span>Play';
    }
    seekTo((scrub.value / 1000) * DUR);
  };
}

setupCaptions();
lastFrame = performance.now();

requestAnimationFrame(function loop(now) {
  const dt = Math.min((now - lastFrame) / 1000, 0.1);
  lastFrame = now;

  if (playing) {
    currentTime = Math.min(currentTime + dt, DUR);
    checkTimelineSFX(currentTime);
    if (scrub) scrub.value = (currentTime / DUR) * 1000;
    if (timeEl) timeEl.textContent = `${fmt(currentTime)} / ${fmt(DUR)}`;
    if (currentTime >= DUR) {
      playing = false;
      if (playBtn) {
        playBtn.classList.remove('on');
        playBtn.innerHTML = '<span>▶</span>Play';
      }
    }
  }

  updateCaptions(currentTime);
  if (typeof SCENE_DATA !== 'undefined' && typeof SCENE_DATA.render === 'function') {
    SCENE_DATA.render(ctx, canvas.width, canvas.height, currentTime);
  }
  requestAnimationFrame(loop);
});
