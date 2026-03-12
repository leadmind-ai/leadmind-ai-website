type BadgeProps = {
  children: React.ReactNode;
  variant?: "accent" | "primary" | "muted" | "gradient";
  className?: string;
};

export function Badge({
  children,
  variant = "accent",
  className = "",
}: BadgeProps) {
  const variants = {
    accent: "bg-accent-soft text-accent",
    primary: "bg-accent-soft text-on-surface",
    muted: "bg-surface-elevated text-on-surface-muted",
    gradient: "gradient-tag text-on-surface",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
