// ==========================================
// ZEN CINEMA ENGINE V7 — PUNCHY AUDIO DESIGN + LOCKED BOTTOM CONTROLS
// ==========================================
const $ = s => document.querySelector(s);
const stage = $('#stage'), caps = $('#caps'), fade = $('#fade');
const playBtn = $('#play'), soundBtn = $('#sound'), ccBtn = $('#cc');
const scrub = $('#scrub'), timeEl = $('#time'), fsBtn = $('#fs'), replayBtn = $('#replay');

let DUR = 50, playing = true, soundOn = false, ccOn = true;
let currentTime = 0, lastFrame = performance.now();
let actx = null, masterGain = null, compressor = null, tickTimer = null, firedSfx = new Set();

// Inject High-DPI Cinema Canvas inside #stage
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

// ==========================================
// CINEMA-GRADE WEB AUDIO ENGINE (LOUD & CLEAR ON MOBILE SPEAKERS)
// ==========================================
function ensureAudio() {
  if (actx) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  actx = new AudioCtx();

  // Dynamics Compressor boosts phone speaker loudness cleanly without clipping
  compressor = actx.createDynamicsCompressor();
  compressor.threshold.value = -16;
  compressor.knee.value = 18;
  compressor.ratio.value = 6;
  compressor.attack.value = 0.005;
  compressor.release.value = 0.2;

  masterGain = actx.createGain();
  masterGain.gain.value = 0.0001;
  masterGain.connect(compressor);
  compressor.connect(actx.destination);

  // Rich 3-Layer Dark Cinema Ambient Pad (D2 + A2 + F3 minor mood)
  const freqs = [73.42, 110.0, 174.61];
  freqs.forEach((f, idx) => {
    const osc = actx.createOscillator();
    const lp = actx.createBiquadFilter();
    const g = actx.createGain();
    osc.type = idx === 0 ? 'sawtooth' : 'triangle';
    osc.frequency.value = f;
    lp.type = 'lowpass';
    lp.frequency.value = idx === 0 ? 190 : 320;
    g.gain.value = idx === 0 ? 0.22 : 0.14;
    osc.connect(lp);
    lp.connect(g);
    g.connect(masterGain);
    osc.start();
  });
}

function triggerSFX(type) {
  if (!actx || !soundOn) return;
  const now = actx.currentTime;

  if (type === 'notification') {
    // Realistic 3-note bright phone notification chime
    [1318.5, 1661.2, 1975.5].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.085);
      g.gain.setValueAtTime(0.001, now + idx * 0.085);
      g.gain.exponentialRampToValueAtTime(0.38, now + idx * 0.085 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.085 + 0.45);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.085);
      o.stop(now + idx * 0.085 + 0.48);
    });
  } else if (type === 'swipe' || type === 'whoosh') {
    // Punchy tactile finger-flick whoosh
    const buf = actx.createBuffer(1, actx.sampleRate * 0.32, actx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    src.buffer = buf;
    f.type = 'bandpass';
    f.Q.value = 1.6;
    f.frequency.setValueAtTime(380, now);
    f.frequency.exponentialRampToValueAtTime(1900, now + 0.22);
    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.45, now + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
    src.connect(f); f.connect(g); g.connect(masterGain);
    src.start(now);
  } else if (type === 'chime') {
    // Sparkling Dopamine Harmonic Bell (A5 + E6)
    [880, 1318.5].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.06);
      g.gain.setValueAtTime(0.001, now + idx * 0.06);
      g.gain.exponentialRampToValueAtTime(0.32, now + idx * 0.06 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.06 + 0.75);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.06);
      o.stop(now + idx * 0.06 + 0.8);
    });
  } else if (type === 'boom') {
    // Heavy Cinema Sub-Bass Impact + Filtered Thud
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(135, now);
    o.frequency.exponentialRampToValueAtTime(36, now + 0.65);
    g.gain.setValueAtTime(0.55, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.72);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.75);
  } else if (type === 'lock') {
    // Sharp tactile phone screen-off click
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(1200, now);
    o.frequency.exponentialRampToValueAtTime(190, now + 0.045);
    g.gain.setValueAtTime(0.42, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.065);
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
  masterGain.gain.setTargetAtTime(1.0, actx.currentTime, 0.12);
  if (soundBtn) {
    soundBtn.classList.add('on');
    soundBtn.innerHTML = '<span>🔊</span>Sound On';
  }
  clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    if (!playing || !soundOn || !actx || currentTime >= 46.4) return;
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
    o.type = 'triangle';
    o.frequency.setValueAtTime(980, t);
    o.frequency.exponentialRampToValueAtTime(280, t + 0.025);
    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.045);
    o.connect(g); g.connect(masterGain);
    o.start(t); o.stop(t + 0.05);
  }, 1000);
}

function toggleSound() {
  if (!soundOn) {
    enableSoundNow();
    triggerSFX('chime'); // Immediate audible confirmation when tapped
  } else {
    soundOn = false;
    if (masterGain && actx) masterGain.gain.setTargetAtTime(0.0001, actx.currentTime, 0.12);
    if (soundBtn) {
      soundBtn.classList.remove('on');
      soundBtn.innerHTML = '<span>🔇</span>Sound Off';
    }
    clearInterval(tickTimer);
  }
}

// Auto-unlock audio on first tap on the stage if user hasn't tapped Sound yet
if (stage) {
  stage.addEventListener('click', () => {
    if (!soundOn) enableSoundNow();
  }, { once: true });
}

function toggleCC() {
  ccOn = !ccOn;
  if (ccBtn) {
    ccBtn.classList.toggle('on', ccOn);
    ccBtn.innerHTML = ccOn ? '<span>CC</span>Subtitles' : '<span>CC</span>Off';
  }
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
