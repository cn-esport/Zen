/* ==========================================================================
   LAST SOUL STUDIO — EPISODES & SCRIPT DIRECTION (scenes.js)
   All character shapes, rooms, and lighting are locked in `style-rig.js`.
   ========================================================================== */

window.LAST_SOUL_SCENES = [
  /* ------------------------------------------------------------------------
     EPISODE 00: FULL INDOOR, OUTDOOR & SHOP SHOWCASE (32 Seconds)
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
      if (t < 16.0) {
        const wakeProgress = Math.max(0, Math.min(1, (t - 7.5) / 2.2));
        const stretch = t >= 9.5 ? Math.sin(Math.min(1, (t - 9.5) / 2.2) * Math.PI) : 0;
        SoulRig.drawBedroomScene(ctx, w, h, t, {
          mode: t < 7.5 ? "sleep" : "wake",
          wakeProgress,
          stretch,
          clockText: "06:30",
          alarmShake: t >= 6.8 && t <= 9.2 ? Math.sin(t * 55) * 2.5 : 0,
          showZzz: t < 6.8
        });
      } else if (t < 24.0) {
        SoulRig.drawOutdoorWalk(ctx, w, h, t - 16.0, { timeOfDay: "morning" });
      } else {
        SoulRig.drawShopScene(ctx, w, h, t - 24.0, { shopName: "SOUL STORE" });
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
      SoulRig.drawBedroomScene(ctx, w, h, t, {
        mode: "phone",
        phoneActive: t < 14.5,
        clockText: t > 13.5 ? "02:47" : "02:00"
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
      SoulRig.drawOutdoorWalk(ctx, w, h, t, { timeOfDay: "nightRain", scrollSpeed: 42 });
    }
  }
];
