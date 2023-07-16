interface CreateGradeOrAbsenceModalProps {
  show: boolean;
  location: "inCatalogue" | "inStudentCard";
  studentId?: string;
  classId?: string;
}

export default CreateGradeOrAbsenceModalProps;
