import { Grade } from "@prisma/client";

interface TemplateGrade extends Partial<Grade> {
  grade_uid?: string;
  date?: Date;
  value?: number;
}

export default TemplateGrade;
