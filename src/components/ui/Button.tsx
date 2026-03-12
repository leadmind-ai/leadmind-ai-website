import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "cta";
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-teal text-white hover:bg-teal-light",
    secondary:
      "border-2 border-accent text-accent hover:bg-accent hover:text-on-surface",
    ghost: "text-on-surface-muted hover:text-on-surface hover:bg-surface-elevated",
    cta: "gradient-cta-premium text-white shadow-purple hover:opacity-90",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

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
