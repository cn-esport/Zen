/* ==========================================================================
   LAST SOUL STUDIO — PERMANENT VISUAL IDENTITY & CHARACTER RIG (style-rig.js)
   Signature Look: 17-18yo Human Silhouette + Moody Nocturne Gouache Lighting
   ========================================================================== */

window.SoulRig = {
  /* ------------------------------------------------------------------------
     1. CORE 17-18YO HUMAN SILHOUETTE MODEL (Standing, Walking, Reaching)
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
      rimColor = "rgba(251, 191, 36, 0.78)",
      lookUp = 0,
      breath = 0,
      holdingBag = false
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
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 18 + (isWalking ? Math.abs(Math.sin(walkPhase)) * 6 : 0), 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    const drawLeg = (hipAngle, kneeBend, isFront) => {
      const kx = Math.sin(hipAngle) * thighLen;
      const ky = hipY + Math.cos(hipAngle) * thighLen;
      const ankleAngle = hipAngle - kneeBend;
      const ax = kx + Math.sin(ankleAngle) * shinLen;
      const ay = ky + Math.cos(ankleAngle) * shinLen;

      ctx.strokeStyle = isFront ? "#030407" : "#070910";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.lineWidth = 10.5;
      ctx.beginPath();
      ctx.moveTo(0, hipY);
      ctx.lineTo(kx, ky);
      ctx.stroke();

      ctx.lineWidth = 8.2;
      ctx.beginPath();
      ctx.moveTo(kx, ky);
      ctx.lineTo(ax, ay);
      ctx.stroke();

      ctx.fillStyle = isFront ? "#030407" : "#070910";
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

      ctx.strokeStyle = isFront ? "#030407" : "#070910";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.lineWidth = 8.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      ctx.lineWidth = 6.8;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ctx.fillStyle = isFront ? "#030407" : "#070910";
      ctx.beginPath();
      ctx.ellipse(hx, hy, 4.2, 3.2, upperAng + foreAng, 0, Math.PI * 2);
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

    // Sculpted Hoodie/Jacket Torso
    ctx.fillStyle = "#030407";
    ctx.beginPath();
    ctx.moveTo(-7.5, hipY + 3);
    ctx.quadraticCurveTo(-9.5, (hipY + shoulderY) * 0.5, -8.5, shoulderY + 3);
    ctx.quadraticCurveTo(-5, shoulderY - 2, 0, neckBaseY);
    ctx.quadraticCurveTo(6.5, shoulderY - 1, 8.5, shoulderY + 4);
    ctx.quadraticCurveTo(9, (hipY + shoulderY) * 0.5, 6.5, hipY + 3);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = rimColor;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-8.5, shoulderY + 3);
    ctx.quadraticCurveTo(-5, shoulderY - 2, 0, neckBaseY);
    ctx.stroke();

    // Neck
    ctx.fillStyle = "#030407";
    ctx.fillRect(-3.2, headCenterY + 7, 6.4, 9);

    // Front Leg
    const frontHipAng = isWalking ? stride * 0.46 : 0.07;
    const frontKnee = isWalking ? Math.max(0, -stride) * 0.58 : 0.04;
    drawLeg(frontHipAng, frontKnee, true);

    // Detailed Head Profile & Layered Hair Silhouette
    ctx.save();
    ctx.translate(1, headCenterY);
    ctx.rotate(-lookUp);

    ctx.fillStyle = "#030407";
    ctx.beginPath();
    ctx.ellipse(0, 0, 9.5, 11, -0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(8, -2);
    ctx.lineTo(10.8, 1.5);
    ctx.lineTo(8.5, 4);
    ctx.lineTo(7.5, 8.5);
    ctx.lineTo(1, 10.5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-9.5, 2);
    ctx.quadraticCurveTo(-11.5, -7, -6, -12.2);
    ctx.quadraticCurveTo(0, -14.5, 7.5, -11);
    ctx.quadraticCurveTo(12, -8, 10.5, -3.5);
    ctx.quadraticCurveTo(5, -6, -2, -5);
    ctx.quadraticCurveTo(-7, -3, -7.5, 4);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = rimColor;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(0, 0, 10.2, -0.85, 0.65);
    ctx.stroke();
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
     2. ENVIRONMENT SET: BEDROOM (Sleeping, Waking Up, or Late-Night Phone)
     ------------------------------------------------------------------------ */
  drawBedroomScene(ctx, w, h, t, opts = {}) {
    const {
      mode = "sleep", // "sleep" | "wake" | "phone"
      wakeProgress = 0, // 0 to 1
      stretch = 0, // 0 to 1
      phoneActive = true,
      clockText = "02:00",
      alarmShake = 0,
      showZzz = false
    } = opts;

    const isDawn = mode === "wake" && wakeProgress > 0.3;

    // Wall Gradient
    const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
    wallGrad.addColorStop(0, isDawn ? "#131e36" : "#070b15");
    wallGrad.addColorStop(0.6, isDawn ? "#1e2d4a" : "#0e172a");
    wallGrad.addColorStop(1, "#05070c");
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.fillRect(0, h * 0.56, w, h * 0.44);

    // Window & Curtains
    const winX = w * 0.11;
    const winY = h * 0.13;
    const winW = w * 0.33;
    const winH = h * 0.27;

    ctx.fillStyle = isDawn ? "#3b5278" : "#162440";
    ctx.fillRect(winX, winY, winW, winH);

    ctx.fillStyle = isDawn ? "rgba(253, 224, 71, 0.85)" : "rgba(186, 230, 253, 0.65)";
    ctx.beginPath();
    ctx.arc(winX + winW * 0.68, winY + winH * (0.36 - wakeProgress * 0.1), 15, 0, Math.PI * 2);
    ctx.fill();

    // Volumetric Window Beam
    const beamGrad = ctx.createLinearGradient(winX, winY, winX + w * 0.55, h * 0.85);
    beamGrad.addColorStop(0, isDawn ? "rgba(251, 191, 36, 0.22)" : "rgba(125, 179, 255, 0.16)");
    beamGrad.addColorStop(1, "rgba(13, 21, 38, 0)");
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(winX, winY + winH);
    ctx.lineTo(winX + winW, winY);
    ctx.lineTo(w * 0.88, h * 0.85);
    ctx.lineTo(w * 0.22, h * 0.85);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#05070c";
    ctx.lineWidth = 4;
    ctx.strokeRect(winX, winY, winW, winH);
    ctx.beginPath();
    ctx.moveTo(winX + winW / 2, winY);
    ctx.lineTo(winX + winW / 2, winY + winH);
    ctx.moveTo(winX, winY + winH / 2);
    ctx.lineTo(winX + winW, winY + winH / 2);
    ctx.stroke();

    // Curtains
    ctx.fillStyle = "#080c17";
    ctx.beginPath();
    ctx.moveTo(winX - 10, winY - 6);
    ctx.lineTo(winX + 16, winY - 6);
    ctx.quadraticCurveTo(winX + 8, winY + winH * 0.5, winX + 18, winY + winH + 18);
    ctx.lineTo(winX - 12, winY + winH + 18);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(winX + winW - 16, winY - 6);
    ctx.lineTo(winX + winW + 10, winY - 6);
    ctx.lineTo(winX + winW + 12, winY + winH + 18);
    ctx.quadraticCurveTo(winX + winW - 8, winY + winH * 0.5, winX + winW - 18, winY + winH + 18);
    ctx.closePath();
    ctx.fill();

    // Floor
    const floorY = h * 0.78;
    ctx.fillStyle = "#04060b";
    ctx.fillRect(0, floorY, w, h - floorY);

    // Nightstand & Digital Clock
    const bedY = h * 0.69;
    ctx.fillStyle = "#080b14";
    ctx.fillRect(w * 0.08, bedY + 8, w * 0.15, floorY - (bedY + 8));

    ctx.fillStyle = "#162033";
    ctx.fillRect(w * 0.105 + alarmShake, bedY - 12, w * 0.1, 20);
    ctx.fillStyle = isDawn ? "#fbbf24" : "#ef4444";
    ctx.font = `700 ${Math.max(10, w * 0.024)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(clockText, w * 0.155 + alarmShake, bedY + 2);

    // Bed Frame & Pillow
    ctx.fillStyle = "#060810";
    ctx.fillRect(w * 0.26, bedY, w * 0.68, floorY - bedY);
    ctx.fillRect(w * 0.89, bedY - h * 0.13, w * 0.05, floorY - (bedY - h * 0.13));
    ctx.fillRect(w * 0.25, bedY - h * 0.05, w * 0.035, floorY - (bedY - h * 0.05));

    ctx.fillStyle = "#182236";
    ctx.beginPath();
    ctx.ellipse(w * 0.81, bedY - 3, w * 0.09, h * 0.025, -0.14, 0, Math.PI * 2);
    ctx.fill();

    // Character Pose on Bed
    const breath = Math.sin(t * 2.1) * 2.5;
    const hipX = w * 0.65;
    const hipY = bedY - 4;
    const effectiveWake = mode === "phone" ? 0.85 : wakeProgress;
    const torsoAngle = -1.45 * (1 - effectiveWake) + (mode === "phone" ? -0.15 : 0.05) * effectiveWake;
    const torsoLen = h * 0.115;
    const shoulderX = hipX + Math.sin(torsoAngle) * torsoLen;
    const shoulderY = hipY - Math.cos(torsoAngle) * torsoLen + breath * (1 - effectiveWake) * 0.5;

    // Phone Blue Light Cone (if using phone in bed)
    if (mode === "phone" && phoneActive) {
      const flicker = 0.85 + Math.sin(t * 19) * 0.15;
      const phoneX = shoulderX - w * 0.13;
      const phoneY = shoulderY + h * 0.02;
      const cone = ctx.createRadialGradient(phoneX, phoneY, 4, phoneX + w * 0.08, phoneY - h * 0.04, w * 0.28);
      cone.addColorStop(0, `rgba(56, 189, 248, ${0.58 * flicker})`);
      cone.addColorStop(0.5, `rgba(59, 130, 246, ${0.18 * flicker})`);
      cone.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = cone;
      ctx.beginPath();
      ctx.arc(phoneX, phoneY, w * 0.32, 0, Math.PI * 2);
      ctx.fill();
    }

    // Blanket with Knee Contour
    ctx.fillStyle = "#111b2e";
    ctx.beginPath();
    ctx.moveTo(w * 0.30 + effectiveWake * 28, bedY + 2);
    ctx.quadraticCurveTo(w * 0.45, bedY - 22, w * 0.54, bedY - 12 + breath * 0.4);
    ctx.quadraticCurveTo(w * 0.61, bedY - 15 + breath, hipX + 6, bedY + 2);
    ctx.lineTo(w * 0.30 + effectiveWake * 28, bedY + 24);
    ctx.closePath();
    ctx.fill();

    // Torso, Neck & Detailed Head
    ctx.save();
    ctx.translate(hipX, hipY);
    ctx.rotate(torsoAngle);
    ctx.fillStyle = "#030407";
    ctx.beginPath();
    ctx.moveTo(-7, 2);
    ctx.quadraticCurveTo(-9, -torsoLen * 0.5, -7.5, -torsoLen);
    ctx.quadraticCurveTo(0, -torsoLen - 4, 7.5, -torsoLen);
    ctx.quadraticCurveTo(9, -torsoLen * 0.5, 6.5, 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(-3, -torsoLen - 8, 6, 9);
    ctx.translate(0, -torsoLen - 16);

    ctx.beginPath();
    ctx.ellipse(0, 0, 9.5, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-9, 3);
    ctx.quadraticCurveTo(-11, -8, -4, -12.5);
    ctx.quadraticCurveTo(3, -14, 9, -9);
    ctx.quadraticCurveTo(11, -4, 8, 2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle =
      mode === "phone" && phoneActive
        ? "rgba(125, 211, 252, 0.85)"
        : isDawn
        ? "rgba(251, 191, 36, 0.8)"
        : "rgba(147, 197, 253, 0.65)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(0, 0, 10.5, Math.PI * 0.85, Math.PI * 1.65);
    ctx.stroke();
    ctx.restore();

    // Floating Zzz's
    if (showZzz) {
      const headWorldX = shoulderX + Math.sin(torsoAngle) * 16;
      const headWorldY = shoulderY - Math.cos(torsoAngle) * 16;
      ctx.fillStyle = "rgba(186, 230, 253, 0.65)";
      ctx.font = "600 13px sans-serif";
      for (let z = 0; z < 3; z++) {
        const cycle = (t * 0.55 + z * 0.33) % 1;
        ctx.globalAlpha = 1 - cycle;
        ctx.fillText("z", headWorldX - 14 - cycle * 24, headWorldY - 14 - cycle * 42);
      }
      ctx.globalAlpha = 1;
    }

    // Morning Stretch Arms
    if (mode === "wake" && stretch > 0) {
      ctx.strokeStyle = "#030407";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      [-1, 1].forEach((side) => {
        const sx = shoulderX + side * 4;
        const sy = shoulderY + 4;
        const ex = sx - stretch * 14 + side * 4;
        const ey = sy - stretch * 24;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.lineTo(ex + stretch * 6, ey - stretch * 22);
        ctx.stroke();
      });
    }

    // Arm Holding Smartphone in Bed
    if (mode === "phone") {
      const phoneX = phoneActive ? shoulderX - w * 0.13 : shoulderX - w * 0.16;
      const phoneY = phoneActive ? shoulderY + h * 0.02 + Math.sin(t * 6) * 2 : bedY - 4;
      ctx.strokeStyle = "#030407";
      ctx.lineWidth = 7.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY + 4);
      ctx.quadraticCurveTo(shoulderX - w * 0.06, shoulderY + h * 0.06, phoneX, phoneY);
      ctx.stroke();

      ctx.save();
      ctx.translate(phoneX, phoneY);
      ctx.rotate(phoneActive ? -0.35 : Math.PI / 2);
      ctx.fillStyle = phoneActive ? "#38bdf8" : "#1e293b";
      ctx.fillRect(-3, -11, 6, 22);
      ctx.restore();
    }
  },

  /* ------------------------------------------------------------------------
     3. ENVIRONMENT SET: OUTDOOR STREET WALK (Dawn, Day, or Rainy Night)
     ------------------------------------------------------------------------ */
  drawOutdoorWalk(ctx, w, h, t, opts = {}) {
    const {
      timeOfDay = "morning", // "morning" | "nightRain"
      scrollSpeed = 58
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

    // Sun or Streetlamp Glow
    if (!isNight) {
      ctx.fillStyle = "rgba(254, 240, 138, 0.82)";
      ctx.beginPath();
      ctx.arc(w * 0.74, h * 0.56, w * 0.095, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const lampX = w * 0.72;
      const lampY = h * 0.24;
      const glow = ctx.createRadialGradient(lampX, lampY, 5, lampX, lampY, w * 0.45);
      glow.addColorStop(0, "rgba(251, 191, 36, 0.45)");
      glow.addColorStop(0.4, "rgba(245, 158, 11, 0.12)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
    }

    const groundY = h * 0.76;
    const scroll = t * scrollSpeed;

    // Distant Misty Buildings
    ctx.fillStyle = isNight ? "#0d1322" : "#1c2538";
    for (let b = -1; b < 7; b++) {
      const bx = ((b * 120 - scroll * 0.35) % (w + 150) + (w + 150)) % (w + 150) - 80;
      const bh = 95 + ((b * 43) % 75);
      ctx.fillRect(bx, groundY - bh, 88, bh);
    }

    // Tall Roadside Trees & Utility Poles
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

    // Sidewalk & Street
    ctx.fillStyle = "#06080f";
    ctx.fillRect(0, groundY, w, h - groundY);
    ctx.fillStyle = "rgba(245, 158, 11, 0.35)";
    ctx.fillRect(0, groundY, w, 2.5);

    ctx.fillStyle = "rgba(251, 191, 36, 0.28)";
    for (let m = 0; m < 8; m++) {
      const mx = ((m * 85 - scroll * 1.45) % (w + 90) + (w + 90)) % (w + 90) - 40;
      ctx.fillRect(mx, groundY + 26, 34, 3.5);
    }

    // Protagonist Walking at Natural Human Scale
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
      rimColor: isNight ? "rgba(251, 191, 36, 0.72)" : "rgba(253, 224, 71, 0.85)"
    });

    // Optional Rain Streaks
    if (isNight) {
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
  },

  /* ------------------------------------------------------------------------
     4. ENVIRONMENT SET: NEIGHBORHOOD LOCAL SHOP
     ------------------------------------------------------------------------ */
  drawShopScene(ctx, w, h, localT, opts = {}) {
    const { shopName = "SOUL STORE" } = opts;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#1a3356");
    sky.addColorStop(0.65, "#365f8a");
    sky.addColorStop(1, "#090d16");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const groundY = h * 0.78;
    ctx.fillStyle = "#05070d";
    ctx.fillRect(0, groundY, w, h - groundY);

    const shopX = w * 0.45;
    const shopY = h * 0.30;
    const shopW = w * 0.48;
    const shopH = groundY - shopY;

    ctx.fillStyle = "#0d1321";
    ctx.fillRect(shopX, shopY, shopW, shopH);

    const glow = ctx.createRadialGradient(
      shopX + shopW * 0.5, shopY + shopH * 0.45, 10,
      shopX + shopW * 0.5, shopY + shopH * 0.5, shopW * 0.85
    );
    glow.addColorStop(0, "rgba(251, 191, 36, 0.88)");
    glow.addColorStop(0.6, "rgba(245, 158, 11, 0.32)");
    glow.addColorStop(1, "rgba(11, 16, 27, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(shopX + 10, shopY + 35, shopW - 20, shopH * 0.58);

    // Shopkeeper Silhouette
    ctx.fillStyle = "#0a0e18";
    ctx.beginPath();
    ctx.arc(shopX + shopW * 0.66, shopY + shopH * 0.48, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(shopX + shopW * 0.59, shopY + shopH * 0.53, 22, 34);

    // Striped Awning
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

    const walkIn = Math.min(1, localT / 1.8);
    const charX = w * (0.18 + walkIn * 0.21);
    const reach = Math.max(0, Math.min(1, (localT - 2.0) / 1.0));

    this.drawHuman(ctx, {
      x: charX,
      groundY: groundY,
      scale: Math.min(w, h) / 440,
      facing: 1,
      isWalking: walkIn < 1,
      walkPhase: localT * 11,
      breath: Math.sin(localT * 2.2) * 1.8,
      rightArm: {
        upper: 0.12 + reach * 0.78,
        fore: 0.25 + reach * 0.45
      },
      rimColor: "rgba(251, 191, 36, 0.9)",
      holdingBag: localT >= 4.4
    });
  }
};
