// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (V4 DIRECTOR'S CUT • 50s)
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sound: "clock",
  sfx: [
    { at: 0.6,  type: "notification" },
    { at: 4.0,  type: "whoosh" },
    { at: 5.4,  type: "swipe" },
    { at: 8.2,  type: "swipe" },
    { at: 11.0, type: "swipe" },
    { at: 15.0, type: "boom" },
    { at: 16.5, type: "chime" },
    { at: 22.0, type: "chime" },
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
    bg: `
      <defs>
        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050811"/>
          <stop offset=".55" stop-color="#0b1426"/>
          <stop offset="1" stop-color="#13223b"/>
        </linearGradient>

        <radialGradient id="screenAura">
          <stop offset="0" stop-color="#7cc4ff" stop-opacity=".75"/>
          <stop offset=".45" stop-color="#276bc2" stop-opacity=".24"/>
          <stop offset="1" stop-color="#10294d" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="lightCone" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stop-color="#9ad4ff" stop-opacity=".42"/>
          <stop offset=".75" stop-color="#3a8ee6" stop-opacity=".08"/>
          <stop offset="1" stop-color="#3a8ee6" stop-opacity="0"/>
        </linearGradient>

        <clipPath id="screenClip">
          <rect x="360" y="460" width="360" height="760" rx="34"/>
        </clipPath>

        <filter id="eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="softGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="8" result="g1"/>
          <feMerge><feMergeNode in="g1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="blurSoft"><feGaussianBlur stdDeviation="28"/></filter>

        <style>
          .cut-1 { opacity: 1; animation: cutOut 0.2s linear 4.0s forwards; }
          .cut-2 { opacity: 0; animation: cutIn 0.2s linear 4.0s forwards, cutOut 0.2s linear 15.0s forwards; }
          .cut-3 { opacity: 0; animation: cutIn 0.2s linear 15.0s forwards, cutOut 0.2s linear 30.0s forwards; }
          .cut-4 { opacity: 0; animation: cutIn 0.2s linear 30.0s forwards, cutOut 0.2s linear 42.0s forwards; }
          .cut-5 { opacity: 0; animation: cutIn 0.2s linear 42.0s forwards; }

          @keyframes cutIn  { to { opacity: 1; } }
          @keyframes cutOut { to { opacity: 0; } }

          .ignite { opacity: 0; animation: cutIn 0.5s ease-out 0.6s forwards; }

          /* Ultra-Smooth 60fps Infinite Feed Glide (4s - 15s) */
          .feed-glide {
            will-change: transform;
            animation: smoothFeed 1.4s cubic-bezier(0.22, 1, 0.36, 1) 4.0s 8;
          }
          @keyframes smoothFeed {
            0%        { transform: translate3d(0, 0px, 0); }
            18%       { transform: translate3d(0, 12px, 0); }
            85%, 100% { transform: translate3d(0, -250px, 0); }
          }

          .thumb-glide {
            will-change: transform;
            transform-box: fill-box;
            transform-origin: 90% 90%;
            animation: smoothThumb 1.4s cubic-bezier(0.22, 1, 0.36, 1) 4.0s 8;
          }
          @keyframes smoothThumb {
            0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); }
            18%      { transform: translate3d(0, 8px, 0) rotate(1.5deg); }
            55%      { transform: translate3d(-12px, -58px, 0) rotate(-8deg); }
          }

          /* Shot 3: Golden Dopamine Motes Floating Gently From Screen to Eyes */
          .gold-mote {
            will-change: transform, opacity;
            opacity: 0;
            animation: floatMote 2.6s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 15s) infinite;
          }
          @keyframes floatMote {
            0%   { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
            25%  { opacity: 0.9; }
            100% { transform: translate3d(var(--dx, -220px), var(--dy, -260px), 0) scale(1.1); opacity: 0; }
          }

          /* Shot 4: Moon Fades Out in Fake Noon Light */
          .moon-fade { animation: fadeMoon 6s ease-out 33.5s forwards; }
          @keyframes fadeMoon { to { opacity: 0.06; transform: translateY(25px); } }

          /* Shot 5: Cage Light Snaps Off at 46.4s -> Eyes Close to Sleep */
          .bars-off { animation: cutOut 0.25s ease-in 46.4s forwards; }
          .eyes-sleep {
            transform-box: fill-box;
            transform-origin: center;
            animation: sleepClose 1.3s ease-in-out 46.5s forwards;
          }
          @keyframes sleepClose {
            0%   { transform: scaleY(1); opacity: 1; }
            100% { transform: scaleY(0.05); opacity: 0.2; }
          }
        </style>
      </defs>

      <!-- Rich Nocturne Gouache Sky -->
      <rect width="1080" height="1920" fill="url(#nightSky)"/>

      <!-- SHOT 1 & SHOT 3: Minimalist Moonlit Window Frame (Clean Negative Space) -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <rect x="120" y="240" width="440" height="720" rx="8" fill="#152642" opacity=".32"/>
        <line x1="340" y1="240" x2="340" y2="960" stroke="#060911" stroke-width="10"/>
        <line x1="120" y1="600" x2="560" y2="600" stroke="#060911" stroke-width="10"/>
      </g>

      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <rect x="520" y="240" width="440" height="720" rx="8" fill="#152642" opacity=".28"/>
        <line x1="740" y1="240" x2="740" y2="960" stroke="#060911" stroke-width="10"/>
        <line x1="520" y1="600" x2="960" y2="600" stroke="#060911" stroke-width="10"/>
      </g>

      <!-- SHOT 4: Crescent Moon & Stars Being Washed Out -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <g class="moon-fade">
          <circle cx="240" cy="340" r="54" fill="#dce7fa" opacity=".88"/>
          <circle cx="264" cy="324" r="48" fill="#091120"/>
          <circle cx="350" cy="285" r="4" fill="#dce7fa"/>
          <circle cx="170" cy="435" r="3.5" fill="#dce7fa"/>
        </g>
      </g>

      <!-- SHOT 5: Pure Darkness -->
      <g class="cut-5"><rect width="1080" height="1920" fill="#030408"/></g>
    `,

    mid: `
      <!-- SHOT 1: Clean Screen Aura & Light Cone -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <g class="ignite">
          <circle cx="670" cy="1130" r="380" fill="url(#screenAura)"/>
          <polygon points="650,1140 680,1140 460,820 270,980" fill="url(#lightCone)"/>
        </g>
      </g>

      <!-- SHOT 2: Minimalist Floating Glass Smartphone & Seamless Card Glide -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <circle cx="540" cy="840" r="460" fill="url(#screenAura)"/>
        <!-- Sleek Minimalist Phone Body -->
        <rect x="340" y="430" width="400" height="820" rx="46" fill="#060911" stroke="#66b8ff" stroke-width="3" opacity=".9"/>
        <rect x="360" y="460" width="360" height="760" rx="34" fill="#0b182e"/>

        <!-- Clipped Smooth-Gliding Video Cards (250px pitch = invisible seamless reset) -->
        <g clip-path="url(#screenClip)">
          <g class="feed-glide">
            <rect x="382" y="480" width="316" height="220" rx="22" fill="#1a4b8c" opacity=".75"/>
            <rect x="382" y="730" width="316" height="220" rx="22" fill="#2667bd" opacity=".82"/>
            <rect x="382" y="980" width="316" height="220" rx="22" fill="#163f78" opacity=".75"/>
            <rect x="382" y="1230" width="316" height="220" rx="22" fill="#1a4b8c" opacity=".75"/>
          </g>
        </g>
      </g>

      <!-- SHOT 3: Golden Dopamine Motes Rising From Phone Toward Character -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <circle cx="670" cy="1130" r="390" fill="url(#screenAura)"/>
        <g filter="url(#softGlow)">
          <circle class="gold-mote" style="--d:15.2s; --dx:-230px; --dy:-270px;" cx="660" cy="1110" r="8" fill="#ffe082"/>
          <circle class="gold-mote" style="--d:16.0s; --dx:-190px; --dy:-310px;" cx="670" cy="1120" r="6" fill="#9ad4ff"/>
          <circle class="gold-mote" style="--d:16.8s; --dx:-250px; --dy:-240px;" cx="655" cy="1100" r="9" fill="#ffe082"/>
        </g>
      </g>

      <!-- SHOT 4: Daylight-Blue Beams Flooding the Sky -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <circle cx="670" cy="1130" r="450" fill="url(#screenAura)"/>
        <g stroke="#8ad0ff" stroke-width="2.5" opacity=".38" filter="url(#softGlow)">
          <line x1="670" y1="1130" x2="340" y2="500"/>
          <line x1="670" y1="1130" x2="560" y2="420"/>
          <line x1="670" y1="1130" x2="780" y2="460"/>
          <line x1="670" y1="1130" x2="960" y2="680"/>
        </g>
      </g>
    `,

    char: `
      <!-- SHOT 1 (0:00 - 0:04): Iconic Last Soul Medium Close-Up (Pure Solid Silhouette) -->
      <g class="cut-1 cam-push" style="--shot-dur:4.2s; --shot-start:0s;">
        <g transform="translate(360 1580)">
          <g class="breathe">
            <!-- Unified Clean Body + Arm Silhouette (Zero Overlapping Lines!) -->
            <path class="sil-lit" d="M-140 160 C-145 -80 -105 -290 -25 -345 C20 -370 65 -340 85 -275 C95 -235 110 -195 135 -175 L285 -235 L298 -208 L115 -125 C85 -112 65 -125 55 -150 L95 160 Z"/>
            <!-- Sleek Glowing Phone -->
            <g transform="translate(290 -298) rotate(-14)">
              <rect x="0" y="0" width="14" height="110" rx="5" fill="#050609"/>
              <rect class="ignite" x="-3" y="6" width="5" height="98" rx="2.5" fill="#e0f2ff" filter="url(#softGlow)"/>
            </g>
            <!-- Clean Neck & Tilted Head -->
            <rect class="sil" x="-16" y="-392" width="32" height="54" rx="12"/>
            <g class="head">
              <circle class="sil-lit" cx="6" cy="-456" r="76"/>
              <path class="brow" d="M10 -474 Q24 -480 36 -470"/>
              <path class="brow" d="M46 -467 Q58 -473 68 -462"/>
              <g class="eyes widen" style="--t:0.6s">
                <g class="eye-wrap L"><ellipse class="eye" cx="24" cy="-448" rx="11" ry="14"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="56" cy="-442" rx="11" ry="14"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 2 (0:04 - 0:15): Clean Minimalist Thumb Silhouette -->
      <g class="cut-2 cam-push" style="--shot-dur:11s; --shot-start:4s;">
        <path class="thumb-glide sil-lit" d="M980 1580 L780 1240 C720 1140 630 1080 575 990 C545 940 580 895 625 920 C675 948 720 1010 755 1050 L1080 1380 Z"/>
      </g>

      <!-- SHOT 3 (0:15 - 0:30): Leaning Into the Golden Dopamine Motes -->
      <g class="cut-3 cam-push" style="--shot-dur:15s; --shot-start:15s;">
        <g transform="translate(360 1580)">
          <g class="breathe lean-in" style="--t:15.5s">
            <path class="sil-lit" d="M-140 160 C-145 -80 -105 -290 -25 -345 C20 -370 65 -340 85 -275 C95 -235 110 -195 135 -175 L285 -235 L298 -208 L115 -125 C85 -112 65 -125 55 -150 L95 160 Z"/>
            <g transform="translate(290 -298) rotate(-14)">
              <rect x="0" y="0" width="14" height="110" rx="5" fill="#050609"/>
              <rect x="-3" y="6" width="5" height="98" rx="2.5" fill="#e0f2ff" filter="url(#softGlow)"/>
            </g>
            <rect class="sil" x="-16" y="-392" width="32" height="54" rx="12"/>
            <g class="head">
              <circle class="sil-lit" cx="6" cy="-456" r="76"/>
              <path class="brow" d="M10 -478 Q24 -486 36 -476"/>
              <path class="brow" d="M46 -472 Q58 -480 68 -470"/>
              <g class="eyes widen" style="--t:16s">
                <g class="eye-wrap L"><ellipse class="eye" cx="24" cy="-448" rx="12" ry="15"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="56" cy="-442" rx="12" ry="15"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 4 (0:30 - 0:42): Squinting in Artificial Noon Light -->
      <g class="cut-4 cam-pull" style="--shot-dur:12s; --shot-start:30s;">
        <g transform="translate(360 1580)">
          <g class="breathe">
            <path class="sil-lit" d="M-140 160 C-145 -80 -105 -290 -25 -345 C20 -370 65 -340 85 -275 C95 -235 110 -195 135 -175 L285 -235 L298 -208 L115 -125 C85 -112 65 -125 55 -150 L95 160 Z"/>
            <g transform="translate(290 -298) rotate(-14)">
              <rect x="0" y="0" width="14" height="110" rx="5" fill="#050609"/>
              <rect x="-3" y="6" width="5" height="98" rx="2.5" fill="#e0f2ff" filter="url(#softGlow)"/>
            </g>
            <rect class="sil" x="-16" y="-392" width="32" height="54" rx="12"/>
            <g class="head">
              <circle class="sil-lit" cx="6" cy="-456" r="76"/>
              <path class="brow" d="M12 -468 L36 -462"/>
              <path class="brow" d="M46 -460 L68 -464"/>
              <g class="eyes squint" style="--t:31s; --rot:9deg">
                <g class="eye-wrap L"><ellipse class="eye" cx="24" cy="-448" rx="11" ry="14"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="56" cy="-442" rx="11" ry="14"/></g>
              </g>
            </g>
          </g>
        </g>
      </g>

      <!-- SHOT 5 (0:42 - 0:50): Hostage Behind Screen Light Bars -> Lights Out & Sleep -->
      <g class="cut-5 cam-push" style="--shot-dur:8s; --shot-start:42s;">
        <g transform="translate(540 870)">
          <g class="breathe">
            <path class="sil" d="M-190 380 C-175 215 -115 145 -45 130 L45 130 C115 145 175 215 190 380 Z"/>
            <rect class="sil" x="-20" y="75" width="40" height="65" rx="14"/>
            <circle class="sil" cx="0" cy="0" r="86"/>
            <path class="brow" d="M-42 -26 Q-25 -34 -10 -26"/>
            <path class="brow" d="M10 -26 Q25 -34 42 -26"/>
            <g class="eyes-sleep">
              <g class="eyes">
                <g class="eye-wrap L"><ellipse class="eye" cx="-25" cy="-4" rx="13" ry="16"/></g>
                <g class="eye-wrap R"><ellipse class="eye" cx="25" cy="-4" rx="13" ry="16"/></g>
              </g>
            </g>
          </g>

          <g class="bars-off" stroke="#66b8ff" stroke-width="4" opacity=".62" filter="url(#softGlow)">
            <line x1="-220" y1="-340" x2="-220" y2="390"/>
            <line x1="-110" y1="-340" x2="-110" y2="390"/>
            <line x1="0"    y1="-340" x2="0"    y2="390"/>
            <line x1="110"  y1="-340" x2="110"  y2="390"/>
            <line x1="220"  y1="-340" x2="220"  y2="390"/>
          </g>
        </g>
      </g>
    `,

    fg: `
      <ellipse cx="540" cy="1860" rx="840" ry="180" fill="#020306" opacity=".96" filter="url(#blurSoft)"/>
    `
  }
};
