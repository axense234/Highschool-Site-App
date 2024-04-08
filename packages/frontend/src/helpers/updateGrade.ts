// Types
import { Grade } from "@prisma/client";
// Redux
import { getClassById } from "@/redux/slices/classesSlice";
import { updateGradeById } from "@/redux/slices/gradesSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";

const updateGrade = (
  grade: Grade,
  value: number,
  allowEditGrade: boolean,
  origin: "class" | "student",
  section_uid: string,
  dispatch: any,
  usedId: string
) => {
  if (allowEditGrade) {
    dispatch(
      updateGradeById({
        templateGrade: {
          card_section_uid: section_uid,
          id: grade.grade_uid,
          value,
          grade_uid: grade.grade_uid,
        },
        studentId: usedId,
      })
    )
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

export default updateGrade;
