/* ==========================================================================
   LAST SOUL STUDIO — EPISODES & SCENES LIBRARY
   ========================================================================== */

window.LAST_SOUL_SCENES = [
  /* ------------------------------------------------------------------------
     EPISODE 00: FULL INDOOR-TO-OUTDOOR SHOWCASE (32 Seconds)
     Scene 1: Sleeping in Room -> Scene 2: Waking & Stretching ->
     Scene 3: Walking Outdoors -> Scene 4: Arriving at Local Shop
     ------------------------------------------------------------------------ */
  {
    id: "studio-showcase-00",
    title: "00 · Full Indoor, Outdoor & Shop Test",
    duration: 32.0,
    ambience: "night",
    beats: [
      {
        start: 0.0,
        label: "SCENE 01 · DEEP SLEEP",
        lens: "WIDE · 24MM",
        camera: { x: 0, y: 0, zoom: 1.0, tilt: 0 },
        subtitle: "Scene 1: Deep sleep cycle—chest breathing, moonlight, and floating Zzz's."
      },
      {
        start: 8.0,
        label: "SCENE 02 · WAKING UP",
        lens: "MEDIUM · DOLLY IN",
        camera: { x: 0.06, y: 0.04, zoom: 1.38, tilt: -0.5 },
        subtitle: "Scene 2: Waking up—sitting upright and full overhead arm stretch."
      },
      {
        start: 16.0,
        label: "SCENE 03 · OUTDOOR WALK",
        lens: "TRACKING · 35MM",
        camera: { x: 0.0, y: 0.03, zoom: 1.25, tilt: 0 },
        subtitle: "Scene 3: Outdoor morning walk—scrolling street, trees, and knee-bend stride."
      },
      {
        start: 24.0,
        label: "SCENE 04 · LOCAL SHOP",
        lens: "WIDE · ESTABLISHING",
        camera: { x: 0.05, y: 0.01, zoom: 1.12, tilt: 0 },
        subtitle: "Scene 4: Arriving at the local shop—warm lantern glow and counter reach."
      }
    ],
    sounds: [
      { at: 1.0, type: "tick" },
      { at: 2.5, type: "tick" },
      { at: 4.0, type: "tick" },
      { at: 5.5, type: "tick" },
      { at: 6.8, type: "chime" },
      { at: 8.3, type: "buzz" },
      { at: 14.5, type: "footstep" },
      { at: 16.6, type: "footstep" },
      { at: 17.5, type: "footstep" },
      { at: 18.4, type: "footstep" },
      { at: 19.3, type: "footstep" },
      { at: 20.2, type: "footstep" },
      { at: 21.1, type: "footstep" },
      { at: 22.0, type: "footstep" },
      { at: 22.9, type: "footstep" },
      { at: 24.4, type: "chime" },
      { at: 28.0, type: "heartbeat" }
    ],
    render(ctx, w, h, t) {
      // Helper: Articulated 2-Segment Limb
      function drawLimb(x1, y1, angle1, len1, angle2, len2, thickness, color = "#030407") {
        const jx = x1 + Math.sin(angle1) * len1;
        const jy = y1 + Math.cos(angle1) * len1;
        const ex = jx + Math.sin(angle1 + angle2) * len2;
        const ey = jy + Math.cos(angle1 + angle2) * len2;

        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(jx, jy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        return { jx, jy, ex, ey };
      }

      /* ====================================================================
         PART A (0s - 16s): INDOOR BEDROOM (SLEEPING -> WAKING & STRETCHING)
         ==================================================================== */
      if (t < 16.0) {
        const wakeProgress = Math.max(0, Math.min(1, (t - 7.5) / 2.2)); // 0 = sleeping, 1 = sitting up

        // Sky/Room transitions from deep night blue to soft dawn indigo as alarm rings
        const bg = ctx.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, wakeProgress > 0.3 ? "#111a2e" : "#060913");
        bg.addColorStop(0.65, wakeProgress > 0.3 ? "#1e293b" : "#0c1322");
        bg.addColorStop(1, "#04060b");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        // Bedroom Window
        const winX = w * 0.12;
        const winY = h * 0.14;
        const winW = w * 0.32;
        const winH = h * 0.26;
        ctx.fillStyle = wakeProgress > 0.3 ? "#334155" : "#152238";
        ctx.fillRect(winX, winY, winW, winH);

        // Morning Sun / Moon Orb in Window
        ctx.fillStyle = wakeProgress > 0.3 ? "rgba(251, 191, 36, 0.75)" : "rgba(186, 230, 253, 0.55)";
        ctx.beginPath();
        ctx.arc(winX + winW * 0.65, winY + winH * (0.35 - wakeProgress * 0.1), 16, 0, Math.PI * 2);
        ctx.fill();

        // Window Frame Bars
        ctx.strokeStyle = "#05070c";
        ctx.lineWidth = 4;
        ctx.strokeRect(winX, winY, winW, winH);
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.moveTo(winX, winY + winH / 2);
        ctx.lineTo(winX + winW, winY + winH / 2);
        ctx.stroke();

        // Bedside Table & Alarm Clock
        const bedY = h * 0.72;
        ctx.fillStyle = "#080b12";
        ctx.fillRect(w * 0.08, bedY + 10, w * 0.16, h * 0.25);

        // Alarm Clock shaking at 6.8s - 9.0s
        const alarmShake = t >= 6.8 && t <= 9.2 ? Math.sin(t * 55) * 3 : 0;
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(w * 0.11 + alarmShake, bedY - 14, w * 0.1, 22);
        ctx.fillStyle = t >= 6.8 ? "#fbbf24" : "#ef4444";
        ctx.font = `700 ${Math.max(10, w * 0.025)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText("06:30", w * 0.16 + alarmShake, bedY + 1);

        // Bed Frame & Mattress
        ctx.fillStyle = "#06080f";
        ctx.fillRect(w * 0.26, bedY, w * 0.68, h * 0.28);

        // Pillow on Right
        ctx.fillStyle = "#141c2b";
        ctx.beginPath();
        ctx.ellipse(w * 0.80, bedY - 2, w * 0.11, h * 0.028, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Character Sleeping -> Sitting Up -> Stretching
        const breath = Math.sin(t * 2.0) * 3;
        const hipX = w * 0.66;
        const hipY = bedY - 6;

        // Torso angle: -1.42 rad (lying flat) -> 0.0 rad (sitting upright)
        const torsoAngle = -1.42 * (1 - wakeProgress);
        const torsoLen = h * 0.14;
        const shoulderX = hipX + Math.sin(torsoAngle) * torsoLen;
        const shoulderY = hipY - Math.cos(torsoAngle) * torsoLen + breath * (1 - wakeProgress);

        // Draw Blanket over lower body (slides back slightly when waking)
        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.moveTo(w * 0.34 + wakeProgress * 35, bedY + 4);
        ctx.quadraticCurveTo(w * 0.55, bedY - 18 + breath, hipX + 12, bedY + 4);
        ctx.lineTo(w * 0.34 + wakeProgress * 35, bedY + 35);
        ctx.closePath();
        ctx.fill();

        // Torso Silhouette
        ctx.strokeStyle = "#030407";
        ctx.lineWidth = Math.max(16, w * 0.045);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(hipX, hipY);
        ctx.lineTo(shoulderX, shoulderY);
        ctx.stroke();

        // Head Silhouette
        const headR = Math.min(w, h) * 0.036;
        const headX = shoulderX + Math.sin(torsoAngle) * (headR * 1.35);
        const headY = shoulderY - Math.cos(torsoAngle) * (headR * 1.35);

        ctx.fillStyle = "#030407";
        ctx.beginPath();
        ctx.arc(headX, headY, headR, 0, Math.PI * 2);
        ctx.fill();

        // Rim Light on Head
        ctx.strokeStyle = wakeProgress > 0.3 ? "rgba(251, 191, 36, 0.75)" : "rgba(147, 197, 253, 0.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(headX, headY, headR, Math.PI * 0.8, Math.PI * 1.6);
        ctx.stroke();

        // Floating "Zzz" Particles while sleeping (0s - 6.8s)
        if (t < 6.8) {
          ctx.fillStyle = "rgba(186, 230, 253, 0.55)";
          ctx.font = "600 14px sans-serif";
          for (let z = 0; z < 3; z++) {
            const cycle = (t * 0.6 + z * 0.33) % 1;
            const zx = headX - 18 - cycle * 26;
            const zy = headY - 14 - cycle * 45;
            ctx.globalAlpha = 1 - cycle;
            ctx.fillText("z", zx, zy);
          }
          ctx.globalAlpha = 1;
        }

        // Morning Stretch Arms (10.0s - 14.5s)
        if (t >= 9.5) {
          const stretchAmt = Math.sin(Math.min(1, (t - 9.5) / 2.2) * Math.PI);
          const armLen = h * 0.065;
          drawLimb(shoulderX, shoulderY + 4, -2.5 * stretchAmt - 0.3, armLen, -0.3, armLen * 0.9, 7);
          drawLimb(shoulderX + 6, shoulderY + 4, -2.8 * stretchAmt - 0.1, armLen, 0.25, armLen * 0.9, 7);
        }
      }

      /* ====================================================================
         PART B (16s - 24s): OUTDOOR MORNING STREET WALK
         ==================================================================== */
      else if (t < 24.0) {
        const localT = t - 16.0;

        // Warm Golden-Hour Morning Sky
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, "#172554");
        sky.addColorStop(0.52, "#9a3412");
        sky.addColorStop(0.76, "#f59e0b");
        sky.addColorStop(1, "#090d16");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        // Rising Morning Sun
        ctx.fillStyle = "rgba(254, 240, 138, 0.85)";
        ctx.beginPath();
        ctx.arc(w * 0.72, h * 0.54, w * 0.11, 0, Math.PI * 2);
        ctx.fill();

        // Parallax Distant Hills & Buildings
        const scroll = localT * 65;
        ctx.fillStyle = "#0f172a";
        for (let b = -1; b < 6; b++) {
          const bx = ((b * 130 - scroll * 0.45) % (w + 150));
          const bh = 70 + ((b * 37) % 65);
          ctx.fillRect(bx, h * 0.74 - bh, 95, bh);
        }

        // Parallax Roadside Trees & Utility Poles
        for (let tr = 0; tr < 5; tr++) {
          const tx = ((tr * 190 - scroll * 1.1) % (w + 200) + (w + 200)) % (w + 200) - 60;
          // Utility Pole
          ctx.fillStyle = "#05070c";
          ctx.fillRect(tx, h * 0.34, 5, h * 0.42);
          ctx.fillRect(tx - 14, h * 0.38, 33, 3);

          // Tree Crown Silhouette
          ctx.beginPath();
          ctx.arc(tx + 55, h * 0.58, 32, 0, Math.PI * 2);
          ctx.arc(tx + 78, h * 0.61, 25, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(tx + 62, h * 0.60, 7, h * 0.16);
        }

        // Road & Sidewalk
        const groundY = h * 0.76;
        ctx.fillStyle = "#05070c";
        ctx.fillRect(0, groundY, w, h - groundY);

        // Dashed Road Markings moving past
        ctx.fillStyle = "rgba(251, 191, 36, 0.35)";
        for (let m = 0; m < 8; m++) {
          const mx = ((m * 90 - scroll * 1.6) % (w + 90) + (w + 90)) % (w + 90) - 40;
          ctx.fillRect(mx, groundY + 24, 38, 4);
        }

        // Full Walking Cycle Silhouette (Center Frame Tracking)
        const charX = w * 0.44;
        const walkPhase = localT * Math.PI * 2.22;
        const stride = Math.sin(walkPhase);
        const bounce = Math.abs(Math.cos(walkPhase)) * 5;
        const hipY = groundY - h * 0.15 + bounce;
        const shoulderY = hipY - h * 0.11;
        const headY = shoulderY - h * 0.045;
        const legLen = h * 0.075;
        const armLen = h * 0.056;

        // Back Arm & Leg
        drawLimb(charX, shoulderY + 4, -stride * 0.48, armLen, 0.25, armLen * 0.9, 6.5);
        drawLimb(charX, hipY, -stride * 0.5, legLen, -Math.max(0, stride) * 0.55, legLen, 8);

        // Torso
        ctx.fillStyle = "#030407";
        ctx.fillRect(charX - 10, shoulderY, 20, hipY - shoulderY + 3);

        // Front Leg & Knee Bend
        drawLimb(charX, hipY, stride * 0.5, legLen, -Math.max(0, -stride) * 0.55, legLen, 8.5);

        // Head + Warm Sunlight Rim Edge
        const headR = Math.min(w, h) * 0.032;
        ctx.beginPath();
        ctx.arc(charX + 2, headY, headR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(253, 224, 71, 0.85)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(charX + 2, headY, headR, -0.9, 0.9);
        ctx.stroke();

        // Front Arm Swing
        drawLimb(charX + 2, shoulderY + 4, stride * 0.48, armLen, 0.35, armLen * 0.9, 7);
      }

      /* ====================================================================
         PART C (24s - 32s): ARRIVING AT NEIGHBORHOOD LOCAL SHOP
         ==================================================================== */
      else {
        const localT = t - 24.0;

        // Crisp Morning Daylight Sky
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, "#1e3a5f");
        sky.addColorStop(0.65, "#3b6998");
        sky.addColorStop(1, "#090d16");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        const groundY = h * 0.78;
        ctx.fillStyle = "#05070d";
        ctx.fillRect(0, groundY, w, h - groundY);

        // Local Shop Building Structure (Right Side)
        const shopX = w * 0.46;
        const shopY = h * 0.32;
        const shopW = w * 0.46;
        const shopH = groundY - shopY;

        ctx.fillStyle = "#0b101b";
        ctx.fillRect(shopX, shopY, shopW, shopH);

        // Warm Glowing Shop Interior Window & Counter
        const glow = ctx.createRadialGradient(
          shopX + shopW * 0.5, shopY + shopH * 0.45, 10,
          shopX + shopW * 0.5, shopY + shopH * 0.5, shopW * 0.85
        );
        glow.addColorStop(0, "rgba(251, 191, 36, 0.85)");
        glow.addColorStop(0.6, "rgba(245, 158, 11, 0.32)");
        glow.addColorStop(1, "rgba(11, 16, 27, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(shopX + 10, shopY + 35, shopW - 20, shopH * 0.55);

        // Shopkeeper Silhouette inside counter
        ctx.fillStyle = "#090c14";
        ctx.beginPath();
        ctx.arc(shopX + shopW * 0.65, shopY + shopH * 0.46, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(shopX + shopW * 0.58, shopY + shopH * 0.51, 24, 35);

        // Striped Shop Awning
        const stripes = 6;
        const stripeW = (shopW + 16) / stripes;
        for (let s = 0; s < stripes; s++) {
          ctx.fillStyle = s % 2 === 0 ? "#d97706" : "#f8fafc";
          ctx.beginPath();
          ctx.moveTo(shopX - 8 + s * stripeW, shopY + 26);
          ctx.lineTo(shopX - 8 + (s + 1) * stripeW, shopY + 26);
          ctx.lineTo(shopX - 12 + (s + 1) * stripeW, shopY + 52);
          ctx.lineTo(shopX - 12 + s * stripeW, shopY + 52);
          ctx.closePath();
          ctx.fill();
        }

        // Shop Signboard ("SOUL MART")
        ctx.fillStyle = "#030407";
        ctx.fillRect(shopX + 12, shopY - 14, shopW - 24, 26);
        ctx.fillStyle = "#fbbf24";
        ctx.font = `700 ${Math.max(10, w * 0.028)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("SOUL STORE", shopX + shopW / 2, shopY + 4);

        // Character Arriving & Reaching Hand Toward Shop Counter
        const walkIn = Math.min(1, localT / 1.8);
        const charX = w * (0.20 + walkIn * 0.18);
        const bob = walkIn < 1 ? Math.abs(Math.sin(localT * 12)) * 4 : Math.sin(localT * 2.2) * 2;
        const hipY = groundY - h * 0.15 + bob;
        const shoulderY = hipY - h * 0.11;
        const headY = shoulderY - h * 0.045;
        const legLen = h * 0.075;
        const armLen = h * 0.056;

        // Standing Legs
        const stepOffset = walkIn < 1 ? Math.sin(localT * 12) * 0.35 : 0.07;
        drawLimb(charX, hipY, -stepOffset, legLen, 0.05, legLen, 8);
        drawLimb(charX, hipY, stepOffset, legLen, 0.05, legLen, 8.5);

        // Torso & Head
        ctx.fillStyle = "#030407";
        ctx.fillRect(charX - 10, shoulderY, 20, hipY - shoulderY + 3);
        const headR = Math.min(w, h) * 0.032;
        ctx.beginPath();
        ctx.arc(charX + 2, headY, headR, 0, Math.PI * 2);
        ctx.fill();

        // Warm Shop Lantern Rim Light on Face
        ctx.strokeStyle = "rgba(251, 191, 36, 0.9)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(charX + 2, headY, headR, -0.8, 0.8);
        ctx.stroke();

        // Hand Reaching Out to Counter after 2.2s
        const reach = Math.max(0, Math.min(1, (localT - 2.0) / 1.0));
        const handPos = drawLimb(
          charX + 2,
          shoulderY + 4,
          0.15 + reach * 0.75,
          armLen,
          0.2 + reach * 0.45,
          armLen * 0.95,
          7
        );

        // Small Glowing Item/Bag Handed Over at 4.5s
        if (localT >= 4.2) {
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(handPos.ex - 5, handPos.ey + 2, 12, 14);
        }
      }
    }
  },

  /* ------------------------------------------------------------------------
     EPISODE 01: THE 2:00 AM SCROLL TRAP (18 Seconds · Nocturne Bedroom Scene)
     ------------------------------------------------------------------------ */
  {
    id: "scroll-trap-01",
    title: "01 · The 2:00 AM Scroll Trap",
    duration: 18.0,
    ambience: "night",
    beats: [
      {
        start: 0.0,
        label: "SHOT 01 · ESTABLISHING",
        lens: "WIDE · 24MM",
        camera: { x: 0, y: 0, zoom: 1.0, tilt: 0 },
        subtitle: "2:00 AM. You told yourself, 'Just five more minutes.'"
      },
      {
        start: 4.5,
        label: "SHOT 02 · DOPAMINE PULL",
        lens: "MEDIUM · DOLLY IN",
        camera: { x: 0.06, y: 0.04, zoom: 1.32, tilt: -0.8 },
        subtitle: "Every swipe feeds a tiny hit of fake urgency to an exhausted brain."
      },
      {
        start: 9.5,
        label: "SHOT 03 · FACE GLOW",
        lens: "CLOSE-UP · 50MM",
        camera: { x: 0.11, y: 0.06, zoom: 1.78, tilt: 0.6 },
        subtitle: "Blue light tricks your biology into thinking it's noon—shutting off melatonin."
      },
      {
        start: 14.0,
        label: "SHOT 04 · THE CHOICE",
        lens: "WIDE · PULL BACK",
        camera: { x: 0, y: 0, zoom: 1.05, tilt: 0 },
        subtitle: "Put the screen down. Reclaim tomorrow before it starts."
      }
    ],
    sounds: [
      { at: 0.5, type: "tick" },
      { at: 1.5, type: "tick" },
      { at: 2.5, type: "tick" },
      { at: 4.6, type: "buzz" },
      { at: 7.2, type: "chime" },
      { at: 9.8, type: "heartbeat" },
      { at: 12.2, type: "heartbeat" },
      { at: 14.5, type: "tick" }
    ],
    render(ctx, w, h, t) {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, "#070b14");
      bgGrad.addColorStop(0.55, "#0d1526");
      bgGrad.addColorStop(1, "#05070c");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const winW = w * 0.34;
      const winH = h * 0.28;
      const winX = w * 0.12;
      const winY = h * 0.14;

      const moonGlow = ctx.createRadialGradient(
        winX + winW * 0.5, winY + winH * 0.4, 8,
        winX + winW * 0.5, winY + winH * 0.5, winW * 1.4
      );
      moonGlow.addColorStop(0, "rgba(125, 179, 255, 0.28)");
      moonGlow.addColorStop(1, "rgba(13, 21, 38, 0)");
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#14223b";
      ctx.fillRect(winX, winY, winW, winH);
      ctx.strokeStyle = "#060911";
      ctx.lineWidth = 4;
      ctx.strokeRect(winX, winY, winW, winH);
      ctx.beginPath();
      ctx.moveTo(winX + winW / 2, winY);
      ctx.lineTo(winX + winW / 2, winY + winH);
      ctx.moveTo(winX, winY + winH / 2);
      ctx.lineTo(winX + winW, winY + winH / 2);
      ctx.stroke();

      ctx.fillStyle = "#090d16";
      ctx.fillRect(w * 0.62, h * 0.18, w * 0.24, h * 0.055);
      ctx.fillStyle = Math.sin(t * 4) > 0 ? "#ef4444" : "#991b1b";
      ctx.font = `700 ${Math.max(12, w * 0.036)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(t > 13.5 ? "02:47" : "02:00", w * 0.74, h * 0.217);

      const bedY = h * 0.72;
      ctx.fillStyle = "#06080f";
      ctx.fillRect(w * 0.18, bedY, w * 0.76, h * 0.28);

      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.ellipse(w * 0.74, bedY + 6, w * 0.14, h * 0.032, -0.15, 0, Math.PI * 2);
      ctx.fill();

      const breath = Math.sin(t * 2.1) * 3;
      const putsPhoneDown = t >= 14.5;
      const phoneFlicker = putsPhoneDown ? 0 : 0.85 + Math.sin(t * 19) * 0.15;

      const torsoX = w * 0.63;
      const torsoY = bedY - h * 0.12 + breath;

      if (!putsPhoneDown) {
        const phoneX = torsoX - w * 0.14;
        const phoneY = torsoY - h * 0.02 + Math.sin(t * 5) * 2;
        const lightCone = ctx.createRadialGradient(
          phoneX, phoneY, 4,
          phoneX + w * 0.08, phoneY - h * 0.04, w * 0.28
        );
        lightCone.addColorStop(0, `rgba(56, 189, 248, ${0.55 * phoneFlicker})`);
        lightCone.addColorStop(0.5, `rgba(59, 130, 246, ${0.18 * phoneFlicker})`);
        lightCone.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = lightCone;
        ctx.beginPath();
        ctx.arc(phoneX, phoneY, w * 0.32, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#030407";
      ctx.beginPath();
      ctx.moveTo(torsoX - w * 0.05, bedY + 12);
      ctx.quadraticCurveTo(torsoX - w * 0.07, torsoY - h * 0.03, torsoX + w * 0.02, torsoY - h * 0.06);
      ctx.quadraticCurveTo(torsoX + w * 0.12, torsoY - h * 0.04, torsoX + w * 0.15, bedY + 12);
      ctx.closePath();
      ctx.fill();

      const headX = torsoX + w * 0.01;
      const headY = torsoY - h * 0.105;
      const headR = Math.min(w, h) * 0.048;

      ctx.save();
      ctx.beginPath();
      ctx.arc(headX, headY, headR, 0, Math.PI * 2);
      ctx.fillStyle = "#030407";
      ctx.fill();

      if (!putsPhoneDown) {
        ctx.strokeStyle = `rgba(125, 211, 252, ${0.75 * phoneFlicker})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(headX, headY, headR, Math.PI * 0.75, Math.PI * 1.45);
        ctx.stroke();
      }
      ctx.restore();

      const phoneX = putsPhoneDown ? torsoX - w * 0.16 : torsoX - w * 0.13;
      const phoneY = putsPhoneDown ? bedY - 4 : torsoY - h * 0.02 + Math.sin(t * 6) * 2;

      ctx.strokeStyle = "#030407";
      ctx.lineWidth = Math.max(7, w * 0.022);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(torsoX + w * 0.02, torsoY - h * 0.02);
      ctx.quadraticCurveTo(torsoX - w * 0.06, torsoY + h * 0.04, phoneX, phoneY);
      ctx.stroke();

      ctx.save();
      ctx.translate(phoneX, phoneY);
      ctx.rotate(putsPhoneDown ? Math.PI / 2 : -0.35);
      ctx.fillStyle = putsPhoneDown ? "#1e293b" : "#38bdf8";
      ctx.fillRect(-3, -12, 6, 24);
      ctx.restore();
    }
  },

  /* ------------------------------------------------------------------------
     EPISODE 02: WALKING THROUGH RAIN IN SILENCE (16 Seconds · Noir Street Walk)
     ------------------------------------------------------------------------ */
  {
    id: "rain-walk-02",
    title: "02 · Walking Through Rain in Silence",
    duration: 16.0,
    ambience: "rain",
    beats: [
      {
        start: 0.0,
        label: "SHOT 01 · SOLITUDE",
        lens: "WIDE · 24MM",
        camera: { x: 0, y: 0, zoom: 1.0, tilt: 0 },
        subtitle: "Sometimes the loudest breakthroughs happen when nobody is watching."
      },
      {
        start: 5.5,
        label: "SHOT 02 · TRACKING",
        lens: "MEDIUM · TRACKING",
        camera: { x: 0.04, y: 0.05, zoom: 1.35, tilt: 0 },
        subtitle: "Every quiet step forward builds what noise and distraction never could."
      },
      {
        start: 11.0,
        label: "SHOT 03 · HORIZON",
        lens: "LOW ANGLE · 35MM",
        camera: { x: 0.08, y: 0.02, zoom: 1.5, tilt: -1.0 },
        subtitle: "Keep walking. Your future self is already waiting."
      }
    ],
    sounds: [
      { at: 1.0, type: "footstep" },
      { at: 2.2, type: "footstep" },
      { at: 3.4, type: "footstep" },
      { at: 4.6, type: "footstep" },
      { at: 5.8, type: "footstep" },
      { at: 7.0, type: "footstep" },
      { at: 8.2, type: "footstep" },
      { at: 9.4, type: "footstep" },
      { at: 10.6, type: "footstep" },
      { at: 11.8, type: "footstep" },
      { at: 13.0, type: "footstep" }
    ],
    render(ctx, w, h, t) {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#060913");
      sky.addColorStop(0.65, "#11192c");
      sky.addColorStop(1, "#090c14");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      const lampX = w * 0.72;
      const lampY = h * 0.24;
      const lampGlow = ctx.createRadialGradient(lampX, lampY, 5, lampX, lampY, w * 0.45);
      lampGlow.addColorStop(0, "rgba(251, 191, 36, 0.45)");
      lampGlow.addColorStop(0.4, "rgba(245, 158, 11, 0.12)");
      lampGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = lampGlow;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#04060b";
      ctx.fillRect(lampX - 3, lampY, 6, h * 0.56);

      const groundY = h * 0.78;
      ctx.fillStyle = "#05070d";
      ctx.fillRect(0, groundY, w, h - groundY);

      const charX = w * 0.25 + t * (w * 0.028);
      const stride = Math.sin(t * 5.2);
      const bob = Math.abs(Math.cos(t * 5.2)) * 4;
      const hipY = groundY - h * 0.11 + bob;

      ctx.fillStyle = "rgba(251, 191, 36, 0.12)";
      ctx.beginPath();
      ctx.ellipse(charX, groundY + 8, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#030407";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(charX, hipY);
      ctx.lineTo(charX + stride * 16, groundY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(charX, hipY);
      ctx.lineTo(charX - stride * 16, groundY);
      ctx.stroke();

      ctx.fillStyle = "#030407";
      ctx.fillRect(charX - 9, hipY - h * 0.085, 18, h * 0.09);

      ctx.beginPath();
      ctx.arc(charX + 2, hipY - h * 0.11, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(251, 191, 36, 0.55)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(charX + 2, hipY - h * 0.11, 12, -0.6, 0.8);
      ctx.stroke();

      ctx.strokeStyle = "rgba(186, 230, 253, 0.22)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 65; i++) {
        const rx = ((i * 73 + t * 180) % (w + 60)) - 30;
        const ry = ((i * 137 + t * 620) % h);
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 5, ry + 16);
        ctx.stroke();
      }
    }
  }
];
