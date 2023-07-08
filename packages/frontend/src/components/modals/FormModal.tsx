// React
import { FC, useEffect, useRef } from "react";
// Types
import { FormModalProps, FormModalType } from "types";
// Redux Toolkit
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// SCSS
import formModalStyles from "../../scss/components/modals/FormModal.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectFormModal,
  updateGeneralFormModal,
} from "@/redux/slices/generalSlice";
import {
  selectTeachersFormModal,
  updateTeachersFormModal,
} from "@/redux/slices/teachersSlice";
import {
  selectAnnouncementsFormModal,
  updateAnnouncementsFormModal,
} from "@/redux/slices/announcementsSlice";
import {
  selectAdminsFormModal,
  updateAdminsFormModal,
} from "@/redux/slices/adminsSlice";
import {
  selectStudentsFormModal,
  updateStudentsFormModal,
} from "@/redux/slices/studentsSlice";
import {
  selectClassesFormModal,
  updateClassFormModal,
} from "@/redux/slices/classesSlice";
import {
  selectBooksFormModal,
  updateBookFormModal,
} from "@/redux/slices/booksSlice";

const FormModal: FC<FormModalProps> = ({ type }) => {
  const generalFormModal = useAppSelector(selectFormModal);
  const teachersFormModal = useAppSelector(selectTeachersFormModal);
  const announcementsFormModal = useAppSelector(selectAnnouncementsFormModal);
  const adminsFormModal = useAppSelector(selectAdminsFormModal);
  const studentsFormModal = useAppSelector(selectStudentsFormModal);
  const classesFormModal = useAppSelector(selectClassesFormModal);
  const booksFormModal = useAppSelector(selectBooksFormModal);
  const formModalRef = useRef<HTMLDivElement>(null);

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
    case "general":
      formModal = generalFormModal;
      updateFormModal = updateGeneralFormModal;
      break;
    case "admins":
      formModal = adminsFormModal;
      updateFormModal = updateAdminsFormModal;
      break;
    case "students":
      formModal = studentsFormModal;
      updateFormModal = updateStudentsFormModal;
      break;
    case "classes":
      formModal = classesFormModal;
      updateFormModal = updateClassFormModal;
      break;
    case "books":
      formModal = booksFormModal;
      updateFormModal = updateBookFormModal;
      break;

    default:
      throw new Error("no form modal type");
  }

  useModalTransition(formModal.showModal, formModalRef);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formModal.showModal) {
      timeout = setTimeout(() => {
        dispatch(updateFormModal(false));
      }, 3500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [formModal.showModal]);

  return (
    <div
      className={formModalStyles.formModalContainer}
      ref={formModalRef}
      style={{
        backgroundColor: formModal.color,
      }}
    >
      <p>{formModal.msg}</p>
    </div>
  );
};

export default FormModal;
