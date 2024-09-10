"use client";

import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="inline-flex items-center focus:outline-none text-dgreen dark:text-white"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <IconMoon className="w-6 h-6 mr-2 mt-2 " />
      ) : (
        <IconSun className="w-6 h-6 mr-2 mt-2" />
      )}
      
    </button>
  );
};

export default ThemeSwitch;