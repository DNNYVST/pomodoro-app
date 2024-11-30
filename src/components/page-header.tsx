"use client";

import { useContext, Fragment } from "react";
import { AlarmClockCheck } from "lucide-react";
import { TimerContext } from "@/components/timer-provider";
import usePrefersReducedMotion from "@/app/hooks/use-prefers-reduced-motion";

const PageHeader = () => {
  const { onBreak, completedPomodoros } = useContext(TimerContext);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <header className="z-50 flex gap-x-2">
      {[...Array(4).keys()].map((_, index) => (
        <Fragment key={index}>
          <AlarmClockCheck
            key={index}
            className={`transition-colors duration-300 ${
              onBreak &&
              !prefersReducedMotion &&
              "text-primary-foreground dark:text-primary"
            }  ${completedPomodoros < index + 1 && "opacity-30"}`}
          />
          <span className="sr-only">{`${completedPomodoros}/4 completed pomodoros`}</span>
        </Fragment>
      ))}
    </header>
  );
};

export default PageHeader;
