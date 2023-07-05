// React
import { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
// React Icons
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
// Types
import {
  ClassCatalogueHeadProps,
  ClassCatalogueSectionContentProps,
  ClassCatalogueSectionProps,
  TemplateClass,
  TemplateStudent,
  TemplateStudentCard,
} from "types";
import { Absence, Student, Teacher } from "@prisma/client";
// React Icons
import { AiFillDelete } from "react-icons/ai";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Data
import { subjects } from "@/data";
// Components
import CreateGradeOrAbsence from "../others/CreateGradeOrAbsence";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectGradeModalId,
  selectGradeOrAbsenceSection,
  selectMarkedAbsenceId,
  selectProfile,
  setGradeOrAbsenceSection,
  setMarkedAbsenceId,
} from "@/redux/slices/generalSlice";
import {
  deleteAbsenceById,
  updateAbsenceById,
  updateTemplateAbsence,
} from "@/redux/slices/absencesSlice";
import { updateTemplateGrade } from "@/redux/slices/gradesSlice";
import { getClassById } from "@/redux/slices/classesSlice";

const ClassCatalogue: FC<TemplateClass> = ({ label, students, class_uid }) => {
  const [subjectsSlicer, setSubjectsSlicer] = useState<number>(0);
  const usableStudents = students as Student[];

  return (
    <section className={classStyles.classContainer__classCatalogue}>
      <h2>Catalogul Clasei {label}</h2>
      <table className={classStyles.classContainer__classCatalogueContent}>
        <ClassCatalogueHead
          subjectsSlicer={subjectsSlicer}
          setSubjectsSlicer={setSubjectsSlicer}
        />
        <tbody className={classStyles.classContainer__classCatalogueBody}>
          {usableStudents.map((student) => {
            return (
              <ClassCatalogueSection
                key={student.student_uid}
                class_uid={class_uid}
                student={student as TemplateStudent}
                subjectsSlicer={subjectsSlicer}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

const ClassCatalogueSection: FC<ClassCatalogueSectionProps> = ({
  student,
  subjectsSlicer,
  class_uid,
}) => {
  const studentCard = (student as TemplateStudent)
    .student_card as TemplateStudentCard;
  const studentCardContent = studentCard?.content?.slice(
    subjectsSlicer,
    subjectsSlicer + 6
  );

  return (
    <tr
      key={student.student_uid}
      className={classStyles.classContainer__classCatalogueSection}
    >
      <td className={classStyles.classContainer__classCatalogueStudent}>
        <Image
          alt={student.fullname}
          src={student.profile_img_url as string}
          height={100}
          width={100}
        />
        <h3>{student.fullname}</h3>
      </td>
      <td
        className={
          classStyles.classContainer__classCatalogueStudentContentWrapper
        }
      >
        {studentCardContent?.map((studentSection) => {
          return (
            <ClassCatalogueSectionContent
              key={studentSection.card_section_uid}
              class_uid={class_uid}
              section_uid={studentSection.card_section_uid}
              studentCardContent={studentCardContent}
            />
          );
        })}
      </td>
    </tr>
  );
};

const ClassCatalogueSectionContent: FC<ClassCatalogueSectionContentProps> = ({
  section_uid,
  class_uid,
  studentCardContent,
}) => {
  const dispatch = useAppDispatch();
  const gradeOrAbsenceSection = useAppSelector(selectGradeOrAbsenceSection);

  const gradeModalId = useAppSelector(selectGradeModalId);
  const gradeOrAbsenceSectionId = gradeOrAbsenceSection.sectionId;
  const gradeOrAbsenceSectionType = gradeOrAbsenceSection.type;
  const markedAbsenceId = useAppSelector(selectMarkedAbsenceId);

  const profile = useAppSelector(selectProfile);

  const allowModifications = profile.role === "ADMIN";
  const allowAbsenceReasoning =
    profile.role === "ADMIN" ||
    (profile as Teacher).master_class_uid === class_uid;
  const allowDeleteAbsence = profile.role === "ADMIN";

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
        .then(() => dispatch(getClassById(class_uid as string)));
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
    <div className={classStyles.classContainer__classCatalogueStudentContent}>
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
                      updateAbsence(absence);
                    }}
                    onFocus={() =>
                      dispatch(setMarkedAbsenceId(absence.absence_uid))
                    }
                    onMouseOver={() =>
                      dispatch(setMarkedAbsenceId(absence.absence_uid))
                    }
                    style={{
                      borderRadius: absence.reasoned ? "2rem" : "0",
                      border: absence.reasoned ? "1px solid black" : "none",
                      padding: absence.reasoned ? "0.25rem 0" : "none",
                    }}
                  >
                    {markedAbsenceId === absence.absence_uid ? (
                      <AiFillDelete
                        title="Ștergeți absența"
                        aria-label="Ștergeți absența"
                        onClick={() => deleteAbsence(absence.absence_uid)}
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
                  <li key={grade.grade_uid}>
                    <h5>{grade.value} / </h5>
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
    </div>
  );
};

const ClassCatalogueHead: FC<ClassCatalogueHeadProps> = ({
  subjectsSlicer,
  setSubjectsSlicer,
}) => {
  return (
    <thead className={classStyles.classContainer__classCatalogueHead}>
      <tr>
        <th rowSpan={2}>ELEVII</th>
        <th>
          <button type="button">
            <BsArrowBarLeft
              onClick={() =>
                setSubjectsSlicer(
                  subjectsSlicer - 6 < 0
                    ? subjects.length - 6
                    : subjectsSlicer - 6
                )
              }
              title="Precedentele 6 discipline"
              aria-label="Precedentele 6 discipline"
            />
          </button>
          <div className={classStyles.classContainer__classCatalogueSubjects}>
            <span>DISCIPLINE DE ÎNVĂTĂMÂNT</span>
            <span>
              <ul>
                {subjects
                  .slice(subjectsSlicer, subjectsSlicer + 6)
                  .map((subject) => {
                    return <li key={subject.id}>{subject.name}</li>;
                  })}
              </ul>
            </span>
          </div>
          <button type="button">
            <BsArrowBarRight
              onClick={() =>
                setSubjectsSlicer(
                  subjectsSlicer + 6 >= subjects.length ? 0 : subjectsSlicer + 6
                )
              }
              title="Următoarele 6 discipline"
              aria-label="Următoarele 6 discipline"
            />
          </button>
        </th>
      </tr>
    </thead>
  );
};

export default ClassCatalogue;
