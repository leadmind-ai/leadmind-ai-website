import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "lg";
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const sizes = {
    default: "rounded-lg px-6 py-3 text-base",
    lg: "rounded-xl px-8 py-4 text-lg",
  };

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90 shadow-sm",
    outline:
      "border border-surface-elevated text-on-surface hover:bg-surface-elevated/50",
    ghost: "text-on-surface-muted hover:text-on-surface hover:bg-white/[0.06]",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
