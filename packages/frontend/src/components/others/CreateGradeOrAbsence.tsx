// React
import { FC, RefObject, useRef } from "react";
// React Icons
import { GrAdd } from "react-icons/gr";
// Types
import CreateGradeOrAbsenceButtonProps from "@/core/interfaces/component/CreateGradeOrAbsenceButtonProps";
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
import { getClassById } from "@/redux/slices/classesSlice";

const CreateGradeOrAbsence: FC<CreateGradeOrAbsenceButtonProps> = ({
  showButton,
  type,
  studentId,
  sectionId,
  location,
  classId,
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
      <div className={profileStyles.createGradeOrAbsenceContainer}>
        <CreateGradeOrAbsenceModal
          show={showModal}
          studentId={studentId as string}
          classId={classId as string}
          location={location}
        />
        <button
          type="button"
          className={profileStyles.createGradeOrAbsenceButton}
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
    <div className={profileStyles.createGradeOrAbsence}>
      <button
        type="button"
        className={profileStyles.createGradeOrAbsenceButton}
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
            .then(() => {
              if (location === "inStudentCard") {
                dispatch(getStudentById(studentId as string));
              } else if (location === "inCatalogue") {
                dispatch(getClassById(classId as string));
              }
            });
        }}
        ref={buttonRef as RefObject<HTMLButtonElement>}
      >
        <GrAdd />
      </button>
    </div>
  );
};

export default CreateGradeOrAbsence;
