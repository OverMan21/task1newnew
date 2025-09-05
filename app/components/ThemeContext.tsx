"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "pastel" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "pastel",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("pastel");

  useEffect(() => {
    // citește tema din localStorage
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.add(saved);
    } else {
      document.documentElement.classList.add("pastel");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "pastel" ? "dark" : "pastel";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
