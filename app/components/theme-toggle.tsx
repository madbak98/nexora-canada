"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const STORAGE_KEY = "nexora-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const nextTheme = getInitialTheme();
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  const isDark = mounted && theme === "dark";

  return (
    <motion.button
      type="button"
      className="theme-toggle shimmer-button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
    >
      <span className="theme-toggle__icon theme-toggle__sun" aria-hidden="true">☀</span>
      <span className="theme-toggle__track" aria-hidden="true">
        <motion.span
          className="theme-toggle__thumb"
          animate={{ x: isDark ? 28 : 0, rotate: isDark ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        />
      </span>
      <span className="theme-toggle__icon theme-toggle__moon" aria-hidden="true">☾</span>
    </motion.button>
  );
}
