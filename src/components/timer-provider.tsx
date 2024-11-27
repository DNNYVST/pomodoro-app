"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface TimerContextType {
  onBreak: boolean;
  setOnBreak: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
}

// todo - maybe onBreak should be a derived value?
// -- keep track of running and the timer TYPE that is active
// -- onbreak = running && type === 3? maybe

export const TimerContext = createContext<TimerContextType>({
  onBreak: false,
  setOnBreak: () => {},
  running: false,
  setRunning: () => {},
});

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [running, setRunning] = useState<boolean>(false);
  const [onBreak, setOnBreak] = useState<boolean>(false);

  return (
    <TimerContext.Provider value={{ onBreak, setOnBreak, running, setRunning }}>
      {children}
    </TimerContext.Provider>
  );
};
