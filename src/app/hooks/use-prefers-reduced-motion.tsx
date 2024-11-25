"use client";

import { useState, useEffect } from "react";

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setPrefersReducedMotion(mediaQueryList.matches);

    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);

    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
