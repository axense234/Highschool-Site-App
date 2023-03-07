// React
import { FC, useRef } from "react";
// React Icons
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
// Types
import { CardModalProps } from "types";
// SCSS
import cardStyles from "../scss/components/CardModal.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCardModalId,
  selectEditMode,
  selectProfile,
  setCardModalId,
  setEditMode,
  updateOverlay,
} from "@/redux/slices/generalSlice";

const CardModal: FC<CardModalProps> = ({ cardId, componentType }) => {
  const cardModalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const cardModalId = useAppSelector(selectCardModalId);
  const profile = useAppSelector(selectProfile);
  const editMode = useAppSelector(selectEditMode);

  const showModal =
    cardModalId === cardId && profile.rolUtilizator === "ADMIN" && !editMode;

  const functionUsed =
    componentType === "announcement" ? "deleteAnnouncement" : "deleteTeacher";

  useModalTransition(showModal, cardModalRef);

  return (
    <div className={cardStyles.modalContainer} ref={cardModalRef}>
      <button type='button'>
        <AiFillDelete
          title='Sterge card-ul.'
          onClick={() => {
            dispatch(
              updateOverlay({
                overlayFunctionUsed: functionUsed,
                showOverlay: true,
              })
            );
            dispatch(setCardModalId(cardModalId));
          }}
        />
      </button>
      <button type='button' title='Editeaza card-ul.'>
        <AiFillEdit
          onClick={() => {
            dispatch(setEditMode(true));
            dispatch(setCardModalId(cardModalId));
          }}
        />
      </button>
    </div>
  );
};

export default CardModal;
