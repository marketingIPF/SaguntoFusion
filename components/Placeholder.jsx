// Striped SVG placeholder with mono label — used everywhere a real photo should go.
const Placeholder = ({ label = "photo", ratio = "4/3", tone = "sand", className = "", style = {} }) => {
  const tones = {
    sand:  { bg: "#ece4d7", stripe: "#e0d5c2", ink: "#5a4f3f" },
    stone: { bg: "#d9d4cb", stripe: "#c8c2b6", ink: "#4a4336" },
    ink:   { bg: "#2b2823", stripe: "#36322c", ink: "#d9cfb8" },
    sky:   { bg: "#d7e2e4", stripe: "#c6d4d7", ink: "#3a4c50" },
    clay:  { bg: "#e4c9b4", stripe: "#dabb9f", ink: "#6b3e25" },
  };
  const t = tones[tone] || tones.sand;
  const id = React.useId();
  return (
    <div
      className={className}
      style={{
        aspectRatio: ratio,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: t.bg,
        ...style,
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, display: "block" }} preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="14" height="14" fill={t.bg} />
            <line x1="0" y1="0" x2="0" y2="14" stroke={t.stripe} strokeWidth="7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        color: t.ink, opacity: 0.75, textAlign: "center", padding: 12,
      }}>
        <span style={{ background: t.bg, padding: "4px 10px", border: `1px solid ${t.stripe}` }}>
          {label}
        </span>
      </div>
    </div>
  );
};

window.Placeholder = Placeholder;
