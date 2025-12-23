import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-brand text-white shadow-card hover:bg-brand-dark transition-colors dark:text-slate-950",
  secondary:
    "border border-slate-200 text-slate-900 hover:border-brand-dark hover:text-brand-dark bg-white/70 backdrop-blur dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
  ghost:
    "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "p-2",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-tight transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
