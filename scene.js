// ==========================================
// SCENE: THE 2:00 AM PHONE SCROLL TRAP (V6 • 8-SCENE CINEMA CUT • 50s)
// ==========================================
const SCENE_DATA = {
  duration: 50,
  sfx: [
    { at: 0.6,  type: "notification" },
    { at: 4.0,  type: "whoosh" },
    { at: 5.2,  type: "swipe" },
    { at: 7.4,  type: "swipe" },
    { at: 9.0,  type: "boom" },
    { at: 15.0, type: "chime" },
    { at: 19.5, type: "chime" },
    { at: 22.0, type: "whoosh" },
    { at: 25.0, type: "chime" },
    { at: 30.0, type: "boom" },
    { at: 36.0, type: "whoosh" },
    { at: 42.0, type: "boom" },
    { at: 46.4, type: "lock" }
  ],
  captions: [
    { start: 0.3,  length: 3.7, text: "It’s 2:00 AM. Your eyes are burning, your body is exhausted—yet your thumb refuses to stop scrolling." },
    { start: 4.3,  length: 4.6, text: "You tell yourself, \"Just one more video.\" Thirty minutes later, you're still awake." },
    { start: 9.3,  length: 5.4, text: "That’s not a lack of willpower—your brain is caught in a slot-machine loop." },
    { start: 15.2, length: 6.4, text: "Every swipe gives you a tiny hit of dopamine—not because the video is good," },
    { start: 21.9, length: 7.8, text: "but because your brain is addicted to the unpredictability of what might come next." },
    { start: 30.2, length: 5.6, text: "At the same time, that blue screen tricks your brain into thinking it’s noon," },
    { start: 36.2, length: 5.6, text: "completely shutting down melatonin—the exact hormone you need to fall asleep." },
    { start: 42.2, length: 4.1, text: "You aren't watching the feed anymore. The feed is keeping you hostage." },
    { start: 46.6, length: 3.0, text: "Put it down... and go to sleep." }
  ],

  render(ctx, W, H, t) {
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    const scale = Math.max(W / 1080, H / 1920);
    const ox = (W - 1080 * scale) * 0.5;
    const oy = (H - 1920 * scale) * 0.5;
    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    const drawNightBackdrop = (zoom = 1, cityAlpha = 0.45) => {
      ctx.save();
      ctx.translate(540, 960);
      ctx.scale(zoom, zoom);
      ctx.translate(-540, -960);

      const sky = ctx.createLinearGradient(0, 0, 0, 1920);
      sky.addColorStop(0, '#04070f');
      sky.addColorStop(0.55, '#0a1426');
      sky.addColorStop(1, '#11213d');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 1080, 1920);

      if (cityAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = cityAlpha;
        const buildings = [
          [110, 560, 95, 420], [215, 490, 110, 490], [335, 530, 85, 450],
          [430, 460, 120, 520], [560, 520, 95, 460], [665, 480, 115, 500], [790, 550, 140, 430]
        ];
        buildings.forEach(([bx, by, bw, bh], idx) => {
          ctx.fillStyle = '#060c18';
          ctx.fillRect(bx, by, bw, bh);
          ctx.fillStyle = idx % 2 === 0 ? 'rgba(130, 190, 255, 0.35)' : 'rgba(255, 215, 130, 0.28)';
          for (let wy = by + 24; wy < by + bh - 40; wy += 36) {
            for (let wx = bx + 16; wx < bx + bw - 20; wx += 26) {
              if ((wx + wy + idx) % 3 === 0) ctx.fillRect(wx, wy, 8, 12);
            }
          }
        });
        ctx.fillStyle = '#04060c';
        ctx.fillRect(534, 200, 12, 820);
        ctx.fillRect(90, 610, 900, 12);
        ctx.restore();
      }

      for (let i = 0; i < 26; i++) {
        const px = ((i * 197 + t * (8 + (i % 5) * 3)) % 1080);
        const py = ((i * 313 - t * (14 + (i % 4) * 5)) % 1920 + 1920) % 1920;
        const r = 1.5 + (i % 3) * 1.4;
        ctx.fillStyle = i % 4 === 0 ? 'rgba(255, 224, 130, 0.25)' : 'rgba(140, 200, 255, 0.28)';
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawCharacter = (opts = {}) => {
      const {
        x = 390, y = 1520,
        screenOn = true, glowStrength = 1, lean = 0,
        eyeOpen = 1, squint = 0, goldSpark = false
      } = opts;

      ctx.save();
      ctx.translate(x, y);

      const breath = Math.sin(t * 1.6) * 4;
      const phoneX = 275 + lean * 12;
      const phoneY = -265 + breath * 0.5;

      if (screenOn && glowStrength > 0) {
        const aura = ctx.createRadialGradient(phoneX, phoneY, 10, phoneX - 60, phoneY - 60, 480 * glowStrength);
        aura.addColorStop(0, 'rgba(165, 222, 255, 0.72)');
        aura.addColorStop(0.28, 'rgba(70, 155, 255, 0.28)');
        aura.addColorStop(0.65, 'rgba(30, 90, 190, 0.08)');
        aura.addColorStop(1, 'rgba(10, 25, 55, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(phoneX - 40, phoneY - 40, 480 * glowStrength, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#040508';
      ctx.beginPath();
      ctx.moveTo(-145, 220);
      ctx.bezierCurveTo(-150, -60, -105, -280 + breath, -20 + lean * 18, -335 + breath);
      ctx.bezierCurveTo(30 + lean * 18, -360 + breath, 75 + lean * 18, -325 + breath, 95 + lean * 18, -255 + breath);
      ctx.lineTo(135 + lean * 14, -175 + breath);
      ctx.lineTo(phoneX, phoneY + 35);
      ctx.lineTo(phoneX + 12, phoneY + 58);
      ctx.lineTo(110 + lean * 14, -125 + breath);
      ctx.lineTo(80, 220);
      ctx.closePath();
      ctx.fill();

      if (screenOn && glowStrength > 0) {
        ctx.strokeStyle = `rgba(155, 215, 255, ${0.32 * Math.min(1, glowStrength)})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(phoneX + 8, phoneY);
      ctx.rotate(-0.24);
      ctx.fillStyle = '#05070c';
      ctx.beginPath();
      ctx.roundRect(-8, -56, 16, 112, 6);
      ctx.fill();
      if (screenOn) {
        ctx.shadowColor = '#80c8ff';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#e6f4ff';
        ctx.beginPath();
        ctx.roundRect(-10, -48, 5, 96, 3);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      const headX = 12 + lean * 26;
      const headY = -445 + breath + lean * 10;
      ctx.fillStyle = '#040508';
      ctx.beginPath();
      ctx.roundRect(headX - 24, headY + 55, 36, 56, 14);
      ctx.fill();

      ctx.save();
      ctx.translate(headX, headY);
      ctx.rotate(0.06 + lean * 0.12 + Math.sin(t * 0.9) * 0.02);

      ctx.beginPath();
      ctx.arc(0, 0, 76, 0, Math.PI * 2);
      ctx.fill();
      if (screenOn && glowStrength > 0) {
        ctx.strokeStyle = `rgba(170, 220, 255, ${0.38 * Math.min(1, glowStrength)})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(225, 240, 255, 0.85)';
      ctx.lineWidth = 3.2;
      ctx.lineCap = 'round';
      const browDrop = squint * 7;
      ctx.beginPath();
      ctx.moveTo(10, -24 + browDrop);
      ctx.quadraticCurveTo(24, -31 + browDrop, 36, -21 + browDrop);
      ctx.moveTo(46, -18 + browDrop);
      ctx.quadraticCurveTo(58, -25 + browDrop, 68, -14 + browDrop);
      ctx.stroke();

      const blinkCycle = (t % 4.6);
      const blinkScale = (blinkCycle > 4.35 && blinkCycle < 4.52) ? 0.08 : 1;
      const finalEyeH = Math.max(0.06, eyeOpen * blinkScale * (1 - squint * 0.55));

      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 18 * eyeOpen;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + 0.7 * eyeOpen})`;
      ctx.beginPath();
      ctx.ellipse(24, -4, 11, 14 * finalEyeH, 0, 0, Math.PI * 2);
      ctx.ellipse(55, 2, 11, 14 * finalEyeH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      if (goldSpark) {
        for (let i = 0; i < 10; i++) {
          const p = ((t * 0.55 + i * 0.1) % 1);
          const sx = phoneX - p * (phoneX - headX - 30) + Math.sin(p * 6 + i) * 24;
          const sy = phoneY - p * (phoneY - headY) - Math.sin(p * Math.PI) * 55;
          const alpha = Math.sin(p * Math.PI) * 0.9;
          ctx.fillStyle = i % 2 === 0 ? `rgba(255, 220, 120, ${alpha})` : `rgba(130, 210, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5 + (i % 3) * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // ==========================================
    // 8-SCENE CINEMA TIMELINE (50 SECONDS)
    // ==========================================
    if (t < 4.0) {
      // SCENE 1 (0:00 - 0:04): Midnight Hook
      const p = t / 4.0;
      const ignite = t > 0.6 ? easeOut((t - 0.6) / 0.5) : 0;
      drawNightBackdrop(1 + p * 0.06, 0.45);
      drawCharacter({ x: 380, y: 1500, screenOn: t > 0.6, glowStrength: ignite, lean: 0.1 });

    } else if (t < 9.0) {
      // SCENE 2 (0:04 - 0:09): Sleek Smartphone + 60fps Inertia Feed Glide
      const local = t - 4.0;
      const zoom = 1 + (local / 5.0) * 0.08;
      drawNightBackdrop(zoom, 0.2);

      ctx.save();
      ctx.translate(540, 860);
      ctx.scale(zoom, zoom);
      ctx.translate(-540, -860);

      const halo = ctx.createRadialGradient(540, 840, 60, 540, 840, 520);
      halo.addColorStop(0, 'rgba(90, 175, 255, 0.42)');
      halo.addColorStop(1, 'rgba(15, 35, 75, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 200, 1080, 1300);

      ctx.fillStyle = '#060a14';
      ctx.strokeStyle = 'rgba(130, 200, 255, 0.45)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(330, 400, 420, 860, 52);
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(348, 422, 384, 816, 40);
      ctx.clip();
      ctx.fillStyle = '#0a162b';
      ctx.fillRect(348, 422, 384, 816);

      const cycle = 2.0;
      const step = Math.floor(local / cycle);
      const frac = easeOut((local % cycle) / 0.65);
      const cardColors = ['#18427a', '#235ba6', '#143766', '#2b6ec7'];
      for (let i = -1; i < 5; i++) {
        const idx = ((i + step) % cardColors.length + cardColors.length) % cardColors.length;
        const cy = 445 + i * 320 - (frac * 320);
        ctx.fillStyle = cardColors[idx];
        ctx.beginPath();
        ctx.roundRect(370, cy, 340, 290, 26);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.beginPath();
        ctx.moveTo(525, cy + 125);
        ctx.lineTo(565, cy + 148);
        ctx.lineTo(525, cy + 171);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      const flick = Math.sin(Math.min(1, (local % cycle) / 0.55) * Math.PI);
      ctx.save();
      ctx.translate(820 - flick * 35, 1260 - flick * 110);
      ctx.rotate(-0.35 - flick * 0.18);
      ctx.fillStyle = '#040508';
      ctx.beginPath();
      ctx.roundRect(-45, -160, 90, 420, 45);
      ctx.fill();
      ctx.restore();
      ctx.restore();

    } else if (t < 15.0) {
      // SCENE 3 (0:09 - 0:15): Time Slipping Away (Spinning Clock + Endless Feed Rings)
      const local = t - 9.0;
      const p = local / 6.0;
      drawNightBackdrop(1.06 - p * 0.06, 0.12);

      ctx.save();
      ctx.translate(540, 820);
      // Concentric Slot/Loop Rings
      for (let r = 1; r <= 3; r++) {
        ctx.strokeStyle = `rgba(90, 175, 255, ${0.18 / r})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 180 + r * 95 + Math.sin(local * 3 + r) * 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Glowing Minimalist Clock Face
      ctx.fillStyle = '#060c1a';
      ctx.strokeStyle = 'rgba(130, 200, 255, 0.55)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 210, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hour & Fast-Spinning Minute Hands
      ctx.strokeStyle = '#e6f4ff';
      ctx.lineCap = 'round';
      // Hour hand (2:00 -> 2:35)
      const hrAngle = -Math.PI / 6 + p * 0.55;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(hrAngle) * 110, Math.sin(hrAngle) * 110);
      ctx.stroke();

      // Minute hand sweeping 35 minutes
      const minAngle = -Math.PI / 2 + p * Math.PI * 1.25;
      ctx.strokeStyle = '#ffd54f';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(minAngle) * 165, Math.sin(minAngle) * 165);
      ctx.stroke();
      ctx.restore();

    } else if (t < 22.0) {
      // SCENE 4 (0:15 - 0:22): Golden Dopamine Sparks Pulling Character Forward
      const local = t - 15.0;
      const p = local / 7.0;
      drawNightBackdrop(1 + p * 0.08, 0.35);
      drawCharacter({
        x: 370, y: 1500,
        screenOn: true,
        glowStrength: 1.15 + Math.sin(t * 3) * 0.1,
        lean: Math.min(0.65, p * 0.8),
        goldSpark: true
      });

    } else if (t < 30.0) {
      // SCENE 5 (0:22 - 0:30): The Unpredictable Next Reward (Floating Mystery Cards)
      const local = t - 22.0;
      drawNightBackdrop(1.04, 0.15);

      ctx.save();
      ctx.translate(540, 820);
      for (let i = 0; i < 3; i++) {
        const offset = (i - 1) * 240;
        const bob = Math.sin(local * 2.5 + i * 1.4) * 18;
        const active = Math.floor(local * 1.5) % 3 === i;

        ctx.save();
        ctx.translate(offset, bob);
        ctx.scale(active ? 1.08 : 0.94, active ? 1.08 : 0.94);

        ctx.fillStyle = active ? '#12284d' : '#081122';
        ctx.strokeStyle = active ? '#ffd54f' : 'rgba(110, 185, 255, 0.35)';
        ctx.lineWidth = active ? 4 : 2.5;
        ctx.beginPath();
        ctx.roundRect(-95, -145, 190, 290, 24);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = active ? '#ffd54f' : 'rgba(160, 210, 255, 0.55)';
        ctx.font = 'bold 84px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(active ? '★' : '?', 0, 6);
        ctx.restore();
      }
      ctx.restore();

    } else if (t < 36.0) {
      // SCENE 6 (0:30 - 0:36): Fake Noon Sun Flooding the Room
      const local = t - 30.0;
      const p = local / 6.0;
      drawNightBackdrop(1.06 - p * 0.06, 0.25);

      const noonGlow = ctx.createRadialGradient(650, 1230, 20, 650, 1000, 860);
      noonGlow.addColorStop(0, 'rgba(195, 238, 255, 0.72)');
      noonGlow.addColorStop(0.45, 'rgba(85, 175, 255, 0.28)');
      noonGlow.addColorStop(1, 'rgba(15, 40, 90, 0)');
      ctx.fillStyle = noonGlow;
      ctx.fillRect(0, 0, 1080, 1920);

      drawCharacter({
        x: 380, y: 1500,
        screenOn: true,
        glowStrength: 1.5,
        lean: 0.2,
        squint: easeOut(Math.min(1, local / 1.5))
      });

    } else if (t < 42.0) {
      // SCENE 7 (0:36 - 0:42): Melatonin Shutdown (Crescent Moon Dimming in Blue Waves)
      const local = t - 36.0;
      const p = local / 6.0;
      drawNightBackdrop(1 + p * 0.05, 0);

      ctx.save();
      ctx.translate(540, 740);
      // Fading Crescent Moon
      ctx.globalAlpha = Math.max(0.1, 0.95 - p * 0.85);
      ctx.shadowColor = '#dce7fa';
      ctx.shadowBlur = 35 * (1 - p * 0.8);
      ctx.fillStyle = '#eef5ff';
      ctx.beginPath();
      ctx.arc(0, 0, 130, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#070f1f';
      ctx.beginPath();
      ctx.arc(52, -32, 115, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Blue Light Waves Rising From Bottom
      for (let w = 0; w < 3; w++) {
        const wy = 1450 - ((local * 140 + w * 220) % 750);
        const wa = Math.max(0, 0.35 - (1450 - wy) / 2100);
        ctx.strokeStyle = `rgba(100, 195, 255, ${wa})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(540, 1650, 1650 - wy, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
      }

    } else {
      // SCENE 8 (0:42 - 0:50): Hostage Behind Light Bars -> Lights Out & Sleep
      const local = t - 42.0;
      const lightsOut = t >= 46.4;
      const sleepProg = lightsOut ? easeOut((t - 46.4) / 1.4) : 0;

      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, 1080, 1920);

      ctx.save();
      const zoom = 1 + (local / 8.0) * 0.08;
      ctx.translate(540, 880);
      ctx.scale(zoom, zoom);

      if (!lightsOut) {
        const g = ctx.createRadialGradient(0, 40, 20, 0, 40, 420);
        g.addColorStop(0, 'rgba(110, 190, 255, 0.35)');
        g.addColorStop(1, 'rgba(5, 10, 20, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 40, 420, 0, Math.PI * 2);
        ctx.fill();
      }

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
      ctx.arc(0, breath, 88, 0, Math.PI * 2);
      ctx.fill();

      const eyeH = Math.max(0.05, 1 - sleepProg * 0.95);
      const eyeAlpha = Math.max(0.15, 1 - sleepProg * 0.85);
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 18 * eyeAlpha;
      ctx.fillStyle = `rgba(255, 255, 255, ${eyeAlpha})`;
      ctx.beginPath();
      ctx.ellipse(-26, -4 + breath, 13, 16 * eyeH, 0, 0, Math.PI * 2);
      ctx.ellipse(26, -4 + breath, 13, 16 * eyeH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (!lightsOut) {
        ctx.strokeStyle = 'rgba(110, 195, 255, 0.45)';
        ctx.lineWidth = 4;
        for (let bx = -220; bx <= 220; bx += 110) {
          ctx.beginPath();
          ctx.moveTo(bx, -360);
          ctx.lineTo(bx, 420);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    const vig = ctx.createRadialGradient(540, 960, 420, 540, 960, 1150);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(2,4,8,0.78)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.restore();
  }
};
