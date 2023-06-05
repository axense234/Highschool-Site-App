// React
import { FC, useRef, useState } from "react";
// React Icons
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsBoxArrowInUpLeft } from "react-icons/bs";
import { VscTriangleDown } from "react-icons/vsc";
// Types
import { CardModalProps, MoveAnnouncementsModalProps } from "types";
import { CategorieAnunt } from "@prisma/client";
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
import { updateTemplateAnnouncement } from "@/redux/slices/announcementsSlice";
// Data
import { categoriiAnunturi } from "@/data";

const CardModal: FC<CardModalProps> = ({ cardId, componentType }) => {
  const cardModalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [toggleMoveAnn, setToggleMoveAnn] = useState<boolean>(false);

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
      <button type="button">
        <AiFillDelete
          title="Șterge card-ul."
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
          <MoveAnnouncementModal show={toggleMoveAnn} />
          <button type="button" title="Mișcă card-ul.">
            <BsBoxArrowInUpLeft
              onClick={() => {
                setToggleMoveAnn(!toggleMoveAnn);
                dispatch(setCardModalId(cardModalId));
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

const MoveAnnouncementModal: FC<MoveAnnouncementsModalProps> = ({ show }) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  useModalTransition(show, modalRef);

  const onCategoryChange = (cat: CategorieAnunt) => {
    dispatch(updateTemplateAnnouncement({ key: "categorie", value: cat }));
  };

  return (
    <div
      className={cardStyles.modalContainer__moveAnnouncementModal}
      ref={modalRef}
    >
      <ul className={cardStyles.modalContainer__categoryList}>
        {categoriiAnunturi.map((categorie) => {
          return (
            <li
              key={categorie.id}
              onClick={() => onCategoryChange(categorie.nume)}
              title={`Mută la ${categorie.nume}`}
            >
              {categorie.nume}
            </li>
          );
        })}
      </ul>
      <VscTriangleDown />
    </div>
  );
};

export default CardModal;
