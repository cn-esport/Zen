// ==========================================
// SCENE: THE MYSTERY OF THE MARY CELESTE (1872) — 16:9 DARK HISTORY • 120s
// Native 1920x1080 Widescreen Canvas • 8 Synced Atmospheric Scenes
// ==========================================
const SCENE_DATA = {
  duration: 120,
  sfx: [
    { at: 0.8,   type: "boom" },
    { at: 15.0,  type: "whoosh" },
    { at: 30.0,  type: "boom" },
    { at: 45.0,  type: "whoosh" },
    { at: 60.0,  type: "boom" },
    { at: 75.0,  type: "chime" },
    { at: 90.0,  type: "whoosh" },
    { at: 105.0, type: "boom" },
    { at: 114.0, type: "lock" }
  ],
  captions: [
    // Scene 1 (0:00 - 0:15)
    { start: 0.6,   length: 7.0, text: "December 4th, 1872. Deep in the freezing Atlantic Ocean, a British crew spots a ship drifting aimlessly through the fog." },
    { start: 8.0,   length: 6.6, text: "Her sails are torn, her wheel spins freely in the wind—and nobody answers their hail." },

    // Scene 2 (0:15 - 0:30)
    { start: 15.2,  length: 7.2, text: "Her name is the Mary Celeste. When sailors climb aboard with lanterns raised, they expect to find a massacre." },
    { start: 22.8,  length: 6.8, text: "Instead, they step into total, suffocating silence. All ten people on board have vanished without a trace." },

    // Scene 3 (0:30 - 0:45)
    { start: 30.2,  length: 7.2, text: "Nothing was stolen. Six months of food and fresh water sat untouched in the hold." },
    { start: 37.8,  length: 6.8, text: "The crew's personal belongings, pipes, and boots were still neatly tucked beside their bunks." },

    // Scene 4 (0:45 - 1:00)
    { start: 45.2,  length: 7.2, text: "Inside the captain's cabin, a lantern hangs swaying above an open logbook." },
    { start: 52.8,  length: 6.8, text: "The final entry was written nine days earlier—calm, routine, with no mention of danger or storm." },

    // Scene 5 (1:00 - 1:15)
    { start: 60.2,  length: 7.2, text: "Only two things were missing from the entire vessel: the ship's navigation instruments..." },
    { start: 67.8,  length: 6.8, text: "and the single wooden lifeboat that had been lashed tightly to the main deck." },

    // Scene 6 (1:15 - 1:30)
    { start: 75.2,  length: 7.2, text: "Why would an experienced captain order his wife, his two-year-old daughter, and seven seasoned sailors..." },
    { start: 82.8,  length: 6.8, text: "to abandon a perfectly seaworthy ship in the middle of the open ocean?" },

    // Scene 7 (1:30 - 1:45)
    { start: 90.2,  length: 7.2, text: "Modern investigators found a clue in the cargo: seventeen hundred barrels of industrial alcohol." },
    { start: 97.8,  length: 6.8, text: "Invisible vapor leaks may have triggered a sudden flash explosion—terrifying the crew into fleeing for their lives." },

    // Scene 8 (1:45 - 2:00)
    { start: 105.2, length: 7.2, text: "The ship survived the invisible blast and sailed on alone for hundreds of miles." },
    { start: 112.8, length: 6.8, text: "The lifeboat—and everyone inside it—was never seen again." }
  ],

  render(ctx, W, H, t) {
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    const scale = Math.max(W / 1920, H / 1080);
    const ox = (W - 1920 * scale) * 0.5;
    const oy = (H - 1080 * scale) * 0.5;
    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const easeOut = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);

    // Helper: Stormy Atlantic Ocean & Mist Backdrop
    const drawOceanBackdrop = (zoom = 1, moonVisible = true) => {
      ctx.save();
      ctx.translate(960, 540);
      ctx.scale(zoom, zoom);
      ctx.translate(-960, -540);

      const sky = ctx.createLinearGradient(0, 0, 0, 1080);
      sky.addColorStop(0, '#040811');
      sky.addColorStop(0.55, '#0c1829');
      sky.addColorStop(1, '#14263d');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 1920, 1080);

      // Pale Silver Moon Behind Mist
      if (moonVisible) {
        const moonGlow = ctx.createRadialGradient(1420, 240, 20, 1420, 240, 320);
        moonGlow.addColorStop(0, 'rgba(215, 232, 255, 0.45)');
        moonGlow.addColorStop(1, 'rgba(15, 30, 55, 0)');
        ctx.fillStyle = moonGlow;
        ctx.beginPath();
        ctx.arc(1420, 240, 320, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(230, 240, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(1420, 240, 58, 0, Math.PI * 2);
        ctx.fill();
      }

      // Drifting Sea Spray / Rain Streaks
      ctx.strokeStyle = 'rgba(170, 205, 240, 0.14)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 32; i++) {
        const rx = ((i * 211 + t * 90) % 2000) - 40;
        const ry = ((i * 173 + t * 240) % 1120) - 20;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 14, ry + 36);
        ctx.stroke();
      }

      // Rolling Dark Ocean Waves
      for (let layer = 0; layer < 3; layer++) {
        const baseY = 740 + layer * 85;
        const speed = (layer + 1) * 0.7;
        const amp = 16 + layer * 6;
        ctx.fillStyle = layer === 0 ? '#070f1c' : layer === 1 ? '#050a14' : '#03060c';
        ctx.beginPath();
        ctx.moveTo(0, 1080);
        for (let x = 0; x <= 1920; x += 40) {
          const y = baseY + Math.sin(x * 0.005 + t * speed + layer) * amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(1920, 1080);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    // Helper: Tall-Masted Ghost Ship Silhouette (Mary Celeste)
    const drawGhostShip = (x, y, scaleShip = 1, sway = 0, tornSails = true) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scaleShip, scaleShip);
      ctx.rotate(sway);

      ctx.fillStyle = '#04060b';
      ctx.strokeStyle = 'rgba(165, 205, 245, 0.25)';
      ctx.lineWidth = 2;

      // Hull
      ctx.beginPath();
      ctx.moveTo(-240, 0);
      ctx.lineTo(220, 0);
      ctx.lineTo(270, -48);
      ctx.lineTo(170, -48);
      ctx.lineTo(150, -32);
      ctx.lineTo(-170, -32);
      ctx.lineTo(-200, -54);
      ctx.lineTo(-265, -45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Two Tall Masts & Rigging
      [-75, 65].forEach((mx, idx) => {
        const mh = idx === 0 ? 310 : 280;
        ctx.fillRect(mx - 4, -40 - mh, 8, mh);

        // Billowing / Torn Sails
        ctx.fillStyle = 'rgba(18, 30, 50, 0.85)';
        ctx.beginPath();
        ctx.moveTo(mx, -65 - mh);
        ctx.quadraticCurveTo(mx + 85, -35 - mh * 0.65, mx + 10, -70);
        if (tornSails) {
          ctx.lineTo(mx - 15, -110);
          ctx.lineTo(mx + 5, -155);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#04060b';
      });

      ctx.restore();
    };

    // Helper: Sailor Silhouette With Glowing Warm Amber Lantern
    const drawSailorWithLantern = (x, y, scaleChar = 1, lanternSwing = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scaleChar, scaleChar);

      const breath = Math.sin(t * 1.6) * 3;
      const lx = 155 + Math.sin(lanternSwing) * 14;
      const ly = -165 + breath;

      // Warm Amber Lantern Aura (High Contrast Against Cold Blue Mist!)
      const aura = ctx.createRadialGradient(lx, ly, 8, lx, ly, 360);
      aura.addColorStop(0, 'rgba(255, 210, 110, 0.85)');
      aura.addColorStop(0.3, 'rgba(255, 165, 60, 0.28)');
      aura.addColorStop(1, 'rgba(20, 35, 60, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(lx, ly, 360, 0, Math.PI * 2);
      ctx.fill();

      // Sailor Silhouette
      ctx.fillStyle = '#040508';
      ctx.strokeStyle = 'rgba(255, 210, 130, 0.35)';
      ctx.lineWidth = 2.2;

      ctx.beginPath();
      ctx.moveTo(-95, 220);
      ctx.bezierCurveTo(-100, -40, -70, -220 + breath, -12, -265 + breath);
      ctx.bezierCurveTo(28, -285 + breath, 58, -250 + breath, 72, -195 + breath);
      ctx.lineTo(148, -210 + breath);
      ctx.lineTo(152, -190 + breath);
      ctx.lineTo(68, -145 + breath);
      ctx.lineTo(65, 220);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Head & Glowing Eyes
      ctx.beginPath();
      ctx.arc(10, -345 + breath, 56, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(24, -346 + breath, 8, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(46, -342 + breath, 8, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Hanging Brass Lantern
      ctx.strokeStyle = '#ffdf99';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, -200 + breath);
      ctx.lineTo(lx, ly - 18);
      ctx.stroke();

      ctx.shadowColor = '#ffbe44';
      ctx.shadowBlur = 24;
      ctx.fillStyle = '#fff3cc';
      ctx.beginPath();
      ctx.roundRect(lx - 11, ly - 18, 22, 34, 5);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    // ==========================================
    // 8-SCENE HISTORICAL MYSTERY TIMELINE (120 SECONDS)
    // ==========================================
    if (t < 15.0) {
      // SCENE 1 (0:00 - 0:15): Ghost Ship Drifting Through Atlantic Fog
      const p = t / 15.0;
      drawOceanBackdrop(1 + p * 0.06, true);
      drawGhostShip(980 - p * 90, 765 + Math.sin(t * 1.4) * 12, 1.15, Math.sin(t * 1.1) * 0.04, true);

    } else if (t < 30.0) {
      // SCENE 2 (0:15 - 0:30): Sailor Boarding Empty Deck With Warm Lantern
      const local = t - 15.0;
      const p = local / 15.0;
      drawOceanBackdrop(1.05, false);

      // Wooden Ship Deck & Empty Rigging Lines
      ctx.fillStyle = '#04060b';
      ctx.fillRect(0, 860, 1920, 220);
      ctx.strokeStyle = 'rgba(130, 175, 220, 0.16)';
      ctx.lineWidth = 3;
      [320, 1280, 1580].forEach(rx => {
        ctx.beginPath();
        ctx.moveTo(rx, 0);
        ctx.lineTo(rx + 60, 860);
        ctx.stroke();
      });

      // Abandoned Spinning Ship Wheel on Right
      ctx.save();
      ctx.translate(1420, 730);
      ctx.rotate(t * 0.6);
      ctx.strokeStyle = 'rgba(160, 200, 240, 0.35)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, 78, 0, Math.PI * 2);
      ctx.stroke();
      for (let s = 0; s < 8; s++) {
        const a = (s * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * 98, Math.sin(a) * 98);
        ctx.stroke();
      }
      ctx.restore();

      drawSailorWithLantern(540 + p * 140, 760, 1.1, t * 2.4);

    } else if (t < 45.0) {
      // SCENE 3 (0:30 - 0:45): Untouched Cargo Hold & Personal Belongings
      const local = t - 30.0;
      const p = local / 15.0;
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, 1920, 1080);

      // Soft Lantern Beam Down Into Hold
      const beam = ctx.createRadialGradient(960, 220, 30, 960, 560, 780);
      beam.addColorStop(0, 'rgba(255, 210, 120, 0.32)');
      beam.addColorStop(1, 'rgba(5, 8, 17, 0)');
      ctx.fillStyle = beam;
      ctx.fillRect(0, 0, 1920, 1080);

      // Stacked Wooden Barrels & Crates Silhouettes
      ctx.save();
      ctx.translate(960, 640);
      ctx.scale(1 + p * 0.06, 1 + p * 0.06);
      ctx.fillStyle = '#070b14';
      ctx.strokeStyle = 'rgba(255, 205, 120, 0.25)';
      ctx.lineWidth = 2.5;
      [[-320, 40], [-140, 40], [40, 40], [220, 40], [-230, -120], [-50, -120], [130, -120]].forEach(([bx, by]) => {
        ctx.beginPath();
        ctx.roundRect(bx, by, 150, 160, 22);
        ctx.fill();
        ctx.stroke();
      });
      ctx.restore();

    } else if (t < 60.0) {
      // SCENE 4 (0:45 - 1:00): Captain's Cabin — Swaying Lantern Above Open Logbook
      const local = t - 45.0;
      const p = local / 15.0;
      ctx.fillStyle = '#04070f';
      ctx.fillRect(0, 0, 1920, 1080);

      const swing = Math.sin(t * 1.8) * 0.14;
      const lx = 960 + Math.sin(swing) * 180;
      const ly = 260;

      const glow = ctx.createRadialGradient(lx, ly, 12, 960, 520, 680);
      glow.addColorStop(0, 'rgba(255, 215, 125, 0.65)');
      glow.addColorStop(0.45, 'rgba(255, 165, 65, 0.18)');
      glow.addColorStop(1, 'rgba(4, 7, 15, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1920, 1080);

      // Hanging Lantern Cord
      ctx.strokeStyle = '#ffdf99';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(960, 0);
      ctx.lineTo(lx, ly);
      ctx.stroke();

      ctx.fillStyle = '#fff3cc';
      ctx.beginPath();
      ctx.roundRect(lx - 16, ly, 32, 48, 6);
      ctx.fill();

      // Open Captain's Logbook on Desk Below
      ctx.save();
      ctx.translate(960, 740);
      ctx.scale(1 + p * 0.08, 1 + p * 0.08);
      ctx.fillStyle = '#091120';
      ctx.strokeStyle = 'rgba(255, 215, 135, 0.45)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-240, -70, 235, 160, 10);
      ctx.roundRect(5, -70, 235, 160, 10);
      ctx.fill();
      ctx.stroke();

      // Handwritten Lines Inside Logbook
      ctx.strokeStyle = 'rgba(255, 225, 165, 0.38)';
      ctx.lineWidth = 2.5;
      for (let line = -35; line <= 55; line += 22) {
        ctx.beginPath();
        ctx.moveTo(-210, line);
        ctx.lineTo(-35, line);
        ctx.moveTo(35, line);
        ctx.lineTo(205, line);
        ctx.stroke();
      }
      ctx.restore();

    } else if (t < 75.0) {
      // SCENE 5 (1:00 - 1:15): Missing Lifeboat — Empty Davit Hooks Swinging Over Dark Sea
      const local = t - 60.0;
      const p = local / 15.0;
      drawOceanBackdrop(1.04 + p * 0.05, true);

      // Ship Railing + Two Curved Lifeboat Davits With Empty Swinging Ropes
      ctx.fillStyle = '#04060b';
      ctx.fillRect(0, 780, 1920, 300);

      [680, 1240].forEach((dx, i) => {
        ctx.strokeStyle = '#080e1a';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(dx, 780);
        ctx.quadraticCurveTo(dx, 440, dx + 95, 420);
        ctx.stroke();

        // Empty Rope Swinging in Wind
        const ropeSwing = Math.sin(t * 2.2 + i) * 28;
        ctx.strokeStyle = 'rgba(180, 215, 250, 0.42)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(dx + 95, 420);
        ctx.quadraticCurveTo(dx + 95 + ropeSwing * 0.5, 560, dx + 95 + ropeSwing, 690);
        ctx.stroke();
      });

    } else if (t < 90.0) {
      // SCENE 6 (1:15 - 1:30): Captain Silhouette Looking Out Over Empty Horizon
      const local = t - 75.0;
      const p = local / 15.0;
      drawOceanBackdrop(1 + p * 0.06, true);
      drawSailorWithLantern(620, 770, 1.15, t * 1.6);

    } else if (t < 105.0) {
      // SCENE 7 (1:30 - 1:45): Invisible Alcohol Vapor Flash Inside Cargo Hold
      const local = t - 90.0;
      const flash = Math.exp(-Math.pow((local - 4.5) * 1.4, 2)); // Dramatic flash burst at 1:34.5
      ctx.fillStyle = '#04070f';
      ctx.fillRect(0, 0, 1920, 1080);

      // Rising Vapor Rings + Sudden Amber-Blue Ignition Flash
      const flashGlow = ctx.createRadialGradient(960, 560, 20, 960, 560, 820);
      flashGlow.addColorStop(0, `rgba(255, 215, 130, ${0.18 + flash * 0.72})`);
      flashGlow.addColorStop(0.45, `rgba(110, 185, 255, ${0.12 + flash * 0.35})`);
      flashGlow.addColorStop(1, 'rgba(4, 7, 15, 0)');
      ctx.fillStyle = flashGlow;
      ctx.fillRect(0, 0, 1920, 1080);

      // Cargo Barrels Silhouette
      ctx.fillStyle = '#050810';
      ctx.strokeStyle = `rgba(255, 215, 140, ${0.22 + flash * 0.5})`;
      ctx.lineWidth = 2.5;
      [[-260, 560], [-80, 560], [100, 560]].forEach(([bx, by]) => {
        ctx.beginPath();
        ctx.roundRect(960 + bx, by, 150, 180, 24);
        ctx.fill();
        ctx.stroke();
      });

    } else {
      // SCENE 8 (1:45 - 2:00): The Mary Celeste Sailing Alone Into the Endless Horizon
      const local = t - 105.0;
      const p = local / 15.0;
      drawOceanBackdrop(1.06 - p * 0.06, true);
      drawGhostShip(960 + p * 160, 765 + Math.sin(t * 1.3) * 10, 1.05 - p * 0.28, Math.sin(t) * 0.03, true);
    }

    // Cinema Edge Vignette
    const vig = ctx.createRadialGradient(960, 540, 520, 960, 540, 1250);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(2,4,8,0.78)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1920, 1080);

    ctx.restore();
  }
};
