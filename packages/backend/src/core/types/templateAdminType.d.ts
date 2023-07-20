import { Admin, Prisma } from "@prisma/client";

export type TemplateAdminType = Admin & {
  bookmarks?: { createMany: { data: Prisma.BookmarkCreateManyInput[] } };
  subscription?: string;
};
