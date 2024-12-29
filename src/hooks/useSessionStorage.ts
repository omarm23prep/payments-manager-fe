import { useEffect, useState } from 'react';

const useSessionStorage = <T>(key: string, initialValue?: T) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value === null) sessionStorage.removeItem(key);
      if (value === undefined) sessionStorage.setItem(key, value);

      const rawValue = JSON.stringify(value);
      sessionStorage.setItem(key, rawValue);
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage;
