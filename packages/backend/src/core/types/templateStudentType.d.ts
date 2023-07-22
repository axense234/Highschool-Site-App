import { Prisma, Student, WebPushSubscription } from "@prisma/client";
import { PushSubscription } from "web-push";

export type TemplateStudentType = Student & {
  bookmarks?: { createMany: { data: Prisma.BookmarkCreateManyInput[] } };
  subscription?: WebPushSubscription | PushSubscription;
};
