/* eslint-disable no-undef */
// React
import { RefObject, useEffect } from "react";

const useOverlayTransition = (
  showOverlay: boolean,
  overlayRef: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const overlay = overlayRef.current as HTMLDivElement;
    if (showOverlay) {
      overlay.style.display = "flex";
      timeout = setTimeout(() => {
        overlay.style.opacity = "1";
        overlay.style.transform = "scale(1)";
      });
    } else {
      overlay.style.opacity = "0";
      overlay.style.transform = "scale(0)";
      timeout = setTimeout(() => {
        overlay.style.display = "none";
      }, 200);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showOverlay]);
};

export default useOverlayTransition;
