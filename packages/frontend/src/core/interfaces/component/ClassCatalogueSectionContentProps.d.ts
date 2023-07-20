import TemplateStudentCardSection from "../template/TemplateStudentCardSection";

interface ClassCatalogueSectionContentProps {
  section_uid: string;
  class_uid?: string;
  student_uid?: string;
  studentCardContent: TemplateStudentCardSection[] | undefined;
}

export default ClassCatalogueSectionContentProps;
