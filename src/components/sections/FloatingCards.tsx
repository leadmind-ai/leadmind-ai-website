"use client";

const faces = [
  {
    // Book — Formation
    icon: (
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 6h12a4 4 0 0 1 4 4v28a3 3 0 0 0-3-3H8V6z" />
        <path d="M40 6H28a4 4 0 0 0-4 4v28a3 3 0 0 1 3-3h13V6z" />
      </svg>
    ),
  },
  {
    // Code — IA / Tech
    icon: (
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="10" width="28" height="28" rx="4" />
        <path d="M19 20l-4 4 4 4" />
        <path d="M29 20l4 4-4 4" />
      </svg>
    ),
  },
  {
    // Chat — Conseil
    icon: (
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="28" height="22" rx="4" />
        <path d="M16 36l-4 6v-6" />
        <line x1="16" y1="16" x2="28" y2="16" />
        <line x1="16" y1="22" x2="24" y2="22" />
      </svg>
    ),
  },
  {
    // Monitor — Dashboard
    icon: (
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="36" height="26" rx="3" />
        <line x1="24" y1="32" x2="24" y2="40" />
        <line x1="16" y1="40" x2="32" y2="40" />
      </svg>
    ),
  },
];

export default function FloatingCards() {
  const size = 220; // px, half = 110 for translateZ

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

      {/* 3D cube container */}
      <div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "900px" }}
      >
        <div
          className="relative animate-cube-rotate"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-xl border border-[#1a3a6b]/60 flex items-center justify-center text-[#3a8fd4] backface-hidden"
            style={{
              transform: `translateZ(${size / 2}px)`,
              background: "linear-gradient(135deg, rgba(0,50,120,0.5) 0%, rgba(0,30,70,0.25) 100%)",
              backfaceVisibility: "hidden",
            }}
          >
            {faces[0].icon}
          </div>

          {/* Right face */}
          <div
            className="absolute inset-0 rounded-xl border border-[#1a3a6b]/60 flex items-center justify-center text-[#3a8fd4]"
            style={{
              transform: `rotateY(90deg) translateZ(${size / 2}px)`,
              background: "linear-gradient(135deg, rgba(0,50,120,0.5) 0%, rgba(0,30,70,0.25) 100%)",
              backfaceVisibility: "hidden",
            }}
          >
            {faces[1].icon}
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-xl border border-[#1a3a6b]/60 flex items-center justify-center text-[#3a8fd4]"
            style={{
              transform: `rotateY(180deg) translateZ(${size / 2}px)`,
              background: "linear-gradient(135deg, rgba(0,50,120,0.5) 0%, rgba(0,30,70,0.25) 100%)",
              backfaceVisibility: "hidden",
            }}
          >
            {faces[2].icon}
          </div>

          {/* Left face */}
          <div
            className="absolute inset-0 rounded-xl border border-[#1a3a6b]/60 flex items-center justify-center text-[#3a8fd4]"
            style={{
              transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
              background: "linear-gradient(135deg, rgba(0,50,120,0.5) 0%, rgba(0,30,70,0.25) 100%)",
              backfaceVisibility: "hidden",
            }}
          >
            {faces[3].icon}
          </div>
        </div>
      </div>
    </div>
  );
}
