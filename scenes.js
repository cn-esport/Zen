/* ==========================================================================
   LAST SOUL STUDIO — EPISODES & SCRIPT DIRECTION (scenes.js)
   All character shapes, eyes, palettes & lighting live in `style-rig.js`.
   ========================================================================== */

window.LAST_SOUL_SCENES = [
  /* ------------------------------------------------------------------------
     EPISODE 00: MORNING DISCIPLINE PROTOCOL (36 Seconds · Full Studio Test)
     Room Waking Up -> Street Walk -> Local Shop -> Gym & Hydration
     ------------------------------------------------------------------------ */
  {
    id: "morning-protocol-00",
    title: "00 · Morning Discipline Protocol",
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
        label: "SCENE 02 · STREET WALK",
        lens: "TRACKING · 35MM",
        camera: { x: 0.0, y: 0.03, zoom: 1.22, tilt: 0 },
        subtitle: "No shortcuts. Every step through the quiet streets builds momentum."
      },
      {
        start: 16.0,
        label: "SCENE 03 · SUPPLY SHOP",
        lens: "WIDE · ESTABLISHING",
        camera: { x: 0.05, y: 0.01, zoom: 1.12, tilt: 0 },
        subtitle: "Fuel the machine. Pick up clean supplies before the heavy work starts."
      },
      {
        start: 24.0,
        label: "SCENE 04 · GYM & WATER",
        lens: "MEDIUM · DOLLY IN",
        camera: { x: 0.02, y: 0.03, zoom: 1.32, tilt: -0.5 },
        subtitle: "Train the body. Hydrate the mind. Own the day."
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
          punchline: t >= 5.2 ? "BEGIN." : ""
        });
      } else if (t < 16.0) {
        SoulRig.drawOutdoorWalk(ctx, w, h, t - 8.0, {
          timeOfDay: "morning",
          scrollSpeed: 64,
          mood: "focused"
        });
      } else if (t < 24.0) {
        SoulRig.drawShopScene(ctx, w, h, t - 16.0, {
          shopName: "SOUL STORE"
        });
      } else {
        const localT = t - 24.0;
        const isDrinking = localT >= 6.0;
        const curlWave = (Math.sin(localT * 3.4) + 1) * 0.5;
        const drinkProgress = isDrinking ? Math.min(1, (localT - 6.0) / 1.2) : 0;

        SoulRig.drawGymScene(ctx, w, h, localT, {
          isDrinking,
          drinkProgress,
          curlWave,
          punchline: localT >= 7.5 ? "LOCKED IN." : ""
        });
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
