import { useEffect, useState, useRef } from "react";

const SIGNALS = [
  {
    id: "red",
    next: "yellow",
    duration: 5000,
    color: "#ff2d2d",
    glow: "rgba(255,45,45,0.8)",
    glowSoft: "rgba(255,45,45,0.15)",
    label: "STOP",
    sub: "Halt & Wait",
    hex: "#FF2D2D",
    ring: "#ff6b6b",
  },
  {
    id: "yellow",
    next: "green",
    duration: 2000,
    color: "#ffcc00",
    glow: "rgba(255,204,0,0.8)",
    glowSoft: "rgba(255,204,0,0.15)",
    label: "READY",
    sub: "Prepare to Go",
    hex: "#FFCC00",
    ring: "#ffe566",
  },
  {
    id: "green",
    next: "red",
    duration: 5000,
    color: "#00e676",
    glow: "rgba(0,230,118,0.8)",
    glowSoft: "rgba(0,230,118,0.15)",
    label: "GO",
    sub: "Clear to Proceed",
    hex: "#00E676",
    ring: "#69f0ae",
  },
];

const OFF_COLOR = "#0d1117";
const OFF_BORDER = "rgba(255,255,255,0.04)";

export default function TraficSignalContainer() {
  const [signalId, setSignalId] = useState("red");
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [tick, setTick] = useState(0);
  const progressRef = useRef(null);
  const startRef = useRef(Date.now());

  const current = SIGNALS.find((s) => s.id === signalId);

  // Progress bar + tick counter
  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);
    const interval = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / current.duration) * 100, 100);
      setProgress(pct);
      setTick(Math.ceil((current.duration - elapsed) / 1000));
    }, 50);
    return () => clearInterval(interval);
  }, [signalId]);

  // Signal transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => {
        setSignalId(current.next);
        setTransitioning(false);
      }, 300);
    }, current.duration);
    return () => clearTimeout(timer);
  }, [signalId]);

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* Ambient background glow */}
      <div
        style={{
          ...s.ambientGlow,
          background: current.glow,
          opacity: transitioning ? 0 : 0.12,
        }}
      />

      {/* Scanline overlay */}
      <div style={s.scanlines} />

      {/* Corner brackets */}
      {["tl","tr","bl","br"].map(pos => (
        <div key={pos} style={{ ...s.corner, ...s[`corner_${pos}`] }}>
          <div style={{ ...s.cornerH, ...(pos.includes("r") ? s.cornerHR : {}) }} />
          <div style={{ ...s.cornerV, ...(pos.includes("b") ? s.cornerVB : {}) }} />
        </div>
      ))}

      <div style={s.layout}>
        {/* Left panel — signal info */}
        <div style={s.infoPanel}>
          <div style={s.eyebrow}>TRAFFIC CONTROL SYSTEM</div>
          <div style={s.infoId}>v2.4.1</div>

          <div style={{ marginTop: 32 }}>
            <div style={s.infoLabel}>CURRENT STATE</div>
            <div style={{ ...s.infoValue, color: current.color }}
              className={transitioning ? "" : "text-pulse"}>
              {current.label}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={s.infoLabel}>INSTRUCTION</div>
            <div style={s.infoSub}>{current.sub}</div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={s.infoLabel}>NEXT CHANGE</div>
            <div style={{ ...s.countdown, color: current.color }}>
              {tick > 0 ? tick : "—"}
              <span style={s.countdownUnit}>s</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={s.progressWrap}>
            <div style={s.progressLabel}>
              <span style={s.infoLabel}>DURATION</span>
              <span style={{ ...s.infoLabel, color: current.color }}>{Math.round(progress)}%</span>
            </div>
            <div style={s.progressTrack}>
              <div
                style={{
                  ...s.progressFill,
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${current.color}99, ${current.color})`,
                  boxShadow: `0 0 10px ${current.glow}`,
                }}
              />
            </div>
          </div>

          {/* Signal sequence */}
          <div style={{ marginTop: 32 }}>
            <div style={s.infoLabel}>SEQUENCE</div>
            <div style={s.sequenceRow}>
              {SIGNALS.map((sg) => (
                <div
                  key={sg.id}
                  style={{
                    ...s.seqDot,
                    background: sg.id === signalId ? sg.color : "transparent",
                    borderColor: sg.id === signalId ? sg.color : "rgba(255,255,255,0.15)",
                    boxShadow: sg.id === signalId ? `0 0 12px ${sg.glow}` : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center — the signal itself */}
        <div style={s.signalColumn}>
          {/* Housing */}
          <div style={{
            ...s.housing,
            borderColor: `rgba(255,255,255,0.07)`,
            boxShadow: `0 0 60px ${current.glowSoft}, inset 0 0 30px rgba(0,0,0,0.6), 0 30px 80px rgba(0,0,0,0.8)`,
          }}>
            {/* Housing top notch */}
            <div style={s.housingTop} />

            {/* Lights */}
            {SIGNALS.map((sg, i) => {
              const isActive = sg.id === signalId;
              return (
                <div key={sg.id} style={s.lightOuter}>
                  {/* Outer ring */}
                  <div style={{
                    ...s.lightRing,
                    borderColor: isActive ? sg.ring : "rgba(255,255,255,0.05)",
                    boxShadow: isActive ? `0 0 20px ${sg.glow}` : "none",
                  }}
                    className={isActive ? "ring-pulse" : ""}
                  />

                  {/* The bulb */}
                  <div
                    className={isActive && !transitioning ? "light-active" : ""}
                    style={{
                      ...s.bulb,
                      background: isActive
                        ? `radial-gradient(circle at 35% 35%, ${sg.ring}, ${sg.color} 50%, ${sg.color}bb)`
                        : `radial-gradient(circle at 35% 35%, #1c2130, ${OFF_COLOR})`,
                      boxShadow: isActive
                        ? `0 0 40px 10px ${sg.glow}, inset 0 0 20px rgba(255,255,255,0.15)`
                        : `inset 0 2px 6px rgba(0,0,0,0.5)`,
                      border: isActive
                        ? `1.5px solid ${sg.ring}66`
                        : `1.5px solid ${OFF_BORDER}`,
                      opacity: transitioning ? 0.4 : 1,
                    }}
                  >
                    {/* Lens flare */}
                    {isActive && !transitioning && (
                      <div style={s.lensFlare} />
                    )}
                    {/* Inactive icon */}
                    {!isActive && (
                      <div style={{ ...s.inactiveIcon, borderColor: sg.color + "33" }}>
                        <div style={{ ...s.inactiveInner, background: sg.color + "22" }} />
                      </div>
                    )}
                  </div>

                  {/* Active label badge */}
                  {isActive && (
                    <div style={{ ...s.badge, color: sg.color, borderColor: sg.color + "44",
                      background: sg.glowSoft }}
                      className="badge-in">
                      {sg.label}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Housing bottom screws */}
            <div style={s.screwRow}>
              {[0,1].map(i => <div key={i} style={s.screw} />)}
            </div>
          </div>

          {/* Pole */}
          <div style={s.pole}>
            <div style={s.poleHighlight} />
          </div>

          {/* Base */}
          <div style={s.base}>
            <div style={{
              ...s.baseGlow,
              background: `radial-gradient(ellipse, ${current.glow} 0%, transparent 70%)`,
              opacity: 0.35,
            }} />
          </div>
        </div>

        {/* Right panel — telemetry */}
        <div style={{ ...s.infoPanel, alignItems: "flex-start" }}>
          <div style={s.eyebrow}>TELEMETRY</div>
          <div style={s.infoId}>LIVE</div>

          {SIGNALS.map((sg) => (
            <div key={sg.id} style={{
              ...s.telemetryRow,
              opacity: sg.id === signalId ? 1 : 0.35,
            }}>
              <div style={{ ...s.telemetryDot, background: sg.color,
                boxShadow: sg.id === signalId ? `0 0 8px ${sg.glow}` : "none" }} />
              <div>
                <div style={{ ...s.infoLabel, marginBottom: 2 }}>{sg.id.toUpperCase()}</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
                  color: sg.id === signalId ? sg.color : "rgba(255,255,255,0.2)" }}>
                  {(sg.duration / 1000).toFixed(1)}s cycle
                </div>
              </div>
              {sg.id === signalId && (
                <div style={{ ...s.activePill, background: sg.glowSoft,
                  color: sg.color, borderColor: sg.color + "44" }}>
                  ACTIVE
                </div>
              )}
            </div>
          ))}

          <div style={{ marginTop: "auto", paddingTop: 32 }}>
            <div style={s.infoLabel}>HEX CODE</div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 20,
              color: current.color, letterSpacing: "0.12em", marginTop: 4 }}>
              {current.hex}
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={s.infoLabel}>STATUS</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%",
                background: "#00e676", boxShadow: "0 0 8px rgba(0,230,118,0.8)" }}
                className="status-blink" />
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
                color: "#00e676", letterSpacing: "0.1em" }}>
                OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh",
    background: "#060810",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Share Tech Mono', monospace",
    position: "relative",
    overflow: "hidden",
  },
  ambientGlow: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 800,
    height: 800,
    borderRadius: "50%",
    filter: "blur(120px)",
    transition: "background 0.6s, opacity 0.6s",
    pointerEvents: "none",
    zIndex: 0,
  },
  scanlines: {
    position: "fixed",
    inset: 0,
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
    pointerEvents: "none",
    zIndex: 1,
  },
  corner: { position: "fixed", width: 40, height: 40, zIndex: 2 },
  corner_tl: { top: 20, left: 20 },
  corner_tr: { top: 20, right: 20 },
  corner_bl: { bottom: 20, left: 20 },
  corner_br: { bottom: 20, right: 20 },
  cornerH: { position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: "rgba(255,255,255,0.2)" },
  cornerHR: { left: "auto", right: 0 },
  cornerV: { position: "absolute", top: 0, left: 0, width: 2, height: "100%", background: "rgba(255,255,255,0.2)" },
  cornerVB: { top: "auto", bottom: 0 },

  layout: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: 48,
    padding: "40px 32px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  // Info panels
  infoPanel: {
    display: "flex",
    flexDirection: "column",
    width: 200,
    minHeight: 480,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 4,
    padding: "24px 20px",
    backdropFilter: "blur(8px)",
  },
  eyebrow: {
    fontSize: 8,
    letterSpacing: "0.3em",
    color: "rgba(255,255,255,0.3)",
    fontFamily: "'Share Tech Mono', monospace",
  },
  infoId: {
    fontSize: 10,
    color: "rgba(255,255,255,0.15)",
    letterSpacing: "0.15em",
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 8,
    letterSpacing: "0.25em",
    color: "rgba(255,255,255,0.25)",
    marginBottom: 6,
  },
  infoValue: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: "0.1em",
    lineHeight: 1,
    transition: "color 0.4s",
  },
  infoSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.05em",
    lineHeight: 1.4,
  },
  countdown: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 40,
    fontWeight: "bold",
    lineHeight: 1,
    transition: "color 0.4s",
  },
  countdownUnit: {
    fontSize: 16,
    marginLeft: 4,
    opacity: 0.6,
  },
  progressWrap: { marginTop: 24 },
  progressLabel: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  progressTrack: {
    height: 3,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
    transition: "width 0.1s linear, background 0.4s, box-shadow 0.4s",
  },
  sequenceRow: { display: "flex", gap: 10, marginTop: 8 },
  seqDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "1.5px solid",
    transition: "all 0.4s",
  },

  // Telemetry
  telemetryRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    transition: "opacity 0.4s",
  },
  telemetryDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
    transition: "box-shadow 0.4s",
  },
  activePill: {
    marginLeft: "auto",
    fontSize: 7,
    letterSpacing: "0.2em",
    padding: "2px 6px",
    borderRadius: 2,
    border: "1px solid",
    fontFamily: "'Share Tech Mono', monospace",
  },

  // Signal column
  signalColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  housing: {
    width: 140,
    background: "linear-gradient(170deg, #141822 0%, #0a0d14 100%)",
    border: "1.5px solid",
    borderRadius: 20,
    padding: "24px 20px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    position: "relative",
    transition: "box-shadow 0.5s",
  },
  housingTop: {
    position: "absolute",
    top: -8,
    width: 40,
    height: 14,
    background: "#141822",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: 4,
  },

  lightOuter: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 96,
    height: 96,
  },
  lightRing: {
    position: "absolute",
    inset: -6,
    borderRadius: "50%",
    border: "1.5px solid",
    transition: "border-color 0.4s, box-shadow 0.4s",
  },
  bulb: {
    width: 88,
    height: 88,
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
  },
  lensFlare: {
    position: "absolute",
    top: "15%",
    left: "18%",
    width: "30%",
    height: "22%",
    background: "rgba(255,255,255,0.4)",
    borderRadius: "50%",
    filter: "blur(4px)",
    transform: "rotate(-30deg)",
    pointerEvents: "none",
  },
  inactiveIcon: {
    position: "absolute",
    inset: "28%",
    borderRadius: "50%",
    border: "1.5px solid",
  },
  inactiveInner: {
    position: "absolute",
    inset: "25%",
    borderRadius: "50%",
  },
  badge: {
    position: "absolute",
    right: -52,
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 9,
    letterSpacing: "0.2em",
    padding: "3px 8px",
    borderRadius: 2,
    border: "1px solid",
    whiteSpace: "nowrap",
    top: "50%",
    transform: "translateY(-50%)",
  },

  screwRow: {
    display: "flex",
    gap: 28,
    marginTop: 4,
  },
  screw: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #2a3040, #0d1117)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  pole: {
    width: 14,
    height: 120,
    background: "linear-gradient(180deg, #1c2333 0%, #0a0d14 100%)",
    borderLeft: "1px solid rgba(255,255,255,0.06)",
    borderRight: "1px solid rgba(255,255,255,0.04)",
    position: "relative",
  },
  poleHighlight: {
    position: "absolute",
    left: 3,
    top: 0,
    bottom: 0,
    width: 2,
    background: "rgba(255,255,255,0.04)",
  },
  base: {
    width: 120,
    height: 16,
    background: "linear-gradient(180deg, #1c2333, #0a0d14)",
    borderRadius: "0 0 40px 40px",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
    borderTop: "none",
  },
  baseGlow: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    height: 30,
    transition: "background 0.5s",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  * { box-sizing: border-box; }

  .text-pulse {
    animation: textPulse 1.5s ease-in-out infinite;
  }
  @keyframes textPulse {
    0%,100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .light-active {
    animation: bulbPulse 1.8s ease-in-out infinite;
  }
  @keyframes bulbPulse {
    0%,100% { filter: brightness(1); }
    50% { filter: brightness(1.18); }
  }

  .ring-pulse {
    animation: ringExpand 1.8s ease-out infinite;
  }
  @keyframes ringExpand {
    0% { transform: scale(1); opacity: 1; }
    70% { transform: scale(1.12); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }

  .badge-in {
    animation: badgeIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  @keyframes badgeIn {
    from { opacity: 0; transform: translateY(-50%) translateX(6px); }
    to   { opacity: 1; transform: translateY(-50%) translateX(0); }
  }

  .status-blink {
    animation: blink 2s step-end infinite;
  }
  @keyframes blink {
    0%,100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @media (max-width: 700px) {
    .info-panel { display: none; }
  }
`;