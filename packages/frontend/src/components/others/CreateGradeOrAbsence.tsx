// React
import { FC, RefObject, useRef, useState } from "react";
// React Icons
import { GrAdd } from "react-icons/gr";
// Types
import { CreateGradeOrAbsenceButtonProps } from "types";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import CreateGradeOrAbsenceModal from "../modals/CreateGradeOrAbsenceModal";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createAbsence,
  selectTemplateAbsence,
} from "@/redux/slices/absencesSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";
import {
  selectGradeModalId,
  setGradeModalId,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";

const CreateGradeOrAbsence: FC<CreateGradeOrAbsenceButtonProps> = ({
  showButton,
  type,
  studentId,
  sectionId,
}) => {
  const dispatch = useAppDispatch();
  const templateAbsence = useAppSelector(selectTemplateAbsence);

  const buttonRef = useRef<HTMLDivElement | HTMLButtonElement>(null);

  const gradeModalId = useAppSelector(selectGradeModalId);
  const showModal = gradeModalId === sectionId && type === "grade";

  useModalTransition(
    showButton || showModal,
    buttonRef as RefObject<HTMLDivElement>
  );

  if (type === "grade") {
    return (
      <div
        className={
          profileStyles.profileContainer__createGradeOrAbsenceContainer
        }
      >
        <CreateGradeOrAbsenceModal show={showModal} studentId={studentId} />
        <button
          type="button"
          className={profileStyles.profileContainer__createGradeOrAbsenceButton}
          aria-label="Adăugați o notă"
          title="Adăugați o notă"
          ref={buttonRef as RefObject<HTMLButtonElement>}
          onClick={() => dispatch(setGradeModalId(sectionId))}
        >
          <GrAdd />
        </button>
      </div>
    );
  }

  return (
    <div className={profileStyles.profileContainer__createGradeOrAbsence}>
      <button
        type="button"
        className={profileStyles.profileContainer__createGradeOrAbsenceButton}
        aria-label="Adăugați o absență"
        title="Adăugați o absență"
        onClick={() => {
          dispatch(
            setScreenLoadingMessage(
              "Încercăm să adaugăm o absentă, vă rugăm să așteptați..."
            )
          );
          dispatch(createAbsence(templateAbsence))
            .unwrap()
            .then(() => dispatch(getStudentById(studentId)));
        }}
        ref={buttonRef as RefObject<HTMLButtonElement>}
      >
        <GrAdd />
      </button>
    </div>
  );
};

export default CreateGradeOrAbsence;
