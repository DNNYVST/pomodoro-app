"use client";

import { useState } from "react";
import { Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";

const ANIMATIONS = [
  "animate-[snowfall_20s_linear_0s_infinite]",
  "animate-[snowfall_8s_linear_1s_infinite]",
  "animate-[snowfall_9s_linear_2s_infinite]",
  "animate-[snowfall_17s_linear_0s_infinite]",
  "animate-[snowfall_16s_linear_1s_infinite]",
  "animate-[snowfall_15s_linear_2s_infinite]",
  "animate-[snowfall_14s_linear_0s_infinite]",
  "animate-[snowfall_13s_linear_1s_infinite]",
  "animate-[snowfall_12s_linear_2s_infinite]",
  "animate-[snowfall_11s_linear_0s_infinite]",
];

const radii = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const SIZES = radii.map((radius) => `w-[${radius}px] h-[${radius}px]`);

const SnowToggle = () => {
  const [snowing, setSnowing] = useState<boolean>(false);

  return (
    <>
      <Button
        id="snow-toggle-button"
        aria-label="snow toggle button"
        variant={snowing ? "outline" : "ghost"}
        size="icon"
        onClick={() => setSnowing((snowing) => !snowing)}
        className={`transition-colors duration-300 ${
          snowing && "border-foreground"
        }`}
      >
        <Snowflake className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      {snowing && (
        <div
          id="snow-container"
          className="fixed w-full h-full pointer-events-none flex justify-between"
        >
          {Array(20)
            .fill(0)
            .map((_, index) => {
              const animation =
                ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
              const size = SIZES[Math.floor(Math.random() * SIZES.length)];
              return (
                <div
                  key={index}
                  id="snowflake"
                  className={`rounded-full relative top-0 bg-foreground opacity-0 ${animation} ${size} z-50`}
                ></div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SnowToggle;
