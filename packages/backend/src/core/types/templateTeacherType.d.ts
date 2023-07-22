import { Prisma, Teacher, WebPushSubscription } from "@prisma/client";
import { PushSubscription } from "web-push";

export type TemplateTeacherType = Teacher & {
  bookmarks?: { createMany: { data: Prisma.BookmarkCreateManyInput[] } };
  subscription?: WebPushSubscription | PushSubscription;
};
