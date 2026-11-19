/* ==========================================================================
   LAST SOUL STUDIO — OPTIMIZED CINEMATIC VISUAL & CHARACTER RIG (style-rig.js)
   Features: Clean Smooth-Head Human Silhouette, Expressive Eyes/Eyebrows,
   Balanced Volumetric Lighting, Soft Rim Shading & Full Multi-Character Rig.
   ========================================================================== */

window.SoulRig = {
  /* ------------------------------------------------------------------------
     INTERNAL HELPER: EXPRESSIVE EYES & EYEBROWS
     mood: "sleep" | "groggy" | "focused" | "alert" | "tired"
     ------------------------------------------------------------------------ */
  drawExpression(ctx, opts) {
    const {
      x = 4.2,
      y = -1.2,
      mood = "focused",
      t = 0,
      eyeColor = "#fef3c7",
      gazeX = 1.2,
      gazeY = 0
    } = opts;

    const isBlinking = (t % 3.6) > 3.46;
    ctx.save();
    ctx.translate(x, y);

    let browAngle = 0;
    let browY = -4.2;
    if (mood === "sleep") { browAngle = 0.08; browY = -3.2; }
    else if (mood === "groggy") { browAngle = 0.24; browY = -3.5; }
    else if (mood === "alert") { browAngle = -0.22; browY = -5.0; }
    else if (mood === "tired") { browAngle = 0.28; browY = -3.6; }
    else if (mood === "focused") { browAngle = -0.14; browY = -4.3; }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.42)";
    ctx.lineWidth = 1.3;
    ctx.lineCap = "round";
    ctx.save();
    ctx.translate(0, browY);
    ctx.rotate(browAngle);
    ctx.beginPath();
    ctx.moveTo(-2.5, 0);
    ctx.lineTo(2.6, 0);
    ctx.stroke();
    ctx.restore();

    if (mood === "sleep" || isBlinking) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(0, -0.5, 2.2, 0.15, Math.PI - 0.15);
      ctx.stroke();
    } else {
      const eyeHeight = mood === "groggy" || mood === "tired" ? 1.15 : mood === "alert" ? 2.1 : 1.65;
      ctx.fillStyle = eyeColor;
      ctx.shadowColor = eyeColor;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.ellipse(gazeX * 0.4, gazeY, 2.4, eyeHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  },

  /* ------------------------------------------------------------------------
     INTERNAL HELPER: FLOATING ATMOSPHERIC PARTICLES
     ------------------------------------------------------------------------ */
  drawParticles(ctx, w, h, t, count = 24, color = "rgba(254, 243, 199, 0.25)", speed = 12) {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i++) {
      const px = ((i * 97 + Math.sin(t * 0.6 + i) * 18 + t * speed * 0.4) % w + w) % w;
      const py = ((i * 151 - t * speed + Math.cos(t * 0.8 + i) * 12) % h + h) % h;
      const r = (i % 3 === 0) ? 1.5 : 1.0;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  /* ------------------------------------------------------------------------
     INTERNAL HELPER: STARK DRAMATIC ON-SCREEN PUNCHLINE TEXT (e.g. "OK.")
     ------------------------------------------------------------------------ */
  drawPunchline(ctx, w, h, text, color = "#ef4444", yRatio = 0.17) {
    if (!text) return;
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.font = `800 ${Math.max(22, w * 0.072)}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(text, w * 0.5, h * yRatio);
    ctx.restore();
  },

  /* ------------------------------------------------------------------------
     1. CORE SMOOTH-HEAD HUMAN SILHOUETTE MODEL (Protagonist & NPCs)
     ------------------------------------------------------------------------ */
  drawHuman(ctx, opts) {
    const {
      x,
      groundY,
      scale = 1,
      facing = 1,
      walkPhase = 0,
      isWalking = false,
      rightArm = { upper: 0.12, fore: 0.25 },
      leftArm = { upper: -0.1, fore: 0.2 },
      rimColor = "rgba(253, 224, 171, 0.35)",
      mood = "focused",
      eyeColor = "#fef3c7",
      t = 0,
      lookUp = 0,
      breath = 0,
      holdingBag = false,
      showShadow = true
    } = opts;

    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(facing * scale, scale);

    const hipY = -68 + breath;
    const shoulderY = -104 + breath;
    const neckBaseY = -107 + breath;
    const headCenterY = -121 + breath;
    const thighLen = 32;
    const shinLen = 33;
    const upperArmLen = 24;
    const foreArmLen = 23;

    // Ground Contact Shadow
    if (showShadow) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
      ctx.beginPath();
      ctx.ellipse(0, 2, 18 + (isWalking ? Math.abs(Math.sin(walkPhase)) * 6 : 0), 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const drawLeg = (hipAngle, kneeBend, isFront) => {
      const kx = Math.sin(hipAngle) * thighLen;
      const ky = hipY + Math.cos(hipAngle) * thighLen;
      const ankleAngle = hipAngle - kneeBend;
      const ax = kx + Math.sin(ankleAngle) * shinLen;
      const ay = ky + Math.cos(ankleAngle) * shinLen;

      ctx.strokeStyle = isFront ? "#04060a" : "#090c14";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.lineWidth = 10.2;
      ctx.beginPath();
      ctx.moveTo(0, hipY);
      ctx.lineTo(kx, ky);
      ctx.stroke();

      ctx.lineWidth = 8.0;
      ctx.beginPath();
      ctx.moveTo(kx, ky);
      ctx.lineTo(ax, ay);
      ctx.stroke();

      // Clean Shoe Silhouette
      ctx.fillStyle = isFront ? "#04060a" : "#090c14";
      ctx.beginPath();
      ctx.ellipse(ax + 4, ay + 1, 7.5, 3.2, ankleAngle * 0.25, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawArm = (upperAng, foreAng, isFront) => {
      const sx = isFront ? 1 : -1;
      const sy = shoulderY + 4;
      const ex = sx + Math.sin(upperAng) * upperArmLen;
      const ey = sy + Math.cos(upperAng) * upperArmLen;
      const hx = ex + Math.sin(upperAng + foreAng) * foreArmLen;
      const hy = ey + Math.cos(upperAng + foreAng) * foreArmLen;

      ctx.strokeStyle = isFront ? "#04060a" : "#090c14";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.lineWidth = 8.2;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      ctx.lineWidth = 6.5;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ctx.fillStyle = isFront ? "#04060a" : "#090c14";
      ctx.beginPath();
      ctx.ellipse(hx, hy, 4.0, 3.0, upperAng + foreAng, 0, Math.PI * 2);
      ctx.fill();

      return { hx, hy };
    };

    const stride = isWalking ? Math.sin(walkPhase) : 0;
    const backHipAng = isWalking ? -stride * 0.46 : -0.06;
    const backKnee = isWalking ? Math.max(0, stride) * 0.58 : 0.04;
    const backArmUpper = isWalking ? stride * 0.44 : leftArm.upper;
    const backArmFore = isWalking ? 0.32 : leftArm.fore;

    drawArm(backArmUpper, backArmFore, false);
    drawLeg(backHipAng, backKnee, false);

    // Sculpted Clean Human Torso
    ctx.fillStyle = "#04060a";
    ctx.beginPath();
    ctx.moveTo(-7.5, hipY + 3);
    ctx.quadraticCurveTo(-9.2, (hipY + shoulderY) * 0.5, -8.2, shoulderY + 3);
    ctx.quadraticCurveTo(-5, shoulderY - 2, 0, neckBaseY);
    ctx.quadraticCurveTo(6.5, shoulderY - 1, 8.2, shoulderY + 4);
    ctx.quadraticCurveTo(8.8, (hipY + shoulderY) * 0.5, 6.5, hipY + 3);
    ctx.closePath();
    ctx.fill();

    // Subtle Soft Internal Rim Light on Back Shoulder (Clipped cleanly inside torso)
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = rimColor;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(-8.2, shoulderY + 3);
    ctx.quadraticCurveTo(-5, shoulderY - 2, 0, neckBaseY);
    ctx.stroke();
    ctx.restore();

    // Neck
    ctx.fillStyle = "#04060a";
    ctx.fillRect(-3.0, headCenterY + 7, 6.0, 9);

    // Front Leg
    const frontHipAng = isWalking ? stride * 0.46 : 0.07;
    const frontKnee = isWalking ? Math.max(0, -stride) * 0.58 : 0.04;
    drawLeg(frontHipAng, frontKnee, true);

    // Clean Smooth Circle Head (No Hair) + Clipped Internal Rim Shading + Eyes
    ctx.save();
    ctx.translate(1, headCenterY);
    ctx.rotate(-lookUp);

    ctx.fillStyle = "#04060a";
    ctx.beginPath();
    ctx.arc(0, 0, 10.2, 0, Math.PI * 2);
    ctx.fill();

    // Soft Internal Rim Glow (Clipped strictly inside head circle—no wire outline!)
    ctx.save();
    ctx.clip();
    const headRim = ctx.createRadialGradient(5, -3, 4, 0, 0, 12);
    headRim.addColorStop(0, "rgba(0, 0, 0, 0)");
    headRim.addColorStop(0.78, "rgba(0, 0, 0, 0)");
    headRim.addColorStop(1, rimColor);
    ctx.fillStyle = headRim;
    ctx.fillRect(-12, -12, 24, 24);
    ctx.restore();

    // Expressive Eye & Eyebrow
    this.drawExpression(ctx, {
      x: 4.2,
      y: -1.2,
      mood,
      t,
      eyeColor,
      gazeX: 1.5,
      gazeY: lookUp > 0 ? -0.5 : 0.2
    });

    ctx.restore();

    // Front Arm
    const frontArmUpper = isWalking ? -stride * 0.44 : rightArm.upper;
    const frontArmFore = isWalking ? 0.38 : rightArm.fore;
    const hand = drawArm(frontArmUpper, frontArmFore, true);

    if (holdingBag) {
      ctx.fillStyle = "#d97706";
      ctx.fillRect(hand.hx - 4, hand.hy + 2, 10, 13);
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(hand.hx - 4, hand.hy + 2, 10, 13);
    }

    ctx.restore();
  },

  /* ------------------------------------------------------------------------
     2. REFERENCE-GRADE BEDROOM SET (Symmetrical Lamp Cone, Smooth Head,
        City Skyline Window, Raised-Knee Sleeping Pose & Waking/Phone Modes)
     ------------------------------------------------------------------------ */
  drawBedroomScene(ctx, w, h, t, opts = {}) {
    const {
      mode = "sleep",
      wakeProgress = 0,
      stretch = 0,
      phoneActive = true,
      clockText = "02:00",
      alarmShake = 0,
      showZzz = false,
      punchline = ""
    } = opts;

    const isDawn = mode === "wake" && wakeProgress > 0.35;

    // 1. Nocturne Wall & Wooden Floor Depth
    const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
    wallGrad.addColorStop(0, isDawn ? "#141f38" : "#0b0d13");
    wallGrad.addColorStop(0.68, isDawn ? "#1e2e4d" : "#161922");
    wallGrad.addColorStop(1, "#090b10");
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, w, h);

    const floorY = h * 0.76;
    const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
    floorGrad.addColorStop(0, "#181a22");
    floorGrad.addColorStop(0.2, "#101218");
    floorGrad.addColorStop(1, "#07080c");
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, floorY, w, h - floorY);

    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(0, floorY, w, 2);

    // 2. Centered Window with Crescent Moon, Stars & Distant Skyline
    const winW = w * 0.44;
    const winH = h * 0.31;
    const winX = w * 0.36;
    const winY = h * 0.21;

    const winSky = ctx.createLinearGradient(0, winY, 0, winY + winH);
    if (isDawn) {
      winSky.addColorStop(0, "#1e3a6e");
      winSky.addColorStop(1, "#d97706");
    } else {
      winSky.addColorStop(0, "#090d1c");
      winSky.addColorStop(1, "#1e2246");
    }
    ctx.fillStyle = winSky;
    ctx.fillRect(winX, winY, winW, winH);

    if (!isDawn) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      [[0.22, 0.18], [0.76, 0.42], [0.35, 0.55], [0.84, 0.16]].forEach(([sx, sy]) => {
        ctx.fillRect(winX + winW * sx, winY + winH * sy, 1.8, 1.8);
      });

      const mx = winX + winW * 0.72;
      const my = winY + winH * 0.28;
      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.arc(mx, my, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0e1329";
      ctx.beginPath();
      ctx.arc(mx + 4.5, my - 2.5, 10.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#070912";
    [
      [0.0, 0.22, 0.18],
      [0.16, 0.32, 0.22],
      [0.36, 0.18, 0.24],
      [0.58, 0.38, 0.22],
      [0.78, 0.26, 0.22]
    ].forEach(([bx, bh, bw]) => {
      ctx.fillRect(winX + winW * bx, winY + winH * (1 - bh), winW * bw, winH * bh);
    });
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(winX + winW * 0.66, winY + winH * 0.74, 3.5, 4.5);

    ctx.strokeStyle = "#080a0f";
    ctx.lineWidth = 4.5;
    ctx.strokeRect(winX, winY, winW, winH);
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(winX + winW * 0.5, winY);
    ctx.lineTo(winX + winW * 0.5, winY + winH);
    ctx.moveTo(winX, winY + winH * 0.52);
    ctx.lineTo(winX + winW, winY + winH * 0.52);
    ctx.stroke();

    ctx.fillStyle = "#1f232e";
    ctx.fillRect(winX - 8, winY + winH, winW + 16, 5);

    // 3. Nightstand, Red Clock & Symmetrical Warm Bedside Lamp Light Cone
    const bedY = h * 0.68;
    const standX = w * 0.06;
    const standW = w * 0.18;
    ctx.fillStyle = "#161922";
    ctx.fillRect(standX, bedY - 2, standW, floorY - (bedY - 2));

    ctx.fillStyle = "#2b0909";
    ctx.fillRect(standX + 4 + alarmShake, bedY - 18, standW * 0.52, 16);
    ctx.fillStyle = "#ef4444";
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 8;
    ctx.font = `700 ${Math.max(9, w * 0.022)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(clockText, standX + 4 + standW * 0.26 + alarmShake, bedY - 6);
    ctx.shadowBlur = 0;

    const lampX = standX + standW * 0.72;
    const shadeTopY = bedY - 46;
    const shadeBotY = bedY - 24;

    // Balanced Symmetrical Lamp Cone (Equal spread left and right!)
    const lampIntensity = mode === "phone" && phoneActive ? 0.25 : 0.85;
    const coneSpread = Math.min(w * 0.28, 115);
    const coneHeight = h * 0.22;
    const lampCone = ctx.createRadialGradient(lampX, shadeBotY + 10, 4, lampX, shadeBotY + coneHeight * 0.55, coneSpread * 1.15);
    lampCone.addColorStop(0, `rgba(253, 224, 171, ${0.42 * lampIntensity})`);
    lampCone.addColorStop(0.55, `rgba(245, 158, 11, ${0.14 * lampIntensity})`);
    lampCone.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = lampCone;
    ctx.beginPath();
    ctx.moveTo(lampX - 15, shadeBotY);
    ctx.lineTo(lampX + 15, shadeBotY);
    ctx.lineTo(lampX + coneSpread, shadeBotY + coneHeight);
    ctx.lineTo(lampX - coneSpread, shadeBotY + coneHeight);
    ctx.closePath();
    ctx.fill();

    // Lamp Stem & Base
    ctx.fillStyle = "#090b10";
    ctx.fillRect(lampX - 2, shadeBotY, 4, 22);
    ctx.fillRect(lampX - 9, bedY - 4, 18, 4);

    // Lampshade
    ctx.fillStyle = mode === "phone" && phoneActive ? "#78350f" : "#fde68a";
    ctx.beginPath();
    ctx.moveTo(lampX - 10, shadeTopY);
    ctx.lineTo(lampX + 10, shadeTopY);
    ctx.lineTo(lampX + 16, shadeBotY);
    ctx.lineTo(lampX - 16, shadeBotY);
    ctx.closePath();
    ctx.fill();

    // 4. Bed Frame, Pillow & Folded Foot Blanket
    const bedX = w * 0.26;
    const bedW = w * 0.66;
    ctx.fillStyle = "#181c26";
    ctx.fillRect(bedX, bedY, bedW, 14);
    ctx.fillStyle = "#0b0d13";
    ctx.fillRect(bedX, bedY + 14, bedW, 10);
    ctx.fillRect(bedX + 6, bedY + 24, 6, floorY - (bedY + 24));
    ctx.fillRect(bedX + bedW - 12, bedY + 24, 6, floorY - (bedY + 24));
    ctx.fillRect(bedX - 4, bedY - 22, 6, 46);

    ctx.fillStyle = "#262c3a";
    ctx.beginPath();
    ctx.ellipse(bedX + 24, bedY - 3, 22, 8, 0.32, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#253047";
    ctx.beginPath();
    ctx.roundRect(bedX + bedW - 56, bedY - 8, 56, 22, 6);
    ctx.fill();

    // 5. Character Pose on Bed (Smooth Circle Head, No Wire Halo!)
    const breath = Math.sin(t * 2.1) * 2;
    const effectiveWake = mode === "phone" ? 0.85 : wakeProgress;
    const headBaseX = bedX + 34 + effectiveWake * 12;
    const headBaseY = bedY - 12 - effectiveWake * 34;

    if (effectiveWake < 0.4) {
      const hipX = bedX + bedW * 0.45;
      const hipY = bedY - 3;

      ctx.strokeStyle = "#05070c";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(bedX + bedW * 0.74, bedY - 2);
      ctx.stroke();

      const kneeX = hipX + 26;
      const kneeY = bedY - 26 + breath * 0.4;
      const footX = hipX + 56;
      const footY = bedY - 3;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(footX, footY);
      ctx.stroke();

      // Subtle Rim Light on Top of Raised Knee
      ctx.strokeStyle = "rgba(253, 224, 171, 0.45)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(hipX + 4, hipY - 4);
      ctx.lineTo(kneeX, kneeY - 4);
      ctx.lineTo(footX - 4, footY - 4);
      ctx.stroke();

      // Torso
      ctx.strokeStyle = "#05070c";
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(headBaseX + 12, bedY - 5 + breath * 0.3);
      ctx.lineTo(hipX, hipY);
      ctx.stroke();

      // Bent Arm
      const elbowX = headBaseX + 28;
      const elbowY = bedY - 22 + breath * 0.4;
      ctx.lineWidth = 7.5;
      ctx.beginPath();
      ctx.moveTo(headBaseX + 16, bedY - 6);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(headBaseX + 40, bedY - 5);
      ctx.stroke();

      // Clean Smooth Circle Head (No Hair, Clipped Internal Rim Shading)
      ctx.save();
      ctx.translate(headBaseX, headBaseY);
      ctx.fillStyle = "#05070c";
      ctx.beginPath();
      ctx.arc(0, 0, 11.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.clip();
      const sleepHeadRim = ctx.createRadialGradient(-5, -5, 3, 0, 0, 13);
      sleepHeadRim.addColorStop(0, "rgba(0, 0, 0, 0)");
      sleepHeadRim.addColorStop(0.75, "rgba(0, 0, 0, 0)");
      sleepHeadRim.addColorStop(1, "rgba(253, 224, 171, 0.55)");
      ctx.fillStyle = sleepHeadRim;
      ctx.fillRect(-13, -13, 26, 26);
      ctx.restore();

      this.drawExpression(ctx, {
        x: headBaseX + 2,
        y: headBaseY - 2,
        mood: "sleep",
        t
      });
    } else {
      // Sitting Up in Bed
      const sitHipX = bedX + 46;
      const sitHipY = bedY - 3;
      const sitShoulderX = sitHipX - 4;
      const sitShoulderY = sitHipY - 38;

      ctx.strokeStyle = "#05070c";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(sitHipX, sitHipY);
      ctx.lineTo(sitHipX + 48, bedY - 2);
      ctx.stroke();

      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(sitHipX, sitHipY);
      ctx.lineTo(sitShoulderX, sitShoulderY);
      ctx.stroke();

      // Clean Smooth Circle Head (No Hair, No Wire Outline!)
      const sitHeadX = sitShoulderX + 2;
      const sitHeadY = sitShoulderY - 15;
      const isPhoneGlow = mode === "phone" && phoneActive;

      ctx.save();
      ctx.translate(sitHeadX, sitHeadY);
      ctx.fillStyle = "#05070c";
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.clip();
      const rimGrad = ctx.createRadialGradient(isPhoneGlow ? 6 : -6, -3, 3, 0, 0, 13);
      rimGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      rimGrad.addColorStop(0.75, "rgba(0, 0, 0, 0)");
      rimGrad.addColorStop(1, isPhoneGlow ? "rgba(56, 189, 248, 0.65)" : "rgba(253, 224, 171, 0.55)");
      ctx.fillStyle = rimGrad;
      ctx.fillRect(-13, -13, 26, 26);
      ctx.restore();

      this.drawExpression(ctx, {
        x: sitHeadX + 4.2,
        y: sitHeadY - 1,
        mood: isPhoneGlow ? "tired" : "groggy",
        t,
        eyeColor: isPhoneGlow ? "#7dd3fc" : "#fef3c7"
      });

      if (mode === "wake" && stretch > 0) {
        ctx.strokeStyle = "#05070c";
        ctx.lineWidth = 7;
        [-1, 1].forEach((side) => {
          const sx = sitShoulderX + side * 4;
          const sy = sitShoulderY + 4;
          const ex = sx - stretch * 12 + side * 4;
          const ey = sy - stretch * 24;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.lineTo(ex + stretch * 6, ey - stretch * 20);
          ctx.stroke();
        });
      }

      if (mode === "phone") {
        const phoneX = isPhoneGlow ? sitShoulderX + 34 : sitHipX + 24;
        const phoneY = isPhoneGlow ? sitShoulderY + 4 + Math.sin(t * 6) * 2 : bedY - 4;

        if (isPhoneGlow) {
          const flicker = 0.85 + Math.sin(t * 19) * 0.15;
          const cone = ctx.createRadialGradient(phoneX, phoneY, 3, sitHeadX, sitHeadY, w * 0.28);
          cone.addColorStop(0, `rgba(56, 189, 248, ${0.55 * flicker})`);
          cone.addColorStop(0.5, `rgba(59, 130, 246, ${0.18 * flicker})`);
          cone.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = cone;
          ctx.beginPath();
          ctx.arc(phoneX, phoneY, w * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = "#05070c";
        ctx.lineWidth = 7.5;
        ctx.beginPath();
        ctx.moveTo(sitShoulderX + 2, sitShoulderY + 5);
        ctx.quadraticCurveTo(sitShoulderX + 16, sitShoulderY + 18, phoneX, phoneY);
        ctx.stroke();

        ctx.save();
        ctx.translate(phoneX, phoneY);
        ctx.rotate(isPhoneGlow ? -0.35 : Math.PI / 2);
        ctx.fillStyle = isPhoneGlow ? "#38bdf8" : "#1e293b";
        ctx.fillRect(-3, -11, 6, 22);
        ctx.restore();
      }
    }

    if (showZzz) {
      ctx.fillStyle = "rgba(253, 224, 171, 0.55)";
      ctx.font = "600 13px sans-serif";
      for (let z = 0; z < 3; z++) {
        const cycle = (t * 0.55 + z * 0.33) % 1;
        ctx.globalAlpha = 1 - cycle;
        ctx.fillText("z", headBaseX + 10 + cycle * 22, headBaseY - 14 - cycle * 40);
      }
      ctx.globalAlpha = 1;
    }

    this.drawParticles(ctx, w, h, t, 18, "rgba(253, 224, 171, 0.22)", 8);
    if (punchline) {
      this.drawPunchline(ctx, w, h, punchline);
    }
  },

  /* ------------------------------------------------------------------------
     3. ENVIRONMENT SET: OUTDOOR STREET WALK
     ------------------------------------------------------------------------ */
  drawOutdoorWalk(ctx, w, h, t, opts = {}) {
    const {
      timeOfDay = "morning",
      scrollSpeed = 58,
      mood = "focused",
      punchline = ""
    } = opts;

    const isNight = timeOfDay === "nightRain";
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    if (isNight) {
      sky.addColorStop(0, "#060913");
      sky.addColorStop(0.65, "#11192c");
      sky.addColorStop(1, "#090c14");
    } else {
      sky.addColorStop(0, "#152244");
      sky.addColorStop(0.54, "#853114");
      sky.addColorStop(0.75, "#e08e26");
      sky.addColorStop(1, "#090d16");
    }
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    if (!isNight) {
      ctx.fillStyle = "rgba(254, 240, 138, 0.82)";
      ctx.beginPath();
      ctx.arc(w * 0.74, h * 0.56, w * 0.095, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const lampX = w * 0.72;
      const lampY = h * 0.24;
      const glow = ctx.createRadialGradient(lampX, lampY, 5, lampX, lampY, w * 0.45);
      glow.addColorStop(0, "rgba(251, 191, 36, 0.48)");
      glow.addColorStop(0.4, "rgba(245, 158, 11, 0.14)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
    }

    const groundY = h * 0.76;
    const scroll = t * scrollSpeed;

    ctx.fillStyle = isNight ? "#0d1322" : "#1c2538";
    for (let b = -1; b < 7; b++) {
      const bx = ((b * 120 - scroll * 0.35) % (w + 150) + (w + 150)) % (w + 150) - 80;
      const bh = 95 + ((b * 43) % 75);
      ctx.fillRect(bx, groundY - bh, 88, bh);

      ctx.fillStyle = "rgba(253, 224, 71, 0.16)";
      ctx.fillRect(bx + 16, groundY - bh + 20, 10, 14);
      ctx.fillRect(bx + 52, groundY - bh + 42, 10, 14);
      ctx.fillStyle = isNight ? "#0d1322" : "#1c2538";
    }

    ctx.strokeStyle = "rgba(15, 23, 42, 0.55)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, groundY - h * 0.39);
    ctx.quadraticCurveTo(w * 0.5, groundY - h * 0.35, w, groundY - h * 0.39);
    ctx.stroke();

    for (let tr = 0; tr < 4; tr++) {
      const tx = ((tr * 210 - scroll * 0.85) % (w + 220) + (w + 220)) % (w + 220) - 70;
      ctx.fillStyle = isNight ? "#090d18" : "#111726";
      ctx.fillRect(tx, groundY - h * 0.44, 4, h * 0.44);
      ctx.fillRect(tx - 12, groundY - h * 0.40, 28, 2.5);

      ctx.fillStyle = isNight ? "#080c16" : "#101724";
      ctx.fillRect(tx + 54, groundY - h * 0.24, 8, h * 0.24);
      ctx.beginPath();
      ctx.arc(tx + 58, groundY - h * 0.27, 36, 0, Math.PI * 2);
      ctx.arc(tx + 36, groundY - h * 0.23, 25, 0, Math.PI * 2);
      ctx.arc(tx + 80, groundY - h * 0.23, 25, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#06080f";
    ctx.fillRect(0, groundY, w, h - groundY);
    ctx.fillStyle = "rgba(245, 158, 11, 0.38)";
    ctx.fillRect(0, groundY, w, 2.5);

    ctx.fillStyle = "rgba(251, 191, 36, 0.28)";
    for (let m = 0; m < 8; m++) {
      const mx = ((m * 85 - scroll * 1.45) % (w + 90) + (w + 90)) % (w + 90) - 40;
      ctx.fillRect(mx, groundY + 26, 34, 3.5);
    }

    const walkPhase = t * Math.PI * 2.22;
    const bob = Math.abs(Math.cos(walkPhase)) * 3.2;

    this.drawHuman(ctx, {
      x: w * 0.44,
      groundY: groundY,
      scale: Math.min(w, h) / 460,
      facing: 1,
      isWalking: true,
      walkPhase: walkPhase,
      breath: bob,
      mood,
      t,
      rimColor: isNight ? "rgba(251, 191, 36, 0.42)" : "rgba(253, 224, 71, 0.48)"
    });

    if (isNight) {
      ctx.strokeStyle = "rgba(186, 230, 253, 0.24)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 65; i++) {
        const rx = ((i * 73 + t * 180) % (w + 60)) - 30;
        const ry = ((i * 137 + t * 620) % h);
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 5, ry + 16);
        ctx.stroke();
      }
    } else {
      this.drawParticles(ctx, w, h, t, 20, "rgba(254, 240, 138, 0.24)", 14);
    }

    if (punchline) {
      this.drawPunchline(ctx, w, h, punchline, "#fbbf24");
    }
  },

  /* ------------------------------------------------------------------------
     4. ENVIRONMENT SET: NEIGHBORHOOD LOCAL SHOP (Full Human Shopkeeper Rig!)
     ------------------------------------------------------------------------ */
  drawShopScene(ctx, w, h, localT, opts = {}) {
    const { shopName = "SOUL STORE", punchline = "" } = opts;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#1a3356");
    sky.addColorStop(0.65, "#365f8a");
    sky.addColorStop(1, "#090d16");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const groundY = h * 0.78;
    ctx.fillStyle = "#05070d";
    ctx.fillRect(0, groundY, w, h - groundY);
    ctx.fillStyle = "rgba(251, 191, 36, 0.28)";
    ctx.fillRect(0, groundY, w, 2);

    const shopX = w * 0.45;
    const shopY = h * 0.30;
    const shopW = w * 0.48;
    const shopH = groundY - shopY;

    ctx.fillStyle = "#0d1321";
    ctx.fillRect(shopX, shopY, shopW, shopH);

    // Warm Glowing Shop Interior Window
    const winLeft = shopX + 12;
    const winTop = shopY + 42;
    const winWidth = shopW - 24;
    const winHeight = shopH * 0.56;

    const glow = ctx.createRadialGradient(
      winLeft + winWidth * 0.5, winTop + winHeight * 0.5, 10,
      winLeft + winWidth * 0.5, winTop + winHeight * 0.5, shopW * 0.85
    );
    glow.addColorStop(0, "rgba(251, 191, 36, 0.92)");
    glow.addColorStop(0.6, "rgba(245, 158, 11, 0.38)");
    glow.addColorStop(1, "rgba(11, 16, 27, 0.15)");
    ctx.fillStyle = glow;
    ctx.fillRect(winLeft, winTop, winWidth, winHeight);

    // Product Shelves inside Shop
    ctx.fillStyle = "rgba(10, 14, 24, 0.45)";
    ctx.fillRect(winLeft + 6, winTop + 26, winWidth - 12, 3.5);
    ctx.fillRect(winLeft + 6, winTop + 56, winWidth - 12, 3.5);

    // Full Human Shopkeeper Character inside Shop (Facing Left toward Customer!)
    const charScale = Math.min(w, h) / 440;
    const reach = Math.max(0, Math.min(1, (localT - 2.0) / 1.0));

    ctx.save();
    ctx.beginPath();
    ctx.rect(winLeft, winTop, winWidth, winHeight);
    ctx.clip();

    this.drawHuman(ctx, {
      x: winLeft + winWidth * 0.64,
      groundY: winTop + winHeight + 48 * charScale,
      scale: charScale,
      facing: -1, // Facing left toward customer
      isWalking: false,
      breath: Math.sin(localT * 2.0 + 1) * 1.5,
      mood: "focused",
      t: localT,
      rightArm: {
        upper: 0.15 + reach * 0.65,
        fore: 0.25 + reach * 0.4
      },
      rimColor: "rgba(253, 224, 171, 0.45)",
      showShadow: false
    });
    ctx.restore();

    // Shop Counter Ledge at Bottom of Window
    ctx.fillStyle = "#090d18";
    ctx.fillRect(winLeft - 4, winTop + winHeight - 6, winWidth + 8, 8);

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

    // Signboard
    ctx.fillStyle = "#030407";
    ctx.fillRect(shopX + 12, shopY - 14, shopW - 24, 26);
    ctx.fillStyle = "#fbbf24";
    ctx.font = `700 ${Math.max(10, w * 0.028)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(shopName, shopX + shopW / 2, shopY + 4);

    // Customer Protagonist Walking Up & Receiving Item
    const walkIn = Math.min(1, localT / 1.8);
    const charX = w * (0.18 + walkIn * 0.21);

    this.drawHuman(ctx, {
      x: charX,
      groundY: groundY,
      scale: charScale,
      facing: 1,
      isWalking: walkIn < 1,
      walkPhase: localT * 11,
      breath: Math.sin(localT * 2.2) * 1.8,
      mood: localT >= 4.4 ? "focused" : "alert",
      t: localT,
      rightArm: {
        upper: 0.12 + reach * 0.78,
        fore: 0.25 + reach * 0.45
      },
      rimColor: "rgba(251, 191, 36, 0.45)",
      holdingBag: localT >= 4.4
    });

    this.drawParticles(ctx, w, h, localT, 16, "rgba(251, 191, 36, 0.25)", 10);
    if (punchline) {
      this.drawPunchline(ctx, w, h, punchline, "#fbbf24");
    }
  }
};
