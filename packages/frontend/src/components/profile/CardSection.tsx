// React
import { FC, useEffect } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// React Icons
import { AiFillDelete } from "react-icons/ai";
// Types
import { Absence, Teacher } from "@prisma/client";
import CardSectionProps from "@/core/interfaces/component/CardSectionProps";
// Components
import CreateGradeOrAbsence from "../others/CreateGradeOrAbsence";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  updateAbsenceById,
  updateTemplateAbsence,
} from "@/redux/slices/absencesSlice";
import {
  selectGradeOrAbsenceSection,
  selectGradeModalId,
  setGradeOrAbsenceSection,
  setMarkedAbsenceOrGradeId,
  selectMarkedAbsenceOrGradeId,
  setEditableGradeId,
  selectEditableGradeId,
} from "@/redux/slices/generalSlice";
import { updateTemplateGrade } from "@/redux/slices/gradesSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";
// Helpers
import deleteGrade from "@/helpers/deleteGrade";
import updateGrade from "@/helpers/updateGrade";
import deleteAbsence from "@/helpers/deleteAbsence";
import updateAbsence from "@/helpers/updateAbsence";

const CardSection: FC<CardSectionProps> = ({
  absences,
  grades,
  ownProfile,
  subject,
  teacherFullname,
  teacherProfileImage,
  teacherId,
  section_uid,
  profile_used_uid,
  class_uid,
}) => {
  const dispatch = useAppDispatch();
  const gradeModalId = useAppSelector(selectGradeModalId);
  const markedAbsenceOrGradeId = useAppSelector(selectMarkedAbsenceOrGradeId);
  const gradeOrAbsenceSection = useAppSelector(selectGradeOrAbsenceSection);
  const gradeOrAbsenceSectionId = gradeOrAbsenceSection.sectionId;
  const gradeOrAbsenceSectionType = gradeOrAbsenceSection.type;
  const editableGradeId = useAppSelector(selectEditableGradeId);

  const allowModifications =
    ownProfile.role === "ADMIN" || ownProfile.role === "PROFESOR";

  const allowAbsenceReasoning =
    ownProfile.role === "ADMIN" ||
    (ownProfile as Teacher).master_class_uid === class_uid;

  const allowDeleteAbsenceOrGrade = ownProfile.role === "ADMIN";

  const allowEditGrade =
    ownProfile.role === "ADMIN" || ownProfile.role === "PROFESOR";

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
          fontWeight: teacherFullname ? "bolder" : "normal",
          fontSize: teacherFullname ? "1.15rem" : "1rem",
        }}
      >
        {teacherFullname ? (
          <Link href={`/profil/${teacherId}?type=teacher`}>
            <Image
              alt={teacherFullname}
              src={teacherProfileImage as string}
              width={100}
              height={100}
            />
            <h3>{teacherFullname}</h3>
          </Link>
        ) : (
          <h3>Nu știm încă</h3>
        )}
      </td>
      <td
        style={{
          fontWeight: "bolder",
        }}
      >
        {subject}
      </td>
      <td
        onMouseLeave={() => {
          dispatch(setEditableGradeId(""));
        }}
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
              <li
                key={grade.grade_uid}
                onFocus={() =>
                  dispatch(setMarkedAbsenceOrGradeId(grade.grade_uid))
                }
                onMouseOver={() =>
                  dispatch(setMarkedAbsenceOrGradeId(grade.grade_uid))
                }
                onClick={() => dispatch(setEditableGradeId(grade.grade_uid))}
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
                        "student",
                        dispatch,
                        profile_used_uid
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
                        "student",
                        section_uid,
                        dispatch,
                        profile_used_uid
                      )
                    }
                  />
                ) : (
                  <>
                    <h4>{grade.value} / </h4>
                  </>
                )}
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
                onClick={() =>
                  updateAbsence(
                    absence,
                    allowAbsenceReasoning,
                    section_uid,
                    "student",
                    dispatch,
                    profile_used_uid
                  )
                }
                onFocus={() =>
                  dispatch(setMarkedAbsenceOrGradeId(absence.absence_uid))
                }
                onMouseOver={() =>
                  dispatch(setMarkedAbsenceOrGradeId(absence.absence_uid))
                }
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
                        "student",
                        dispatch,
                        profile_used_uid
                      )
                    }
                  />
                ) : null}
                <h5
                  style={{
                    borderRadius: absence.reasoned ? "2rem" : "0",
                    border: absence.reasoned ? "1px solid black" : "none",
                    padding: absence.reasoned ? "0.5rem 0" : "none",
                  }}
                >
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
