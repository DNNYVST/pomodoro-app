"use client";

import { useContext } from "react";
import { TimerContext } from "@/components/timer-provider";
import { Button } from "@/components/ui/button";

type Session = {
  id: number;
  text: string;
  defaultMinutes: string;
};

interface SessionTypeButtonGroupProps {
  activeID: number;
  onClick: (id: number, minutes: string) => void;
}

const sessions: Session[] = [
  { id: 1, text: "Pomodoro", defaultMinutes: "25" },
  { id: 2, text: "Short Break", defaultMinutes: "05" },
  { id: 3, text: "Long Break", defaultMinutes: "15" },
];

const SessionTypeButtonGroup = ({
  activeID,
  onClick,
}: SessionTypeButtonGroupProps) => {
  const { running } = useContext(TimerContext);

  return (
    <div className="flex flex-col items-center gap-y-2 sm:flex-row flex-1 gap-x-1 justify-center">
      {sessions.map(({ id, text, defaultMinutes }: Session) => (
        <Button
          key={id}
          id={`${text}-button`}
          aria-label={text}
          variant="outline"
          onClick={() => onClick(id, defaultMinutes)}
          className={`w-3/4 transition-colors duration-300 ${
            activeID !== id && "border-transparent"
          } ${activeID === id && "!opacity-100 hover:bg-background"} ${
            running && "text-transparent border-transparent bg-transparent"
          }`}
          aria-disabled={activeID === id || running}
          disabled={running}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export default SessionTypeButtonGroup;
