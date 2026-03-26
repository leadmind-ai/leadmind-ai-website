"use client";

const icons = [
  // Book — Formation
  <svg key="book" width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 6h12a4 4 0 0 1 4 4v28a3 3 0 0 0-3-3H8V6z" />
    <path d="M40 6H28a4 4 0 0 0-4 4v28a3 3 0 0 1 3-3h13V6z" />
  </svg>,
  // Code — IA / Tech
  <svg key="code" width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="10" y="10" width="28" height="28" rx="4" />
    <path d="M19 20l-4 4 4 4" />
    <path d="M29 20l4 4-4 4" />
  </svg>,
  // Chat — Conseil
  <svg key="chat" width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="8" width="28" height="22" rx="4" />
    <path d="M16 36l-4 6v-6" />
    <line x1="16" y1="16" x2="28" y2="16" />
    <line x1="16" y1="22" x2="24" y2="22" />
  </svg>,
  // Monitor — Dashboard
  <svg key="monitor" width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="6" y="6" width="36" height="26" rx="3" />
    <line x1="24" y1="32" x2="24" y2="40" />
    <line x1="16" y1="40" x2="32" y2="40" />
  </svg>,
];

const cardStyle = "rounded-xl border border-[#1a3a6b]/60 flex items-center justify-center text-[#3a8fd4]";
const cardBg = "linear-gradient(135deg, rgba(0,50,120,0.5) 0%, rgba(0,30,70,0.25) 100%)";

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

      {/* Cards container with perspective */}
      <div
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-[600px] h-[300px] animate-cube-morph" style={{ transformStyle: "preserve-3d" }}>
          {/* Card 1 — left */}
          <div
            className="absolute w-[220px] h-[220px] animate-card-1"
            style={{ transformStyle: "preserve-3d", left: "0", top: "20px" }}
          >
            <div className={`w-full h-full ${cardStyle}`} style={{ background: cardBg }}>
              {icons[0]}
            </div>
          </div>

          {/* Card 2 — center-left */}
          <div
            className="absolute w-[260px] h-[260px] animate-card-2"
            style={{ transformStyle: "preserve-3d", left: "120px", top: "0" }}
          >
            <div className={`w-full h-full ${cardStyle}`} style={{ background: cardBg }}>
              {icons[1]}
            </div>
          </div>

          {/* Card 3 — center-right */}
          <div
            className="absolute w-[210px] h-[210px] animate-card-3"
            style={{ transformStyle: "preserve-3d", right: "100px", top: "15px" }}
          >
            <div className={`w-full h-full ${cardStyle}`} style={{ background: cardBg }}>
              {icons[2]}
            </div>
          </div>

          {/* Card 4 — right */}
          <div
            className="absolute w-[240px] h-[240px] animate-card-4"
            style={{ transformStyle: "preserve-3d", right: "-20px", top: "10px" }}
          >
            <div className={`w-full h-full ${cardStyle}`} style={{ background: cardBg }}>
              {icons[3]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
