import { Bookmark, BookmarkType } from "@prisma/client";

interface TemplateBookmark extends Partial<Bookmark> {
  type: BookmarkType;
}

export default TemplateBookmark;
