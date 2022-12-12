import { useEffect, useState } from 'react';

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(oldValueOfSeconds => oldValueOfSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return seconds;
};

export function withTimer (WrappedComponent) {
  return ((props) => {
    const seconds = useTimer();

    return (
      <WrappedComponent {...props} seconds={seconds} />
    );
  });
}