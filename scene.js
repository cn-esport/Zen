// ==========================================
// SCENE: THE 2:00 AM SCROLL TRAP — 2.5D RIM-LIT DIORAMA STICK-FIGURE EDITION (50s)
// Built for cn-esport/Zen (16:9 or 9:16 Auto-Fit Canvas)
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sfx: [
    { at: 0.6,  type: "notification" },
    { at: 4.5,  type: "whoosh" },
    { at: 6.2,  type: "swipe" },
    { at: 8.5,  type: "swipe" },
    { at: 11.0, type: "swipe" },
    { at: 14.0, type: "boom" },
    { at: 16.0, type: "chime" },
    { at: 21.0, type: "chime" },
    { at: 25.0, type: "boom" },
    { at: 34.0, type: "whoosh" },
    { at: 42.0, type: "boom" },
    { at: 46.4, type: "lock" }
  ],
  captions: [
    { start: 0.3,  length: 4.0, text: "It’s 2:00 AM. Your body is exhausted in bed—yet your thumb refuses to stop scrolling." },
    { start: 4.6,  length: 4.6, text: "You tell yourself, \"Just one more video.\" Thirty minutes later, you're still awake." },
    { start: 9.5,  length: 4.4, text: "That’s not weak willpower—your brain is caught in a slot-machine loop." },
    { start: 14.3, length: 5.2, text: "Every swipe gives you a tiny hit of dopamine—not because the video is good," },
    { start: 19.8, length: 5.0, text: "but because your brain craves the unpredictability of what comes next." },
    { start: 25.3, length: 4.4, text: "Meanwhile, that cold blue screen tricks your brain into thinking it’s noon," },
    { start: 30.0, length: 3.8, text: "shutting down melatonin—the exact hormone you need to fall asleep." },
    { start: 34.3, length: 7.4, text: "Hours slip away in the dark while the rest of the city sleeps." },
    { start: 42.2, length: 4.0, text: "You aren't watching the feed anymore. The feed is holding you hostage." },
    { start: 46.6, length: 3.0, text: "Put it down... and go to sleep." }
  ],

  render(ctx, W, H, t) {
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // Virtual 1920x1080 Widescreen Diorama Stage
    const scale = Math.max(W / 1920, H / 1080);
    const ox = (W - 1920 * scale) * 0.5;
    const oy = (H - 1080 * scale) * 0.5;
    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    // ==========================================
    // HELPER 1: 2.5D PAINTED BEDROOM DIORAMA (WALL + WOOD FLOOR + WINDOW + LAMP + CLOCK + BED)
    // ==========================================
    const drawDioramaRoom = (opts = {}) => {
      const {
        zoom = 1, panX = 0, panY = 0,
        lampOn = true, phoneGlow = 1, clockText = "02:00", moonAlpha = 1
      } = opts;

      ctx.save();
      ctx.translate(960 + panX, 540 + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      // 1. Soft Painted Wall Gradient (Warm-Neutral Charcoal to Deep Shadow)
      const wallGrad = ctx.createRadialGradient(780, 480, 80, 960, 540, 1280);
      wallGrad.addColorStop(0, lampOn ? '#2a282c' : '#141926');
      wallGrad.addColorStop(0.55, '#171920');
      wallGrad.addColorStop(1, '#0a0c12');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, 1920, 830);

      // Subtle Wall Baseboard Trim
      ctx.fillStyle = '#0d0f16';
      ctx.fillRect(0, 812, 1920, 18);

      // 2. Perspective Wood Floor Planks + Soft Lighting Falloff
      const floorGrad = ctx.createLinearGradient(0, 830, 0, 1080);
      floorGrad.addColorStop(0, '#1e1c22');
      floorGrad.addColorStop(0.4, '#15141a');
      floorGrad.addColorStop(1, '#090a0f');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, 830, 1920, 250);

      // Horizontal Plank Grooves
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.lineWidth = 2;
      [865, 905, 952, 1008].forEach(fy => {
        ctx.beginPath();
        ctx.moveTo(0, fy);
        ctx.lineTo(1920, fy);
        ctx.stroke();
      });

      // 3. Detailed Night Window (Frame + Sill + City Skyline + Crescent Moon)
      const wx = 860, wy = 145, ww = 390, wh = 430;
      // Outer Window Recess Shadow
      ctx.fillStyle = '#090b10';
      ctx.fillRect(wx - 10, wy - 10, ww + 20, wh + 20);

      // Night Sky Inside Window
      const winSky = ctx.createLinearGradient(wx, wy, wx, wy + wh);
      winSky.addColorStop(0, '#0c1224');
      winSky.addColorStop(1, '#1d2642');
      ctx.fillStyle = winSky;
      ctx.fillRect(wx, wy, ww, wh);

      // Stars & Crescent Moon
      if (moonAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = moonAlpha;
        ctx.fillStyle = '#e8f0ff';
        [[wx + 70, wy + 65, 2], [wx + 160, wy + 45, 1.8], [wx + 310, wy + 165, 2.2], [wx + 120, wy + 150, 1.5]].forEach(([sx, sy, sr]) => {
          ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
        });

        // Crescent Moon
        ctx.shadowColor = '#dce8ff';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#f0f5ff';
        ctx.beginPath();
        ctx.arc(wx + 285, wy + 105, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#12192e';
        ctx.beginPath();
        ctx.arc(wx + 298, wy + 96, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Distant City Skyline Silhouettes Inside Window
      ctx.fillStyle = '#0c0f1a';
      ctx.fillRect(wx + 25, wy + 340, 65, 90);
      ctx.fillRect(wx + 100, wy + 310, 80, 120);
      ctx.fillRect(wx + 190, wy + 350, 55, 80);
      ctx.fillRect(wx + 255, wy + 295, 95, 135);
      // Warm Lit Apartment Windows
      ctx.fillStyle = '#ffd56b';
      ctx.fillRect(wx + 275, wy + 320, 8, 10);
      ctx.fillRect(wx + 120, wy + 345, 7, 9);

      // Window Crossbars & Bottom Wooden Sill
      ctx.fillStyle = '#0d1018';
      ctx.fillRect(wx + ww / 2 - 5, wy, 10, wh);
      ctx.fillRect(wx, wy + wh / 2 - 5, ww, 10);
      ctx.fillStyle = '#25262e';
      ctx.fillRect(wx - 22, wy + wh + 6, ww + 44, 14);

      // 4. Nightstand + Glowing Red Alarm Clock + Warm Table Lamp
      const nx = 460, ny = 655, nw = 185, nh = 175;
      // Floor Contact Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.beginPath();
      ctx.ellipse(nx + nw / 2, 835, 115, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nightstand Body (2.5D Shaded)
      const nsGrad = ctx.createLinearGradient(nx, ny, nx + nw, ny + nh);
      nsGrad.addColorStop(0, '#2a2830');
      nsGrad.addColorStop(1, '#14151c');
      ctx.fillStyle = nsGrad;
      ctx.beginPath();
      ctx.roundRect(nx, ny, nw, nh, 6);
      ctx.fill();
      // Drawer Seam & Handle
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = 2;
      ctx.strokeRect(nx + 12, ny + 16, nw - 24, 62);
      ctx.fillStyle = '#565866';
      ctx.fillRect(nx + nw / 2 - 16, ny + 44, 32, 5);

      // Glowing Red Digital Alarm Clock on Nightstand
      ctx.fillStyle = '#12080a';
      ctx.beginPath();
      ctx.roundRect(nx + 16, ny - 34, 68, 34, 5);
      ctx.fill();
      ctx.shadowColor = '#ff2a3c';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ff3b4e';
      ctx.font = 'bold 19px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(clockText, nx + 50, ny - 11);
      ctx.shadowBlur = 0;

      // Table Lamp Base & Warm Lampshade
      const lx = nx + 128, ly = ny - 115;
      ctx.fillStyle = '#3b3942';
      ctx.fillRect(lx - 4, ny - 45, 8, 45);
      ctx.beginPath();
      ctx.ellipse(lx, ny - 3, 22, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lampshade Trapezoid
      ctx.fillStyle = lampOn ? '#ffdfa8' : '#262833';
      ctx.beginPath();
      ctx.moveTo(lx - 26, ly);
      ctx.lineTo(lx + 26, ly);
      ctx.lineTo(lx + 42, ly + 68);
      ctx.lineTo(lx - 42, ly + 68);
      ctx.closePath();
      ctx.fill();

      // 5. Detailed 2.5D Bed Frame, Mattress, Pillow & Folded Blanket
      const bx = 665, by = 710, bw = 690, bh = 120;
      // Bed Floor Drop Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
      ctx.beginPath();
      ctx.ellipse(bx + bw / 2, 838, bw * 0.52, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Headboard & Wooden Bed Legs
      ctx.fillStyle = '#191a22';
      ctx.beginPath();
      ctx.roundRect(bx - 12, by - 95, 22, 215, 6);
      ctx.roundRect(bx + bw - 14, by + 20, 18, 100, 4);
      ctx.fill();

      // Bed Base Frame
      ctx.fillStyle = '#23242e';
      ctx.fillRect(bx, by + 48, bw, 44);

      // Soft Shaded Mattress
      const matGrad = ctx.createLinearGradient(bx, by, bx, by + 52);
      matGrad.addColorStop(0, '#5a6070');
      matGrad.addColorStop(1, '#2c303b');
      ctx.fillStyle = matGrad;
      ctx.beginPath();
      ctx.roundRect(bx + 6, by + 6, bw - 12, 46, 12);
      ctx.fill();

      // Fluffy Shaded Pillow on Left
      const pilGrad = ctx.createLinearGradient(bx + 18, by - 26, bx + 135, by + 18);
      pilGrad.addColorStop(0, '#8e96ab');
      pilGrad.addColorStop(1, '#3a3f4d');
      ctx.fillStyle = pilGrad;
      ctx.beginPath();
      ctx.ellipse(bx + 78, by - 4, 62, 22, -0.14, 0, Math.PI * 2);
      ctx.fill();

      // Folded Blue-Gray Blanket at Foot of Bed
      const blkGrad = ctx.createLinearGradient(bx + 490, by - 14, bx + 675, by + 52);
      blkGrad.addColorStop(0, '#4f627d');
      blkGrad.addColorStop(1, '#232d3d');
      ctx.fillStyle = blkGrad;
      ctx.beginPath();
      ctx.roundRect(bx + 495, by - 12, 182, 64, 14);
      ctx.fill();

      // 6. Volumetric Warm Lamp Cone (Screen Blend Mode for Real Light Falloff!)
      if (lampOn) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const cone = ctx.createRadialGradient(lx, ly + 40, 15, lx + 180, ly + 220, 560);
        cone.addColorStop(0, 'rgba(255, 214, 140, 0.55)');
        cone.addColorStop(0.45, 'rgba(255, 185, 100, 0.16)');
        cone.addColorStop(1, 'rgba(255, 185, 100, 0)');
        ctx.fillStyle = cone;
        ctx.beginPath();
        ctx.moveTo(lx - 42, ly + 68);
        ctx.lineTo(lx + 42, ly + 68);
        ctx.lineTo(lx + 560, 860);
        ctx.lineTo(lx - 140, 860);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 7. Cold Blue Phone Screen Light on Character's Face
      if (phoneGlow > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const pGlow = ctx.createRadialGradient(845, 625, 8, 825, 640, 260 * phoneGlow);
        pGlow.addColorStop(0, 'rgba(130, 205, 255, 0.72)');
        pGlow.addColorStop(0.45, 'rgba(55, 145, 255, 0.22)');
        pGlow.addColorStop(1, 'rgba(20, 60, 140, 0)');
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(825, 640, 260 * phoneGlow, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    // ==========================================
    // HELPER 2: RIM-LIT STICK-FIGURE CHARACTER LYING ON BED (EXACT REFERENCE STYLE!)
    // ==========================================
    const drawStickCharacterOnBed = (opts = {}) => {
      const {
        zoom = 1, panX = 0, panY = 0,
        phoneOn = true, thumbSwipe = 0, rimWarmth = 1, goldSparks = false
      } = opts;

      ctx.save();
      ctx.translate(960 + panX, 540 + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      const breath = Math.sin(t * 1.8) * 2.5;
      const headX = 762, headY = 678;

      // Helper to draw a stick limb with directional rim highlight on top edge
      const drawRimLimb = (pts, width = 18, rimColor = 'rgba(255, 215, 150, 0.78)') => {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 1. Rim Highlight Pass (shifted 3px upward toward the lamp light)
        if (rimWarmth > 0) {
          ctx.strokeStyle = rimColor;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1] - 3);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1] - 3);
          ctx.stroke();
        }

        // 2. Core Dark Stick-Figure Limb Pass
        ctx.strokeStyle = '#090a0f';
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      };

      // 1. Torso Lying Flat Along Mattress
      drawRimLimb([[805, 696], [965, 698 + breath * 0.4]], 20);

      // 2. Bent Leg With Raised Knee (Classic Reference Pose!)
      drawRimLimb([[965, 698], [1035, 622 - breath], [1125, 696]], 18);
      // Second Relaxed Leg Straight Along Bed
      drawRimLimb([[965, 702], [1155, 704]], 17, 'rgba(255, 215, 150, 0.45)');

      // 3. Raised Bent Arm Holding Glowing Smartphone Above Chest
      const handX = 855, handY = 635 - thumbSwipe * 6;
      drawRimLimb([[825, 695], [842, 625], [handX, handY]], 15, phoneOn ? 'rgba(165, 220, 255, 0.85)' : 'rgba(255, 215, 150, 0.65)');

      // Smartphone in Hand
      ctx.save();
      ctx.translate(handX + 4, handY - 12);
      ctx.rotate(-0.32);
      ctx.fillStyle = '#080b12';
      ctx.beginPath();
      ctx.roundRect(-5, -24, 10, 48, 3);
      ctx.fill();
      if (phoneOn) {
        ctx.shadowColor = '#80c8ff';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#e6f5ff';
        ctx.beginPath();
        ctx.roundRect(-6, -20, 4, 40, 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // 4. Round Stick-Figure Head With Warm Lamp Rim + Cool Phone Rim
      if (rimWarmth > 0) {
        ctx.fillStyle = 'rgba(255, 215, 150, 0.82)';
        ctx.beginPath();
        ctx.arc(headX - 2, headY - 3, 33, 0, Math.PI * 2);
        ctx.fill();
      }
      if (phoneOn) {
        ctx.fillStyle = 'rgba(155, 215, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(headX + 3, headY - 1, 33, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#090a0f';
      ctx.beginPath();
      ctx.arc(headX, headY, 32, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Eyes Looking Up at Phone
      if (phoneOn) {
        const blink = (t % 4.5) > 4.3 ? 0.1 : 1;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(headX + 10, headY - 10, 4.5, 5.5 * blink, -0.3, 0, Math.PI * 2);
        ctx.ellipse(headX + 20, headY - 4, 4.5, 5.5 * blink, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Golden Dopamine Sparks Drifting From Phone Into Eyes
      if (goldSparks) {
        for (let i = 0; i < 8; i++) {
          const p = ((t * 0.7 + i * 0.125) % 1);
          const sx = handX - p * (handX - headX - 12);
          const sy = (handY - 14) + p * (headY - handY + 6) - Math.sin(p * Math.PI) * 28;
          const a = Math.sin(p * Math.PI) * 0.95;
          ctx.fillStyle = i % 2 === 0 ? `rgba(255, 220, 120, ${a})` : `rgba(140, 215, 255, ${a})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    // ==========================================
    // 6-SCENE TIMELINE (50 SECONDS)
    // ==========================================
    if (t < 9.5) {
      // SCENE 1 (0:00 - 0:09.5): Iconic Bedroom Diorama Wide Shot (Lamp + Clock 02:00 + Stick Figure Scrolling)
      const p = t / 9.5;
      const swipe = Math.sin(Math.min(1, ((t % 2.2) / 0.5)) * Math.PI);
      drawDioramaRoom({ zoom: 1 + p * 0.08, lampOn: true, phoneGlow: 1, clockText: "02:00", moonAlpha: 1 });
      drawStickCharacterOnBed({ zoom: 1 + p * 0.08, phoneOn: true, thumbSwipe: swipe, rimWarmth: 1 });

    } else if (t < 14.3) {
      // SCENE 2 (0:09.5 - 0:14.3): Macro Close-Up on Glowing Phone Screen & Smooth Card Scroll
      const local = t - 9.5;
      ctx.fillStyle = '#070910';
      ctx.fillRect(0, 0, 1920, 1080);

      const halo = ctx.createRadialGradient(960, 540, 40, 960, 540, 460);
      halo.addColorStop(0, 'rgba(110, 190, 255, 0.45)');
      halo.addColorStop(1, 'rgba(7, 9, 16, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, 1920, 1080);

      ctx.fillStyle = '#0c101a';
      ctx.strokeStyle = 'rgba(155, 215, 255, 0.5)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(790, 130, 340, 740, 42);
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(806, 148, 308, 704, 32);
      ctx.clip();

      const cycle = 1.6;
      const step = Math.floor(local / cycle);
      const frac = easeOut((local % cycle) / 0.55);
      const cols = ['#1c4c8c', '#2968bd', '#163b6e', '#3278d6'];
      for (let i = -1; i < 4; i++) {
        const c = cols[((i + step) % cols.length + cols.length) % cols.length];
        const cy = 165 + i * 260 - frac * 260;
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.roundRect(824, cy, 272, 236, 20);
        ctx.fill();
      }
      ctx.restore();

    } else if (t < 25.0) {
      // SCENE 3 (0:14.3 - 0:25.0): Zoomed-In Bedside Shot — Golden Dopamine Sparks Drifting Into Eyes
      const local = t - 14.3;
      const p = local / 10.7;
      drawDioramaRoom({ zoom: 1.48, panX: 160, panY: -120, lampOn: true, phoneGlow: 1.25, clockText: "02:34", moonAlpha: 1 });
      drawStickCharacterOnBed({ zoom: 1.48, panX: 160, panY: -120, phoneOn: true, rimWarmth: 1, goldSparks: true });

    } else if (t < 34.0) {
      // SCENE 4 (0:25.0 - 0:34.0): Cold Blue Screen Overpowers Lamp & Fades Moon Outside Window
      const local = t - 25.0;
      const p = local / 9.0;
      drawDioramaRoom({ zoom: 1.15, panX: 40, panY: -30, lampOn: true, phoneGlow: 1.85, clockText: "02:48", moonAlpha: Math.max(0.1, 1 - p * 0.9) });
      drawStickCharacterOnBed({ zoom: 1.15, panX: 40, panY: -30, phoneOn: true, rimWarmth: 0.6 });

    } else if (t < 42.0) {
      // SCENE 5 (0:34.0 - 0:42.0): Wide Shot — Hours Later (03:15 AM) in Still Room
      const local = t - 34.0;
      const p = local / 8.0;
      drawDioramaRoom({ zoom: 1.06 - p * 0.06, lampOn: true, phoneGlow: 1.2, clockText: "03:15", moonAlpha: 0.25 });
      drawStickCharacterOnBed({ zoom: 1.06 - p * 0.06, phoneOn: true, rimWarmth: 1 });

    } else {
      // SCENE 6 (0:42.0 - 0:50.0): Lamp & Phone Click Off at 46.4s -> Peaceful Dark Room Sleep
      const local = t - 42.0;
      const lightsOut = t >= 46.4;
      drawDioramaRoom({ zoom: 1.04, lampOn: !lightsOut, phoneGlow: lightsOut ? 0 : 0.9, clockText: "03:20", moonAlpha: 1 });
      drawStickCharacterOnBed({ zoom: 1.04, phoneOn: !lightsOut, rimWarmth: lightsOut ? 0 : 1 });
    }

    // Soft Cinema Edge Vignette
    const vig = ctx.createRadialGradient(960, 540, 580, 960, 540, 1280);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(3,4,8,0.72)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1920, 1080);

    ctx.restore();
  }
};
