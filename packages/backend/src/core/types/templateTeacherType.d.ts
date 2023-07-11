import { Prisma, Teacher } from "@prisma/client";

export type TemplateTeacherType = Teacher & {
  bookmarks?: { createMany: { data: Prisma.BookmarkCreateManyInput[] } };
};
