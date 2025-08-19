import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Theme Context
export const ThemeContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load from localStorage if available
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => useContext(ThemeContext);

// ✅ Utility to get Tailwind classes based on theme
export const getThemeClasses = (theme) => {
  return theme === "dark"
    ? {
        background: "bg-zinc-900",
        text: "text-white",
        card: "bg-zinc-800 text-white",
        border: "border-zinc-700",
        mutedText: "text-zinc-400",
      }
    : {
        background: "bg-white",
        text: "text-zinc-900",
        card: "bg-white text-zinc-900",
        border: "border-zinc-300",
        mutedText: "text-zinc-600",
      };
};
