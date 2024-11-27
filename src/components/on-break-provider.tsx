"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface OnBreakContextType {
  onBreak: boolean;
  setOnBreak: Dispatch<SetStateAction<boolean>>;
}

export const OnBreakContext = createContext<OnBreakContextType>({
  onBreak: false,
  setOnBreak: () => {},
});

export const OnBreakProvider = ({ children }: { children: ReactNode }) => {
  const [onBreak, setOnBreak] = useState<boolean>(false);

  return (
    <OnBreakContext.Provider value={{ onBreak, setOnBreak }}>
      {children}
    </OnBreakContext.Provider>
  );
};
