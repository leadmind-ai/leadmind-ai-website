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
  const sizes = {
    default: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  if (variant === "ghost") {
    const classes = `inline-flex items-center justify-center font-medium transition-all duration-200 px-6 py-3 text-on-surface-muted hover:text-on-surface hover:bg-white/[0.06] rounded-full ${className}`;
    if (href) {
      return <Link href={href} className={classes}>{children}</Link>;
    }
    return <button className={classes} {...props}>{children}</button>;
  }

  const wrapperClass = `shine relative overflow-hidden rounded-[20px] p-px transition-colors duration-200 ${
    variant === "primary"
      ? "bg-[#0d9488] hover:bg-[#14b8a6]"
      : "bg-[#0d9488]/60 hover:bg-[#14b8a6]"
  }`;

  const innerClass = `relative z-10 inline-flex items-center justify-center font-medium rounded-[19px] bg-[rgba(0,0,0,0.85)] backdrop-blur-[60px] text-white w-full ${sizes[size]} ${className}`;

  const content = (
    <div className={wrapperClass}>
      <span className={innerClass}>{children}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button {...props}>{content}</button>;
}
