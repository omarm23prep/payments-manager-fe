import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value === null) localStorage.removeItem(key);
      if (value === undefined) localStorage.setItem(key, value);

      const rawValue = JSON.stringify(value);
      localStorage.setItem(key, rawValue);
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
