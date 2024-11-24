"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "./input";

const getFormattedNumberString = (string: string) =>
  string.length === 1 ? `0${string}` : string;

const TimerCard = () => {
  const [minutes, setMinutes] = useState<string>("01");
  const [seconds, setSeconds] = useState<string>("00");
  const [intervalID, setIntervalID] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);

  // Handle display updates during minute rollover
  useEffect(() => {
    if (running && seconds === "-1") {
      setSeconds("59");
      setMinutes((minutes) =>
        getFormattedNumberString(`${parseInt(minutes) - 1}`)
      );
    }
  }, [seconds, running]);

  const startTimer = () => {
    setRunning(true);

    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + +minutes);
    endTime.setSeconds(endTime.getSeconds() + +seconds);

    const timer = setInterval(() => {
      const now = new Date();
      console.log("tick");
      if (endTime.getTime() - now.getTime() + 1000 < 0) {
        console.log("done");
        clearInterval(timer);
        setRunning(false);
      } else {
        setSeconds((seconds) =>
          getFormattedNumberString(`${parseInt(seconds) - 1}`)
        );
      }
    }, 1000);
    setIntervalID(+timer);
  };

  const pauseTimer = () => {
    clearInterval(intervalID as number);
    setIntervalID(null);
    setRunning(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomo!</CardTitle>
        {!running && <CardDescription>Click to edit timer</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex justify-center text-6xl">
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
          className="w-full"
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
