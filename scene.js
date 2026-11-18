// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (9:16 • 50s)
// Paste this entire code into scene.js in cn-esport/Zen
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sound: "clock",
  captions: [
    { start: 0.4, length: 3.6, text: "It’s 2:00 AM. Your eyes are burning, your body is exhausted—yet your thumb refuses to stop scrolling." },
    { start: 4.3, length: 4.8, text: "You tell yourself, 'Just one more video.' Thirty minutes later, you're still awake." },
    { start: 9.4, length: 5.2, text: "That’s not a lack of willpower—your brain is caught in a slot-machine loop." },
    { start: 15.2, length: 6.5, text: "Every swipe gives you a tiny hit of dopamine—not because the video is good," },
    { start: 22.0, length: 7.5, text: "but because your brain is addicted to the unpredictability of what might come next." },
    { start: 30.2, length: 5.8, text: "At the same time, that blue screen tricks your brain into thinking it’s noon," },
    { start: 36.3, length: 5.4, text: "completely shutting down melatonin—the exact hormone you need to fall asleep." },
    { start: 42.3, length: 4.0, text: "You aren't watching the feed anymore. The feed is keeping you hostage." },
    { start: 46.6, length: 3.0, text: "Put it down... and go to sleep." }
  ],
  layers: {
    // LAYER 1: Midnight Bedroom Wall, Window Moonlight & Digital Clock (02:00 -> 03:14)
    bg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050811"/>
          <stop offset=".55" stop-color="#0b1324"/>
          <stop offset="1" stop-color="#121e36"/>
        </linearGradient>

        <radialGradient id="phoneGlow">
          <stop offset="0" stop-color="#4da6ff" stop-opacity=".85"/>
          <stop offset=".35" stop-color="#2b7de9" stop-opacity=".32"/>
          <stop offset="1" stop-color="#1a4b8c" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="phoneBeam" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stop-color="#66b8ff" stop-opacity=".55"/>
          <stop offset=".6" stop-color="#3a8ee6" stop-opacity=".15"/>
          <stop offset="1" stop-color="#3a8ee6" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#66b8ff" stop-opacity="0"/>
          <stop offset=".55" stop-color="#66b8ff" stop-opacity=".28"/>
          <stop offset="1" stop-color="#99d1ff" stop-opacity=".9"/>
        </linearGradient>

        <filter id="eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="8" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="neonGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="6" result="g1"/>
          <feMerge><feMergeNode in="g1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="soft"><feGaussianBlur stdDeviation="35"/></filter>

        <style>
          /* Act 1: Phone turns on at 0.6s, turns off at 42.2s */
          .screen-power {
            opacity: 0;
            animation: screenOn 0.5s ease-out 0.6s forwards,
                       screenOff 0.4s ease-in 42.2s forwards;
          }
          @keyframes screenOn  { to { opacity: 1; } }
          @keyframes screenOff { to { opacity: 0; } }

          /* Act 2: Thumb swipe & slot-machine sparks (4s - 30s) */
          .thumb-swipe {
            animation: swipeUp 1.4s ease-in-out 4s 18;
          }
          @keyframes swipeUp {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            45% { transform: translateY(-28px) rotate(-12deg); }
          }

          .spark {
            opacity: 0;
            animation: sparkShoot 1.4s ease-out var(--d, 4s) 18;
          }
          @keyframes sparkShoot {
            0%   { transform: translate(0, 0) scale(0.4); opacity: 0; }
            25%  { opacity: 1; }
            100% { transform: translate(var(--sx, -20px), -230px) scale(1.2); opacity: 0; }
          }

          /* Act 3: Dopamine chamber inside head (15s - 30s) */
          .dopa-chamber {
            opacity: 0;
            animation: showAct3 1s ease-out 15s forwards,
                       hideAct3 0.8s ease-in 29.5s forwards;
          }
          @keyframes showAct3 { to { opacity: 1; } }
          @keyframes hideAct3 { to { opacity: 0; } }

          .dopa-wave {
            transform-box: fill-box;
            transform-origin: 50% 100%;
            animation: waveSpike 1.4s ease-in-out 15s 11;
          }
          @keyframes waveSpike {
            0%, 100% { transform: scaleY(0.25); opacity: 0.45; }
            45%      { transform: scaleY(1.15); opacity: 1; }
          }

          /* Act 4: Blue light chains & 02:00 -> 03:14 clock (30s - 42.2s) */
          .trap-chains {
            stroke-dasharray: 420;
            stroke-dashoffset: 420;
            opacity: 0;
            animation: bindWrists 2.5s ease-out 30.2s forwards,
                       screenOff 0.4s ease-in 42.2s forwards;
          }
          @keyframes bindWrists {
            0%   { opacity: 1; stroke-dashoffset: 420; }
            100% { opacity: 0.9; stroke-dashoffset: 0; }
          }

          .clock-2am {
            animation: hideClock 0.2s linear 33.5s forwards;
          }
          .clock-3am {
            opacity: 0;
            animation: showClock 0.3s linear 33.5s forwards;
          }
          @keyframes hideClock { to { opacity: 0; } }
          @keyframes showClock { to { opacity: 1; } }
        </style>
      </defs>

      <!-- Dark Room Backdrop -->
      <rect width="1080" height="1920" fill="url(#sky)"/>

      <!-- Faint Bedroom Window Frame (Upper Left) -->
      <g opacity=".32">
        <rect x="110" y="210" width="320" height="470" rx="10" fill="#13223d" stroke="#060912" stroke-width="14"/>
        <line x1="270" y1="210" x2="270" y2="680" stroke="#060912" stroke-width="12"/>
        <line x1="110" y1="445" x2="430" y2="445" stroke="#060912" stroke-width="12"/>
      </g>

      <!-- Nightstand & Glowing Digital Clock (Right Side) -->
      <g transform="translate(760 1120)">
        <rect x="0" y="95" width="230" height="360" rx="8" fill="#06080f"/>
        <rect x="28" y="22" width="175" height="72" rx="12" fill="#04060b" stroke="#18253d" stroke-width="3"/>
        <text class="clock-2am" x="115" y="71" text-anchor="middle" fill="#4da6ff" font-family="monospace" font-size="40" font-weight="700" filter="url(#neonGlow)">02:00</text>
        <text class="clock-3am" x="115" y="71" text-anchor="middle" fill="#ff5c5c" font-family="monospace" font-size="40" font-weight="700" filter="url(#neonGlow)">03:14</text>
      </g>
    `,

    // LAYER 2: Bed, Pillows & Cold Blue Screen Light Cone
    mid: `
      <!-- Bed Mattress & Blanket Silhouette -->
      <path d="M0 1380 Q420 1320 1080 1410 L1080 1920 L0 1920 Z" fill="#070a12"/>
      <!-- Soft Pillow Behind Character -->
      <path d="M120 1360 Q240 1180 430 1230 Q490 1340 440 1420 L110 1430 Z" fill="#0a0f1c"/>

      <!-- Cold Blue Phone Screen Ambient Glow & Upward Beam -->
      <g class="screen-power">
        <circle cx="620" cy="1110" r="340" fill="url(#phoneGlow)"/>
        <polygon points="595,1125 635,1125 460,620 220,860" fill="url(#phoneBeam)"/>
      </g>
    `,

    // LAYER 3: Reclining Silhouette, Glowing Eyes, Swiping Thumb, Dopamine Chamber & Chains
    char: `
      <g transform="translate(420 1395)">
        <!-- Ground / Bed Contact Shadow -->
        <ellipse cx="40" cy="15" rx="280" ry="26" fill="#000" opacity=".8"/>

        <g class="breathe">
          <!-- Reclining Upper Body / Blanket Torso -->
          <path class="sil" d="M-190 20 Q-160 -250 -65 -320 L35 -320 Q110 -260 155 -110 L240 20 Z"/>

          <!-- Arms Holding Smartphone -->
          <path class="sil" d="M-20 -230 Q85 -170 195 -245 L215 -220 Q105 -125 -35 -185 Z"/>

          <!-- Smartphone Silhouette + Glowing Edge -->
          <g transform="translate(200 -295) rotate(-18)">
            <rect x="0" y="0" width="18" height="108" rx="6" fill="#050505" stroke="#334b6e" stroke-width="2"/>
            <rect class="screen-power" x="-4" y="6" width="6" height="96" rx="3" fill="#b8e0ff" filter="url(#neonGlow)"/>

            <!-- Swiping Thumb -->
            <path class="thumb-swipe" d="M12 72 Q-14 66 -16 52 Q-14 42 4 48 L16 56 Z" fill="#050505" stroke="#7cc2ff" stroke-width="2"/>

            <!-- Slot-Machine Dopamine Sparks Shooting Toward Head -->
            <g class="screen-power">
              <circle class="spark" style="--d:4.2s; --sx:-140px;" cx="-8" cy="40" r="5" fill="#99d6ff" filter="url(#neonGlow)"/>
              <circle class="spark" style="--d:4.7s; --sx:-185px;" cx="-8" cy="55" r="4" fill="#ffe082" filter="url(#neonGlow)"/>
              <circle class="spark" style="--d:5.1s; --sx:-115px;" cx="-8" cy="30" r="6" fill="#66b8ff" filter="url(#neonGlow)"/>
            </g>
          </g>

          <!-- Act 4: Blue Light Chains Wrapping Wrists -->
          <g class="trap-chains" fill="none" stroke="#66b8ff" stroke-width="4" filter="url(#neonGlow)">
            <path d="M205 -250 Q165 -210 185 -175 Q215 -195 175 -235"/>
            <path d="M195 -235 Q145 -180 165 -140 Q195 -165 155 -210"/>
            <path d="M180 -215 Q120 -130 95 -20"/>
          </g>

          <!-- Floating Circular Head Tilted Down Toward Screen -->
          <g class="head" transform="translate(-15 -415)">
            <circle class="sil" cx="0" cy="0" r="76"/>

            <!-- Act 3: Internal Dopamine Wave Chamber Inside Head -->
            <g class="dopa-chamber">
              <circle cx="0" cy="0" r="54" fill="#071122" stroke="#4da6ff" stroke-width="2" opacity=".85"/>
              <path class="dopa-wave" d="M-42 22 Q-20 -28 0 6 T42 -18 L42 32 L-42 32 Z" fill="#4da6ff" filter="url(#neonGlow)"/>
            </g>

            <!-- Glowing White Eyes Looking Right/Down at Phone -->
            <g class="eyes widen" style="--t:0.8s">
              <g class="eye-wrap L">
                <ellipse class="eye" cx="12" cy="8" rx="11" ry="15" transform="rotate(12 12 8)"/>
              </g>
              <g class="eye-wrap R">
                <ellipse class="eye" cx="46" cy="14" rx="11" ry="15" transform="rotate(12 46 14)"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    `,

    // LAYER 4: Foreground Blanket Fold & Vignette Depth
    fg: `
      <path d="M-40 1920 L-40 1620 Q280 1540 590 1680 Q860 1590 1120 1670 L1120 1920 Z" fill="#04060b"/>
      <ellipse cx="540" cy="1860" rx="760" ry="100" fill="#000" opacity=".92" filter="url(#soft)"/>
    `
  }
};
