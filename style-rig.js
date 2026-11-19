  /* ------------------------------------------------------------------------
     7. LAST SOUL ANIMATOR: 4-LAYER SVG NOIR BEDROOM SCENE BUILDER
        - Solid #050505 lean 17-18yo silhouette with glowing #FFFFFF eyes
        - Symmetrical lamp glow, twilight skyline window, drifting dust motes
     ------------------------------------------------------------------------ */
  buildNoirBedroomSvg(aspectRatio = "9:16", opts = {}) {
    const {
      clockText = "02:14",
      eyeBeat = "widen", // "widen" | "squint"
      eyeBeatTime = "6.5s",
      dustCount = 36
    } = opts;

    const isVertical = aspectRatio === "9:16";
    const vb = isVertical ? "0 0 1080 1920" : "0 0 1920 1080";
    const charShift = isVertical ? "translate(385 1255)" : "translate(805 685) scale(0.76)";
    const roomShift = isVertical ? "" : "translate(420 -260) scale(0.76)";

    // Deterministic seeded dust motes
    let s = 7;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    let dustHtml = "";
    for (let i = 0; i < dustCount; i++) {
      const z = (1 + rand() * 2.6).toFixed(1);
      const left = (rand() * 100).toFixed(1);
      const top = (rand() * 100).toFixed(1);
      const dx = (rand() * 6 - 2).toFixed(1);
      const dy = (-2 - rand() * 8).toFixed(1);
      const dur = (10 + rand() * 14).toFixed(1);
      const delay = (-rand() * 20).toFixed(1);
      dustHtml += `<i style="left:${left}%;top:${top}%;width:${z}px;height:${z}px;--dx:${dx}vw;--dy:${dy}vh;animation-duration:${dur}s;animation-delay:${delay}s"></i>`;
    }

    return `
      <div class="ls-camera">
        <!-- LAYER 1: OUTDOOR SKY & CITY THROUGH WINDOW -->
        <svg class="layer L-bg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ls-wallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#11151d"/>
              <stop offset=".6" stop-color="#1b2230"/>
              <stop offset="1" stop-color="#141923"/>
            </linearGradient>
            <linearGradient id="ls-nightSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#0b1426"/>
              <stop offset="1" stop-color="#1e3150"/>
            </linearGradient>
            <radialGradient id="ls-lampAmbient" cx="50%" cy="50%" r="50%">
              <stop offset="0" stop-color="#ffbe6b" stop-opacity=".42"/>
              <stop offset=".55" stop-color="#ff9d3b" stop-opacity=".12"/>
              <stop offset="1" stop-color="#ff9d3b" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="ls-lampBeam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#ffd28e" stop-opacity=".35"/>
              <stop offset="1" stop-color="#ffd28e" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="ls-rim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#ffb454" stop-opacity=".75"/>
              <stop offset=".45" stop-color="#ffb454" stop-opacity=".18"/>
              <stop offset="1" stop-color="#9fb8d9" stop-opacity=".25"/>
            </linearGradient>
            <filter id="ls-eyeGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="4" result="b1"/>
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2"/>
              <feMerge>
                <feMergeNode in="b2"/>
                <feMergeNode in="b1"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g transform="${roomShift}">
            <rect x="400" y="340" width="480" height="600" fill="url(#ls-nightSky)"/>
            <path d="M755 445 A36 36 0 1 0 795 495 A28 28 0 1 1 755 445 Z" fill="#e6f0ff"/>
            <path d="M400 840 L480 780 L560 830 L660 760 L780 820 L880 770 L880 940 L400 940 Z" fill="#131e33"/>
            <path d="M420 940 V830 H490 V940 M510 940 V800 H590 V940 M630 940 V785 H715 V940 M740 940 V825 H840 V940" fill="#0c1322"/>
            <rect x="655" y="815" width="10" height="12" fill="#ffd27d" opacity=".7"/>
          </g>
        </svg>

        <!-- LAYER 2: ROOM WALL, WINDOW FRAME, FLOOR & FURNITURE -->
        <svg class="layer L-mid" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">
          <g transform="${roomShift}">
            <path fill-rule="evenodd" fill="url(#ls-wallGrad)"
              d="M-600 -200 H2200 V1420 H-600 Z M420 360 H860 V920 H420 Z"/>

            <!-- Window Frame & Sill -->
            <rect x="420" y="360" width="440" height="560" fill="none" stroke="#0d1118" stroke-width="14"/>
            <rect x="634" y="360" width="12" height="560" fill="#0d1118"/>
            <rect x="420" y="634" width="440" height="12" fill="#0d1118"/>
            <rect x="402" y="920" width="476" height="14" rx="2" fill="#18202e"/>

            <!-- Wooden Floor & Baseboard -->
            <rect x="-600" y="1395" width="2800" height="25" fill="#131822"/>
            <rect x="-600" y="1420" width="2800" height="800" fill="#1d2432"/>
            <g stroke="#131822" stroke-width="3" opacity=".65">
              <line x1="-600" y1="1475" x2="2200" y2="1475"/>
              <line x1="-600" y1="1540" x2="2200" y2="1540"/>
              <line x1="-600" y1="1615" x2="2200" y2="1615"/>
              <line x1="-600" y1="1700" x2="2200" y2="1700"/>
            </g>

            <!-- Bedside Nightstand -->
            <g transform="translate(85 1175)">
              <rect x="0" y="0" width="225" height="245" rx="4" fill="#181f2c" stroke="#10151f" stroke-width="3"/>
              <rect x="-8" y="-8" width="241" height="14" rx="3" fill="#222b3c"/>
              <rect x="18" y="26" width="189" height="82" rx="2" fill="#141a26" stroke="#252f42" stroke-width="2"/>
              <circle cx="112" cy="67" r="6" fill="#3a475e"/>
            </g>

            <!-- Digital Alarm Clock -->
            <g transform="translate(95 1118)">
              <rect x="0" y="0" width="96" height="49" rx="6" fill="#12161f" stroke="#252e3d" stroke-width="2"/>
              <rect x="8" y="8" width="80" height="33" rx="3" fill="#2a1215"/>
              <text x="48" y="31" text-anchor="middle" fill="#ff4d4d" font-size="20" font-weight="700" opacity=".8">${clockText}</text>
            </g>

            <!-- Symmetrical Bedside Lamp + Balanced Light Cone -->
            <g transform="translate(215 1167)">
              <circle cx="0" cy="-105" r="210" fill="url(#ls-lampAmbient)"/>
              <polygon points="-32,-125 32,-125 115,65 -115,65" fill="url(#ls-lampBeam)"/>
              <rect x="-26" y="-8" width="52" height="8" rx="3" fill="#283244"/>
              <rect x="-4" y="-75" width="8" height="67" fill="#354259"/>
              <polygon points="-30,-135 30,-135 48,-75 -48,-75" fill="#ffe1b0"/>
            </g>

            <!-- Bed Frame, Pillow & Folded Blanket -->
            <g transform="translate(325 1140)">
              <rect x="0" y="-40" width="18" height="320" rx="4" fill="#161d29"/>
              <rect x="615" y="85" width="18" height="195" rx="4" fill="#161d29"/>
              <rect x="18" y="115" width="597" height="58" rx="8" fill="#283347"/>
              <rect x="18" y="165" width="597" height="42" fill="#161d29"/>
              <path d="M24 115 Q55 82 125 108 L125 118 L24 118 Z" fill="#323f57"/>
              <path d="M475 112 Q545 104 615 114 L615 178 Q545 184 475 174 Z" fill="#1f293b"/>
            </g>
          </g>
        </svg>

        <!-- LAYER 3: CHARACTER (#050505 Silhouette + Glowing #FFFFFF Eyes) -->
        <svg class="layer L-char" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">
          <g transform="${charShift}">
            <g class="breathe">
              <path class="sil" d="
                M 55 -18
                C 95 -28, 165 -22, 225 -15
                L 315 -72
                C 328 -80, 342 -74, 348 -60
                L 382 -8
                L 485 -12
                C 496 -14, 504 -26, 510 -34
                C 516 -38, 522 -32, 518 -20
                L 504 2
                L 372 4
                L 332 -44
                L 265 -2
                L 415 0
                L 415 10
                L 230 12
                C 165 14, 95 10, 48 4
                Z"/>
              <path class="sil" d="
                M 72 -18 L 112 -56 C 118 -62, 126 -58, 126 -50 L 118 -14
                M 42 -10 L 12 -32 C 6 -36, 10 -46, 18 -44 L 52 -24"/>
              <g class="head">
                <path class="sil" d="M 38 -22 C 36 -46, 54 -62, 74 -58 C 88 -55, 96 -42, 92 -26 C 88 -12, 72 -6, 56 -10 Z"/>
                <g class="eyes ${eyeBeat}" style="--t:${eyeBeatTime}">
                  <g class="eye-wrap L"><ellipse class="eye" cx="62" cy="-35" rx="4.5" ry="6"/></g>
                  <g class="eye-wrap R"><ellipse class="eye" cx="79" cy="-37" rx="4.5" ry="6"/></g>
                </g>
              </g>
            </g>
          </g>
        </svg>

        <!-- LAYER 4: FOREGROUND ATMOSPHERE & DUST -->
        <svg class="layer L-fg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">
          <rect x="0" y="0" width="100%" height="100%" fill="none"/>
        </svg>
        <div class="ls-dust">${dustHtml}</div>
      </div>
      <div class="ls-vignette"></div>
      <div class="ls-fade"></div>
    `;
  }
