// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (CINEMATIC 5-SHOT • 50s)
// Built for cn-esport/Zen (index.html + studio.css + skill.css + engine.js)
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sound: "clock",
  captions: [
    { start: 0.3, length: 3.7, text: "It’s 2:00 AM. Your eyes are burning, your body is exhausted—yet your thumb refuses to stop scrolling." },
    { start: 4.3, length: 4.8, text: "You tell yourself, \"Just one more video.\" Thirty minutes later, you're still awake." },
    { start: 9.4, length: 5.2, text: "That’s not a lack of willpower—your brain is caught in a slot-machine loop." },
    { start: 15.2, length: 6.4, text: "Every swipe gives you a tiny hit of dopamine—not because the video is good," },
    { start: 21.9, length: 7.6, text: "but because your brain is addicted to the unpredictability of what might come next." },
    { start: 30.2, length: 5.8, text: "At the same time, that blue screen tricks your brain into thinking it’s noon," },
    { start: 36.3, length: 5.4, text: "completely shutting down melatonin—the exact hormone you need to fall asleep." },
    { start: 42.2, length: 4.1, text: "You aren't watching the feed anymore. The feed is keeping you hostage." },
    { start: 46.6, length: 3.0, text: "Put it down... and go to sleep." }
  ],
  layers: {
    // LAYER 1: Shared Gradients, ClipPaths, Cut Timings & Background Worlds
    bg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050914"/>
          <stop offset=".55" stop-color="#0b1528"/>
          <stop offset="1" stop-color="#13223d"/>
        </linearGradient>

        <radialGradient id="phoneGlow">
          <stop offset="0" stop-color="#5cb3ff" stop-opacity=".85"/>
          <stop offset=".42" stop-color="#2b7de9" stop-opacity=".30"/>
          <stop offset="1" stop-color="#1a4b8c" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="phoneBeam" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stop-color="#80c8ff" stop-opacity=".55"/>
          <stop offset=".65" stop-color="#3a8ee6" stop-opacity=".14"/>
          <stop offset="1" stop-color="#3a8ee6" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="dopaFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#16529c" stop-opacity=".85"/>
          <stop offset="1" stop-color="#8ad8ff" stop-opacity=".95"/>
        </linearGradient>

        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#66b8ff" stop-opacity="0"/>
          <stop offset=".55" stop-color="#66b8ff" stop-opacity=".28"/>
          <stop offset="1" stop-color="#b8e0ff" stop-opacity=".95"/>
        </linearGradient>

        <!-- Strict ClipPaths so animated elements NEVER spill outside containers -->
        <clipPath id="phoneScreenClip">
          <rect x="352" y="454" width="376" height="772" rx="32"/>
        </clipPath>

        <clipPath id="brainHeadClip">
          <circle cx="540" cy="860" r="340"/>
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
          /* ===== 5-SHOT HARD CUT TIMELINE (50 SECONDS) ===== */
          .cut-1 { opacity: 1; animation: cutOut 0.18s linear 4.0s forwards; }
          .cut-2 { opacity: 0; animation: cutIn 0.18s linear 4.0s forwards, cutOut 0.18s linear 15.0s forwards; }
          .cut-3 { opacity: 0; animation: cutIn 0.18s linear 15.0s forwards, cutOut 0.18s linear 30.0s forwards; }
          .cut-4 { opacity: 0; animation: cutIn 0.18s linear 30.0s forwards, cutOut 0.18s linear 42.0s forwards; }
          .cut-5 { opacity: 0; animation: cutIn 0.18s linear 42.0s forwards; }

          @keyframes cutIn  { to { opacity: 1; } }
          @keyframes cutOut { to { opacity: 0; } }

          /* Shot 1: Screen Ignites at 0.5s */
          .s1-ignite { opacity: 0; animation: cutIn 0.45s ease-out 0.5s forwards; }

          /* Shot 2: Clipped Feed Scroll & Slot Reel Spin (4s - 15s) */
          .feed-track {
            animation: feedSlide 1.2s linear 4.0s 9;
          }
          @keyframes feedSlide {
            0%   { transform: translateY(0px); }
            100% { transform: translateY(-240px); }
          }

          .slot-pulse {
            transform-box: fill-box;
            transform-origin: center;
            animation: slotPop 1.2s ease-in-out 4.0s 9;
          }
          @keyframes slotPop {
            0%, 100% { transform: scale(1); }
            45%      { transform: scale(1.06); }
          }

          /* Shot 3: Dopamine Wave Inside Clipped Head (15s - 30s) */
          .dopa-wave {
            transform-box: fill-box;
            transform-origin: 50% 100%;
            animation: waveBounce 1.3s ease-in-out 15.0s 11;
          }
          @keyframes waveBounce {
            0%, 100% { transform: scaleY(0.45); opacity: 0.65; }
            45%      { transform: scaleY(1.18); opacity: 1; }
          }

          .spark-rise {
            animation: riseUp 1.3s ease-out 15.0s 11;
          }
          @keyframes riseUp {
            0%   { transform: translateY(120px) scale(0.5); opacity: 0; }
            35%  { opacity: 1; }
            100% { transform: translateY(-160px) scale(1.2); opacity: 0; }
          }

          /* Shot 4: Clock 02:00 -> 03:14 & Melatonin Fade (30s - 42s) */
          .clk-2 { animation: cutOut 0.12s linear 33.5s forwards; }
          .clk-3 { opacity: 0; animation: cutIn 0.25s linear 33.5s forwards; }

          .melatonin-fade {
            animation: fadeMoon 4.5s ease-out 35.5s forwards;
          }
          @keyframes fadeMoon {
            to { opacity: 0.1; transform: translateY(30px); }
          }

          /* Shot 5: Cage Bars Snap Off at 46.4s & Eyes Close to Sleep */
          .cage-bars {
            animation: cutOut 0.25s ease-in 46.4s forwards;
          }
          .sleep-eyes {
            transform-box: fill-box;
            transform-origin: center;
            animation: closeToSleep 1.2s ease-in-out 46.5s forwards;
          }
          @keyframes closeToSleep {
            0%   { transform: scaleY(1); opacity: 1; }
            100% { transform: scaleY(0.06); opacity: 0.35; }
          }
        </style>
      </defs>

      <!-- Base Midnight Backdrop -->
      <rect width="1080" height="1920" fill="url(#sky)"/>

      <!-- SHOT 1 BACKGROUND (0:00 - 0:04): Minimalist Dark Bedroom & Moonlight Window -->
      <g class="cut-1">
        <rect x="120" y="220" width="300" height="440" rx="12" fill="#132340" opacity=".35" stroke="#060912" stroke-width="14"/>
        <line x1="270" y1="220" x2="270" y2="660" stroke="#060912" stroke-width="12" opacity=".45"/>
        <line x1="120" y1="440" x2="420" y2="440" stroke="#060912" stroke-width="12" opacity=".45"/>
        <!-- Subtle Bed Headboard -->
        <rect x="140" y="880" width="440" height="580" rx="24" fill="#070b14"/>
      </g>

      <!-- SHOT 3 BACKGROUND (0:15 - 0:30): Inside the Mind — Clipped Dopamine Chamber -->
      <g class="cut-3">
        <rect width="1080" height="1920" fill="#040812"/>
        <!-- Outer Glowing Head Silhouette -->
        <circle cx="540" cy="860" r="344" fill="#071124" stroke="#4da6ff" stroke-width="5" filter="url(#neonGlow)"/>
        <!-- Strictly Clipped Interior Dopamine Wave & Neural Sparks -->
        <g clip-path="url(#brainHeadClip)">
          <path class="dopa-wave" d="M180 960 Q320 680 460 880 T740 730 T920 920 L920 1240 L180 1240 Z" fill="url(#dopaFill)" filter="url(#neonGlow)"/>
          <circle class="spark-rise" cx="420" cy="860" r="10" fill="#ffe082" filter="url(#neonGlow)"/>
          <circle class="spark-rise" cx="540" cy="820" r="14" fill="#99d6ff" filter="url(#neonGlow)"/>
          <circle class="spark-rise" cx="660" cy="880" r="10" fill="#ffe082" filter="url(#neonGlow)"/>
        </g>
        <!-- Subtle Brain Ring Detail -->
        <circle cx="540" cy="860" r="300" fill="none" stroke="#66b8ff" stroke-width="1.5" stroke-dasharray="12 16" opacity=".4"/>
      </g>

      <!-- SHOT 4 BACKGROUND (0:30 - 0:42): Artificial Noon Sun vs. Fading Moon + Clock -->
      <g class="cut-4">
        <!-- Fading Crescent Moon & Melatonin Stars (Top Left) -->
        <g class="melatonin-fade">
          <circle cx="230" cy="340" r="54" fill="#dce7fa" opacity=".85"/>
          <circle cx="254" cy="324" r="48" fill="#091224"/>
          <circle cx="340" cy="290" r="5" fill="#dce7fa"/>
          <circle cx="160" cy="430" r="4" fill="#dce7fa"/>
        </g>

        <!-- Digital Bedside Clock 02:00 -> 03:14 (Top Right) -->
        <g transform="translate(620 280)">
          <rect x="0" y="0" width="340" height="135" rx="20" fill="#04070f" stroke="#24385c" stroke-width="4"/>
          <text class="clk-2" x="170" y="92" text-anchor="middle" fill="#4da6ff" font-family="monospace" font-size="76" font-weight="700" filter="url(#neonGlow)">02:00</text>
          <text class="clk-3" x="170" y="92" text-anchor="middle" fill="#ff5252" font-family="monospace" font-size="76" font-weight="700" filter="url(#neonGlow)">03:14</text>
        </g>
      </g>

      <!-- SHOT 5 BACKGROUND (0:42 - 0:50): Pitch Darkness -->
      <g class="cut-5">
        <rect width="1080" height="1920" fill="#020306"/>
      </g>
    `,

    // LAYER 2: Midground Lighting & Props
    mid: `
      <!-- SHOT 1: Mattress & Cold Blue Phone Beam -->
      <g class="cut-1">
        <path d="M0 1420 Q460 1370 1080 1450 L1080 1920 L0 1920 Z" fill="#060911"/>
        <g class="s1-ignite">
          <circle cx="620" cy="1110" r="350" fill="url(#phoneGlow)"/>
          <polygon points="598,1125 632,1125 465,865 290,990" fill="url(#phoneBeam)"/>
        </g>
      </g>

      <!-- SHOT 2: Centered Vertical Smartphone With Clipped Scrolling Feed & Slot Machine -->
      <g class="cut-2">
        <circle cx="540" cy="840" r="470" fill="url(#phoneGlow)"/>
        <!-- Phone Outer Frame -->
        <rect x="330" y="420" width="420" height="840" rx="48" fill="#050811" stroke="#4da6ff" stroke-width="6" filter="url(#neonGlow)"/>
        <!-- Screen Base -->
        <rect x="352" y="454" width="376" height="772" rx="32" fill="#0a172e"/>

        <!-- Strictly Clipped Feed Cards (Zero Overflow!) -->
        <g clip-path="url(#phoneScreenClip)">
          <g class="feed-track" opacity=".55">
            <rect x="374" y="460"  width="332" height="210" rx="20" fill="#2364b8"/>
            <rect x="374" y="700"  width="332" height="210" rx="20" fill="#3a8ee6"/>
            <rect x="374" y="940"  width="332" height="210" rx="20" fill="#1a4f96"/>
            <rect x="374" y="1180" width="332" height="210" rx="20" fill="#4da6ff"/>
          </g>

          <!-- Slot-Machine Loop Overlay Inside Screen -->
          <g class="slot-pulse">
            <rect x="382" y="750" width="316" height="150" rx="22" fill="#050b17" stroke="#ffd54f" stroke-width="4" filter="url(#neonGlow)"/>
            <line x1="487" y1="765" x2="487" y2="885" stroke="#243b61" stroke-width="3"/>
            <line x1="593" y1="765" x2="593" y2="885" stroke="#243b61" stroke-width="3"/>
            <text x="435" y="845" text-anchor="middle" fill="#ffd54f" font-family="monospace" font-size="62" font-weight="700">7</text>
            <text x="540" y="845" text-anchor="middle" fill="#80d4ff" font-family="monospace" font-size="58" font-weight="700">★</text>
            <text x="645" y="845" text-anchor="middle" fill="#ffd54f" font-family="monospace" font-size="62" font-weight="700">7</text>
          </g>
        </g>

        <!-- Top Speaker Pill -->
        <rect x="495" y="434" width="90" height="8" rx="4" fill="#1c2d4a"/>
      </g>

      <!-- SHOT 4: Harsh Artificial Blue Sun Radiating From Phone -->
      <g class="cut-4">
        <path d="M0 1420 Q460 1370 1080 1450 L1080 1920 L0 1920 Z" fill="#060911"/>
        <circle cx="620" cy="1110" r="420" fill="url(#phoneGlow)"/>
        <!-- Blue Sun Rays -->
        <g stroke="#66b8ff" stroke-width="3" opacity=".45" filter="url(#neonGlow)">
          <line x1="620" y1="1110" x2="420" y2="620"/>
          <line x1="620" y1="1110" x2="620" y2="560"/>
          <line x1="620" y1="1110" x2="820" y2="620"/>
          <line x1="620" y1="1110" x2="940" y2="820"/>
        </g>
      </g>
    `,

    // LAYER 3: Clean Silhouettes (Head Properly Above Shoulders via Direct Coordinates)
    char: `
      <!-- SHOT 1 (0:00 - 0:04): Clean Silhouette Sitting in Bed -->
      <g class="cut-1" transform="translate(410 1435)">
        <ellipse cx="50" cy="15" rx="280" ry="24" fill="#000" opacity=".8"/>
        <g class="breathe">
          <!-- Clean Torso & Blanket -->
          <path class="sil" d="M-180 20 Q-155 -255 -65 -335 L35 -335 Q110 -265 155 -110 L235 20 Z"/>
          <!-- Clean Arm Holding Phone -->
          <path class="sil" d="M-10 -230 Q90 -175 195 -255 L212 -232 Q105 -138 -25 -188 Z"/>
          <!-- Phone Silhouette -->
          <g transform="translate(196 -308) rotate(-16)">
            <rect x="0" y="0" width="16" height="106" rx="5" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
            <rect class="s1-ignite" x="-4" y="6" width="6" height="94" rx="3" fill="#cce8ff" filter="url(#neonGlow)"/>
          </g>
          <!-- Head Directly Positioned Above Shoulders (cx="-15" cy="-430") -->
          <g class="head">
            <circle class="sil" cx="-15" cy="-430" r="74"/>
            <g class="eyes widen" style="--t:0.6s">
              <g class="eye-wrap L"><ellipse class="eye" cx="2" cy="-424" rx="11" ry="15"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="35" cy="-418" rx="11" ry="15"/></g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 4 (0:30 - 0:42): Character Bathed in Blue Noon Light -->
      <g class="cut-4" transform="translate(410 1435)">
        <g class="breathe">
          <path class="sil" d="M-180 20 Q-155 -255 -65 -335 L35 -335 Q110 -265 155 -110 L235 20 Z"/>
          <path class="sil" d="M-10 -230 Q90 -175 195 -255 L212 -232 Q105 -138 -25 -188 Z"/>
          <g transform="translate(196 -308) rotate(-16)">
            <rect x="0" y="0" width="16" height="106" rx="5" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
            <rect x="-4" y="6" width="6" height="94" rx="3" fill="#cce8ff" filter="url(#neonGlow)"/>
          </g>
          <g class="head">
            <circle class="sil" cx="-15" cy="-430" r="74"/>
            <g class="eyes squint" style="--t:31s; --rot:9deg">
              <g class="eye-wrap L"><ellipse class="eye" cx="2" cy="-424" rx="11" ry="15"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="35" cy="-418" rx="11" ry="15"/></g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 5 (0:42 - 0:50): Trapped Behind Blue Feed Bars -> Screen Off & Eyes Close to Sleep -->
      <g class="cut-5" transform="translate(540 860)">
        <g class="breathe">
          <!-- Silhouette Head & Shoulders -->
          <path class="sil" d="M-170 360 Q-150 150 -65 110 L65 110 Q150 150 170 360 Z"/>
          <circle class="sil" cx="0" cy="0" r="88"/>
          <!-- Glowing Eyes That Slowly Close at 46.5s -->
          <g class="sleep-eyes">
            <g class="eyes b2">
              <g class="eye-wrap L"><ellipse class="eye" cx="-25" cy="-4" rx="13" ry="17"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="25" cy="-4" rx="13" ry="17"/></g>
            </g>
          </g>
        </g>

        <!-- Glowing Blue Feed Cage Bars (Vanish at 46.4s when user puts phone down) -->
        <g class="cage-bars" stroke="#4da6ff" stroke-width="6" opacity=".75" filter="url(#neonGlow)">
          <line x1="-220" y1="-340" x2="-220" y2="380"/>
          <line x1="-110" y1="-340" x2="-110" y2="380"/>
          <line x1="0"    y1="-340" x2="0"    y2="380"/>
          <line x1="110"  y1="-340" x2="110"  y2="380"/>
          <line x1="220"  y1="-340" x2="220"  y2="380"/>
        </g>
      </g>
    `,

    // LAYER 4: Clean Foreground Vignette & Soft Blanket Edge
    fg: `
      <g class="cut-1">
        <path d="M-40 1920 L-40 1650 Q280 1580 590 1710 Q860 1620 1120 1700 L1120 1920 Z" fill="#04060b"/>
      </g>
      <g class="cut-4">
        <path d="M-40 1920 L-40 1650 Q280 1580 590 1710 Q860 1620 1120 1700 L1120 1920 Z" fill="#04060b"/>
      </g>
      <ellipse cx="540" cy="1860" rx="760" ry="100" fill="#000" opacity=".92" filter="url(#soft)"/>
    `
  }
};
