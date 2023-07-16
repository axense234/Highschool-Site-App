import { StudentCard } from "@prisma/client";
import TemplateStudentCardSection from "./TemplateStudentCardSection";

interface TemplateStudentCard extends StudentCard {
  content?: TemplateStudentCardSection[];
}

export default TemplateStudentCard;
