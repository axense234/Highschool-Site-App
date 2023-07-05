// React
import { FC, useEffect } from "react";
// Types
import { CardSectionProps } from "types";
import { Absence, Teacher } from "@prisma/client";
// React Icons
import { AiFillDelete } from "react-icons/ai";
// Components
import CreateGradeOrAbsence from "../others/CreateGradeOrAbsence";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteAbsenceById,
  updateAbsenceById,
  updateTemplateAbsence,
} from "@/redux/slices/absencesSlice";
import {
  selectGradeOrAbsenceSection,
  selectGradeModalId,
  setGradeOrAbsenceSection,
  setMarkedAbsenceId,
  selectMarkedAbsenceId,
} from "@/redux/slices/generalSlice";
import { updateTemplateGrade } from "@/redux/slices/gradesSlice";
import { getClassById } from "@/redux/slices/classesSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";

const CardSection: FC<CardSectionProps> = ({
  absences,
  grades,
  ownProfile,
  subject,
  teacher,
  section_uid,
  profile_used_uid,
  class_uid,
}) => {
  const dispatch = useAppDispatch();
  const gradeOrAbsenceSection = useAppSelector(selectGradeOrAbsenceSection);
  const gradeModalId = useAppSelector(selectGradeModalId);
  const markedAbsenceId = useAppSelector(selectMarkedAbsenceId);

  const gradeOrAbsenceSectionId = gradeOrAbsenceSection.sectionId;
  const gradeOrAbsenceSectionType = gradeOrAbsenceSection.type;

  const allowModifications =
    ownProfile.role === "ADMIN" || ownProfile.role === "PROFESOR";
  const allowAbsenceReasoning =
    ownProfile.role === "ADMIN" ||
    (ownProfile as Teacher).master_class_uid === class_uid;
  const allowDeleteAbsence = ownProfile.role === "ADMIN";

  const updateAbsence = (absence: Absence) => {
    if (allowAbsenceReasoning) {
      dispatch(
        updateAbsenceById({
          reasoned: !absence.reasoned,
          absence_uid: absence.absence_uid,
          card_section_uid: section_uid,
          id: absence.absence_uid,
        })
      )
        .unwrap()
        .then(() => dispatch(getStudentById(profile_used_uid as string)));
    }
  };

  const deleteAbsence = (absence_uid: string) => {
    if (allowDeleteAbsence) {
      dispatch(deleteAbsenceById(absence_uid))
        .unwrap()
        .then(() => dispatch(getClassById(class_uid as string)));
    }
  };

  useEffect(() => {
    if (gradeModalId === section_uid) {
      dispatch(
        updateTemplateGrade({ key: "card_section_uid", value: section_uid })
      );
    }
  }, [gradeModalId]);

  useEffect(() => {
    if (gradeOrAbsenceSectionType === "absence") {
      dispatch(
        updateTemplateAbsence({
          key: "card_section_uid",
          value: gradeOrAbsenceSectionId,
        })
      );
    }
  }, [gradeOrAbsenceSection, gradeOrAbsenceSectionId]);

  return (
    <tr>
      <td
        style={{
          fontWeight: "bolder",
        }}
      >
        {subject}
      </td>
      <td
        style={{
          fontWeight: teacher ? "bolder" : "normal",
          fontSize: teacher ? "1.15rem" : "1rem",
        }}
      >
        {teacher || "Nu știm încă"}
      </td>
      <td
        onFocus={() => {
          if (allowModifications) {
            dispatch(
              setGradeOrAbsenceSection({
                sectionId: section_uid,
                type: "grade",
              })
            );
          }
        }}
        onMouseOver={() => {
          if (allowModifications) {
            dispatch(
              setGradeOrAbsenceSection({
                sectionId: section_uid,
                type: "grade",
              })
            );
          }
        }}
      >
        <CreateGradeOrAbsence
          showButton={
            gradeOrAbsenceSectionId === section_uid &&
            gradeOrAbsenceSectionType === "grade"
          }
          type="grade"
          studentId={profile_used_uid}
          sectionId={section_uid}
          location="inStudentCard"
        />
        <ul>
          {grades?.map((grade) => {
            return (
              <li key={grade.grade_uid}>
                <h4>{grade.value}</h4>
                <p>
                  {grade.date
                    ? new Date(grade.date).toLocaleDateString()
                    : "Nu știm încă"}
                </p>
              </li>
            );
          })}
        </ul>
      </td>
      <td
        onFocus={() => {
          if (allowModifications) {
            dispatch(
              setGradeOrAbsenceSection({
                sectionId: section_uid,
                type: "absence",
              })
            );
          }
        }}
        onMouseOver={() => {
          if (allowModifications) {
            dispatch(
              setGradeOrAbsenceSection({
                sectionId: section_uid,
                type: "absence",
              })
            );
          }
        }}
      >
        <CreateGradeOrAbsence
          showButton={
            gradeOrAbsenceSectionId === section_uid &&
            gradeOrAbsenceSectionType === "absence"
          }
          type="absence"
          studentId={profile_used_uid}
          sectionId={section_uid}
          location="inStudentCard"
        />
        <ul>
          {absences?.map((absence) => {
            return (
              <li
                key={absence.absence_uid}
                onClick={() => updateAbsence(absence)}
                style={{
                  borderRadius: absence.reasoned ? "2rem" : "0",
                  border: absence.reasoned ? "1px solid black" : "none",
                  padding: absence.reasoned ? "0.25rem 0" : "none",
                }}
                onFocus={() =>
                  dispatch(setMarkedAbsenceId(absence.absence_uid))
                }
                onMouseOver={() =>
                  dispatch(setMarkedAbsenceId(absence.absence_uid))
                }
              >
                {markedAbsenceId === absence.absence_uid ? (
                  <AiFillDelete
                    title="Ștergeți absența"
                    aria-label="Ștergeți absența"
                    onClick={() => deleteAbsence(absence.absence_uid)}
                  />
                ) : null}
                <h5>
                  {absence.date
                    ? new Date(absence.date).toLocaleDateString()
                    : "Nu știm încă"}
                </h5>
              </li>
            );
          })}
        </ul>
      </td>
    </tr>
  );
};

export default CardSection;
