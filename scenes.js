  /* ------------------------------------------------------------------------
     EPISODE 03: MIDNIGHT DRIFT — 4-LAYER SVG NOIR SCENE (15 Seconds)
     ------------------------------------------------------------------------ */
  {
    id: "midnight-drift-svg-03",
    title: "03 · Midnight Drift (SVG Noir)",
    type: "svg",
    duration: 15.0,
    ambience: "night",
    beats: [
      {
        start: 0.0,
        label: "BEAT 01 · FADE IN",
        lens: "WIDE · SVG NOIR",
        subtitle: ""
      },
      {
        start: 2.0,
        label: "BEAT 02 · DRIFT",
        lens: "SLOW PUSH · 1.12X",
        subtitle: "In the quiet of the night, thoughts begin to drift."
      },
      {
        start: 6.5,
        label: "BEAT 03 · EYE WIDEN",
        lens: "CLOSE · EMOTION BEAT",
        subtitle: "One memory you thought you buried wakes back up."
      },
      {
        start: 11.5,
        label: "BEAT 04 · FADE OUT",
        lens: "HOLD · CUT OUT",
        subtitle: ""
      }
    ],
    sounds: [
      { at: 2.2, type: "tick" },
      { at: 6.5, type: "heartbeat" },
      { at: 10.5, type: "tick" }
    ],
    renderSvg(aspectRatio) {
      return SoulRig.buildNoirBedroomSvg(aspectRatio, {
        clockText: "02:14",
        eyeBeat: "widen",
        eyeBeatTime: "6.5s",
        dustCount: 36
      });
    }
  }
