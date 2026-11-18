// ==========================================
// CORE STUDIO ENGINE (V2: SFX TIMELINE + FLOATING CAPTIONS)
// ==========================================
const $ = s => document.querySelector(s);
const stage = $('#stage'), camera = $('#camera'), dust = $('#dust'), caps = $('#caps'), fade = $('#fade');
const playBtn = $('#play'), soundBtn = $('#sound'), scrub = $('#scrub'), timeEl = $('#time'), fsBtn = $('#fs');

let DUR = 15, SOUND = 'wind';
let startT = 0, pausedAt = 0, playing = true, soundOn = false;
let actx = null, sndTimer = null, masterGain = null, sfxTimers = [];

function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }
function fmt(s) { return `${pad(s / 60)}:${pad(s % 60)}`; }

// 1. Load SCENE_DATA
function loadScene() {
  if (typeof SCENE_DATA === 'undefined') return;
  DUR = SCENE_DATA.duration || 15;
  SOUND = SCENE_DATA.sound || 'wind';
  document.documentElement.style.setProperty('--dur', DUR + 's');

  ['bg', 'mid', 'char', 'fg'].forEach(k => {
    const el = $('#L-' + k);
    if (el && SCENE_DATA.layers[k]) el.innerHTML = SCENE_DATA.layers[k];
  });

  // Captions (supports optional x, y for Last Soul floating dialogue above character)
  caps.innerHTML = '';
  (SCENE_DATA.captions || []).forEach(c => {
    const d = document.createElement('div');
    d.className = 'cap';
    d.textContent = c.text;
    d.style.setProperty('--s', c.start + 's');
    d.style.setProperty('--l', c.length + 's');
    if (c.x) d.style.setProperty('--cx', c.x);
    if (c.y) d.style.setProperty('--cy', c.y);
    caps.appendChild(d);
  });

  // Floating Dust Motes
  dust.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const m = document.createElement('i'), sz = (1.5 + Math.random() * 2.5).toFixed(1);
    m.style.cssText = `width:${sz}px;height:${sz}px;left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 100).toFixed(1)}%;--dx:${(-30 + Math.random() * 60).toFixed(0)}px;--dy:${(-70 - Math.random() * 60).toFixed(0)}px;animation-duration:${(9 + Math.random() * 11).toFixed(1)}s;animation-delay:${(-Math.random() * 14).toFixed(1)}s`;
    dust.appendChild(m);
  }
}

// 2. Web Audio Synthesizer + Timeline SFX Library
function ensureAudio() {
  if (actx) return;
  actx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = actx.createGain();
  masterGain.gain.value = 0.0001;
  masterGain.connect(actx.destination);

  // Subtle Dark Ambient Pad
  const o1 = actx.createOscillator(), o2 = actx.createOscillator(), lp = actx.createBiquadFilter(), g = actx.createGain();
  o1.type = 'sine'; o1.frequency.value = 55;
  o2.type = 'triangle'; o2.frequency.value = 82.41;
  lp.type = 'lowpass'; lp.frequency.value = 180; g.gain.value = 0.22;
  o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(masterGain);
  o1.start(); o2.start();
}

function playOneShotSFX(type) {
  if (!actx || !soundOn) return;
  const now = actx.currentTime;

  if (type === 'notification') {
    // Crisp 2-tone smartphone chime (E6 -> B6)
    [1318.5, 1975.5].forEach((freq, idx) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.09);
      g.gain.setValueAtTime(0.001, now + idx * 0.09);
      g.gain.exponentialRampToValueAtTime(0.14, now + idx * 0.09 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.09 + 0.35);
      o.connect(g); g.connect(masterGain);
      o.start(now + idx * 0.09); o.stop(now + idx * 0.09 + 0.38);
    });
  } else if (type === 'whoosh' || type === 'swipe') {
    // Soft filtered air swipe
    const buf = actx.createBuffer(1, actx.sampleRate * 0.35, actx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    src.buffer = buf; f.type = 'bandpass';
    f.frequency.setValueAtTime(300, now);
    f.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.16, now + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
    src.connect(f); f.connect(g); g.connect(masterGain);
    src.start(now);
  } else if (type === 'chime') {
    // Ethereal dopamine/magic ping
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(1046.5, now);
    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.6);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.62);
  } else if (type === 'lock' || type === 'click') {
    // Sharp phone screen lock click
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(900, now);
    o.frequency.exponentialRampToValueAtTime(180, now + 0.05);
    g.gain.setValueAtTime(0.2, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.07);
  } else if (type === 'boom') {
    // Cinematic low sub-drop on scene change
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(95, now);
    o.frequency.exponentialRampToValueAtTime(32, now + 0.7);
    g.gain.setValueAtTime(0.28, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    o.connect(g); g.connect(masterGain);
    o.start(now); o.stop(now + 0.8);
  }
}

