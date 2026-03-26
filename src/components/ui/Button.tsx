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
    default: "text-base",
    lg: "text-lg",
  };

  const wrapperVariants = {
    primary:
      "rounded-[20px] bg-[#002549] p-px transition-colors duration-200 hover:bg-[#003d7a]",
    outline:
      "rounded-[20px] bg-surface-container p-px transition-colors duration-200 hover:bg-[#1a3a6b]",
    ghost: "",
  };

  const innerVariants = {
    primary:
      "rounded-[19px] bg-[rgba(0,0,0,0.85)] backdrop-blur-[60px] px-8 py-3.5 text-white",
    outline:
      "rounded-[19px] bg-[rgba(0,0,0,0.85)] backdrop-blur-[60px] px-8 py-3.5 text-on-surface",
    ghost:
      "px-6 py-3 text-on-surface-muted hover:text-on-surface hover:bg-white/[0.06] rounded-full",
  };

  if (variant === "ghost") {
    const classes = `${base} ${sizes[size]} ${innerVariants.ghost} ${className}`;
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

  const content = (
    <div className={wrapperVariants[variant]}>
      <span className={`${base} ${sizes[size]} ${innerVariants[variant]} w-full ${className}`}>
        {children}
      </span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button {...props}>
      {content}
    </button>
  );
}
