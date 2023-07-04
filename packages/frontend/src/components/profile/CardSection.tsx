// React
import { FC, useEffect } from "react";
// Types
import { CardSectionProps } from "types";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateTemplateAbsence } from "@/redux/slices/absencesSlice";
import {
  selectGradeOrAbsenceSection,
  selectGradeModalId,
  setGradeOrAbsenceSection,
} from "@/redux/slices/generalSlice";
import { updateTemplateGrade } from "@/redux/slices/gradesSlice";
// Components
import CreateGradeOrAbsence from "../others/CreateGradeOrAbsence";

const CardSection: FC<CardSectionProps> = ({
  absences,
  grades,
  ownProfileRole,
  subject,
  teacher,
  section_uid,
  profile_used_uid,
}) => {
  const dispatch = useAppDispatch();
  const gradeOrAbsenceSection = useAppSelector(selectGradeOrAbsenceSection);
  const gradeModalId = useAppSelector(selectGradeModalId);

  const gradeOrAbsenceSectionId = gradeOrAbsenceSection.sectionId;
  const gradeOrAbsenceSectionType = gradeOrAbsenceSection.type;

  const allowModifications =
    ownProfileRole === "ADMIN" || ownProfileRole === "PROFESOR";

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
          fontSize: "1.15rem",
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
        />
        <ul>
          {absences?.map((absence) => {
            return (
              <li key={absence.absence_uid}>
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
