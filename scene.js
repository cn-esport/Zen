// ==========================================
// SCENE: WHY YOUR BRAIN REFUSES TO SLEEP AT 2:00 AM (16:9 YOUTUBE EDITION • 210s)
// Native 1920x1080 Widescreen Canvas • 12 Synced Documentary Scenes
// ==========================================
const SCENE_DATA = {
  duration: 210,
  sfx: [
    // Chapter 1: The Midnight Trap (0:00 - 0:45)
    { at: 15.2,  type: "notification" },
    { at: 21.0,  type: "swipe" },
    { at: 24.5,  type: "swipe" },
    { at: 30.0,  type: "boom" },
    // Chapter 2: The Slot Machine in Your Pocket (0:45 - 1:40)
    { at: 45.0,  type: "whoosh" },
    { at: 48.0,  type: "swipe" },
    { at: 52.0,  type: "swipe" },
    { at: 56.0,  type: "swipe" },
    { at: 65.0,  type: "boom" },
    { at: 72.0,  type: "chime" },
    { at: 82.0,  type: "whoosh" },
    { at: 88.0,  type: "chime" },
    { at: 95.0,  type: "chime" },
    // Chapter 3: The Artificial Sun (1:40 - 2:35)
    { at: 100.0, type: "boom" },
    { at: 120.0, type: "whoosh" },
    { at: 138.0, type: "boom" },
    // Chapter 4: The Silent Cost & Breaking Free (2:35 - 3:30)
    { at: 155.0, type: "boom" },
    { at: 175.0, type: "whoosh" },
    { at: 192.0, type: "boom" },
    { at: 196.5, type: "lock" }
  ],
  captions: [
    // Chapter 1 (0:00 - 0:45)
    { start: 0.5,   length: 7.0, text: "It’s 2:00 AM. The city outside your window has finally gone quiet." },
    { start: 7.8,   length: 7.0, text: "Your eyes are heavy, your shoulders ache, and every part of your body is begging you to rest." },
    { start: 15.2,  length: 6.5, text: "Yet, your thumb keeps moving. One swipe. Two swipes. Ten swipes." },
    { start: 22.0,  length: 7.5, text: "You tell yourself a quiet lie: \"Just one more video, and then I’ll put it down.\"" },
    { start: 30.2,  length: 7.2, text: "Thirty minutes pass. Then forty-five. The room hasn't changed, your posture hasn't moved—" },
    { start: 37.8,  length: 6.8, text: "and you aren't even enjoying what you're watching anymore. So why can't you stop?" },

    // Chapter 2 (0:45 - 1:40)
    { start: 45.2,  length: 7.2, text: "The answer has nothing to do with weak willpower." },
    { start: 52.8,  length: 11.8, text: "You are up against a psychological engine built to hijack one of the oldest survival circuits in the human brain." },
    { start: 65.2,  length: 8.2, text: "Neuroscientists call it a variable reward schedule—the exact same mechanism behind a casino slot machine." },
    { start: 73.8,  length: 8.0, text: "If every video was boring, you'd close the app. If every video was amazing, your brain would feel satisfied and stop." },
    { start: 82.2,  length: 8.8, text: "Instead, the feed gives you a random mix: three forgettable clips, followed by one that makes you laugh or gasp." },
    { start: 91.4,  length: 8.2, text: "Every swipe triggers a spike of dopamine—not from the reward itself, but from the anticipation of what might come next." },

    // Chapter 3 (1:40 - 2:35)
    { start: 100.2, length: 9.2, text: "While your dopamine system keeps you glued to the screen, a second biological hijack is happening behind your eyes." },
    { start: 109.8, length: 9.8, text: "For hundreds of thousands of years, human sleep was guided by a single signal: the setting of the sun." },
    { start: 120.2, length: 8.8, text: "When darkness falls, a tiny gland in your brain begins releasing melatonin—" },
    { start: 129.4, length: 8.2, text: "the chemical messenger that slows your heart rate, cools your body, and prepares your mind for deep sleep." },
    { start: 138.2, length: 8.2, text: "But short-wavelength blue light shining inches from your face mimics the bright sky of midday." },
    { start: 146.8, length: 7.8, text: "To your brain's internal clock, it isn't 2:00 AM anymore—it is noon. Melatonin shuts down instantly." },

    // Chapter 4 (2:35 - 3:30)
    { start: 155.2, length: 9.5, text: "And the cost isn't just feeling groggy tomorrow. Without deep sleep, your brain never clears out daily metabolic waste." },
    { start: 165.1, length: 9.5, text: "Your focus fractures, your patience thins, and tomorrow night, your tired brain becomes even more vulnerable to the loop." },
    { start: 175.2, length: 8.2, text: "You aren't watching the feed anymore. The feed is holding your rest hostage—" },
    { start: 183.8, length: 7.8, text: "trading tomorrow's clarity for five more seconds of empty noise." },
    { start: 192.2, length: 7.5, text: "Tonight, break the loop. Lock the screen. Place it face down out of reach..." },
    { start: 200.2, length: 8.5, text: "and let yourself finally go to sleep." }
  ],

  render(ctx, W, H, t) {
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // Native 1920x1080 Widescreen Coordinate Normalization
    const scale = Math.max(W / 1920, H / 1080);
    const ox = (W - 1920 * scale) * 0.5;
    const oy = (H - 1080 * scale) * 0.5;
    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    // Widescreen Nocturne Sky + Rain-Lit City Skyline Outside Panoramic Window
    const drawWidescreenBackdrop = (zoom = 1, cityAlpha = 0.45) => {
      ctx.save();
      ctx.translate(960, 540);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      const sky = ctx.createLinearGradient(0, 0, 0, 1080);
      sky.addColorStop(0, '#04070f');
      sky.addColorStop(0.55, '#0a1426');
      sky.addColorStop(1, '#11213d');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 1920, 1080);

      if (cityAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = cityAlpha;
        // Wide Panoramic Window Frame (Left-Center Framing)
        const buildings = [
          [140, 340, 110, 440], [265, 270, 130, 510], [410, 310, 95, 470],
          [520, 230, 145, 550], [680, 290, 115, 490], [810, 250, 140, 530],
          [965, 320, 120, 460], [1100, 280, 130, 500]
        ];
        buildings.forEach(([bx, by, bw, bh], idx) => {
          ctx.fillStyle = '#060c18';
          ctx.fillRect(bx, by, bw, bh);
          ctx.fillStyle = idx % 2 === 0 ? 'rgba(130, 190, 255, 0.35)' : 'rgba(255, 215, 130, 0.28)';
          for (let wy = by + 22; wy < by + bh - 35; wy += 34) {
            for (let wx = bx + 16; wx < bx + bw - 20; wx += 26) {
              if ((wx + wy + idx) % 3 === 0) ctx.fillRect(wx, wy, 8, 12);
            }
          }
        });
        // Panoramic Window Mullions
        ctx.fillStyle = '#04060c';
        ctx.fillRect(460, 140, 12, 660);
        ctx.fillRect(880, 140, 12, 660);
        ctx.fillRect(120, 470, 1130, 12);
        ctx.restore();
      }

      // Floating Cinema Dust Motes Across Widescreen Frame
      for (let i = 0; i < 34; i++) {
        const px = ((i * 257 + t * (10 + (i % 5) * 3)) % 1920);
        const py = ((i * 193 - t * (12 + (i % 4) * 4)) % 1080 + 1080) % 1080;
        const r = 1.5 + (i % 3) * 1.3;
        ctx.fillStyle = i % 4 === 0 ? 'rgba(255, 224, 130, 0.25)' : 'rgba(140, 200, 255, 0.28)';
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    // Widescreen Last Soul Character Renderer
    const drawCharacter = (opts = {}) => {
      const {
        x = 640, y = 920, scaleChar = 1,
        screenOn = true, glowStrength = 1, lean = 0,
        eyeOpen = 1, squint = 0, goldSpark = false, lookUp = 0, lowerPhone = 0
      } = opts;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scaleChar, scaleChar);

      const breath = Math.sin(t * 1.5) * 3.5;
      const phoneX = 250 + lean * 12;
      const phoneY = -235 + breath * 0.5 + lowerPhone * 95;

      // Volumetric Screen Glow
      if (screenOn && glowStrength > 0) {
        const aura = ctx.createRadialGradient(phoneX, phoneY, 10, phoneX - 50, phoneY - 50, 440 * glowStrength);
        aura.addColorStop(0, 'rgba(165, 222, 255, 0.72)');
        aura.addColorStop(0.3, 'rgba(70, 155, 255, 0.28)');
        aura.addColorStop(0.68, 'rgba(30, 90, 190, 0.08)');
        aura.addColorStop(1, 'rgba(10, 25, 55, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(phoneX - 35, phoneY - 35, 440 * glowStrength, 0, Math.PI * 2);
        ctx.fill();
      }

      // Clean Silhouette Torso + Arm Holding Phone
      ctx.fillStyle = '#040508';
      ctx.beginPath();
      ctx.moveTo(-130, 220);
      ctx.bezierCurveTo(-135, -50, -95, -250 + breath, -18 + lean * 16, -300 + breath);
      ctx.bezierCurveTo(28 + lean * 16, -325 + breath, 68 + lean * 16, -290 + breath, 86 + lean * 16, -225 + breath);
      ctx.lineTo(125 + lean * 12, -155 + breath + lowerPhone * 40);
      ctx.lineTo(phoneX, phoneY + 32);
      ctx.lineTo(phoneX + 12, phoneY + 54);
      ctx.lineTo(100 + lean * 12, -108 + breath + lowerPhone * 40);
      ctx.lineTo(75, 220);
      ctx.closePath();
      ctx.fill();

      if (screenOn && glowStrength > 0) {
        ctx.strokeStyle = `rgba(155, 215, 255, ${0.32 * Math.min(1, glowStrength)})`;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      // Smartphone
      ctx.save();
      ctx.translate(phoneX + 8, phoneY);
      ctx.rotate(-0.24 + lowerPhone * 0.45);
      ctx.fillStyle = '#05070c';
      ctx.beginPath();
      ctx.roundRect(-8, -52, 15, 104, 5);
      ctx.fill();
      if (screenOn) {
        ctx.shadowColor = '#80c8ff';
        ctx.shadowBlur = 22;
        ctx.fillStyle = '#e6f4ff';
        ctx.beginPath();
        ctx.roundRect(-10, -45, 5, 90, 2.5);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // Neck & Head
      const headX = 12 + lean * 24;
      const headY = -402 + breath + lean * 8;
      ctx.fillStyle = '#040508';
      ctx.beginPath();
      ctx.roundRect(headX - 22, headY + 48, 34, 52, 12);
      ctx.fill();

      ctx.save();
      ctx.translate(headX, headY);
      ctx.rotate(0.06 + lean * 0.12 - lookUp * 0.35 + Math.sin(t * 0.85) * 0.02);

      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.fill();
      if (screenOn && glowStrength > 0) {
        ctx.strokeStyle = `rgba(170, 220, 255, ${0.38 * Math.min(1, glowStrength)})`;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      // Expressive Curved Eyebrows
      ctx.strokeStyle = 'rgba(225, 240, 255, 0.85)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      const browDrop = squint * 6;
      ctx.beginPath();
      ctx.moveTo(8, -22 + browDrop);
      ctx.quadraticCurveTo(22, -29 + browDrop, 34, -19 + browDrop);
      ctx.moveTo(42, -16 + browDrop);
      ctx.quadraticCurveTo(54, -23 + browDrop, 64, -12 + browDrop);
      ctx.stroke();

      // Glowing Eyes
      const blinkCycle = (t % 4.6);
      const blinkScale = (blinkCycle > 4.35 && blinkCycle < 4.52) ? 0.08 : 1;
      const finalEyeH = Math.max(0.06, eyeOpen * blinkScale * (1 - squint * 0.55));

      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 16 * eyeOpen;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + 0.7 * eyeOpen})`;
      ctx.beginPath();
      ctx.ellipse(22, -4, 10, 13 * finalEyeH, 0, 0, Math.PI * 2);
      ctx.ellipse(51, 2, 10, 13 * finalEyeH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Golden Dopamine Sparks
      if (goldSpark) {
        for (let i = 0; i < 12; i++) {
          const p = ((t * 0.55 + i * 0.083) % 1);
          const sx = phoneX - p * (phoneX - headX - 28) + Math.sin(p * 6 + i) * 22;
          const sy = phoneY - p * (phoneY - headY) - Math.sin(p * Math.PI) * 50;
          const alpha = Math.sin(p * Math.PI) * 0.9;
          ctx.fillStyle = i % 2 === 0 ? `rgba(255, 220, 120, ${alpha})` : `rgba(130, 210, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.2 + (i % 3) * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // ==========================================
    // 12-SCENE WIDESCREEN TIMELINE (210 SECONDS)
    // ==========================================
    if (t < 15.0) {
      // SCENE 1 (0:00 - 0:15): Quiet Midnight Panoramic Bedroom (Darkness -> Subtle Breathing)
      const p = t / 15.0;
      drawWidescreenBackdrop(1 + p * 0.05, 0.45);
      drawCharacter({ x: 640, y: 900, screenOn: false, glowStrength: 0, eyeOpen: 0.75 });

    } else if (t < 30.0) {
      // SCENE 2 (0:15 - 0:30): Phone Screen Ignites With Notification Chime
      const local = t - 15.0;
      const ignite = easeOut(local / 0.8);
      drawWidescreenBackdrop(1.05 + (local / 15.0) * 0.05, 0.45);
      drawCharacter({ x: 640, y: 900, screenOn: true, glowStrength: ignite, lean: 0.12 });

    } else if (t < 45.0) {
      // SCENE 3 (0:30 - 0:45): Split-Depth Widescreen — Character Frozen on Left, Giant Clock Sweeping on Right
      const local = t - 30.0;
      const p = local / 15.0;
      drawWidescreenBackdrop(1.04 - p * 0.04, 0.22);

      // Left: Character Frozen in Same Posture
      drawCharacter({ x: 460, y: 900, screenOn: true, glowStrength: 1.0, lean: 0.15 });

      // Right: Giant Translucent Midnight Clock Sweeping 2:00 -> 2:45
      ctx.save();
      ctx.translate(1340, 490);
      for (let r = 1; r <= 3; r++) {
        ctx.strokeStyle = `rgba(90, 175, 255, ${0.16 / r})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 160 + r * 75 + Math.sin(local * 2.5 + r) * 6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(6, 12, 26, 0.85)';
      ctx.strokeStyle = 'rgba(130, 200, 255, 0.5)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 185, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#e6f4ff';
      ctx.lineCap = 'round';
      const hrAngle = -Math.PI / 6 + p * 0.65;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(hrAngle) * 95, Math.sin(hrAngle) * 95);
      ctx.stroke();

      const minAngle = -Math.PI / 2 + p * Math.PI * 1.5;
      ctx.strokeStyle = '#ffd54f';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(minAngle) * 145, Math.sin(minAngle) * 145);
      ctx.stroke();
      ctx.restore();

    } else if (t < 65.0) {
      // SCENE 4 (0:45 - 1:05): Widescreen Sleek Smartphone + 60fps Inertia Feed Glide
      const local = t - 45.0;
      const zoom = 1 + (local / 20.0) * 0.08;
      drawWidescreenBackdrop(zoom, 0.18);

      ctx.save();
      ctx.translate(960, 520);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -520);

      const halo = ctx.createRadialGradient(960, 520, 50, 960, 520, 480);
      halo.addColorStop(0, 'rgba(90, 175, 255, 0.42)');
      halo.addColorStop(1, 'rgba(15, 35, 75, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(400, 50, 1120, 950);

      // Centered Sleek Smartphone Frame
      ctx.fillStyle = '#060a14';
      ctx.strokeStyle = 'rgba(130, 200, 255, 0.48)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(780, 120, 360, 760, 44);
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(796, 138, 328, 724, 34);
      ctx.clip();
      ctx.fillStyle = '#0a162b';
      ctx.fillRect(796, 138, 328, 724);

      const cycle = 2.2;
      const step = Math.floor(local / cycle);
      const frac = easeOut((local % cycle) / 0.65);
      const cardColors = ['#18427a', '#235ba6', '#143766', '#2b6ec7'];
      for (let i = -1; i < 5; i++) {
        const idx = ((i + step) % cardColors.length + cardColors.length) % cardColors.length;
        const cy = 160 + i * 280 - (frac * 280);
        ctx.fillStyle = cardColors[idx];
        ctx.beginPath();
        ctx.roundRect(816, cy, 288, 254, 22);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.beginPath();
        ctx.moveTo(945, cy + 108);
        ctx.lineTo(982, cy + 128);
        ctx.lineTo(945, cy + 148);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Smooth Thumb Flick Silhouette
      const flick = Math.sin(Math.min(1, (local % cycle) / 0.55) * Math.PI);
      ctx.save();
      ctx.translate(1200 - flick * 30, 880 - flick * 95);
      ctx.rotate(-0.35 - flick * 0.16);
      ctx.fillStyle = '#040508';
      ctx.beginPath();
      ctx.roundRect(-40, -140, 80, 380, 40);
      ctx.fill();
      ctx.restore();
      ctx.restore();

    } else if (t < 82.0) {
      // SCENE 5 (1:05 - 1:22): Full-Body Last Soul Silhouette Pulled Forward Across Widescreen by Golden Thread
      const local = t - 65.0;
      const p = local / 17.0;
      drawWidescreenBackdrop(1 + p * 0.06, 0.14);

      const walkX = 480 + p * 380;
      const walkBob = Math.abs(Math.sin(local * 3.2)) * 12;
      const beaconX = 1460;
      const beaconY = 470;

      // Floating Glowing Reward Orb Ahead
      const orbPulse = 1 + Math.sin(local * 4.5) * 0.12;
      const orbGlow = ctx.createRadialGradient(beaconX, beaconY, 8, beaconX, beaconY, 220 * orbPulse);
      orbGlow.addColorStop(0, 'rgba(255, 224, 130, 0.85)');
      orbGlow.addColorStop(0.35, 'rgba(110, 195, 255, 0.32)');
      orbGlow.addColorStop(1, 'rgba(10, 25, 55, 0)');
      ctx.fillStyle = orbGlow;
      ctx.beginPath();
      ctx.arc(beaconX, beaconY, 220 * orbPulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = '#ffd54f';
      ctx.shadowBlur = 24;
      ctx.fillStyle = '#fff5cc';
      ctx.beginPath();
      ctx.arc(beaconX, beaconY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Glowing Golden Thread Pulling Character Forward
      const headX = walkX + 24;
      const headY = 475 - walkBob;
      ctx.strokeStyle = 'rgba(255, 218, 115, 0.78)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(headX + 42, headY);
      ctx.quadraticCurveTo((headX + beaconX) * 0.5, headY + 38 + Math.sin(local * 4) * 16, beaconX, beaconY);
      ctx.stroke();

      // Striding Full-Body Silhouette
      ctx.save();
      ctx.translate(walkX, 850 - walkBob);
      ctx.fillStyle = '#040508';
      ctx.strokeStyle = 'rgba(255, 220, 130, 0.28)';
      ctx.lineWidth = 2;

      const stride = Math.sin(local * 3.2) * 34;
      ctx.beginPath();
      ctx.moveTo(-16, -95);
      ctx.lineTo(-24 - stride, 115);
      ctx.lineTo(-4 - stride, 115);
      ctx.lineTo(12, -95);
      ctx.moveTo(-8, -95);
      ctx.lineTo(16 + stride, 115);
      ctx.lineTo(38 + stride, 115);
      ctx.lineTo(20, -95);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-38, -82);
      ctx.bezierCurveTo(-44, -205, -14, -300, 28, -318);
      ctx.bezierCurveTo(60, -328, 78, -290, 68, -232);
      ctx.lineTo(132, -218);
      ctx.lineTo(128, -200);
      ctx.lineTo(56, -200);
      ctx.lineTo(32, -82);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(42, -376, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(58, -374, 8, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(78, -370, 8, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.beginPath();
      ctx.ellipse(walkX, 970, 105, 14, 0, 0, Math.PI * 2);
      ctx.fill();

    } else if (t < 100.0) {
      // SCENE 6 (1:22 - 1:40): Golden Dopamine Sparks Rising Into Eyes
      const local = t - 82.0;
      const p = local / 18.0;
      drawWidescreenBackdrop(1 + p * 0.08, 0.35);
      drawCharacter({
        x: 680, y: 910,
        screenOn: true,
        glowStrength: 1.2 + Math.sin(t * 3) * 0.1,
        lean: Math.min(0.65, p * 0.7),
        goldSpark: true
      });

    } else if (t < 120.0) {
      // SCENE 7 (1:40 - 2:00): Wide Shot — Harsh Daylight-Blue Sun Pouring From Phone
      const local = t - 100.0;
      const p = local / 20.0;
      drawWidescreenBackdrop(1.06 - p * 0.06, 0.25);

      const noonGlow = ctx.createRadialGradient(920, 680, 20, 920, 520, 880);
      noonGlow.addColorStop(0, 'rgba(195, 238, 255, 0.72)');
      noonGlow.addColorStop(0.45, 'rgba(85, 175, 255, 0.28)');
      noonGlow.addColorStop(1, 'rgba(15, 40, 90, 0)');
      ctx.fillStyle = noonGlow;
      ctx.fillRect(0, 0, 1920, 1080);

      drawCharacter({
        x: 640, y: 900,
        screenOn: true,
        glowStrength: 1.5,
        lean: 0.2,
        squint: easeOut(Math.min(1, local / 2.0))
      });

    } else if (t < 138.0) {
      // SCENE 8 (2:00 - 2:18): Character Looking Up as Crescent Moon Dims in Blue Light Waves
      const local = t - 120.0;
      const p = local / 18.0;
      drawWidescreenBackdrop(1 + p * 0.05, 0.15);

      const moonX = 1240;
      const moonY = 260;
      ctx.save();
      ctx.globalAlpha = Math.max(0.12, 0.95 - p * 0.82);
      ctx.shadowColor = '#dce7fa';
      ctx.shadowBlur = 35 * (1 - p * 0.8);
      ctx.fillStyle = '#eef5ff';
      ctx.beginPath();
      ctx.arc(moonX, moonY, 85, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#070f1f';
      ctx.beginPath();
      ctx.arc(moonX + 34, moonY - 22, 75, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const blueWash = ctx.createRadialGradient(960, 820, 40, 960, 540, 980);
      blueWash.addColorStop(0, `rgba(110, 195, 255, ${0.22 + p * 0.35})`);
      blueWash.addColorStop(1, 'rgba(10, 25, 55, 0)');
      ctx.fillStyle = blueWash;
      ctx.fillRect(0, 0, 1920, 1080);

      drawCharacter({
        x: 620, y: 910,
        screenOn: true,
        glowStrength: 1.1,
        lean: -0.05,
        lookUp: easeOut(Math.min(1, local / 1.8)),
        eyeOpen: Math.max(0.45, 1 - p * 0.45)
      });

    } else if (t < 155.0) {
      // SCENE 9 (2:18 - 2:35): Close-Up Portrait Squinting Against Midday Blue Screen Glare
      const local = t - 138.0;
      const p = local / 17.0;
      drawWidescreenBackdrop(1.08, 0.1);

      const glare = ctx.createRadialGradient(1180, 540, 30, 1080, 540, 760);
      glare.addColorStop(0, 'rgba(210, 242, 255, 0.78)');
      glare.addColorStop(0.5, 'rgba(80, 175, 255, 0.25)');
      glare.addColorStop(1, 'rgba(5, 10, 20, 0)');
      ctx.fillStyle = glare;
      ctx.fillRect(0, 0, 1920, 1080);

      drawCharacter({
        x: 660, y: 980, scaleChar: 1.25,
        screenOn: true,
        glowStrength: 1.65,
        lean: 0.15,
        squint: 0.85
      });

    } else if (t < 175.0) {
      // SCENE 10 (2:35 - 2:55): Hostage Behind Vertical Blue Screen Light Bars
      const local = t - 155.0;
      const p = local / 20.0;
      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, 1920, 1080);

      ctx.save();
      const zoom = 1 + p * 0.08;
      ctx.translate(960, 520);
      ctx.scale(zoom, zoom);

      const g = ctx.createRadialGradient(0, 30, 20, 0, 30, 460);
      g.addColorStop(0, 'rgba(110, 190, 255, 0.36)');
      g.addColorStop(1, 'rgba(5, 10, 20, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 30, 460, 0, Math.PI * 2);
      ctx.fill();

      const breath = Math.sin(t * 1.5) * 3;
      ctx.fillStyle = '#05070c';
      ctx.beginPath();
      ctx.moveTo(-210, 420);
      ctx.bezierCurveTo(-190, 220 + breath, -120, 145 + breath, -45, 130 + breath);
      ctx.lineTo(45, 130 + breath);
      ctx.bezierCurveTo(120, 145 + breath, 190, 220 + breath, 210, 420);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(-22, 70 + breath, 44, 70, 14);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, breath, 86, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-25, -4 + breath, 12, 15, 0, 0, Math.PI * 2);
      ctx.ellipse(25, -4 + breath, 12, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Vertical Screen-Light Prison Bars
      ctx.strokeStyle = 'rgba(110, 195, 255, 0.48)';
      ctx.lineWidth = 4;
      for (let bx = -330; bx <= 330; bx += 110) {
        ctx.beginPath();
        ctx.moveTo(bx, -360);
        ctx.lineTo(bx, 420);
        ctx.stroke();
      }
      ctx.restore();

    } else if (t < 192.0) {
      // SCENE 11 (2:55 - 3:12): Slowly Lowering the Phone as Light Bars Fade
      const local = t - 175.0;
      const p = easeOut(local / 12.0);
      drawWidescreenBackdrop(1.04 - p * 0.04, 0.35);
      drawCharacter({
        x: 640, y: 900,
        screenOn: true,
        glowStrength: Math.max(0.25, 1 - p * 0.75),
        lean: 0.1 - p * 0.15,
        lowerPhone: p * 0.85,
        eyeOpen: Math.max(0.6, 1 - p * 0.35)
      });

    } else {
      // SCENE 12 (3:12 - 3:30): Screen Locked Off at 3:16.5 (196.5s) -> Peaceful Sleep
      const local = t - 192.0;
      const lightsOut = t >= 196.5;
      const sleepProg = lightsOut ? easeOut((t - 196.5) / 2.2) : 0;

      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, 1920, 1080);

      ctx.save();
      const zoom = 1 + (local / 18.0) * 0.05;
      ctx.translate(960, 520);
      ctx.scale(zoom, zoom);

      if (!lightsOut) {
        const g = ctx.createRadialGradient(0, 30, 20, 0, 30, 340);
        g.addColorStop(0, 'rgba(110, 190, 255, 0.24)');
        g.addColorStop(1, 'rgba(5, 10, 20, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 30, 340, 0, Math.PI * 2);
        ctx.fill();
      }

      const breath = Math.sin(t * 1.4) * 3;
      ctx.fillStyle = '#05070c';
      ctx.beginPath();
      ctx.moveTo(-210, 420);
      ctx.bezierCurveTo(-190, 220 + breath, -120, 145 + breath, -45, 130 + breath);
      ctx.lineTo(45, 130 + breath);
      ctx.bezierCurveTo(120, 145 + breath, 190, 220 + breath, 210, 420);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(-22, 70 + breath, 44, 70, 14);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, breath, 86, 0, Math.PI * 2);
      ctx.fill();

      const eyeH = Math.max(0.05, 1 - sleepProg * 0.95);
      const eyeAlpha = Math.max(0.15, 1 - sleepProg * 0.85);
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 18 * eyeAlpha;
      ctx.fillStyle = `rgba(255, 255, 255, ${eyeAlpha})`;
      ctx.beginPath();
      ctx.ellipse(-25, -4 + breath, 12, 15 * eyeH, 0, 0, Math.PI * 2);
      ctx.ellipse(25, -4 + breath, 12, 15 * eyeH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // Widescreen Cinema Edge Vignette
    const vig = ctx.createRadialGradient(960, 540, 520, 960, 540, 1250);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(2,4,8,0.78)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1920, 1080);

    ctx.restore();
  }
};
