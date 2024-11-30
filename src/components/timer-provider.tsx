"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import useLocalStorage from "@/app/hooks/use-local-storage";

interface TimerContextType {
  onBreak: boolean;
  setOnBreak: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  completedPomodoros: number;
  setCompletedPomodoros: Dispatch<SetStateAction<number>>;
}

// todo - maybe onBreak should be a derived value?
// -- keep track of running and the timer TYPE that is active
// -- onbreak = running && type === 3? maybe

export const TimerContext = createContext<TimerContextType>({
  onBreak: false,
  setOnBreak: () => {},
  running: false,
  setRunning: () => {},
  completedPomodoros: 0,
  setCompletedPomodoros: () => {},
});

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [running, setRunning] = useState<boolean>(false);
  const [onBreak, setOnBreak] = useState<boolean>(false);
  const { value: completedPomodoros, setValue: setCompletedPomodoros } =
    useLocalStorage("completedPomodoros", 0);

  return (
    <TimerContext.Provider
      value={{
        onBreak,
        setOnBreak,
        running,
        setRunning,
        completedPomodoros,
        setCompletedPomodoros,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
