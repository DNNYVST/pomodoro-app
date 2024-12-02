"use client";

import { useEffect, useContext, useRef } from "react";
import usePrefersReducedMotion from "../app/hooks/use-prefers-reduced-motion";
import { TimerContext } from "./timer-provider";

const BreakBackground = () => {
  const { onBreak } = useContext(TimerContext);

  const prefersReducedMotion = usePrefersReducedMotion();
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  useEffect(() => {
    const toggleVideoPlayback = (play: boolean) => {
      for (const ref of videoRefs) {
        if (ref.current) {
          if (play) {
            ref.current.play();
          } else {
            ref.current.pause();
          }
        }
      }
    };

    const timeout = setTimeout(
      () => toggleVideoPlayback(onBreak && !prefersReducedMotion),
      onBreak ? 0 : 2000
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBreak, prefersReducedMotion]);

  if (prefersReducedMotion) return null;
  return (
    <div
      className={`pointer-events-none transition-opacity duration-1000 ${
        !onBreak && "opacity-0"
      }`}
    >
      <video
        ref={videoRefs[0]}
        preload="auto"
        muted
        loop
        playsInline
        disablePictureInPicture
        //className="fixed object-cover w-[100vw] h-[100vh] ml-[-50%] z-[-1]"
        className="fixed object-cover sm:w-[100vw] h-[50vh] sm:h-[100vh] sm:ml-[-50%] z-[-1]"
      >
        <source src="/clouds.mp4" type="video/mp4" />
      </video>
      <video
        ref={videoRefs[1]}
        preload="auto"
        muted
        loop
        playsInline
        disablePictureInPicture
        //className="fixed object-cover w-[100vw] h-[100vh] z-[-2]"
        className="fixed object-cover sm:w-[100vw] h-[50vh] sm:h-[100vh] top-[50vh] sm:top-0 z-[-2]"
      >
        <source src="/daisies.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BreakBackground;
