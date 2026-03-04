"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-light",
    secondary:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-text-muted hover:text-text hover:bg-surface",
    cta: "bg-accent text-white hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] btn-cta-clip rounded-none",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (variant === "cta") {
    if (href) {
      return (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }

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
