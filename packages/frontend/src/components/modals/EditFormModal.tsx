// React
import { FC, useEffect, useRef } from "react";
// Redux Toolkit
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
// Types
import FormModalProps from "@/core/interfaces/component/FormModalProps";
import { FormModalType } from "@/core/types/variables";
// SCSS
import editFormModalStyles from "../../scss/components/modals/EditFormModal.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectAnnouncementsFormModal,
  updateAnnouncementsFormModal,
} from "@/redux/slices/announcementsSlice";
import {
  selectTeachersFormModal,
  updateTeachersFormModal,
} from "@/redux/slices/teachersSlice";

const EditFormModal: FC<FormModalProps> = ({ type }) => {
  const teachersFormModal = useAppSelector(selectTeachersFormModal);
  const announcementsFormModal = useAppSelector(selectAnnouncementsFormModal);
  const editFormModalRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  let formModal: FormModalType;
  let updateFormModal: ActionCreatorWithPayload<boolean>;
  switch (type) {
    case "teachers":
      formModal = teachersFormModal;
      updateFormModal = updateTeachersFormModal;
      break;
    case "announcements":
      formModal = announcementsFormModal;
      updateFormModal = updateAnnouncementsFormModal;
      break;
    default:
      throw new Error("no form modal type");
  }

  useModalTransition(formModal.showModal, editFormModalRef);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formModal.showModal) {
      timeout = setTimeout(() => {
        dispatch(updateFormModal(false));
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [formModal.showModal]);

  return (
    <div
      className={editFormModalStyles.editFormModalContainer}
      ref={editFormModalRef}
    >
      <p>{formModal.msg}</p>
    </div>
  );
};

export default EditFormModal;
