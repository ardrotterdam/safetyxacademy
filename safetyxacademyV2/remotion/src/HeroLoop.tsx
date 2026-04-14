import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Alleen achtergrond-motion (geen typografie): de echte titel staat in HTML
 * voor SEO, copy-updates en toegankelijkheid. Loopt naadloos over 210 frames.
 */
export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopT = (frame / durationInFrames) * Math.PI * 2;

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
