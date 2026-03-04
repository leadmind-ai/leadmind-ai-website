type BadgeProps = {
  children: React.ReactNode;
  variant?: "accent" | "primary" | "muted";
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
    muted: "bg-white/10 text-text-muted",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
