import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "warning";
};

const tones = {
  neutral:
    "bg-slate-100 text-slate-600 border border-slate-200 shadow-inner dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  success:
    "bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-inner dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800",
  warning:
    "bg-amber-100 text-amber-800 border border-amber-200 shadow-inner dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
