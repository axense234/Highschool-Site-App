import { Student, Bookmark, WebPushSubscription } from "@prisma/client";
import TemplateStudentCard from "./TemplateStudentCard";

interface TemplateStudent extends Partial<Student> {
  student_uid?: string;
  id?: string;
  profile_img_url?: string;
  role: "ADMIN" | "ELEV" | "PROFESOR";
  class_uid?: string;
  student_card_uid?: string;
  student_card?: TemplateStudentCard;
  bookmarks?: Bookmark[];
  subscription?: WebPushSubscription;
}

export default TemplateStudent;
