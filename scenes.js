/* ==========================================================================
   LAST SOUL STUDIO — SIGNATURE CHARACTER RIG & EPISODES LIBRARY
   Shared Protagonist Model (17-18yo Human Silhouette) + Nocturne Gouache Rig
   ========================================================================== */

const SoulRig = {
  // Draws the consistent 17-18yo protagonist in standing, walking, or reaching poses
  drawHuman(ctx, opts) {
    const {
      x,
      groundY,
      scale = 1,
      facing = 1, // 1 = right, -1 = left
      walkPhase = 0, // 0 = standing still
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

    // Human proportions (Total height ~132px at scale 1.0)
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

    // Helper for tapered organic limb + shoe/hand
    const drawLeg = (hipAngle, kneeBend, isFront) => {
      const kx = Math.sin(hipAngle) * thighLen;
      const ky = hipY + Math.cos(hipAngle) * thighLen;
      const ankleAngle = hipAngle - kneeBend;
      const ax = kx + Math.sin(ankleAngle) * shinLen;
      const ay = ky + Math.cos(ankleAngle) * shinLen;

      ctx.strokeStyle = isFront ? "#030407" : "#070910";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Thigh
      ctx.lineWidth = 10.5;
      ctx.beginPath();
      ctx.moveTo(0, hipY);
      ctx.lineTo(kx, ky);
      ctx.stroke();

      // Shin
      ctx.lineWidth = 8.2;
      ctx.beginPath();
      ctx.moveTo(kx, ky);
      ctx.lineTo(ax, ay);
      ctx.stroke();

      // Shoe silhouette
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

      // Upper sleeve
      ctx.lineWidth = 8.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      // Forearm
      ctx.lineWidth = 6.8;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      // Hand silhouette
      ctx.fillStyle = isFront ? "#030407" : "#070910";
      ctx.beginPath();
      ctx.ellipse(hx, hy, 4.2, 3.2, upperAng + foreAng, 0, Math.PI * 2);
      ctx.fill();

      return { hx, hy };
    };

    // 1. Back Arm & Back Leg
    const stride = isWalking ? Math.sin(walkPhase) : 0;
    const backHipAng = isWalking ? -stride * 0.46 : -0.06;
    const backKnee = isWalking ? Math.max(0, stride) * 0.58 : 0.04;
    const backArmUpper = isWalking ? stride * 0.44 : leftArm.upper;
    const backArmFore = isWalking ? 0.32 : leftArm.fore;

    drawArm(backArmUpper, backArmFore, false);
    drawLeg(backHipAng, backKnee, false);

    // 2. Sculpted Human Torso (Hoodie/Jacket Silhouette with curved back & chest)
    ctx.fillStyle = "#030407";
    ctx.beginPath();
    ctx.moveTo(-7.5, hipY + 3);
    ctx.quadraticCurveTo(-9.5, (hipY + shoulderY) * 0.5, -8.5, shoulderY + 3);
    ctx.quadraticCurveTo(-5, shoulderY - 2, 0, neckBaseY);
    ctx.quadraticCurveTo(6.5, shoulderY - 1, 8.5, shoulderY + 4);
    ctx.quadraticCurveTo(9, (hipY + shoulderY) * 0.5, 6.5, hipY + 3);
    ctx.closePath();
    ctx.fill();

    // Subtle Rim Highlight along Back/Shoulder
    ctx.strokeStyle = rimColor;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-8.5, shoulderY + 3);
    ctx.quadraticCurveTo(-5, shoulderY - 2, 0, neckBaseY);
    ctx.stroke();

    // 3. Visible Neck
    ctx.fillStyle = "#030407";
    ctx.fillRect(-3.2, headCenterY + 7, 6.4, 9);

    // 4. Front Leg
    const frontHipAng = isWalking ? stride * 0.46 : 0.07;
    const frontKnee = isWalking ? Math.max(0, -stride) * 0.58 : 0.04;
    drawLeg(frontHipAng, frontKnee, true);

    // 5. Detailed Head Profile + Styled Hair Silhouette
    ctx.save();
    ctx.translate(1, headCenterY);
    ctx.rotate(-lookUp);

    // Cranium & Jawline
    ctx.fillStyle = "#030407";
    ctx.beginPath();
    ctx.ellipse(0, 0, 9.5, 11, -0.08, 0, Math.PI * 2);
    ctx.fill();

    // Nose & Chin contour
    ctx.beginPath();
    ctx.moveTo(8, -2);
    ctx.lineTo(10.8, 1.5);
    ctx.lineTo(8.5, 4);
    ctx.lineTo(7.5, 8.5);
    ctx.lineTo(1, 10.5);
    ctx.closePath();
    ctx.fill();

    // Layered Hair Silhouette (Natural 17-18yo textured hair)
    ctx.beginPath();
    ctx.moveTo(-9.5, 2);
    ctx.quadraticCurveTo(-11.5, -7, -6, -12.2);
    ctx.quadraticCurveTo(0, -14.5, 7.5, -11);
    ctx.quadraticCurveTo(12, -8, 10.5, -3.5);
    ctx.quadraticCurveTo(5, -6, -2, -5);
    ctx.quadraticCurveTo(-7, -3, -7.5, 4);
    ctx.closePath();
    ctx.fill();

    // Rim Light on Face/Hair Edge
    ctx.strokeStyle = rimColor;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(0, 0, 10.2, -0.85, 0.65);
    ctx.stroke();

    ctx.restore();

    // 6. Front Arm
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
  }
};

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
        subtitle: "Scene 1: Deep sleep cycle—chest breathing, moonlight beam, and floating Zzz's."
      },
      {
        start: 8.0,
        label: "SCENE 02 · WAKING UP",
        lens: "MEDIUM · DOLLY IN",
        camera: { x: 0.06, y: 0.04, zoom: 1.35, tilt: -0.4 },
        subtitle: "Scene 2: Waking up—sitting upright and full overhead arm stretch."
      },
      {
        start: 16.0,
        label: "SCENE 03 · OUTDOOR WALK",
        lens: "TRACKING · 35MM",
        camera: { x: 0.0, y: 0.03, zoom: 1.22, tilt: 0 },
        subtitle: "Scene 3: Outdoor morning walk—natural human scale, trees, and knee-bend stride."
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
      /* ====================================================================
         PART A (0s - 16s): PAINTERLY NOCTURNE BEDROOM (SLEEPING -> WAKING)
         ==================================================================== */
      if (t < 16.0) {
        const wakeProgress = Math.max(0, Math.min(1, (t - 7.5) / 2.2));

        // Rich Nocturne Gouache Wall Gradient
        const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
        wallGrad.addColorStop(0, wakeProgress > 0.3 ? "#131e36" : "#070b15");
        wallGrad.addColorStop(0.6, wakeProgress > 0.3 ? "#1e2d4a" : "#0e172a");
        wallGrad.addColorStop(1, "#05070c");
        ctx.fillStyle = wallGrad;
        ctx.fillRect(0, 0, w, h);

        // Subtle Wall Wainscoting / Baseboard Line for Depth
        ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
        ctx.fillRect(0, h * 0.56, w, h * 0.44);

        // Bedroom Window with Curtain Drapes
        const winX = w * 0.11;
        const winY = h * 0.13;
        const winW = w * 0.33;
        const winH = h * 0.27;

        // Window Sky Pane
        ctx.fillStyle = wakeProgress > 0.3 ? "#3b5278" : "#162440";
        ctx.fillRect(winX, winY, winW, winH);

        // Crescent Moon / Morning Sun Orb
        ctx.fillStyle = wakeProgress > 0.3 ? "rgba(253, 224, 71, 0.85)" : "rgba(186, 230, 253, 0.65)";
        ctx.beginPath();
        ctx.arc(winX + winW * 0.68, winY + winH * (0.36 - wakeProgress * 0.1), 15, 0, Math.PI * 2);
        ctx.fill();

        // Diagonal Volumetric Moonlight / Sunlight Beam across Bedroom
        const beamGrad = ctx.createLinearGradient(winX, winY, winX + w * 0.55, h * 0.85);
        beamGrad.addColorStop(0, wakeProgress > 0.3 ? "rgba(251, 191, 36, 0.22)" : "rgba(125, 179, 255, 0.16)");
        beamGrad.addColorStop(1, "rgba(13, 21, 38, 0)");
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(winX, winY + winH);
        ctx.lineTo(winX + winW, winY);
        ctx.lineTo(w * 0.88, h * 0.85);
        ctx.lineTo(w * 0.22, h * 0.85);
        ctx.closePath();
        ctx.fill();

        // Window Mullions & Curtain Silhouettes
        ctx.strokeStyle = "#05070c";
        ctx.lineWidth = 4;
        ctx.strokeRect(winX, winY, winW, winH);
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.moveTo(winX, winY + winH / 2);
        ctx.lineTo(winX + winW, winY + winH / 2);
        ctx.stroke();

        // Soft Hanging Curtains on Both Sides of Window
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

        // Bedroom Floor
        const floorY = h * 0.78;
        ctx.fillStyle = "#04060b";
        ctx.fillRect(0, floorY, w, h - floorY);

        // Nightstand & Alarm Clock (Left of Bed)
        const bedY = h * 0.69;
        ctx.fillStyle = "#080b14";
        ctx.fillRect(w * 0.08, bedY + 8, w * 0.15, floorY - (bedY + 8));

        const alarmShake = t >= 6.8 && t <= 9.2 ? Math.sin(t * 55) * 2.5 : 0;
        ctx.fillStyle = "#162033";
        ctx.fillRect(w * 0.105 + alarmShake, bedY - 12, w * 0.1, 20);
        ctx.fillStyle = t >= 6.8 ? "#fbbf24" : "#ef4444";
        ctx.font = `700 ${Math.max(10, w * 0.024)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText("06:30", w * 0.155 + alarmShake, bedY + 2);

        // Detailed Wooden Bed Frame (Headboard on Right, Footboard on Left)
        ctx.fillStyle = "#060810";
        ctx.fillRect(w * 0.26, bedY, w * 0.68, floorY - bedY); // Bed base
        ctx.fillRect(w * 0.89, bedY - h * 0.13, w * 0.05, floorY - (bedY - h * 0.13)); // Headboard
        ctx.fillRect(w * 0.25, bedY - h * 0.05, w * 0.035, floorY - (bedY - h * 0.05)); // Footboard

        // Soft Pillow on Right
        ctx.fillStyle = "#182236";
        ctx.beginPath();
        ctx.ellipse(w * 0.81, bedY - 3, w * 0.09, h * 0.025, -0.14, 0, Math.PI * 2);
        ctx.fill();

        // Natural Human Character Sleeping -> Sitting Up -> Stretching
        const breath = Math.sin(t * 2.1) * 2.5;
        const hipX = w * 0.65;
        const hipY = bedY - 4;

        // Torso angle: -1.45 rad (lying flat on back) -> 0.05 rad (sitting upright)
        const torsoAngle = -1.45 * (1 - wakeProgress) + 0.05 * wakeProgress;
        const torsoLen = h * 0.115;
        const shoulderX = hipX + Math.sin(torsoAngle) * torsoLen;
        const shoulderY = hipY - Math.cos(torsoAngle) * torsoLen + breath * (1 - wakeProgress) * 0.5;

        // Sculpted Blanket with Natural Knee Bump Silhouette
        ctx.fillStyle = "#111b2e";
        ctx.beginPath();
        ctx.moveTo(w * 0.30 + wakeProgress * 28, bedY + 2);
        // Knee contour bump under blanket
        ctx.quadraticCurveTo(w * 0.45, bedY - 22, w * 0.54, bedY - 12 + breath * 0.4);
        ctx.quadraticCurveTo(w * 0.61, bedY - 15 + breath, hipX + 6, bedY + 2);
        ctx.lineTo(w * 0.30 + wakeProgress * 28, bedY + 24);
        ctx.closePath();
        ctx.fill();

        // Rim highlight on top fold of blanket
        ctx.strokeStyle = wakeProgress > 0.3 ? "rgba(251, 191, 36, 0.28)" : "rgba(147, 197, 253, 0.22)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(w * 0.30 + wakeProgress * 28, bedY + 2);
        ctx.quadraticCurveTo(w * 0.45, bedY - 22, w * 0.54, bedY - 12 + breath * 0.4);
        ctx.quadraticCurveTo(w * 0.61, bedY - 15 + breath, hipX + 6, bedY + 2);
        ctx.stroke();

        // Natural Curved Human Torso (Hoodie/T-shirt silhouette)
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

        // Visible Neck
        ctx.fillRect(-3, -torsoLen - 8, 6, 9);

        // Head & Styled Hair Silhouette resting on Pillow / Sitting Up
        ctx.translate(0, -torsoLen - 16);
        ctx.fillStyle = "#030407";
        ctx.beginPath();
        ctx.ellipse(0, 0, 9.5, 11, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hair Tuft Silhouette
        ctx.beginPath();
        ctx.moveTo(-9, 3);
        ctx.quadraticCurveTo(-11, -8, -4, -12.5);
        ctx.quadraticCurveTo(3, -14, 9, -9);
        ctx.quadraticCurveTo(11, -4, 8, 2);
        ctx.closePath();
        ctx.fill();

        // Rim Light on Head & Hair
        ctx.strokeStyle = wakeProgress > 0.3 ? "rgba(251, 191, 36, 0.8)" : "rgba(147, 197, 253, 0.65)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(0, 0, 10.5, Math.PI * 0.85, Math.PI * 1.65);
        ctx.stroke();
        ctx.restore();

        // Floating "Zzz" Particles while sleeping (0s - 6.8s)
        const headWorldX = shoulderX + Math.sin(torsoAngle) * 16;
        const headWorldY = shoulderY - Math.cos(torsoAngle) * 16;

        if (t < 6.8) {
          ctx.fillStyle = "rgba(186, 230, 253, 0.65)";
          ctx.font = "600 13px sans-serif";
          for (let z = 0; z < 3; z++) {
            const cycle = (t * 0.55 + z * 0.33) % 1;
            const zx = headWorldX - 14 - cycle * 24;
            const zy = headWorldY - 14 - cycle * 42;
            ctx.globalAlpha = 1 - cycle;
            ctx.fillText("z", zx, zy);
          }
          ctx.globalAlpha = 1;
        }

        // Morning Stretch Arms when Sitting Up (9.5s - 14.5s)
        if (t >= 9.5) {
          const stretch = Math.sin(Math.min(1, (t - 9.5) / 2.2) * Math.PI);
          ctx.strokeStyle = "#030407";
          ctx.lineWidth = 7;
          ctx.lineCap = "round";

          // Left & Right arms raising overhead smoothly
          [-1, 1].forEach((side) => {
            const sx = shoulderX + side * 4;
            const sy = shoulderY + 4;
            const ex = sx - stretch * 14 + side * 4;
            const ey = sy - stretch * 24;
            const hx = ex + stretch * 6;
            const hy = ey - stretch * 22;

            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            ctx.lineTo(hx, hy);
            ctx.stroke();
          });
        }
      }

      /* ====================================================================
         PART B (16s - 24s): OUTDOOR MORNING STREET WALK (PROPER HUMAN SCALE)
         ==================================================================== */
      else if (t < 24.0) {
        const localT = t - 16.0;

        // Golden-Hour Morning Sky
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, "#152244");
        sky.addColorStop(0.54, "#853114");
        sky.addColorStop(0.75, "#e08e26");
        sky.addColorStop(1, "#090d16");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        // Soft Morning Sun
        ctx.fillStyle = "rgba(254, 240, 138, 0.82)";
        ctx.beginPath();
        ctx.arc(w * 0.74, h * 0.56, w * 0.095, 0, Math.PI * 2);
        ctx.fill();

        const groundY = h * 0.76;
        const scroll = localT * 58;

        // Layer 1 (Far Background): Misty Distant Buildings (Soft Slate Tone so Character Pops!)
        ctx.fillStyle = "#1c2538";
        for (let b = -1; b < 7; b++) {
          const bx = ((b * 120 - scroll * 0.35) % (w + 150) + (w + 150)) % (w + 150) - 80;
          const bh = 95 + ((b * 43) % 75);
          ctx.fillRect(bx, groundY - bh, 88, bh);

          // Faint lit apartment windows
          ctx.fillStyle = "rgba(253, 224, 71, 0.16)";
          ctx.fillRect(bx + 16, groundY - bh + 18, 12, 16);
          ctx.fillRect(bx + 52, groundY - bh + 38, 12, 16);
          ctx.fillStyle = "#1c2538";
        }

        // Layer 2 (Midground): Tall Roadside Trees & Utility Poles (Properly Tall Above Human!)
        for (let tr = 0; tr < 4; tr++) {
          const tx = ((tr * 210 - scroll * 0.85) % (w + 220) + (w + 220)) % (w + 220) - 70;

          // Tall Utility Pole
          ctx.fillStyle = "#111726";
          ctx.fillRect(tx, groundY - h * 0.44, 4, h * 0.44);
          ctx.fillRect(tx - 12, groundY - h * 0.40, 28, 2.5);

          // Tall Lush Tree (Trunk + Canopy high above human head)
          ctx.fillStyle = "#101724";
          ctx.fillRect(tx + 54, groundY - h * 0.24, 8, h * 0.24);
          ctx.beginPath();
          ctx.arc(tx + 58, groundY - h * 0.27, 36, 0, Math.PI * 2);
          ctx.arc(tx + 36, groundY - h * 0.23, 25, 0, Math.PI * 2);
          ctx.arc(tx + 80, groundY - h * 0.23, 25, 0, Math.PI * 2);
          ctx.fill();
        }

        // Sidewalk & Road
        ctx.fillStyle = "#06080f";
        ctx.fillRect(0, groundY, w, h - groundY);

        // Warm Curb Edge Highlight
        ctx.fillStyle = "rgba(245, 158, 11, 0.35)";
        ctx.fillRect(0, groundY, w, 2.5);

        // Dashed Street Lines
        ctx.fillStyle = "rgba(251, 191, 36, 0.28)";
        for (let m = 0; m < 8; m++) {
          const mx = ((m * 85 - scroll * 1.45) % (w + 90) + (w + 90)) % (w + 90) - 40;
          ctx.fillRect(mx, groundY + 26, 34, 3.5);
        }

        // Foreground Protagonist (Natural Human Height ~0.78 scale so trees & buildings tower above)
        const walkPhase = localT * Math.PI * 2.22;
        const bob = Math.abs(Math.cos(walkPhase)) * 3.2;

        SoulRig.drawHuman(ctx, {
          x: w * 0.44,
          groundY: groundY,
          scale: Math.min(w, h) / 460,
          facing: 1,
          isWalking: true,
          walkPhase: walkPhase,
          breath: bob,
          rimColor: "rgba(253, 224, 71, 0.85)"
        });
      }

      /* ====================================================================
         PART C (24s - 32s): ARRIVING AT NEIGHBORHOOD LOCAL SHOP
         ==================================================================== */
      else {
        const localT = t - 24.0;

        // Morning Daylight Sky
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, "#1a3356");
        sky.addColorStop(0.65, "#365f8a");
        sky.addColorStop(1, "#090d16");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        const groundY = h * 0.78;
        ctx.fillStyle = "#05070d";
        ctx.fillRect(0, groundY, w, h - groundY);

        // Local Shop Building Structure (Right Side)
        const shopX = w * 0.45;
        const shopY = h * 0.30;
        const shopW = w * 0.48;
        const shopH = groundY - shopY;

        ctx.fillStyle = "#0d1321";
        ctx.fillRect(shopX, shopY, shopW, shopH);

        // Warm Glowing Shop Counter Window
        const glow = ctx.createRadialGradient(
          shopX + shopW * 0.5, shopY + shopH * 0.45, 10,
          shopX + shopW * 0.5, shopY + shopH * 0.5, shopW * 0.85
        );
        glow.addColorStop(0, "rgba(251, 191, 36, 0.88)");
        glow.addColorStop(0.6, "rgba(245, 158, 11, 0.32)");
        glow.addColorStop(1, "rgba(11, 16, 27, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(shopX + 10, shopY + 35, shopW - 20, shopH * 0.58);

        // Shopkeeper Silhouette behind Counter
        ctx.fillStyle = "#0a0e18";
        ctx.beginPath();
        ctx.arc(shopX + shopW * 0.66, shopY + shopH * 0.48, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(shopX + shopW * 0.59, shopY + shopH * 0.53, 22, 34);

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

        // Shop Signboard ("SOUL STORE")
        ctx.fillStyle = "#030407";
        ctx.fillRect(shopX + 12, shopY - 14, shopW - 24, 26);
        ctx.fillStyle = "#fbbf24";
        ctx.font = `700 ${Math.max(10, w * 0.028)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("SOUL STORE", shopX + shopW / 2, shopY + 4);

        // Protagonist Walking Up & Reaching Hand to Counter
        const walkIn = Math.min(1, localT / 1.8);
        const charX = w * (0.18 + walkIn * 0.21);
        const reach = Math.max(0, Math.min(1, (localT - 2.0) / 1.0));

        SoulRig.drawHuman(ctx, {
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

      ctx.fillStyle = "#111726";
      ctx.fillRect(lampX - 3, lampY, 6, h * 0.56);

      const groundY = h * 0.78;
      ctx.fillStyle = "#05070d";
      ctx.fillRect(0, groundY, w, h - groundY);

      const walkPhase = t * 5.2;
      const bob = Math.abs(Math.cos(walkPhase)) * 3;

      SoulRig.drawHuman(ctx, {
        x: w * 0.25 + t * (w * 0.028),
        groundY: groundY,
        scale: Math.min(w, h) / 450,
        facing: 1,
        isWalking: true,
        walkPhase: walkPhase,
        breath: bob,
        rimColor: "rgba(251, 191, 36, 0.75)"
      });

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
