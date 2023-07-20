// Redux
import { deleteAbsenceById } from "@/redux/slices/absencesSlice";
import { getClassById } from "@/redux/slices/classesSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";

const deleteAbsence = (
  absence_uid: string,
  allowDeleteAbsenceOrGrade: boolean,
  origin: "class" | "student",
  dispatch: any,
  usedId: string
) => {
  if (allowDeleteAbsenceOrGrade) {
    dispatch(deleteAbsenceById(absence_uid))
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

export default deleteAbsence;
