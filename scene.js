// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (V2 ANATOMY + CAMERA CUTS • 50s)
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
          <stop offset="0" stop-color="#8ad0ff" stop-opacity=".58"/>
          <stop offset=".65" stop-color="#3a8ee6" stop-opacity=".14"/>
          <stop offset="1" stop-color="#3a8ee6" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="dopaFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#154d94" stop-opacity=".85"/>
          <stop offset="1" stop-color="#8ad8ff" stop-opacity=".95"/>
        </linearGradient>

        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#66b8ff" stop-opacity="0"/>
          <stop offset=".5" stop-color="#66b8ff" stop-opacity=".32"/>
          <stop offset="1" stop-color="#bce3ff" stop-opacity=".95"/>
        </linearGradient>

        <!-- Strict ClipPaths so animated elements NEVER spill outside containers -->
        <clipPath id="phoneScreenClip">
          <rect x="352" y="454" width="376" height="772" rx="32"/>
        </clipPath>

        <clipPath id="profileHeadClip">
          <path d="M510 500 C670 500 770 610 770 760 C770 840 740 895 755 935 C765 960 735 980 715 985 C725 1015 715 1045 670 1055 L615 1065 L615 1220 L405 1220 L405 1010 C335 950 300 860 300 760 C300 605 390 500 510 500 Z"/>
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

          /* Shot 2: Clipped Feed Scroll, Thumb Swipe & Light Orbs (4s - 15s) */
          .feed-track {
            animation: feedSlide 1.15s linear 4.0s 10;
          }
          @keyframes feedSlide {
            0%   { transform: translateY(0px); }
            100% { transform: translateY(-240px); }
          }

          .hand-swipe {
            transform-box: fill-box;
            transform-origin: 85% 90%;
            animation: thumbArc 1.15s ease-in-out 4.0s 10;
          }
          @keyframes thumbArc {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            45%      { transform: translateY(-55px) rotate(-9deg); }
          }

          .orb-burst {
            opacity: 0;
            animation: orbFloat 1.15s ease-out var(--d, 4.2s) 10;
          }
          @keyframes orbFloat {
            0%   { transform: translate(0, 0) scale(0.4); opacity: 0; }
            25%  { opacity: 0.95; }
            100% { transform: translate(var(--ox, -60px), -340px) scale(1.25); opacity: 0; }
          }

          /* Shot 3: Dopamine Wave Inside Clipped Head Profile (15s - 30s) */
          .dopa-wave {
            transform-box: fill-box;
            transform-origin: 50% 100%;
            animation: waveBounce 1.3s ease-in-out 15.0s 11;
          }
          @keyframes waveBounce {
            0%, 100% { transform: scaleY(0.45); opacity: 0.65; }
            45%      { transform: scaleY(1.22); opacity: 1; }
          }

          .spark-rise {
            animation: riseUp 1.3s ease-out 15.0s 11;
          }
          @keyframes riseUp {
            0%   { transform: translateY(140px) scale(0.5); opacity: 0; }
            35%  { opacity: 1; }
            100% { transform: translateY(-180px) scale(1.2); opacity: 0; }
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

      <!-- SHOT 1 BACKGROUND (0:00 - 0:04): Minimalist Bedroom Window & Headboard -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <rect x="115" y="210" width="300" height="440" rx="12" fill="#132340" opacity=".32" stroke="#060912" stroke-width="14"/>
        <line x1="265" y1="210" x2="265" y2="650" stroke="#060912" stroke-width="12" opacity=".45"/>
        <line x1="115" y1="430" x2="415" y2="430" stroke="#060912" stroke-width="12" opacity=".45"/>
        <!-- Wooden Bed Headboard -->
        <rect x="150" y="920" width="90" height="540" rx="16" fill="#070b14"/>
      </g>

      <!-- SHOT 3 BACKGROUND (0:15 - 0:30): Human Head Profile Silhouette & Dopamine Wave -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <rect width="1080" height="1920" fill="#040812"/>
        <!-- Human Side-Profile Head & Neck Outline -->
        <path d="M510 500 C670 500 770 610 770 760 C770 840 740 895 755 935 C765 960 735 980 715 985 C725 1015 715 1045 670 1055 L615 1065 L615 1220 L405 1220 L405 1010 C335 950 300 860 300 760 C300 605 390 500 510 500 Z"
              fill="#071124" stroke="#4da6ff" stroke-width="5" filter="url(#neonGlow)"/>
        <!-- Clipped Interior Dopamine Wave & Neural Sparks -->
        <g clip-path="url(#profileHeadClip)">
          <path class="dopa-wave" d="M260 930 Q400 660 540 860 T810 710 L810 1240 L260 1240 Z" fill="url(#dopaFill)" filter="url(#neonGlow)"/>
          <circle class="spark-rise" cx="460" cy="840" r="10" fill="#ffe082" filter="url(#neonGlow)"/>
          <circle class="spark-rise" cx="560" cy="790" r="14" fill="#99d6ff" filter="url(#neonGlow)"/>
          <circle class="spark-rise" cx="650" cy="860" r="10" fill="#ffe082" filter="url(#neonGlow)"/>
        </g>
      </g>

      <!-- SHOT 4 BACKGROUND (0:30 - 0:42): Fading Crescent Moon & Night Sky -->
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
      <!-- SHOT 1: Bed Mattress & Flickering Cold Blue Phone Cone -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <path d="M0 1420 Q460 1370 1080 1450 L1080 1920 L0 1920 Z" fill="#060911"/>
        <g class="s1-ignite flicker">
          <circle cx="645" cy="1125" r="350" fill="url(#phoneGlow)"/>
          <polygon points="622,1135 654,1135 450,885 285,1015" fill="url(#phoneBeam)"/>
        </g>
      </g>

      <!-- SHOT 2: Centered Vertical Smartphone With Clipped Scrolling Feed & Glowing Orbs -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <circle cx="540" cy="840" r="470" fill="url(#phoneGlow)"/>
        <!-- Phone Outer Frame -->
        <rect x="330" y="420" width="420" height="840" rx="48" fill="#050811" stroke="#4da6ff" stroke-width="6" filter="url(#neonGlow)"/>
        <!-- Screen Base -->
        <rect x="352" y="454" width="376" height="772" rx="32" fill="#0a172e"/>

        <!-- Strictly Clipped Feed Cards (Zero Overflow!) -->
        <g clip-path="url(#phoneScreenClip)">
          <g class="feed-track" opacity=".58">
            <rect x="374" y="460"  width="332" height="210" rx="20" fill="#2364b8"/>
            <rect x="374" y="700"  width="332" height="210" rx="20" fill="#3a8ee6"/>
            <rect x="374" y="940"  width="332" height="210" rx="20" fill="#1a4f96"/>
            <rect x="374" y="1180" width="332" height="210" rx="20" fill="#4da6ff"/>
          </g>
        </g>

        <!-- Top Speaker Pill -->
        <rect x="495" y="434" width="90" height="8" rx="4" fill="#1c2d4a"/>
      </g>

      <!-- SHOT 4: Harsh Artificial Blue Sunbeams + Drifting Ground Fog -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <path d="M0 1420 Q460 1370 1080 1450 L1080 1920 L0 1920 Z" fill="#060911"/>
        <circle cx="645" cy="1125" r="440" fill="url(#phoneGlow)"/>
        <!-- Artificial Noon Sunbeams Radiating From Screen -->
        <g stroke="#80c8ff" stroke-width="3.5" opacity=".48" filter="url(#neonGlow)">
          <line x1="645" y1="1125" x2="360" y2="560"/>
          <line x1="645" y1="1125" x2="560" y2="480"/>
          <line x1="645" y1="1125" x2="760" y2="520"/>
          <line x1="645" y1="1125" x2="960" y2="740"/>
        </g>
        <ellipse class="drift-fog" cx="540" cy="1440" rx="720" ry="65" fill="#4da6ff" opacity=".10" filter="url(#soft)"/>
      </g>
    `,

    // LAYER 3: True Human Silhouette Anatomy (Head + Neck Gap + Shoulders + Separated Arm + Knees)
    char: `
      <!-- SHOT 1 (0:00 - 0:04): Tired Human Silhouette Sitting in Bed -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <g transform="translate(360 1435)">
          <ellipse cx="140" cy="15" rx="340" ry="24" fill="#000" opacity=".82"/>
          <g class="breathe slump" style="--t:0.8s">
            <!-- Blanket Over Bent Knees & Legs (Right Side) -->
            <path class="sil" d="M20 20 L40 -140 Q190 -245 270 -225 Q340 -205 420 20 Z"/>
            <!-- Human Upper Back, Curved Shoulders & Torso (Left Side) -->
            <path class="sil" d="M-115 20 C-125 -130 -95 -275 -30 -325 C10 -350 55 -330 70 -275 L95 -130 L65 20 Z"/>
            <!-- Separated Upper Arm & Forearm Holding Smartphone (Clear Gap Between Arm & Torso!) -->
            <path class="sil" d="M25 -270 L95 -165 L245 -225 L260 -200 L85 -125 L-5 -245 Z"/>
            <!-- Smartphone Held in Hand -->
            <g transform="translate(252 -285) rotate(-16)">
              <rect x="0" y="0" width="16" height="106" rx="5" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
              <rect class="s1-ignite" x="-4" y="6" width="6" height="94" rx="3" fill="#d6eeff" filter="url(#neonGlow)"/>
            </g>
            <!-- Distinct Neck + Floating Head Directly Above Shoulders (Zero Transform Conflict!) -->
            <rect class="sil" x="-22" y="-365" width="34" height="45" rx="12"/>
            <g class="head">
              <circle class="sil" cx="0" cy="-425" r="70"/>
              <g class="eyes widen" style="--t:0.6s">
                <g class="eye-wrap L"><ellipse class="eye" cx="16" cy="-418" rx="10" ry="14"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="47" cy="-412" rx="10" ry="14"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 2 (0:04 - 0:15): Articulated Silhouette Hand & Thumb Swiping + Hypnotic Light Orbs -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <!-- Articulated Forearm, Palm & Swiping Thumb Silhouette -->
        <path class="hand-swipe sil" d="M960 1560 L770 1230 C710 1135 620 1075 565 985 C535 935 570 890 615 915 C665 942 710 1005 745 1045 C775 1015 815 1025 845 1065 L1080 1360 Z"/>
        <!-- Soft Golden & Blue Dopamine Orbs Floating Upward -->
        <g filter="url(#neonGlow)">
          <circle class="orb-burst" style="--d:4.2s; --ox:-95px;" cx="560" cy="880" r="14" fill="#ffe082"/>
          <circle class="orb-burst" style="--d:4.6s; --ox:45px;"  cx="590" cy="860" r="11" fill="#80d4ff"/>
          <circle class="orb-burst" style="--d:5.0s; --ox:-35px;" cx="575" cy="900" r="16" fill="#ffe082"/>
          <circle class="orb-burst" style="--d:5.4s; --ox:90px;"  cx="605" cy="870" r="12" fill="#66b8ff"/>
        </g>
      </g>

      <!-- SHOT 4 (0:30 - 0:42): Human Silhouette Bathed in Artificial Noon Light -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <g transform="translate(360 1435)">
          <g class="breathe">
            <path class="sil" d="M20 20 L40 -140 Q190 -245 270 -225 Q340 -205 420 20 Z"/>
            <path class="sil" d="M-115 20 C-125 -130 -95 -275 -30 -325 C10 -350 55 -330 70 -275 L95 -130 L65 20 Z"/>
            <path class="sil" d="M25 -270 L95 -165 L245 -225 L260 -200 L85 -125 L-5 -245 Z"/>
            <g transform="translate(252 -285) rotate(-16)">
              <rect x="0" y="0" width="16" height="106" rx="5" fill="#050505" stroke="#4da6ff" stroke-width="2"/>
              <rect x="-4" y="6" width="6" height="94" rx="3" fill="#d6eeff" filter="url(#neonGlow)"/>
            </g>
            <rect class="sil" x="-22" y="-365" width="34" height="45" rx="12"/>
            <g class="head">
              <circle class="sil" cx="0" cy="-425" r="70"/>
              <g class="eyes squint" style="--t:31s; --rot:9deg">
                <g class="eye-wrap L"><ellipse class="eye" cx="16" cy="-418" rx="10" ry="14"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="47" cy="-412" rx="10" ry="14"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 5 (0:42 - 0:50): Trapped Behind Blue Feed Bars -> Phone Off & Eyes Close to Sleep -->
      <g class="cut-5 cam-push" style="--shot-dur:8s; --shot-start:42s;">
        <g transform="translate(540 870)">
          <g class="breathe">
            <!-- Human Shoulders & Neck -->
            <path class="sil" d="M-185 370 C-170 215 -115 145 -45 130 L45 130 C115 145 170 215 185 370 Z"/>
            <rect class="sil" x="-22" y="75" width="44" height="65" rx="14"/>
            <!-- Head -->
            <circle class="sil" cx="0" cy="0" r="86"/>
            <!-- Glowing Eyes That Slowly Close at 46.5s -->
            <g class="sleep-eyes">
              <g class="eyes b2">
                <g class="eye-wrap L"><ellipse class="eye" cx="-25" cy="-4" rx="13" ry="17"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="25" cy="-4" rx="13" ry="17"/></g>
              </g>
            </g>
          </g>

          <!-- Vertical Blue Feed Cage Bars (Vanish at 46.4s when phone is put down) -->
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
