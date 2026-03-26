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
  shine = true,
}: CardProps) {
  return (
    <div
      className={`group/card relative overflow-hidden rounded-[var(--radius-card)] bg-surface-container p-px shadow-[0_34px_84px_-30px_rgba(66,133,244,0.09)] ${
        hover
          ? "transition-colors duration-200 hover:bg-[#003d7a]"
          : ""
      } ${shine ? "shine" : ""}`}
    >
      <div
        className={`relative z-10 rounded-[calc(var(--radius-card)-1px)] bg-[rgba(0,0,0,0.85)] backdrop-blur-[60px] p-[37px_44px] h-full leading-[1.45] transition-colors duration-200 ${
          hover ? "group-hover/card:bg-[rgba(0,0,0,0.75)]" : ""
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
