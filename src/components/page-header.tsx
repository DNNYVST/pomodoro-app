"use client";

import { useContext } from "react";
import { AlarmClockCheck } from "lucide-react";
import { TimerContext } from "@/components/timer-provider";

const PageHeader = () => {
  const { completedPomodoros } = useContext(TimerContext);

  return (
    <header className="flex gap-x-2">
      {[...Array(4).keys()].map((_, index) => (
        <AlarmClockCheck
          key={index}
          className={`${
            completedPomodoros >= index + 1 ? "opacity-100" : "opacity-30"
          }`}
        />
      ))}
    </header>
  );
};

export default PageHeader;
