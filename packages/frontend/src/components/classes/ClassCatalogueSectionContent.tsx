// React
import { FC, useEffect } from "react";
// React Icons
import { AiFillDelete } from "react-icons/ai";
// Types
import { Teacher } from "@prisma/client";
import ClassCatalogueSectionContentProps from "@/core/interfaces/component/ClassCatalogueSectionContentProps";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Components
import CreateGradeOrAbsence from "../others/CreateGradeOrAbsence";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateTemplateAbsence } from "@/redux/slices/absencesSlice";
import {
  selectGradeOrAbsenceSection,
  selectGradeModalId,
  selectMarkedAbsenceOrGradeId,
  selectProfile,
  selectEditableGradeId,
  setGradeOrAbsenceSection,
  setMarkedAbsenceOrGradeId,
  setEditableGradeId,
} from "@/redux/slices/generalSlice";
import { updateTemplateGrade } from "@/redux/slices/gradesSlice";
// Helpers
import deleteGrade from "@/helpers/deleteGrade";
import updateGrade from "@/helpers/updateGrade";
import deleteAbsence from "@/helpers/deleteAbsence";
import updateAbsence from "@/helpers/updateAbsence";
import sendNotificationToUser from "@/helpers/sendNotification";

const ClassCatalogueSectionContent: FC<ClassCatalogueSectionContentProps> = ({
  section_uid,
  class_uid,
  studentCardContent,
  student_uid,
}) => {
  const dispatch = useAppDispatch();
  const gradeOrAbsenceSection = useAppSelector(selectGradeOrAbsenceSection);

  const gradeModalId = useAppSelector(selectGradeModalId);
  const gradeOrAbsenceSectionId = gradeOrAbsenceSection.sectionId;
  const gradeOrAbsenceSectionType = gradeOrAbsenceSection.type;
  const markedAbsenceOrGradeId = useAppSelector(selectMarkedAbsenceOrGradeId);
  const profile = useAppSelector(selectProfile);
  const editableGradeId = useAppSelector(selectEditableGradeId);

  const allowModifications = profile.role === "ADMIN";

  const allowAbsenceReasoning =
    profile.role === "ADMIN" ||
    (profile as Teacher).master_class_uid === class_uid;

  const allowDeleteAbsenceOrGrade = profile.role === "ADMIN";

  const allowEditGrade =
    profile.role === "ADMIN" ||
    (profile as Teacher).master_class_uid === class_uid;

  const studentCardGrades = (
    studentCardContent?.map((section) => {
      return {
        id: section.card_section_uid,
        grades: section.grades,
        gradesSubject: section.subject,
      };
    }) || []
  ).find((grade) => grade.id === section_uid)?.grades;

  const studentCardAbsences = (
    studentCardContent?.map((section) => {
      return {
        id: section.card_section_uid,
        absences: section.absences,
      };
    }) || []
  ).find((absence) => absence.id === section_uid)?.absences;

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
    <div className={classStyles.classContainer__classCatalogueStudentContent}>
      <div className={classStyles.classContainer__classCatalogueStudentDetails}>
        <h4>Note</h4>
        <div
          className={
            classStyles.classContainer__classCatalogueStudentDetailsContent
          }
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
            sectionId={section_uid}
            type="grade"
            location="inCatalogue"
            classId={class_uid}
          />
          <ul>
            {(studentCardGrades?.length as number) >= 1 ? (
              studentCardGrades?.map((grade) => {
                return (
                  <li
                    key={grade.grade_uid}
                    onFocus={() =>
                      dispatch(setMarkedAbsenceOrGradeId(grade.grade_uid))
                    }
                    onMouseOver={() =>
                      dispatch(setMarkedAbsenceOrGradeId(grade.grade_uid))
                    }
                    onClick={() =>
                      dispatch(setEditableGradeId(grade.grade_uid))
                    }
                  >
                    {markedAbsenceOrGradeId === grade.grade_uid &&
                    allowDeleteAbsenceOrGrade ? (
                      <AiFillDelete
                        title="Ștergeți nota"
                        aria-label="Ștergeți nota"
                        onClick={() =>
                          deleteGrade(
                            grade.grade_uid,
                            allowDeleteAbsenceOrGrade,
                            "class",
                            dispatch,
                            class_uid
                          )
                        }
                      />
                    ) : null}
                    {editableGradeId === grade.grade_uid && allowEditGrade ? (
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={grade.value}
                        onChange={(e) =>
                          updateGrade(
                            grade,
                            e.target.valueAsNumber,
                            allowEditGrade,
                            "class",
                            section_uid,
                            dispatch,
                            class_uid
                          )
                        }
                      />
                    ) : (
                      <>
                        <h5>{grade.value} / </h5>
                      </>
                    )}
                    <p>
                      {grade.date
                        ? new Date(grade.date).toLocaleDateString()
                        : "Nu știm încă"}
                    </p>
                  </li>
                );
              })
            ) : (
              <li>Elevul nu are note.</li>
            )}
          </ul>
        </div>
      </div>
      <div className={classStyles.classContainer__classCatalogueStudentDetails}>
        <h4>Absențe</h4>
        <div
          className={
            classStyles.classContainer__classCatalogueStudentDetailsContent
          }
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
            sectionId={section_uid}
            type="absence"
            location="inCatalogue"
            classId={class_uid}
          />
          <ul>
            {(studentCardAbsences?.length as number) >= 1 ? (
              studentCardAbsences?.map((absence) => {
                return (
                  <li
                    key={absence.absence_uid}
                    onClick={() => {
                      updateAbsence(
                        absence,
                        allowAbsenceReasoning,
                        section_uid,
                        "class",
                        dispatch,
                        class_uid
                      );
                      sendNotificationToUser(
                        student_uid as string,
                        "ELEV",
                        dispatch
                      );
                    }}
                    onFocus={() =>
                      dispatch(setMarkedAbsenceOrGradeId(absence.absence_uid))
                    }
                    onMouseOver={() =>
                      dispatch(setMarkedAbsenceOrGradeId(absence.absence_uid))
                    }
                    style={{
                      borderRadius: absence.reasoned ? "2rem" : "0",
                      border: absence.reasoned ? "1px solid black" : "none",
                      padding: absence.reasoned ? "0.25rem 0" : "none",
                    }}
                  >
                    {markedAbsenceOrGradeId === absence.absence_uid &&
                    allowDeleteAbsenceOrGrade ? (
                      <AiFillDelete
                        title="Ștergeți absența"
                        aria-label="Ștergeți absența"
                        onClick={() =>
                          deleteAbsence(
                            absence.absence_uid,
                            allowDeleteAbsenceOrGrade,
                            "class",
                            dispatch,
                            class_uid
                          )
                        }
                      />
                    ) : null}
                    <h6>
                      {absence.date
                        ? new Date(absence.date).toLocaleDateString()
                        : "Nu știm încă"}
                    </h6>
                  </li>
                );
              })
            ) : (
              <li>Elevul nu are absențe.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassCatalogueSectionContent;
