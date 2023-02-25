// React
import { useEffect } from "react";

const usePopInAnimation = (
  className: string,
  inView: boolean,
  entry: IntersectionObserverEntry | undefined
) => {
  useEffect(() => {
    console.log(entry, inView);
    if (inView) {
      entry?.target.classList.add(className);
    }
  }, [entry?.target.classList, inView]);
};

export default usePopInAnimation;
