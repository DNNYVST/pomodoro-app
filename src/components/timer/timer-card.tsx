"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "./input";
import SessionTypeButtonGroup from "./session-type-button-group";

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
  }, [seconds, minutes, running]);

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
    <Card
      className={`w-full w-fit shadow-lg z-0 transition-colors duration-250 ${
        running && "border-transparent shadow-none"
      } ${running && activeSessionTypeID === 3 && "bg-transparent"}`}
    >
      <CardHeader className="flex gap-x-1 flex-row align-center space-y-0">
        <SessionTypeButtonGroup
          activeID={activeSessionTypeID}
          onClick={handleChangeSessionType}
          disabled={running}
        />
      </CardHeader>
      <CardContent className="flex justify-center">
        <div
          className={`flex justify-center text-6xl visible bg-card rounded-lg w-fit px-1 transition-colors duration-250 ${
            running && "pointer-events-none"
          }`}
        >
          <Input
            id="minutes-input"
            aria-label="minutes input"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            onBlur={() =>
              setMinutes((minutes) => getFormattedNumberString(minutes || "00"))
            }
            disabled={running}
          />
          {":"}
          <Input
            id="seconds-input"
            aria-label="seconds input"
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
          id="start-pause-button"
          aria-label="start or pause button"
          variant={running ? "destructive" : "default"}
          className="w-1/2 visible"
          onClick={running ? pauseTimer : startTimer}
          aria-disabled={
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
