// React
import { useEffect, useState } from "react";

const useCountdown = (defaultTime: number, show: boolean) => {
  const [countdown, setCountdown] = useState<number>(defaultTime);

  useEffect(() => {
    setCountdown(defaultTime);
  }, [show]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown !== 0) {
      interval = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  return countdown;
};

export default useCountdown;
