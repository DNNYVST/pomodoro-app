"use client";

import { useContext } from "react";
import { TimerContext } from "@/components/timer-provider";
import usePrefersReducedMotion from "@/app/hooks/use-prefers-reduced-motion";

import ThemeToggle from "../components/theme-toggle";
import SettingsDialog from "@/components/settings-dialog";

const ControlHub = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { onBreak } = useContext(TimerContext);

  return (
    <span
      className={`absolute flex p-2 sm:p-6 z-50 ${
        onBreak &&
        !prefersReducedMotion &&
        "text-primary-foreground dark:text-primary"
      }`}
    >
      <ThemeToggle />
      <SettingsDialog />
    </span>
  );
};

export default ControlHub;
