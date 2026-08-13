export function NoiseOverlay({
  size = 120,
  opacity = 0.8,
}: {
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-repeat mix-blend-overlay"
      style={{
        backgroundImage: `url(/effects/noise.svg)`,
        backgroundSize: `${size}px ${size}px`,
        opacity: opacity,
      }}
    />
  );
}
