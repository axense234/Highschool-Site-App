// React
import { FC, useEffect, useState } from "react";
// Types
import { TemplateTeacher, TemplateStudent, TemplateClass } from "types";
import { Teacher, Student } from "@prisma/client";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Components
import ClassComponentPreview from "./ClassComponentPreview";
import MarkableHeading from "../others/MarkableHeading";

const ClassDetails: FC<TemplateClass> = ({
  class_uid,
  students,
  teachers,
  label,
  master_teacher,
}) => {
  const [usableTeachers, setUsableTeachers] = useState<Teacher[]>([]);
  const [usableStudents, setUsableStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (class_uid) {
      setUsableStudents(students as Student[]);
      setUsableTeachers(teachers as Teacher[]);
    }
  }, [class_uid]);

  return (
    <section className={classStyles.classContainer__classDetailsContainer}>
      <MarkableHeading textContent={`Detaliile clasei ${label}`} type="h2" />
      <div className={classStyles.classContainer__classDetails}>
        <div className={classStyles.classContainer__classMaster}>
          <h3>DIRIGINTE: </h3>
          {master_teacher?.fullname ? (
            <ClassComponentPreview
              component={master_teacher as TemplateTeacher}
              type="teacher"
            />
          ) : (
            <p>Clasa nu are diriginte.</p>
          )}
        </div>
        <div className={classStyles.classContainer__classTeachers}>
          <h3>PROFESORI DE CLASĂ:</h3>
          {usableTeachers.length >= 1 ? (
            <ul className={classStyles.classContainer__classTeachersDetails}>
              {usableTeachers?.map((teacher) => {
                return (
                  <li key={teacher.teacher_uid as string}>
                    <ClassComponentPreview
                      component={teacher as TemplateTeacher}
                      type="teacher"
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Clasa nu are profesori.</p>
          )}
        </div>
        <div className={classStyles.classContainer__classStudents}>
          <h3>ELEVII CLASEI {label}: </h3>
          {usableStudents.length >= 1 ? (
            <ul className={classStyles.classContainer__classStudentsDetails}>
              {usableStudents?.map((student) => {
                return (
                  <li key={student.student_uid}>
                    <ClassComponentPreview
                      component={student as TemplateStudent}
                      type="student"
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Clasa nu are elevi.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassDetails;
