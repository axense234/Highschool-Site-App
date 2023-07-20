import { Class } from "@prisma/client";

export type TemplateClassType = Partial<Class> & {
  master_teacher?: string;
  master_teacher_name?: string;
  master_teacher_uid?: string;
  students?: string[] | { connect: { student_uid: string }[] };
  teachers?: string[] | { connect: { teacher_uid: string }[] };
};
