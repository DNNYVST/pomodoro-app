"use client";

import { useState, useEffect } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedValue = localStorage.getItem(key);
      setValue(savedValue ? JSON.parse(savedValue) : initialValue);
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      setValue(initialValue);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage key:", key, error);
    }
  }, [key, value]);

  return { value, setValue, loading } as const;
};

export default useLocalStorage;
