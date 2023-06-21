// React
import { RefObject, useEffect } from "react";

const useFormTransition = (formRef: RefObject<HTMLFormElement>) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const form = formRef.current as HTMLElement;
    if (form) {
      form.style.opacity = "1";
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [formRef.current]);
};

export default useFormTransition;
