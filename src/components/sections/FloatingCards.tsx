"use client";

const cards = [
  {
    // Book — Formation
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 6h12a4 4 0 0 1 4 4v28a3 3 0 0 0-3-3H8V6z" />
        <path d="M40 6H28a4 4 0 0 0-4 4v28a3 3 0 0 1 3-3h13V6z" />
      </svg>
    ),
    size: "w-[220px] h-[220px]",
    position: "left-[5%] top-[10%]",
    rotate: "-6deg",
    delay: "0s",
    duration: "7s",
  },
  {
    // Code — IA / Tech
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="10" y="10" width="28" height="28" rx="4" />
        <path d="M19 20l-4 4 4 4" />
        <path d="M29 20l4 4-4 4" />
      </svg>
    ),
    size: "w-[280px] h-[280px]",
    position: "left-[25%] top-[5%]",
    rotate: "2deg",
    delay: "0.5s",
    duration: "8s",
  },
  {
    // Chat — Conseil
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="8" width="28" height="22" rx="4" />
        <path d="M16 36l-4 6v-6" />
        <line x1="16" y1="16" x2="28" y2="16" />
        <line x1="16" y1="22" x2="24" y2="22" />
      </svg>
    ),
    size: "w-[200px] h-[200px]",
    position: "right-[20%] top-[8%]",
    rotate: "4deg",
    delay: "1s",
    duration: "6.5s",
  },
  {
    // Monitor — Dashboard
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="6" width="36" height="26" rx="3" />
        <line x1="24" y1="32" x2="24" y2="40" />
        <line x1="16" y1="40" x2="32" y2="40" />
      </svg>
    ),
    size: "w-[240px] h-[240px]",
    position: "right-[2%] top-[12%]",
    rotate: "-3deg",
    delay: "1.5s",
    duration: "7.5s",
  },
];

export default function FloatingCards() {
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden" aria-hidden="true">
      {/* Blue glow at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 90%, rgba(0,122,244,0.25) 0%, transparent 70%)",
        }}
      />

      {cards.map((card, i) => (
        <div
          key={i}
          className={`absolute ${card.size} ${card.position}`}
          style={{ transform: `rotate(${card.rotate})` }}
        >
          <div
            className="w-full h-full animate-float-card"
            style={{
              animationDuration: card.duration,
              animationDelay: card.delay,
            }}
          >
            <div
              className="w-full h-full rounded-xl border border-[#1a3a6b]/60 flex items-center justify-center text-[#2a6cb8]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,50,120,0.4) 0%, rgba(0,30,70,0.2) 100%)",
              }}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
