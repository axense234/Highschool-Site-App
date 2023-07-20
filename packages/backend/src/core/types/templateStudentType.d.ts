import { Prisma, Student } from "@prisma/client";

export type TemplateStudentType = Student & {
  bookmarks?: { createMany: { data: Prisma.BookmarkCreateManyInput[] } };
  subscription?: string;
};
