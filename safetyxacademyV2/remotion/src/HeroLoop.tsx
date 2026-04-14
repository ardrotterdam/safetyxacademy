import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Seamless hero loop: intro motion (0–90f), daarna alleen geometrie
 * die exact terugkeert op frame 210 voor perfecte loop.
 */
export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const loopT = (frame / durationInFrames) * Math.PI * 2;

  const line1 = spring({
    frame,
    fps,
    config: { damping: 19, mass: 0.65 },
  });

  const line2 = spring({
    frame: frame - 12,
    fps,
    config: { damping: 19, mass: 0.65 },
  });

  const sub = spring({
    frame: frame - 32,
    fps,
    config: { damping: 22, mass: 0.5 },
  });

  const orbX = Math.sin(loopT * 0.85) * 14;
  const orbY = Math.cos(loopT * 0.62) * 10;
  const orb2X = Math.cos(loopT * 0.55 + 1.2) * 12;
  const orb2Y = Math.sin(loopT * 0.9 + 0.4) * 11;

  const gridShift = frame * 0.35;

  const sheen = interpolate(
    Math.sin(loopT * 1.4),
    [-1, 1],
    [0.03, 0.12]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0f1c",
        overflow: "hidden",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      {/* Animated orbs — loopbaar via sin/cos op loopT */}
      <div
        style={{
          position: "absolute",
          left: `${32 + orbX}%`,
          top: `${18 + orbY}%`,
          width: "52%",
          height: "58%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,102,0,0.42) 0%, rgba(255,102,0,0.08) 45%, transparent 72%)",
          filter: "blur(72px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${48 + orb2X}%`,
          top: `${42 + orb2Y}%`,
          width: "48%",
          height: "52%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 68%)",
          filter: "blur(64px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${20 - orb2X * 0.4}%`,
          top: `${55 + orbY * 0.3}%`,
          width: "38%",
          height: "42%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,240,235,0.06) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Subtiel raster */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          backgroundImage: `
            linear-gradient(rgba(245,240,235,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,240,235,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          backgroundPosition: `${gridShift}px ${gridShift * 0.6}px`,
        }}
      />

      {/* Film sheen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(115deg, transparent 40%, rgba(255,255,255,${sheen}) 50%, transparent 60%)`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Typografie — na intro statisch, blijft leesbaar in loop */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "4rem",
        }}
      >
        <div
          style={{
            fontSize: 118,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 0.98,
            color: "#f5f0eb",
            textAlign: "center",
            transform: `translateY(${interpolate(line1, [0, 1], [36, 0])}px)`,
            opacity: line1,
            textShadow: "0 0 80px rgba(255,102,0,0.15), 0 24px 64px rgba(0,0,0,0.45)",
          }}
        >
          Train lokaal.
        </div>
        <div
          style={{
            fontSize: 118,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 0.98,
            color: "#ff6600",
            marginTop: "0.12em",
            textAlign: "center",
            transform: `translateY(${interpolate(line2, [0, 1], [44, 0])}px)`,
            opacity: line2,
            textShadow: "0 0 100px rgba(255,102,0,0.35)",
          }}
        >
          Werk wereldwijd.
        </div>
        <div
          style={{
            marginTop: "2.5rem",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,240,235,0.55)",
            opacity: sub,
            transform: `translateY(${interpolate(sub, [0, 1], [16, 0])}px)`,
          }}
        >
          NEBOSH IGC · Rotterdam · 2026
        </div>
      </AbsoluteFill>

      {/* Vignet */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 180px rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
