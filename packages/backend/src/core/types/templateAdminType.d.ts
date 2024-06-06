import { Admin, Prisma, WebPushSubscription } from "@prisma/client";
import { PushSubscription } from "web-push";

type TemplateAdminType = Admin & {
  bookmarks?: { createMany: { data: Prisma.BookmarkCreateManyInput[] } };
  subscription?: WebPushSubscription | PushSubscription;
};

export default TemplateAdminType;
