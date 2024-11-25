"use client";

import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../app/hooks/use-prefers-reduced-motion";

const BreakBackground = ({ onBreak = false }: { onBreak: boolean }) => {
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

    toggleVideoPlayback(onBreak && !prefersReducedMotion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBreak, prefersReducedMotion]);

  if (prefersReducedMotion) return null;
  return (
    <div className={`${!onBreak && "hidden"}`}>
      <div
        id="breakFadeIn"
        className="bg-background fixed object-cover w-full h-full pointer-events-none -z-1"
      />
      <video
        ref={videoRefs[0]}
        preload="auto"
        muted
        loop
        playsInline
        className="fixed object-cover w-[100vw] h-[100vh] ml-[-50%] z-[-1]"
      >
        <source src="/clouds.mp4" type="video/mp4" />
      </video>
      <video
        ref={videoRefs[1]}
        preload="auto"
        muted
        loop
        playsInline
        className="fixed object-cover w-[100vw] h-[100vh] z-[-2]"
      >
        <source src="/daisies.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BreakBackground;
