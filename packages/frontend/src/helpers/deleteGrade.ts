// Redux
import { getClassById } from "@/redux/slices/classesSlice";
import { deleteGradeById } from "@/redux/slices/gradesSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";

const deleteGrade = (
  grade_uid: string,
  allowDeleteAbsenceOrGrade: boolean,
  origin: "class" | "student",
  dispatch: any,
  usedId: string
) => {
  if (allowDeleteAbsenceOrGrade) {
    dispatch(deleteGradeById({ gradeId: grade_uid, studentId: usedId }))
      .unwrap()
      .then(() => {
        if (origin === "class") {
          dispatch(getClassById(usedId));
        } else if (origin === "student") {
          dispatch(getStudentById(usedId));
        }
      });
  }
};

export default deleteGrade;
