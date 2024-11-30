"use client";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import useLocalStorage from "@/app/hooks/use-local-storage";

interface TimerContextType {
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  activeSessionTypeId: number;
  setActiveSessionTypeId: Dispatch<SetStateAction<number>>;
  onBreak: boolean;
  completedPomodoros: number;
  setCompletedPomodoros: Dispatch<SetStateAction<number>>;
}

const noop = () => {};

export const TimerContext = createContext<TimerContextType>({
  running: false,
  setRunning: noop,
  activeSessionTypeId: 1,
  setActiveSessionTypeId: noop,
  onBreak: false,
  completedPomodoros: 0,
  setCompletedPomodoros: noop,
});

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [running, setRunning] = useState<boolean>(false);
  const { value: completedPomodoros, setValue: setCompletedPomodoros } =
    useLocalStorage("completedPomodoros", 0);
  const [activeSessionTypeId, setActiveSessionTypeId] = useState<number>(1);

  const onBreak = running && activeSessionTypeId === 3;

  return (
    <TimerContext.Provider
      value={{
        onBreak,
        running,
        setRunning,
        activeSessionTypeId,
        setActiveSessionTypeId,
        completedPomodoros,
        setCompletedPomodoros,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
