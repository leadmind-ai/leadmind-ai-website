type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white p-6 ${
        hover
          ? "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
