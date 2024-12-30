"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  if (audio) {
    audio.volume = 0.5;
  }

  useEffect(() => {
    setAudio(new Audio("/light_switch.mp3"));
  }, []);

  return (
    <Button
      id="toggle-theme-button"
      aria-label="toggle theme button"
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        audio?.play();
      }}
      className="transition-colors duration-300"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
