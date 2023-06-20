// React
import { FC, useRef } from "react";
// SCSS
import overlayStyles from "../../scss/components/others/Overlay.module.scss";
// Hooks
import useOverlayTransition from "@/hooks/useOverlayTransition";
import useCountdown from "@/hooks/useCountdown";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  logoutProfile,
  selectCardModalId,
  selectOverlay,
  setCardModalId,
  setScreenLoadingMessage,
  updateOverlay,
} from "@/redux/slices/generalSlice";
import {
  deleteAnnouncementById,
  updateAnnouncementById,
  selectTemplateAnnouncement,
} from "@/redux/slices/announcementsSlice";
import { deleteTeacherById } from "@/redux/slices/teachersSlice";
// Data
import { defaultOverlay } from "@/data";

const Overlay: FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { overlayFunctionUsed, showOverlay, title } =
    useAppSelector(selectOverlay);
  const cardModalId = useAppSelector(selectCardModalId);
  const templateAnnouncement = useAppSelector(selectTemplateAnnouncement);

  useOverlayTransition(showOverlay, overlayRef);
  const secondsLeft = useCountdown(2, showOverlay);

  const handleOnOverlayConfirmation = () => {
    switch (overlayFunctionUsed) {
      case "logout":
        dispatch(logoutProfile());
        break;
      case "deleteAnnouncement":
        dispatch(
          setScreenLoadingMessage(
            "Încercăm să ștergem un anunț, vă rugăm să așteptați..."
          )
        );
        dispatch(deleteAnnouncementById(cardModalId));
        dispatch(setCardModalId(""));
        dispatch(updateOverlay(defaultOverlay));
        break;
      case "deleteTeacher":
        dispatch(
          setScreenLoadingMessage(
            "Încercăm să ștergem un profesor, vă rugăm să așteptați..."
          )
        );
        dispatch(deleteTeacherById(cardModalId));
        dispatch(setCardModalId(""));
        dispatch(updateOverlay(defaultOverlay));
        break;
      case "moveAnnouncement":
        dispatch(
          setScreenLoadingMessage(
            "Încercăm să mutăm un anunț, vă rugăm să așteptați..."
          )
        );
        dispatch(updateAnnouncementById(templateAnnouncement));
        dispatch(setCardModalId(""));
        dispatch(updateOverlay(defaultOverlay));
        break;
      default:
        break;
    }
  };

  return (
    <div className={overlayStyles.overlayContainer} ref={overlayRef}>
      <div className={overlayStyles.overlayContainer__modal}>
        <h2>{title}</h2>
        <div className={overlayStyles.overlayContainer__buttons}>
          <button
            type="button"
            onClick={() => dispatch(updateOverlay(defaultOverlay))}
          >
            Nu
          </button>
          <button
            type="button"
            disabled={secondsLeft !== 0}
            onClick={() => handleOnOverlayConfirmation()}
          >
            {secondsLeft === 0 ? "Da" : secondsLeft}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
