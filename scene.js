// ==========================================
// SCENE: THE DARK ORIGIN OF NYC FIRE ESCAPES (1860) — ARCHITECTURAL CUTAWAY STYLE (50s)
// Built for cn-esport/Zen (16:9 & 9:16 Native Fit • GSAP 3.12 + 14-SFX Synced)
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sfx: [
    { at: 0.4,  type: "wind" },         // Freezing 1860 New York midnight wind
    { at: 3.2,  type: "door_open" },    // Tenement window/door rattle
    { at: 7.5,  type: "boom" },         // The fatal flaw: a single wooden staircase
    { at: 12.0, type: "spark" },        // Oil lamp tips over on ground floor
    { at: 15.5, type: "boom" },         // Fire erupts up the wooden stairwell
    { at: 19.0, type: "heartbeat" },    // Trapped on the fifth floor
    { at: 23.5, type: "whoosh" },       // Transition to the 1860 Fire Escape Law
    { at: 26.5, type: "lock" },         // Iron bolts & balcony brackets forged
    { at: 30.0, type: "chime" },        // Zig-zag iron ladders bolted to brick
    { at: 35.5, type: "footsteps" },    // Descending the exterior iron steps
    { at: 41.0, type: "sun_swell" },    // City skyline transformed forever
    { at: 44.5, type: "wind" }
  ],
  captions: [
    { start: 0.3,  length: 6.8, text: "Walk down any street in New York City, and you’ll see black iron fire escapes zigzagging down brick buildings." },
    { start: 7.4,  length: 7.8, text: "They weren’t added for style. In the 1850s, crowded five-story tenements were built with one fatal flaw: a single wooden staircase." },
    { start: 15.5, length: 7.8, text: "If a single oil lamp tipped over on the ground floor, that wooden stairwell turned into a chimney—trapping families on the roof." },
    { start: 23.6, length: 7.8, text: "After a string of devastating midnight fires in 1860, New York passed a radical new law requiring exterior iron balconies." },
    { start: 31.6, length: 8.2, text: "Bolted straight into outer brick walls, those iron ladders gave trapped residents a second way out through their own windows." },
    { start: 40.0, length: 9.2, text: "What started as a desperate survival law became the permanent, iconic skeleton of New York’s skyline." }
  ],

  setupGSAP(tl, CAM) {
    tl.fromTo(CAM, { zoomMul: 1 }, { zoomMul: 1.05, duration: 6.5, ease: 'power2.out' }, 15.5);
    tl.to(CAM, { zoomMul: 1, duration: 0.6, ease: 'power2.inOut' }, 23.4);
  },

  render(ctx, W, H, t) {
    ctx.save();
    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, W, H);

    // True Dual-Aspect Native Fit (16:9 Landscape & 9:16 Vertical)
    const isPortrait = W < H;
    const targetSpanW = isPortrait ? 1040 : 1920;
    const baseScale = isPortrait ? (W / targetSpanW) : Math.max(W / 1920, H / 1080);
    const zoomMul = (window.CAM && window.CAM.zoomMul) ? window.CAM.zoomMul : 1;
    const scale = baseScale * zoomMul;

    const ox = (W - 1920 * scale) * 0.5;
    const oy = (H - 1080 * scale) * 0.5 + (isPortrait ? 40 * scale : 0);

    if (isPortrait) {
      const bgFill = ctx.createLinearGradient(0, 0, 0, H);
      bgFill.addColorStop(0, '#070d1c');
      bgFill.addColorStop(0.6, '#13203b');
      bgFill.addColorStop(1, '#06080f');
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    // Helper: Nocturne Gouache Midnight City Backdrop
    const drawNocturneCity = () => {
      const sky = ctx.createLinearGradient(0, -600, 0, 960);
      sky.addColorStop(0, '#060b18');
      sky.addColorStop(0.55, '#0f1c36');
      sky.addColorStop(1, '#1b2b4a');
      ctx.fillStyle = sky;
      ctx.fillRect(-600, -1200, 3120, 2200);

      // Crescent Moon & Cold Mist Halo
      const mGlow = ctx.createRadialGradient(1360, 220, 15, 1360, 220, 320);
      mGlow.addColorStop(0, 'rgba(205, 225, 255, 0.35)');
      mGlow.addColorStop(1, 'rgba(15, 28, 54, 0)');
      ctx.fillStyle = mGlow;
      ctx.beginPath();
      ctx.arc(1360, 220, 320, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#dce8ff';
      ctx.beginPath();
      ctx.arc(1360, 220, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0c162b';
      ctx.beginPath();
      ctx.arc(1376, 210, 36, 0, Math.PI * 2);
      ctx.fill();

      // Distant Rowhouse Silhouettes
      ctx.fillStyle = '#09101f';
      [
        [-200, 420, 240, 540], [60, 360, 220, 600],
        [1520, 380, 230, 580], [1770, 440, 260, 520]
      ].forEach(([bx, by, bw, bh]) => {
        ctx.fillRect(bx, by, bw, bh);
      });

      // Cobblestone Street Ground
      ctx.fillStyle = '#070a12';
      ctx.fillRect(-600, 920, 3120, 800);
    };

    // Helper: Draw Zig-Zag Wrought-Iron Fire Escape Overlay
    const drawFireEscape = (bx, by, bw, floors, progress = 1, highlight = false) => {
      ctx.save();
      ctx.strokeStyle = highlight ? '#8bb8ff' : '#0b0e17';
      ctx.fillStyle = highlight ? '#8bb8ff' : '#0b0e17';
      ctx.lineWidth = highlight ? 5 : 6;
      ctx.lineCap = 'round';

      const floorH = 145;
      const maxFloors = Math.ceil(floors * progress);

      for (let f = 0; f < maxFloors; f++) {
        const alpha = Math.min(1, (floors * progress) - f);
        ctx.globalAlpha = alpha;
        const fy = by + f * floorH;
        const balX = bx + bw * 0.22;
        const balW = bw * 0.56;

        // Horizontal Iron Balcony Platform + Railing
        ctx.fillRect(balX, fy, balW, 8);
        ctx.strokeRect(balX + 4, fy - 36, balW - 8, 36);
        for (let rx = balX + 18; rx < balX + balW - 10; rx += 22) {
          ctx.beginPath();
          ctx.moveTo(rx, fy - 36);
          ctx.lineTo(rx, fy);
          ctx.stroke();
        }

        // Diagonal Zig-Zag Iron Ladder to Next Floor
        if (f < floors - 1) {
          const leftToRight = f % 2 === 0;
          const x1 = leftToRight ? balX + 35 : balX + balW - 35;
          const x2 = leftToRight ? balX + balW - 35 : balX + 35;
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          ctx.moveTo(x1, fy);
          ctx.lineTo(x2, fy + floorH);
          ctx.moveTo(x1 + 18, fy);
          ctx.lineTo(x2 + 18, fy + floorH);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // Helper: Geometric Paper-Cut Silhouette Figure
    const drawPaperFigure = (fx, fy, scaleFig = 1, panic = false) => {
      ctx.save();
      ctx.translate(fx, fy);
      ctx.scale(scaleFig, scaleFig);

      const jitter = panic ? Math.sin(t * 24) * 2.5 : 0;
      ctx.fillStyle = '#07090f';
      ctx.strokeStyle = 'rgba(255, 220, 160, 0.45)';
      ctx.lineWidth = 2;

      // Tapered Coat / Torso Silhouette
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(-10 + jitter, -48);
      ctx.lineTo(10 + jitter, -48);
      ctx.lineTo(14, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.arc(jitter, -62, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glowing Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(jitter + 4, -63, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // ==========================================
    // 5-SCENE ARCHITECTURAL CUTAWAY TIMELINE (50 SECONDS)
    // ==========================================
    if (t < 7.4) {
      // SCENE 1 (0:00 - 0:07.4): Iconic 5-Story Brick Tenement With Zig-Zag Iron Fire Escape
      const p = t / 7.4;
      drawNocturneCity();

      const bx = 660, by = 170, bw = 600, bh = 750;
      // Brick Building Facade
      const brickGrad = ctx.createLinearGradient(bx, by, bx + bw, by);
      brickGrad.addColorStop(0, '#2a1c24');
      brickGrad.addColorStop(0.5, '#3b242c');
      brickGrad.addColorStop(1, '#1f141a');
      ctx.fillStyle = brickGrad;
      ctx.fillRect(bx, by, bw, bh);

      // Ornate Roof Cornice
      ctx.fillStyle = '#140d12';
      ctx.fillRect(bx - 18, by - 22, bw + 36, 26);

      // Warm Amber Apartment Windows Across 4 Floors
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          const wx = bx + 75 + col * 175;
          const wy = by + 65 + row * 165;
          const lit = (row + col) % 2 === 0;
          ctx.fillStyle = lit ? '#ffbe66' : '#121624';
          ctx.fillRect(wx, wy, 82, 112);
          ctx.strokeStyle = '#140d12';
          ctx.lineWidth = 4;
          ctx.strokeRect(wx, wy, 82, 112);
        }
      }

      // Iconic Black Iron Fire Escape Zigzagging Down Front
      drawFireEscape(bx, by + 175, bw, 4, 1, false);

    } else if (t < 15.5) {
      // SCENE 2 (0:07.4 - 0:15.5): Architectural X-Ray Cutaway — Single Wooden Stairwell & Oil Lamp Spark
      const local = t - 7.4;
      const lampTip = local >= 4.4;
      drawNocturneCity();

      const bx = 640, by = 160, bw = 640, bh = 760;
      // Cutaway Interior Cross-Section
      ctx.fillStyle = '#16131c';
      ctx.strokeStyle = '#5c4b56';
      ctx.lineWidth = 6;
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeRect(bx, by, bw, bh);

      // 4 Interior Floors & Single Center Wooden Staircase
      for (let f = 0; f < 4; f++) {
        const fy = by + 185 + f * 185;
        ctx.fillStyle = '#2d242b';
        ctx.fillRect(bx, fy, bw, 12);

        // Diagonal Wooden Stairs Connecting Each Floor
        ctx.strokeStyle = '#c48b5a';
        ctx.lineWidth = 8;
        ctx.beginPath();
        if (f % 2 === 0) {
          ctx.moveTo(bx + 220, fy);
          ctx.lineTo(bx + 420, fy - 173);
        } else {
          ctx.moveTo(bx + 420, fy);
          ctx.lineTo(bx + 220, fy - 173);
        }
        ctx.stroke();
      }

      // Family Silhouettes on Top Floor
      drawPaperFigure(bx + 150, by + 185, 0.95, false);
      drawPaperFigure(bx + 490, by + 185, 0.95, false);

      // Ground Floor Oil Lamp Tipping Over at 12.0s (local 4.6s)
      const lx = bx + 260, ly = by + 720;
      const fireGrow = lampTip ? easeOut(Math.min(1, (local - 4.4) / 2.5)) : 0.12;
      const fGlow = ctx.createRadialGradient(lx, ly, 8, lx, ly - 40, 260 * fireGrow);
      fGlow.addColorStop(0, 'rgba(255, 210, 90, 0.95)');
      fGlow.addColorStop(0.45, 'rgba(255, 95, 35, 0.55)');
      fGlow.addColorStop(1, 'rgba(255, 50, 20, 0)');
      ctx.fillStyle = fGlow;
      ctx.beginPath();
      ctx.arc(lx, ly - 30, 260 * fireGrow, 0, Math.PI * 2);
      ctx.fill();

    } else if (t < 23.6) {
      // SCENE 3 (0:15.5 - 0:23.6): Stairwell Turns Into a Chimney — Family Trapped on Top Floor
      const local = t - 15.5;
      const p = local / 8.1;
      drawNocturneCity();

      const bx = 640, by = 160, bw = 640, bh = 760;
      ctx.fillStyle = '#1a1116';
      ctx.strokeStyle = '#7a4942';
      ctx.lineWidth = 6;
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeRect(bx, by, bw, bh);

      // Blazing Fire & Smoke Rising Up the Center Stairwell
      const flameH = 260 + p * 480;
      const inferno = ctx.createLinearGradient(bx + 320, by + bh, bx + 320, by + bh - flameH);
      inferno.addColorStop(0, 'rgba(255, 220, 100, 0.95)');
      inferno.addColorStop(0.5, 'rgba(255, 85, 30, 0.78)');
      inferno.addColorStop(1, 'rgba(60, 25, 30, 0)');
      ctx.fillStyle = inferno;
      ctx.fillRect(bx + 180, by + bh - flameH, 280, flameH);

      // Rising Glowing Embers
      for (let i = 0; i < 24; i++) {
        const ex = bx + 200 + ((i * 53 + Math.sin(t * 4 + i) * 30) % 240);
        const ey = by + bh - ((t * 190 + i * 71) % 720);
        ctx.fillStyle = 'rgba(255, 205, 95, 0.85)';
        ctx.beginPath();
        ctx.arc(ex, ey, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floors + Trapped Silhouettes at Top Window
      for (let f = 0; f < 4; f++) {
        ctx.fillStyle = '#2b1c20';
        ctx.fillRect(bx, by + 185 + f * 185, bw, 12);
      }
      drawPaperFigure(bx + 120, by + 185, 1.0, true);
      drawPaperFigure(bx + 520, by + 185, 1.0, true);

    } else if (t < 40.0) {
      // SCENE 4 (0:23.6 - 0:40.0): The 1860 Law — Wrought-Iron Balconies Bolted Onto Brick Exterior & Safe Escape
      const local = t - 23.6;
      const buildProg = easeOut(Math.min(1, local / 4.2));
      drawNocturneCity();

      const bx = 660, by = 170, bw = 600, bh = 750;
      const brickGrad = ctx.createLinearGradient(bx, by, bx + bw, by);
      brickGrad.addColorStop(0, '#2d1e28');
      brickGrad.addColorStop(0.5, '#422933');
      brickGrad.addColorStop(1, '#21151c');
      ctx.fillStyle = brickGrad;
      ctx.fillRect(bx, by, bw, bh);

      // Warm Windows
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          const wx = bx + 75 + col * 175;
          const wy = by + 65 + row * 165;
          ctx.fillStyle = '#ffbe66';
          ctx.fillRect(wx, wy, 82, 112);
          ctx.strokeStyle = '#140d12';
          ctx.lineWidth = 4;
          ctx.strokeRect(wx, wy, 82, 112);
        }
      }

      // Highlighted Steel-Blue Iron Fire Escape Assembling Floor-by-Floor
      drawFireEscape(bx, by + 175, bw, 4, buildProg, true);

      // Silhouette Safely Climbing Down Exterior Iron Balcony
      if (local > 4.5) {
        const climb = Math.min(1, (local - 4.5) / 9.0);
        const figY = (by + 175) + climb * 435;
        const figX = bx + bw * 0.5 + Math.sin(climb * Math.PI * 3) * 95;
        drawPaperFigure(figX, figY, 0.9, false);
      }

    } else {
      // SCENE 5 (0:40.0 - 0:50.0): Wide Dawn Skyline — Iconic Fire Escapes Across New York City
      const local = t - 40.0;
      const p = local / 10.0;

      const dawnSky = ctx.createLinearGradient(0, -600, 0, 960);
      dawnSky.addColorStop(0, '#0d1933');
      dawnSky.addColorStop(0.55, '#3b4a70');
      dawnSky.addColorStop(1, '#e8986b');
      ctx.fillStyle = dawnSky;
      ctx.fillRect(-600, -1200, 3120, 2200);

      // Row of 3 Classic NYC Brick Tenements With Iconic Iron Fire Escapes
      [
        [240, 260, 440, 660],
        [730, 170, 460, 750],
        [1240, 230, 440, 690]
      ].forEach(([bx, by, bw, bh], idx) => {
        ctx.fillStyle = idx === 1 ? '#38222b' : '#261820';
        ctx.fillRect(bx, by, bw, bh);
        ctx.fillStyle = '#120b10';
        ctx.fillRect(bx - 12, by - 16, bw + 24, 18);

        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 2; c++) {
            ctx.fillStyle = (r + c + idx) % 2 === 0 ? '#ffc470' : '#181e30';
            ctx.fillRect(bx + 70 + c * 210, by + 55 + r * 150, 75, 100);
          }
        }
        drawFireEscape(bx, by + 155, bw, 4, 1, false);
      });

      ctx.fillStyle = '#080b12';
      ctx.fillRect(-600, 920, 3120, 800);
    }

    // Nocturne Gouache Edge Vignette
    const vig = ctx.createRadialGradient(960, 540, 560, 960, 540, 1280);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(3,4,8,0.68)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1920, 1080);

    ctx.restore();
  }
};
