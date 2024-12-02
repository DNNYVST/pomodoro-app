"use client";

import { useState, TouchEvent } from "react";

const MIN_SWIPE_DISTANCE = 50;

interface SwipeInput {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
}

const useSwipeDetection = (input: SwipeInput) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const swipeDistance = touchStart && touchEnd ? touchStart - touchEnd : 0;
  // const swipeDistance = touchStart - touchEnd;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    const touchEnd = e.targetTouches[0].clientX;
    setTouchEnd(touchEnd);

    const distance = touchStart && touchEnd ? touchStart - touchEnd : 0;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      input?.onSwipedLeft?.();
    }
    if (isRightSwipe) {
      input?.onSwipedRight?.();
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart || !touchEnd) return;
    // const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    // const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    // if (isLeftSwipe) {
    //   input?.onSwipedLeft?.();
    // }
    // if (isRightSwipe) {
    //   input?.onSwipedRight?.();
    // }
  };

  return { onTouchStart, onTouchMove, onTouchEnd, swipeDistance };
};

export default useSwipeDetection;
