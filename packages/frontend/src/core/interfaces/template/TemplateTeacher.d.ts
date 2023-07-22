import { Teacher, Class, Bookmark, WebPushSubscription } from "@prisma/client";

interface TemplateTeacher extends Partial<Teacher> {
  teacher_uid?: string;
  role: "ADMIN" | "ELEV" | "PROFESOR";
  classes: Class[];
  accountCode?: string;
  bookmarks?: Bookmark[];
  subscription?: WebPushSubscription;
}

export default TemplateTeacher;
