import { Admin, Bookmark } from "@prisma/client";

interface TemplateAdmin extends Partial<Admin> {
  role: "ADMIN" | "ELEV" | "PROFESOR";
  accountCode: string;
  bookmarks?: Bookmark[];
  subscription?: string;
}

export default TemplateAdmin;
