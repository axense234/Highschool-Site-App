import { Admin, Prisma, WebPushSubscription } from "@prisma/client";
import { TemplateWebPushSubscription } from "./templateWebPushSubscription";

export type TemplateAdminType = Admin & {
  bookmarks?: { createMany: { data: Prisma.BookmarkCreateManyInput[] } };
  subscription?: TemplateWebPushSubscription;
};
