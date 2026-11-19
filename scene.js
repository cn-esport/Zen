// ==========================================
// SCENE: THE MORNING SUNLIGHT SWITCH — REIMAGINED ATMOSPHERIC EDITION (45s)
// Dual-Ratio 16:9 & 9:16 Native Fit • GSAP 3.12 Camera Rig + 14-SFX Synced
// ==========================================
const SCENE_DATA = {
  duration: 45,
  sfx: [
    { at: 0.3,  type: "wind" },        // Morning park breeze
    { at: 1.5,  type: "footsteps" },   // Walking onto stone overlook
    { at: 2.8,  type: "sun_swell" },   // Golden sunrise chord swell
    { at: 3.6,  type: "birds" },       // Morning birds in pine trees
    { at: 7.4,  type: "boom" },        // Macro eye chemical explosion
    { at: 8.3,  type: "spark" },       // Retina light burst
    { at: 13.0, type: "whoosh" },      // Dive into neural constellation
    { at: 16.0, type: "spark" },       // Melatonin shutdown pulse
    { at: 19.5, type: "chime" },       // Cortisol & dopamine ignition
    { at: 24.4, type: "whoosh" },      // Split-screen indoor vs cloudy sky wipe
    { at: 27.0, type: "birds" },       // Outdoor ambience
    { at: 32.0, type: "boom" },        // 16-hour solar sundial timer locks in
    { at: 35.5, type: "heartbeat" },   // Circadian rhythm pulse
    { at: 39.2, type: "footsteps" },   // Morning lakeside walk
    { at: 40.4, type: "sun_swell" },   // Final warm sunrise triumph
    { at: 42.2, type: "birds" }
  ],
  captions: [
    { start: 0.2,  length: 7.0, text: "You step outside first thing in the morning, feel that warm sunlight hit your face—and within minutes, your groggy brain suddenly switches on." },
    { start: 7.4,  length: 5.4, text: "That isn't just fresh air waking you up. Sunlight is literally triggering a chemical explosion behind your eyes." },
    { start: 13.0, length: 11.2, text: "The moment natural morning light hits your retina, specialized cells send a signal straight to your brain’s internal clock, shutting down melatonin and releasing cortisol and dopamine." },
    { start: 24.4, length: 7.4, text: "It works even on cloudy mornings, because outdoor light is still ten times brighter than the strongest indoor bulb in your house." },
    { start: 32.0, length: 7.0, text: "That same morning light also starts an invisible timer in your brain—setting the exact hour you’ll feel sleepy again sixteen hours later." },
    { start: 39.2, length: 5.4, text: "Step outside for ten minutes every morning... and your body will fix its own sleep schedule automatically." }
  ],

  setupGSAP(tl, CAM) {
    // Smooth cinematic zoom pulse when sunlight hits at 2.8s & 32.0s
    tl.fromTo(CAM, { zoomMul: 1 }, { zoomMul: 1.04, duration: 4.2, ease: 'power2.out' }, 2.8);
    tl.to(CAM, { zoomMul: 1, duration: 0.4 }, 7.3);
  },

  render(ctx, W, H, t) {
    ctx.save();
    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, W, H);

    const isPortrait = W < H;
    const targetSpanW = isPortrait ? 1040 : 1920;
    const baseScale = isPortrait ? (W / targetSpanW) : Math.max(W / 1920, H / 1080);
    const zoomMul = (window.CAM && window.CAM.zoomMul) ? window.CAM.zoomMul : 1;
    const scale = baseScale * zoomMul;

    const ox = (W - 1920 * scale) * 0.5;
    const oy = (H - 1080 * scale) * 0.5 + (isPortrait ? 55 * scale : 0);

    if (isPortrait) {
      const bgFill = ctx.createLinearGradient(0, 0, 0, H);
      bgFill.addColorStop(0, '#121d33');
      bgFill.addColorStop(0.55, '#3b435c');
      bgFill.addColorStop(0.78, '#131620');
      bgFill.addColorStop(1, '#07090f');
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    // Helper: Draw Layered Pine Tree Silhouette
    const drawPineTree = (tx, ty, th, tw) => {
      ctx.fillStyle = '#0b0e17';
      ctx.fillRect(tx - tw * 0.06, ty - th * 0.2, tw * 0.12, th * 0.2);
      for (let tier = 0; tier < 4; tier++) {
        const yBot = ty - th * (0.16 + tier * 0.19);
        const yTop = yBot - th * 0.34;
        const halfW = tw * (0.52 - tier * 0.1);
        ctx.beginPath();
        ctx.moveTo(tx, yTop);
        ctx.lineTo(tx + halfW, yBot);
        ctx.lineTo(tx - halfW, yBot);
        ctx.closePath();
        ctx.fill();
      }
    };

    // Helper: Rim-Lit Full-Body Silhouette Character
    const drawParkCharacter = (cx, groundY, opts = {}) => {
      const {
        slump = 0, walkCycle = 0, eyeState = 'energized',
        rimColor = 'rgba(255, 224, 155, 0.9)', sparks = false
      } = opts;

      const breath = Math.sin(t * 1.8) * 2.5;
      const bob = Math.abs(Math.sin(walkCycle)) * 5;
      const stride = Math.sin(walkCycle) * 24;

      // Ground Contact Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.beginPath();
      ctx.ellipse(cx - 12, groundY + 4, 68, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      const drawLimb = (pts, w = 17) => {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = rimColor;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(pts[0][0] + 3, pts[0][1] - 2);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0] + 3, pts[i][1] - 2);
        ctx.stroke();

        ctx.strokeStyle = '#080a10';
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      };

      const hipY = groundY - 155 - bob;
      const shoulderX = cx + 4 + slump * 16;
      const shoulderY = hipY - 138 + slump * 14 + breath * 0.4;
      const headX = shoulderX + 4 + slump * 10;
      const headY = shoulderY - 50 + slump * 8;

      // Legs
      drawLimb([[cx, hipY], [cx - stride, groundY]], 17);
      drawLimb([[cx, hipY], [cx + stride, groundY]], 17);
      // Spine
      drawLimb([[cx, hipY], [shoulderX, shoulderY]], 20);
      // Arms
      drawLimb([[shoulderX, shoulderY + 14], [cx - 16 - stride * 0.5, hipY - 10]], 14);
      drawLimb([[shoulderX, shoulderY + 14], [cx + 22 + stride * 0.5, hipY - 10]], 14);

      // Head + Sun Rim
      ctx.fillStyle = rimColor;
      ctx.beginPath();
      ctx.arc(headX + 3, headY - 2, 33, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#080a10';
      ctx.beginPath();
      ctx.arc(headX, headY, 32, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      const blink = (t % 4.3) > 4.15 ? 0.1 : 1;
      const eyeH = eyeState === 'groggy' ? 2.2 : 6.0 * blink;
      ctx.shadowColor = '#fff7d6';
      ctx.shadowBlur = eyeState === 'energized' ? 16 : 8;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(headX + 11, headY - 6, 4.4, eyeH, -0.15, 0, Math.PI * 2);
      ctx.ellipse(headX + 22, headY - 4, 4.4, eyeH, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (sparks) {
        for (let i = 0; i < 12; i++) {
          const p = ((t * 0.65 + i * 0.083) % 1);
          const sx = headX + Math.sin(i * 2.3 + t * 2) * 70;
          const sy = (headY + 110) - p * 220;
          const a = Math.sin(p * Math.PI) * 0.9;
          ctx.fillStyle = i % 2 === 0 ? `rgba(255, 224, 130, ${a})` : `rgba(140, 215, 255, ${a})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // ==========================================
    // 5-SCENE REIMAGINED TIMELINE (45 SECONDS)
    // ==========================================
    if (t < 7.4) {
      // SCENE 1 (0:00 - 0:07.4): Misty Pine Park Overlook & Golden Sunrise Awakening
      const p = t / 7.4;
      const awake = t >= 2.8;
      const sunRise = easeOut(Math.min(1, t / 4.5));

      const sky = ctx.createLinearGradient(0, -600, 0, 840);
      sky.addColorStop(0, '#101b33');
      sky.addColorStop(0.5, '#3b4a6b');
      sky.addColorStop(0.82, '#c77a52');
      sky.addColorStop(1, '#ffd485');
      ctx.fillStyle = sky;
      ctx.fillRect(-600, -1200, 3120, 2040);

      // Low Horizon Sun & Volumetric Mist Glow
      const sunX = 1220, sunY = 560 - sunRise * 130;
      const sGlow = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, 720);
      sGlow.addColorStop(0, 'rgba(255, 245, 200, 0.95)');
      sGlow.addColorStop(0.3, 'rgba(255, 195, 105, 0.45)');
      sGlow.addColorStop(1, 'rgba(255, 150, 70, 0)');
      ctx.fillStyle = sGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 720, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff9e0';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 56, 0, Math.PI * 2);
      ctx.fill();

      // Distant Mountain Ridge
      ctx.fillStyle = '#1b2438';
      ctx.beginPath();
      ctx.moveTo(-600, 840);
      ctx.lineTo(-600, 660);
      ctx.lineTo(350, 580);
      ctx.lineTo(780, 650);
      ctx.lineTo(1260, 560);
      ctx.lineTo(1750, 640);
      ctx.lineTo(2520, 590);
      ctx.lineTo(2520, 840);
      ctx.closePath();
      ctx.fill();

      // Pine Tree Silhouettes Framing Left & Right
      drawPineTree(520, 840, 420, 170);
      drawPineTree(620, 840, 310, 130);
      drawPineTree(1420, 840, 450, 180);
      drawPineTree(1330, 840, 330, 140);

      // Soft Drifting Valley Mist
      const mist = ctx.createLinearGradient(0, 680, 0, 840);
      mist.addColorStop(0, 'rgba(255, 225, 175, 0)');
      mist.addColorStop(1, 'rgba(255, 225, 175, 0.25)');
      ctx.fillStyle = mist;
      ctx.fillRect(-600, 680, 3120, 160);

      // Stone Overlook Ground
      ctx.fillStyle = '#0d1018';
      ctx.fillRect(-600, 835, 3120, 900);

      // Character Walks to Edge & Straightens Posture as Sun Hits Face
      const walkProg = easeOut(Math.min(1, t / 2.2));
      const slumpVal = awake ? Math.max(0, 1 - (t - 2.8) / 1.2) : 1;
      drawParkCharacter(660 + walkProg * 140, 835, {
        slump: slumpVal,
        walkCycle: t < 2.2 ? t * 4.5 : 0,
        eyeState: awake ? 'energized' : 'groggy',
        sparks: awake
      });

    } else if (t < 13.0) {
      // SCENE 2 (0:07.4 - 0:13.0): Macro Close-Up — Pupil Contracting Under Morning Sunlight
      const local = t - 7.4;
      const p = easeOut(Math.min(1, local / 1.8));
      ctx.fillStyle = '#070a12';
      ctx.fillRect(-600, -1200, 3120, 3200);

      // Warm Golden Light Entering Eye From Right
      const beam = ctx.createRadialGradient(1320, 540, 30, 960, 540, 850);
      beam.addColorStop(0, 'rgba(255, 235, 175, 0.75)');
      beam.addColorStop(0.45, 'rgba(255, 185, 95, 0.22)');
      beam.addColorStop(1, 'rgba(7, 10, 18, 0)');
      ctx.fillStyle = beam;
      ctx.fillRect(-600, -1200, 3120, 3200);

      // Stylized Almond Eye Silhouette
      ctx.save();
      ctx.translate(960, 540);
      ctx.strokeStyle = 'rgba(255, 225, 165, 0.85)';
      ctx.lineWidth = 6;
      ctx.fillStyle = '#0c111d';
      ctx.beginPath();
      ctx.moveTo(-260, 0);
      ctx.quadraticCurveTo(0, -175, 260, 0);
      ctx.quadraticCurveTo(0, 175, -260, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Golden Iris
      ctx.shadowColor = '#ffd56b';
      ctx.shadowBlur = 35;
      ctx.fillStyle = '#ffdfa0';
      ctx.beginPath();
      ctx.arc(0, 0, 92, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pupil Constricting Sharply in Response to Sunlight
      const pupilR = 54 - p * 26;
      ctx.fillStyle = '#06080e';
      ctx.beginPath();
      ctx.arc(0, 0, pupilR, 0, Math.PI * 2);
      ctx.fill();

      // Crisp Sun Reflection Catchlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(34, -28, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

    } else if (t < 24.4) {
      // SCENE 3 (0:13.0 - 0:24.4): Neural Pathway — Melatonin Blue Dissolving Into Golden Cortisol/Dopamine
      const local = t - 13.0;
      const p = local / 11.4;
      ctx.fillStyle = '#060913';
      ctx.fillRect(-600, -1200, 3120, 3200);

      // Signal Wave Traveling Left -> Right Into Brain Core
      const sigX = 360 + Math.min(1, local / 2.5) * 600;
      ctx.strokeStyle = 'rgba(255, 220, 130, 0.65)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(320, 540);
      for (let x = 320; x <= sigX; x += 20) {
        ctx.lineTo(x, 540 + Math.sin(x * 0.03 - local * 10) * 18);
      }
      ctx.stroke();

      // Central Brain Clock Core
      const pulse = 1 + Math.sin(local * 4.5) * 0.08;
      const core = ctx.createRadialGradient(960, 540, 20, 960, 540, 360 * pulse);
      core.addColorStop(0, 'rgba(255, 224, 130, 0.88)');
      core.addColorStop(0.45, 'rgba(255, 165, 70, 0.28)');
      core.addColorStop(1, 'rgba(10, 18, 36, 0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(960, 540, 360 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Fading Blue Melatonin Rings + Rising Golden Cortisol/Dopamine Stars
      ctx.strokeStyle = `rgba(100, 175, 255, ${Math.max(0.08, 0.65 - p * 0.6)})`;
      ctx.lineWidth = 3;
      [130, 200, 270].forEach(r => {
        ctx.beginPath();
        ctx.arc(960, 540, r + p * 35, 0, Math.PI * 2);
        ctx.stroke();
      });

      for (let i = 0; i < 22; i++) {
        const sp = ((local * 0.55 + i * 0.045) % 1);
        const angle = (i / 22) * Math.PI * 2 + local * 0.45;
        const dist = 60 + sp * 290;
        ctx.fillStyle = `rgba(255, 232, 155, ${(1 - sp) * 0.92})`;
        ctx.beginPath();
        ctx.arc(960 + Math.cos(angle) * dist, 540 + Math.sin(angle) * dist, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (t < 32.0) {
      // SCENE 4 (0:24.4 - 0:32.0): Split-Screen Comparison — Weak Indoor Bulb (Left) vs Bright Cloudy Sky (Right)
      const local = t - 24.4;

      // LEFT HALF: Dim Indoor Room With Single Hanging Bulb
      ctx.save();
      ctx.beginPath();
      ctx.rect(-600, -1200, 1560, 3200);
      ctx.clip();

      ctx.fillStyle = '#0d0f16';
      ctx.fillRect(-600, -1200, 1560, 3200);
      const bulbGlow = ctx.createRadialGradient(720, 360, 10, 720, 420, 260);
      bulbGlow.addColorStop(0, 'rgba(255, 205, 120, 0.38)');
      bulbGlow.addColorStop(1, 'rgba(13, 15, 22, 0)');
      ctx.fillStyle = bulbGlow;
      ctx.fillRect(400, 100, 600, 750);

      // Hanging Bulb Cord
      ctx.strokeStyle = '#4a4d5c';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(720, 0); ctx.lineTo(720, 340); ctx.stroke();
      ctx.fillStyle = '#ffe2a8';
      ctx.beginPath(); ctx.arc(720, 352, 14, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#080a0f';
      ctx.fillRect(-600, 835, 1560, 900);
      drawParkCharacter(720, 835, { slump: 0.85, eyeState: 'groggy', rimColor: 'rgba(255, 205, 130, 0.35)' });
      ctx.restore();

      // RIGHT HALF: Bright Overcast Outdoor Sky (10x Stronger Light!)
      ctx.save();
      ctx.beginPath();
      ctx.rect(960, -1200, 1560, 3200);
      ctx.clip();

      const cloudSky = ctx.createLinearGradient(960, 0, 960, 840);
      cloudSky.addColorStop(0, '#3a4c6b');
      cloudSky.addColorStop(0.55, '#6e86ad');
      cloudSky.addColorStop(1, '#b5cae6');
      ctx.fillStyle = cloudSky;
      ctx.fillRect(960, -1200, 1560, 2040);

      // Soft Bright Overcast Clouds
      ctx.fillStyle = 'rgba(235, 244, 255, 0.65)';
      ctx.beginPath();
      ctx.ellipse(1180 + Math.sin(local) * 15, 270, 170, 46, 0, 0, Math.PI * 2);
      ctx.ellipse(1260, 250, 140, 38, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#121724';
      ctx.fillRect(960, 835, 1560, 900);
      drawParkCharacter(1190, 835, { slump: 0, eyeState: 'energized', rimColor: 'rgba(230, 244, 255, 0.95)', sparks: true });
      ctx.restore();

      // Crisp Center Divider Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(960, -1200);
      ctx.lineTo(960, 2000);
      ctx.stroke();

    } else {
      // SCENE 5 (0:32.0 - 0:45.0): The 16-Hour Solar Sundial Arc & Lakeside Walk
      const local = t - 32.0;
      const p = local / 13.0;

      const sky = ctx.createLinearGradient(0, -600, 0, 840);
      sky.addColorStop(0, '#0f1b33');
      sky.addColorStop(0.55, '#3b4d70');
      sky.addColorStop(1, '#e89b68');
      ctx.fillStyle = sky;
      ctx.fillRect(-600, -1200, 3120, 2040);

      // Giant 16-Hour Solar Arc Across Sky (Morning -> Nightfall Timer)
      const arcCx = 960, arcCy = 780, arcR = 480;
      ctx.strokeStyle = 'rgba(255, 224, 150, 0.25)';
      ctx.lineWidth = 4;
      ctx.setLineDash([12, 12]);
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, arcR, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();
      ctx.setLineDash([]);

      // Progress Arc & Traveling Sun -> Moon Marker
      const startA = Math.PI * 1.12;
      const endA = Math.PI * 1.88;
      const curA = startA + Math.min(1, p * 1.15) * (endA - startA);

      ctx.strokeStyle = '#ffd56b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, arcR, startA, curA);
      ctx.stroke();

      const orbX = arcCx + Math.cos(curA) * arcR;
      const orbY = arcCy + Math.sin(curA) * arcR;
      ctx.shadowColor = '#ffd56b';
      ctx.shadowBlur = 28;
      ctx.fillStyle = '#fff5cc';
      ctx.beginPath();
      ctx.arc(orbX, orbY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ground & Walking Silhouette
      ctx.fillStyle = '#0c0f17';
      ctx.fillRect(-600, 835, 3120, 900);

      drawParkCharacter(760 + p * 260, 835, {
        slump: 0,
        walkCycle: local * 3.8,
        eyeState: 'energized',
        sparks: true
      });
    }

    // Cinema Edge Vignette
    const vig = ctx.createRadialGradient(960, 540, 560, 960, 540, 1280);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(3,4,8,0.62)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1920, 1080);

    ctx.restore();
  }
};
