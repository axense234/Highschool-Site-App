// React
import { FC, useRef } from "react";
// Types
import { OverlayProps } from "types";
// SCSS
import overlayStyles from "../scss/components/Overlay.module.scss";
// Hooks
import useOverlayTransition from "@/hooks/useOverlayTransition";

const Overlay: FC<OverlayProps> = ({ title, showOverlay, setShowOverlay }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useOverlayTransition(showOverlay, overlayRef);

  return (
    <div className={overlayStyles.overlayContainer} ref={overlayRef}>
      <div className={overlayStyles.overlayContainer__modal}>
        <h2>{title}</h2>
        <div className={overlayStyles.overlayContainer__buttons}>
          <button type='button' onClick={() => setShowOverlay(false)}>
            Nu
          </button>
          <button type='button'>Da</button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
