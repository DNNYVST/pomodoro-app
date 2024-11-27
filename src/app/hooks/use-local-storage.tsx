"use client";

import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {}, []);

  return [value, setValue];
};

export default useLocalStorage;
