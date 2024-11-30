"use client";

import { useContext, Fragment } from "react";
import { AlarmClockCheck } from "lucide-react";
import { TimerContext } from "@/components/timer-provider";

const PageHeader = () => {
  const { completedPomodoros } = useContext(TimerContext);

  return (
    <header className="flex gap-x-2">
      {[...Array(4).keys()].map((_, index) => (
        <Fragment key={index}>
          <AlarmClockCheck
            key={index}
            className={`${completedPomodoros < index + 1 && "opacity-30"}`}
          />
          <span className="sr-only">{`${completedPomodoros}/4 completed pomodoros`}</span>
        </Fragment>
      ))}
    </header>
  );
};

export default PageHeader;
