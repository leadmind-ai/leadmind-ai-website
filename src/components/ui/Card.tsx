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
      className={`rounded-2xl p-6 shadow-card-inner ${
        diagonal ? "gradient-card-diagonal" : "bg-surface-container"
      } ${
        hover ? "transition-all duration-200 hover:shadow-card" : ""
      } ${shine ? "shine" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
