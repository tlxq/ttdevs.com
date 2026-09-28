"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANT_MAP: Record<Variant, string> = {
  primary:   "bg-gradient-to-r from-nebula-accent to-nebula-secondary text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
  secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
  outline:   "border border-white/10 bg-transparent hover:border-nebula-accent/50 hover:bg-nebula-accent/5 text-zinc-100",
  ghost:     "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-100",
  link:      "bg-transparent text-zinc-400 hover:text-zinc-100 underline-offset-4 hover:underline p-0 h-auto",
};

const SIZE_MAP: Record<Size, string> = {
  sm: "h-9 px-4 text-xs font-mono tracking-widest uppercase",
  md: "h-11 px-8 text-sm font-medium",
  lg: "h-14 px-10 text-base font-bold",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nebula-accent disabled:pointer-events-none disabled:opacity-50";

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(BASE_CLASSES, VARIANT_MAP[variant], SIZE_MAP[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const motionProps = props as HTMLMotionProps<"button">;

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={buttonClasses(variant, size, className)}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

interface ButtonLinkProps extends React.ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
}

/** A link styled like Button. Use this instead of wrapping a <Button> in a <Link>. */
export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses(variant, size, cn("hover:scale-[1.02] hover:-translate-y-px active:scale-[0.98]", className))}
      {...props}
    />
  );
}