function scheduleTimelineSFX(offsetSec = 0) {
  sfxTimers.forEach(clearTimeout);
  sfxTimers = [];
  if (!SCENE_DATA || !SCENE_DATA.sfx) return;
  SCENE_DATA.sfx.forEach(item => {
    const delayMs = (item.at - offsetSec) * 1000;
    if (delayMs >= 0) {
      sfxTimers.push(setTimeout(() => playOneShotSFX(item.type), delayMs));
    }
  });
}

function startSoundLoop() {
  clearInterval(sndTimer);
  if (SOUND === 'clock') {
    sndTimer = setInterval(() => {
      if (!playing || !soundOn || !actx) return;
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = 'triangle'; o.frequency.setValueAtTime(820, t); o.frequency.exponentialRampToValueAtTime(240, t + 0.03);
      g.gain.setValueAtTime(0.001, t); g.gain.exponentialRampToValueAtTime(0.09, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0008, t + 0.05);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t + 0.06);
    }, 1000);
  }
}

function toggleSound() {
  ensureAudio();
  if (actx.state === 'suspended') actx.resume();
  soundOn = !soundOn;
  masterGain.gain.setTargetAtTime(soundOn ? 0.85 : 0.0001, actx.currentTime, 0.25);
  soundBtn.classList.toggle('on', soundOn);
  if (soundOn) {
    startSoundLoop();
    const cur = playing ? Math.min((performance.now() - startT) / 1000, DUR) : pausedAt;
    scheduleTimelineSFX(cur);
  } else {
    sfxTimers.forEach(clearTimeout);
  }
}

// 3. Playback & Timeline Scrubber
function allAnims() { return stage.getAnimations({ subtree: true }); }
function setPlayState(run) {
  allAnims().forEach(a => run ? a.play() : a.pause());
  playBtn.innerHTML = run ? '<span>❚❚</span>Pause' : '<span>▶</span>Play';
}
function seekTo(sec) {
  sec = Math.max(0, Math.min(DUR, sec));
  allAnims().forEach(a => { a.currentTime = sec * 1000; });
  pausedAt = sec; startT = performance.now() - sec * 1000;
  scrub.value = (sec / DUR) * 1000;
  timeEl.textContent = `${fmt(sec)} / ${fmt(DUR)}`;
  if (soundOn && playing) scheduleTimelineSFX(sec);
}
function togglePlay() {
  if (playing) {
    pausedAt = Math.min((performance.now() - startT) / 1000, DUR);
    playing = false; setPlayState(false);
    sfxTimers.forEach(clearTimeout);
  } else {
    if (pausedAt >= DUR - 0.05) seekTo(0);
    startT = performance.now() - pausedAt * 1000;
    playing = true; setPlayState(true);
    if (soundOn) scheduleTimelineSFX(pausedAt);
  }
}
function replay() {
  seekTo(0); playing = true; setPlayState(true);
  if (soundOn) scheduleTimelineSFX(0);
}

// 4. Fullscreen & 9:16 Aspect Ratio
fsBtn.onclick = () => {
  if (!document.fullscreenElement) stage.requestFullscreen().catch(() => {});
  else document.exitFullscreen();
};
document.addEventListener('fullscreenchange', () => document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement));
function setRatio(v) {
  document.body.classList.toggle('v', v === '9:16');
  $('#r16').classList.toggle('on', v === '16:9');
  $('#r9').classList.toggle('on', v === '9:16');
  replay();
}
$('#r16').onclick = () => setRatio('16:9');
$('#r9').onclick = () => setRatio('9:16');
playBtn.onclick = togglePlay;
$('#replay').onclick = replay;
soundBtn.onclick = toggleSound;
scrub.oninput = () => {
  if (playing) { playing = false; setPlayState(false); }
  seekTo((scrub.value / 1000) * DUR);
};

// Init
loadScene();
setRatio('9:16');
startT = performance.now();
requestAnimationFrame(function tick(now) {
  if (playing) {
    const t = Math.min((now - startT) / 1000, DUR);
    scrub.value = (t / DUR) * 1000;
    timeEl.textContent = `${fmt(t)} / ${fmt(DUR)}`;
    if (t >= DUR) { playing = false; pausedAt = DUR; setPlayState(false); }
  }
  requestAnimationFrame(tick);
});
