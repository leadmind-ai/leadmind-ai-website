type BadgeProps = {
  children: React.ReactNode;
  variant?: "accent" | "primary" | "muted" | "glass";
  className?: string;
};

export function Badge({
  children,
  variant = "accent",
  className = "",
}: BadgeProps) {
  const variants = {
    accent: "bg-accent/10 text-accent",
    primary: "bg-primary/10 text-primary",
    muted: "bg-gray-100 text-text-muted",
    glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-white",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
