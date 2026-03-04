type ShimmerTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "span";
  variant?: "light" | "dark";
};

export function ShimmerText({
  children,
  className = "",
  as: Tag = "span",
  variant = "light",
}: ShimmerTextProps) {
  const shimmerClass =
    variant === "light" ? "shimmer-text-light" : "shimmer-text-dark";

  return <Tag className={`${shimmerClass} ${className}`}>{children}</Tag>;
}
