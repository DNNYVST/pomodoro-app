"use client";

import { useState, TouchEvent } from "react";

const MIN_SWIPE_DISTANCE = 50;

const useSwipeDetection = () => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const swipeDistance = touchStart && touchEnd ? touchStart - touchEnd : 0;
  // const swipeDistance = touchStart - touchEnd;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart || !touchEnd) return;
    // const isLeftSwipe = distance > minSwipeDistance;
    // const isRightSwipe = distance < -minSwipeDistance;
    // if (isLeftSwipe) {
    //   input.onSwipedLeft();
    // }
    // if (isRightSwipe) {
    //   input.onSwipedRight();
    // }
  };

  return { onTouchStart, onTouchMove, onTouchEnd, swipeDistance };
};

export default useSwipeDetection;
