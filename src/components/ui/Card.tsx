type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 ${
        hover
          ? "transition-all duration-200 hover:scale-[1.02] hover:bg-white/10"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
