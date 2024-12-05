"use client";

// @typescript-eslint/no-explicit-any

import { useState, useEffect } from "react";
import { Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";

const ANIMATION_DELAYS = [0, 1, 2];

const ANIMATIONS = [
  "animate-[snowfall_20s_linear_0s_infinite]",
  "animate-[snowfall_17s_linear_0s_infinite]",
  "animate-[snowfall_14s_linear_0s_infinite]",
  "animate-[snowfall_11s_linear_0s_infinite]",
  "animate-[snowfall_5s_linear_0s_infinite]",
  "animate-[snowfall_13s_linear_0s_infinite]",
  "animate-[snowfall_12s_linear_0s_infinite]",
  "animate-[snowfall_11s_linear_0s_infinite]",
  "animate-[snowfall_9s_linear_0s_infinite]",
  "animate-[snowfall_8s_linear_0s_infinite]",
];

const SIZE_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const SIZES = [
  "w-[2px] h-[2px]",
  "w-[3px] h-[3px]",
  "w-[4px] h-[4px]",
  "w-[5px] h-[5px]",
  "w-[6px] h-[6px]",
  "w-[7px] h-[7px]",
  "w-[8px] h-[8px]",
  "w-[9px] h-[9px]",
  "w-[10px] h-[10px]",
];

type Tilt = {
  beta: number;
  gamma: number;
};

type AnimationData = {
  animationIndices: number[];
  sizeIndices: number[];
  delayIndices: number[];
};

const SnowToggle = () => {
  const [snowing, setSnowing] = useState<boolean>(false);

  const [animationData, setAnimationData] = useState<AnimationData>({
    animationIndices: [],
    sizeIndices: [],
    delayIndices: [],
  } as AnimationData);

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [tilt, setTilt] = useState<Tilt>({ beta: 0, gamma: 0 });

  useEffect(() => {
    setAnimationData({
      animationIndices: Array(20)
        .fill(0)
        .map(() => Math.floor(Math.random() * ANIMATIONS.length)),
      sizeIndices: Array(20)
        .fill(0)
        .map(() => Math.floor(Math.random() * SIZES.length)),
      delayIndices: Array(20)
        .fill(0)
        .map(() => Math.floor(Math.random() * ANIMATION_DELAYS.length)),
    });
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    setTilt({
      beta: Math.floor(e.beta || 0),
      gamma: Math.floor(e.gamma || 0),
    });
  };

  const requestPermission = async () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission === "granted") {
          setPermissionGranted(true);
          window.addEventListener("deviceorientation", handleOrientation);
        } else {
          console.error("Permission denied for device orientation.");
        }
      } catch (err) {
        console.error("Error while requesting permission:", err);
      }
    } else {
      // No explicit permission needed (e.g., on some Android devices)
      setPermissionGranted(true);
      window.addEventListener("deviceorientation", handleOrientation);
    }
  };

  useEffect(() => {
    // Cleanup when the component unmounts or before re-adding the listener
    return () => {
      if (permissionGranted) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [permissionGranted]);

  return (
    <>
      <Button
        id="snow-toggle-button"
        aria-label="snow toggle button"
        variant={snowing ? "outline" : "ghost"}
        size="icon"
        onClick={() => {
          requestPermission();
          setSnowing((snowing) => !snowing);
        }}
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
            .map((index) => {
              const { animationIndices, sizeIndices, delayIndices } =
                animationData;
              const animation = ANIMATIONS[animationIndices[index]];
              const size = SIZES[sizeIndices[index]];
              const sizeValue = SIZE_VALUES[sizeIndices[index]];
              return (
                <div
                  key={index}
                  id="snowflake"
                  className={`border border-background rounded-full relative top-0 bg-foreground opacity-0 ${animation} ${size}`}
                  style={{
                    zIndex: 9999,
                    transform: `translate(${Math.floor(
                      tilt.gamma * sizeValue * 0.08
                    )}px, ${Math.floor((tilt.beta - 50) * sizeValue * 0.1)}px)`,
                    animationDelay: `${ANIMATION_DELAYS[delayIndices[index]]}s`,
                  }}
                ></div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SnowToggle;
