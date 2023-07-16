import TemplateBookmark from "./TemplateBookmark";
import TemplateStudentCard from "./TemplateStudentCard";

interface TemplateUser {
  id?: string;
  fullname: string;
  password: string;
  email: string;
  role: "ADMIN" | "ELEV" | "PROFESOR" | "";
  student_card?: TemplateStudentCard;
  bookmarks?: TemplateBookmark[];
}

export default TemplateUser;
