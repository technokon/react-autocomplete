import { useEffect, useState } from "react";

export const useDebounce = (input, timeout) => {
  const [debounce, setDebounce] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => setDebounce(input), timeout);
    return () => clearTimeout(timer);
  }, [input, timeout]);

  return debounce;
}