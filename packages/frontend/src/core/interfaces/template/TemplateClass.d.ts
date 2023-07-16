import { Class, Student, Teacher } from "@prisma/client";

interface TemplateClass extends Partial<Class> {
  class_uid?: string;
  id: string;
  students?: Student[] | string[];
  teachers?: Teacher[] | string[];
  master_teacher?: Teacher;
}

export default TemplateClass;
