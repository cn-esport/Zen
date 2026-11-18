// ==========================================
// SCENE CONTENT ONLY
// Sound options: "footsteps" | "clock" | "rain" | "heartbeat" | "wind"
// ==========================================
const SCENE_DATA = {
  duration: 15,
  sound: "footsteps",
  captions: [
    { start: 1.8, length: 4.1, text: "Sometimes you walk alone… not because nobody cares." },
    { start: 6.3, length: 4.3, text: "You walk alone because nobody truly understands." },
    { start: 11.0, length: 2.6, text: "And in that silence, you finally hear yourself." }
  ],
  layers: {
    bg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a111f"/>
          <stop offset=".55" stop-color="#16243d"/>
          <stop offset="1" stop-color="#26354d"/>
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0" stop-color="#ffb454" stop-opacity=".65"/>
          <stop offset=".45" stop-color="#ffb454" stop-opacity=".18"/>
          <stop offset="1" stop-color="#ffb454" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="lampCone" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stop-color="#ffb454" stop-opacity=".32"/>
          <stop offset="1" stop-color="#ffb454" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffb454" stop-opacity="0"/>
          <stop offset=".6" stop-color="#ffb454" stop-opacity=".2"/>
          <stop offset="1" stop-color="#ffb454" stop-opacity=".8"/>
        </linearGradient>
        <filter id="eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="8" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="soft"><feGaussianBlur stdDeviation="35"/></filter>
      </defs>

      <rect width="1080" height="1920" fill="url(#sky)"/>
      <circle cx="240" cy="310" r="42" fill="#dce7fa" opacity=".8"/>
      <circle cx="258" cy="298" r="38" fill="#101b30"/>
      <path d="M0 1280 L0 1090 L110 1090 L110 1020 L220 1020 L220 1120 L340 1120 L340 980 L470 980 L470 1140 L630 1140 L630 1050 L770 1050 L770 1110 L920 1110 L920 1010 L1080 1010 L1080 1280 Z" fill="#0e1729"/>
    `,
    mid: `
      <rect x="0" y="1260" width="1080" height="660" fill="#090d16"/>
      <ellipse cx="770" cy="1470" rx="260" ry="34" fill="#ffb454" opacity=".16" filter="url(#soft)"/>
      <circle cx="770" cy="590" r="240" fill="url(#lampGlow)"/>
      <polygon points="735,595 805,595 1030,1480 510,1480" fill="url(#lampCone)"/>
      <path d="M840 1480 L840 560 Q840 520 795 520 L755 520" fill="none" stroke="#050505" stroke-width="16" stroke-linecap="round"/>
      <rect x="735" y="520" width="55" height="18" rx="6" fill="#050505"/>
      <ellipse cx="762" cy="542" rx="22" ry="8" fill="#ffe2b0"/>
      <ellipse cx="540" cy="1330" rx="750" ry="70" fill="#8fa6c8" opacity=".10" filter="url(#soft)"/>
    `,
    char: `
      <g transform="translate(460 1485)">
        <ellipse cx="-15" cy="8" rx="170" ry="20" fill="#000" opacity=".7"/>
        <g class="walk">
          <path class="sil" d="M-95 0 L-82 -310 Q-74 -415 -34 -445 L34 -445 Q74 -415 82 -310 L95 0 Z"/>
          <g class="head">
            <circle class="sil" cx="0" cy="-530" r="68"/>
            <g class="eyes widen" style="--t:6.3s">
              <g class="eye-wrap L"><ellipse class="eye" cx="-10" cy="-532" rx="11" ry="16"/></g>
              <g class="eye-wrap R"><ellipse class="eye" cx="32" cy="-532" rx="11" ry="16"/></g>
            </g>
          </g>
        </g>
      </g>
    `,
    fg: `
      <path d="M-30 1920 L-30 1660 Q45 1610 75 1710 Q145 1580 215 1770 Q290 1640 370 1920 Z" fill="#050505"/>
      <path d="M760 1920 Q835 1660 895 1750 Q960 1600 1025 1710 L1110 1640 L1110 1920 Z" fill="#050505"/>
      <ellipse cx="540" cy="1840" rx="750" ry="95" fill="#050505" opacity=".9" filter="url(#soft)"/>
    `
  }
};
