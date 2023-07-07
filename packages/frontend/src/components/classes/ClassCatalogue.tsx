// React
import { FC, useState } from "react";
// React Icons
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
// Types
import { ClassCatalogueHeadProps, TemplateClass, TemplateStudent } from "types";
import { Student } from "@prisma/client";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Data
import { classCatalogueSubjectsCountMap, subjects } from "@/data";
// Components
import ClassCatalogueSection from "./ClassCatalogueSection";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectSubjectsSlicer,
  setSubjectsSlicer,
} from "@/redux/slices/generalSlice";

const ClassCatalogue: FC<TemplateClass> = ({ label, students, class_uid }) => {
  const usableStudents = students as Student[];
  const [currentClassSubjectsShownId, setCurrentClassSubjectsShownId] =
    useState<number>(0);

  return (
    <section className={classStyles.classContainer__classCatalogue}>
      <h2>Catalogul Clasei {label}</h2>
      <table className={classStyles.classContainer__classCatalogueContent}>
        <ClassCatalogueHead
          currentClassSubjectsShownId={currentClassSubjectsShownId}
          setCurrentClassSubjectsShownId={setCurrentClassSubjectsShownId}
        />
        <tbody
          className={classStyles.classContainer__classCatalogueBody}
          style={{ height: `${usableStudents.length} * 30rem` }}
        >
          {usableStudents.map((student, index) => {
            return (
              <ClassCatalogueSection
                key={student.student_uid}
                class_uid={class_uid}
                student={student as TemplateStudent}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

const ClassCatalogueHead: FC<ClassCatalogueHeadProps> = ({
  currentClassSubjectsShownId,
  setCurrentClassSubjectsShownId,
}) => {
  const dispatch = useAppDispatch();
  const subjectsSlicer = useAppSelector(selectSubjectsSlicer);

  const handlePrevSubjects = () => {
    dispatch(
      setSubjectsSlicer(
        subjectsSlicer - 6 < 0 ? subjects.length - 6 : subjectsSlicer - 6
      )
    );
    setCurrentClassSubjectsShownId(
      currentClassSubjectsShownId - 1 < 0
        ? subjects.length / 6 - 1
        : currentClassSubjectsShownId - 1
    );
  };

  const handleNextSubjects = () => {
    dispatch(
      setSubjectsSlicer(
        subjectsSlicer + 6 >= subjects.length ? 0 : subjectsSlicer + 6
      )
    );
    setCurrentClassSubjectsShownId(
      currentClassSubjectsShownId + 1 > subjects.length / 6 - 1
        ? 0
        : currentClassSubjectsShownId + 1
    );
  };

  return (
    <thead className={classStyles.classContainer__classCatalogueHead}>
      <tr>
        <th rowSpan={2}>ELEVII</th>
        <th>
          <button type="button">
            <BsArrowBarLeft
              onClick={() => handlePrevSubjects()}
              title="Precedentele 6 discipline"
              aria-label="Precedentele 6 discipline"
            />
          </button>
          <div className={classStyles.classContainer__classCatalogueSubjects}>
            <span>DISCIPLINE DE ÎNVĂTĂMÂNT</span>
            <span
              className={
                classStyles.classContainer__classCatalogueSubjectsContainer
              }
            >
              {classCatalogueSubjectsCountMap.map((list, index) => {
                let pos = "next";

                if (currentClassSubjectsShownId === index) {
                  pos = "current";
                } else if (
                  index + 1 === currentClassSubjectsShownId ||
                  (index === classCatalogueSubjectsCountMap.length - 1 &&
                    currentClassSubjectsShownId === 0)
                ) {
                  pos = "prev";
                }

                return (
                  <ul className={classStyles[pos]} key={list.id}>
                    {subjects
                      .slice(subjectsSlicer, subjectsSlicer + 6)
                      .map((subject) => {
                        return <li key={subject.id}>{subject.name}</li>;
                      })}
                  </ul>
                );
              })}
            </span>
          </div>
          <button type="button">
            <BsArrowBarRight
              onClick={() => handleNextSubjects()}
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
