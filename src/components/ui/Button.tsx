import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  const sizeStyles = {
    sm: "text-sm px-4 py-1.5",
    md: "text-base px-6 py-2.5",
    lg: "text-lg px-8 py-3",
  };

  const styles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
