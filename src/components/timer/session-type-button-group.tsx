"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Session = {
  id: number;
  text: string;
  defaultMinutes: string;
};

const sessions: Session[] = [
  { id: 1, text: "Pomodoro", defaultMinutes: "30" },
  { id: 2, text: "Short Break", defaultMinutes: "5" },
  { id: 3, text: "Long Break", defaultMinutes: "15" },
];

const SessionTypeButtonGroup = () => {
  const [activeID, setActiveID] = useState<number>(1);

  return (
    <div className="flex justify-center">
      {sessions.map(({ id, text }: Session) => (
        <Button
          key={id}
          variant="outline"
          onClick={() => setActiveID(id)}
          className={`${activeID !== id && "border-transparent"} ${
            activeID === id && "!opacity-100 hover:bg-background"
          }`}
          disabled={activeID === id}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export default SessionTypeButtonGroup;
