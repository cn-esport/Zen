// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (SILKY SCROLL + CLEAN SILHOUETTES • 50s)
// Built for cn-esport/Zen with upgraded skill.css (V2)
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
          <stop offset="0" stop-color="#040812"/>
          <stop offset=".55" stop-color="#0b1528"/>
          <stop offset="1" stop-color="#13223d"/>
        </linearGradient>

        <radialGradient id="phoneGlow">
          <stop offset="0" stop-color="#66b8ff" stop-opacity=".88"/>
          <stop offset=".42" stop-color="#2b7de9" stop-opacity=".30"/>
          <stop offset="1" stop-color="#1a4b8c" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="phoneBeam" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stop-color="#8ad0ff" stop-opacity=".55"/>
          <stop offset=".65" stop-color="#3a8ee6" stop-opacity=".14"/>
          <stop offset="1" stop-color="#3a8ee6" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#66b8ff" stop-opacity="0"/>
          <stop offset=".5" stop-color="#66b8ff" stop-opacity=".32"/>
          <stop offset="1" stop-color="#bce3ff" stop-opacity=".95"/>
        </linearGradient>

        <!-- Strict ClipPath for Phone Screen -->
        <clipPath id="phoneScreenClip">
          <rect x="352" y="454" width="376" height="772" rx="32"/>
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

          .s1-ignite { opacity: 0; animation: cutIn 0.45s ease-out 0.5s forwards; }

          /* ===== SILKY-SMOOTH 60FPS INERTIA SCROLL (4s - 15s) ===== */
          .feed-track {
            will-change: transform;
            animation: silkyScroll 1.4s cubic-bezier(0.22, 1, 0.36, 1) 4.0s 8;
          }
          @keyframes silkyScroll {
            0%   { transform: translate3d(0, 0px, 0); }
            22%  { transform: translate3d(0, 14px, 0); } /* subtle thumb press anticipation */
            85%, 100% { transform: translate3d(0, -240px, 0); } /* exact 1-card height for invisible seamless loop */
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

          /* Shot 3: Hypnotic Golden Dopamine Sparks Drifting From Screen to Eyes (15s - 30s) */
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

          /* Shot 4: Melatonin Moon Fade & Artificial Blue Noon (30s - 42s) */
          .melatonin-fade {
            animation: fadeMoon 5.5s ease-out 34.0s forwards;
          }
          @keyframes fadeMoon {
            to { opacity: 0.08; transform: translateY(35px); }
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
            100% { transform: scaleY(0.06); opacity: 0.25; }
          }
        </style>
      </defs>

      <!-- Base Midnight Backdrop -->
      <rect width="1080" height="1920" fill="url(#sky)"/>

      <!-- SHOT 1 BACKGROUND (0:00 - 0:04): Large Dark Bedroom Window -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <rect x="130" y="240" width="440" height="680" rx="16" fill="#132340" opacity=".32" stroke="#060912" stroke-width="16"/>
        <line x1="350" y1="240" x2="350" y2="920" stroke="#060912" stroke-width="14" opacity=".45"/>
        <line x1="130" y1="580" x2="570" y2="580" stroke="#060912" stroke-width="14" opacity=".45"/>
      </g>

      <!-- SHOT 3 BACKGROUND (0:15 - 0:30): Deep Atmospheric Night Window Behind Silhouette -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <rect x="520" y="220" width="420" height="720" rx="16" fill="#0f1d36" opacity=".35" stroke="#050811" stroke-width="16"/>
        <line x1="730" y1="220" x2="730" y2="940" stroke="#050811" stroke-width="14" opacity=".45"/>
        <line x1="520" y1="580" x2="940" y2="580" stroke="#050811" stroke-width="14" opacity=".45"/>
      </g>

      <!-- SHOT 4 BACKGROUND (0:30 - 0:42): Fading Crescent Moon & Stars -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <g class="melatonin-fade">
          <circle cx="240" cy="340" r="56" fill="#dce7fa" opacity=".88"/>
          <circle cx="265" cy="324" r="50" fill="#081122"/>
          <circle cx="350" cy="285" r="5" fill="#dce7fa"/>
          <circle cx="170" cy="435" r="4" fill="#dce7fa"/>
          <circle cx="420" cy="380" r="3.5" fill="#dce7fa"/>
        </g>
      </g>

      <!-- SHOT 5 BACKGROUND (0:42 - 0:50): Pitch Darkness -->
      <g class="cut-5">
        <rect width="1080" height="1920" fill="#020306"/>
      </g>
    `,

    // LAYER 2: Midground Lighting & Props
    mid: `
      <!-- SHOT 1: Cold Blue Screen Glow -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <g class="s1-ignite flicker">
          <circle cx="660" cy="1120" r="370" fill="url(#phoneGlow)"/>
          <polygon points="635,1135 670,1135 455,830 275,980" fill="url(#phoneBeam)"/>
        </g>
      </g>

      <!-- SHOT 2: Centered Smartphone With Silky-Smooth Seamless Loop Feed -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <circle cx="540" cy="840" r="470" fill="url(#phoneGlow)"/>
        <rect x="330" y="420" width="420" height="840" rx="48" fill="#050811" stroke="#4da6ff" stroke-width="6" filter="url(#neonGlow)"/>
        <rect x="352" y="454" width="376" height="772" rx="32" fill="#0a172e"/>

        <!-- Seamless Repeating Cards (Spaced every 240px so -240px loop is 100% invisible!) -->
        <g clip-path="url(#phoneScreenClip)">
          <g class="feed-track">
            <!-- Card 1 -->
            <rect x="374" y="470" width="332" height="210" rx="20" fill="#1b4d8f" opacity=".75"/>
            <circle cx="425" cy="630" r="16" fill="#66b8ff" opacity=".6"/>
            <rect x="454" y="622" width="130" height="14" rx="7" fill="#80c8ff" opacity=".45"/>

            <!-- Card 2 -->
            <rect x="374" y="710" width="332" height="210" rx="20" fill="#286bc2" opacity=".8"/>
            <circle cx="425" cy="870" r="16" fill="#ffe082" opacity=".7"/>
            <rect x="454" y="862" width="150" height="14" rx="7" fill="#cce8ff" opacity=".5"/>

            <!-- Card 3 -->
            <rect x="374" y="950" width="332" height="210" rx="20" fill="#16427d" opacity=".75"/>
            <circle cx="425" cy="1110" r="16" fill="#66b8ff" opacity=".6"/>
            <rect x="454" y="1102" width="120" height="14" rx="7" fill="#80c8ff" opacity=".45"/>

            <!-- Card 4 (Matches Card 1 for seamless loop) -->
            <rect x="374" y="1190" width="332" height="210" rx="20" fill="#1b4d8f" opacity=".75"/>
            <circle cx="425" cy="1350" r="16" fill="#66b8ff" opacity=".6"/>
            <rect x="454" y="1342" width="130" height="14" rx="7" fill="#80c8ff" opacity=".45"/>
          </g>
        </g>

        <rect x="495" y="434" width="90" height="8" rx="4" fill="#1c2d4a"/>
      </g>

      <!-- SHOT 3: Hypnotic Golden & Blue Dopamine Sparks Rising From Phone Into Eyes -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <circle cx="670" cy="1110" r="390" fill="url(#phoneGlow)"/>
        <g filter="url(#neonGlow)">
          <circle class="dopa-spark" style="--d:15.1s; --dx:-220px; --dy:-260px;" cx="655" cy="1090" r="9" fill="#ffe082"/>
          <circle class="dopa-spark" style="--d:15.7s; --dx:-180px; --dy:-300px;" cx="665" cy="1100" r="7" fill="#80d4ff"/>
          <circle class="dopa-spark" style="--d:16.3s; --dx:-240px; --dy:-230px;" cx="650" cy="1080" r="11" fill="#ffe082"/>
          <circle class="dopa-spark" style="--d:16.9s; --dx:-200px; --dy:-280px;" cx="670" cy="1110" r="8" fill="#99d6ff"/>
        </g>
      </g>

      <!-- SHOT 4: Harsh Artificial Blue Sunbeams + Drifting Ground Fog -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <circle cx="660" cy="1120" r="440" fill="url(#phoneGlow)"/>
        <g stroke="#80c8ff" stroke-width="3.5" opacity=".48" filter="url(#neonGlow)">
          <line x1="660" y1="1120" x2="360" y2="540"/>
          <line x1="660" y1="1120" x2="560" y2="460"/>
          <line x1="660" y1="1120" x2="770" y2="500"/>
          <line x1="660" y1="1120" x2="960" y2="720"/>
        </g>
        <ellipse class="drift-fog" cx="540" cy="1580" rx="740" ry="70" fill="#4da6ff" opacity=".11" filter="url(#soft)"/>
      </g>
    `,

    // LAYER 3: Clean Waist-Up Last Soul Silhouettes (Zero Awkward Bed Shapes!)
    char: `
      <!-- SHOT 1 (0:00 - 0:04): Clean Waist-Up Silhouette by Dark Window -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <g transform="translate(360 1560)">
          <g class="breathe slump" style="--t:0.8s">
            <!-- Clean Waist-Up Torso & Curved Shoulders -->
            <path class="sil" d="M-135 120 C-140 -90 -105 -290 -30 -345 C15 -370 65 -345 85 -285 L125 120 Z"/>
            <!-- Separated Arm & Forearm Holding Phone -->
            <path class="sil" d="M35 -275 L105 -155 L275 -225 L292 -198 L95 -110 L5 -245 Z"/>
            <!-- Smartphone -->
            <g transform="translate(282 -290) rotate(-15)">
              <rect x="0" y="0" width="18" height="116" rx="6" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
              <rect class="s1-ignite" x="-4" y="6" width="6" height="104" rx="3" fill="#d6eeff" filter="url(#neonGlow)"/>
            </g>
            <!-- Neck + Floating Head -->
            <rect class="sil" x="-20" y="-390" width="36" height="50" rx="12"/>
            <g class="head">
              <circle class="sil" cx="4" cy="-455" r="76"/>
              <g class="eyes widen" style="--t:0.6s">
                <g class="eye-wrap L"><ellipse class="eye" cx="22" cy="-448" rx="11" ry="15"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="55" cy="-442" rx="11" ry="15"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 2 (0:04 - 0:15): Articulated Silhouette Hand & Thumb With Smooth Flick Motion -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <path class="hand-swipe sil" d="M960 1560 L770 1230 C710 1135 620 1075 565 985 C535 935 570 890 615 915 C665 942 710 1005 745 1045 C775 1015 815 1025 845 1065 L1080 1360 Z"/>
      </g>

      <!-- SHOT 3 (0:15 - 0:30): Waist-Up Silhouette Hypnotized by Rising Dopamine Sparks -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <g transform="translate(360 1560)">
          <g class="breathe lean-in" style="--t:15.5s">
            <path class="sil" d="M-135 120 C-140 -90 -105 -290 -30 -345 C15 -370 65 -345 85 -285 L125 120 Z"/>
            <path class="sil" d="M35 -275 L105 -155 L275 -225 L292 -198 L95 -110 L5 -245 Z"/>
            <g transform="translate(282 -290) rotate(-15)">
              <rect x="0" y="0" width="18" height="116" rx="6" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
              <rect x="-4" y="6" width="6" height="104" rx="3" fill="#d6eeff" filter="url(#neonGlow)"/>
            </g>
            <rect class="sil" x="-20" y="-390" width="36" height="50" rx="12"/>
            <g class="head">
              <circle class="sil" cx="4" cy="-455" r="76"/>
              <g class="eyes widen" style="--t:16s">
                <g class="eye-wrap L"><ellipse class="eye" cx="22" cy="-448" rx="12" ry="16"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="55" cy="-442" rx="12" ry="16"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 4 (0:30 - 0:42): Waist-Up Silhouette Squinting in Harsh Blue Noon Light -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <g transform="translate(360 1560)">
          <g class="breathe">
            <path class="sil" d="M-135 120 C-140 -90 -105 -290 -30 -345 C15 -370 65 -345 85 -285 L125 120 Z"/>
            <path class="sil" d="M35 -275 L105 -155 L275 -225 L292 -198 L95 -110 L5 -245 Z"/>
            <g transform="translate(282 -290) rotate(-15)">
              <rect x="0" y="0" width="18" height="116" rx="6" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
              <rect x="-4" y="6" width="6" height="104" rx="3" fill="#d6eeff" filter="url(#neonGlow)"/>
            </g>
            <rect class="sil" x="-20" y="-390" width="36" height="50" rx="12"/>
            <g class="head">
              <circle class="sil" cx="4" cy="-455" r="76"/>
              <g class="eyes squint" style="--t:31s; --rot:9deg">
                <g class="eye-wrap L"><ellipse class="eye" cx="22" cy="-448" rx="11" ry="15"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="55" cy="-442" rx="11" ry="15"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 5 (0:42 - 0:50): Trapped Behind Blue Feed Bars -> Screen Off & Eyes Close to Sleep -->
      <g class="cut-5 cam-push" style="--shot-dur:8s; --shot-start:42s;">
        <g transform="translate(540 870)">
          <g class="breathe">
            <path class="sil" d="M-185 370 C-170 215 -115 145 -45 130 L45 130 C115 145 170 215 185 370 Z"/>
            <rect class="sil" x="-22" y="75" width="44" height="65" rx="14"/>
            <circle class="sil" cx="0" cy="0" r="86"/>
            <g class="sleep-eyes">
              <g class="eyes b2">
                <g class="eye-wrap L"><ellipse class="eye" cx="-25" cy="-4" rx="13" ry="17"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="25" cy="-4" rx="13" ry="17"/></g>
              </g>
            </g>
          </g>

          <g class="cage-bars" stroke="#4da6ff" stroke-width="6" opacity=".75" filter="url(#neonGlow)">
            <line x1="-220" y1="-340" x2="-220" y2="390"/>
            <line x1="-110" y1="-340" x2="-110" y2="390"/>
            <line x1="0"    y1="-340" x2="0"    y2="390"/>
            <line x1="110"  y1="-340" x2="110"  y2="390"/>
            <line x1="220"  y1="-340" x2="220"  y2="390"/>
          </g>
        </g>
      </g>
    `,

    // LAYER 4: Clean Atmospheric Bottom Vignette
    fg: `
      <ellipse cx="540" cy="1860" rx="820" ry="160" fill="#020408" opacity=".95" filter="url(#soft)"/>
    `
  }
};
