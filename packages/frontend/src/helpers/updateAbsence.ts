// Types
import { Absence } from "@prisma/client";
// Redux
import { updateAbsenceById } from "@/redux/slices/absencesSlice";
import { getStudentById } from "@/redux/slices/studentsSlice";
import { getClassById } from "@/redux/slices/classesSlice";

const updateAbsence = (
  absence: Absence,
  allowAbsenceReasoning: boolean,
  section_uid: string,
  origin: "class" | "student",
  dispatch: any,
  usedId: string
) => {
  if (allowAbsenceReasoning) {
    dispatch(
      updateAbsenceById({
        templateAbsence: {
          reasoned: !absence.reasoned,
          absence_uid: absence.absence_uid,
          card_section_uid: section_uid,
          id: absence.absence_uid,
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

export default updateAbsence;
