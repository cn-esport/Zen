// ==========================================
// ZEN CINEMA ENGINE V5 — 60FPS HTML5 CANVAS + VOLUMETRIC LIGHTING + SFX
// ==========================================
const $ = s => document.querySelector(s);
const stage = $('#stage'), caps = $('#caps'), fade = $('#fade');
const playBtn = $('#play'), soundBtn = $('#sound'), scrub = $('#scrub'), timeEl = $('#time'), fsBtn = $('#fs');

let DUR = 50, playing = true, soundOn = false;
let currentTime = 0, lastFrame = performance.now();
let actx = null, masterGain = null, tickTimer = null, firedSfx = new Set();

// Create High-DPI Cinema Canvas inside #stage
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
  if (!caps || typeof SCENE_DATA === 'undefined') return;
  DUR = SCENE_DATA.duration || 50;
  document.documentElement.style.setProperty('--dur', DUR + 's');
  caps.innerHTML = '';
  (SCENE_DATA.captions || []).forEach(c => {
    const d = document.createElement('div');
    d.className = 'cap';
    d.dataset.start = c.start;
    d.dataset.end = c.start + c.length;
    d.textContent = c.text;
    d.style.cssText = 'opacity:0;transform:translate(-50%,8px);transition:opacity .35s ease,transform .35s ease;';
    caps.appendChild(d);
  });
}

function updateCaptions(t) {
  if (!caps) return;
  caps.querySelectorAll('.cap').forEach(el => {
    const s = parseFloat(el.dataset.start), e = parseFloat(el.dataset.end);
    const active = t >= s && t <= e;
    el.style.opacity = active ? '1' : '0';
    el.style.transform = active ? 'translate(-50%, 0px)' : 'translate(-50%, 8px)';
  });
  if (fade) {
    if (t < 1.0) fade.style.opacity = String(1 - t);
    else if (t > DUR - 0.8) fade.style.opacity = String((t - (DUR - 0.8)) / 0.8);
    else fade.style.opacity = '0';
  }
}

// ==========================================
// WEB AUDIO CINEMA SYNTH & TIMELINE SFX
// ==========================================
function ensureAudio() {
  if (actx) return;
  actx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = actx.createGain();
  masterGain.gain.value = 0.0001;
  masterGain.connect(actx.destination);

  // Deep Dark Ambient Drone (A1 + E2)
  const o1 = actx.createOscillator(), o2 = actx.createOscillator(), lp = actx.createBiquadFilter(), g = actx.createGain();
  o1.type = 'sine'; o1.frequency.value = 55;
  o2.type = 'triangle'; o2.frequency.value = 82.41;
  lp.type = 'lowpass'; lp.frequency.value = 165; g.gain.value = 0.24;
  o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(masterGain);
  o1.start(); o2.start();
}

function triggerSFX(type) {
  if (!actx || !soundOn) return;
  const now = actx.currentTime;
  if (type === 'notification') {
    [1318.5, 1975.5].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(freq, now + idx * 0.09);
      g.gain.setValueAtTime(0.001, now + idx * 0.09);
      g.gain.exponentialRampToValueAtTime(0.14, now + idx * 0.09 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.09 + 0.35);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.09); o.stop(now + idx * 0.09 + 0.38);
    });
  } else if (type === 'swipe' || type === 'whoosh') {
    const buf = actx.createBuffer(1, actx.sampleRate * 0.28, actx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    src.buffer = buf; f.type = 'bandpass';
    f.frequency.setValueAtTime(320, now); f.frequency.exponentialRampToValueAtTime(1450, now + 0.22);
    g.gain.setValueAtTime(0.001, now); g.gain.exponentialRampToValueAtTime(0.15, now + 0.06);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.27);
    src.connect(f); f.connect(g); g.connect(masterGain); src.start(now);
  } else if (type === 'chime') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(1046.5, now);
    g.gain.setValueAtTime(0.001, now); g.gain.exponentialRampToValueAtTime(0.11, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.65);
    o.connect(g); g.connect(masterGain); o.start(now); o.stop(now + 0.68);
  } else if (type === 'boom') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(92, now); o.frequency.exponentialRampToValueAtTime(30, now + 0.75);
    g.gain.setValueAtTime(0.28, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    o.connect(g); g.connect(masterGain); o.start(now); o.stop(now + 0.82);
  } else if (type === 'lock') {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(920, now); o.frequency.exponentialRampToValueAtTime(170, now + 0.05);
    g.gain.setValueAtTime(0.22, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    o.connect(g); g.connect(masterGain); o.start(now); o.stop(now + 0.07);
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

function toggleSound() {
  ensureAudio();
  if (actx.state === 'suspended') actx.resume();
  soundOn = !soundOn;
  masterGain.gain.setTargetAtTime(soundOn ? 0.85 : 0.0001, actx.currentTime, 0.2);
  if (soundBtn) soundBtn.classList.toggle('on', soundOn);
  clearInterval(tickTimer);
  if (soundOn) {
    tickTimer = setInterval(() => {
      if (!playing || !soundOn || !actx || currentTime >= 46.4) return;
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = 'triangle'; o.frequency.setValueAtTime(840, t); o.frequency.exponentialRampToValueAtTime(240, t + 0.025);
      g.gain.setValueAtTime(0.001, t); g.gain.exponentialRampToValueAtTime(0.07, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0008, t + 0.045);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t + 0.05);
    }, 1000);
  }
}

// Controls
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
  if (playBtn) playBtn.innerHTML = playing ? '<span>❚❚</span>Pause' : '<span>▶</span>Play';
}

function replay() {
  seekTo(0);
  playing = true;
  if (playBtn) playBtn.innerHTML = '<span>❚❚</span>Pause';
}

if (fsBtn) fsBtn.onclick = () => {
  if (!document.fullscreenElement) stage.requestFullscreen().catch(() => {});
  else document.exitFullscreen();
};
document.addEventListener('fullscreenchange', () => {
  document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement);
  setTimeout(resizeCanvas, 60);
});
function setRatio(v) {
  document.body.classList.toggle('v', v === '9:16');
  if ($('#r16')) $('#r16').classList.toggle('on', v === '16:9');
  if ($('#r9')) $('#r9').classList.toggle('on', v === '9:16');
  setTimeout(resizeCanvas, 60);
  replay();
}
if ($('#r16')) $('#r16').onclick = () => setRatio('16:9');
if ($('#r9')) $('#r9').onclick = () => setRatio('9:16');
if (playBtn) playBtn.onclick = togglePlay;
if ($('#replay')) $('#replay').onclick = replay;
if (soundBtn) soundBtn.onclick = toggleSound;
if (scrub) scrub.oninput = () => { playing = false; if (playBtn) playBtn.innerHTML = '<span>▶</span>Play'; seekTo((scrub.value / 1000) * DUR); };

setupCaptions();
setRatio('9:16');

// Main 60FPS Render Loop
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
      if (playBtn) playBtn.innerHTML = '<span>▶</span>Play';
    }
  }

  updateCaptions(currentTime);
  if (typeof SCENE_DATA !== 'undefined' && typeof SCENE_DATA.render === 'function') {
    SCENE_DATA.render(ctx, canvas.width, canvas.height, currentTime);
  }
  requestAnimationFrame(loop);
});
