// React
import { FC } from "react";
// React Icons
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
// Types
import { TemplateClass, TemplateStudent } from "types";
import { Student } from "@prisma/client";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Data
import { subjects } from "@/data";
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

  return (
    <section className={classStyles.classContainer__classCatalogue}>
      <h2>Catalogul Clasei {label}</h2>
      <table className={classStyles.classContainer__classCatalogueContent}>
        <ClassCatalogueHead />
        <tbody
          className={classStyles.classContainer__classCatalogueBody}
          style={{ height: `${usableStudents.length} * 30rem` }}
        >
          {usableStudents.map((student) => {
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

const ClassCatalogueHead: FC = () => {
  const dispatch = useAppDispatch();
  const subjectsSlicer = useAppSelector(selectSubjectsSlicer);
  return (
    <thead className={classStyles.classContainer__classCatalogueHead}>
      <tr>
        <th rowSpan={2}>ELEVII</th>
        <th>
          <button type="button">
            <BsArrowBarLeft
              onClick={() =>
                dispatch(
                  setSubjectsSlicer(
                    subjectsSlicer - 6 < 0
                      ? subjects.length - 6
                      : subjectsSlicer - 6
                  )
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
                dispatch(
                  setSubjectsSlicer(
                    subjectsSlicer + 6 >= subjects.length
                      ? 0
                      : subjectsSlicer + 6
                  )
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
