"use client";

import { useState, useEffect, useContext, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "./input";
import SessionTypeButtonGroup from "./session-type-button-group";
import { TimerContext } from "@/components/timer-provider";

const getFormattedNumberString = (string: string) =>
  string.length === 1 ? `0${string}` : string;

const TimerCard = () => {
  const { running, setRunning, onBreak, setOnBreak } = useContext(TimerContext);
  const [activeSessionTypeID, setActiveSessionTypeID] = useState<number>(1);
  const [minutes, setMinutes] = useState<string>("30");
  const [seconds, setSeconds] = useState<string>("00");
  const [intervalID, setIntervalID] = useState<number | null>(null);
  const timerBackgroundRef = useRef<HTMLDivElement>(null);

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

  const playPauseButtonWidth = timerBackgroundRef?.current?.offsetWidth || 187;

  return (
    <Card
      className={`w-full sm:w-auto shadow-lg z-0 transition-colors duration-300 ${
        running && "border-transparent shadow-none select-none"
      } ${onBreak && "bg-transparent"}`}
    >
      <CardHeader className="flex gap-x-1 flex-row align-center space-y-0">
        <SessionTypeButtonGroup
          activeID={activeSessionTypeID}
          onClick={handleChangeSessionType}
        />
      </CardHeader>
      <CardContent className="flex justify-center">
        <div
          ref={timerBackgroundRef}
          className={`flex justify-center text-6xl visible bg-card rounded-lg px-1 ${
            running && "pointer-events-none"
          }`}
        >
          <Input
            id="minutes-input"
            aria-label="minutes input"
            value={+minutes < 0 ? "00" : minutes}
            onChange={(e) => setMinutes(e.target.value)}
            onBlur={() =>
              setMinutes((minutes) =>
                getFormattedNumberString(+minutes > 60 ? "60" : minutes || "00")
              )
            }
            disabled={running}
            cn="!bg-transparent"
          />
          {":"}
          <Input
            id="seconds-input"
            aria-label="seconds input"
            value={+seconds < 0 ? "00" : seconds}
            onChange={(e) => setSeconds(e.target.value)}
            onBlur={() =>
              setSeconds((seconds) =>
                getFormattedNumberString(
                  (+seconds > 59 ? "59" : seconds) || "00"
                )
              )
            }
            disabled={running}
            cn="!bg-transparent"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          id="start-pause-button"
          aria-label="start or pause button"
          variant={running ? "destructive" : "default"}
          onClick={running ? pauseTimer : startTimer}
          aria-disabled={
            !minutes || !seconds || (minutes === "00" && seconds === "00")
          }
          className="visible"
          style={{ width: playPauseButtonWidth }}
        >
          {running ? "Pause" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimerCard;
