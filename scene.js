// ==========================================
// SCENE: THE MORNING SUNLIGHT SWITCH (CIRCADIAN CLOCK) — RICH SFX EDITION (45s)
// ==========================================
const SCENE_DATA = {
  duration: 45,
  sfx: [
    { at: 0.2,  type: "door_open" },   // Front porch door opens
    { at: 0.6,  type: "footsteps" },   // Stepping outside onto wooden porch
    { at: 2.2,  type: "sun_swell" },   // Warm golden sunlight chord swell
    { at: 3.2,  type: "birds" },       // Morning birds chirping outdoors
    { at: 7.4,  type: "boom" },        // Chemical explosion impact
    { at: 8.2,  type: "spark" },       // Neural spark behind eyes
    { at: 13.0, type: "whoosh" },      // Zooming into brain circadian clock
    { at: 15.5, type: "spark" },       // Retina light signal firing
    { at: 18.8, type: "chime" },       // Cortisol & dopamine surge
    { at: 24.4, type: "wind" },        // Cloudy morning outdoor breeze
    { at: 26.5, type: "birds" },       // Birds still singing on cloudy morning
    { at: 32.0, type: "boom" },        // 16-hour biological timer starts
    { at: 35.5, type: "heartbeat" },   // Internal body clock pulse
    { at: 39.2, type: "footsteps" },   // 10-minute morning walk
    { at: 40.5, type: "sun_swell" },   // Final warm sunrise triumph
    { at: 42.0, type: "birds" }
  ],
  captions: [
    { start: 0.2,  length: 7.0, text: "You step outside first thing in the morning, feel that warm sunlight hit your face—and within minutes, your groggy brain suddenly switches on." },
    { start: 7.4,  length: 5.4, text: "That isn't just fresh air waking you up. Sunlight is literally triggering a chemical explosion behind your eyes." },
    { start: 13.0, length: 11.2, text: "The moment natural morning light hits your retina, specialized cells send a signal straight to your brain’s internal clock, shutting down melatonin and releasing cortisol and dopamine." },
    { start: 24.4, length: 7.4, text: "It works even on cloudy mornings, because outdoor light is still ten times brighter than the strongest indoor bulb in your house." },
    { start: 32.0, length: 7.0, text: "That same morning light also starts an invisible timer in your brain—setting the exact hour you’ll feel sleepy again sixteen hours later." },
    { start: 39.2, length: 5.4, text: "Step outside for ten minutes every morning... and your body will fix its own sleep schedule automatically." }
  ],

  render(ctx, W, H, t) {
    ctx.save();
    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, W, H);

    const isPortrait = W < H;
    const targetSpanW = isPortrait ? 1040 : 1920;
    const scale = isPortrait ? (W / targetSpanW) : Math.max(W / 1920, H / 1080);
    const ox = (W - 1920 * scale) * 0.5 + (isPortrait ? 45 * scale : 0);
    const oy = (H - 1080 * scale) * 0.5 + (isPortrait ? 85 * scale : 0);

    if (isPortrait) {
      const bgFill = ctx.createLinearGradient(0, 0, 0, H);
      bgFill.addColorStop(0, '#18243d');
      bgFill.addColorStop(0.55, '#42475e');
      bgFill.addColorStop(0.75, '#1b1d26');
      bgFill.addColorStop(1, '#0b0c12');
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    const drawOutdoorDiorama = (opts = {}) => {
      const {
        zoom = 1, panX = 0, panY = 0,
        sunHeight = 1, sunIntensity = 1, cloudy = false, duskTimer = 0
      } = opts;

      ctx.save();
      ctx.translate(960 + panX, 540 + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      const sky = ctx.createLinearGradient(0, -600, 0, 830);
      if (duskTimer > 0) {
        sky.addColorStop(0, '#0a1124');
        sky.addColorStop(0.6, '#1c294a');
        sky.addColorStop(1, '#4a3d52');
      } else if (cloudy) {
        sky.addColorStop(0, '#2c384d');
        sky.addColorStop(0.6, '#566782');
        sky.addColorStop(1, '#8fa3bf');
      } else {
        sky.addColorStop(0, '#182848');
        sky.addColorStop(0.45, '#4b5678');
        sky.addColorStop(0.8, '#c97b57');
        sky.addColorStop(1, '#ffd085');
      }
      ctx.fillStyle = sky;
      ctx.fillRect(-600, -1200, 3120, 2030);

      const sunX = 1280, sunY = 460 - sunHeight * 140;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 18, sunX, sunY, 680 * sunIntensity);
      if (cloudy) {
        sunGlow.addColorStop(0, 'rgba(225, 240, 255, 0.72)');
        sunGlow.addColorStop(0.45, 'rgba(165, 195, 230, 0.25)');
        sunGlow.addColorStop(1, 'rgba(120, 150, 190, 0)');
      } else {
        sunGlow.addColorStop(0, 'rgba(255, 246, 205, 0.95)');
        sunGlow.addColorStop(0.28, 'rgba(255, 200, 110, 0.45)');
        sunGlow.addColorStop(0.65, 'rgba(255, 155, 75, 0.14)');
        sunGlow.addColorStop(1, 'rgba(255, 140, 60, 0)');
      }
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 680 * sunIntensity, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = cloudy ? 'rgba(235, 245, 255, 0.75)' : '#fff8dc';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 54, 0, Math.PI * 2);
      ctx.fill();

      const drawCloud = (cx, cy, cw, alpha) => {
        ctx.fillStyle = `rgba(215, 228, 245, ${alpha})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, cw, cw * 0.28, 0, 0, Math.PI * 2);
        ctx.ellipse(cx - cw * 0.45, cy + 8, cw * 0.55, cw * 0.22, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + cw * 0.45, cy + 6, cw * 0.6, cw * 0.24, 0, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCloud(720 + Math.sin(t * 0.25) * 25, 240, 160, cloudy ? 0.55 : 0.18);
      drawCloud(1140 - Math.cos(t * 0.2) * 30, 290, 190, cloudy ? 0.65 : 0.22);
      if (cloudy) drawCloud(940 + Math.sin(t * 0.3) * 20, 200, 220, 0.6);

      ctx.fillStyle = cloudy ? '#232c3d' : '#262436';
      ctx.beginPath();
      ctx.moveTo(-600, 830);
      ctx.lineTo(-600, 680);
      ctx.quadraticCurveTo(250, 620, 620, 675);
      ctx.lineTo(740, 675);
      ctx.lineTo(740, 560); ctx.lineTo(820, 560); ctx.lineTo(820, 675);
      ctx.lineTo(860, 675);
      ctx.lineTo(860, 520); ctx.lineTo(950, 520); ctx.lineTo(950, 675);
      ctx.lineTo(1010, 675);
      ctx.lineTo(1010, 590); ctx.lineTo(1090, 590); ctx.lineTo(1090, 675);
      ctx.quadraticCurveTo(1550, 615, 2520, 680);
      ctx.lineTo(2520, 830);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#141620';
      ctx.fillRect(-600, -1200, 1140, 2030);
      ctx.fillStyle = '#24222c';
      ctx.fillRect(435, 340, 95, 490);
      ctx.fillStyle = '#0e1018';
      ctx.beginPath();
      ctx.moveTo(410, 310);
      ctx.lineTo(680, 355);
      ctx.lineTo(680, 382);
      ctx.lineTo(410, 345);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(635, 370, 16, 460);

      const groundGrad = ctx.createLinearGradient(0, 830, 0, 1500);
      groundGrad.addColorStop(0, '#22202a');
      groundGrad.addColorStop(0.4, '#15141c');
      groundGrad.addColorStop(1, '#090a0f');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(-600, 830, 3120, 900);

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.lineWidth = 2;
      [865, 905, 952, 1008, 1072, 1145].forEach(fy => {
        ctx.beginPath();
        ctx.moveTo(-600, fy);
        ctx.lineTo(2520, fy);
        ctx.stroke();
      });

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const beam = ctx.createLinearGradient(sunX, sunY, 680, 840);
      beam.addColorStop(0, cloudy ? 'rgba(215, 235, 255, 0.25)' : 'rgba(255, 224, 150, 0.36)');
      beam.addColorStop(1, 'rgba(255, 210, 130, 0)');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(sunX - 80, sunY);
      ctx.lineTo(sunX + 80, sunY);
      ctx.lineTo(1180, 845);
      ctx.lineTo(540, 845);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.restore();
    };

    const drawStickCharacterOutdoor = (opts = {}) => {
      const {
        zoom = 1, panX = 0, panY = 0,
        charX = 760, walkCycle = 0,
        eyeState = 'waking',
        rimColor = 'rgba(255, 225, 165, 0.88)',
        dopamineSparks = false
      } = opts;

      ctx.save();
      ctx.translate(960 + panX, 540 + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      const breath = Math.sin(t * 1.8) * 2.5;
      const bob = Math.abs(Math.sin(walkCycle)) * 5;
      const stride = Math.sin(walkCycle) * 24;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.beginPath();
      ctx.ellipse(charX - 18, 834, 72, 11, 0, 0, Math.PI * 2);
      ctx.fill();

      const drawRimLimb = (pts, width = 18) => {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = rimColor;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(pts[0][0] + 3, pts[0][1] - 2);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0] + 3, pts[i][1] - 2);
        ctx.stroke();

        ctx.strokeStyle = '#090a0f';
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      };

      const hipY = 672 - bob;
      const shoulderY = 532 - bob + breath * 0.4;
      const headX = charX + 4;
      const headY = 482 - bob + breath * 0.4;

      drawRimLimb([[charX, hipY], [charX - stride, 828]], 17);
      drawRimLimb([[charX, hipY], [charX + stride, 828]], 17);
      drawRimLimb([[charX, hipY], [charX + 2, shoulderY]], 20);
      drawRimLimb([[charX + 2, shoulderY + 14], [charX - 16 - stride * 0.5, hipY - 12]], 14);
      drawRimLimb([[charX + 2, shoulderY + 14], [charX + 20 + stride * 0.5, hipY - 12]], 14);

      ctx.fillStyle = rimColor;
      ctx.beginPath();
      ctx.arc(headX + 3, headY - 2, 33, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#090a0f';
      ctx.beginPath();
      ctx.arc(headX, headY, 32, 0, Math.PI * 2);
      ctx.fill();

      const blink = (t % 4.4) > 4.25 ? 0.1 : 1;
      const eyeH = eyeState === 'groggy' ? 2.4 : eyeState === 'waking' ? 4.8 * blink : 6.2 * blink;
      ctx.shadowColor = '#fff7d6';
      ctx.shadowBlur = eyeState === 'energized' ? 16 : 10;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(headX + 11, headY - 6, 4.4, eyeH, -0.15, 0, Math.PI * 2);
      ctx.ellipse(headX + 22, headY - 4, 4.4, eyeH, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (dopamineSparks) {
        for (let i = 0; i < 12; i++) {
          const p = ((t * 0.65 + i * 0.083) % 1);
          const sx = headX + Math.sin(i * 2.1 + t * 2) * 65;
          const sy = (headY + 120) - p * 230;
          const alpha = Math.sin(p * Math.PI) * 0.9;
          ctx.fillStyle = i % 2 === 0 ? `rgba(255, 224, 130, ${alpha})` : `rgba(145, 220, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    if (t < 7.4) {
      const p = t / 7.4;
      const walkProg = easeOut(Math.min(1, t / 2.6));
      const cx = 560 + walkProg * 210;
      const awake = t >= 2.2;
      drawOutdoorDiorama({ zoom: 1 + p * 0.06, sunHeight: 0.85, sunIntensity: awake ? 1.15 : 0.75 });
      drawStickCharacterOutdoor({
        zoom: 1 + p * 0.06,
        charX: cx,
        walkCycle: t < 2.6 ? t * 4.5 : 0,
        eyeState: awake ? 'energized' : 'groggy',
        dopamineSparks: awake
      });

    } else if (t < 13.0) {
      drawOutdoorDiorama({ zoom: 1.45, panX: 180, panY: 60, sunHeight: 0.9, sunIntensity: 1.35 });
      drawStickCharacterOutdoor({
        zoom: 1.45, panX: 180, panY: 60,
        charX: 770,
        eyeState: 'energized',
        dopamineSparks: true
      });

    } else if (t < 24.4) {
      const local = t - 13.0;
      ctx.fillStyle = '#080c18';
      ctx.fillRect(0, 0, 1920, 1080);

      const beam = ctx.createLinearGradient(260, 540, 1180, 540);
      beam.addColorStop(0, 'rgba(255, 224, 140, 0.65)');
      beam.addColorStop(0.5, 'rgba(255, 195, 100, 0.25)');
      beam.addColorStop(1, 'rgba(255, 195, 100, 0)');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(260, 440);
      ctx.lineTo(1040, 515);
      ctx.lineTo(1040, 565);
      ctx.lineTo(260, 640);
      ctx.closePath();
      ctx.fill();

      const pulse = 1 + Math.sin(local * 4.5) * 0.08;
      const coreGlow = ctx.createRadialGradient(1040, 540, 20, 1040, 540, 340 * pulse);
      coreGlow.addColorStop(0, 'rgba(255, 224, 130, 0.85)');
      coreGlow.addColorStop(0.45, 'rgba(255, 165, 70, 0.28)');
      coreGlow.addColorStop(1, 'rgba(15, 25, 50, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(1040, 540, 340 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 224, 145, 0.55)';
      ctx.lineWidth = 3.5;
      [110, 175, 240].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(1040, 540, r + Math.sin(local * 3 + idx) * 6, 0, Math.PI * 2);
        ctx.stroke();
      });

      for (let i = 0; i < 20; i++) {
        const sp = ((local * 0.5 + i * 0.05) % 1);
        const angle = (i / 20) * Math.PI * 2 + local * 0.4;
        const dist = 70 + sp * 260;
        const sx = 1040 + Math.cos(angle) * dist;
        const sy = 540 + Math.sin(angle) * dist;
        ctx.fillStyle = `rgba(255, 230, 150, ${(1 - sp) * 0.9})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (t < 32.0) {
      const local = t - 24.4;
      const p = local / 7.6;
      drawOutdoorDiorama({
        zoom: 1.04 + p * 0.05,
        sunHeight: 1.0, sunIntensity: 1.15, cloudy: true
      });
      drawStickCharacterOutdoor({
        zoom: 1.04 + p * 0.05,
        charX: 770,
        eyeState: 'energized',
        rimColor: 'rgba(215, 235, 255, 0.85)',
        dopamineSparks: true
      });

    } else if (t < 39.2) {
      const local = t - 32.0;
      const p = local / 7.2;
      drawOutdoorDiorama({
        zoom: 1.06, sunHeight: 1 - p * 0.65, sunIntensity: 1 - p * 0.45, duskTimer: p
      });
      drawStickCharacterOutdoor({
        zoom: 1.06,
        charX: 770,
        eyeState: p > 0.7 ? 'waking' : 'energized',
        rimColor: `rgba(255, ${Math.round(220 - p * 50)}, ${Math.round(160 + p * 60)}, 0.8)`
      });

      ctx.save();
      ctx.translate(1220, 320);
      ctx.strokeStyle = 'rgba(255, 224, 145, 0.55)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 115, 0, Math.PI * 2);
      ctx.stroke();

      const startA = -Math.PI * 0.5;
      const sweepA = startA + p * Math.PI * 1.45;
      ctx.strokeStyle = '#ffd56b';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(0, 0, 115, startA, sweepA);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(sweepA) * 88, Math.sin(sweepA) * 88);
      ctx.stroke();
      ctx.restore();

    } else {
      const local = t - 39.2;
      const p = local / 5.8;
      drawOutdoorDiorama({
        zoom: 1.02 + p * 0.06, sunHeight: 1.05, sunIntensity: 1.3
      });
      drawStickCharacterOutdoor({
        zoom: 1.02 + p * 0.06,
        charX: 770 + p * 120,
        walkCycle: local * 3.6,
        eyeState: 'energized',
        dopamineSparks: true
      });
    }

    const vig = ctx.createRadialGradient(960, 540, 560, 960, 540, 1280);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(3,4,8,0.62)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1920, 1080);

    ctx.restore();
  }
};
