import { Admin, Bookmark, WebPushSubscription } from "@prisma/client";

interface TemplateAdmin extends Partial<Admin> {
  role: "ADMIN" | "ELEV" | "PROFESOR";
  accountCode: string;
  bookmarks?: Bookmark[];
  subscription?: WebPushSubscription;
}

export default TemplateAdmin;
