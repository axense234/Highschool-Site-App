import { StudentCardSection, Grade, Absence } from "@prisma/client";

interface TemplateStudentCardSection extends StudentCardSection {
  grades?: Grade[];
  absences?: Absence[];
}

export default TemplateStudentCardSection;
