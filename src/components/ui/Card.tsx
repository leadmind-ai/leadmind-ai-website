type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  shine?: boolean;
  diagonal?: boolean;
};

export function Card({
  children,
  className = "",
  hover = true,
  shine = false,
  diagonal = false,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] p-6 ${
        diagonal ? "gradient-card-diagonal" : "bg-surface-container"
      } ${
        hover
          ? "transition-all duration-300 hover:border-[#87CEEB]/30 hover:bg-[#0d1a2a] hover:shadow-[0_0_30px_rgba(135,206,235,0.15)]"
          : ""
      } ${shine ? "shine" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
