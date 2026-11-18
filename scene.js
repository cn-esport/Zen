// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (V3 LAST SOUL FILM EDITION • 50s)
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sound: "clock",
  sfx: [
    { at: 0.6,  type: "notification" },
    { at: 4.0,  type: "whoosh" },
    { at: 5.2,  type: "swipe" },
    { at: 8.0,  type: "swipe" },
    { at: 11.0, type: "swipe" },
    { at: 15.0, type: "boom" },
    { at: 16.2, type: "chime" },
    { at: 21.0, type: "chime" },
    { at: 30.0, type: "whoosh" },
    { at: 42.0, type: "boom" },
    { at: 46.4, type: "lock" }
  ],
  captions: [
    { start: 0.3,  length: 3.7, text: "It’s 2:00 AM. Your eyes are burning, your body is exhausted—yet your thumb refuses to stop scrolling." },
    { start: 4.3,  length: 4.8, text: "You tell yourself, \"Just one more video.\" Thirty minutes later, you're still awake." },
    { start: 9.4,  length: 5.2, text: "That’s not a lack of willpower—your brain is caught in a slot-machine loop." },
    { start: 15.2, length: 6.4, text: "Every swipe gives you a tiny hit of dopamine—not because the video is good," },
    { start: 21.9, length: 7.6, text: "but because your brain is addicted to the unpredictability of what might come next." },
    { start: 30.2, length: 5.8, text: "At the same time, that blue screen tricks your brain into thinking it’s noon," },
    { start: 36.3, length: 5.4, text: "completely shutting down melatonin—the exact hormone you need to fall asleep." },
    { start: 42.2, length: 4.1, text: "You aren't watching the feed anymore. The feed is keeping you hostage." },
    { start: 46.6, length: 3.0, text: "Put it down... and go to sleep." }
  ],
  layers: {
    // LAYER 1: Muted Gouache Backdrop, Detailed Bedroom Window Blinds, Shelf & Clock
    bg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#070c17"/>
          <stop offset=".55" stop-color="#101c30"/>
          <stop offset="1" stop-color="#192942"/>
        </linearGradient>

        <radialGradient id="phoneGlow">
          <stop offset="0" stop-color="#7cc4ff" stop-opacity=".82"/>
          <stop offset=".45" stop-color="#2e75c9" stop-opacity=".26"/>
          <stop offset="1" stop-color="#153866" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="phoneBeam" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stop-color="#9ad4ff" stop-opacity=".48"/>
          <stop offset=".65" stop-color="#3a8ee6" stop-opacity=".12"/>
          <stop offset="1" stop-color="#3a8ee6" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="moonShaft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#a8c6ed" stop-opacity=".16"/>
          <stop offset="1" stop-color="#a8c6ed" stop-opacity="0"/>
        </linearGradient>

        <clipPath id="phoneScreenClip">
          <rect x="352" y="454" width="376" height="772" rx="32"/>
        </clipPath>

        <filter id="eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="neonGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="6" result="g1"/>
          <feMerge><feMergeNode in="g1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="soft"><feGaussianBlur stdDeviation="30"/></filter>

        <style>
          .cut-1 { opacity: 1; animation: cutOut 0.18s linear 4.0s forwards; }
          .cut-2 { opacity: 0; animation: cutIn 0.18s linear 4.0s forwards, cutOut 0.18s linear 15.0s forwards; }
          .cut-3 { opacity: 0; animation: cutIn 0.18s linear 15.0s forwards, cutOut 0.18s linear 30.0s forwards; }
          .cut-4 { opacity: 0; animation: cutIn 0.18s linear 30.0s forwards, cutOut 0.18s linear 42.0s forwards; }
          .cut-5 { opacity: 0; animation: cutIn 0.18s linear 42.0s forwards; }

          @keyframes cutIn  { to { opacity: 1; } }
          @keyframes cutOut { to { opacity: 0; } }

          .s1-ignite { opacity: 0; animation: cutIn 0.45s ease-out 0.6s forwards; }

          /* Silky 60fps Inertia Scroll (4s - 15s) */
          .feed-track {
            will-change: transform;
            animation: silkyScroll 1.4s cubic-bezier(0.22, 1, 0.36, 1) 4.0s 8;
          }
          @keyframes silkyScroll {
            0%   { transform: translate3d(0, 0px, 0); }
            22%  { transform: translate3d(0, 14px, 0); }
            85%, 100% { transform: translate3d(0, -240px, 0); }
          }

          .hand-swipe {
            will-change: transform;
            transform-box: fill-box;
            transform-origin: 85% 90%;
            animation: thumbFlick 1.4s cubic-bezier(0.22, 1, 0.36, 1) 4.0s 8;
          }
          @keyframes thumbFlick {
            0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); }
            20%      { transform: translate3d(0, 10px, 0) rotate(2deg); }
            55%      { transform: translate3d(-14px, -68px, 0) rotate(-10deg); }
          }

          /* Shot 3: Dopamine Sparks Drifting From Screen to Eyes */
          .dopa-spark {
            will-change: transform, opacity;
            opacity: 0;
            animation: sparkDrift 2.4s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 15s) infinite;
          }
          @keyframes sparkDrift {
            0%   { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
            25%  { opacity: 0.95; }
            100% { transform: translate3d(var(--dx, -180px), var(--dy, -220px), 0) scale(1.15); opacity: 0; }
          }

          /* Shot 4: Moon Fade & Clock */
          .melatonin-fade { animation: fadeMoon 5.5s ease-out 34.0s forwards; }
          @keyframes fadeMoon { to { opacity: 0.08; transform: translateY(35px); } }

          /* Shot 5: Cage Bars Snap Off at 46.4s & Eyes Close */
          .cage-bars { animation: cutOut 0.25s ease-in 46.4s forwards; }
          .sleep-eyes {
            transform-box: fill-box;
            transform-origin: center;
            animation: closeToSleep 1.2s ease-in-out 46.5s forwards;
          }
          @keyframes closeToSleep {
            0%   { transform: scaleY(1); opacity: 1; }
            100% { transform: scaleY(0.06); opacity: 0.25; }
          }
        </style>
      </defs>

      <!-- Muted Gouache Bedroom Wall -->
      <rect width="1080" height="1920" fill="url(#sky)"/>

      <!-- SHOT 1 & SHOT 3 DETAILED BEDROOM WALL (Window With Slatted Blinds + Bookshelf + Moonlight Shaft) -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <!-- Window Frame -->
        <rect x="110" y="220" width="420" height="660" rx="12" fill="#182a47" opacity=".45" stroke="#080c14" stroke-width="14"/>
        <!-- Venetian Blinds Slats -->
        <g stroke="#080c14" stroke-width="6" opacity=".65">
          <line x1="115" y1="260" x2="525" y2="260"/><line x1="115" y1="300" x2="525" y2="300"/>
          <line x1="115" y1="340" x2="525" y2="340"/><line x1="115" y1="380" x2="525" y2="380"/>
          <line x1="115" y1="420" x2="525" y2="420"/><line x1="115" y1="460" x2="525" y2="460"/>
          <line x1="115" y1="500" x2="525" y2="500"/><line x1="115" y1="540" x2="525" y2="540"/>
        </g>
        <!-- Diagonal Moonlight Shaft -->
        <polygon points="120,230 520,230 980,1450 380,1450" fill="url(#moonShaft)"/>

        <!-- Floating Wall Shelf With Books & Small Plant (Upper Right) -->
        <g transform="translate(650 430)" opacity=".75">
          <rect x="0" y="95" width="280" height="14" rx="4" fill="#070a12"/>
          <rect x="24" y="25" width="22" height="70" rx="3" fill="#0a0f1c"/>
          <rect x="50" y="35" width="18" height="60" rx="3" fill="#0d1526"/>
          <rect x="72" y="20" width="24" height="75" rx="3" fill="#080c17"/>
          <path d="M190 95 L180 55 L235 55 L225 95 Z" fill="#070a12"/>
          <path d="M205 55 Q185 25 170 35 M208 55 Q215 15 235 25 M207 55 Q205 18 195 12" stroke="#0b1322" stroke-width="5" fill="none" stroke-linecap="round"/>
        </g>
      </g>

      <!-- SHOT 3 BACKGROUND: Moody Bedroom Window + Framed Poster -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <rect x="540" y="220" width="410" height="680" rx="14" fill="#14233d" opacity=".4" stroke="#060911" stroke-width="14"/>
        <line x1="745" y1="220" x2="745" y2="900" stroke="#060911" stroke-width="12" opacity=".5"/>
        <line x1="540" y1="560" x2="950" y2="560" stroke="#060911" stroke-width="12" opacity=".5"/>
        <!-- Framed Wall Art on Left -->
        <rect x="170" y="340" width="190" height="250" rx="6" fill="#0b1322" stroke="#060911" stroke-width="10"/>
        <circle cx="265" cy="445" r="38" fill="#1a2e4f" opacity=".5"/>
      </g>

      <!-- SHOT 4 BACKGROUND: Fading Crescent Moon & Night Sky -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <g class="melatonin-fade">
          <circle cx="240" cy="340" r="56" fill="#dce7fa" opacity=".88"/>
          <circle cx="265" cy="324" r="50" fill="#0b1424"/>
          <circle cx="350" cy="285" r="5" fill="#dce7fa"/>
          <circle cx="170" cy="435" r="4" fill="#dce7fa"/>
        </g>
      </g>

      <!-- SHOT 5 BACKGROUND: Pitch Darkness -->
      <g class="cut-5"><rect width="1080" height="1920" fill="#03050a"/></g>
    `,

    // LAYER 2: Midground Furniture (Nightstand, Lamp, Mug) & Screen Light
    mid: `
      <!-- SHOT 1: Nightstand With Lamp & Mug + Phone Beam -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <!-- Nightstand Silhouette on Right -->
        <g transform="translate(760 1180)" opacity=".85">
          <rect x="0" y="90" width="210" height="320" rx="8" fill="#060911"/>
          <!-- Unlit Bedside Lamp -->
          <path d="M55 45 L135 45 L150 0 L40 0 Z" fill="#090e1a"/>
          <rect x="90" y="45" width="10" height="45" fill="#060911"/>
          <!-- Coffee Mug -->
          <rect x="155" y="58" width="26" height="32" rx="4" fill="#080d17"/>
        </g>

        <g class="s1-ignite flicker">
          <circle cx="655" cy="1120" r="370" fill="url(#phoneGlow)"/>
          <polygon points="632,1135 668,1135 455,830 275,980" fill="url(#phoneBeam)"/>
        </g>
      </g>

      <!-- SHOT 2: Centered Smartphone With Silky-Smooth Seamless Loop Feed -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <circle cx="540" cy="840" r="470" fill="url(#phoneGlow)"/>
        <rect x="330" y="420" width="420" height="840" rx="48" fill="#060912" stroke="#66b8ff" stroke-width="5" filter="url(#neonGlow)"/>
        <rect x="352" y="454" width="376" height="772" rx="32" fill="#0c1a33"/>

        <g clip-path="url(#phoneScreenClip)">
          <g class="feed-track">
            <rect x="374" y="470" width="332" height="210" rx="20" fill="#1d5296" opacity=".78"/>
            <circle cx="425" cy="630" r="16" fill="#7cc4ff" opacity=".65"/>
            <rect x="454" y="622" width="130" height="14" rx="7" fill="#9ad4ff" opacity=".48"/>

            <rect x="374" y="710" width="332" height="210" rx="20" fill="#2a6ec4" opacity=".82"/>
            <circle cx="425" cy="870" r="16" fill="#ffe082" opacity=".75"/>
            <rect x="454" y="862" width="150" height="14" rx="7" fill="#d6eeff" opacity=".52"/>

            <rect x="374" y="950" width="332" height="210" rx="20" fill="#174582" opacity=".78"/>
            <circle cx="425" cy="1110" r="16" fill="#7cc4ff" opacity=".65"/>
            <rect x="454" y="1102" width="120" height="14" rx="7" fill="#9ad4ff" opacity=".48"/>

            <rect x="374" y="1190" width="332" height="210" rx="20" fill="#1d5296" opacity=".78"/>
            <circle cx="425" cy="1350" r="16" fill="#7cc4ff" opacity=".65"/>
            <rect x="454" y="1342" width="130" height="14" rx="7" fill="#9ad4ff" opacity=".48"/>
          </g>
        </g>
        <rect x="495" y="434" width="90" height="8" rx="4" fill="#1c2d4a"/>
      </g>

      <!-- SHOT 3: Dopamine Sparks Rising From Screen Into Eyes -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <circle cx="660" cy="1110" r="390" fill="url(#phoneGlow)"/>
        <g filter="url(#neonGlow)">
          <circle class="dopa-spark" style="--d:15.1s; --dx:-220px; --dy:-260px;" cx="655" cy="1090" r="9" fill="#ffe082"/>
          <circle class="dopa-spark" style="--d:15.7s; --dx:-180px; --dy:-300px;" cx="665" cy="1100" r="7" fill="#80d4ff"/>
          <circle class="dopa-spark" style="--d:16.3s; --dx:-240px; --dy:-230px;" cx="650" cy="1080" r="11" fill="#ffe082"/>
          <circle class="dopa-spark" style="--d:16.9s; --dx:-200px; --dy:-280px;" cx="670" cy="1110" r="8" fill="#99d6ff"/>
        </g>
      </g>

      <!-- SHOT 4: Artificial Blue Noon Beams + Drifting Mist -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <circle cx="660" cy="1120" r="440" fill="url(#phoneGlow)"/>
        <g stroke="#8ad0ff" stroke-width="3.5" opacity=".45" filter="url(#neonGlow)">
          <line x1="660" y1="1120" x2="360" y2="540"/>
          <line x1="660" y1="1120" x2="560" y2="460"/>
          <line x1="660" y1="1120" x2="770" y2="500"/>
          <line x1="660" y1="1120" x2="960" y2="720"/>
        </g>
        <ellipse class="drift-fog" cx="540" cy="1580" rx="740" ry="70" fill="#4da6ff" opacity=".10" filter="url(#soft)"/>
      </g>
    `,

    // LAYER 3: True Last Soul Character Anatomy (Separated Limbs + Eyebrows + Expressive Eyes)
    char: `
      <!-- SHOT 1 (0:00 - 0:04): Tired Character With Separated Limbs & Drooping Eyebrows -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <g transform="translate(360 1560)">
          <g class="breathe slump" style="--t:0.8s">
            <!-- Back Arm (Subtle Depth Layer) -->
            <path class="sil" d="M55 -270 L125 -165 L275 -225 L285 -205 L115 -130 L35 -250 Z" opacity=".8"/>
            <!-- Torso & Curved Shoulders -->
            <path class="sil" d="M-125 120 C-132 -85 -100 -285 -28 -340 C15 -365 62 -340 82 -280 L118 120 Z"/>
            <!-- Foreground Arm & Forearm (Crisp .limb Stroke Separates It From Torso!) -->
            <path class="limb" d="M18 -275 C32 -220 62 -175 95 -148 L268 -218 L282 -192 L88 -108 C42 -135 5 -195 -12 -255 Z"/>
            <!-- Smartphone -->
            <g transform="translate(274 -285) rotate(-15)">
              <rect x="0" y="0" width="18" height="114" rx="6" fill="#06080f" stroke="#66b8ff" stroke-width="2"/>
              <rect class="s1-ignite" x="-4" y="6" width="6" height="102" rx="3" fill="#e0f2ff" filter="url(#neonGlow)"/>
            </g>
            <!-- Neck + Head + Expressive Eyebrows -->
            <rect class="sil" x="-20" y="-388" width="36" height="52" rx="12"/>
            <g class="head">
              <circle class="sil" cx="4" cy="-452" r="76"/>
              <!-- Tired Tilted Eyebrows -->
              <path class="brow" d="M8 -470 Q22 -476 34 -466"/>
              <path class="brow" d="M44 -463 Q56 -469 66 -458"/>
              <g class="eyes widen" style="--t:0.6s">
                <g class="eye-wrap L"><ellipse class="eye" cx="22" cy="-444" rx="11" ry="14"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="55" cy="-438" rx="11" ry="14"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 2 (0:04 - 0:15): Articulated Hand & Thumb With Crisp Limb Outline -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <path class="hand-swipe limb" d="M960 1560 L770 1230 C710 1135 620 1075 565 985 C535 935 570 890 615 915 C665 942 710 1005 745 1045 C775 1015 815 1025 845 1065 L1080 1360 Z"/>
      </g>

      <!-- SHOT 3 (0:15 - 0:30): Hypnotized Character Leaning Into Dopamine Sparks -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <g transform="translate(360 1560)">
          <g class="breathe lean-in" style="--t:15.5s">
            <path class="sil" d="M55 -270 L125 -165 L275 -225 L285 -205 L115 -130 L35 -250 Z" opacity=".8"/>
            <path class="sil" d="M-125 120 C-132 -85 -100 -285 -28 -340 C15 -365 62 -340 82 -280 L118 120 Z"/>
            <path class="limb" d="M18 -275 C32 -220 62 -175 95 -148 L268 -218 L282 -192 L88 -108 C42 -135 5 -195 -12 -255 Z"/>
            <g transform="translate(274 -285) rotate(-15)">
              <rect x="0" y="0" width="18" height="114" rx="6" fill="#06080f" stroke="#66b8ff" stroke-width="2"/>
              <rect x="-4" y="6" width="6" height="102" rx="3" fill="#e0f2ff" filter="url(#neonGlow)"/>
            </g>
            <rect class="sil" x="-20" y="-388" width="36" height="52" rx="12"/>
            <g class="head">
              <circle class="sil" cx="4" cy="-452" r="76"/>
              <!-- Raised Hooked Eyebrows -->
              <path class="brow" d="M8 -476 Q22 -484 34 -474"/>
              <path class="brow" d="M44 -470 Q56 -478 66 -468"/>
              <g class="eyes widen" style="--t:16s">
                <g class="eye-wrap L"><ellipse class="eye" cx="22" cy="-444" rx="12" ry="15"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="55" cy="-438" rx="12" ry="15"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 4 (0:30 - 0:42): Squinting Against Harsh Blue Noon Light -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <g transform="translate(360 1560)">
          <g class="breathe">
            <path class="sil" d="M55 -270 L125 -165 L275 -225 L285 -205 L115 -130 L35 -250 Z" opacity=".8"/>
            <path class="sil" d="M-125 120 C-132 -85 -100 -285 -28 -340 C15 -365 62 -340 82 -280 L118 120 Z"/>
            <path class="limb" d="M18 -275 C32 -220 62 -175 95 -148 L268 -218 L282 -192 L88 -108 C42 -135 5 -195 -12 -255 Z"/>
            <g transform="translate(274 -285) rotate(-15)">
              <rect x="0" y="0" width="18" height="114" rx="6" fill="#06080f" stroke="#66b8ff" stroke-width="2"/>
              <rect x="-4" y="6" width="6" height="102" rx="3" fill="#e0f2ff" filter="url(#neonGlow)"/>
            </g>
            <rect class="sil" x="-20" y="-388" width="36" height="52" rx="12"/>
            <g class="head">
              <circle class="sil" cx="4" cy="-452" r="76"/>
              <!-- Furrowed Squinting Eyebrows -->
              <path class="brow" d="M10 -466 L34 -460"/>
              <path class="brow" d="M44 -458 L66 -462"/>
              <g class="eyes squint" style="--t:31s; --rot:9deg">
                <g class="eye-wrap L"><ellipse class="eye" cx="22" cy="-444" rx="11" ry="14"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="55" cy="-438" rx="11" ry="14"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 5 (0:42 - 0:50): Trapped Behind Blue Feed Bars -> Screen Off & Peaceful Sleep -->
      <g class="cut-5 cam-push" style="--shot-dur:8s; --shot-start:42s;">
        <g transform="translate(540 870)">
          <g class="breathe">
            <path class="sil" d="M-185 370 C-170 215 -115 145 -45 130 L45 130 C115 145 170 215 185 370 Z"/>
            <rect class="sil" x="-22" y="75" width="44" height="65" rx="14"/>
            <circle class="sil" cx="0" cy="0" r="86"/>
            <path class="brow" d="M-42 -26 Q-25 -34 -10 -26"/>
            <path class="brow" d="M10 -26 Q25 -34 42 -26"/>
            <g class="sleep-eyes">
              <g class="eyes">
                <g class="eye-wrap L"><ellipse class="eye" cx="-25" cy="-4" rx="13" ry="16"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="25" cy="-4" rx="13" ry="16"/></g>
              </g>
            </g>
          </g>

          <g class="cage-bars" stroke="#66b8ff" stroke-width="5" opacity=".72" filter="url(#neonGlow)">
            <line x1="-220" y1="-340" x2="-220" y2="390"/>
            <line x1="-110" y1="-340" x2="-110" y2="390"/>
            <line x1="0"    y1="-340" x2="0"    y2="390"/>
            <line x1="110"  y1="-340" x2="110"  y2="390"/>
            <line x1="220"  y1="-340" x2="220"  y2="390"/>
          </g>
        </g>
      </g>
    `,

    // LAYER 4: Out-of-Focus Foreground Curtains (3D Depth Framing) + Bottom Vignette
    fg: `
      <g class="cut-1 dof-soft" opacity=".88">
        <path d="M-40 0 L130 0 Q95 750 155 1920 L-40 1920 Z" fill="#04060c"/>
        <path d="M1120 0 L950 0 Q985 750 925 1920 L1120 1920 Z" fill="#04060c"/>
      </g>
      <ellipse cx="540" cy="1860" rx="820" ry="160" fill="#020408" opacity=".95" filter="url(#soft)"/>
    `
  }
};
