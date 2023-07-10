import { Class } from "@prisma/client";

export type TemplateClassType = Class & {
  master_teacher?: string;
  students?: string[] | { connect: { student_uid: string }[] };
  teachers?: string[] | { connect: { teacher_uid: string }[] };
};
