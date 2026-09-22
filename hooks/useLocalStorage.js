import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      } else {
        return JSON.parse(item);
      }
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [state]);

  return [state, setState];
}

export default useLocalStorage;
