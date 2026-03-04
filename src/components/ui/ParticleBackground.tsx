"use client";

const particles = [
  { left: "5%", bottom: "10%", size: 8, delay: 0, duration: 6 },
  { left: "12%", bottom: "25%", size: 6, delay: 1.2, duration: 7 },
  { left: "20%", bottom: "5%", size: 10, delay: 0.5, duration: 5.5 },
  { left: "28%", bottom: "30%", size: 5, delay: 2.1, duration: 6.5 },
  { left: "35%", bottom: "15%", size: 8, delay: 0.8, duration: 7.5 },
  { left: "42%", bottom: "8%", size: 12, delay: 1.5, duration: 5 },
  { left: "50%", bottom: "20%", size: 6, delay: 3, duration: 6 },
  { left: "58%", bottom: "12%", size: 10, delay: 0.3, duration: 7 },
  { left: "65%", bottom: "28%", size: 7, delay: 2.5, duration: 5.5 },
  { left: "72%", bottom: "6%", size: 5, delay: 1.8, duration: 6.5 },
  { left: "78%", bottom: "22%", size: 9, delay: 0.7, duration: 7.5 },
  { left: "85%", bottom: "18%", size: 8, delay: 3.2, duration: 5 },
  { left: "90%", bottom: "10%", size: 6, delay: 1, duration: 6 },
  { left: "15%", bottom: "35%", size: 11, delay: 2.8, duration: 7 },
  { left: "55%", bottom: "32%", size: 7, delay: 0.2, duration: 5.5 },
  { left: "82%", bottom: "30%", size: 5, delay: 1.6, duration: 6.5 },
];

type ParticleBackgroundProps = {
  variant?: "accent" | "white";
};

export default function ParticleBackground({
  variant = "white",
}: ParticleBackgroundProps) {
  const colorClass =
    variant === "accent" ? "bg-accent/40" : "bg-white/40";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${colorClass}`}
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
}
