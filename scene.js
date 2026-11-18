// ==========================================
// SCENE: THE 9-MINUTE SNOOZE TRAP (SLEEP INERTIA) — DUAL-RATIO 2.5D DIORAMA (45s)
// Built for cn-esport/Zen (16:9 & 9:16 Native Fit • Frame-Synced SFX & Captions)
// ==========================================
const SCENE_DATA = {
  duration: 45,
  sfx: [
    { at: 0.4,  type: "notification" }, // First alarm ring
    { at: 2.3,  type: "lock" },         // Hitting snooze button
    { at: 6.8,  type: "notification" }, // Second alarm jolt
    { at: 8.2,  type: "boom" },         // Exhausted wake-up impact
    { at: 15.2, type: "whoosh" },       // Transition into sleep cycle / brain wave
    { at: 22.8, type: "boom" },         // Second alarm rips out of deep sleep
    { at: 23.0, type: "notification" }, // Piercing second alarm chime
    { at: 32.5, type: "whoosh" },       // 4-hour fog / clock sweep
    { at: 39.5, type: "boom" },         // First alarm ring call-to-action
    { at: 41.2, type: "chime" }         // Standing up / morning sunlight triumph
  ],
  captions: [
    { start: 0.2,  length: 4.2, text: "Your alarm goes off. You hit snooze for just nine more minutes—" },
    { start: 4.6,  length: 4.8, text: "and suddenly, you wake up feeling ten times more exhausted than before." },
    { start: 9.6,  length: 5.4, text: "That heavy, paralyzed feeling in your brain isn't laziness. It’s a biological trap called sleep inertia." },
    { start: 15.2, length: 7.4, text: "When you fall back asleep after an alarm, your brain thinks you’re starting a brand-new sleep cycle—and floods your system with deep sleep chemicals." },
    { start: 22.8, length: 9.4, text: "Minutes later, your second alarm rips you straight out of that deep stage, leaving your prefrontal cortex half-asleep for up to four hours." },
    { start: 32.5, length: 6.6, text: "Those extra nine minutes aren't resting your body. They’re drugging your brain." },
    { start: 39.4, length: 5.2, text: "Next time the alarm rings... get up on the very first sound." }
  ],

  render(ctx, W, H, t) {
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // True Adaptive Framing: Fits entire room in both 16:9 and 9:16 without cropping
    const isPortrait = W < H;
    const targetSpanW = isPortrait ? 1040 : 1920;
    const scale = isPortrait ? (W / targetSpanW) : Math.max(W / 1920, H / 1080);
    const ox = (W - 1920 * scale) * 0.5 + (isPortrait ? 45 * scale : 0);
    const oy = (H - 1080 * scale) * 0.5 + (isPortrait ? 85 * scale : 0);

    if (isPortrait) {
      const bgFill = ctx.createLinearGradient(0, 0, 0, H);
      bgFill.addColorStop(0, '#131622');
      bgFill.addColorStop(0.55, '#20222e');
      bgFill.addColorStop(0.75, '#242129');
      bgFill.addColorStop(1, '#0e0f16');
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    // ==========================================
    // HELPER 1: 2.5D EARLY-MORNING BEDROOM DIORAMA
    // ==========================================
    const drawBedroomDiorama = (opts = {}) => {
      const {
        zoom = 1, panX = 0, panY = 0,
        clockText = "06:30", alarmRinging = false,
        morningWarmth = 0.25, fogOpacity = 0, sunShaft = 0.35
      } = opts;

      ctx.save();
      ctx.translate(960 + panX, 540 + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      // 1. Early-Morning Wall Gradient (Pre-Dawn Cool Slate -> Golden Sunrise Warmth)
      const wallGrad = ctx.createRadialGradient(1050, 320, 80, 960, 540, 1450);
      wallGrad.addColorStop(0, morningWarmth > 0.6 ? '#463b38' : '#262836');
      wallGrad.addColorStop(0.55, '#181a24');
      wallGrad.addColorStop(1, '#0b0c12');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(-600, -1200, 3120, 2030);

      // Baseboard Trim
      ctx.fillStyle = '#0e1018';
      ctx.fillRect(-600, 812, 3120, 18);

      // Perspective Wood Floor
      const floorGrad = ctx.createLinearGradient(0, 830, 0, 1500);
      floorGrad.addColorStop(0, '#221f28');
      floorGrad.addColorStop(0.35, '#16151c');
      floorGrad.addColorStop(1, '#090a0f');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(-600, 830, 3120, 900);

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.lineWidth = 2;
      [865, 905, 952, 1008, 1072, 1145, 1225].forEach(fy => {
        ctx.beginPath();
        ctx.moveTo(-600, fy);
        ctx.lineTo(2520, fy);
        ctx.stroke();
      });

      // 2. Bedroom Window With Dawn Horizon Sky
      const wx = 860, wy = 145, ww = 390, wh = 430;
      ctx.fillStyle = '#090b10';
      ctx.fillRect(wx - 10, wy - 10, ww + 20, wh + 20);

      const winSky = ctx.createLinearGradient(wx, wy, wx, wy + wh);
      winSky.addColorStop(0, morningWarmth > 0.6 ? '#2a3d66' : '#151e38');
      winSky.addColorStop(0.65, morningWarmth > 0.6 ? '#8c6254' : '#3a3852');
      winSky.addColorStop(1, morningWarmth > 0.6 ? '#f5b878' : '#7a585c');
      ctx.fillStyle = winSky;
      ctx.fillRect(wx, wy, ww, wh);

      // Morning City Skyline Silhouette
      ctx.fillStyle = '#0d101c';
      ctx.fillRect(wx + 25, wy + 340, 65, 90);
      ctx.fillRect(wx + 100, wy + 310, 80, 120);
      ctx.fillRect(wx + 190, wy + 350, 55, 80);
      ctx.fillRect(wx + 255, wy + 295, 95, 135);

      // Window Mullions & Sill
      ctx.fillStyle = '#0d1018';
      ctx.fillRect(wx + ww / 2 - 5, wy, 10, wh);
      ctx.fillRect(wx, wy + wh / 2 - 5, ww, 10);
      ctx.fillStyle = '#282a34';
      ctx.fillRect(wx - 22, wy + wh + 6, ww + 44, 14);

      // Soft Dawn Light Shaft Entering Window
      if (sunShaft > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const shaft = ctx.createLinearGradient(wx + ww * 0.5, wy, wx - 60, 850);
        shaft.addColorStop(0, `rgba(255, 205, 145, ${0.28 * sunShaft})`);
        shaft.addColorStop(1, 'rgba(255, 205, 145, 0)');
        ctx.fillStyle = shaft;
        ctx.beginPath();
        ctx.moveTo(wx, wy + wh);
        ctx.lineTo(wx + ww, wy + wh);
        ctx.lineTo(wx + ww + 120, 845);
        ctx.lineTo(wx - 160, 845);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 3. Nightstand + Vibrating Digital Alarm Clock + Off/Dim Lamp
      const nx = 460, ny = 655, nw = 185, nh = 175;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.beginPath();
      ctx.ellipse(nx + nw / 2, 835, 115, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      const nsGrad = ctx.createLinearGradient(nx, ny, nx + nw, ny + nh);
      nsGrad.addColorStop(0, '#2c2a34');
      nsGrad.addColorStop(1, '#14151c');
      ctx.fillStyle = nsGrad;
      ctx.beginPath();
      ctx.roundRect(nx, ny, nw, nh, 6);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = 2;
      ctx.strokeRect(nx + 12, ny + 16, nw - 24, 62);
      ctx.fillStyle = '#565866';
      ctx.fillRect(nx + nw / 2 - 16, ny + 44, 32, 5);

      // Table Lamp (Off in morning light)
      const lx = nx + 132, ly = ny - 115;
      ctx.fillStyle = '#3b3942';
      ctx.fillRect(lx - 4, ny - 45, 8, 45);
      ctx.beginPath();
      ctx.ellipse(lx, ny - 3, 22, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#363846';
      ctx.beginPath();
      ctx.moveTo(lx - 26, ly);
      ctx.lineTo(lx + 26, ly);
      ctx.lineTo(lx + 42, ly + 68);
      ctx.lineTo(lx - 42, ly + 68);
      ctx.closePath();
      ctx.fill();

      // Digital Alarm Clock (Shakes & Pulses Red When Ringing!)
      const shakeX = alarmRinging ? Math.sin(t * 55) * 3 : 0;
      const shakeY = alarmRinging ? Math.cos(t * 48) * 2 : 0;
      ctx.save();
      ctx.translate(nx + 52 + shakeX, ny - 18 + shakeY);

      if (alarmRinging) {
        const ringPulse = 1 + Math.sin(t * 18) * 0.25;
        const rGlow = ctx.createRadialGradient(0, 0, 6, 0, 0, 110 * ringPulse);
        rGlow.addColorStop(0, 'rgba(255, 55, 75, 0.72)');
        rGlow.addColorStop(1, 'rgba(255, 55, 75, 0)');
        ctx.fillStyle = rGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 110 * ringPulse, 0, Math.PI * 2);
        ctx.fill();

        // Soundwave Arcs Above Alarm Clock
        ctx.strokeStyle = 'rgba(255, 90, 105, 0.75)';
        ctx.lineWidth = 2.5;
        for (let r = 1; r <= 2; r++) {
          const waveR = 32 + ((t * 45 + r * 16) % 34);
          const waveA = Math.max(0, 1 - (waveR - 32) / 34);
          ctx.strokeStyle = `rgba(255, 90, 105, ${waveA * 0.8})`;
          ctx.beginPath();
          ctx.arc(0, -10, waveR, -Math.PI * 0.8, -Math.PI * 0.2);
          ctx.stroke();
        }
      }

      ctx.fillStyle = '#12080a';
      ctx.beginPath();
      ctx.roundRect(-36, -18, 72, 36, 5);
      ctx.fill();
      ctx.shadowColor = '#ff2a3c';
      ctx.shadowBlur = alarmRinging ? 22 : 12;
      ctx.fillStyle = '#ff3b4e';
      ctx.font = 'bold 19px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(clockText, 0, 7);
      ctx.shadowBlur = 0;
      ctx.restore();

      // 4. Bed Frame, Mattress, Pillow & Blanket
      const bx = 665, by = 710, bw = 690, bh = 120;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
      ctx.beginPath();
      ctx.ellipse(bx + bw / 2, 838, bw * 0.52, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#191a22';
      ctx.beginPath();
      ctx.roundRect(bx - 12, by - 95, 22, 215, 6);
      ctx.roundRect(bx + bw - 14, by + 20, 18, 100, 4);
      ctx.fill();

      ctx.fillStyle = '#23242e';
      ctx.fillRect(bx, by + 48, bw, 44);

      const matGrad = ctx.createLinearGradient(bx, by, bx, by + 52);
      matGrad.addColorStop(0, '#5a6070');
      matGrad.addColorStop(1, '#2c303b');
      ctx.fillStyle = matGrad;
      ctx.beginPath();
      ctx.roundRect(bx + 6, by + 6, bw - 12, 46, 12);
      ctx.fill();

      const pilGrad = ctx.createLinearGradient(bx + 18, by - 26, bx + 135, by + 18);
      pilGrad.addColorStop(0, '#8e96ab');
      pilGrad.addColorStop(1, '#3a3f4d');
      ctx.fillStyle = pilGrad;
      ctx.beginPath();
      ctx.ellipse(bx + 78, by - 4, 62, 22, -0.14, 0, Math.PI * 2);
      ctx.fill();

      const blkGrad = ctx.createLinearGradient(bx + 490, by - 14, bx + 675, by + 52);
      blkGrad.addColorStop(0, '#4f627d');
      blkGrad.addColorStop(1, '#232d3d');
      ctx.fillStyle = blkGrad;
      ctx.beginPath();
      ctx.roundRect(bx + 495, by - 12, 182, 64, 14);
      ctx.fill();

      // Heavy Sleep-Inertia Fog Layer Over Room
      if (fogOpacity > 0) {
        ctx.fillStyle = `rgba(12, 16, 28, ${fogOpacity})`;
        ctx.fillRect(-600, -1200, 3120, 2800);
      }

      ctx.restore();
    };

    // ==========================================
    // HELPER 2: RIM-LIT STICK-FIGURE CHARACTER (SNOOZE -> EXHAUSTED -> STANDING UP)
    // ==========================================
    const drawStickCharacter = (opts = {}) => {
      const {
        zoom = 1, panX = 0, panY = 0,
        pose = 'lying', // 'lying' | 'snooze_reach' | 'heavy_sit' | 'stand_up'
        eyeState = 'closed', // 'closed' | 'groggy' | 'wide'
        rimColor = 'rgba(255, 215, 165, 0.72)',
        heavyFogAura = false
      } = opts;

      ctx.save();
      ctx.translate(960 + panX, 540 + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      const breath = Math.sin(t * 1.7) * 2.5;

      const drawRimLimb = (pts, width = 18) => {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = rimColor;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1] - 3);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1] - 3);
        ctx.stroke();

        ctx.strokeStyle = '#090a0f';
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      };

      const drawHead = (hx, hy) => {
        ctx.fillStyle = rimColor;
        ctx.beginPath();
        ctx.arc(hx + 2, hy - 3, 33, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#090a0f';
        ctx.beginPath();
        ctx.arc(hx, hy, 32, 0, Math.PI * 2);
        ctx.fill();

        if (eyeState === 'groggy') {
          ctx.shadowColor = '#9ec8ff';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#dcebff';
          ctx.beginPath();
          ctx.ellipse(hx + 10, hy - 4, 4.5, 2.2, 0.12, 0, Math.PI * 2);
          ctx.ellipse(hx + 21, hy - 2, 4.5, 2.2, -0.12, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (eyeState === 'wide') {
          const blink = (t % 4.5) > 4.35 ? 0.1 : 1;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 14;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.ellipse(hx + 11, hy - 5, 4.5, 6.2 * blink, 0, 0, Math.PI * 2);
          ctx.ellipse(hx + 22, hy - 5, 4.5, 6.2 * blink, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      };

      if (pose === 'lying' || pose === 'snooze_reach') {
        const hx = 762, hy = 678;
        // Torso & Legs
        drawRimLimb([[805, 696], [965, 698 + breath * 0.4]], 20);
        drawRimLimb([[965, 698], [1035, 632 - breath], [1125, 696]], 18);
        drawRimLimb([[965, 702], [1155, 704]], 17);

        if (pose === 'snooze_reach') {
          // Left arm reaching cleanly across to hit snooze button on nightstand (512, 637)
          drawRimLimb([[802, 692], [655, 642], [514, 636]], 14);
        } else {
          // Relaxed arm resting at side
          drawRimLimb([[815, 696], [890, 700]], 15);
        }
        drawHead(hx, hy);

      } else if (pose === 'heavy_sit') {
        // Sitting slumped on edge of bed, weighted down by sleep inertia
        const hx = 825, hy = 552 + breath;
        // Heavy dark-blue inertia haze around head
        if (heavyFogAura) {
          const fog = ctx.createRadialGradient(hx, hy, 10, hx, hy, 140);
          fog.addColorStop(0, 'rgba(85, 135, 225, 0.35)');
          fog.addColorStop(1, 'rgba(15, 25, 50, 0)');
          ctx.fillStyle = fog;
          ctx.beginPath();
          ctx.arc(hx, hy, 140, 0, Math.PI * 2);
          ctx.fill();
        }
        // Slumped Spine
        drawRimLimb([[810, 696], [802, 635], [818, 592]], 20);
        // Legs hanging off edge of bed to floor
        drawRimLimb([[810, 696], [845, 745], [840, 830]], 18);
        // Heavy arms resting on knees / holding head
        drawRimLimb([[812, 615], [848, 665], [845, 725]], 14);
        drawHead(hx, hy);

      } else if (pose === 'stand_up') {
        // Standing upright beside bed in morning sunlight—awake and energized!
        const hx = 770, hy = 468 + breath * 0.5;
        // Legs planted firmly on floor
        drawRimLimb([[768, 665], [752, 830]], 18);
        drawRimLimb([[772, 665], [792, 830]], 18);
        // Upright Torso
        drawRimLimb([[770, 665], [770, 515]], 20);
        // Relaxed Arms
        drawRimLimb([[770, 535], [795, 635]], 14);
        drawHead(hx, hy);
      }

      ctx.restore();
    };

    // ==========================================
    // 6-SCENE TIMELINE (45 SECONDS)
    // ==========================================
    if (t < 4.5) {
      // SCENE 1 (0:00 - 0:04.5): First Alarm Rings at 06:30 -> Hand Reaches Out to Hit Snooze at 2.3s
      const ringing = t < 2.3;
      const reaching = t >= 1.6 && t <= 3.3;
      drawBedroomDiorama({
        zoom: 1.05, panX: 60, panY: -20,
        clockText: "06:30", alarmRinging: ringing, morningWarmth: 0.35, sunShaft: 0.35
      });
      drawStickCharacter({
        zoom: 1.05, panX: 60, panY: -20,
        pose: reaching ? 'snooze_reach' : 'lying',
        eyeState: 'closed'
      });

    } else if (t < 15.2) {
      // SCENE 2 (0:04.5 - 0:15.2): 9 Minutes Later (06:39) -> Waking Up Paralyzed by Sleep Inertia
      const local = t - 4.5;
      const p = local / 10.7;
      const alarm2 = local >= 2.2 && local < 4.2;
      const satUp = local >= 3.5;
      drawBedroomDiorama({
        zoom: 1.15 + p * 0.08, panX: 40, panY: -30,
        clockText: local < 2.2 ? "06:38" : "06:39",
        alarmRinging: alarm2, morningWarmth: 0.2, fogOpacity: 0.28, sunShaft: 0.2
      });
      drawStickCharacter({
        zoom: 1.15 + p * 0.08, panX: 40, panY: -30,
        pose: satUp ? 'heavy_sit' : 'lying',
        eyeState: satUp ? 'groggy' : 'closed',
        rimColor: 'rgba(155, 195, 255, 0.65)',
        heavyFogAura: satUp
      });

    } else if (t < 22.8) {
      // SCENE 3 (0:15.2 - 0:22.8): Inside the Brain — Deep Sleep Chemicals Flooding In
      const local = t - 15.2;
      const p = local / 7.6;
      ctx.fillStyle = '#070b17';
      ctx.fillRect(0, 0, 1920, 1080);

      // Slow Deep-Sleep Delta Waves Across Screen
      for (let w = 0; w < 4; w++) {
        ctx.strokeStyle = `rgba(95, 155, 255, ${0.32 - w * 0.06})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = 0; x <= 1920; x += 25) {
          const y = 540 + Math.sin(x * 0.004 + t * 1.4 + w * 1.2) * (95 + w * 25);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Drifting Blue Melatonin / Adenosine Droplets Sinking Downward
      for (let i = 0; i < 18; i++) {
        const dx = ((i * 213) % 1600) + 160;
        const dy = ((i * 149 + local * 110) % 960) + 60;
        ctx.fillStyle = 'rgba(125, 185, 255, 0.55)';
        ctx.beginPath();
        ctx.arc(dx, dy, 6 + (i % 4) * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Centered Sleeping Head Silhouette Sinking Into Deep Sleep
      ctx.fillStyle = '#04060c';
      ctx.strokeStyle = 'rgba(130, 190, 255, 0.55)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(960, 540, 115, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

    } else if (t < 32.5) {
      // SCENE 4 (0:22.8 - 0:32.5): Second Alarm Rips Out of Deep Sleep -> 4-Hour Brain Fog
      const local = t - 22.8;
      const shock = local < 1.2;
      drawBedroomDiorama({
        zoom: 1.28, panX: 50, panY: -40,
        clockText: "06:39", alarmRinging: shock,
        morningWarmth: 0.18, fogOpacity: 0.35, sunShaft: 0.15
      });
      drawStickCharacter({
        zoom: 1.28, panX: 50, panY: -40,
        pose: 'heavy_sit',
        eyeState: 'groggy',
        rimColor: shock ? 'rgba(255, 110, 120, 0.85)' : 'rgba(140, 185, 255, 0.6)',
        heavyFogAura: true
      });

    } else if (t < 39.4) {
      // SCENE 5 (0:32.5 - 0:39.4): Wide Shot — Clock Advancing Through Morning Hours Under Heavy Fog
      const local = t - 32.5;
      const p = local / 6.9;
      const hr = p < 0.33 ? "07:30" : p < 0.66 ? "08:45" : "10:15";
      drawBedroomDiorama({
        zoom: 1.04, panX: 0, panY: 0,
        clockText: hr, alarmRinging: false,
        morningWarmth: 0.35, fogOpacity: 0.3, sunShaft: 0.3
      });
      drawStickCharacter({
        zoom: 1.04, panX: 0, panY: 0,
        pose: 'heavy_sit',
        eyeState: 'groggy',
        rimColor: 'rgba(145, 185, 245, 0.6)',
        heavyFogAura: true
      });

    } else {
      // SCENE 6 (0:39.4 - 0:45.0): Get Up on the First Sound! Standing Awake in Warm Golden Sunrise
      const local = t - 39.4;
      const stoodUp = local >= 1.6;
      const rise = easeOut(Math.min(1, Math.max(0, (local - 1.2) / 1.5)));
      drawBedroomDiorama({
        zoom: 1.02 + rise * 0.04, panX: 0, panY: 0,
        clockText: "06:30", alarmRinging: !stoodUp,
        morningWarmth: 0.35 + rise * 0.65, fogOpacity: 0, sunShaft: 0.4 + rise * 0.9
      });
      drawStickCharacter({
        zoom: 1.02 + rise * 0.04, panX: 0, panY: 0,
        pose: stoodUp ? 'stand_up' : 'heavy_sit',
        eyeState: 'wide',
        rimColor: 'rgba(255, 222, 160, 0.9)'
      });
    }

    // Soft Cinema Edge Vignette
    const vig = ctx.createRadialGradient(960, 540, 560, 960, 540, 1280);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(3,4,8,0.68)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1920, 1080);

    ctx.restore();
  }
};
