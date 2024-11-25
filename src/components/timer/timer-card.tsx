"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "./input";
import SessionTypeButtonGroup from "./session-type-button-group";
import ThemeToggle from "@/components/theme-toggle";

const getFormattedNumberString = (string: string) =>
  string.length === 1 ? `0${string}` : string;

const TimerCard = ({
  setOnBreak,
}: {
  setOnBreak: (onBreak: boolean) => void;
}) => {
  const [activeSessionTypeID, setActiveSessionTypeID] = useState<number>(1);
  const [minutes, setMinutes] = useState<string>("30");
  const [seconds, setSeconds] = useState<string>("00");
  const [intervalID, setIntervalID] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);

  // Handle display updates during minute rollover
  useEffect(() => {
    if (running) {
      if (seconds === "-1") {
        setSeconds("59");
        setMinutes((minutes) =>
          getFormattedNumberString(`${parseInt(minutes) - 1}`)
        );
      }
      document.title = `${minutes}:${seconds}`;
    }
  }, [seconds, running]);

  const handleChangeSessionType = (id: number, minutes: string) => {
    setActiveSessionTypeID(id);
    setMinutes(minutes);
    setSeconds("00");
  };

  const startTimer = () => {
    setRunning(true);

    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + +minutes);
    endTime.setSeconds(endTime.getSeconds() + +seconds);

    const timer = setInterval(() => {
      const now = new Date();
      if (endTime.getTime() - now.getTime() + 1000 < 0) {
        clearInterval(timer);
        setRunning(false);
        setOnBreak(false);
      } else {
        setSeconds((seconds) =>
          getFormattedNumberString(`${parseInt(seconds) - 1}`)
        );
      }
    }, 1000);

    setIntervalID(+timer);
    setOnBreak(activeSessionTypeID === 3);
  };

  const pauseTimer = () => {
    clearInterval(intervalID as number);
    setIntervalID(null);
    setRunning(false);
    setOnBreak(false);
  };

  return (
    <Card className="w-full min-w-fit shadow-lg z-0">
      <CardHeader className="flex flex-row align-center space-y-0">
        <ThemeToggle />
        <SessionTypeButtonGroup
          activeID={activeSessionTypeID}
          onClick={handleChangeSessionType}
          disabled={running}
        />
      </CardHeader>
      <CardContent>
        {!running && (
          <CardDescription className="pb-2 text-center pointer-events-none">
            Click to edit timer
          </CardDescription>
        )}
        <div
          className={`flex justify-center text-6xl ${
            running && "pointer-events-none"
          }`}
        >
          <Input
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            onBlur={() =>
              setMinutes((minutes) => getFormattedNumberString(minutes || "00"))
            }
            disabled={running}
          />
          {":"}
          <Input
            id="seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            onBlur={() =>
              setSeconds((seconds) => getFormattedNumberString(seconds || "00"))
            }
            disabled={running}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          variant={running ? "destructive" : "default"}
          className="w-1/2"
          onClick={running ? pauseTimer : startTimer}
          disabled={
            !minutes || !seconds || (minutes === "00" && seconds === "00")
          }
        >
          {running ? "Pause" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimerCard;
