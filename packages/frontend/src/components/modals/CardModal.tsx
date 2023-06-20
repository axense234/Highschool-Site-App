// React
import { FC, useRef } from "react";
// React Icons
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsBoxArrowInUpLeft } from "react-icons/bs";
import { VscTriangleDown } from "react-icons/vsc";
// Types
import { CardModalProps, MoveAnnouncementsModalProps } from "types";
// SCSS
import cardStyles from "../../scss/components/modals/CardModal.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCardModalId,
  selectEditMode,
  selectProfile,
  selectToggleMoveAnnouncementModal,
  setCardModalId,
  setEditMode,
  updateOverlay,
  updateToggleMoveAnnouncementModal,
} from "@/redux/slices/generalSlice";
import { updateTemplateAnnouncement } from "@/redux/slices/announcementsSlice";
// Data
import { announcementCategories } from "@/data";

const CardModal: FC<CardModalProps> = ({ cardId, componentType }) => {
  const cardModalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const cardModalId = useAppSelector(selectCardModalId);
  const profile = useAppSelector(selectProfile);
  const editMode = useAppSelector(selectEditMode);
  const toggleMoveModal = useAppSelector(selectToggleMoveAnnouncementModal);

  const showModal =
    cardModalId === cardId && profile.email === "ADMIN" && !editMode;

  const functionUsed =
    componentType === "announcement" ? "deleteAnnouncement" : "deleteTeacher";

  useModalTransition(showModal, cardModalRef);

  return (
    <div className={cardStyles.modalContainer} ref={cardModalRef}>
      <button type="button">
        <AiFillDelete
          title="Șterge card-ul."
          onClick={() => {
            dispatch(
              updateOverlay({
                overlayFunctionUsed: functionUsed,
                showOverlay: true,
                title: `Ești sigur că vrei să ștergi ${
                  componentType === "announcement" ? "anunțul" : "profesorul"
                }?`,
              })
            );
            dispatch(setCardModalId(cardModalId));
          }}
        />
      </button>
      <button type="button" title="Editează card-ul.">
        <AiFillEdit
          onClick={() => {
            dispatch(setEditMode(true));
            dispatch(setCardModalId(cardModalId));
          }}
        />
      </button>
      {componentType === "announcement" && (
        <div className={cardStyles.modalContainer__moveAnnouncement}>
          <MoveAnnouncementModal
            show={toggleMoveModal}
            cardModalId={cardModalId}
          />
          <button type="button" title="Mișcă card-ul.">
            <BsBoxArrowInUpLeft
              onClick={() => {
                dispatch(updateToggleMoveAnnouncementModal());
                dispatch(setCardModalId(cardModalId));
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

const MoveAnnouncementModal: FC<MoveAnnouncementsModalProps> = ({
  show,
  cardModalId,
}) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  useModalTransition(show, modalRef);

  return (
    <div
      className={cardStyles.modalContainer__moveAnnouncementModal}
      ref={modalRef}
      onMouseLeave={() => dispatch(updateToggleMoveAnnouncementModal())}
    >
      <ul className={cardStyles.modalContainer__categoryList}>
        {announcementCategories.map((category) => {
          return (
            <li
              key={category.id}
              title={`Mută la ${category.name}`}
              onClick={() => {
                dispatch(
                  updateTemplateAnnouncement({
                    key: "category",
                    value: category.name as string,
                  })
                );
                dispatch(
                  updateOverlay({
                    overlayFunctionUsed: "moveAnnouncement",
                    showOverlay: true,
                    title: `Ești sigur că vrei să muți anunțul la ${category.name}?`,
                  })
                );
                dispatch(setCardModalId(cardModalId));
              }}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
      <VscTriangleDown />
    </div>
  );
};

export default CardModal;
