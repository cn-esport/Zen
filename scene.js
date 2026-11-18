// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (5-SHOT MULTI-SCENE • 50s)
// Fixed: Head position above shoulders + Phone screen <clipPath> + Polished lighting
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sound: "clock",
  captions: [
    { start: 0.3, length: 3.6, text: "It’s 2:00 AM. Your eyes are burning, your body is exhausted—yet your thumb refuses to stop scrolling." },
    { start: 4.3, length: 4.9, text: "You tell yourself, 'Just one more video.' Thirty minutes later, you're still awake." },
    { start: 9.5, length: 5.1, text: "That’s not a lack of willpower—your brain is caught in a slot-machine loop." },
    { start: 15.3, length: 6.4, text: "Every swipe gives you a tiny hit of dopamine—not because the video is good," },
    { start: 22.0, length: 7.5, text: "but because your brain is addicted to the unpredictability of what might come next." },
    { start: 30.3, length: 5.7, text: "At the same time, that blue screen tricks your brain into thinking it’s noon," },
    { start: 36.3, length: 5.5, text: "completely shutting down melatonin—the exact hormone you need to fall asleep." },
    { start: 42.3, length: 4.0, text: "You aren't watching the feed anymore. The feed is keeping you hostage." },
    { start: 46.6, length: 3.0, text: "Put it down... and go to sleep." }
  ],
  layers: {
    // LAYER 1: Shared Defs, ClipPaths, Scene Switcher & Background Worlds
    bg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050811"/>
          <stop offset=".55" stop-color="#0b1426"/>
          <stop offset="1" stop-color="#13213b"/>
        </linearGradient>

        <radialGradient id="phoneGlow">
          <stop offset="0" stop-color="#4da6ff" stop-opacity=".9"/>
          <stop offset=".4" stop-color="#2b7de9" stop-opacity=".35"/>
          <stop offset="1" stop-color="#1a4b8c" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="phoneBeam" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stop-color="#7cc2ff" stop-opacity=".6"/>
          <stop offset=".65" stop-color="#3a8ee6" stop-opacity=".16"/>
          <stop offset="1" stop-color="#3a8ee6" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="brainGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#1d63b8" stop-opacity=".85"/>
          <stop offset="1" stop-color="#80d4ff" stop-opacity=".95"/>
        </linearGradient>

        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#66b8ff" stop-opacity="0"/>
          <stop offset=".55" stop-color="#66b8ff" stop-opacity=".3"/>
          <stop offset="1" stop-color="#b3dcff" stop-opacity=".95"/>
        </linearGradient>

        <!-- ClipPath so scrolling cards stay strictly INSIDE the phone screen -->
        <clipPath id="screenClip">
          <rect x="22" y="34" width="336" height="692" rx="28"/>
        </clipPath>

        <filter id="eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="8" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="neonGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="7" result="g1"/>
          <feMerge><feMergeNode in="g1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="soft"><feGaussianBlur stdDeviation="35"/></filter>

        <style>
          /* ===== HARD SCENE CUT TIMELINE (50 SECONDS) ===== */
          .cut-1 { opacity: 1; animation: cutOut 0.15s linear 4.0s forwards; }
          .cut-2 { opacity: 0; animation: cutIn 0.15s linear 4.0s forwards, cutOut 0.15s linear 15.0s forwards; }
          .cut-3 { opacity: 0; animation: cutIn 0.15s linear 15.0s forwards, cutOut 0.15s linear 30.0s forwards; }
          .cut-4 { opacity: 0; animation: cutIn 0.15s linear 30.0s forwards, cutOut 0.15s linear 42.0s forwards; }
          .cut-5 { opacity: 0; animation: cutIn 0.15s linear 42.0s forwards; }

          @keyframes cutIn  { to { opacity: 1; } }
          @keyframes cutOut { to { opacity: 0; } }

          .s1-light { opacity: 0; animation: cutIn 0.4s ease-out 0.5s forwards; }

          /* Scene 2: Close-up Thumb Swipe & Clipped Feed Scroll (4s - 15s) */
          .big-thumb {
            transform-box: fill-box;
            transform-origin: 85% 85%;
            animation: bigSwipe 1.1s ease-in-out 4.0s 10;
          }
          @keyframes bigSwipe {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            45%      { transform: translateY(-65px) rotate(-12deg); }
          }

          .feed-card {
            animation: scrollFeed 1.1s linear 4.0s 10;
          }
          @keyframes scrollFeed {
            0%   { transform: translateY(0px); }
            100% { transform: translateY(-200px); }
          }

          .coin {
            opacity: 0;
            animation: coinBurst 1.1s ease-out var(--d, 4.2s) 10;
          }
          @keyframes coinBurst {
            0%   { transform: translate(0, 0) scale(0.5); opacity: 0; }
            25%  { opacity: 1; }
            100% { transform: translate(var(--cx, -80px), -360px) scale(1.2); opacity: 0; }
          }

          /* Scene 3: Inside Brain Chamber Dopamine Wave (15s - 30s) */
          .brain-zoom {
            transform-origin: 540px 940px;
            animation: slowBrainZoom 15s ease-out 15.0s forwards;
          }
          @keyframes slowBrainZoom {
            from { transform: scale(0.95); }
            to   { transform: scale(1.12); }
          }

          .dopa-surge {
            transform-box: fill-box;
            transform-origin: 50% 100%;
            animation: surgeWave 1.3s ease-in-out 15.0s 12;
          }
          @keyframes surgeWave {
            0%, 100% { transform: scaleY(0.35); opacity: 0.55; }
            45%      { transform: scaleY(1.22); opacity: 1; }
          }

          /* Scene 4: Blue Chains & Clock 02:00 -> 03:14 (30s - 42s) */
          .chain-draw {
            stroke-dasharray: 650;
            stroke-dashoffset: 650;
            animation: drawChains 2.4s ease-out 30.2s forwards;
          }
          @keyframes drawChains { to { stroke-dashoffset: 0; } }

          .clk-2 { animation: cutOut 0.1s linear 33.8s forwards; }
          .clk-3 { opacity: 0; animation: cutIn 0.2s linear 33.8s forwards; }

          /* Scene 5: Heartbeat Pulse in Total Darkness (42s - 50s) */
          .hb-ring {
            transform-box: fill-box;
            transform-origin: center;
            animation: hbPulse 1.1s ease-out 42.2s infinite;
          }
          @keyframes hbPulse {
            0%   { transform: scale(0.6); opacity: 0.45; }
            100% { transform: scale(2.4); opacity: 0; }
          }
        </style>
      </defs>

      <!-- Base Midnight Background -->
      <rect width="1080" height="1920" fill="url(#sky)"/>

      <!-- SCENE 1 BACKGROUND: Bedroom Window -->
      <g class="cut-1">
        <rect x="110" y="210" width="320" height="470" rx="10" fill="#13223d" opacity=".32" stroke="#060912" stroke-width="14"/>
        <line x1="270" y1="210" x2="270" y2="680" stroke="#060912" stroke-width="12" opacity=".4"/>
        <line x1="110" y1="445" x2="430" y2="445" stroke="#060912" stroke-width="12" opacity=".4"/>
      </g>

      <!-- SCENE 3 BACKGROUND: Dark Moody Neural Chamber Inside Head -->
      <g class="cut-3 brain-zoom">
        <rect width="1080" height="1920" fill="#040812"/>
        <circle cx="540" cy="940" r="470" fill="#081226" stroke="#2b7de9" stroke-width="4" opacity=".75"/>
        <circle cx="540" cy="940" r="420" fill="none" stroke="#4da6ff" stroke-width="1.5" stroke-dasharray="14 14" opacity=".45"/>
        <path class="dopa-surge" d="M130 1120 Q280 760 440 990 T740 820 T950 1050 L950 1320 L130 1320 Z" fill="url(#brainGrad)" filter="url(#neonGlow)"/>
        <circle cx="340" cy="760" r="10" fill="#99d6ff" filter="url(#neonGlow)"/>
        <circle cx="540" cy="690" r="14" fill="#ffe082" filter="url(#neonGlow)"/>
        <circle cx="730" cy="780" r="10" fill="#99d6ff" filter="url(#neonGlow)"/>
        <line x1="340" y1="760" x2="540" y2="690" stroke="#66b8ff" stroke-width="2" opacity=".6"/>
        <line x1="540" y1="690" x2="730" y2="780" stroke="#66b8ff" stroke-width="2" opacity=".6"/>
      </g>

      <!-- SCENE 4 BACKGROUND: Bedroom + Giant Digital Clock 02:00 -> 03:14 -->
      <g class="cut-4">
        <g transform="translate(650 420)">
          <rect x="0" y="0" width="330" height="135" rx="18" fill="#04070f" stroke="#24385c" stroke-width="4"/>
          <text class="clk-2" x="165" y="92" text-anchor="middle" fill="#4da6ff" font-family="monospace" font-size="76" font-weight="700" filter="url(#neonGlow)">02:00</text>
          <text class="clk-3" x="165" y="92" text-anchor="middle" fill="#ff5252" font-family="monospace" font-size="76" font-weight="700" filter="url(#neonGlow)">03:14</text>
        </g>
      </g>

      <!-- SCENE 5 BACKGROUND: Total Pitch Darkness + Faint Heartbeat Pulse -->
      <g class="cut-5">
        <rect width="1080" height="1920" fill="#020306"/>
        <circle class="hb-ring" cx="540" cy="860" r="120" fill="none" stroke="#2b7de9" stroke-width="3"/>
      </g>
    `,

    // LAYER 2: Midground Props per Cut
    mid: `
      <!-- SCENE 1: Bed & Cold Blue Phone Glow -->
      <g class="cut-1">
        <path d="M0 1420 Q420 1360 1080 1450 L1080 1920 L0 1920 Z" fill="#070a12"/>
        <g class="s1-light">
          <circle cx="620" cy="1120" r="360" fill="url(#phoneGlow)"/>
          <polygon points="595,1135 635,1135 455,890 265,1030" fill="url(#phoneBeam)"/>
        </g>
      </g>

      <!-- SCENE 4: Bed & Glow -->
      <g class="cut-4">
        <path d="M0 1420 Q420 1360 1080 1450 L1080 1920 L0 1920 Z" fill="#070a12"/>
        <circle cx="620" cy="1120" r="380" fill="url(#phoneGlow)"/>
      </g>

      <!-- SCENE 2: Close-Up Giant Glowing Smartphone Screen (Clipped Properly!) -->
      <g class="cut-2">
        <circle cx="540" cy="960" r="460" fill="url(#phoneGlow)"/>
        <g transform="translate(330 430) rotate(-8)">
          <!-- Outer Phone Bezel -->
          <rect x="0" y="0" width="380" height="760" rx="44" fill="#050811" stroke="#4da6ff" stroke-width="6" filter="url(#neonGlow)"/>
          <!-- Inner Dark Screen -->
          <rect x="22" y="34" width="336" height="692" rx="28" fill="#0b1933"/>
          <!-- Clipped Scrolling Video Cards (Never leaks outside screen!) -->
          <g clip-path="url(#screenClip)">
            <g class="feed-card" opacity=".65">
              <rect x="42" y="60"  width="296" height="175" rx="18" fill="#2b7de9"/>
              <rect x="42" y="260" width="296" height="175" rx="18" fill="#4da6ff"/>
              <rect x="42" y="460" width="296" height="175" rx="18" fill="#1d63b8"/>
              <rect x="42" y="660" width="296" height="175" rx="18" fill="#66b8ff"/>
              <rect x="42" y="860" width="296" height="175" rx="18" fill="#2b7de9"/>
            </g>
          </g>
          <!-- Top Speaker Notch -->
          <rect x="145" y="46" width="90" height="10" rx="5" fill="#050811"/>
        </g>
      </g>
    `,

    // LAYER 3: Character & Hero Action (Head Coordinates Set Directly Above Shoulders!)
    char: `
      <!-- SCENE 1 (0:00 - 0:04): Character Sitting in Bed, Head Properly Above Shoulders -->
      <g class="cut-1" transform="translate(420 1435)">
        <ellipse cx="40" cy="15" rx="280" ry="26" fill="#000" opacity=".8"/>
        <g class="breathe">
          <!-- Torso & Blanket (y = 20 up to -340) -->
          <path class="sil" d="M-190 20 Q-160 -260 -65 -340 L35 -340 Q110 -270 155 -110 L240 20 Z"/>
          <!-- Arms Holding Phone -->
          <path class="sil" d="M-15 -235 Q90 -175 195 -255 L215 -230 Q105 -135 -30 -190 Z"/>
          <!-- Smartphone -->
          <g transform="translate(198 -310) rotate(-18)">
            <rect x="0" y="0" width="18" height="110" rx="6" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
            <rect class="s1-light" x="-4" y="6" width="6" height="98" rx="3" fill="#cce8ff" filter="url(#neonGlow)"/>
          </g>
          <!-- HEAD PROPERLY ABOVE SHOULDERS (Direct cx="-15" cy="-435" so .head tilt never resets it!) -->
          <g class="head">
            <circle class="sil" cx="-15" cy="-435" r="76"/>
            <g class="eyes widen" style="--t:0.6s">
              <g class="eye-wrap L"><ellipse class="eye" cx="1" cy="-429" rx="11" ry="15"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="35" cy="-423" rx="11" ry="15"/></g>
            </g>
          </g>
        </g>
      </g>

      <!-- SCENE 2 (0:04 - 0:15): Close-Up Giant Silhouetted Thumb Swiping + Slot Coins -->
      <g class="cut-2">
        <path class="big-thumb sil" d="M880 1460 Q730 1210 545 1005 Q485 935 535 885 Q585 845 655 920 Q820 1095 1030 1310 Z"/>
        <g filter="url(#neonGlow)">
          <circle class="coin" style="--d:4.2s; --cx:-130px;" cx="520" cy="860" r="18" fill="#ffd54f" stroke="#fff" stroke-width="3"/>
          <circle class="coin" style="--d:4.5s; --cx:65px;"   cx="560" cy="840" r="14" fill="#66b8ff" stroke="#fff" stroke-width="3"/>
          <circle class="coin" style="--d:4.8s; --cx:-45px;"  cx="540" cy="880" r="20" fill="#ffd54f" stroke="#fff" stroke-width="3"/>
          <circle class="coin" style="--d:5.1s; --cx:125px;"  cx="580" cy="850" r="15" fill="#80d4ff" stroke="#fff" stroke-width="3"/>
        </g>
      </g>

      <!-- SCENE 4 (0:30 - 0:42): Character Bound by Blue Light Chains (Head Fixed Above Shoulders!) -->
      <g class="cut-4" transform="translate(420 1435)">
        <g class="breathe">
          <path class="sil" d="M-190 20 Q-160 -260 -65 -340 L35 -340 Q110 -270 155 -110 L240 20 Z"/>
          <path class="sil" d="M-15 -235 Q90 -175 195 -255 L215 -230 Q105 -135 -30 -190 Z"/>
          <g transform="translate(198 -310) rotate(-18)">
            <rect x="0" y="0" width="18" height="110" rx="6" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
            <rect x="-4" y="6" width="6" height="98" rx="3" fill="#cce8ff" filter="url(#neonGlow)"/>
          </g>
          <!-- Glowing Blue Chains Wrapping Wrists -->
          <g class="chain-draw" fill="none" stroke="#66b8ff" stroke-width="6" filter="url(#neonGlow)">
            <path d="M205 -265 Q155 -220 185 -180 Q220 -205 170 -245"/>
            <path d="M190 -240 Q135 -180 165 -135 Q200 -165 150 -215"/>
            <path d="M175 -205 Q110 -110 85 15"/>
            <path d="M195 -195 Q240 -90 265 15"/>
          </g>
          <!-- Head Properly Above Shoulders -->
          <g class="head">
            <circle class="sil" cx="-15" cy="-435" r="76"/>
            <g class="eyes squint" style="--t:31s; --rot:10deg">
              <g class="eye-wrap L"><ellipse class="eye" cx="1" cy="-429" rx="11" ry="15"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="35" cy="-423" rx="11" ry="15"/></g>
            </g>
          </g>
        </g>
      </g>

      <!-- SCENE 5 (0:42 - 0:50): Phone Locked — Only Glowing Eyes in the Dark -->
      <g class="cut-5" transform="translate(540 860)">
        <g class="breathe">
          <circle cx="0" cy="0" r="95" fill="#050505"/>
          <g class="eyes b2">
            <g class="eye-wrap L"><ellipse class="eye" cx="-26" cy="0" rx="13" ry="18"/></g>
            <g class="eye-wrap R"><ellipse class="eye" cx="26" cy="0" rx="13" ry="18"/></g>
          </g>
        </g>
      </g>
    `,

    // LAYER 4: Foreground Blanket Fold & Vignette Depth
    fg: `
      <g class="cut-1">
        <path d="M-40 1920 L-40 1640 Q280 1560 590 1700 Q860 1610 1120 1690 L1120 1920 Z" fill="#04060b"/>
      </g>
      <g class="cut-4">
        <path d="M-40 1920 L-40 1640 Q280 1560 590 1700 Q860 1610 1120 1690 L1120 1920 Z" fill="#04060b"/>
      </g>
      <ellipse cx="540" cy="1860" rx="760" ry="100" fill="#000" opacity=".92" filter="url(#soft)"/>
    `
  }
};
