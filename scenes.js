/* ==========================================================================
   LAST SOUL STUDIO — EPISODES & SCRIPT DIRECTION (scenes.js)
   All character shapes, eyes, rooms, and lighting live in `style-rig.js`.
   ========================================================================== */

window.LAST_SOUL_SCENES = [
  /* ------------------------------------------------------------------------
     EPISODE 00: 2049 MORNING PROTOCOL (36 Seconds · Futuristic Routine Test)
     Room Waking Up -> Futuristic Street Walk -> Cyber Shop -> Gym & Hydration
     ------------------------------------------------------------------------ */
  {
    id: "futuristic-routine-00",
    title: "00 · 2049 Morning Protocol (Futuristic Test)",
    duration: 36.0,
    ambience: "night",
    beats: [
      {
        start: 0.0,
        label: "SCENE 01 · WAKE UP",
        lens: "WIDE · 24MM",
        camera: { x: 0, y: 0, zoom: 1.0, tilt: 0 },
        subtitle: "06:00 AM. While the city still sleeps, your daily discipline begins."
      },
      {
        start: 8.0,
        label: "SCENE 02 · CYBER WALK",
        lens: "TRACKING · 35MM",
        camera: { x: 0.0, y: 0.03, zoom: 1.22, tilt: 0 },
        subtitle: "No shortcuts. Every step through the quiet streets builds momentum."
      },
      {
        start: 16.0,
        label: "SCENE 03 · NEO MART",
        lens: "WIDE · ESTABLISHING",
        camera: { x: 0.05, y: 0.01, zoom: 1.12, tilt: 0 },
        subtitle: "Fuel the machine. Pick up clean hydration before the heavy work starts."
      },
      {
        start: 24.0,
        label: "SCENE 04 · GYM & WATER",
        lens: "MEDIUM · DOLLY IN",
        camera: { x: 0.02, y: 0.03, zoom: 1.32, tilt: -0.5 },
        subtitle: "Train the body. Hydrate the mind. Own the future."
      }
    ],
    sounds: [
      { at: 0.8, type: "tick" },
      { at: 1.8, type: "tick" },
      { at: 2.6, type: "chime" },
      { at: 4.0, type: "buzz" },
      { at: 8.6, type: "footstep" },
      { at: 9.5, type: "footstep" },
      { at: 10.4, type: "footstep" },
      { at: 11.3, type: "footstep" },
      { at: 12.2, type: "footstep" },
      { at: 13.1, type: "footstep" },
      { at: 14.0, type: "footstep" },
      { at: 14.9, type: "footstep" },
      { at: 16.5, type: "chime" },
      { at: 20.4, type: "buzz" },
      { at: 25.0, type: "heartbeat" },
      { at: 27.5, type: "heartbeat" },
      { at: 30.5, type: "chime" }
    ],
    render(ctx, w, h, t) {
      /* ------------------------------------------------------------------
         SCENE 01 (0s - 8s): FUTURISTIC BEDROOM WAKING UP & STRETCHING
         ------------------------------------------------------------------ */
      if (t < 8.0) {
        const wakeProgress = Math.max(0, Math.min(1, (t - 2.0) / 1.8));
        const stretch = t >= 4.2 ? Math.sin(Math.min(1, (t - 4.2) / 2.2) * Math.PI) : 0;

        SoulRig.drawBedroomScene(ctx, w, h, t, {
          mode: t < 2.0 ? "sleep" : "wake",
          wakeProgress,
          stretch,
          clockText: "06:00",
          alarmShake: t >= 2.5 && t <= 4.0 ? Math.sin(t * 55) * 2.5 : 0,
          showZzz: t < 2.0,
          punchline: t >= 5.2 ? "2049." : ""
        });
      }

      /* ------------------------------------------------------------------
         SCENE 02 (8s - 16s): WALKING TO SHOP (FUTURISTIC DAWN STREET)
         ------------------------------------------------------------------ */
      else if (t < 16.0) {
        const localT = t - 8.0;
        SoulRig.drawOutdoorWalk(ctx, w, h, localT, {
          timeOfDay: "morning",
          scrollSpeed: 64,
          mood: "focused"
        });

        // Futuristic Neon Curb Strip & Holographic Sky Beacon Accent
        const groundY = h * 0.76;
        ctx.fillStyle = "rgba(56, 189, 248, 0.55)";
        ctx.fillRect(0, groundY + 1, w, 2);
      }

      /* ------------------------------------------------------------------
         SCENE 03 (16s - 24s): FUTURISTIC SUPPLY SHOP ("NEO MART")
         ------------------------------------------------------------------ */
      else if (t < 24.0) {
        const localT = t - 16.0;
        SoulRig.drawShopScene(ctx, w, h, localT, {
          shopName: "NEO MART"
        });
      }

      /* ------------------------------------------------------------------
         SCENE 04 (24s - 36s): FUTURISTIC GYM WORKOUT & DRINKING WATER
         ------------------------------------------------------------------ */
      else {
        const localT = t - 24.0;
        const isDrinking = localT >= 6.0; // 24s-30s: Dumbbell curls | 30s-36s: Drinking water

        // 1. Dark Cyber-Gym Interior Backdrop
        const gymBg = ctx.createLinearGradient(0, 0, 0, h);
        gymBg.addColorStop(0, "#050811");
        gymBg.addColorStop(0.62, "#0c1526");
        gymBg.addColorStop(1, "#04060b");
        ctx.fillStyle = gymBg;
        ctx.fillRect(0, 0, w, h);

        // Overhead Futuristic Cyan Light Strips
        const ceilGlow = ctx.createRadialGradient(w * 0.5, h * 0.14, 10, w * 0.5, h * 0.45, w * 0.52);
        ceilGlow.addColorStop(0, "rgba(56, 189, 248, 0.34)");
        ceilGlow.addColorStop(0.55, "rgba(14, 165, 233, 0.09)");
        ceilGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = ceilGlow;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = "#7dd3fc";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 12;
        ctx.fillRect(w * 0.22, h * 0.14, w * 0.56, 3);
        ctx.shadowBlur = 0;

        // Panoramic Cyber-Gym Window showing Futuristic Skyline
        const winX = w * 0.14;
        const winY = h * 0.22;
        const winW = w * 0.72;
        const winH = h * 0.32;
        ctx.fillStyle = "#081020";
        ctx.fillRect(winX, winY, winW, winH);

        // Futuristic Neon Towers outside Gym Window
        ctx.fillStyle = "#04070e";
        [
          [0.05, 0.55, 0.14],
          [0.22, 0.78, 0.16],
          [0.44, 0.45, 0.18],
          [0.66, 0.85, 0.15],
          [0.84, 0.60, 0.12]
        ].forEach(([bx, bh, bw]) => {
          const rx = winX + winW * bx;
          const ry = winY + winH * (1 - bh);
          const rw = winW * bw;
          const rh = winH * bh;
          ctx.fillRect(rx, ry, rw, rh);
          ctx.fillStyle = "rgba(56, 189, 248, 0.45)";
          ctx.fillRect(rx + rw * 0.45, ry + 6, 2, rh - 12);
          ctx.fillStyle = "#04070e";
        });

        ctx.strokeStyle = "#162238";
        ctx.lineWidth = 3;
        ctx.strokeRect(winX, winY, winW, winH);

        // Gym Floor & Glowing Cyan Energy Track
        const groundY = h * 0.78;
        ctx.fillStyle = "#04060b";
        ctx.fillRect(0, groundY, w, h - groundY);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(0, groundY, w, 2);

        // Futuristic Dumbbell Rack Silhouette (Left Side)
        ctx.fillStyle = "#090e1a";
        ctx.fillRect(w * 0.12, groundY - 48, 36, 48);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(w * 0.10, groundY - 50, 40, 3);
        ctx.fillRect(w * 0.10, groundY - 28, 40, 3);

        // Holographic Hydration Station (Right Side)
        ctx.fillStyle = "#090e1a";
        ctx.fillRect(w * 0.76, groundY - 68, 28, 68);
        ctx.fillStyle = "rgba(56, 189, 248, 0.65)";
        ctx.fillRect(w * 0.79, groundY - 58, 16, 22);

        // Character Animation: Bicep Curls (0-6s) -> Drinking Water (6-12s)
        const charX = w * 0.48;
        const charScale = Math.min(w, h) / 420;
        const curlWave = (Math.sin(localT * 3.4) + 1) * 0.5; // 0 to 1 smooth curl
        const drinkProgress = isDrinking ? Math.min(1, (localT - 6.0) / 1.2) : 0;

        const rightArmPose = isDrinking
          ? { upper: 0.55 * drinkProgress, fore: 1.85 * drinkProgress }
          : { upper: 0.15, fore: 0.35 + curlWave * 1.45 };

        SoulRig.drawHuman(ctx, {
          x: charX,
          groundY: groundY,
          scale: charScale,
          facing: 1,
          isWalking: false,
          breath: Math.sin(localT * 3.0) * 2.0,
          mood: isDrinking ? "alert" : "focused",
          eyeColor: "#7dd3fc",
          t: localT,
          lookUp: drinkProgress * 0.32, // Tilts head back slightly while drinking!
          rightArm: rightArmPose,
          leftArm: { upper: -0.12, fore: 0.25 },
          rimColor: "rgba(56, 189, 248, 0.65)"
        });

        // Draw Glowing Futuristic Dumbbell OR Glowing Hydration Flask in Hand
        const shoulderX = charX + 1 * charScale;
        const shoulderY = groundY + (-100 + Math.sin(localT * 3.0) * 2.0) * charScale;
        const elbowX = shoulderX + Math.sin(rightArmPose.upper) * (24 * charScale);
        const elbowY = shoulderY + Math.cos(rightArmPose.upper) * (24 * charScale);
        const handX = elbowX + Math.sin(rightArmPose.upper + rightArmPose.fore) * (23 * charScale);
        const handY = elbowY + Math.cos(rightArmPose.upper + rightArmPose.fore) * (23 * charScale);

        ctx.save();
        ctx.translate(handX, handY);
        if (!isDrinking) {
          // Futuristic Neon-Trimmed Dumbbell
          ctx.fillStyle = "#030407";
          ctx.fillRect(-11, -3, 22, 6);
          ctx.fillRect(-13, -8, 5, 16);
          ctx.fillRect(8, -8, 5, 16);
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(-12, -7, 1.5, 14);
          ctx.fillRect(10.5, -7, 1.5, 14);
        } else {
          // Glowing Cyan Hydration Flask tilted toward mouth
          ctx.rotate(-0.45 * drinkProgress);
          ctx.fillStyle = "#0ea5e9";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 10;
          ctx.fillRect(-3.5, -13, 7, 16);
          ctx.fillStyle = "#e0f2fe";
          ctx.fillRect(-2, -16, 4, 3);
          ctx.shadowBlur = 0;
        }
        ctx.restore();

        SoulRig.drawParticles(ctx, w, h, localT, 22, "rgba(125, 211, 252, 0.32)", 14);
        if (localT >= 7.5) {
          SoulRig.drawPunchline(ctx, w, h, "LOCKED IN.", "#38bdf8", 0.16);
        }
      }
    }
  },

  /* ------------------------------------------------------------------------
     EPISODE 01: THE 2:00 AM SCROLL TRAP (18 Seconds)
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
        camera: { x: -0.06, y: 0.04, zoom: 1.32, tilt: -0.8 },
        subtitle: "Every swipe feeds a tiny hit of fake urgency to an exhausted brain."
      },
      {
        start: 9.5,
        label: "SHOT 03 · FACE GLOW",
        lens: "CLOSE-UP · 50MM",
        camera: { x: -0.1, y: 0.05, zoom: 1.72, tilt: 0.6 },
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
      SoulRig.drawBedroomScene(ctx, w, h, t, {
        mode: "phone",
        phoneActive: t < 14.5,
        clockText: t > 13.5 ? "02:47" : "02:00",
        punchline: t >= 14.5 ? "OK." : ""
      });
    }
  },

  /* ------------------------------------------------------------------------
     EPISODE 02: WALKING THROUGH RAIN IN SILENCE (16 Seconds)
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
      SoulRig.drawOutdoorWalk(ctx, w, h, t, {
        timeOfDay: "nightRain",
        scrollSpeed: 42,
        mood: "focused"
      });
    }
  }
];
