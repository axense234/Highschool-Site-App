interface CreateGradeOrAbsenceButtonProps {
  showButton: boolean;
  sectionId: string;
  type: "absence" | "grade";
  location: "inCatalogue" | "inStudentCard";
  studentId?: string;
  classId?: string;
}
export default CreateGradeOrAbsenceButtonProps;
