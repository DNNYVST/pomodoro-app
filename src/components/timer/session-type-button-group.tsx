"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Session = {
  id: number;
  text: string;
};

const sessions: Session[] = [
  { id: 1, text: "Pomodoro" },
  { id: 2, text: "Short Break" },
  { id: 3, text: "Long Break" },
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
