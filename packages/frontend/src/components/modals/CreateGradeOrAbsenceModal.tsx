// React
import { FC, useRef, SyntheticEvent } from "react";
// React Icons
import { AiFillCloseCircle } from "react-icons/ai";
// Types
import CreateGradeOrAbsenceModalProps from "@/core/interfaces/component/CreateGradeOrAbsenceModalProps";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createGrade,
  selectTemplateGrade,
  updateTemplateGrade,
} from "@/redux/slices/gradesSlice";
import {
  setGradeModalId,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";
import { getClassById } from "@/redux/slices/classesSlice";

const CreateGradeOrAbsenceModal: FC<CreateGradeOrAbsenceModalProps> = ({
  show,
  studentId,
  location,
  classId,
}) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  useModalTransition(show, modalRef);

  const templateGrade = useAppSelector(selectTemplateGrade);

  const onGradeValueChange = (value: number) => {
    dispatch(updateTemplateGrade({ key: "value", value: value as number }));
  };

  const handleCreateGrade = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să adaugăm o notă, vă rugăm să așteptați..."
      )
    );
    dispatch(createGrade(templateGrade))
      .unwrap()
      .then(() => {
        if (location === "inStudentCard") {
          dispatch(getStudentById(studentId as string));
        } else if (location === "inCatalogue") {
          dispatch(getClassById(classId as string));
        }
      });
  };

  return (
    <div className={profileStyles.createGradeOrAbsenceModal} ref={modalRef}>
      <AiFillCloseCircle
        onClick={() => dispatch(setGradeModalId(""))}
        title="Închideți modalul"
        aria-label="Închideți modalul"
      />
      <form
        className={profileStyles.createGradeOrAbsenceForm}
        onSubmit={(e) => handleCreateGrade(e)}
      >
        <label htmlFor="addGrade">Valoare:</label>
        <input
          type="number"
          name="addGrade"
          id="addGrade"
          min={1}
          max={10}
          required
          placeholder="ex: 10"
          value={templateGrade.value as number}
          onChange={(e) => onGradeValueChange(e.target.valueAsNumber)}
        />
        <button type="submit">Adăugați</button>
      </form>
    </div>
  );
};

export default CreateGradeOrAbsenceModal;
