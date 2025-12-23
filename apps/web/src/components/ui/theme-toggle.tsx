"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils/cn";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "groupomania-theme";

function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return "light";
}

function applyTheme(mode: ThemeMode): ThemeMode {
  if (typeof document === "undefined") return "light";
  const root = document.documentElement;
  const body = document.body;
  root.classList.remove("dark");
  body.classList.remove("dark");

  const effectiveMode: ThemeMode = mode;
  if (effectiveMode === "dark") {
    root.classList.add("dark");
    body.classList.add("dark");
  }

  root.dataset.theme = mode;
  body.dataset.theme = mode;
   // Force browsers to avoid auto-switching with prefers-color-scheme
   root.style.colorScheme = effectiveMode === "dark" ? "dark" : "light";
   body.style.colorScheme = effectiveMode === "dark" ? "dark" : "light";
  return effectiveMode;
}

function useThemeController() {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredTheme());

  useLayoutEffect(() => {
    applyTheme(mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const cycleTheme = useCallback(() => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  }, []);

  return { mode, setMode, cycleTheme };
}

export function ThemeToggle() {
  const { cycleTheme, mode } = useThemeController();
  const isDark = mode === "dark";

  return (
    <Button
      variant="ghost"
      size="md"
      type="button"
      onClick={cycleTheme}
      aria-label={`Basculer thème (actuel : ${isDark ? "sombre" : "clair"})`}
      className="flex items-center gap-2"
    >
      {isDark ? <MoonStar size={16} /> : <SunMedium size={16} />}
    </Button>
  );
}

export function FloatingThemeToggle() {
  const { cycleTheme, mode } = useThemeController();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = mode === "dark";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-card backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`Basculer le thème (actuel : ${isDark ? "sombre" : "clair"})`}
        aria-pressed={isDark}
        className="relative h-10 w-16 overflow-hidden rounded-full border border-slate-200 bg-white/80 shadow-inner transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-slate-700 dark:bg-slate-800"
      >
        <div
          className={cn(
            "absolute inset-1 rounded-full transition",
            isDark ? "bg-brand/35" : "bg-brand/20",
          )}
        />
        <div
          className={cn(
            "absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-slate-200 transition-transform dark:bg-slate-700 dark:ring-slate-600",
            isDark ? "translate-x-7" : "translate-x-0",
          )}
        >
          {isDark ? (
            <MoonStar className="h-4 w-4 text-brand-dark" />
          ) : (
            <SunMedium className="h-4 w-4 text-brand" />
          )}
        </div>
      </button>
    </div>
  );
}
