import { useState, useEffect } from "react"

const AgeCalculateContainer = () => {
  const [dob, setDob] = useState("")
  const [age, setAge] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [particles, setParticles] = useState([])
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.015 + 0.005,
        opacity: Math.random() * 0.5 + 0.1,
        drift: (Math.random() - 0.5) * 0.008,
      }))
    )
    setTimeout(() => setRevealed(true), 100)
  }, [])

  useEffect(() => {
    let frame
    const animate = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y - p.speed < 0 ? 100 : p.y - p.speed,
          x: p.x + p.drift < 0 ? 100 : p.x + p.drift > 100 ? 0 : p.x + p.drift,
        }))
      )
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const calculateAge = dob => {
    const birth = new Date(dob)
    const now = new Date()
    let y = now.getFullYear() - birth.getFullYear()
    let m = now.getMonth() - birth.getMonth()
    let d = now.getDate() - birth.getDate()
    if (d < 0) {
      m--
      d += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    }
    if (m < 0) { y--; m += 12 }
    const totalDays = Math.floor((now - birth) / 86400000)
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = totalDays * 24
    return { y, m, d, totalDays, totalWeeks, totalHours }
  }

  const handleCalculate = () => {
    if (!dob) { setError("Please select your date of birth"); return }
    const birth = new Date(dob)
    if (birth > new Date()) { setError("Date cannot be in the future"); return }
    setError("")
    setAge(null)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setAge(calculateAge(dob))
    }, 2200)
  }

  const units = age
    ? [
        { label: "Years", value: age.y, accent: "#c8a96e" },
        { label: "Months", value: age.m, accent: "#9b8ec4" },
        { label: "Days", value: age.d, accent: "#6eafc8" },
      ]
    : []

  const stats = age
    ? [
        { label: "Total Days", value: age.totalDays.toLocaleString() },
        { label: "Total Weeks", value: age.totalWeeks.toLocaleString() },
        { label: "Total Hours", value: age.totalHours.toLocaleString() },
      ]
    : []

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Floating particles */}
      <div style={styles.particleLayer} aria-hidden>
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "#c8a96e",
              opacity: p.opacity,
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div style={styles.gridOverlay} aria-hidden />

      {/* Card */}
      <div
        className={`age-card ${revealed ? "age-card--in" : ""}`}
        style={styles.card}
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLine} />
          <p style={styles.eyebrow}>TEMPORAL CALCULATOR</p>
          <h1 style={styles.title}>
            How Old<br />
            <span style={styles.titleAccent}>Are You?</span>
          </h1>
          <div style={styles.headerLine} />
        </div>

        {/* Input section */}
        <div style={styles.inputSection}>
          <label style={styles.label}>DATE OF BIRTH</label>
          <div style={styles.inputWrapper} className="input-wrapper">
            <input
              type="date"
              value={dob}
              onChange={e => { setDob(e.target.value); setError("") }}
              style={styles.input}
              className="dob-input"
              max={new Date().toISOString().split("T")[0]}
            />
            <div style={styles.inputBorder} className="input-border" />
          </div>
          {error && (
            <p style={styles.error} className="error-msg">⚠ {error}</p>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCalculate}
          disabled={loading}
          style={styles.btn}
          className={`calc-btn ${loading ? "calc-btn--loading" : ""}`}
        >
          <span style={styles.btnInner}>
            {loading ? (
              <span style={styles.btnLoading}>
                <span className="spinner" style={styles.spinner} />
                <span style={styles.btnText}>Calculating…</span>
              </span>
            ) : (
              <span style={styles.btnText}>Calculate Age</span>
            )}
          </span>
          <div style={styles.btnGlow} className="btn-glow" />
        </button>

        {/* Loading bar */}
        {loading && (
          <div style={styles.loadBar}>
            <div style={styles.loadBarFill} className="load-fill" />
          </div>
        )}

        {/* Result */}
        {age && (
          <div style={styles.result} className="result-block">
            <div style={styles.resultDivider}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>YOUR AGE</span>
              <div style={styles.dividerLine} />
            </div>

            <div style={styles.unitGrid}>
              {units.map((u, i) => (
                <div
                  key={u.label}
                  style={{ ...styles.unitCard, animationDelay: `${i * 0.12}s` }}
                  className="unit-card"
                >
                  <div style={{ ...styles.unitAccentBar, background: u.accent }} />
                  <span style={{ ...styles.unitValue, color: u.accent }}>
                    {u.value}
                  </span>
                  <span style={styles.unitLabel}>{u.label}</span>
                </div>
              ))}
            </div>

            <div style={styles.statsRow}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{ ...styles.statItem, animationDelay: `${0.4 + i * 0.1}s` }}
                  className="stat-item"
                >
                  <span style={styles.statValue}>{s.value}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p style={styles.footer}>Every second is unrepeatable.</p>
      </div>
    </div>
  )
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#080a0e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    position: "relative",
    overflow: "hidden",
    padding: "24px 16px",
  },
  particleLayer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  gridOverlay: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(200,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 480,
    background: "linear-gradient(145deg, #0d1117 0%, #111822 50%, #0d1117 100%)",
    border: "1px solid rgba(200,169,110,0.18)",
    borderRadius: 2,
    padding: "48px 40px 36px",
    boxShadow:
      "0 0 0 1px rgba(200,169,110,0.06), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(200,169,110,0.12)",
  },
  header: { textAlign: "center", marginBottom: 40 },
  headerLine: {
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)",
    marginBottom: 20,
  },
  eyebrow: {
    fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
    fontSize: 10,
    letterSpacing: "0.35em",
    color: "#c8a96e",
    margin: "0 0 12px",
    fontWeight: 600,
  },
  title: {
    fontSize: 48,
    fontWeight: 300,
    color: "#f0ece3",
    lineHeight: 1.1,
    margin: "0 0 20px",
    letterSpacing: "-0.01em",
  },
  titleAccent: {
    fontStyle: "italic",
    color: "#c8a96e",
    fontWeight: 700,
  },
  inputSection: { marginBottom: 28 },
  label: {
    display: "block",
    fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
    fontSize: 10,
    letterSpacing: "0.3em",
    color: "rgba(200,169,110,0.6)",
    marginBottom: 10,
    fontWeight: 600,
  },
  inputWrapper: { position: "relative" },
  input: {
    width: "100%",
    background: "rgba(200,169,110,0.04)",
    border: "1px solid rgba(200,169,110,0.2)",
    borderRadius: 2,
    color: "#f0ece3",
    fontSize: 18,
    fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
    fontWeight: 500,
    padding: "14px 16px",
    outline: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "border-color 0.3s, background 0.3s",
    colorScheme: "dark",
  },
  inputBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    width: "0%",
    background: "linear-gradient(90deg, #c8a96e, #9b8ec4)",
    transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
    borderRadius: 2,
  },
  error: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 12,
    color: "#e07b7b",
    marginTop: 8,
    letterSpacing: "0.05em",
  },
  btn: {
    position: "relative",
    width: "100%",
    border: "none",
    borderRadius: 2,
    padding: 0,
    cursor: "pointer",
    overflow: "hidden",
    background: "transparent",
    marginBottom: 0,
  },
  btnInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "16px 24px",
    background: "linear-gradient(135deg, #c8a96e 0%, #b8924a 50%, #c8a96e 100%)",
    backgroundSize: "200% 100%",
    borderRadius: 2,
    position: "relative",
    zIndex: 1,
  },
  btnText: {
    fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
    fontSize: 13,
    letterSpacing: "0.25em",
    fontWeight: 700,
    color: "#080a0e",
    textTransform: "uppercase",
  },
  btnLoading: { display: "flex", alignItems: "center", gap: 12 },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid rgba(8,10,14,0.3)",
    borderTop: "2px solid #080a0e",
    borderRadius: "50%",
    display: "inline-block",
  },
  btnGlow: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(200,169,110,0.3), transparent)",
    opacity: 0,
    transition: "opacity 0.3s",
  },
  loadBar: {
    height: 2,
    background: "rgba(200,169,110,0.15)",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 12,
  },
  loadBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #c8a96e, #9b8ec4, #6eafc8)",
    backgroundSize: "200% 100%",
    borderRadius: 2,
  },
  result: { marginTop: 36 },
  resultDivider: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.25))",
  },
  dividerText: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 10,
    letterSpacing: "0.3em",
    color: "rgba(200,169,110,0.5)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  unitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 12,
    marginBottom: 20,
  },
  unitCard: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(200,169,110,0.1)",
    borderRadius: 2,
    padding: "20px 12px 16px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  unitAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.7,
  },
  unitValue: {
    display: "block",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 44,
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 6,
    letterSpacing: "-0.02em",
  },
  unitLabel: {
    display: "block",
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 9,
    letterSpacing: "0.25em",
    color: "rgba(240,236,227,0.4)",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 8,
    background: "rgba(200,169,110,0.04)",
    border: "1px solid rgba(200,169,110,0.08)",
    borderRadius: 2,
    padding: "14px 12px",
  },
  statItem: {
    textAlign: "center",
  },
  statValue: {
    display: "block",
    fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#c8a96e",
    letterSpacing: "0.02em",
  },
  statLabel: {
    display: "block",
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 8,
    letterSpacing: "0.2em",
    color: "rgba(200,169,110,0.4)",
    marginTop: 3,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  footer: {
    textAlign: "center",
    marginTop: 32,
    fontStyle: "italic",
    fontSize: 13,
    color: "rgba(240,236,227,0.2)",
    letterSpacing: "0.05em",
  },
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400;1,700&family=Rajdhani:wght@500;600;700&display=swap');

  * { box-sizing: border-box; }

  .age-card {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
  }
  .age-card--in {
    opacity: 1;
    transform: translateY(0);
  }

  .dob-input:focus {
    border-color: rgba(200,169,110,0.5) !important;
    background: rgba(200,169,110,0.07) !important;
  }
  .input-wrapper:focus-within .input-border {
    width: 100%;
  }

  .calc-btn:not(:disabled):hover .btn-glow { opacity: 1; }
  .calc-btn:not(:disabled):hover .btnInner {
    background-position: 100% 0;
  }
  .calc-btn:not(:disabled):active { transform: scale(0.985); }
  .calc-btn:disabled { opacity: 0.75; cursor: not-allowed; }

  .calc-btn--loading .btn-glow { animation: shimmer 1.5s infinite; }
  @keyframes shimmer {
    0%,100% { opacity: 0.2; }
    50% { opacity: 0.6; }
  }

  .spinner { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .load-fill {
    animation: loadProgress 2.2s cubic-bezier(0.4,0,0.6,1) forwards,
               gradientShift 1.5s linear infinite;
  }
  @keyframes loadProgress {
    0% { width: 0%; }
    60% { width: 70%; }
    85% { width: 88%; }
    100% { width: 100%; }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }

  .result-block {
    animation: fadeSlideUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .unit-card {
    animation: unitReveal 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
    opacity: 0;
  }
  @keyframes unitReveal {
    from { opacity: 0; transform: scale(0.9) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .unit-card:hover {
    background: rgba(200,169,110,0.06) !important;
    border-color: rgba(200,169,110,0.25) !important;
    transition: all 0.25s;
  }

  .stat-item {
    animation: fadeIn 0.4s forwards;
    opacity: 0;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }

  .error-msg {
    animation: shake 0.35s cubic-bezier(0.36,.07,.19,.97) both;
  }
  @keyframes shake {
    10%, 90% { transform: translateX(-2px); }
    20%, 80% { transform: translateX(3px); }
    30%, 70% { transform: translateX(-3px); }
    40%, 60% { transform: translateX(3px); }
    50% { transform: translateX(-2px); }
  }

  ::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) hue-rotate(5deg); cursor: pointer; }
  input[type=date]::-webkit-datetime-edit { color: #f0ece3; }
  input[type=date]::-webkit-datetime-edit-fields-wrapper { color: #f0ece3; }

  @media (max-width: 520px) {
    .age-card { padding: 36px 24px 28px !important; }
  }
`

export default AgeCalculateContainer